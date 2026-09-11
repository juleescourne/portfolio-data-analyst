import { useState } from 'react';
import { Github, ExternalLink, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';

/**
 * Page de démonstration embarquée.
 *
 * L'application réelle est encapsulée dans une iframe. Un lien « plein écran » est
 * toujours proposé à côté : une iframe peut échouer (réseau d'entreprise filtrant,
 * en-tête de sécurité, déploiement pas encore effectif) et le visiteur ne doit
 * jamais se retrouver devant un cadre vide sans issue.
 */
const EmbeddedDemo = ({
    title,
    subtitle,
    tags = [],
    repository,
    src,
    height = 760,
    disclaimer,
    facts = [],
    onBack,
}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="min-h-screen bg-paper">
            <Navbar title={title} showBackButton onBackClick={onBack} />

            <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-24 pb-16">
                <header className="mb-8">
                    <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-3 leading-tight">
                        {title}
                    </h1>
                    <p className="text-ink-2 max-w-prose leading-relaxed mb-5">{subtitle}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-[11px] text-muted bg-raised border border-line-soft px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-md text-sm font-medium transition"
                        >
                            Ouvrir en plein écran
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                            href={repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-line hover:border-accent hover:text-accent text-ink-2 px-4 py-2.5 rounded-md text-sm font-medium transition bg-surface"
                        >
                            <Github className="w-4 h-4" />
                            Code source
                        </a>
                    </div>
                </header>

                {facts.length > 0 && (
                    <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 mb-8 pb-8 border-b border-line">
                        {facts.map((fact) => (
                            <div key={fact.label}>
                                <dt className="sr-only">{fact.label}</dt>
                                <dd>
                                    <span className="font-mono tabular text-2xl font-semibold text-ink block leading-none mb-1.5">
                                        {fact.value}
                                    </span>
                                    <span className="text-sm text-muted block leading-snug">{fact.label}</span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}

                {disclaimer && (
                    <div className="flex gap-3 bg-accent-soft border-l-[3px] border-accent rounded-r px-4 py-3.5 mb-7">
                        <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-ink-2 leading-relaxed">{disclaimer}</p>
                    </div>
                )}

                <div className="relative bg-surface border border-line rounded-lg overflow-hidden">
                    {!loaded && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-raised"
                            style={{ height }}
                        >
                            <p className="text-muted text-sm animate-pulse">Chargement de l’application…</p>
                        </div>
                    )}
                    <iframe
                        src={src}
                        title={title}
                        onLoad={() => setLoaded(true)}
                        loading="lazy"
                        className="w-full block"
                        style={{ height }}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-downloads"
                    />
                </div>

                <p className="text-xs text-muted mt-3">
                    Le cadre ci-dessus exécute l’application réelle. Si rien ne s’affiche — certains réseaux
                    d’entreprise bloquent les cadres externes — utilisez le bouton{' '}
                    <span className="text-ink-2">Ouvrir en plein écran</span>.
                </p>
            </div>
        </div>
    );
};

export default EmbeddedDemo;
