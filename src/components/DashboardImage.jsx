import React, { useState } from 'react';
import { Info, ZoomIn } from 'lucide-react';
import { getImageUrl } from '../utils/onnxConfig';

const DashboardImage = ({ dashboard, onImageClick }) => {
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{dashboard.title}</h2>
            </div>

            <div className="relative group">
                <img
                    src={getImageUrl(dashboard.path)}
                    alt={dashboard.title}
                    className={`w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => onImageClick(dashboard.path)}
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: 'block' }}
                />

                {/* Skeleton loader - par-dessus l'image */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-slate-700/50 rounded-lg flex items-center justify-center">
                        <div className="text-gray-400 animate-pulse">Chargement...</div>
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
                        <button className="bg-purple-600 hover:bg-purple-500 text-white rounded-full p-2 shadow-lg transition animate-pulse">
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

                                <h4 className="text-purple-400 font-bold mb-4 text-base">
                                    {insight.title}
                                </h4>

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