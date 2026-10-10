import { fireEvent, render, screen, within } from '@testing-library/react';
import HospitalPage from '../pages/HospitalPage';
import data from '../data/hospital-results.json';

test('les trois lectures de l’activité restent cohérentes avec les exports MySQL', () => {
    render(<HospitalPage />);
    const list = screen.getByRole('list', { name: 'Répartition par type de passage' });
    for (const [label, field, suffix] of [['Passages', 'encounter_count', 'passages'], ['Durée médiane', 'median_hours', 'h'], ['Durée moyenne', 'average_hours', 'h'], ['Part des montants', 'cost_share_pct', '%']]) {
        fireEvent.click(screen.getByRole('button', { name: label }));
        expect(screen.getByRole('button', { name: label })).toHaveAttribute('aria-pressed', 'true');
        const rows = within(list).getAllByRole('listitem');
        data.activity.forEach((row, index) => expect(rows[index]).toHaveTextContent(`${row[field].toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${suffix}`.replace(/\s+/g, ' ')));
    }
});

test('les payeurs Maven et les scénarios conservent les dénominateurs du jeu public', () => {
    render(<HospitalPage />);
    fireEvent.change(screen.getByLabelText('Choisir un payeur'), { target: { value: 'NO_INSURANCE' } });
    expect(screen.getByRole('status')).toHaveTextContent('0 %');
    expect(screen.getByRole('status')).toHaveTextContent('8 807 passages');
    fireEvent.change(screen.getByLabelText('Choisir un payeur'), { target: { value: 'Medicare' } });
    expect(screen.getByRole('status')).toHaveTextContent('77,96 %');
    fireEvent.change(screen.getByLabelText('Choisir un payeur'), { target: { value: 'all' } });
    expect(screen.getByRole('status')).toHaveTextContent('30,63 %');
    expect(screen.getByRole('table', { name: 'Sensibilité des durées' })).toHaveTextContent('0,92 h');
    expect(screen.getByRole('table', { name: 'Sensibilité des durées' })).toHaveTextContent('9,48 h');
});

test('les livrables utilisent le préfixe du portfolio et le retour fonctionne', () => {
    const previous = process.env.PUBLIC_URL;
    process.env.PUBLIC_URL = '/portfolio-data-analyst';
    const onBack = jest.fn();
    try {
        const { container } = render(<HospitalPage onBack={onBack} />);
        expect(container.querySelectorAll('h1')).toHaveLength(1);
        expect(screen.getByRole('link', { name: 'Volumes et durées · CSV' })).toHaveAttribute('href', '/portfolio-data-analyst/documents/hospital-activity.csv');
        expect(within(screen.getByRole('list', { name: 'Résultats des contrôles qualité' })).getAllByRole('listitem')).toHaveLength(8);
        fireEvent.click(screen.getByRole('button', { name: 'Retour au portfolio' }));
        expect(onBack).toHaveBeenCalledTimes(1);
    } finally {
        if (previous === undefined) delete process.env.PUBLIC_URL;
        else process.env.PUBLIC_URL = previous;
    }
});
