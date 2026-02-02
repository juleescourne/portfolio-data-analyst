// pages/ChurnPredictionPage.jsx - STRUCTURE STANDARDISÉE
import React, { useState, useEffect, useRef } from 'react';
import { Github, Loader, Code, Activity, BarChart2 } from 'lucide-react';
import * as ort from 'onnxruntime-web';
import { useShapValues, FEATURE_LABELS } from '../hooks/useShapValues';
import Navbar from '../components/Navbar';
import ort, { initONNX, getModelUrl } from './utils/onnxConfig';

const ChurnPredictionPage = ({ onBack }) => {
    // États pour les inputs utilisateur
    const [userInputs, setUserInputs] = useState({
        num_of_products: 1,
        geography: 'France',
        age: 35,
        gender: 'Homme',
        balance: 50000,
        is_active_member: 1
    });

    const [churnPrediction, setChurnPrediction] = useState(0);
    const [churnProbability, setChurnProbability] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [isLoadingModel, setIsLoadingModel] = useState(false);
    const sessionRef = useRef(null);

    const { getShapForInputs, isLoading: shapLoading, error: shapError } = useShapValues();

    // Charger le modèle ONNX au montage du composant
    useEffect(() => {
        initONNX();
        loadONNXModel();
    }, []);

    /*const loadONNXModel = async () => {
        try {
            setIsLoadingModel(true);
            const session = await ort.InferenceSession.create('/models/xgb_churn_model.onnx');
            sessionRef.current = session;
            setModelLoaded(true);
            setIsLoadingModel(false);
        } catch (error) {
            console.error('Erreur lors du chargement du modèle:', error);
            setModelLoaded(false);
            setIsLoadingModel(false);
        }
    };*/

    const loadONNXModel = async () => {
        try {
            setIsLoadingModel(true);
            // Charger depuis jsDelivr CDN
            const modelUrl = getModelUrl('xgb_churn_model');
            const session = await ort.InferenceSession.create(modelUrl);
            sessionRef.current = session;
            setModelLoaded(true);
            setIsLoadingModel(false);
        } catch (error) {
            console.error('Erreur lors du chargement du modèle:', error);
            setModelLoaded(false);
            setIsLoadingModel(false);
        }
    };

    // Fonction pour calculer les features du modèle
    const calculateFeatures = (inputs) => {
        const features = [
            (inputs.num_of_products === 1 && inputs.is_active_member === 0) ? 1 : 0,
            inputs.num_of_products,
            (inputs.num_of_products === 1 && inputs.geography === 'Allemagne') ? 1 : 0,
            inputs.num_of_products * inputs.is_active_member,
            (inputs.balance >= 100000 && inputs.balance <= 140000) ? 1 : 0,
            inputs.age,
            inputs.geography === 'Allemagne' ? 1 : 0,
            (inputs.num_of_products === 1 && inputs.gender === 'Femme') ? 1 : 0,
            inputs.is_active_member
        ];
        return features;
    };

    // Prédiction avec le modèle ONNX
    const predictWithONNX = async (features) => {
        try {
            const inputTensor = new ort.Tensor('float32', new Float32Array(features), [1, 9]);
            const feeds = { float_input: inputTensor };
            const results = await sessionRef.current.run(feeds);

            let prediction = 0;
            if (results.label) {
                prediction = results.label.data[0];
            } else if (results.output) {
                prediction = results.output.data[0];
            } else {
                const outputName = Object.keys(results)[0];
                prediction = results[outputName].data[0];
            }

            let probabilities = null;
            if (results.probabilities) {
                const probs = Array.from(results.probabilities.data);
                probabilities = {
                    no_churn: probs[0],
                    churn: probs[1]
                };
            }

            if (typeof prediction === 'bigint') {
                prediction = Number(prediction);
            }

            return {
                prediction: prediction,
                probabilities: probabilities
            };
        } catch (error) {
            console.error('Erreur de prédiction:', error);
            return {
                prediction: 0,
                probabilities: null
            };
        }
    };

    useEffect(() => {
        const updatePrediction = async () => {
            setIsAnimating(true);
            const features = calculateFeatures(userInputs);

            let result = { prediction: 0, probabilities: null };
            if (modelLoaded && sessionRef.current) {
                result = await predictWithONNX(features);
            }

            setTimeout(() => {
                setChurnPrediction(result.prediction);
                setChurnProbability(result.probabilities);
                setIsAnimating(false);
            }, 400);
        };

        updatePrediction();
    }, [userInputs, modelLoaded]);

    const handleInputChange = (field, value) => {
        setUserInputs(prev => ({ ...prev, [field]: value }));
    };

    const getFeatureContributions = () => {
        const shapValues = getShapForInputs(userInputs);
        if (!shapValues) return [];
        return shapValues.map(shap => ({
            name: FEATURE_LABELS[shap.feature] || shap.feature,
            value: Math.round(shap.abs_value * 100),
            impact: shap.shap_value > 0 ? 'negative' : 'positive',
            shap_value: shap.shap_value
        }));
    };

    const featureContributions = getFeatureContributions();
    const currentFeatures = calculateFeatures(userInputs);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar
                title="Prédiction du Churn Client"
                showBackButton={true}
                onBackClick={onBack}
            />

            <div className="pt-24 px-6 pb-12">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* 1. BLOC PRINCIPAL - Titre, Objectif, Technologies, Github */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex-1">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Prédiction du Churn Client
                                </h1>
                                <p className="text-gray-300 text-lg mb-6">
                                    Modèle XGBoost pour prédire le risque de départ client avec une précision de 87% et identifier les facteurs clés via SHAP
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Python', 'XGBoost', 'ONNX', 'React', 'SHAP', 'Feature Engineering'].map((tag) => (
                                        <span key={tag} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg text-sm border border-purple-500/30">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href="https://github.com/juleescourne/Churn_analysis"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition whitespace-nowrap"
                                >
                                    <Github size={18} />
                                    Code Source
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 2. RÉSULTATS GLOBAUX - Ligne de blocs KPI */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                            <div className="text-3xl font-bold text-purple-400 mb-2">87%</div>
                            <div className="text-sm text-gray-400">Précision du modèle</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                            <div className="text-3xl font-bold text-blue-400 mb-2">9</div>
                            <div className="text-sm text-gray-400">Features optimisées</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                            <div className="text-3xl font-bold text-green-400 mb-2">
                                {modelLoaded ? 'ONNX' : 'OFF'}
                            </div>
                            <div className="text-sm text-gray-400">Modèle temps réel</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-600/20 to-amber-900/20 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
                            <div className="text-3xl font-bold text-amber-400 mb-2">10K+</div>
                            <div className="text-sm text-gray-400">Clients analysés</div>
                        </div>
                    </div>

                    {/* 3. BLOC DÉMO */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-6">Démo Interactive</h2>
                        <p className="text-gray-400 mb-6">
                            Ajustez les paramètres client pour voir la prédiction en temps réel et les facteurs d'influence (SHAP)
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Inputs */}
                            <div className="space-y-4">
                                {/* Âge */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Âge: {userInputs.age} ans
                                    </label>
                                    <input
                                        type="range"
                                        min="18"
                                        max="100"
                                        value={userInputs.age}
                                        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                                        className="w-full accent-purple-500"
                                    />
                                </div>

                                {/* Genre */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Genre</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Homme', 'Femme'].map(genre => (
                                            <button
                                                key={genre}
                                                onClick={() => handleInputChange('gender', genre)}
                                                className={`p-3 rounded-lg border transition ${userInputs.gender === genre
                                                    ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                                                    : 'bg-slate-700/50 border-slate-600 text-gray-400'
                                                    }`}
                                            >
                                                {genre}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Localisation */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Localisation</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['France', 'Allemagne', 'Espagne'].map(country => (
                                            <button
                                                key={country}
                                                onClick={() => handleInputChange('geography', country)}
                                                className={`p-3 rounded-lg border transition ${userInputs.geography === country
                                                    ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                                                    : 'bg-slate-700/50 border-slate-600 text-gray-400'
                                                    }`}
                                            >
                                                {country}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Nombre de produits */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Produits détenus</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[1, 2, 3, 4].map(num => (
                                            <button
                                                key={num}
                                                onClick={() => handleInputChange('num_of_products', num)}
                                                className={`p-3 rounded-lg border transition font-bold ${userInputs.num_of_products === num
                                                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                                                    : 'bg-slate-700/50 border-slate-600 text-gray-400'
                                                    }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Épargne */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Épargne: {userInputs.balance.toLocaleString('fr-FR')} €
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="251000"
                                        step="1000"
                                        value={userInputs.balance}
                                        onChange={(e) => handleInputChange('balance', parseInt(e.target.value))}
                                        className="w-full accent-blue-500"
                                    />
                                </div>

                                {/* Actif */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Actif dernière année ?</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handleInputChange('is_active_member', 1)}
                                            className={`p-3 rounded-lg border transition ${userInputs.is_active_member === 1
                                                ? 'bg-green-600/20 border-green-500 text-green-300'
                                                : 'bg-slate-700/50 border-slate-600 text-gray-400'
                                                }`}
                                        >
                                            ✅ Oui
                                        </button>
                                        <button
                                            onClick={() => handleInputChange('is_active_member', 0)}
                                            className={`p-3 rounded-lg border transition ${userInputs.is_active_member === 0
                                                ? 'bg-red-600/20 border-red-500 text-red-300'
                                                : 'bg-slate-700/50 border-slate-600 text-gray-400'
                                                }`}
                                        >
                                            ❌ Non
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Résultats */}
                            <div className="space-y-4">
                                {/* Probabilité de Churn */}
                                {churnProbability && (
                                    <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                                        <h3 className="text-lg font-bold text-white mb-4 text-center">Probabilité de Churn</h3>
                                        <div className="text-center mb-4">
                                            <div className={`text-6xl font-black mb-2 ${churnProbability.churn > 0.7 ? 'text-red-400' :
                                                churnProbability.churn > 0.4 ? 'text-amber-400' : 'text-green-400'
                                                }`}>
                                                {(churnProbability.churn * 100).toFixed(1)}%
                                            </div>
                                            <div className="text-sm text-gray-400">Risque de départ</div>
                                        </div>
                                        <div className="w-full h-4 bg-slate-600 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-500 ${churnProbability.churn > 0.7 ? 'bg-red-500' :
                                                    churnProbability.churn > 0.4 ? 'bg-amber-500' : 'bg-green-500'
                                                    }`}
                                                style={{ width: `${churnProbability.churn * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Facteurs SHAP */}
                                <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                                    <h3 className="text-lg font-bold text-white mb-4">Facteurs Clés (SHAP)</h3>
                                    {shapLoading ? (
                                        <div className="text-center py-4">
                                            <Loader className="animate-spin mx-auto mb-2 text-purple-400" size={24} />
                                            <p className="text-gray-400 text-sm">Chargement...</p>
                                        </div>
                                    ) : featureContributions.length > 0 ? (
                                        <div className="space-y-3">
                                            {featureContributions.slice(0, 5).map((feature, idx) => (
                                                <div key={idx}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm text-gray-300">{feature.name}</span>
                                                        <span className={`text-sm font-bold ${feature.impact === 'negative' ? 'text-red-400' : 'text-green-400'
                                                            }`}>
                                                            {feature.value}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full transition-all duration-500 ${feature.impact === 'negative' ? 'bg-red-500' : 'bg-green-500'
                                                                }`}
                                                            style={{ width: `${Math.min(feature.value * 2, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-amber-400 text-sm">
                                            ⚠️ Combinaison non trouvée dans les SHAP
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. MÉTHODOLOGIE & STACK TECHNIQUE */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">Méthodologie & Stack Technique</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><Activity size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Méthodologie</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>Feature Engineering avancé</li>
                                    <li>Sélection features optimale</li>
                                    <li>GridSearchCV hyperparamètres</li>
                                    <li>SHAP pour interprétabilité</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><Code size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Technologies</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>XGBoost (classification)</li>
                                    <li>ONNX Runtime Web</li>
                                    <li>React + Tailwind</li>
                                    <li>SHAP values</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><BarChart2 size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Résultats Clés</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>87% de précision</li>
                                    <li>9 features optimisées</li>
                                    <li>Inférence temps réel</li>
                                    <li>Explications SHAP</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChurnPredictionPage;