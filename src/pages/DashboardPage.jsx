import { lazy, Suspense, useState } from 'react';
import CaseStudyPage from '../components/CaseStudyPage';
import { goodreadsStudy } from '../data/CaseStudies';

const GoodreadsExplorer = lazy(() => import('../components/GoodreadsExplorer'));

export default function DashboardPage({ onBack }) {
    const [showLab, setShowLab] = useState(false);
    return (
        <CaseStudyPage study={goodreadsStudy} onBack={onBack}>
            <section className="border-t border-line pt-8">
                <h2 className="font-display text-2xl font-semibold mb-3">En complément : un laboratoire interactif</h2>
                <p className="text-muted leading-relaxed max-w-prose mb-5">Cette démonstration historique utilise des titres fictifs pour explorer les effets d’un seuil de notes et d’un score régularisé. Ses chiffres sont indépendants de l’étude Kaggle présentée ci-dessus.</p>
                <button type="button" aria-expanded={showLab} aria-controls="goodreads-lab" onClick={() => setShowLab(!showLab)} className="border border-line rounded-md px-4 py-3 text-accent hover:border-accent mb-6">
                    {showLab ? 'Fermer le laboratoire' : 'Ouvrir le laboratoire synthétique'}
                </button>
                <div id="goodreads-lab" hidden={!showLab}>{showLab && <Suspense fallback={<p role="status">Chargement du laboratoire…</p>}><GoodreadsExplorer /></Suspense>}</div>
            </section>
        </CaseStudyPage>
    );
}
