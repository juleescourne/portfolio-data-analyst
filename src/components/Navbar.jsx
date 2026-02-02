import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Navbar = ({ title = "Data Portfolio", showBackButton = false, onBackClick }) => {

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 z-50">
            <div className="max-w-8xl mx-auto px-4 py-4 relative">
                <div className="flex items-center justify-between relative">

                    {/* Gauche - toujours présent pour maintenir la structure */}
                    <div className="flex items-center gap-4 flex-shrink-0 min-w-[120px]">
                        {showBackButton && (
                            <button
                                onClick={onBackClick}
                                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Retour</span>
                            </button>
                        )}
                    </div>

                    {/* Titre centré */}
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-white pointer-events-none">
                        {title}
                    </h1>

                    {/* Droite */}
                    <div className="flex gap-6 flex-shrink-0">
                        {!showBackButton && (
                            <>
                                <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="text-gray-300 hover:text-white transition cursor-pointer">Accueil</a>
                                <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')} className="text-gray-300 hover:text-white transition cursor-pointer">Projets</a>
                                <a href="#skills" onClick={(e) => handleScrollTo(e, '#skills')} className="text-gray-300 hover:text-white transition cursor-pointer">Compétences</a>
                                <a href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="text-gray-300 hover:text-white transition cursor-pointer">À propos</a>
                                <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="text-gray-300 hover:text-white transition cursor-pointer">Contact</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;