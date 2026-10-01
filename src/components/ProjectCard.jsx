import { useState } from 'react';
import { Github, ArrowRight, Check } from 'lucide-react';
import { getImageUrl } from '../utils/assetsConfig';

const ProjectCard = ({ project, onDemoClick, headingAs: Heading = 'h3' }) => {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <article className="bg-surface border border-line rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
                {/* Visuel — ratio fixe sur mobile, remplit la hauteur de la fiche sur
                    grand écran. Sans le positionnement absolu, une image carrée serait
                    étirée sur toute la hauteur de la colonne. */}
                <div className="relative bg-raised border-b md:border-b-0 md:border-r border-line-soft aspect-[16/10] md:aspect-auto md:min-h-[240px]">
                    {imageFailed ? (
                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                            <span className="text-muted text-sm">Aperçu indisponible</span>
                        </div>
                    ) : (
                        <img
                            src={getImageUrl(project.image)}
                            alt={project.imageAlt || `Aperçu — ${project.title}`}
                            loading="lazy"
                            decoding="async"
                            onError={() => setImageFailed(true)}
                            className={`absolute inset-0 w-full h-full ${project.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
                        />
                    )}
                </div>

                {/* Contenu */}
                <div className="p-5 sm:p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent mb-2">
                        {project.role}
                    </p>
                    <Heading className="font-display text-2xl font-semibold text-ink mb-2.5 leading-tight">
                        {project.title}
                    </Heading>
                    <p className="text-ink-2 text-[15px] leading-relaxed mb-5 max-w-prose">
                        {project.description}
                    </p>

                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                        {project.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-2.5 text-sm text-ink-2 leading-snug">
                                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-[11px] text-muted bg-raised border border-line-soft px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {project.documentation && (
                            <a href={project.documentation} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-md text-sm font-medium transition">
                                Lire la spécification <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                        {project.demo && (
                            <button
                                type="button"
                                onClick={onDemoClick}
                                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-md text-sm font-medium transition"
                            >
                                {project.demoLabel || 'Voir la démo'}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-line hover:border-accent hover:text-accent text-ink-2 px-4 py-2.5 rounded-md text-sm font-medium transition"
                        >
                            <Github className="w-4 h-4" />
                            Code source
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
