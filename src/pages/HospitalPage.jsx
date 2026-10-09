import { useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import data from '../data/hospital-results.json';

const repo = 'https://github.com/juleescourne/hospital-sql-analytics';
const number = (value, digits = 0) => value.toLocaleString('fr-FR', { maximumFractionDigits: digits });
const labels = { ambulatory: 'Ambulatoire', outpatient: 'Consultation externe', urgentcare: 'Soins urgents', wellness: 'Prévention', emergency: 'Urgences', inpatient: 'Hospitalisation' };
const metrics = {
    encounter_count: { label: 'Passages', unit: 'passages', digits: 0 },
    median_hours: { label: 'Durée médiane', unit: 'h', digits: 2 },
    cost_share_pct: { label: 'Part des montants', unit: '%', digits: 2 },
};
const qualityLabels = {
    missing_stop: 'Date de fin absente', negative_duration: 'Durée négative', zero_duration: 'Durée nulle',
    missing_payer: 'Payeur non renseigné', before_birth: 'Passage avant naissance', after_death: 'Passage après décès',
    procedure_patient_mismatch: 'Acte et passage : patients différents',
};

function Reading({ observation, interpretation, next }) {
    return <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[['Constat', observation], ['Interprétation', interpretation], ['Suite proposée', next]].map(([label, text]) => <div key={label}><h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-2">{label}</h3><p className="text-sm text-ink-2 leading-relaxed">{text}</p></div>)}
    </div>;
}
function SqlLink({ section, label }) {
    return <a href={`${repo}/blob/main/queries/07_portfolio_summary.sql`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent underline mt-5">{label} · requête {section}<ArrowUpRight size={14} aria-hidden="true" /></a>;
}

export default function HospitalPage({ onBack }) {
    const [metric, setMetric] = useState('encounter_count');
    const [payer, setPayer] = useState('all');
    const overview = data.overview;
    const maximum = Math.max(...data.activity.map(row => row[metric]));
    const selected = payer === 'all' ? {
        payer_name: 'Tous les payeurs', encounter_count: overview.encounters,
        total_claim_cost: overview.total_claim_cost, covered_amount: overview.covered_amount,
        uncovered_amount: overview.total_claim_cost - overview.covered_amount,
        weighted_coverage_pct: overview.weighted_coverage_pct,
    } : data.coverage.find(row => row.payer_name === payer);
    const inpatient = data.activity.find(row => row.encounter_class === 'inpatient');
    const ambulatory = data.activity.find(row => row.encounter_class === 'ambulatory');
    const quality = Object.fromEntries(data.quality.map(row => [row.metric, row.affected]));
    const document = name => `${process.env.PUBLIC_URL}/documents/hospital-${name}.csv`;
    return <div className="min-h-screen bg-paper text-ink">
        <Navbar title="Hospital · Analyse SQL" showBackButton onBackClick={onBack} />
        <main className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-16">
            <header>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">Hospital SQL Analytics · MySQL & Python</p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl max-w-4xl leading-tight">Comprendre l’activité, les montants et leurs limites</h1>
                <p className="text-lg text-ink-2 leading-relaxed max-w-3xl mt-5">Quels passages concentrent les volumes et les durées ? Quelle part des montants est couverte ? Je réponds à ces questions avec SQL, après avoir contrôlé la qualité des données.</p>
                <p className="text-sm text-muted mt-3">Jules Courné · projet personnel · données entièrement synthétiques · période simulée 2011–2022</p>
                <div className="flex flex-wrap gap-3 mt-6">
                    <a href={`${repo}/blob/main/results/README.md`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent hover:bg-accent-dark text-white px-4 py-3 text-sm">Lire la synthèse et les résultats<ArrowUpRight size={16} aria-hidden="true" /></a>
                    <a href={repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-surface border border-line hover:border-accent px-4 py-3 text-sm">Code et requêtes sur GitHub<ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
            </header>
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-line mt-9 py-6">
                {[[number(overview.patients), 'patients fictifs'], [number(overview.encounters), 'passages enregistrés'], [number(overview.procedures), 'actes enregistrés'], [number(overview.weighted_coverage_pct, 2) + ' %', 'couverture pondérée des montants']].map(([value, label]) => <div key={label}><dt className="text-xs text-muted">{label}</dt><dd className="font-display text-3xl mt-1">{value}</dd></div>)}
            </dl>
            <p className="text-sm text-muted mt-5">Les graphiques présentent les résultats calculés dans MySQL. Les boutons changent leur lecture ; les chiffres décrivent uniquement le jeu de démonstration.</p>

            <section className="mt-12" aria-labelledby="activity-title">
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">01 · Activité</p>
                <h2 id="activity-title" className="font-display text-3xl mb-5">Un passage fréquent n’est pas forcément un passage long</h2>
                <div className="bg-surface border border-line rounded-xl p-5 sm:p-8">
                    <div role="group" aria-label="Indicateur d’activité" className="flex flex-wrap gap-2 mb-7">
                        {Object.entries(metrics).map(([key, item]) => <button key={key} aria-pressed={metric === key} onClick={() => setMetric(key)} className={`rounded-md border px-4 py-2 text-sm focus-visible:outline-accent ${metric === key ? 'bg-accent text-white border-accent' : 'border-line hover:border-accent'}`}>{item.label}</button>)}
                    </div>
                    <p className="text-sm font-medium mb-5" aria-live="polite">{metrics[metric].label} par type de passage</p>
                    <ul aria-label="Répartition par type de passage" className="space-y-5">
                        {data.activity.map(row => <li key={row.encounter_class}>
                            <div className="flex justify-between gap-3 text-sm mb-2"><span>{labels[row.encounter_class]}</span><strong className="tabular-nums shrink-0">{number(row[metric], metrics[metric].digits)} {metrics[metric].unit}</strong></div>
                            <div className="h-3 bg-paper rounded overflow-hidden" aria-hidden="true"><div className="h-full bg-accent rounded" style={{ width: `${row[metric] / maximum * 100}%` }} /></div>
                        </li>)}
                    </ul>
                    <p className="text-xs text-muted leading-relaxed mt-6">Échelle linéaire adaptée à l’indicateur choisi. Volumes et montants : {number(overview.encounters)} passages. Durées : {number(overview.valid_durations)} passages avec une fin valide, durées nulles incluses. Les classes conservent les catégories du fichier ; leurs libellés français sont indicatifs.</p>
                </div>
                <Reading
                    observation={`L’ambulatoire représente ${number(ambulatory.volume_share_pct, 2)} % des passages. L’hospitalisation représente ${number(inpatient.volume_share_pct, 2)} % des passages, mais ${number(inpatient.cost_share_pct, 2)} % de leurs montants.`}
                    interpretation={`La durée médiane d’hospitalisation est de ${number(inpatient.median_hours, 2)} h, contre ${number(ambulatory.median_hours, 2)} h en ambulatoire. Les volumes seuls ne résument donc pas l’activité. Ces durées ne sont pas des heures de travail soignant.`}
                    next="Sur des données réelles, examiner la dispersion des durées, les passages simultanés et les ressources disponibles avant une décision de capacité. Les différences observées ici dépendent du générateur."
                />
                <SqlLink section="1" label="Voir le calcul des volumes et de la médiane" />
            </section>

            <section className="mt-14" aria-labelledby="coverage-title">
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">02 · Couverture des montants</p>
                <h2 id="coverage-title" className="font-display text-3xl mb-5">Mesurer une part du montant total</h2>
                <div className="bg-surface border border-line rounded-xl p-5 sm:p-8">
                    <label htmlFor="hospital-payer" className="block text-sm font-medium mb-2">Choisir un payeur</label>
                    <select id="hospital-payer" value={payer} onChange={event => setPayer(event.target.value)} className="w-full sm:max-w-sm bg-paper border border-line rounded-md px-3 py-3 text-sm mb-6">
                        <option value="all">Tous les payeurs</option>
                        {data.coverage.map(row => <option key={row.payer_name} value={row.payer_name}>{row.payer_name === 'NO_INSURANCE' ? 'Sans assurance (NO_INSURANCE)' : row.payer_name}</option>)}
                    </select>
                    <div role="status">
                        <p className="text-sm text-muted">{selected.payer_name === 'all' ? 'Tous les payeurs' : selected.payer_name} · {number(selected.encounter_count)} passages</p>
                        <p className="font-display text-4xl text-accent my-3">{number(selected.weighted_coverage_pct, 2)} % <span className="text-base font-sans text-ink-2">du montant couvert</span></p>
                        <div className="h-5 rounded overflow-hidden bg-line mt-5" aria-hidden="true"><div className="h-full bg-accent" style={{ width: `${selected.weighted_coverage_pct}%` }} /></div>
                        <dl className="grid sm:grid-cols-3 gap-5 mt-6">
                            {[[selected.total_claim_cost, 'Montant total des passages'], [selected.covered_amount, 'Couvert par le payeur'], [selected.uncovered_amount, 'Non couvert dans le fichier']].map(([value, label]) => <div key={label}><dt className="text-xs text-muted mb-1">{label}</dt><dd className="text-lg font-medium tabular-nums">{number(value)} USD</dd></div>)}
                        </dl>
                    </div>
                    <p className="text-xs text-muted leading-relaxed mt-6">Taux = somme des montants couverts / somme des montants des passages. Montants affichés arrondis au dollar ; calcul sur les centimes. Les coûts des actes ne sont pas ajoutés aux montants des passages.</p>
                </div>
                <Reading
                    observation={`La couverture pondérée globale est de ${number(overview.weighted_coverage_pct, 2)} %. Les ${quality.missing_payer} passages sans payeur renseigné restent inclus ; leurs montants de couverture existent dans le fichier.`}
                    interpretation="Une moyenne simple des pourcentages donnerait le même poids à un passage peu coûteux et à une hospitalisation chère. Les montants non couverts ne prouvent ni une dette du patient, ni une perte pour l’établissement."
                    next="Vérifier les payeurs manquants, la définition des montants et le périmètre des contrats avant une comparaison. Les taux du jeu synthétique sont déterminés par des paramètres pédagogiques."
                />
                <SqlLink section="2" label="Voir le calcul de la couverture pondérée" />
            </section>

            <section className="mt-14" aria-labelledby="quality-title">
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">03 · Qualité</p>
                <h2 id="quality-title" className="font-display text-3xl mb-5">Afficher ce qui manque et ce qui est exclu</h2>
                <div className="bg-surface border border-line rounded-xl p-5 sm:p-8">
                    <ul className="divide-y divide-line" aria-label="Résultats des contrôles qualité">
                        {data.quality.map(row => <li key={row.metric} className="py-3 flex justify-between items-start gap-4 text-sm"><span>{qualityLabels[row.metric]}<span className="block text-xs text-muted mt-1">Sur {number(row.denominator)} {row.metric === 'procedure_patient_mismatch' ? 'actes' : 'passages'}</span></span><strong className={`text-xl tabular-nums ${row.affected ? 'text-ink' : 'text-accent'}`}>{number(row.affected)}</strong></li>)}
                    </ul>
                </div>
                <Reading
                    observation={`${quality.missing_stop} dates de fin absentes et ${quality.negative_duration} durées négatives sont exclues des durées. Les ${quality.zero_duration} durées nulles sont signalées et conservées. Aucun passage avant naissance n’est présent dans le jeu corrigé.`}
                    interpretation="Les motifs peuvent se chevaucher et ne doivent pas être additionnés pour compter des passages défectueux. Une date de fin manquante ne signifie pas nécessairement que le patient est encore hospitalisé."
                    next="Documenter les exclusions, vérifier les anomalies à la source et tester les indicateurs sur des cas simples avant de les utiliser dans un reporting régulier."
                />
                <SqlLink section="3" label="Voir les compteurs de qualité" />
            </section>

            <section className="mt-14 bg-accent-soft border border-line rounded-xl p-6 sm:p-8" aria-labelledby="method-title">
                <h2 id="method-title" className="font-display text-3xl mb-4">Des calculs que je peux expliquer et tester</h2>
                <p className="text-sm text-ink-2 leading-relaxed">J’ai construit cinq tables, contrôlé leurs relations et écrit les requêtes d’analyse. Quatre tests Python vérifient le générateur et sept groupes de tests MySQL vérifient les résultats attendus : borne exacte de 30 jours, fin manquante dans la chronologie, couverture pondérée, mois sans activité et médiane.</p>
                <details className="mt-5 border-t border-line pt-4"><summary className="text-sm font-medium cursor-pointer">Un exemple : retrouver le vrai passage suivant</summary><p className="text-sm text-ink-2 mt-3 leading-relaxed">Je calcule LEAD sur tous les débuts de passage, puis j’exclus les intervalles inexploitables. Filtrer d’abord les fins manquantes ferait sauter un passage de la chronologie. Le comptage à 30 jours reste un indicateur exploratoire, pas un taux clinique de réadmission.</p></details>
                <a href={`${repo}/blob/main/scripts/check_sql.py`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-accent underline mt-4">Lire les petits cas de test<ArrowUpRight size={14} aria-hidden="true" /></a>
            </section>
            <section className="mt-12 pt-8 border-t border-line" aria-labelledby="resources-title">
                <h2 id="resources-title" className="font-display text-3xl mb-5">Consulter les résultats et les requêtes</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        ['Volumes et durées · CSV', document('activity')], ['Couverture par payeur · CSV', document('coverage')],
                        ['Contrôles qualité · CSV', document('quality')], ['Synthèse des analyses', `${repo}/blob/main/results/README.md`],
                        ['Les sept fichiers SQL', `${repo}/tree/main/queries`], ['Reproduire avec MySQL', `${repo}/blob/main/INSTALLATION.md`],
                    ].map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 bg-surface border border-line hover:border-accent rounded-lg p-4 text-sm">{label}{href.endsWith('.csv') ? <Download size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</a>)}
                </div>
                <p className="text-xs text-muted leading-relaxed mt-5">Source : générateur Python du projet, graine 42, 400 patients fictifs. Résultats exécutés dans MySQL 8. Les règles simulées ne permettent aucune conclusion sur un hôpital, un assureur ou la qualité des soins réels.</p>
            </section>
        </main>
    </div>;
}
