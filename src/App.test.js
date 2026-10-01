import { render, screen, within } from '@testing-library/react';
import App from './App';
import { projects, profile } from './data/HomeData';

// Ces tests couvrent ce qu'un recruteur doit trouver sur la page d'accueil.
// Ils échouent si l'un de ces éléments disparaît à la faveur d'un remaniement.

beforeEach(() => {
    window.location.hash = '';
});

test('la page affiche un seul h1, qui porte le positionnement', () => {
    const { container } = render(<App />);
    const headings = container.querySelectorAll('h1');

    // Un seul h1 par page : c'est la règle que suivent les moteurs de recherche.
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(profile.title);
});

test('le CV est téléchargeable depuis le héros', () => {
    render(<App />);
    const link = screen.getByRole('link', { name: /télécharger mon cv/i });
    expect(link.getAttribute('href')).toContain(profile.cv);
});

test('la disponibilité et la localisation sont visibles', () => {
    render(<App />);
    expect(screen.getByText(profile.availability)).toBeInTheDocument();
    expect(screen.getByText(profile.mobility)).toBeInTheDocument();
});

test('tous les projets sont présentés avec leur lien vers le code', () => {
    render(<App />);

    projects.forEach((project) => {
        const card = document.getElementById(`project-${project.id}`);
        expect(card).not.toBeNull();
        expect(within(card).getByRole('heading', { name: project.title })).toBeInTheDocument();
    });

    projects.forEach(project => {
        const card = document.getElementById(`project-${project.id}`);
        expect(within(card).getByRole('link', { name: /code source/i })).toHaveAttribute('href', project.github);
    });
});

test('chaque projet annoncé comme démo expose un bouton de démo', () => {
    render(<App />);
    projects
        .filter((project) => project.demo)
        .forEach((project) => {
            const card = document.getElementById(`project-${project.id}`);
            expect(within(card).getByRole('button', { name: project.demoLabel })).toBeInTheDocument();
        });
});

test('les moyens de contact sont présents', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute(
        'href',
        `mailto:${profile.email}`,
    );
    expect(screen.getByRole('link', { name: profile.phone })).toHaveAttribute('href', profile.phoneHref);
});
