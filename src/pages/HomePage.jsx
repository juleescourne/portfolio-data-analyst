import { Github, Linkedin, Mail, Phone, MapPin, User, Database, Workflow, BarChart3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { projects, skills, focusData, experiences } from '../data/HomeData';

const HomePage = ({ onShowProject }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar title="Jules Courné — Data Portfolio" />

            <section id="home" className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-purple-300 font-semibold tracking-wide uppercase mb-4">Ingénieur Data — Rouen</p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Data Analyst & Data Engineer</h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-4">SQL • Python • ETL • Data Warehousing • BI • Applied ML</p>
                    <p className="max-w-3xl mx-auto text-gray-400 text-lg mb-8">
                        Je transforme des données brutes en données fiables, modèles analytiques et outils d’aide à la décision — de l’ingestion à la restitution.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://github.com/juleescourne" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-purple-400">
                            <Github size={20} /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/jules-courn%C3%A9/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300">
                            <Linkedin size={20} /> LinkedIn
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-10 px-6 bg-slate-800/50" aria-label="Positionnement">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
                    {focusData.map((item) => (
                        <div key={item.label} className="text-center p-4 rounded-xl bg-slate-900/30 border border-slate-700">
                            <div className="text-xl md:text-2xl font-bold text-purple-300 mb-1">{item.value}</div>
                            <div className="text-gray-400 text-sm">{item.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="projects" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-3">Projets sélectionnés</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Des projets choisis pour montrer un parcours cohérent : SQL/BI, data engineering, qualité des données et machine learning appliqué.</p>
                    </div>
                    <div className="space-y-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} onDemoClick={() => project.demoRoute && onShowProject(project.demoRoute)} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="experience" className="py-20 px-6 bg-slate-800/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Parcours Data</h2>
                    <div className="space-y-5">
                        {experiences.map((experience) => (
                            <article key={`${experience.company}-${experience.period}`} className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 md:p-7">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                                        <p className="text-purple-300 font-semibold">{experience.company}</p>
                                    </div>
                                    <span className="text-gray-400 text-sm">{experience.period}</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed">{experience.details}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="skills" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Compétences</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => <span key={skill} className="bg-slate-700 text-gray-300 px-3 py-1 rounded-lg text-sm">{skill}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="about" className="py-20 px-6 bg-slate-800/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">À propos</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"><Database className="text-purple-400 mb-4"/><h3 className="text-white font-bold mb-2">Données fiables</h3><p className="text-gray-300 text-sm">SQL, SGBD relationnels, nettoyage, contrôles qualité et modélisation décisionnelle.</p></div>
                        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"><Workflow className="text-purple-400 mb-4"/><h3 className="text-white font-bold mb-2">Pipelines</h3><p className="text-gray-300 text-sm">Automatisation ETL en Python, validation, chargement et structuration pour l’analyse.</p></div>
                        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"><BarChart3 className="text-purple-400 mb-4"/><h3 className="text-white font-bold mb-2">Décision</h3><p className="text-gray-300 text-sm">KPI, visualisation, analyse statistique et ML quand ils apportent une valeur mesurable.</p></div>
                    </div>
                    <p className="text-gray-300 text-lg mt-8 text-center">Diplômé ingénieur en Systèmes de l’Information et Data, je recherche un CDI en Data / BI autour de Rouen.</p>
                </div>
            </section>

            <section id="contact" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">Contact</h2>
                    <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 grid md:grid-cols-2 gap-6">
                        <Contact icon={Mail} label="Email" value="jules.courne@gmail.com" href="mailto:jules.courne@gmail.com" />
                        <Contact icon={Phone} label="Téléphone" value="07.60.06.65.26" href="tel:+33760066526" />
                        <Contact icon={MapPin} label="Localisation" value="Rouen, Normandie" />
                        <Contact icon={User} label="Nom" value="Jules Courné" />
                    </div>
                </div>
            </section>

            <footer className="py-8 px-6 border-t border-slate-700"><div className="max-w-6xl mx-auto text-center text-gray-400"><p>© 2026 Jules Courné — Data Portfolio</p></div></footer>
        </div>
    );
};

const Contact = ({ icon: Icon, label, value, href }) => (
    <div className="flex items-center gap-4">
        <div className="bg-purple-600/20 p-3 rounded-lg"><Icon className="text-purple-400" size={24} /></div>
        <div><p className="text-gray-400 text-sm">{label}</p>{href ? <a href={href} className="text-white hover:text-purple-400 transition">{value}</a> : <p className="text-white">{value}</p>}</div>
    </div>
);

export default HomePage;
