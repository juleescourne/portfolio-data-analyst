"""Rendre les trois pages du PDF Goodreads sans modifier leur contenu."""
import argparse
import hashlib
import json
from datetime import date
from pathlib import Path
import shutil

import pymupdf

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('pdf', type=Path)
parser.add_argument('--date', required=True, type=date.fromisoformat,
                    help='Date de fourniture du PDF, au format AAAA-MM-JJ')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
names = ['01-catalogue', '02-selection', '03-qualite']
with pymupdf.open(args.pdf) as document:
    if len(document) != len(names):
        parser.error('Le rapport doit contenir exactement trois pages, dans l’ordre du parcours.')
    images = root / 'public/images/goodreads'
    documents = root / 'public/documents'
    images.mkdir(parents=True, exist_ok=True)
    documents.mkdir(parents=True, exist_ok=True)
    for page, name in zip(document, names):
        for suffix, width in [('', 1484), ('-large', 2472)]:
            scale = width / page.rect.width
            pixmap = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
            pixmap.pil_save(str(images / f'{name}{suffix}.webp'),
                            format='WEBP', quality=90, method=6)
    target = documents / 'goodreads-dashboards.pdf'
    if args.pdf.resolve() != target.resolve():
        shutil.copyfile(args.pdf, target)
    manifest = {
        'source': 'demo_portfolio/Goodreads.pdf fourni par Jules Courné',
        'sha256': hashlib.sha256(target.read_bytes()).hexdigest(),
        'pages': len(document),
        'provided_date': args.date.isoformat(),
        'rendering': 'Pages entières rendues depuis le PDF, sans modification des graphiques.',
    }
    (documents / 'goodreads-source.json').write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Trois pages, six WebP et le PDF source sont prêts.')
