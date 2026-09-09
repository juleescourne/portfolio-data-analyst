import { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';

const Navbar = ({ title = 'Data Portfolio', showBackButton = false, onBackClick }) => {
    const [open, setOpen] = useState(false);
    const links = [['Accueil', '#home'], ['Projets', '#projects'], ['Parcours', '#experience'], ['Compétences', '#skills'], ['À propos', '#about'], ['Contact', '#contact']];

    const handleScrollTo = (event, targetId) => {
        event.preventDefault();
        setOpen(false);
        const element = document.querySelector(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50" aria-label="Navigation principale">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-[88px]">
                        {showBackButton && <button onClick={onBackClick} className="flex items-center gap-2 text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"><ArrowLeft className="w-5 h-5"/><span className="hidden sm:inline">Retour</span></button>}
                    </div>
                    {/* Volontairement pas un <h1> : le seul h1 de la page est le titre du héros. */}
                    <p className="text-base sm:text-xl font-bold text-white text-center truncate">{title}</p>
                    <div className="min-w-[88px] flex justify-end">
                        {!showBackButton && <button className="md:hidden text-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>}
                        {!showBackButton && <div className="hidden md:flex gap-5">{links.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleScrollTo(e, href)} className="text-gray-300 hover:text-white transition text-sm">{label}</a>)}</div>}
                    </div>
                </div>
                {!showBackButton && open && <div className="md:hidden pt-4 pb-2 grid grid-cols-2 gap-2">{links.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleScrollTo(e, href)} className="text-gray-200 bg-slate-800 px-3 py-2 rounded-lg">{label}</a>)}</div>}
            </div>
        </nav>
    );
};

export default Navbar;
