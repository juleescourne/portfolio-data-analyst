import { fireEvent, render, screen } from '@testing-library/react';
import AssuranceDemo from './AssuranceDemo';
import AssurancePage from '../pages/AssurancePage';

test('en attente de vidéo, la page explique le parcours sans lecteur cassé', () => {
    const { container } = render(<AssurancePage onBack={() => {}} />);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'La vidéo arrive bientôt' })).toBeInTheDocument();
    expect(container.querySelector('video, iframe')).toBeNull();
    expect(screen.queryByRole('link', { name: /ouvrir la vidéo dans un nouvel onglet/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Et les conducteurs de 18–24 ans ?' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /le notebook d’analyse approfondie/i })).toHaveAttribute('href', expect.stringContaining('analyse_approfondie.ipynb'));
});

test('le MP4 respecte le préfixe de publication, expose les sous-titres et gère une erreur de lecture', () => {
    const previous = process.env.PUBLIC_URL;
    process.env.PUBLIC_URL = '/portfolio-data-analyst';
    try {
        const { container } = render(<AssuranceDemo video={{ type: 'file', src: '/videos/assurance.mp4', captionsSrc: '/videos/assurance.fr.vtt' }} />);
        const player = screen.getByLabelText('Démo Power BI — Assurance automobile');
        expect(player).toHaveAttribute('src', '/portfolio-data-analyst/videos/assurance.mp4');
        expect(player).toHaveAttribute('controls');
        expect(player).not.toHaveAttribute('autoplay');
        expect(container.querySelector('track')).toHaveAttribute('src', '/portfolio-data-analyst/videos/assurance.fr.vtt');
        fireEvent.error(player);
        expect(screen.getByRole('status')).toHaveTextContent('La vidéo ne peut pas être chargée ici');
        expect(screen.getByRole('link', { name: /ouvrir la vidéo dans un nouvel onglet/i })).toHaveAttribute('href', '/portfolio-data-analyst/videos/assurance.mp4');
    } finally {
        if (previous === undefined) delete process.env.PUBLIC_URL;
        else process.env.PUBLIC_URL = previous;
    }
});

test('YouTube charge le lecteur au clic et conserve un lien direct', () => {
    const { container } = render(<AssuranceDemo video={{ type: 'youtube', src: 'abcdefghijk' }} />);
    expect(container.querySelector('iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le lecteur vidéo' }));
    expect(screen.getByTitle('Démo Power BI — Assurance automobile')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/abcdefghijk');
    expect(screen.getByRole('link', { name: /ouvrir la vidéo dans un nouvel onglet/i })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=abcdefghijk');
});

test('un identifiant YouTube incomplet ne crée pas un lecteur inutilisable', () => {
    const { container } = render(<AssuranceDemo video={{ type: 'youtube', src: 'à compléter' }} />);
    expect(screen.getByRole('heading', { name: 'La vidéo arrive bientôt' })).toBeInTheDocument();
    expect(container.querySelector('iframe')).toBeNull();
});
