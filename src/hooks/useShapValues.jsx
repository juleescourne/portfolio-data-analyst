// hooks/useShapValues.js
import { useState, useEffect } from 'react';
import { getDataUrl } from '../utils/onnxConfig';

export const useShapValues = () => {
    const [shapLookup, setShapLookup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadShapData = async () => {
            try {
                setIsLoading(true);
                //const response = await fetch('/models/shap_lookup.json');
                const response = await fetch(getDataUrl('shap_lookup'));
                if (!response.ok) {
                    throw new Error('Impossible de charger les SHAP values');
                }

                const data = await response.json();

                // DEBUG: Afficher quelques clés pour voir leur format
                const sampleKeys = Object.keys(data).slice(0, 10);
                console.log('📋 Exemples de clés dans le JSON:', sampleKeys);

                // DEBUG: Chercher des clés qui commencent par "1|France|35"
                const matchingKeys = Object.keys(data).filter(k => k.startsWith('1|France|35'));
                console.log('🔍 Clés trouvées pour France, âge ~35:', matchingKeys.slice(0, 5));

                setShapLookup(data);
                setIsLoading(false);
                console.log('✅ SHAP lookup chargé:', Object.keys(data).length, 'combinaisons');
            } catch (err) {
                console.error('❌ Erreur chargement SHAP:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        loadShapData();
    }, []);



    const findClosestMatch = (userInputs) => {
        if (!shapLookup) return null;

        const balanceStep = 10000;
        const ageStep = 5;

        // IMPORTANT: Ajuster l'âge pour matcher la grille Python qui commence à 18
        // Python génère: 18, 23, 28, 33, 38, 43...
        // Formule: 18 + (floor((age - 18) / 5) * 5)
        let roundedAge = userInputs.age;
        if (roundedAge < 18) {
            roundedAge = 18;
        } else {
            // Arrondir vers le bas au multiple de 5 le plus proche depuis 18
            roundedAge = 18 + Math.floor((roundedAge - 18) / ageStep) * ageStep;
        }

        // Arrondir la balance normalement
        const roundedBalance = Math.round(userInputs.balance / balanceStep) * balanceStep;

        const key = `${userInputs.num_of_products}|${userInputs.geography}|${roundedAge}|${userInputs.gender}|${roundedBalance}|${userInputs.is_active_member}`;

        console.log('🔍 Âge original:', userInputs.age, '→ Âge arrondi:', roundedAge);
        console.log('🔍 Balance originale:', userInputs.balance, '→ Balance arrondie:', roundedBalance);
        console.log('🔍 Clé recherchée:', key);
        console.log('🔍 Clé existe?', key in shapLookup);

        return shapLookup[key] || null;
    };

    const getShapForInputs = (userInputs) => {
        if (!shapLookup) return null;

        // Essayer d'abord la correspondance exacte
        const exactKey = `${userInputs.num_of_products}|${userInputs.geography}|${userInputs.age}|${userInputs.gender}|${userInputs.balance}|${userInputs.is_active_member}`;

        if (shapLookup[exactKey]) {
            console.log('✅ Correspondance exacte trouvée');
            return shapLookup[exactKey];
        }

        // Sinon, chercher la correspondance la plus proche
        const closestMatch = findClosestMatch(userInputs);

        if (closestMatch) {
            console.log('✅ Correspondance approximative trouvée');
            return closestMatch;
        }

        console.warn('⚠️ Aucune combinaison trouvée pour:', exactKey);
        return null;
    };

    return { shapLookup, getShapForInputs, isLoading, error };
};

// Labels en français
export const FEATURE_LABELS = {
    'product_1_inactive': 'Produit 1 et inactif',
    'is_active_member': 'Client actif (12 mois)',
    'num_of_products': 'Nombre de produits',
    'product_engagement_score': 'Score d\'engagement',
    'medium_balance_risk': 'Épargne à risque (100-140K)',
    'age': 'Âge du client',
    'geography_Germany': 'Localisation Allemagne',
    'product_1_AND_germany': 'Produit 1 + Allemagne',
    'product_1_AND_female': 'Produit 1 + Femme'
};