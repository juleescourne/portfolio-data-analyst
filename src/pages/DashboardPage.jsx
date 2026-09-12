import { useState } from 'react';
import GoodreadsExplorer from '../components/GoodreadsExplorer';
import { Github, Layers, Code, Package, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import DashboardImage from '../components/DashboardImage';
import ImageModal from '../components/ImageModal';
import RecommendationsSection from '../components/RecommendationsSection';
import { dashboardImages, goodreadsRecommendations, recommendationsAuthorPublisher, recommendationsGenresLangues } from '../data/GoodreadData';

const DashboardPage = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    return <div className="min-h-screen bg-paper text-ink">
        <Navbar title="Goodreads Analytics ETL & BI" showBackButton onBackClick={onBack}/>
        <div className="pt-24 px-5 sm:px-6 pb-16"><div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-surface rounded-lg p-5 sm:p-8 border border-line">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"><div className="flex-1"><h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4 leading-tight">Goodreads Analytics ETL & BI</h1><p className="text-ink-2 text-lg mb-6">Pipeline automatisé et analyse exploratoire d’un catalogue Goodreads : qualité, engagement, modélisation analytique et restitution Power BI.</p><div className="flex flex-wrap gap-2">{['Python','Pandas','SQL','SQLite','ETL','Star Schema','Power BI','Pytest'].map((tag)=><span key={tag} className="font-mono bg-raised text-muted px-2 py-1 rounded text-sm border border-line-soft">{tag}</span>)}</div></div><a href="https://github.com/juleescourne/goodreads-analytics-etl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-surface border border-line hover:border-accent hover:text-accent text-ink-2 px-4 py-2.5 rounded-md font-medium transition"><Github size={18}/>Code source</a></div>
            </div>
            <GoodreadsExplorer />
            <div className="bg-accent-soft border border-line rounded-lg p-5 flex gap-3"><Info className="text-accent flex-shrink-0"/><p className="text-ink-2 text-sm leading-relaxed">Le dataset décrit surtout le catalogue, les notes et l’engagement. Il ne contient pas de chiffre d’affaires permettant de conclure sur les ventes. Les pistes métier ci-dessous sont donc formulées comme des <strong>hypothèses à tester</strong>, et les corrélations ne sont pas présentées comme des relations causales.</p></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[['10K+','Livres du catalogue historique'],['183M','Notes agrégées'],['3','Vues BI'],['ETL','Automatisé']].map(([v,l])=><div key={l} className="bg-surface rounded-lg p-4 sm:p-6 border border-line"><div className="font-mono tabular text-2xl sm:text-3xl font-semibold text-ink mb-2">{v}</div><div className="text-sm text-muted">{l}</div></div>)}</div>
            <div className="bg-surface rounded-lg p-5 sm:p-8 border border-line"><h2 className="font-display text-2xl font-semibold text-ink mb-6 leading-tight">Captures Power BI · analyse historique</h2>{[[dashboardImages[0],goodreadsRecommendations],[dashboardImages[1],recommendationsAuthorPublisher],[dashboardImages[2],recommendationsGenresLangues]].map(([dashboard,recs])=><div key={dashboard.id} className="mb-10 last:mb-0"><DashboardImage dashboard={dashboard} onImageClick={setSelectedImage}/><RecommendationsSection recommendations={recs}/></div>)}</div>
            <div className="bg-surface rounded-lg p-5 sm:p-8 border border-line"><h2 className="font-display text-2xl font-semibold text-ink mb-8 text-center leading-tight">Méthodologie & stack</h2><div className="grid md:grid-cols-3 gap-8">{[
                [Layers,'Data Engineering',['Extraction CSV','Nettoyage / validation','Schéma en étoile','Chargement incrémental']],
                [Code,'Analytics',['SQL & Pandas','Segmentation exploratoire','KPI & distributions','Power BI / DAX']],
                [Package,'Qualité',['Tests automatisés','Contrôles de données','Pipeline planifié','Documentation']]
            ].map(([Icon,title,items])=><div key={title} className="text-center"><div className="bg-accent-soft w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Icon/></div><h3 className="font-display text-lg font-semibold text-accent mb-3 leading-tight">{title}</h3><ul className="space-y-2 text-ink-2 text-sm">{items.map(i=><li key={i}>{i}</li>)}</ul></div>)}</div></div>
        </div></div>
        <ImageModal imagePath={selectedImage} onClose={() => setSelectedImage(null)}/>
    </div>;
};
export default DashboardPage;
