import { useState } from 'react';
import { ChevronDown, ChevronUp, Target } from 'lucide-react';

const RecommendationCard = ({ icon: Icon, title, problem, objective, actions, isExpanded }) => (
    <div className="bg-surface rounded-lg border border-line hover:border-accent transition">
        <div className="p-4 sm:p-6 flex items-start gap-4">
            <div className="bg-accent-soft p-3 rounded-lg flex-shrink-0"><Icon className="text-accent" size={24}/></div>
            <div className="flex-1 min-w-0"><h3 className="font-display text-xl font-semibold text-ink mb-2 leading-tight">{title}</h3><p className="text-muted text-sm">{problem}</p></div>
        </div>
        {isExpanded && <div className="px-6 pb-6 space-y-4 border-t border-line pt-4">
            <div><h4 className="text-sm font-semibold text-accent mb-2">Observation</h4><p className="text-ink-2 text-sm">{problem}</p></div>
            <div><h4 className="text-sm font-semibold text-ok mb-2">Question à tester</h4><p className="text-ink-2 text-sm">{objective}</p></div>
            <div><h4 className="text-sm font-semibold text-accent mb-2">Pistes d’expérimentation</h4><ul className="space-y-2">{actions.map((action) => <li key={action} className="text-ink-2 text-sm flex items-start gap-2"><span className="text-accent mt-1">•</span><span>{action}</span></li>)}</ul></div>
        </div>}
    </div>
);

const RecommendationsSection = ({ recommendations }) => {
    const [isAllExpanded, setIsAllExpanded] = useState(false);
    return <div className="mt-12 bg-paper rounded-lg p-5 sm:p-8 border border-line">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><h2 className="font-display text-2xl md:text-3xl font-semibold text-ink leading-tight">{recommendations.title}</h2><button onClick={() => setIsAllExpanded(!isAllExpanded)} className="flex items-center gap-2 bg-accent-soft hover:bg-accent-soft px-4 py-2 rounded-lg border border-line transition"><span className="text-accent text-sm font-semibold">{isAllExpanded ? 'Tout replier' : 'Tout déplier'}</span>{isAllExpanded ? <ChevronUp className="text-accent" size={18}/> : <ChevronDown className="text-accent" size={18}/>}</button></div>
        {recommendations.summary && <div className="mb-8 bg-accent-soft border border-line rounded-lg p-4 sm:p-6"><h3 className="font-display text-lg font-semibold text-accent mb-3 flex items-center gap-2 leading-tight"><Target size={20}/>Synthèse exploratoire</h3><p className="text-ink-2 leading-relaxed">{recommendations.summary}</p></div>}
        <div className="grid lg:grid-cols-3 gap-6">{recommendations.items.map((rec) => <RecommendationCard key={rec.title} {...rec} isExpanded={isAllExpanded}/>)}</div>
    </div>;
};
export default RecommendationsSection;
