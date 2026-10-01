import {
    Github, Linkedin, Mail, Phone, MapPin, Download, ArrowRight,
    Database, Workflow, BarChart3, GraduationCap, Circle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import {
    profile, proofPoints, projects, projectThemes, skills, otherSkills,
    experiences, formation, certifications, about,
} from '../data/HomeData';

const ABOUT_ICONS = { database: Database, workflow: Workflow, chart: BarChart3 };

const Section = ({ id, eyebrow, title, lead, children, tone = 'paper' }) => (
    <section id={id} className={tone === 'surface' ? 'bg-surface border-y border-line-soft' : ''}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
            {eyebrow && (
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-3">{eyebrow}</p>
            )}
            {title && (
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-3 leading-tight">
                    {title}
                </h2>
            )}
            {lead && <p className="text-muted max-w-prose mb-10 leading-relaxed">{lead}</p>}
            {!lead && <div className="mb-10" />}
            {children}
        </div>
    </section>
);

const HomePage = ({ onShowProject }) => {
    const hasFormation = formation.some((f) => f.school);

    // Tous les projets n'ont pas de démo : « voir la preuve » fait donc défiler
    // jusqu’à la fiche correspondante.
    const scrollToProject = (id) => {
        const card = document.getElementById(`project-${id}`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="min-h-screen bg-paper">
            <Navbar />

            {/* ------------------------------------------------------------- Héros */}
            <header id="home" className="pt-28 sm:pt-32 pb-14 border-b border-line">
                <div className="max-w-6xl mx-auto px-5 sm:px-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-5">
                        {profile.eyebrow}
                    </p>

                    <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl font-semibold text-ink mb-5 max-w-4xl">
                        {profile.title}
                    </h1>

                    <p className="text-lg sm:text-xl text-ink-2 mb-3 max-w-prose leading-relaxed">
                        {profile.pitch}
                    </p>
                    <p className="font-mono text-sm text-muted mb-7">{profile.tagline}</p>

                    {/* Disponibilité : l'information qu'un recruteur cherche en premier. */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-9 text-sm">
                        <span className="inline-flex items-center gap-2 text-ok font-medium">
                            <Circle className="w-2.5 h-2.5 fill-current" aria-hidden="true" />
                            {profile.availability}
                        </span>
                        <span className="text-muted">{profile.mobility}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href={`${process.env.PUBLIC_URL}/${profile.cv}`}
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-3 rounded-md font-medium transition"
                        >
                            <Download className="w-4 h-4" />
                            Télécharger mon CV
                        </a>
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 border border-line hover:border-accent hover:text-accent text-ink px-5 py-3 rounded-md font-medium transition bg-surface"
                        >
                            Voir les projets
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-line hover:border-accent hover:text-accent text-ink-2 px-5 py-3 rounded-md font-medium transition bg-surface"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-line hover:border-accent hover:text-accent text-ink-2 px-5 py-3 rounded-md font-medium transition bg-surface"
                        >
                            <Linkedin className="w-4 h-4" /> LinkedIn
                        </a>
                    </div>
                </div>
            </header>

            {/* -------------------------------------------------- Bandeau de preuve */}
            <div className="bg-surface border-b border-line">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8">
                    <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7">
                        {proofPoints.map((point) => (
                            <div key={point.label}>
                                <dt className="sr-only">{point.label}</dt>
                                <dd>
                                    <span className="font-mono tabular text-3xl font-semibold text-ink block leading-none mb-2">
                                        {point.value}
                                    </span>
                                    <span className="text-sm text-ink-2 block leading-snug">{point.label}</span>
                                    <span className="text-xs text-muted block mt-0.5">{point.context}</span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* ----------------------------------------------------------- Projets */}
            <Section
                id="projects"
                eyebrow="Travaux"
                title="Mes projets, par thème"
                lead="Des études métier, des modèles et des applications. Chaque fiche présente la question traitée, le travail réalisé et les livrables consultables."
            >
                <nav aria-label="Thèmes des projets" className="grid md:grid-cols-3 gap-3 mb-12">
                    {projectThemes.map((theme, index) => (
                        <a key={theme.id} href={`#theme-${theme.id}`} className="group bg-surface border border-line hover:border-accent rounded-lg p-5 transition">
                            <span className="font-mono text-xs text-accent block mb-3">0{index + 1} · {projects.filter(project => project.theme === theme.id).length} projets</span>
                            <span className="font-semibold text-ink group-hover:text-accent">{theme.title} <span aria-hidden="true">↓</span></span>
                        </a>
                    ))}
                </nav>
                <div className="space-y-16">
                    {projectThemes.map((theme, index) => (
                        <section key={theme.id} id={`theme-${theme.id}`} aria-labelledby={`title-${theme.id}`} className="scroll-mt-24">
                            <div className="border-t border-line pt-7 mb-6">
                                <p className="font-mono text-xs text-accent mb-2">0{index + 1}</p>
                                <h3 id={`title-${theme.id}`} className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-2">{theme.title}</h3>
                                <p className="text-muted max-w-prose leading-relaxed">{theme.description}</p>
                            </div>
                            <div className="space-y-6">
                                {projects.filter(project => project.theme === theme.id).map(project => (
                                    <div key={project.id} id={`project-${project.id}`} className="scroll-mt-24">
                                        <ProjectCard project={project} headingAs="h4" onDemoClick={() => onShowProject(project.demoRoute)} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </Section>

            {/* ---------------------------------------------------------- Parcours */}
            <Section id="experience" eyebrow="Expérience" title="Parcours">
                <ol className="space-y-0 border-l border-line ml-1">
                    {experiences.map((experience) => (
                        <li key={`${experience.company}-${experience.period}`} className="relative pl-7 pb-9 last:pb-0">
                            <span
                                className="absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-accent"
                                aria-hidden="true"
                            />
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                                <h3 className="font-semibold text-ink text-lg">{experience.role}</h3>
                                {experience.contract && (
                                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent bg-accent-soft px-2 py-0.5 rounded">
                                        {experience.contract}
                                    </span>
                                )}
                            </div>
                            <p className="text-ink-2 mb-1.5">
                                {experience.company}
                                <span className="font-mono text-sm text-muted ml-3">{experience.period}</span>
                            </p>
                            <p className="text-muted text-[15px] leading-relaxed max-w-prose">{experience.details}</p>
                            {experience.analysisHighlights && (
                                <dl className="mt-5 grid sm:grid-cols-2 gap-4 max-w-4xl">
                                    {experience.analysisHighlights.map((highlight) => (
                                        <div key={highlight.title} className="rounded-lg border border-line bg-surface p-4 sm:p-5">
                                            <dt className="font-semibold text-ink mb-2">{highlight.title}</dt>
                                            <dd className="text-sm text-muted leading-relaxed">{highlight.text}</dd>
                                        </div>
                                    ))}
                                </dl>
                            )}
                            {experience.scopeNote && (
                                <p className="mt-4 text-sm text-muted leading-relaxed max-w-prose">{experience.scopeNote}</p>
                            )}
                        </li>
                    ))}
                </ol>

                {hasFormation && (
                    <div className="mt-12 pt-9 border-t border-line">
                        <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-5">
                            Formation et certification
                        </h3>
                        {formation.filter((f) => f.school).map((entry) => (
                            <div key={entry.degree} className="flex gap-3.5">
                                <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <div>
                                    <p className="font-semibold text-ink">{entry.degree}</p>
                                    <p className="text-ink-2">
                                        {entry.school}
                                        {entry.year && <span className="font-mono text-sm text-muted ml-3">{entry.year}</span>}
                                    </p>
                                    {entry.details && <p className="text-muted text-sm mt-1">{entry.details}</p>}
                                </div>
                            </div>
                        ))}
                        {certifications.map((certification) => (
                            <div key={`${certification.issuer}-${certification.name}`} className="mt-6 flex gap-3.5">
                                <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <div>
                                    <p className="font-semibold text-ink">{certification.name}</p>
                                    <p className="text-ink-2">
                                        {certification.issuer}
                                        <span className="font-mono text-sm text-muted ml-3">{certification.date}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Section>

            {/* ------------------------------------------------------ Compétences */}
            <Section
                id="skills"
                eyebrow="Savoir-faire"
                title="Compétences"
                lead="Chaque compétence renvoie au projet qui la démontre. Rien n'est listé sans preuve consultable."
                tone="surface"
            >
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-9">
                    {skills.map((group) => (
                        <div key={group.category}>
                            <h3 className="font-semibold text-ink mb-3.5 pb-2.5 border-b border-line">
                                {group.category}
                            </h3>
                            <ul className="space-y-2">
                                {group.items.map((item) => (
                                    <li key={item.name} className="flex items-baseline justify-between gap-4 text-sm">
                                        <span className="text-ink-2">{item.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => scrollToProject(item.proof)}
                                            className="font-mono text-[11px] text-accent hover:underline shrink-0"
                                        >
                                            voir la preuve
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 mt-11 pt-9 border-t border-line">
                    {Object.entries(otherSkills).map(([category, items]) => (
                        <div key={category}>
                            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3">
                                {category}
                            </h3>
                            <p className="text-ink-2 text-sm">{items.join(' · ')}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* --------------------------------------------------------- À propos */}
            <Section id="about" eyebrow="Approche" title="Ma façon de travailler">
                <div className="grid md:grid-cols-3 gap-7">
                    {about.map((item) => {
                        const Icon = ABOUT_ICONS[item.icon];
                        return (
                            <div key={item.title}>
                                <Icon className="w-5 h-5 text-accent mb-3.5" aria-hidden="true" />
                                <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                                <p className="text-muted text-[15px] leading-relaxed">{item.text}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            {/* ---------------------------------------------------------- Contact */}
            <Section id="contact" eyebrow="Prendre contact" title="Parlons-en" tone="surface">
                <p className="text-ink-2 max-w-prose mb-9 leading-relaxed -mt-6">{profile.seeking}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ContactItem icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                    <ContactItem icon={Phone} label="Téléphone" value={profile.phone} href={profile.phoneHref} />
                    <ContactItem icon={MapPin} label="Localisation" value={profile.location} />
                    <ContactItem icon={Linkedin} label="LinkedIn" value="jules-courné" href={profile.linkedin} external />
                </div>
            </Section>

            <footer className="border-t border-line">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 py-7 flex flex-wrap gap-x-6 gap-y-2 justify-between items-center">
                    <p className="font-mono text-xs text-muted">© 2026 {profile.name}</p>
                    <p className="font-mono text-xs text-muted">
                        Construit avec React et Tailwind ·{' '}
                        <a
                            href="https://github.com/juleescourne/portfolio-data-analyst"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                        >
                            code source
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

const ContactItem = ({ icon: Icon, label, value, href, external }) => (
    <div className="flex gap-3.5">
        <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
        <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-1">{label}</p>
            {href ? (
                <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-ink hover:text-accent transition break-words"
                >
                    {value}
                </a>
            ) : (
                <p className="text-ink break-words">{value}</p>
            )}
        </div>
    </div>
);

export default HomePage;
