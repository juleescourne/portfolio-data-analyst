import { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';

const LINKS = [
    ['Projets', '#projects'],
    ['Démos', '#demos'],
    ['Parcours', '#experience'],
    ['Compétences', '#skills'],
    ['Contact', '#contact'],
];

const Navbar = ({ title = 'Jules Courné', showBackButton = false, onBackClick }) => {
    const [open, setOpen] = useState(false);

    const handleScrollTo = (event, targetId) => {
        event.preventDefault();
        setOpen(false);
        const element = document.querySelector(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav
            className="fixed top-0 w-full bg-paper/95 backdrop-blur-sm border-b border-line z-50"
            aria-label="Navigation principale"
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between gap-4 h-16">
                    {showBackButton ? (
                        <button
                            onClick={onBackClick}
                            className="flex items-center gap-2 text-ink-2 hover:text-accent transition text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour au portfolio
                        </button>
                    ) : (
                        <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="group">
                            {/* Volontairement pas un <h1> : le seul h1 de la page est le titre du héros. */}
                            <span className="font-display text-lg font-semibold text-ink group-hover:text-accent transition">
                                Jules Courné
                            </span>
                            <span className="hidden sm:inline text-muted text-sm ml-2.5 pl-2.5 border-l border-line">
                                Ingénieur Data
                            </span>
                        </a>
                    )}

                    {showBackButton ? (
                        <span className="text-sm text-muted truncate max-w-[55%] text-right">{title}</span>
                    ) : (
                        <>
                            <div className="hidden md:flex items-center gap-7">
                                {LINKS.map(([label, href]) => (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={(e) => handleScrollTo(e, href)}
                                        className="text-sm text-ink-2 hover:text-accent transition"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                            <button
                                className="md:hidden text-ink p-2 -mr-2 rounded"
                                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                                aria-expanded={open}
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </>
                    )}
                </div>

                {!showBackButton && open && (
                    <div className="md:hidden pb-4 grid gap-1.5">
                        {LINKS.map(([label, href]) => (
                            <a
                                key={href}
                                href={href}
                                onClick={(e) => handleScrollTo(e, href)}
                                className="text-ink-2 bg-surface border border-line px-4 py-2.5 rounded-md text-sm"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
