import { fireEvent, render, screen } from '@testing-library/react';
import GoodreadsGuide from './GoodreadsGuide';
import GoodreadsPage from '../pages/GoodreadsPage';
import { goodreadsSteps } from '../data/GoodreadsGuide';

test('le parcours associe chaque étape à sa capture, son analyse et ses limites', () => {
    render(<GoodreadsGuide />);
    expect(screen.getByRole('button', { name: 'Précédent' })).toBeDisabled();
    goodreadsSteps.forEach((step, index) => {
        expect(screen.getAllByRole('tab')[index]).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', `tab-${step.id}`);
        expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining(`/${step.image}.webp`));
        expect(screen.getByText(step.observation)).toBeInTheDocument();
        expect(screen.getByText(step.note)).toBeInTheDocument();
        if (index < 2) fireEvent.click(screen.getByRole('button', { name: 'Suivant' }));
    });
    expect(screen.getByRole('button', { name: 'Suivant' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Précédent' }));
    expect(screen.getByText(goodreadsSteps[1].title)).toBeInTheDocument();
});

test('les onglets se parcourent au clavier avec déplacement du focus', () => {
    render(<GoodreadsGuide />);
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(tabs[1], { key: 'End' });
    expect(tabs[2]).toHaveFocus();
    fireEvent.keyDown(tabs[2], { key: 'ArrowRight' });
    expect(tabs[0]).toHaveFocus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
    expect(tabs[2]).toHaveFocus();
    fireEvent.keyDown(tabs[2], { key: 'Home' });
    expect(tabs[0]).toHaveFocus();
});

test('les ressources respectent le préfixe Pages et le retour au portfolio reste disponible', () => {
    const previous = process.env.PUBLIC_URL;
    process.env.PUBLIC_URL = '/portfolio-data-analyst';
    const onBack = jest.fn();
    try {
        const { container } = render(<GoodreadsPage onBack={onBack} />);
        expect(container.querySelectorAll('h1')).toHaveLength(1);
        expect(screen.getByRole('link', { name: /Consulter les 3 dashboards/ })).toHaveAttribute('href', '/portfolio-data-analyst/documents/goodreads-dashboards.pdf');
        expect(screen.getByRole('img')).toHaveAttribute('src', '/portfolio-data-analyst/images/goodreads/01-catalogue.webp');
        fireEvent.click(screen.getByRole('button', { name: 'Retour au portfolio' }));
        expect(onBack).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('link', { name: 'Projet Power BI et guide' })).toHaveAttribute('href', expect.stringContaining('/tree/main/powerbi'));
    } finally {
        if (previous === undefined) delete process.env.PUBLIC_URL;
        else process.env.PUBLIC_URL = previous;
    }
});
