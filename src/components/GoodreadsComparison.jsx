import { useState } from 'react';
import results from '../data/goodreads-results.json';

const number = value => Number(value).toLocaleString('fr-FR');
const score = value => Number(value).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function GoodreadsComparison() {
    const [rule, setRule] = useState('Deux par auteur');
    const [threshold, setThreshold] = useState(100);
    const [referenceMode, setReferenceMode] = useState('initiale');
    const scenario = results.scenarios.find(row => row.Regle === rule && row.NotesMinimum === threshold);
    const selected = results.listes.filter(row => row.Scenario === scenario.Scenario);
    const referenceRule = referenceMode === 'initiale' ? 'Initiale' : rule;
    const reference = results.listes.filter(row => row.Regle === referenceRule && row.NotesMinimum === 100);
    const referenceIds = new Set(reference.map(row => row.IdLivre));
    const selectedIds = new Set(selected.map(row => row.IdLivre));
    const entries = selected.filter(row => !referenceIds.has(row.IdLivre));
    const exits = reference.filter(row => !selectedIds.has(row.IdLivre));
    const common = selected.length - entries.length;
    const movements = [['Entrées', entries], ['Sorties', exits]];

    return (
        <section aria-labelledby="comparison-title" className="bg-surface border border-line rounded-xl p-5 sm:p-8">
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">02 · Comparer les décisions</p>
            <h2 id="comparison-title" className="font-display text-3xl mb-3">Quels titres changent lorsque les règles changent ?</h2>
            <p className="text-sm text-ink-2 leading-relaxed max-w-3xl">Explorez les six listes recalculées dans le notebook, à partir des données Goodreads. La proposition de départ applique un maximum de deux fiches par libellé auteur et un minimum de 100 notations.</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <label className="text-sm font-medium">Règle de sélection
                    <select value={rule} onChange={event => setRule(event.target.value)} className="block w-full mt-2 border border-line rounded-md bg-paper p-3 text-ink text-sm">
                        <option value="Deux par auteur">Maximum 2 par auteur</option>
                        <option value="Initiale">Classement initial</option>
                    </select>
                </label>
                <label className="text-sm font-medium">Minimum de notations
                    <select value={threshold} onChange={event => setThreshold(Number(event.target.value))} className="block w-full mt-2 border border-line rounded-md bg-paper p-3 text-ink text-sm">
                        {[100, 500, 1000].map(value => <option value={value} key={value}>{number(value)} notations</option>)}
                    </select>
                </label>
                <label className="text-sm font-medium">Comparer avec
                    <select value={referenceMode} onChange={event => setReferenceMode(event.target.value)} className="block w-full mt-2 border border-line rounded-md bg-paper p-3 text-ink text-sm">
                        <option value="initiale">Liste initiale · 100 notations</option>
                        <option value="meme">Même règle · 100 notations</option>
                    </select>
                </label>
            </div>
            <p role="status" className="mt-5 bg-accent-soft text-accent-dark px-4 py-3 rounded-lg text-sm leading-relaxed">
                <strong>{common} fiches communes sur 20</strong> avec la référence « {referenceRule} · 100 » : {entries.length} entrées et {exits.length} sorties.
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 my-6">
                {[[number(scenario.NbCandidats), 'fiches candidates'], [scenario.NbAuteurs, 'libellés auteur'], [scenario.MaxParAuteur, 'fiches maximum par auteur'], [score(scenario.NoteMoyenne), 'note moyenne de la liste / 5']].map(([value, label]) => (
                    <div key={label}><dt className="text-xs text-muted">{label}</dt><dd className="font-display text-3xl mt-1">{value}</dd></div>
                ))}
            </dl>
            <details className="border border-line rounded-lg p-4 mb-5">
                <summary className="cursor-pointer font-medium text-sm">Voir les titres entrants et sortants ({entries.length} / {exits.length})</summary>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {movements.map(([label, rows]) => <section key={label} aria-label={label}>
                        <h3 className="text-sm font-semibold mb-3">{label}</h3>
                        {rows.length ? <ul className="space-y-3 text-sm text-ink-2">{rows.map(row => <li key={row.IdLivre}><p>{row.Titre}</p><p className="text-xs text-muted mt-1">{row.Auteurs} · {number(row.NbNotes)} notations</p></li>)}</ul> : <p className="text-sm text-muted">Aucune : la liste est identique à la référence.</p>}
                    </section>)}
                </div>
            </details>
            <div role="region" aria-label="Les 20 fiches du scénario choisi" tabIndex={0} className="max-h-[540px] overflow-auto border border-line rounded-lg focus-visible:outline-accent">
                <table className="w-full text-sm table-fixed">
                    <caption className="text-left p-4 text-ink-2 bg-paper">Les 20 fiches · {rule} · minimum {number(threshold)} notations</caption>
                    <thead className="sticky top-0 bg-accent text-white"><tr>
                        <th scope="col" className="w-12 p-2 text-left">Rang</th>
                        <th scope="col" className="p-3 text-left">Titre et auteur</th>
                        <th scope="col" className="w-24 sm:w-32 p-3 text-right">Note / volume</th>
                    </tr></thead>
                    <tbody>{selected.map(row => <tr key={row.IdLivre} className="border-t border-line align-top">
                        <td className="p-3 font-mono text-muted">{row.RangSelection}</td>
                        <td className="p-3 break-words"><span className="font-medium">{row.Titre}</span><span className="block text-xs text-muted mt-1">{row.Auteurs}</span>
                            {!referenceIds.has(row.IdLivre) && <span className="inline-block bg-accent-soft text-accent-dark px-2 py-0.5 rounded text-xs mt-2">Entrée</span>}
                        </td>
                        <td className="p-3 text-right"><span className="font-medium">{score(row.Note)}</span><span className="block text-xs text-muted mt-1">{number(row.NbNotes)} notes</span></td>
                    </tr>)}</tbody>
                </table>
            </div>
            <p className="text-xs text-muted mt-4 leading-relaxed">La comparaison porte sur les identifiants de fiche, y compris les changements d’édition représentante. Les libellés auteur ne séparent pas les contributeurs. Les listes sont calculées sur la photographie de 2020, sans vérifier le stock ou l’offre actuelle.</p>
        </section>
    );
}
