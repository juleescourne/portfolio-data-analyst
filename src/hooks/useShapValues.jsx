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
                const response = await fetch(getDataUrl('shap_lookup.json'));
                if (!response.ok) throw new Error('Impossible de charger les valeurs SHAP');
                const data = await response.json();
                setShapLookup(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadShapData();
    }, []);

    const findClosestMatch = (userInputs) => {
        if (!shapLookup) return null;
        const balanceStep = 10000;
        const ageStep = 5;
        const roundedAge = userInputs.age < 18
            ? 18
            : 18 + Math.floor((userInputs.age - 18) / ageStep) * ageStep;
        const roundedBalance = Math.round(userInputs.balance / balanceStep) * balanceStep;
        const key = `${userInputs.num_of_products}|${userInputs.geography}|${roundedAge}|${userInputs.gender}|${roundedBalance}|${userInputs.is_active_member}`;
        return shapLookup[key] || null;
    };

    const getShapForInputs = (userInputs) => {
        if (!shapLookup) return null;
        const exactKey = `${userInputs.num_of_products}|${userInputs.geography}|${userInputs.age}|${userInputs.gender}|${userInputs.balance}|${userInputs.is_active_member}`;
        return shapLookup[exactKey] || findClosestMatch(userInputs);
    };

    return { getShapForInputs, isLoading, error };
};

export const FEATURE_LABELS = {
    product_1_inactive: 'Produit 1 et inactif',
    is_active_member: 'Client actif (12 mois)',
    num_of_products: 'Nombre de produits',
    product_engagement_score: "Score d'engagement",
    medium_balance_risk: 'Épargne à risque (100-140K)',
    age: 'Âge du client',
    geography_Germany: 'Localisation Allemagne',
    product_1_AND_germany: 'Produit 1 + Allemagne',
    product_1_AND_female: 'Produit 1 + Femme'
};
