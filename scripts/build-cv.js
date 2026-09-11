/**
 * Génère le CV PDF servi par le portfolio.
 *
 * Le CV est composé en HTML, avec une feuille de style pensée pour l'impression,
 * puis rendu en PDF par Chromium. Une seule source de vérité, un rendu identique
 * à l'écran et sur papier.
 *
 *   node scripts/build-cv.js
 *
 * Sortie : public/cv-jules-courne.pdf
 *
 * ---------------------------------------------------------------------------
 * À COMPLÉTER — trois champs que je n'ai pas pu renseigner sans les inventer.
 * Remplissez-les ci-dessous puis relancez le script.
 * ---------------------------------------------------------------------------
 */

const FORMATION = {
  degree: "Diplôme d'ingénieur — Systèmes d'Information et Data",
  school: '',   // <-- nom de l'école
  year: '',     // <-- année d'obtention
};

// Type de contrat par expérience : « Stage 6 mois », « Alternance », « CDD »…
const CONTRATS = {
  SOLUTEC: '',
  'Mécatek / CMS': '',
  LIFAT: '',
};

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PROFILE = {
  name: 'Jules Courné',
  title: 'Data Analyst & Data Engineer',
  tagline: 'SQL · Python · ETL · Modélisation dimensionnelle · Power BI',
  pitch:
    "Ingénieur Data, je construis des chaînes de données fiables et des analyses sur lesquelles on " +
    "peut décider — de l'ingestion au tableau de bord. Je recherche un premier CDI en Data Analyst, " +
    'BI ou Data Engineering, à Rouen ou en Normandie.',
  email: 'jules.courne@gmail.com',
  phone: '07.60.06.65.26',
  location: 'Rouen, Normandie',
  github: 'github.com/juleescourne',
  linkedin: 'linkedin.com/in/jules-courné',
  portfolio: 'juleescourne.github.io/portfolio-data-analyst',
};

const EXPERIENCES = [
  {
    company: 'SOLUTEC',
    role: 'Data Analyst & Data Engineer',
    period: '2024',
    bullets: [
      'Cadrage des besoins métier et conception de l’architecture de données',
      'PostgreSQL, conteneurisation Docker, méthodologie Agile',
    ],
  },
  {
    company: 'Mécatek / CMS',
    role: 'Data Scientist — projet de fin d’études',
    period: '2023 – 2024',
    bullets: [
      'Analyse statistique multivariée sur plus de 100 000 observations industrielles',
      'Modélisation prédictive et tableaux de bord de pilotage',
    ],
  },
  {
    company: 'LIFAT — université de Tours',
    role: 'Data Scientist R&D — traitement du langage',
    period: '2023',
    bullets: [
      'Chaîne NLP de vérification de faits : transcription et extraction d’entités nommées',
      'Recherche de similarité sur un corpus volumineux',
    ],
  },
];

const PROJECTS = [
  {
    name: 'Goodreads Analytics ETL',
    stack: 'Python · SQL · SQLite · Pytest',
    bullets: [
      'Pipeline ETL vers un entrepôt en étoile : 6 dimensions, table de pont N-N, chargement incrémental par UPSERT',
      '278 tests automatisés exécutés en intégration continue ; exécutable après un clone grâce à un générateur de données',
    ],
  },
  {
    name: 'Hospital SQL Analytics',
    stack: 'MySQL · fonctions fenêtres · qualité des données',
    bullets: [
      'Étude sur 7 160 passages : cohortes de rétention, ROW_NUMBER, NTILE, cumuls et moyennes mobiles',
      '18 contrôles qualité, taux de couverture pondéré (et non moyenne de ratios)',
    ],
  },
  {
    name: 'Aide à la décision — usinage',
    stack: 'Python · MySQL · SQLAlchemy · ACP',
    bullets: [
      'Base à 12 entités ; recherche des essais les plus proches par ACP et distance pondérée par la variance expliquée',
      'Développé avec le département Génie mécanique de l’université de Tours',
    ],
  },
  {
    name: 'Prédiction de churn bancaire',
    stack: 'Python · XGBoost · SHAP · ONNX',
    bullets: [
      'Détection et exclusion d’une variable en fuite corrélée à 1,00 avec la cible',
      'ROC-AUC 0,866 ; seuil arbitré par le coût relatif d’un départ manqué ; inférence ONNX en navigateur',
    ],
  },
];

const SKILLS = [
  ['Données & SQL', 'SQL analytique, fonctions fenêtres, modélisation dimensionnelle et relationnelle, qualité des données, MySQL, SQLite, PostgreSQL'],
  ['Data Engineering', 'Pipelines ETL, chargement incrémental, validation Pydantic, pandas, NumPy, SQLAlchemy, Pytest, GitHub Actions, Docker'],
  ['Analyse & BI', 'Power BI, conception de KPI, Plotly, Vega-Lite, Matplotlib'],
  ['Machine Learning', 'XGBoost, scikit-learn, ACP, K-means, feature engineering, SHAP'],
  ['Langages', 'Python, SQL, JavaScript, Java'],
  ['Langues', 'Français (langue maternelle), Anglais (B2)'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap">
<style>
  @page { size: A4; margin: 13mm 14mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: "IBM Plex Sans", sans-serif; font-size: 9.4pt;
    line-height: 1.42; color: #141a19; -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  a { color: #0d5e63; text-decoration: none; }
  h1 { font-family: Newsreader, serif; font-size: 23pt; margin: 0 0 2pt; font-weight: 600; letter-spacing: -.01em; }
  .role { font-size: 11.5pt; color: #0d5e63; font-weight: 600; margin: 0 0 5pt; }
  .tagline { font-family: "IBM Plex Mono", monospace; font-size: 8pt; color: #626d6a; margin: 0 0 8pt; }
  header { border-bottom: 1.3pt solid #141a19; padding-bottom: 8pt; margin-bottom: 10pt; }
  .contact { display: flex; flex-wrap: wrap; gap: 3pt 13pt; font-size: 8.4pt; color: #3b4644; }
  .contact span::before { content: ""; }
  .pitch { margin: 0 0 11pt; color: #3b4644; }
  h2 {
    font-family: "IBM Plex Mono", monospace; font-size: 8pt; text-transform: uppercase;
    letter-spacing: .13em; color: #0d5e63; margin: 0 0 6pt; padding-bottom: 3pt;
    border-bottom: .6pt solid #dde3dd; font-weight: 500;
  }
  section { margin-bottom: 11pt; }
  .entry { margin-bottom: 8pt; }
  .entry:last-child { margin-bottom: 0; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
  .entry-role { font-weight: 600; font-size: 10pt; }
  .entry-org { color: #3b4644; font-size: 9.2pt; }
  .entry-period { font-family: "IBM Plex Mono", monospace; font-size: 8pt; color: #626d6a; white-space: nowrap; }
  .badge {
    font-family: "IBM Plex Mono", monospace; font-size: 7pt; text-transform: uppercase;
    letter-spacing: .06em; color: #0d5e63; background: #e2eeed; padding: 1pt 4pt;
    border-radius: 2pt; margin-left: 5pt;
  }
  ul { margin: 2pt 0 0; padding-left: 11pt; }
  li { margin-bottom: 1.5pt; color: #3b4644; }
  li::marker { color: #9aa5a2; }
  .proj-stack {
    font-family: "IBM Plex Mono", monospace; font-size: 7.8pt; color: #626d6a;
    text-align: right; max-width: 46%;
  }
  .skill-row { display: flex; gap: 8pt; margin-bottom: 3.5pt; }
  .skill-cat { font-weight: 600; min-width: 88pt; flex-shrink: 0; }
  .skill-val { color: #3b4644; }
  footer { margin-top: 10pt; padding-top: 6pt; border-top: .6pt solid #dde3dd;
           font-family: "IBM Plex Mono", monospace; font-size: 7.4pt; color: #626d6a; }
</style></head>
<body>
  <header>
    <h1>${esc(PROFILE.name)}</h1>
    <p class="role">${esc(PROFILE.title)}</p>
    <p class="tagline">${esc(PROFILE.tagline)}</p>
    <div class="contact">
      <span>${esc(PROFILE.email)}</span>
      <span>${esc(PROFILE.phone)}</span>
      <span>${esc(PROFILE.location)}</span>
      <span>${esc(PROFILE.portfolio)}</span>
      <span>${esc(PROFILE.github)}</span>
      <span>${esc(PROFILE.linkedin)}</span>
    </div>
  </header>

  <p class="pitch">${esc(PROFILE.pitch)}</p>

  <section>
    <h2>Expérience</h2>
    ${EXPERIENCES.map((e) => `
      <div class="entry">
        <div class="entry-head">
          <div>
            <span class="entry-role">${esc(e.role)}</span>${
              CONTRATS[e.company] ? `<span class="badge">${esc(CONTRATS[e.company])}</span>` : ''
            }
            <div class="entry-org">${esc(e.company)}</div>
          </div>
          <span class="entry-period">${esc(e.period)}</span>
        </div>
        <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>`).join('')}
  </section>

  <section>
    <h2>Projets</h2>
    ${PROJECTS.map((p) => `
      <div class="entry">
        <div class="entry-head">
          <span class="entry-role">${esc(p.name)}</span>
          <span class="proj-stack">${esc(p.stack)}</span>
        </div>
        <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>`).join('')}
  </section>

  <section>
    <h2>Compétences</h2>
    ${SKILLS.map(([cat, val]) => `
      <div class="skill-row"><span class="skill-cat">${esc(cat)}</span><span class="skill-val">${esc(val)}</span></div>`).join('')}
  </section>

  ${FORMATION.school ? `
  <section>
    <h2>Formation</h2>
    <div class="entry">
      <div class="entry-head">
        <div>
          <span class="entry-role">${esc(FORMATION.degree)}</span>
          <div class="entry-org">${esc(FORMATION.school)}</div>
        </div>
        <span class="entry-period">${esc(FORMATION.year)}</span>
      </div>
    </div>
  </section>` : `
  <section>
    <h2>Formation</h2>
    <div class="entry"><span class="entry-role">${esc(FORMATION.degree)}</span></div>
  </section>`}

  <footer>Projets et code source détaillés sur ${esc(PROFILE.portfolio)}</footer>
</body></html>`;

(async () => {
  if (!FORMATION.school) {
    console.warn('\n  Attention : FORMATION.school est vide.');
    console.warn('  Le CV est généré sans nom d\'école — un critère de tri primaire pour un premier CDI.');
    console.warn('  Renseignez-le en haut de ce fichier, puis relancez.\n');
  }

  const out = path.join(__dirname, '..', 'public', 'cv-jules-courne.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({ path: out, format: 'A4', printBackground: true });

  // --preview : image du rendu, pour contrôler la mise en page sans ouvrir le PDF.
  if (process.argv.includes('--preview')) {
    const preview = path.join(__dirname, '..', 'cv-preview.png');
    await page.setViewportSize({ width: 794, height: 1123 });  // A4 à 96 ppp
    await page.screenshot({ path: preview, fullPage: true });
    console.log(`Aperçu écrit : ${preview}`);
  }

  await browser.close();

  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`CV écrit : ${out} (${kb} Ko)`);
})().catch((error) => {
  console.error('Échec :', error.message);
  process.exit(1);
});
