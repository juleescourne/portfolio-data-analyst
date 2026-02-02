// components/ProjectCard.jsx
/*import React from 'react';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project, onDemoClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-slate-700 hover:border-purple-500/50">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30">
                            {tag}
                        </span>
                    ))}
                </div>

                {project.highlights && (
                    <ul className="mb-4 space-y-1">
                        {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                                <ChevronRight className="text-purple-400 flex-shrink-0 mt-0.5" size={16} />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex gap-3">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition text-sm">
                            <Github size={16} />
                            Code
                        </a>
                    )}
                    {project.demo && (
                        <button
                            onClick={onDemoClick}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition text-sm">
                            <ExternalLink size={16} />
                            Démo
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
};

export default ProjectCard;*/
// components/ProjectCard.jsx
// components/ProjectCard.jsx
import React from 'react';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project, onDemoClick }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-slate-700 hover:border-purple-500/50">
            <div className="flex flex-col md:flex-row">
                {/* Image à gauche */}
                <div className="md:w-2/5 lg:w-1/3 h-64 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Contenu à droite */}
                <div className="p-8 md:w-3/5 lg:w-2/3 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-300 mb-4 text-base leading-relaxed">{project.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-purple-600/20 text-purple-300 px-3 py-1.5 rounded-lg text-sm border border-purple-500/30">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Highlights */}
                        {project.highlights && (
                            <ul className="mb-6 space-y-2">
                                {project.highlights.map((highlight, idx) => (
                                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                                        <ChevronRight className="text-purple-400 flex-shrink-0 mt-0.5" size={16} />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-4 mt-4">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg transition font-medium">
                                <Github size={18} />
                                Code
                            </a>
                        )}
                        {project.demo && (
                            <button
                                onClick={onDemoClick}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition font-medium">
                                <ExternalLink size={18} />
                                Démo
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProjectCard;
