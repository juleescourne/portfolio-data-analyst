import React, { useState } from 'react';
import { Github, Layers, Code, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import DashboardImage from '../components/DashboardImage';
import ImageModal from '../components/ImageModal';
import RecommendationsSection from '../components/RecommendationsSection';
import { dashboardImages, goodreadsRecommendations, recommendationsAuthorPublisher, recommendationsGenresLangues } from '../data/GoodreadData';
import { getImageUrl } from '../utils/onnxConfig';

const DashboardPage = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar
                title="Analyse Goodreads"
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
                                    Analyse Goodreads
                                </h1>
                                <p className="text-gray-300 text-lg mb-6">
                                    Transformer 10K+ livres et 183M de notes en insights actionnables pour maximiser les ventes
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Power BI', 'Python', 'Pandas', 'SQL', 'DAX', 'Data Analytics'].map((tag) => (
                                        <span key={tag} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg text-sm border border-purple-500/30">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href="https://github.com/juleescourne/Goodreads_ETL"
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
                            <div className="text-3xl font-bold text-purple-400 mb-2">10,000+</div>
                            <div className="text-sm text-gray-400">Livres analysés</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                            <div className="text-3xl font-bold text-blue-400 mb-2">183M</div>
                            <div className="text-sm text-gray-400">Notes collectées</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                            <div className="text-3xl font-bold text-green-400 mb-2">3</div>
                            <div className="text-sm text-gray-400">Dashboards interactifs</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-600/20 to-amber-900/20 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
                            <div className="text-3xl font-bold text-amber-400 mb-2">9</div>
                            <div className="text-sm text-gray-400">Recommandations</div>
                        </div>
                    </div>

                    {/* 3. BLOC DÉMO */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-6">Dashboards Interactifs</h2>

                        {/* Analyse 1 : Livres */}
                        <div className="mb-8">
                            <DashboardImage
                                dashboard={getImageUrl(dashboardImages[0])}
                                onImageClick={setSelectedImage}
                            />
                            <div className="mt-4">
                                <RecommendationsSection recommendations={goodreadsRecommendations} />
                            </div>
                        </div>

                        {/* Analyse 2 : Auteurs & Éditeurs */}
                        <div className="mb-8">
                            <DashboardImage
                                dashboard={getImageUrl(dashboardImages[1])}
                                onImageClick={setSelectedImage}
                            />
                            <div className="mt-4">
                                <RecommendationsSection recommendations={recommendationsAuthorPublisher} />
                            </div>
                        </div>

                        {/* Analyse 3 : Genres & Langues */}
                        <div>
                            <DashboardImage
                                dashboard={getImageUrl(dashboardImages[2])}
                                onImageClick={setSelectedImage}
                            />
                            <div className="mt-4">
                                <RecommendationsSection recommendations={recommendationsGenresLangues} />
                            </div>
                        </div>
                    </div>

                    {/* 4. MÉTHODOLOGIE & STACK TECHNIQUE */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">Méthodologie & Stack Technique</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><Layers size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Analyse</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>Corrélation multivariée</li>
                                    <li>Clustering comportemental</li>
                                    <li>Analyse de variance</li>
                                    <li>Patterns saisonniers</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><Code size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Technologies</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>Power BI (visualisation)</li>
                                    <li>Python + Pandas (ETL)</li>
                                    <li>SQL (extraction)</li>
                                    <li>DAX (calculs avancés)</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl"><Package size={18} /></span>
                                </div>
                                <h3 className="text-lg font-bold text-purple-400 mb-3">Livrables</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li>3 dashboards interactifs</li>
                                    <li>9 recommandations actionnables</li>
                                    <li>Pipeline ETL automatisé</li>
                                    <li>Documentation technique</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Image Modal */}
            <ImageModal imagePath={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
};

export default DashboardPage;