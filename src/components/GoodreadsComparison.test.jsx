import { fireEvent, render, screen, within } from '@testing-library/react';
import GoodreadsComparison from './GoodreadsComparison';
import GoodreadsPage from '../pages/GoodreadsPage';
import results from '../data/goodreads-results.json';

test('la proposition réelle compare ses quatre remplacements à la liste initiale', () => {
    render(<GoodreadsComparison />);
    expect(screen.getByRole('status')).toHaveTextContent('16 fiches communes sur 20');
    expect(screen.getByRole('status')).toHaveTextContent('4 entrées et 4 sorties');
    expect(screen.getAllByRole('row')).toHaveLength(21);
    expect(within(screen.getByRole('region', { name: /20 fiches/ })).getByText('Hayao Miyazaki')).toBeInTheDocument();
});

test('le choix de la référence distingue diversité et stabilité', () => {
    render(<GoodreadsComparison />);
    fireEvent.change(screen.getByLabelText('Minimum de notations'), { target: { value: '500' } });
    expect(screen.getByRole('status')).toHaveTextContent('11 fiches communes sur 20');
    fireEvent.change(screen.getByLabelText('Comparer avec'), { target: { value: 'meme' } });
    expect(screen.getByRole('status')).toHaveTextContent('15 fiches communes sur 20');
    expect(screen.getByRole('status')).toHaveTextContent('5 entrées et 5 sorties');
    fireEvent.change(screen.getByLabelText('Règle de sélection'), { target: { value: 'Initiale' } });
    expect(screen.getByRole('status')).toHaveTextContent('15 fiches communes sur 20');
    expect(screen.getByRole('table')).toHaveTextContent('Initiale');
});

test('les six scénarios présentent exactement les identifiants et les scores calculés', () => {
    render(<GoodreadsComparison />);
    for (const scenario of results.scenarios) {
        fireEvent.change(screen.getByLabelText('Règle de sélection'), { target: { value: scenario.Regle } });
        fireEvent.change(screen.getByLabelText('Minimum de notations'), { target: { value: String(scenario.NotesMinimum) } });
        const rows = screen.getAllByRole('row').slice(1);
        const expected = results.listes.filter(row => row.Scenario === scenario.Scenario);
        expect(rows).toHaveLength(20);
        expected.forEach((row, index) => {
            expect(rows[index]).toHaveTextContent(row.Titre.replace(/\s+/g, ' '));
            expect(rows[index]).toHaveTextContent(row.Auteurs);
            expect(rows[index]).toHaveTextContent(row.Note.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        });
    }
});

test('la page expose un seul titre principal, ses livrables et le retour', () => {
    const onBack = jest.fn();
    const previous = process.env.PUBLIC_URL;
    process.env.PUBLIC_URL = '/portfolio-data-analyst';
    try {
        const { container } = render(<GoodreadsPage onBack={onBack} />);
        expect(container.querySelectorAll('h1')).toHaveLength(1);
        expect(screen.getByRole('link', { name: 'Lire la synthèse PDF' })).toHaveAttribute('href', '/portfolio-data-analyst/documents/goodreads-synthese.pdf');
        expect(screen.getByRole('link', { name: 'Les six listes · CSV' })).toHaveAttribute('href', '/portfolio-data-analyst/documents/goodreads-listes_scenarios.csv');
        fireEvent.click(screen.getByRole('button', { name: 'Retour au portfolio' }));
        expect(onBack).toHaveBeenCalledTimes(1);
    } finally {
        if (previous === undefined) delete process.env.PUBLIC_URL;
        else process.env.PUBLIC_URL = previous;
    }
});
