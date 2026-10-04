import { useState } from 'react';
import { ArrowUpRight, Film, Play } from 'lucide-react';
import { assuranceChapters, assuranceVideo } from '../data/AssuranceDemo';

const localAsset = (path) => path.startsWith('/')
    ? `${process.env.PUBLIC_URL || ''}${path}`
    : path;

function VideoPlayer({ video }) {
    const [started, setStarted] = useState(false);
    const [failed, setFailed] = useState(false);
    const isYoutube = video.type === 'youtube';
    const href = isYoutube ? `https://www.youtube.com/watch?v=${video.src}` : localAsset(video.src);

    return (
        <div>
            <div className="aspect-video bg-ink rounded-lg overflow-hidden flex items-center justify-center">
                {failed ? (
                    <p role="status" className="text-white text-center p-6">La vidéo ne peut pas être chargée ici. Utilisez le lien sous le lecteur pour l’ouvrir.</p>
                ) : isYoutube ? (
                    started ? (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${video.src}`}
                            title="Démo Power BI — Assurance automobile"
                            className="w-full h-full border-0"
                            allow="encrypted-media; picture-in-picture; fullscreen"
                            allowFullScreen
                            onError={() => setFailed(true)}
                        />
                    ) : (
                        <button type="button" onClick={() => setStarted(true)} className="flex items-center gap-3 text-white p-6 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                            <Play aria-hidden="true" size={28} />Ouvrir le lecteur vidéo
                        </button>
                    )
                ) : (
                    <video
                        aria-label="Démo Power BI — Assurance automobile"
                        className="w-full h-full"
                        controls
                        playsInline
                        preload="metadata"
                        src={href}
                        poster={video.poster ? localAsset(video.poster) : undefined}
                        onError={() => setFailed(true)}
                    >
                        {video.captionsSrc && <track kind="captions" src={localAsset(video.captionsSrc)} srcLang="fr" label="Français" default />}
                        Votre navigateur ne prend pas en charge la vidéo. Utilisez le lien sous le lecteur.
                    </video>
                )}
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm text-accent underline underline-offset-4 hover:text-accent-dark">
                Ouvrir la vidéo dans un nouvel onglet<ArrowUpRight size={15} aria-hidden="true" />
            </a>
        </div>
    );
}

export default function AssuranceDemo({ video = assuranceVideo }) {
    const available = Boolean(video.src) && (
        (video.type === 'youtube' && /^[\w-]{11}$/.test(video.src)) ||
        (video.type === 'file' && (/^https:\/\//.test(video.src) || /^\/(?!\/)/.test(video.src)))
    );

    return (
        <section aria-labelledby="assurance-demo-title" className="bg-surface border border-line rounded-xl p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">Du constat à l’investigation</p>
                <span className="text-xs font-medium text-ink-2 bg-raised border border-line rounded-full px-3 py-1">
                    {available ? 'Vidéo disponible' : 'Vidéo à venir · 8 à 9 min prévues'}
                </span>
            </div>
            <h2 id="assurance-demo-title" className="font-display text-3xl font-semibold mb-3">La démo Power BI</h2>
            <p className="text-ink-2 leading-relaxed max-w-prose mb-6">
                Une visite guidée du rapport pour répondre à la question « Où se concentrent les sinistres ? », puis examiner trois cas : B12, R24 et R11.
            </p>
            {available ? <VideoPlayer key={`${video.type}:${video.src}`} video={video} /> : (
                <div className="bg-accent-soft border border-line rounded-lg p-6 sm:p-9 flex items-start gap-4">
                    <Film size={30} aria-hidden="true" className="text-accent shrink-0 mt-1" />
                    <div>
                        <h3 className="font-display text-xl font-semibold mb-2">La vidéo arrive bientôt</h3>
                        <p className="text-sm text-ink-2 leading-relaxed max-w-prose">La démonstration est en préparation. Retrouvez ci-dessous son parcours, les résultats de l’analyse et les fichiers du rapport.</p>
                    </div>
                </div>
            )}
            <h3 className="font-display text-xl font-semibold mt-8 mb-5">{available ? 'Le parcours de la démo' : 'Le parcours prévu'}</h3>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {assuranceChapters.map(([title, description], index) => (
                    <li key={title} className="border-t border-line pt-4">
                        <p className="font-mono text-xs text-accent mb-2">0{index + 1}</p>
                        <h4 className="font-semibold mb-2">{title}</h4>
                        <p className="text-sm text-muted leading-relaxed">{description}</p>
                    </li>
                ))}
            </ol>
            <aside className="border-l-2 border-accent pl-4 mt-7">
                <h3 className="font-semibold mb-2">Et les conducteurs de 18–24 ans ?</h3>
                <p className="text-sm text-muted leading-relaxed">
                    Leur fréquence élevée a aussi été approfondie : l’écart avec les autres âges varie selon le bonus-malus. Ils restent une piste à suivre. La vidéo retient trois cas complémentaires pour garder un format court ; le détail de cette comparaison reste disponible dans{' '}
                    <a href="https://github.com/juleescourne/assurance-auto-analytics/blob/main/notebook/analyse_approfondie.ipynb" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">le notebook d’analyse approfondie</a>.
                </p>
            </aside>
        </section>
    );
}
