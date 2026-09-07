import { useState } from 'react';
import { Github, Layers, Code, Package, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import DashboardImage from '../components/DashboardImage';
import ImageModal from '../components/ImageModal';
import RecommendationsSection from '../components/RecommendationsSection';
import { dashboardImages, goodreadsRecommendations, recommendationsAuthorPublisher, recommendationsGenresLangues } from '../data/GoodreadData';

const DashboardPage = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar title="Goodreads Analytics ETL & BI" showBackButton onBackClick={onBack}/>
        <div className="pt-24 px-6 pb-12"><div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"><div className="flex-1"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Goodreads Analytics ETL & BI</h1><p className="text-gray-300 text-lg mb-6">Pipeline automatisé et analyse exploratoire d’un catalogue Goodreads : qualité, engagement, modélisation analytique et restitution Power BI.</p><div className="flex flex-wrap gap-2">{['Python','Pandas','SQL','SQLite','ETL','Star Schema','Power BI','Pytest'].map((tag)=><span key={tag} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg text-sm border border-purple-500/30">{tag}</span>)}</div></div><a href="https://github.com/juleescourne/goodreads-analytics-etl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"><Github size={18}/>Code source</a></div>
            </div>
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-5 flex gap-3"><Info className="text-amber-300 flex-shrink-0"/><p className="text-amber-100/90 text-sm leading-relaxed">Le dataset décrit surtout le catalogue, les notes et l’engagement. Il ne contient pas de chiffre d’affaires permettant de conclure sur les ventes. Les pistes métier ci-dessous sont donc formulées comme des <strong>hypothèses à tester</strong>, et les corrélations ne sont pas présentées comme des relations causales.</p></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[['10K+','Livres analysés'],['183M','Notes agrégées'],['3','Vues BI'],['ETL','Automatisé']].map(([v,l])=><div key={l} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"><div className="text-3xl font-bold text-purple-300 mb-2">{v}</div><div className="text-sm text-gray-400">{l}</div></div>)}</div>
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700"><h2 className="text-2xl font-bold text-white mb-6">Dashboards & analyses</h2>{[[dashboardImages[0],goodreadsRecommendations],[dashboardImages[1],recommendationsAuthorPublisher],[dashboardImages[2],recommendationsGenresLangues]].map(([dashboard,recs])=><div key={dashboard.id} className="mb-10 last:mb-0"><DashboardImage dashboard={dashboard} onImageClick={setSelectedImage}/><RecommendationsSection recommendations={recs}/></div>)}</div>
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700"><h2 className="text-2xl font-bold text-white mb-8 text-center">Méthodologie & stack</h2><div className="grid md:grid-cols-3 gap-8">{[
                [Layers,'Data Engineering',['Extraction CSV','Nettoyage / validation','Schéma en étoile','Chargement incrémental']],
                [Code,'Analytics',['SQL & Pandas','Segmentation exploratoire','KPI & distributions','Power BI / DAX']],
                [Package,'Qualité',['Tests automatisés','Contrôles de données','Pipeline planifié','Documentation']]
            ].map(([Icon,title,items])=><div key={title} className="text-center"><div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Icon/></div><h3 className="text-lg font-bold text-purple-400 mb-3">{title}</h3><ul className="space-y-2 text-gray-300 text-sm">{items.map(i=><li key={i}>{i}</li>)}</ul></div>)}</div></div>
        </div></div>
        <ImageModal imagePath={selectedImage} onClose={() => setSelectedImage(null)}/>
    </div>;
};
export default DashboardPage;
