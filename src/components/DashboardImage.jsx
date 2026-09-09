import { useState } from 'react';
import { Info, X, ZoomIn } from 'lucide-react';
import { getImageUrl } from '../utils/assetsConfig';

const DashboardImage = ({ dashboard, onImageClick }) => {
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Sur mobile un tap déclenche mouseenter PUIS click : un toggle rouvrirait puis refermerait
    // aussitôt l'infobulle. On ouvre donc explicitement, et on ferme par le bouton dédié.
    const openTooltip = (id) => setActiveTooltip(id);
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{dashboard.title}</h2>
            </div>

            <div className="relative group">
                <img
                    src={getImageUrl(dashboard.path)}
                    alt={dashboard.title}
                    width={dashboard.width || 1600}
                    height={dashboard.height || 1053}
                    className={`w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => onImageClick(getImageUrl(dashboard.path))}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    loading="lazy"
                    decoding="async"
                    // Réserve la place avant le chargement : supprime le saut de mise en page.
                    style={{ display: 'block', aspectRatio: `${dashboard.width || 1600} / ${dashboard.height || 1053}` }}
                />

                {/* État de chargement, puis message d'échec explicite plutôt qu'un squelette infini */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-slate-700/50 rounded-lg flex items-center justify-center p-6 text-center">
                        {imageError ? (
                            <div className="text-sm text-amber-300">
                                <p className="font-semibold mb-1">Capture indisponible</p>
                                <p className="text-amber-200/80">
                                    Le CDN qui héberge les captures est peut-être bloqué sur ce réseau.
                                    Les analyses de cette page restent lisibles ci-dessous.
                                </p>
                            </div>
                        ) : (
                            <div className="text-gray-400 animate-pulse">Chargement…</div>
                        )}
                    </div>
                )}

                <button
                    onClick={() => onImageClick(getImageUrl(dashboard.path))}
                    className="absolute top-4 right-4 bg-slate-900/80 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition z-10">
                    <ZoomIn className="text-white" size={20} />
                </button>

                {/* Boutons Info */}
                {dashboard.insights.map((insight, idx) => (
                    <div
                        key={`button-${idx}`}
                        className="absolute z-10"
                        style={{
                            top: insight.position.top,
                            left: insight.position.left,
                            transform: 'translate(-50%, -50%)'
                        }}
                        onMouseEnter={() => setActiveTooltip(`${dashboard.id}-${idx}`)}
                        onMouseLeave={() => setActiveTooltip(null)}>
                        {/* Le clic est indispensable : sur mobile il n'y a pas de survol. */}
                        <button
                            type="button"
                            onClick={() => openTooltip(`${dashboard.id}-${idx}`)}
                            aria-expanded={activeTooltip === `${dashboard.id}-${idx}`}
                            aria-label={`Analyse : ${insight.title}`}
                            className="bg-purple-600 hover:bg-purple-500 text-white rounded-full p-3 shadow-lg transition animate-pulse focus:outline-none focus:ring-2 focus:ring-white">
                            <Info size={20} />
                        </button>
                    </div>
                ))}

                {/* Tooltips - Séparés et au premier plan */}
                {dashboard.insights.map((insight, idx) => {
                    const tooltipWidth = insight.position?.width || '24rem';
                    const isActive = activeTooltip === `${dashboard.id}-${idx}`;

                    return isActive ? (
                        <div
                            key={`tooltip-${idx}`}
                            className="absolute"
                            style={{
                                top: insight.position.top,
                                left: insight.position.left,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 9999,
                                pointerEvents: 'none'
                            }}>
                            <div
                                className="absolute max-h-96 overflow-y-auto bg-slate-900 border border-purple-500 rounded-lg p-5 shadow-2xl"
                                style={{
                                    width: tooltipWidth,
                                    top: 'calc(100% + 20px)',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    pointerEvents: 'auto'
                                }}
                                onMouseEnter={() => setActiveTooltip(`${dashboard.id}-${idx}`)}
                                onMouseLeave={() => setActiveTooltip(null)}>
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-900 border-l border-t border-purple-500 rotate-45"></div>

                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <h4 className="text-purple-400 font-bold text-base">
                                        {insight.title}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTooltip(null)}
                                        aria-label="Fermer l’analyse"
                                        className="shrink-0 text-gray-400 hover:text-white transition p-1 -m-1 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded">
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Support pour array de contenus avec séparateurs visuels */}
                                {Array.isArray(insight.content) ? (
                                    <div className="space-y-4">
                                        {insight.content.map((item, i) => (
                                            <div
                                                key={i}
                                                className={`${i !== 0 ? 'pt-4 border-t border-purple-500/20' : ''}`}>
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {insight.content}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default DashboardImage;