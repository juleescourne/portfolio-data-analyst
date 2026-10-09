"""Synchroniser les résultats publiables depuis le dépôt Goodreads recalculé."""
import argparse
import json
from pathlib import Path
import shutil

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('depot', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
docs = args.depot / 'docs'
data = json.loads((docs / 'livrables/parcours.json').read_text(encoding='utf-8'))
assert len(data['scenarios']) == 6 and len(data['listes']) == 120
for row in data['scenarios']:
    assert len([x for x in data['listes'] if x['Scenario'] == row['Scenario']]) == 20
shutil.copyfile(docs / 'livrables/parcours.json', root / 'src/data/goodreads-results.json')
for filename, target in [
    ('Goodreads_synthese.pdf', 'goodreads-synthese.pdf'),
    ('selection_francais.csv', 'goodreads-selection_francais.csv'),
    ('listes_scenarios.csv', 'goodreads-listes_scenarios.csv'),
    ('mouvements_selections.csv', 'goodreads-mouvements_selections.csv'),
]:
    shutil.copyfile(docs / 'livrables' / filename, root / 'public/documents' / target)
for filename in ['parcours-selection.png', 'diversite-selection.png', 'stabilite-selection.png']:
    shutil.copyfile(docs / 'images' / filename, root / 'public/images' / ('goodreads-' + filename))
print('Six scénarios, figures, CSV et synthèse PDF synchronisés.')
