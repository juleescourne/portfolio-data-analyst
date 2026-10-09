"""Copier uniquement les résultats agrégés MySQL du projet Hospital vers le site."""
import argparse
import json
from pathlib import Path
import shutil

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('depot', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
source = args.depot / 'results'
data = json.loads((source / 'portfolio.json').read_text())
assert len(data['activity']) == 6
assert sum(r['encounter_count'] for r in data['activity']) == data['overview']['encounters']
shutil.copyfile(source / 'portfolio.json', root / 'src/data/hospital-results.json')
for name in ['activity', 'coverage', 'quality', 'overview']:
    shutil.copyfile(source / (name + '.csv'), root / 'public/documents' / ('hospital-' + name + '.csv'))
print('Résultats MySQL et quatre CSV agrégés synchronisés.')
