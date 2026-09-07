import { Github, ExternalLink, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../utils/assetsConfig';

const ProjectCard = ({ project, onDemoClick }) => (
    <article className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 lg:w-1/3 h-64 md:h-auto overflow-hidden flex-shrink-0 bg-slate-900">
                <img src={getImageUrl(project.image)} alt={`Aperçu — ${project.title}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="p-7 md:p-8 md:w-3/5 lg:w-2/3 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">{project.tags.map((tag) => <span key={tag} className="bg-purple-600/20 text-purple-300 px-3 py-1.5 rounded-lg text-sm border border-purple-500/30">{tag}</span>)}</div>
                    <ul className="mb-6 space-y-2">{project.highlights.map((highlight) => <li key={highlight} className="text-gray-300 text-sm flex items-start gap-2"><ChevronRight className="text-purple-400 flex-shrink-0 mt-0.5" size={16}/><span>{highlight}</span></li>)}</ul>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg transition font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"><Github size={18}/> Code</a>
                    {project.demo && <button onClick={onDemoClick} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"><ExternalLink size={18}/> Démo</button>}
                </div>
            </div>
        </div>
    </article>
);

export default ProjectCard;
