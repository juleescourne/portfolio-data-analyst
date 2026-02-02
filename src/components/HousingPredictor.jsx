// components/HousingPredictor.jsx
import React, { useState } from 'react';
import { TrendingUp, Map } from 'lucide-react';
import Plot from 'react-plotly.js';
import housingModel from '../hooks/housingModel';

const FEATURE_BOUNDS = {
    housing_median_age: { min: 1, max: 52, median: 29 },
    total_rooms: { min: 2, max: 39320, median: 2127 },
    total_bedrooms: { min: 1, max: 6445, median: 435 },
    population: { min: 3, max: 35682, median: 1166 },
    households: { min: 1, max: 6082, median: 409 },
    median_income: { min: 0.5, max: 15.0, median: 3.87 }
};

const HousingPredictor = () => {
    const [params, setParams] = useState({
        housing_median_age: FEATURE_BOUNDS.housing_median_age.median,
        total_rooms: FEATURE_BOUNDS.total_rooms.median,
        total_bedrooms: FEATURE_BOUNDS.total_bedrooms.median,
        population: FEATURE_BOUNDS.population.median,
        households: FEATURE_BOUNDS.households.median,
        median_income: FEATURE_BOUNDS.median_income.median
    });

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleGenerate = async () => {
        setLoading(true);
        setIsCalculating(true);
        setResults(null);
        setProgress(0);

        try {
            // Callback de progression
            const onProgress = (prog) => {
                setProgress(Math.round(prog));
            };

            const predictionResults = await housingModel.predict(params, onProgress);
            console.log('Prédictions reçues:', predictionResults);

            setResults(predictionResults);
        } catch (error) {
            console.error('Erreur de prédiction:', error);
            alert('Erreur lors de la génération de la heatmap');
        } finally {
            setLoading(false);
            setIsCalculating(false);
            setProgress(0);
        }
    };

    const handleParamChange = (key, value) => {
        setParams(prev => ({
            ...prev,
            [key]: parseFloat(value)
        }));
    };

    // Calculer les métriques dérivées avec useMemo pour éviter recalculs
    const derivedMetrics = React.useMemo(() => {
        const roomsPerHH = params.total_rooms / Math.max(params.households, 1);
        const popPerHH = params.population / Math.max(params.households, 1);
        return { roomsPerHH, popPerHH };
    }, [params.total_rooms, params.households, params.population]);

    return (
        <div className="space-y-8">
            {/* Controls Panel */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="text-purple-400" />
                    Paramètres du Quartier
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Âge médian */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Âge médian des maisons (années)
                        </label>
                        <input
                            type="range"
                            min={FEATURE_BOUNDS.housing_median_age.min}
                            max={FEATURE_BOUNDS.housing_median_age.max}
                            value={params.housing_median_age}
                            onChange={(e) => handleParamChange('housing_median_age', e.target.value)}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="text-purple-400 font-semibold mt-1">
                            {params.housing_median_age} ans
                        </div>
                    </div>

                    {/* Total pièces */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Total pièces (quartier)
                        </label>
                        <input
                            type="range"
                            min={FEATURE_BOUNDS.total_rooms.min}
                            max={FEATURE_BOUNDS.total_rooms.max}
                            step={100}
                            value={params.total_rooms}
                            onChange={(e) => handleParamChange('total_rooms', e.target.value)}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="text-purple-400 font-semibold mt-1">
                            {params.total_rooms.toLocaleString()}
                        </div>
                    </div>

                    {/* Total chambres */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Total chambres (quartier)
                        </label>
                        <input
                            type="range"
                            min={FEATURE_BOUNDS.total_bedrooms.min}
                            max={FEATURE_BOUNDS.total_bedrooms.max}
                            step={50}
                            value={params.total_bedrooms}
                            onChange={(e) => handleParamChange('total_bedrooms', e.target.value)}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="text-purple-400 font-semibold mt-1">
                            {params.total_bedrooms.toLocaleString()}
                        </div>
                    </div>

                    {/* Population */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Population (quartier)
                        </label>
                        <input
                            type="range"
                            min={FEATURE_BOUNDS.population.min}
                            max={FEATURE_BOUNDS.population.max}
                            step={100}
                            value={params.population}
                            onChange={(e) => handleParamChange('population', e.target.value)}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="text-purple-400 font-semibold mt-1">
                            {params.population.toLocaleString()}
                        </div>
                    </div>

                    {/* Households */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Nombre de foyers
                        </label>
                        <input
                            type="range"
                            min={FEATURE_BOUNDS.households.min}
                            max={FEATURE_BOUNDS.households.max}
                            step={10}
                            value={params.households}
                            onChange={(e) => handleParamChange('households', e.target.value)}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="text-purple-400 font-semibold mt-1">
                            {params.households.toLocaleString()}
                        </div>
                    </div>

                    {/* Revenu médian */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Revenu médian (×10k$)
                        </label>
                        <input
                            type="range"
                            min={FEATURE_BOUNDS.median_income.min}
                            max={FEATURE_BOUNDS.median_income.max}
                            step={0.1}
                            value={params.median_income}
                            onChange={(e) => handleParamChange('median_income', e.target.value)}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="text-purple-400 font-semibold mt-1">
                            ${(params.median_income * 10000).toLocaleString()}/an
                        </div>
                    </div>
                </div>

                {/* Métriques dérivées */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-600">
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm">Âge Médian</div>
                        <div className="text-white font-bold text-lg">{params.housing_median_age} ans</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm">Revenu Médian</div>
                        <div className="text-white font-bold text-lg">${(params.median_income * 10000).toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm">Pièces/Foyer</div>
                        <div className="text-white font-bold text-lg">{derivedMetrics.roomsPerHH.toFixed(1)}</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm">Pop/Foyer</div>
                        <div className="text-white font-bold text-lg">{derivedMetrics.popPerHH.toFixed(1)}</div>
                    </div>
                </div>

                {/* Bouton de génération */}
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Génération en cours...
                        </>
                    ) : (
                        <>
                            <Map size={20} />
                            Générer la Heatmap
                        </>
                    )}
                </button>
            </div>

            {/* Results */}
            {isCalculating && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700">
                    <div className="flex flex-col items-center justify-center h-[600px]">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-purple-400 font-bold text-sm">{progress}%</span>
                            </div>
                        </div>
                        <div className="text-white mt-6 text-xl font-semibold">Calcul en cours...</div>
                        <div className="text-gray-400 mt-2 text-sm">Génération des prédictions pour la Californie</div>

                        {/* Barre de progression */}
                        <div className="w-full max-w-md mt-6">
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {!isCalculating && <ResultsSection results={results} />}
        </div>
    );
};

// Composant Results mémoïsé pour éviter re-renders inutiles
const ResultsSection = React.memo(({ results }) => {
    if (!results) return null;

    return (
        <>
            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                    <div className="text-gray-300 text-sm mb-1">Prix Min</div>
                    <div className="text-2xl font-bold text-green-400">
                        ${results.stats.min.toLocaleString()}
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                    <div className="text-gray-300 text-sm mb-1">Prix Moyen</div>
                    <div className="text-2xl font-bold text-blue-400">
                        ${results.stats.mean.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                    <div className="text-gray-300 text-sm mb-1">Prix Max</div>
                    <div className="text-2xl font-bold text-purple-400">
                        ${results.stats.max.toLocaleString()}
                    </div>
                </div>
                <div className="bg-gradient-to-br from-orange-600/20 to-orange-900/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                    <div className="text-gray-300 text-sm mb-1">Écart-type</div>
                    <div className="text-2xl font-bold text-orange-400">
                        ${results.stats.std.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>
            </div>

            {/* Heatmap */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Map className="text-purple-400" />
                    Carte Thermique des Prix
                </h3>
                <HeatmapPlot results={results} />
            </div>
        </>
    );
}, (prevProps, nextProps) => {
    return prevProps.results === nextProps.results;
});

// Composant Heatmap avec Plotly - Scatter géographique simple
const HeatmapPlot = React.memo(({ results }) => {
    console.log('🗺️ HeatmapPlot rendering...', results);

    // Vérifications de sécurité
    if (!results || !results.latitudes || !results.longitudes || !results.predictions) {
        console.error('❌ Données manquantes');
        return <div className="text-red-400 p-4">Erreur: Données géographiques manquantes</div>;
    }

    console.log('✅ Données OK:', {
        points: results.latitudes.length,
        priceRange: [Math.min(...results.predictions), Math.max(...results.predictions)]
    });

    // Utiliser un scatter plot classique qui fonctionne toujours
    const data = [{
        type: 'scatter',
        x: results.longitudes,
        y: results.latitudes,
        mode: 'markers',
        marker: {
            size: 8,
            color: results.predictions,
            colorscale: [
                [0, '#00FF00'],      // Vert - Prix bas
                [0.2, '#7FFF00'],    // Vert clair
                [0.4, '#FFD700'],    // Jaune
                [0.6, '#FF8C00'],    // Orange
                [0.8, '#FF4500'],    // Rouge orange
                [1, '#8B0000']       // Rouge foncé - Prix haut
            ],
            showscale: true,
            colorbar: {
                title: 'Prix ($)',
                tickformat: '$,.0f',
                thickness: 20,
                len: 0.7
            },
            opacity: 0.8,
            line: {
                width: 0.5,
                color: 'rgba(255,255,255,0.3)'
            }
        },
        text: results.predictions.map((p, i) =>
            `Prix: $${Math.round(p).toLocaleString()}<br>` +
            `Lat: ${results.latitudes[i].toFixed(2)}°<br>` +
            `Lon: ${results.longitudes[i].toFixed(2)}°`
        ),
        hovertemplate: '%{text}<extra></extra>'
    }];

    const layout = {
        title: {
            text: 'Californie - Distribution des Prix Immobiliers',
            font: { color: '#e2e8f0', size: 16 },
            x: 0.5,
            xanchor: 'center'
        },
        xaxis: {
            title: 'Longitude',
            gridcolor: 'rgba(148, 163, 184, 0.2)',
            color: '#94a3b8',
            zeroline: false
        },
        yaxis: {
            title: 'Latitude',
            gridcolor: 'rgba(148, 163, 184, 0.2)',
            color: '#94a3b8',
            zeroline: false,
            scaleanchor: 'x',
            scaleratio: 1.3  // Ajuster le ratio pour mieux représenter la forme de la Californie
        },
        height: 600,
        margin: { t: 50, b: 50, l: 60, r: 100 },
        paper_bgcolor: 'rgba(30, 41, 59, 0.5)',
        plot_bgcolor: 'rgba(15, 23, 42, 0.8)',
        hovermode: 'closest'
    };

    const config = {
        displayModeBar: true,
        displaylogo: false,
        responsive: true,
        modeBarButtonsToRemove: ['lasso2d', 'select2d']
    };

    return (
        <div className="w-full">
            <div className="mb-3 text-sm text-gray-400 flex items-center gap-2">
                <Map size={16} />
                Chaque point représente un quartier en Californie
            </div>

            <Plot
                key={`plot-${results.stats.mean}-${results.stats.std}`}
                data={data}
                layout={layout}
                config={config}
                className="w-full"
                useResizeHandler={true}
                style={{ width: '100%', height: '600px' }}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    // Ne re-render que si les résultats changent réellement
    return prevProps.results === nextProps.results;
});

export default HousingPredictor;