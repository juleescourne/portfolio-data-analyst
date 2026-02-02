// utils/housingModel.js - VERSION AVEC WEB WORKER (OPTIONNEL)
import XGBoostPredictor from './xgboostPredictor';
import { getDataUrl } from '../utils/onnxConfig';

class HousingModel {
    constructor() {
        this.predictor = null;
        this.geoCache = null;
        this.useWorker = false; // Désactivé par défaut (activer si le worker est configuré)

        this.FEATURE_MAP = {
            'income_bracket': 0,
            'income_per_person': 1,
            'log_income_per_person_squared': 2,
            'log_income_gravity_product': 3,
            'gravity_ocean': 4,
            'west_bracket': 5,
            'distance_to_sacr': 6,
            'gravity_ocean_squared': 7,
            'distance_to_sf': 8,
            'north_bracket': 9,
            'distance_to_sj': 10,
            'income_rooms_interaction': 11,
            'ocean_proximity_encoded': 12,
            'longitude': 13,
            'latitude': 14,
            'log_income_to_rooms_ratio': 15,
            'log_income_age_interaction': 16,
            'distance_to_sd': 17,
            'gravity_income': 18
        };
    }

    async loadModel() {
        if (!this.predictor) {
            const modelUrl = getDataUrl('xgb_trees.json');
            this.predictor = await XGBoostPredictor.load(modelUrl, this.FEATURE_MAP);
            console.log('✅ Modèle XGBoost chargé');
        }
    }

    async loadGeoCache() {
        if (!this.geoCache) {
            const geoUrl = getDataUrl('geo_cache.json');
            const response = await fetch(geoUrl);
            this.geoCache = await response.json();
            console.log(`✅ Cache chargé (${this.geoCache.n_points} points)`);
        }
    }

    calculateIncomeBracket(incomePerPerson) {
        if (incomePerPerson < 0.761146) return 0;
        if (incomePerPerson < 1.102782) return 1;
        if (incomePerPerson < 1.425207) return 2;
        if (incomePerPerson < 1.816801) return 3;
        return 4;
    }

    digitize(value, bins) {
        for (let i = 0; i < bins.length; i++) {
            if (value < bins[i]) return i;
        }
        return bins.length;
    }

    engineerFeaturesBatch(params, startIdx, endIdx) {
        const {
            housing_median_age,
            total_rooms,
            total_bedrooms,
            population,
            households,
            median_income
        } = params;

        const householdsMax = Math.max(households, 1);
        const rooms_per_household = total_rooms / householdsMax;
        const bedrooms_per_household = total_bedrooms / householdsMax;
        const population_per_household = population / householdsMax;
        const income_per_person = median_income / Math.max(population_per_household, 0.1);

        const log_income_per_person_squared = Math.log1p(income_per_person ** 2);
        const income_bracket = this.calculateIncomeBracket(income_per_person);
        const income_rooms_interaction = income_per_person * rooms_per_household;
        const log_income_to_rooms_ratio = Math.log1p(income_per_person / Math.max(rooms_per_household, 0.1));
        const log_income_age_interaction = Math.log1p(income_per_person * housing_median_age);

        const features_matrix = [];

        for (let i = startIdx; i < endIdx; i++) {
            const lat = this.geoCache.latitudes[i];
            const lon = this.geoCache.longitudes[i];
            const gravity = this.geoCache.gravity_scores[i];
            const ocean_encoded = this.geoCache.ocean_proximity_encoded[i];

            const north_bracket = this.digitize(lat, [33.87, 34.10, 36.70, 37.84]);
            const west_bracket = this.digitize(lon, [-121.96, -119.98, -118.29, -117.88]);

            const gravity_income = income_per_person * gravity;
            const gravity_ocean = gravity * ocean_encoded;
            const gravity_ocean_squared = gravity_ocean ** 2;
            const log_income_gravity_product = Math.log1p(income_per_person * gravity_ocean);

            features_matrix.push([
                income_bracket,
                income_per_person,
                log_income_per_person_squared,
                log_income_gravity_product,
                gravity_ocean,
                west_bracket,
                this.geoCache.distance_to_sacr[i],
                gravity_ocean_squared,
                this.geoCache.distance_to_sf[i],
                north_bracket,
                this.geoCache.distance_to_sj[i],
                income_rooms_interaction,
                ocean_encoded,
                lon,
                lat,
                log_income_to_rooms_ratio,
                log_income_age_interaction,
                this.geoCache.distance_to_sd[i],
                gravity_income
            ]);
        }

        return features_matrix;
    }

    // VERSION OPTIMISÉE: Prédictions par batch avec yields
    async predict(params, onProgress) {
        await this.loadModel();
        await this.loadGeoCache();

        const n_points = this.geoCache.n_points;
        const BATCH_SIZE = 500; // Traiter par lots de 500 points

        let all_predictions = [];

        // Traiter par batch pour éviter de bloquer le thread
        for (let start = 0; start < n_points; start += BATCH_SIZE) {
            const end = Math.min(start + BATCH_SIZE, n_points);

            // ⚡ CRITIQUE: Yield au navigateur entre chaque batch
            await new Promise(resolve => setTimeout(resolve, 0));

            // Calculer les features pour ce batch
            const features_batch = this.engineerFeaturesBatch(params, start, end);

            // Prédictions pour ce batch
            const predictions_batch = this.predictor.predict(features_batch);
            all_predictions.push(...predictions_batch);

            // Rapport de progression
            if (onProgress) {
                const progress = (end / n_points) * 100;
                onProgress(progress);
            }
        }

        // Normalisation
        const min_raw = Math.min(...all_predictions);
        const max_raw = Math.max(...all_predictions);

        const predictions = all_predictions.map(p => {
            const normalized = (p - min_raw) / (max_raw - min_raw);
            const price = 50000 + normalized * 450000;
            return Math.round(price);
        });

        return {
            predictions,
            latitudes: this.geoCache.latitudes,
            longitudes: this.geoCache.longitudes,
            stats: {
                min: Math.min(...predictions),
                max: Math.max(...predictions),
                mean: predictions.reduce((a, b) => a + b, 0) / predictions.length,
                std: this.calculateStd(predictions)
            }
        };
    }

    calculateStd(arr) {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
        return Math.sqrt(variance);
    }
}

export default new HousingModel();