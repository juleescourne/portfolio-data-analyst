import { ArrowUpRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import GoodreadsGuide from '../components/GoodreadsGuide';
import { goodreadsStudy } from '../data/CaseStudies';

export default function GoodreadsPage({ onBack }) {
    const repo = goodreadsStudy.github;
    const document = filename => process.env.PUBLIC_URL + '/documents/' + filename;
    const pdf = document('goodreads-dashboards.pdf');
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Navbar title="Goodreads · Sélection éditoriale" showBackButton onBackClick={onBack} />
            <main className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-16">
                <header>
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">Goodreads · Python & Power BI</p>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl max-w-4xl leading-tight">Quels livres proposer pour une découverte en français ?</h1>
                    <p className="text-lg text-ink-2 max-w-3xl leading-relaxed mt-5">De 1,85 million de fiches à 20 propositions : une visite guidée de mon rapport Power BI pour comprendre le catalogue, comparer les règles de sélection et identifier les vérifications nécessaires.</p>
                    <p className="text-sm text-muted mt-3">Jules Courné · projet personnel · librairie fictive Lire & Choisir · données Kaggle de 2020</p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <a href={pdf} target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-3 rounded-md"><Download size={16} aria-hidden="true" />Consulter les 3 dashboards (PDF)</a>
                        <a href={repo} target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center border border-line bg-surface hover:border-accent text-sm px-4 py-3 rounded-md">Code et analyses sur GitHub<ArrowUpRight size={16} aria-hidden="true" /></a>
                    </div>
                </header>
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-line mt-9 py-6">
                    {[['1 850 032', 'fiches conservées'], ['16 327', 'fiches renseignées en français'], ['3 002', 'fiches candidates'], ['20', 'propositions à relire']].map(([value, label]) => <div key={label}><dt className="text-xs text-muted">{label}</dt><dd className="font-display text-3xl mt-1">{value}</dd></div>)}
                </dl>
                <GoodreadsGuide />
                <section className="mt-12 grid md:grid-cols-2 gap-8" aria-labelledby="method-title">
                    <div>
                        <p className="text-accent text-xs font-mono uppercase tracking-widest mb-2">Derrière les dashboards</p>
                        <h2 id="method-title" className="font-display text-3xl mb-4">Des règles explicites et vérifiables</h2>
                        <p className="text-sm text-ink-2 leading-relaxed">J’ai contrôlé les 23 fichiers avec Python, isolé les versions contradictoires et conservé les valeurs manquantes. Trois notebooks documentent le nettoyage, l’exploration et la sélection ; Power Query et les mesures DAX permettent de restituer ces résultats dans le rapport.</p>
                        <details className="mt-5 border border-line rounded-lg p-4 bg-surface">
                            <summary className="cursor-pointer text-sm font-medium">Comment les 20 propositions sont-elles retenues ?</summary>
                            <p className="text-sm text-ink-2 mt-3 leading-relaxed">Français renseigné, note ≥ 4/5, au moins 100 notations, auteur et éditeur présents, pagination entre 1 et 5 000. Une fiche représente chaque groupe titre/auteur normalisé. Le classement utilise la note, puis le volume de notations et l’identifiant pour départager les égalités, avec au maximum deux fiches par libellé auteur.</p>
                            <a href={repo + '/blob/main/notebooks/03_analyse_approfondie.ipynb'} target="_blank" rel="noreferrer" className="text-sm text-accent underline block mt-3">Lire le notebook de sélection</a>
                        </details>
                    </div>
                    <div className="bg-surface border border-line rounded-xl p-6">
                        <h2 className="font-display text-2xl mb-3">Une proposition à faire valider</h2>
                        <p className="text-sm text-ink-2 leading-relaxed">Le plafond diversifie les auteurs, mais ne garantit pas la diversité des séries, des genres ou des publics. L’équipe catalogue doit relire la liste, vérifier les éditions et confirmer leur disponibilité commerciale.</p>
                        <p className="text-sm text-muted leading-relaxed mt-3">L’extraction de 2020 ne contient ni stock, ni prix, ni ventes. Après validation, un test de mise en avant pourrait suivre les clics et les ajouts au panier. Ce test reste une suite proposée.</p>
                        <a href={repo + '/blob/main/docs/Relecture_selection.md'} target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center text-accent underline text-sm mt-4">Voir les points de relecture<ArrowUpRight size={15} aria-hidden="true" /></a>
                    </div>
                </section>
                <section className="mt-12 pt-8 border-t border-line" aria-labelledby="deliverables-title">
                    <h2 id="deliverables-title" className="font-display text-3xl mb-5">Consulter les livrables</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            ['Rapport Power BI · PDF 3 pages', pdf],
                            ['Projet Power BI et guide', repo + '/tree/main/powerbi'],
                            ['Les 20 propositions · CSV', document('goodreads-selection_francais.csv')],
                            ['Les six listes · CSV', document('goodreads-listes_scenarios.csv')],
                            ['Entrées et sorties · CSV', document('goodreads-mouvements_selections.csv')],
                            ['Notebooks exécutés', repo + '/tree/main/notebooks'],
                            ['Synthèse analytique · PDF 4 pages', document('goodreads-synthese.pdf')],
                        ].map(([label, href]) => <a href={href} key={label} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 bg-surface border border-line hover:border-accent rounded-lg p-4 text-sm">{label}<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" /></a>)}
                    </div>
                    <p className="text-xs text-muted mt-5">Source : <a href={repo + '/blob/main/data/README.md'} target="_blank" rel="noreferrer" className="underline">Goodreads / Kaggle, version 18 · provenance et limites</a>. Captures intégrales issues du PDF Power BI fourni le 9 octobre 2026. La synthèse analytique complémentaire est produite depuis les résultats Python.</p>
                </section>
            </main>
        </div>
    );
}
