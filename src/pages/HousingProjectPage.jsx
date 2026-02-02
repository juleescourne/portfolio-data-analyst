// pages/HousingProjectPage.jsx - STRUCTURE STANDARDISÉE
import React from 'react';
import { Github, Code, Activity, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import HousingPredictor from '../components/HousingPredictor';

const HousingProjectPage = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar
                title="California Housing Price"
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
                                    Prédiction Prix Immobilier - Californie
                                </h1>
                                <p className="text-gray-300 text-lg mb-6">
                                    Modèle XGBoost pour prédire le prix médian des maisons par quartier en Californie avec une précision de R² = 0.834
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Python", "XGBoost", "Feature Engineering", "Matplotlib", "Seaborn", "GeoPandas", "Jupyter Notebook", "Real estate"].map((tag) => (
                                        <span key={tag} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg text-sm border border-purple-500/30">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href="https://github.com/juleescourne/California-Housing-Price"
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
                            <div className="text-3xl font-bold text-purple-400 mb-2">R² = 0.834</div>
                            <div className="text-sm text-gray-400">Précision du modèle</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                            <div className="text-3xl font-bold text-blue-400 mb-2">$40,273</div>
                            <div className="text-sm text-gray-400">RMSE moyen</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                            <div className="text-3xl font-bold text-green-400 mb-2">15</div>
                            <div className="text-sm text-gray-400">Features optimisées</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-600/20 to-amber-900/20 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
                            <div className="text-3xl font-bold text-amber-400 mb-2">20,640</div>
                            <div className="text-sm text-gray-400">Quartiers analysés</div>
                        </div>
                    </div>

                    {/* 3. BLOC DÉMO */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-6">Démo Interactive</h2>
                        <p className="text-gray-400 mb-6">
                            Testez le modèle en temps réel : ajustez les paramètres pour générer une heatmap des prix en Californie
                        </p>
                        <HousingPredictor />
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
                                    <li>Analyse descriptive / exploratoire</li>
                                    <li>Feature Engineering avancé</li>
                                    <li>Sélection features (37→15)</li>
                                    <li>RandomizedSearchCV</li>
                                    <li>Validation croisée 5-fold</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><Code size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Technologies</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>XGBoost (modèle)</li>
                                    <li>Pandas + NumPy (données)</li>
                                    <li>Scikit-learn (ML)</li>
                                    <li>Matplotlib / Seaborn (visualisation)</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><BarChart2 size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Résultats Clés</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>+0.8% R² vs baseline</li>
                                    <li>+50% réduction features</li>
                                    <li>Généralisation parfaite</li>
                                    <li>Variance CV = ±0.0149</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HousingProjectPage;