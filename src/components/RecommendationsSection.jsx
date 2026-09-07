import { useState } from 'react';
import { ChevronDown, ChevronUp, Target } from 'lucide-react';

const RecommendationCard = ({ icon: Icon, title, problem, objective, actions, isExpanded }) => (
    <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition">
        <div className="p-6 flex items-start gap-4">
            <div className="bg-purple-600/20 p-3 rounded-lg flex-shrink-0"><Icon className="text-purple-400" size={24}/></div>
            <div className="flex-1 min-w-0"><h3 className="text-xl font-bold text-white mb-2">{title}</h3><p className="text-gray-400 text-sm">{problem}</p></div>
        </div>
        {isExpanded && <div className="px-6 pb-6 space-y-4 border-t border-purple-500/10 pt-4">
            <div><h4 className="text-sm font-semibold text-amber-300 mb-2">Observation</h4><p className="text-gray-300 text-sm">{problem}</p></div>
            <div><h4 className="text-sm font-semibold text-green-400 mb-2">Question à tester</h4><p className="text-gray-300 text-sm">{objective}</p></div>
            <div><h4 className="text-sm font-semibold text-purple-400 mb-2">Pistes d’expérimentation</h4><ul className="space-y-2">{actions.map((action) => <li key={action} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span>{action}</span></li>)}</ul></div>
        </div>}
    </div>
);

const RecommendationsSection = ({ recommendations }) => {
    const [isAllExpanded, setIsAllExpanded] = useState(false);
    return <div className="mt-12 bg-gradient-to-br from-slate-800/30 to-purple-900/20 rounded-2xl p-8 border border-purple-500/30">
        <div className="mb-8 flex items-center justify-between gap-4"><h2 className="text-2xl md:text-3xl font-bold text-white">{recommendations.title}</h2><button onClick={() => setIsAllExpanded(!isAllExpanded)} className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 px-4 py-2 rounded-lg border border-purple-500/30 transition"><span className="text-purple-300 text-sm font-semibold">{isAllExpanded ? 'Tout replier' : 'Tout déplier'}</span>{isAllExpanded ? <ChevronUp className="text-purple-400" size={18}/> : <ChevronDown className="text-purple-400" size={18}/>}</button></div>
        {recommendations.summary && <div className="mb-8 bg-purple-900/30 border border-purple-500/40 rounded-xl p-6"><h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2"><Target size={20}/>Synthèse exploratoire</h3><p className="text-gray-300 leading-relaxed">{recommendations.summary}</p></div>}
        <div className="grid lg:grid-cols-3 gap-6">{recommendations.items.map((rec) => <RecommendationCard key={rec.title} {...rec} isExpanded={isAllExpanded}/>)}</div>
    </div>;
};
export default RecommendationsSection;
