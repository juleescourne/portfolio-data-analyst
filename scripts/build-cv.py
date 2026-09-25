"""Generate a one-page, offline CV from the website's shared career data."""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
career = json.loads((ROOT / 'src/data/career.json').read_text(encoding='utf-8'))
profile = career['profile']
for key in ['school', 'degree', 'year']:
    if not career['formation'][0].get(key):
        raise ValueError(f'Missing formation.{key}')
font_dir = Path('/usr/share/fonts/truetype/dejavu')
regular, bold = 'Helvetica', 'Helvetica-Bold'
if (font_dir / 'DejaVuSans.ttf').exists():
    pdfmetrics.registerFont(TTFont('CVSans', str(font_dir / 'DejaVuSans.ttf')))
    pdfmetrics.registerFont(TTFont('CVSansBold', str(font_dir / 'DejaVuSans-Bold.ttf')))
    pdfmetrics.registerFontFamily('CVSans', normal='CVSans', bold='CVSansBold')
    regular, bold = 'CVSans', 'CVSansBold'
ink, teal, muted = [colors.HexColor(v) for v in ['#182C30', '#0D666A', '#4B5A60']]
styles = {
    'name': ParagraphStyle('name', fontName=bold, fontSize=23, leading=27, textColor=ink),
    'title': ParagraphStyle('title', fontName=bold, fontSize=12, leading=17, textColor=teal),
    'body': ParagraphStyle('body', fontName=regular, fontSize=9.2, leading=13, textColor=ink),
    'small': ParagraphStyle('small', fontName=regular, fontSize=8.2, leading=12, textColor=muted),
    'date': ParagraphStyle('date', fontName=regular, fontSize=7.7, leading=11, textColor=muted, alignment=TA_RIGHT),
    'section': ParagraphStyle('section', fontName=bold, fontSize=9, leading=14, textColor=teal, spaceBefore=10, spaceAfter=5),
}
def p(text, style='body'): return Paragraph(text, styles[style])
def e(text): return escape(str(text))
def link(url, label): return f'<link href="{e(url)}" color="#0D666A">{e(label)}</link>'

story = [p(e(profile['name']), 'name'), p(e(profile['title']), 'title')]
story += [p(' · '.join([e(profile['location']), link('mailto:'+profile['email'], profile['email']), link(profile['phoneHref'], profile['phone'])]), 'small')]
story += [p(' · '.join([link(profile['portfolio'], 'Portfolio et démonstrations'), link(profile['github'], 'GitHub'), link(profile['linkedin'], 'LinkedIn')]), 'small'), Spacer(1, 7)]
story += [p(e(profile['pitch'])), p('Disponible immédiatement · Recherche un CDI Data Analyst / BI.', 'small')]
story.append(p('EXPÉRIENCE', 'section'))
for exp in career['experiences']:
    role = exp['role'].replace(' - projet de fin d’études', '')
    header = Table([[p(f'<b>{e(role)}</b>'), p(e(exp['period']), 'date')]], colWidths=[333, 160], hAlign='LEFT')
    header.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING',(0,0),(-1,-1),0), ('RIGHTPADDING',(0,0),(-1,-1),0), ('TOPPADDING',(0,0),(-1,-1),0), ('BOTTOMPADDING',(0,0),(-1,-1),0)]))
    entry = [header, p(e(exp['company'])+' · '+e(exp['contract']), 'small')]
    if exp.get('cvContext'):
        entry.append(p(e(exp['cvContext'])))
    entry += [p('• '+e(item)) for item in exp['bullets']]
    if exp.get('scopeNote'):
        entry.append(p(e(exp['scopeNote']), 'small'))
    story.append(KeepTogether(entry+[Spacer(1,6)]))
story.append(p('FORMATION', 'section'))
f = career['formation'][0]
story.append(p(f'<b>{e(f["school"])} · {e(f["year"])}</b> — {e(f["degree"])}'))
story.append(p('PROJETS DATA · CODE ET DÉMONSTRATIONS ACCESSIBLES', 'section'))
for project in career['cvProjects']:
    story.append(KeepTogether([p('<b>'+link(project['url'], project['name'])+'</b> · '+e(project['stack'])), p(e(project['text'])), Spacer(1,5)]))
story.append(p('COMPÉTENCES', 'section'))
for name, value in career['cvSkills']: story.append(p(f'<b>{e(name)}</b> : {e(value)}'))
output = ROOT / 'public/cv-jules-courne.pdf'
SimpleDocTemplate(str(output), pagesize=A4, leftMargin=45, rightMargin=45, topMargin=32, bottomMargin=30,
                  title='Jules Courné - Data Analyst / BI junior', author='Jules Courné').build(story)
print(output)
