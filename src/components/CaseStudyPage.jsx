import { ArrowUpRight, Github } from 'lucide-react';
import Navbar from './Navbar';
import { getImageUrl } from '../utils/assetsConfig';

const ExternalLink = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent underline underline-offset-4 hover:text-accent-dark">
        {children}<ArrowUpRight size={15} aria-hidden="true" className="shrink-0" />
    </a>
);

export default function CaseStudyPage({ study, onBack, children }) {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Navbar title={study.title} showBackButton onBackClick={onBack} />
            <main className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-16 space-y-10">
                <header className="max-w-4xl">
                    <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">{study.eyebrow}</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-5">{study.title}</h1>
                    <p className="text-lg text-ink-2 leading-relaxed mb-5">{study.intro}</p>
                    <p className="text-muted leading-relaxed mb-6">{study.context}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {study.tags.map(tag => <span key={tag} className="font-mono text-xs bg-raised border border-line px-2 py-1 rounded">{tag}</span>)}
                    </div>
                    <a href={study.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-white px-5 py-3 rounded-md hover:bg-accent-dark">
                        <Github size={18} />Consulter le projet sur GitHub
                    </a>
                </header>
                <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {study.metrics.map(([value, label]) => (
                        <div key={label} className="bg-surface border border-line rounded-lg p-5 flex flex-col">
                            <dt className="text-sm text-muted order-2">{label}</dt>
                            <dd className="font-mono tabular text-2xl font-semibold mb-2">{value}</dd>
                        </div>
                    ))}
                </dl>
                <section className="bg-accent-soft border border-line rounded-lg p-6 sm:p-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">{study.question}</h2>
                    <p className="text-ink-2 leading-relaxed max-w-prose">{study.questionDetail}</p>
                </section>
                <section>
                    <h2 className="font-display text-3xl font-semibold mb-6">Ce que l’analyse montre</h2>
                    <div className="grid lg:grid-cols-3 gap-5">
                        {study.findings.map((finding, index) => (
                            <article key={finding.title} className="bg-surface border border-line rounded-lg p-6">
                                <p className="font-mono text-xs text-accent mb-4">0{index + 1}</p>
                                <h3 className="font-display text-xl font-semibold mb-3">{finding.title}</h3>
                                <p className="text-ink-2 text-sm leading-relaxed">{finding.text}</p>
                            </article>
                        ))}
                    </div>
                </section>
                <figure className="bg-surface border border-line rounded-lg p-4 sm:p-8">
                    <img src={getImageUrl(study.figure.src)} alt={study.figure.alt} className="w-full h-auto max-w-4xl mx-auto" loading="lazy" />
                    <figcaption className="text-sm text-muted leading-relaxed mt-5 max-w-prose">
                        {study.figure.caption} <ExternalLink href={study.figure.source}>Voir le notebook source</ExternalLink>
                    </figcaption>
                </figure>
                <section>
                    <h2 className="font-display text-3xl font-semibold mb-6">Du cadrage à la restitution</h2>
                    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {study.steps.map(([title, text], index) => (
                            <li key={title} className="border-t-2 border-accent pt-4">
                                <h3 className="font-semibold mb-2"><span className="font-mono text-accent mr-2">{index + 1}.</span>{title}</h3>
                                <p className="text-sm text-muted leading-relaxed">{text}</p>
                            </li>
                        ))}
                    </ol>
                </section>
                <section className="bg-surface border border-line rounded-lg p-6 sm:p-8">
                    <h2 className="font-display text-3xl font-semibold mb-6">Le rapport Power BI</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {study.reportPages.map(([title, text]) => (
                            <div key={title}><h3 className="font-semibold mb-2">{title}</h3><p className="text-sm text-muted leading-relaxed">{text}</p></div>
                        ))}
                    </div>
                    <p className="text-sm text-ink-2 leading-relaxed border-t border-line pt-5 mb-5"><strong>État des vérifications au 1er octobre 2026.</strong> {study.reportStatus}</p>
                    <ExternalLink href={study.reportPath}>Fichiers du rapport et guide d’ouverture</ExternalLink>
                </section>
                <section className="grid md:grid-cols-2 gap-8">
                    <div><h2 className="font-display text-2xl font-semibold mb-3">Limites à garder en tête</h2><p className="text-muted leading-relaxed">{study.limits}</p></div>
                    <div><h2 className="font-display text-2xl font-semibold mb-3">La suite proposée au métier</h2><p className="text-ink-2 leading-relaxed">{study.recommendation}</p></div>
                </section>
                <section className="border-t border-line pt-7">
                    <h2 className="font-display text-2xl font-semibold mb-5">Parcourir les livrables</h2>
                    <ul className="flex flex-wrap gap-x-6 gap-y-4 mb-6">
                        {study.resources.map(([label, href]) => <li key={label}><ExternalLink href={href}>{label}</ExternalLink></li>)}
                    </ul>
                    <p className="text-sm text-muted"><ExternalLink href={study.source[1]}>{study.source[0]}</ExternalLink></p>
                </section>
                {children}
            </main>
        </div>
    );
}
