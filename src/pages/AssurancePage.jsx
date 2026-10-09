import Navbar from '../components/Navbar';
import AssuranceGuide from '../components/AssuranceGuide';
import { ArrowUpRight, Download } from 'lucide-react';
import { assuranceStudy } from '../data/CaseStudies';

export default function AssurancePage({ onBack }) {
    const pdf = `${process.env.PUBLIC_URL}/documents/assurance-dashboards.pdf`;
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Navbar title="Assurance automobile" showBackButton onBackClick={onBack} />
            <main className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-16">
                <header>
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">Assurance automobile · Python & Power BI</p>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-4xl">Où se concentrent<br className="hidden sm:block" /> les sinistres ?</h1>
                    <p className="mt-5 max-w-3xl text-lg text-ink-2 leading-relaxed">De 678 013 contrats à quatre priorités d’investigation : une visite guidée de mon rapport Power BI, pour relier les chiffres, leur interprétation et les actions à envisager.</p>
                    <p className="mt-3 text-sm text-muted">Projet personnel · mission fictive · données publiques freMTPL2 · Jules Courné</p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <a href={pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-accent-dark"><Download size={16} aria-hidden="true" />Consulter les 5 dashboards (PDF)</a>
                        <a href={assuranceStudy.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2.5 rounded-md text-sm hover:border-accent">Code et analyses sur GitHub<ArrowUpRight size={16} aria-hidden="true" /></a>
                    </div>
                </header>
                <dl className="grid grid-cols-2 lg:grid-cols-4 border-y border-line mt-9 py-6 gap-6">
                    {assuranceStudy.metrics.map(([value, label]) => <div key={label}><dt className="text-xs text-muted leading-relaxed max-w-[220px]">{label}</dt><dd className="text-3xl font-display mt-1">{value}</dd></div>)}
                </dl>
                <AssuranceGuide />
                <section className="mt-12 grid md:grid-cols-2 gap-8" aria-labelledby="method-title">
                    <div>
                        <p className="text-accent text-xs font-mono uppercase tracking-widest mb-2">Derrière les dashboards</p>
                        <h2 id="method-title" className="font-display text-3xl mb-4">Des résultats traçables</h2>
                        <p className="text-sm text-ink-2 leading-relaxed">J’ai contrôlé et rapproché deux sources avec Python, analysé les segments dans trois notebooks, puis construit le modèle et les mesures DAX. L’exposition reste au grain contrat ; les coûts sont calculés au grain sinistre rapproché. Les montants inconnus restent manquants.</p>
                        <details className="mt-5 border border-line rounded-lg p-4 bg-surface">
                            <summary className="cursor-pointer text-sm font-medium">Pourquoi ne pas approfondir ici les 18–24 ans ?</summary>
                            <p className="text-sm text-ink-2 mt-3 leading-relaxed">Leur fréquence élevée est bien repérée. Le parcours développe trois autres pistes ; ce choix ne signifie pas que le signal est expliqué par leur jeunesse ou écarté. L’analyse par âge et bonus-malus reste consultable dans le notebook.</p>
                            <a className="text-sm text-accent underline block mt-3" href={`${assuranceStudy.github}/blob/main/notebook/analyse_approfondie.ipynb`} target="_blank" rel="noreferrer">Lire le notebook d’analyse approfondie</a>
                        </details>
                    </div>
                    <div className="rounded-xl border border-line bg-surface p-6">
                        <h2 className="font-display text-2xl mb-3">Portée des conclusions</h2>
                        <p className="text-sm text-ink-2 leading-relaxed">{assuranceStudy.limits}</p>
                        <p className="text-sm text-muted leading-relaxed mt-3">Les seuils d’affichage de R24 et R11 — au moins 1 000 contrats et 500 années d’exposition de chaque côté — facilitent la comparaison. Ils ne démontrent pas la significativité statistique d’un écart.</p>
                    </div>
                </section>
                <section className="mt-12 pt-8 border-t border-line" aria-labelledby="resources-title">
                    <h2 id="resources-title" className="font-display text-3xl mb-5">Consulter les livrables</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            ['Rapport PDF · 5 pages', pdf],
                            ['Projet Power BI Desktop', assuranceStudy.reportPath],
                            ['Notebooks exécutés', `${assuranceStudy.github}/tree/main/notebook`],
                            ['Synthèse & priorités', `${assuranceStudy.github}/blob/main/docs/Analyse.md`],
                        ].map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 bg-surface border border-line rounded-lg p-4 text-sm hover:border-accent hover:text-accent">{label}<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" /></a>)}
                    </div>
                    <p className="text-xs text-muted mt-5">Source : <a href={assuranceStudy.source[1]} target="_blank" rel="noreferrer" className="underline">{assuranceStudy.source[0]}</a>. Captures intégrales issues du PDF fourni le 9 octobre 2026.</p>
                </section>
            </main>
        </div>
    );
}
