// ---------------------------------------------------------------------------
// Contenu du portfolio.
//
// À COMPLÉTER par Jules — trois champs que je ne pouvais pas inventer :
//   1. formation[].school et formation[].year  : nom de l'école et année de diplôme.
//      C'est un critère de tri primaire pour un premier CDI. La section ne
//      s'affiche pas tant que `school` est vide.
//   2. experiences[].contract : « Stage », « Alternance », « CDD »… Un recruteur
//      qui ne sait pas lit une zone d'ombre.
//   3. experiences[].period   : préciser les mois, pas seulement l'année.
// ---------------------------------------------------------------------------

export const profile = {
    name: 'Jules Courné',
    title: 'Data Analyst & Data Engineer',
    eyebrow: 'Ingénieur Data — Rouen, Normandie',
    tagline: 'SQL · Python · ETL · Modélisation dimensionnelle · Power BI',
    pitch:
        "Je construis des chaînes de données fiables et des analyses sur lesquelles on peut décider — " +
        "de l'ingestion au tableau de bord.",
    availability: 'Disponible immédiatement',
    mobility: 'Rouen et agglomération · ouvert à la Normandie et à Paris un jour par semaine',
    seeking: 'Recherche un premier CDI en Data Analyst, BI ou Data Engineering.',
    email: 'jules.courne@gmail.com',
    phone: '07.60.06.65.26',
    phoneHref: 'tel:+33760066526',
    location: 'Rouen, Normandie',
    github: 'https://github.com/juleescourne',
    linkedin: 'https://www.linkedin.com/in/jules-courn%C3%A9/',
    cv: 'cv-jules-courne.pdf',
};

// Chiffres vérifiables, pas des adjectifs. Chacun est contrôlable dans le dépôt cité.
export const proofPoints = [
    { value: '278', label: 'tests automatisés', context: 'pipeline ETL Goodreads' },
    { value: '7 160', label: 'passages analysés en SQL', context: 'étude hospitalière' },
    { value: '12', label: 'entités modélisées', context: 'base d’usinage MySQL' },
    { value: '3', label: 'démos exécutables', context: 'dans le navigateur' },
];

export const projects = [
    {
        id: 'goodreads',
        title: 'Goodreads Analytics ETL',
        role: 'Data Engineering',
        description:
            'Pipeline ETL Python transformant un catalogue de livres en entrepôt analytique en étoile : ' +
            'nettoyage, validation Pydantic, chargement incrémental et enrichissement ACP.',
        image: 'goodreads.webp',
        tags: ['Python', 'SQL', 'ETL', 'SQLite', 'Star Schema', 'Power BI', 'Pytest'],
        github: 'https://github.com/juleescourne/goodreads-analytics-etl',
        demo: true,
        demoRoute: 'goodreads',
        demoLabel: 'Voir les tableaux de bord',
        highlights: [
            '278 tests automatisés, exécutés en intégration continue',
            'Schéma en étoile : 6 dimensions, table de pont pour la relation N-N',
            'Chargement incrémental par UPSERT, recalcul ACP conditionnel',
            'Exécutable en une minute grâce à un générateur de données',
        ],
    },
    {
        id: 'hospital',
        title: 'Hospital SQL Analytics',
        role: 'Data Analyst / BI',
        description:
            'Étude analytique SQL sur données hospitalières : contrôles qualité, parcours patients, ' +
            'retours à 30 jours et couverture assureur — avec les limites méthodologiques explicitées.',
        image: 'health.webp',
        tags: ['SQL', 'MySQL', 'Window Functions', 'CTE', 'Data Quality', 'Cohortes'],
        github: 'https://github.com/juleescourne/hospital-sql-analytics',
        demo: false,
        highlights: [
            'ROW_NUMBER, DENSE_RANK, NTILE, LAG/LEAD, cumuls et moyennes mobiles',
            '18 contrôles qualité, dont un que nulle clé étrangère ne peut faire',
            'Taux de couverture pondéré, et non moyenne de ratios',
            'Générateur de données : exécutable en 3 minutes avec Docker',
        ],
    },
    {
        id: 'cutting-tools',
        title: 'Aide à la décision — usinage',
        role: 'Data Engineering / Analyse',
        description:
            "Recherche des essais d'usinage les plus proches d'une configuration cible, par ACP sur " +
            'mesures physiques hétérogènes. Développé avec le département Génie mécanique de ' +
            "l'université de Tours.",
        image: 'machining.webp',
        tags: ['Python', 'MySQL', 'SQLAlchemy', 'ACP', 'Plotly', 'Modélisation'],
        github: 'https://github.com/juleescourne/cutting-tool-recommender',
        demo: true,
        demoRoute: 'cutting-tools',
        demoLabel: 'Ouvrir la démo interactive',
        highlights: [
            'Base MySQL à 12 entités : conditions, séries temporelles, résultats',
            'ACP ajustée sur l’historique seul, point cible seulement projeté',
            'Distance euclidienne pondérée par la variance expliquée',
            'Données synthétiques suivant Kienzle, Taylor et la rugosité théorique',
        ],
    },
    {
        id: 'churn',
        title: 'Prédiction de churn bancaire',
        role: 'Machine Learning appliqué',
        description:
            'Classification orientée rétention, dont le résultat principal est la détection ' +
            "d'une variable en fuite corrélée à 1,00 avec la cible — sans quoi le modèle prédisait le passé.",
        image: 'churn.webp',
        tags: ['Python', 'XGBoost', 'SHAP', 'ONNX', 'Feature Engineering'],
        github: 'https://github.com/juleescourne/customer-churn-prediction',
        demo: true,
        demoRoute: 'churn',
        demoLabel: 'Tester le modèle',
        highlights: [
            'Fuite de données détectée et retirée : toutes les métriques en sont abaissées',
            'ROC-AUC 0,866 — la seule métrique indépendante du seuil',
            'Seuil arbitré par le coût relatif d’un départ manqué',
            'Inférence ONNX dans le navigateur, contributions SHAP à l’appui',
        ],
    },
    {
        id: 'housing',
        title: 'California Housing — régression',
        role: 'Machine Learning appliqué',
        description:
            'Régression XGBoost centrée sur l’enrichissement géographique : distances de Haversine ' +
            'et score d’attractivité gravitaire multi-villes.',
        image: 'housing.webp',
        tags: ['Python', 'XGBoost', 'GeoPandas', 'Validation croisée'],
        github: 'https://github.com/juleescourne/california-housing-price-prediction',
        demo: true,
        demoRoute: 'housing',
        demoLabel: 'Explorer la carte',
        highlights: [
            'Score gravitaire : Σ (population / distance^α), pas une simple distance',
            'R² CV 0,8317 et R² holdout 0,8338 — un écart de 0,002',
            'Compromis nombre de variables / performance mesuré explicitement',
            'Biais de sélection et autocorrélation spatiale documentés',
        ],
    },
    {
        id: 'qvt',
        title: 'QVTi — enquêtes qualité de vie au travail',
        role: 'Visualisation de données',
        description:
            'Exploration d’enquêtes Likert entièrement côté client : distributions par question et ' +
            'encodage multidimensionnel par visages de Chernoff.',
        image: 'qvt.webp',
        tags: ['Vue 3', 'Vega-Lite', 'Pinia', 'CSV', 'Confidentialité'],
        github: 'https://github.com/juleescourne/qvt-analysis',
        demo: true,
        demoRoute: 'qvt',
        demoLabel: 'Lancer l’application',
        highlights: [
            'Traitement 100 % local : aucune réponse ne quitte le navigateur',
            'Parseur CSV maison : séparateur détecté hors guillemets, BOM, décimales',
            'Distributions complètes plutôt que moyennes, qui masquent la polarisation',
            'Jeux d’origine retirés pour risque de ré-identification',
        ],
    },
];

// Chaque compétence renvoie au projet qui la démontre. Rien n'est listé sans preuve.
export const skills = [
    {
        category: 'Données & SQL',
        items: [
            { name: 'SQL analytique', proof: 'hospital' },
            { name: 'Fonctions fenêtres', proof: 'hospital' },
            { name: 'Modélisation dimensionnelle', proof: 'goodreads' },
            { name: 'Modélisation relationnelle', proof: 'cutting-tools' },
            { name: 'Qualité des données', proof: 'goodreads' },
            { name: 'MySQL · SQLite', proof: 'hospital' },
        ],
    },
    {
        category: 'Data Engineering',
        items: [
            { name: 'Pipelines ETL', proof: 'goodreads' },
            { name: 'Chargement incrémental', proof: 'goodreads' },
            { name: 'Validation Pydantic', proof: 'goodreads' },
            { name: 'pandas · NumPy', proof: 'goodreads' },
            { name: 'SQLAlchemy', proof: 'cutting-tools' },
            { name: 'Pytest · GitHub Actions', proof: 'goodreads' },
        ],
    },
    {
        category: 'Analyse & restitution',
        items: [
            { name: 'Power BI', proof: 'goodreads' },
            { name: 'Conception de KPI', proof: 'hospital' },
            { name: 'Plotly', proof: 'cutting-tools' },
            { name: 'Vega-Lite', proof: 'qvt' },
            { name: 'Matplotlib', proof: 'housing' },
        ],
    },
    {
        category: 'Machine Learning',
        items: [
            { name: 'XGBoost', proof: 'churn' },
            { name: 'scikit-learn', proof: 'housing' },
            { name: 'ACP · K-means', proof: 'cutting-tools' },
            { name: 'Feature engineering', proof: 'housing' },
            { name: 'SHAP', proof: 'churn' },
        ],
    },
];

export const otherSkills = {
    'Langages': ['Python', 'SQL', 'JavaScript', 'Java'],
    'Langues': ['Français — langue maternelle', 'Anglais — B2'],
};

// Projet volontairement présenté à part : c'est du développement backend, pas de
// la Data. Le placer parmi les six cartes diluerait le positionnement. Mais son
// algorithme est le contenu le plus démontrable du portfolio, d'où cette place.
export const sideProject = {
    title: 'BMX Competition Manager',
    role: 'Backend & algorithmique',
    image: 'lane-rotation.webp',
    imageAlt: 'Table de brassage des couloirs — carré latin 8 × 5',
    github: 'https://github.com/juleescourne/bmx-competition-manager',
    documentation:
        'https://github.com/juleescourne/bmx-competition-manager/blob/main/ARCHITECTURE.md#3-algorithme-de-brassage-des-couloirs',
    description:
        'Application Flask de gestion de championnats BMX : 17 entités relationnelles, ' +
        'génération automatique des poules et des phases finales.',
    hook:
        'Le couloir de départ décide en partie du résultat : laisser un pilote au même ' +
        'couloir sur cinq manches fausserait le classement. La table de rotation est un ' +
        'carré latin 8 × 5 — chaque manche utilise les huit couloirs exactement une fois, ' +
        'aucun pilote n’en reprend un, et l’écart d’exposition aux couloirs intérieurs ' +
        'est d’un départ au maximum entre pilotes.',
    proof: 'Les trois propriétés se vérifient en une commande : python scripts/verify_lane_rotation.py',
};

export const experiences = [
    {
        company: 'SOLUTEC',
        role: 'Data Analyst & Data Engineer',
        period: '2024',
        contract: '', // À COMPLÉTER : Stage / Alternance / CDD, et la durée
        details:
            'Cadrage des besoins métier, architecture de données, PostgreSQL, conteneurisation Docker, ' +
            'travail en méthodologie Agile.',
    },
    {
        company: 'Mécatek / CMS',
        role: 'Data Scientist — projet de fin d’études',
        period: '2023 – 2024',
        contract: '',
        details:
            'Analyse statistique multivariée sur plus de 100 000 observations industrielles, ' +
            'modélisation prédictive et tableaux de bord de pilotage.',
    },
    {
        company: 'LIFAT — laboratoire d’informatique, université de Tours',
        role: 'Data Scientist R&D — traitement du langage',
        period: '2023',
        contract: '',
        details:
            'Chaîne NLP de vérification de faits : transcription, extraction d’entités nommées et ' +
            'recherche de similarité sur un corpus volumineux.',
    },
];

export const formation = [
    {
        degree: 'Diplôme d’ingénieur — Systèmes d’Information et Data',
        school: '', // À COMPLÉTER : nom de l'école
        year: '',   // À COMPLÉTER : année d'obtention
        details: '',
    },
];

export const about = [
    {
        icon: 'database',
        title: 'Des données dignes de confiance',
        text:
            'Ce qui m’intéresse n’est pas le modèle le plus sophistiqué, mais la chaîne qui rend un ' +
            'chiffre fiable : d’où viennent les données, ce qui a été nettoyé, ce qui a été validé.',
    },
    {
        icon: 'workflow',
        title: 'Des chaînes reproductibles',
        text:
            'Un traitement qui ne tourne que sur ma machine ne vaut rien. Mes projets s’exécutent après ' +
            'un clone, avec des données de démonstration et des tests.',
    },
    {
        icon: 'chart',
        title: 'Et surtout, ce que ça ne dit pas',
        text:
            'Chaque projet documente ses limites. Sur le churn, le résultat dont je suis le plus ' +
            'satisfait est d’avoir retiré une variable qui donnait 99 % de justesse et zéro valeur.',
    },
];
