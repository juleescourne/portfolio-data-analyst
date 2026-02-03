// pages/HomePage.jsx
import { Github, Linkedin, Mail, Phone, MapPin, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { projects, skills, statsData } from '../data/HomeData';

const HomePage = ({ onShowDashboard, onShowHousing, onShowChurn }) => {


    const handleDemoClick = (projectId) => {
        switch (projectId) {
            case 1:
                onShowDashboard();
                break;
            case 2:
                onShowHousing();
                break;
            case 3:
                onShowChurn();
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar title="Data Portfolio" />

            {/* Hero Section */}
            <section id="home" className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Data Analyst
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8">
                            Transformer les données en insights actionnables
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a
                                href="https://github.com/juleescourne"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                <Github size={20} />
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/votre-profil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                <Linkedin size={20} />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-6 bg-slate-800/50">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
                            <div className="text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Mes Projets</h2>
                    <div className="space-y-8">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onDemoClick={() => handleDemoClick(project.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 px-6 bg-slate-800/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Compétences</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category} className="bg-slate-800/50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill, idx) => (
                                        <span key={idx} className="bg-slate-700 text-gray-300 px-3 py-1 rounded-lg text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">À propos</h2>
                    <div className="bg-slate-800/50 p-8 rounded-xl">
                        <p className="text-gray-300 text-lg mb-4">
                            Passionné par la transformation de données complexes en insights actionnables.
                        </p>
                        <p className="text-gray-300 text-lg mb-4">
                            Spécialisé dans l'analyse exploratoire, la visualisation de données et la compréhension métier, j'aide à prendre des décisions basées sur les données.
                        </p>
                        <p className="text-gray-300 text-lg">
                            Ingénieur diplômé en science de l'information, je maîtrise Python, SQL, Power Apps et Machine Learning.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 bg-slate-800/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">Contact</h2>
                    <p className="text-gray-300 text-lg mb-12 text-center">
                        N'hésitez pas à me contacter !
                    </p>

                    {/* Coordonnées directes */}
                    <div className="bg-slate-800/50 rounded-xl p-8 mb-8 border border-slate-700">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-600/20 p-3 rounded-lg">
                                    <Mail className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <a href="mailto:jules.courne@gmail.com"
                                        className="text-white hover:text-purple-400 transition">
                                        jules.courne@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-purple-600/20 p-3 rounded-lg">
                                    <Phone className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Téléphone</p>
                                    <a href="tel:+33760066526"
                                        className="text-white hover:text-purple-400 transition">
                                        07.60.06.65.26
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-purple-600/20 p-3 rounded-lg">
                                    <MapPin className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Localisation</p>
                                    <p className="text-white">Rouen, Normandie</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-purple-600/20 p-3 rounded-lg">
                                    <User className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Nom</p>
                                    <p className="text-white">Jules Courné</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="py-8 px-6 border-t border-slate-700" >
                <div className="max-w-6xl mx-auto text-center text-gray-400">
                    <p>2026 Jules Courné.</p>
                </div>
            </footer >
        </div >
    );
};

export default HomePage;