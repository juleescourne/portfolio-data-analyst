import { ArrowUpRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import GoodreadsComparison from '../components/GoodreadsComparison';
import { getImageUrl } from '../utils/assetsConfig';
import { goodreadsStudy } from '../data/CaseStudies';

export default function GoodreadsPage({ onBack }) {
    const repo = goodreadsStudy.github;
    const document = filename => process.env.PUBLIC_URL + '/documents/' + filename;
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Navbar title="Goodreads · Sélection éditoriale" showBackButton onBackClick={onBack} />
            <main className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-16 space-y-12">
                <header>
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">Goodreads · Python & Power BI</p>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl max-w-4xl leading-tight">Du catalogue à une sélection argumentée</h1>
                    <p className="text-lg text-ink-2 max-w-3xl leading-relaxed mt-5">Quels livres proposer pour une page de découverte en français ? Je contrôle 1,85 million de fiches, compare les règles de sélection et propose une liste de 20 titres à examiner.</p>
                    <p className="text-sm text-muted mt-3">Jules Courné · projet personnel · librairie fictive Lire & Choisir · données Kaggle de 2020</p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <a href={document('goodreads-synthese.pdf')} target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-3 rounded-md"><Download size={16} aria-hidden="true" />Lire la synthèse PDF</a>
                        <a href={repo} target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center border border-line bg-surface hover:border-accent text-sm px-4 py-3 rounded-md">Code et analyses sur GitHub<ArrowUpRight size={16} aria-hidden="true" /></a>
                    </div>
                </header>
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-line py-6">
                    {[['1 850 032', 'fiches conservées'], ['86,40 %', 'de langues absentes'], ['3 002', 'fiches candidates en français'], ['12 → 16', 'libellés auteur dans la liste']].map(([value, label]) => <div key={label}><dt className="text-xs text-muted">{label}</dt><dd className="font-display text-3xl mt-1">{value}</dd></div>)}
                </dl>
                <section aria-labelledby="quality-title" className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">01 · Définir un périmètre fiable</p>
                        <h2 id="quality-title" className="font-display text-3xl mb-4">Contrôler avant de sélectionner</h2>
                        <p className="text-sm text-ink-2 leading-relaxed">J’isole les versions contradictoires et distingue une note absente d’un compteur à zéro. La langue est trop incomplète pour déduire la part réelle du français : je retiens uniquement les fiches où elle est renseignée.</p>
                        <p className="text-sm text-ink-2 leading-relaxed mt-3">Les critères sont explicites : note ≥ 4/5, au moins 100 notations, auteur et éditeur présents, pagination entre 1 et 5 000. Je choisis ensuite une représentante par titre/auteur normalisé, sans additionner les notes des éditions.</p>
                    </div>
                    <figure className="bg-surface rounded-xl border border-line p-3">
                        <img src={getImageUrl('goodreads-parcours-selection.png')} width="1600" height="752" alt="16 327 fiches françaises, 3 002 candidates, 2 716 groupes titre et auteur, puis 20 propositions." className="w-full h-auto" />
                        <figcaption className="text-xs text-muted px-2 pb-2">Figure calculée depuis les exports des notebooks.</figcaption>
                    </figure>
                </section>
                <GoodreadsComparison />
                <section aria-labelledby="findings-title">
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">03 · Interpréter le compromis</p>
                    <h2 id="findings-title" className="font-display text-3xl mb-6">Une règle simple, des effets mesurables</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            ['Quatre remplacements, plus d’auteurs', 'Le plafond de deux fiches par libellé auteur fait passer la diversité de 12 à 16 libellés. La note moyenne évolue de 4,646 à 4,642 / 5 : le compromis reste lisible.'],
                            ['Un seuil plus strict ne suffit pas', 'Avec 500 notations minimum, cinq fiches sont remplacées. Le classement initial atteint neuf fiches pour un même auteur ; la variante conserve son plafond de deux.'],
                            ['La relecture reste nécessaire', 'Des tomes avancés et des coffrets restent proposés. Le plafond améliore la diversité des auteurs, sans garantir celle des séries, des genres ou des publics.'],
                        ].map(([title, text]) => <article key={title} className="bg-surface border border-line rounded-xl p-5"><h3 className="font-display text-xl mb-3">{title}</h3><p className="text-sm text-ink-2 leading-relaxed">{text}</p></article>)}
                    </div>
                    <figure className="bg-surface border border-line rounded-xl p-4 sm:p-6 mt-6">
                        <img src={getImageUrl('goodreads-stabilite-selection.png')} loading="lazy" width="1600" height="752" className="w-full h-auto max-w-4xl mx-auto" alt="Aux seuils de 500 et 1 000 notations, 15 fiches sur 20 restent communes avec la référence de chaque règle. Le maximum par auteur atteint 9 dans la liste initiale et reste à 2 dans la variante." />
                        <figcaption className="text-xs text-muted mt-3">Fiches communes avec le seuil 100 de la même règle. Les deux seuils supérieurs donnent ici les mêmes listes de 20.</figcaption>
                    </figure>
                </section>
                <section className="bg-accent-soft border border-line rounded-xl p-6 sm:p-8" aria-labelledby="decision-title">
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">04 · Proposer la suite</p>
                    <h2 id="decision-title" className="font-display text-3xl mb-4">Retenir une proposition, puis la faire valider</h2>
                    <p className="text-ink-2 leading-relaxed max-w-4xl">Je propose de garder le seuil de 100 notations et le plafond de deux fiches par libellé auteur. L’équipe catalogue doit relire les séries, coffrets et éditions, puis vérifier la disponibilité commerciale. Un test de mise en avant pourrait ensuite suivre les clics et les ajouts au panier.</p>
                    <p className="text-sm text-muted mt-4">Ce choix éditorial n’est pas un optimum démontré. L’extraction date de 2020 et ne contient ni stock, ni prix, ni ventes ; aucun gain commercial n’est revendiqué.</p>
                    <a href={repo + '/blob/main/docs/Relecture_selection.md'} target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center text-accent underline text-sm mt-4">Voir les points de relecture des 20 fiches<ArrowUpRight size={15} aria-hidden="true" /></a>
                </section>
                <section aria-labelledby="deliverables-title">
                    <h2 id="deliverables-title" className="font-display text-3xl mb-5">Des résultats consultables et vérifiables</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            ['Synthèse PDF · 4 pages', document('goodreads-synthese.pdf')],
                            ['Les 20 propositions · CSV', document('goodreads-selection_francais.csv')],
                            ['Les six listes · CSV', document('goodreads-listes_scenarios.csv')],
                            ['Entrées et sorties · CSV', document('goodreads-mouvements_selections.csv')],
                            ['Notebooks exécutés', repo + '/tree/main/notebooks'],
                            ['Projet Power BI et guide', repo + '/tree/main/powerbi'],
                        ].map(([label, href]) => <a href={href} key={label} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 bg-surface border border-line hover:border-accent rounded-lg p-4 text-sm">{label}<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" /></a>)}
                    </div>
                    <p className="text-sm text-muted leading-relaxed mt-5">Calculs réexécutés le 9 octobre 2026 : trois notebooks, contrôle des exports et dix tests ciblés sur les règles. Le parcours et le PDF présentent les résultats Python. Le rapport Power BI à trois pages est mis à jour ; son actualisation et son rendu dans Desktop restent à vérifier pour cette évolution.</p>
                    <p className="text-xs text-muted mt-4">Source : <a href={repo + '/blob/main/data/README.md'} target="_blank" rel="noreferrer" className="underline">Goodreads / Kaggle, version 18 · provenance et limites</a>.</p>
                </section>
            </main>
        </div>
    );
}
