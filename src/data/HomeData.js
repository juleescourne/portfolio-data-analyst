import career from './career.json';

export const { profile, experiences, formation, certifications } = career;

// Chiffres vérifiables, pas des adjectifs. Chacun est contrôlable dans le dépôt cité.
export const proofPoints = [
    { value: '678 013', label: 'contrats étudiés', context: 'assurance automobile' },
    { value: '1,85 M', label: 'fiches de livres contrôlées', context: 'catalogue Goodreads' },
    { value: '27 891', label: 'passages analysés', context: 'jeu public Maven · SQL' },
    { value: '12', label: 'entités modélisées', context: 'base d’usinage MySQL' },
];

export const projectThemes = [
    {
        id: 'analyses',
        title: 'Analyses métier & Power BI',
        description: 'Partir d’une question, contrôler les données et construire des indicateurs pour éclairer une décision.',
    },
    {
        id: 'modelisation',
        title: 'Modélisation & aide à la décision',
        description: 'Comparer des approches, évaluer les résultats et expliquer les limites des modèles.',
    },
    {
        id: 'applications',
        title: 'Applications & visualisation',
        description: 'Rendre les données explorables et traduire des règles métier en outils utilisables.',
    },
];

export const projects = [
    {
        id: 'assurance',
        theme: 'analyses',
        title: 'Assurance auto — comprendre les sinistres',
        role: 'Analyse métier · Python & Power BI',
        description:
            'Quels segments concentrent les sinistres, et lesquels ont une fréquence élevée ? ' +
            'Étude de 678 013 contrats : cadrage, contrôle des jointures, analyse globale et approfondissement des segments.',
        image: 'assurance.svg',
        imageFit: 'contain',
        imageAlt: 'Fréquence des sinistres : 8,96 pour la région R24 contre 10,07 pour le portefeuille, pour 100 années assurées.',
        tags: ['Python', 'Pandas', 'Qualité des données', 'Power BI', 'DAX'],
        github: 'https://github.com/juleescourne/assurance-auto-analytics',
        demo: true,
        demoRoute: 'assurance',
        demoLabel: 'Parcourir les dashboards',
        highlights: [
            'Fréquence rapportée à l’exposition, distincte du volume de sinistres',
            '26,76 % des contrats sinistrés sans montant retrouvé : limite explicitée',
            'Trois notebooks exécutés et décisions de qualité documentées',
            'Cinq pages Power BI : portefeuille, B12, R24, R11 et qualité',
        ],
    },
    {
        id: 'goodreads',
        theme: 'analyses',
        title: 'Goodreads — du catalogue à la sélection',
        role: 'Analyse métier · Python & Power BI',
        description:
            'Comment préparer une sélection de livres en français dans un catalogue imparfait ? ' +
            'Contrôle de 1,85 million de fiches, analyse des notes et proposition de 20 fiches à vérifier pour une librairie fictive.',
        image: 'goodreads-logo.svg',
        imageFit: 'contain',
        imageAlt: 'Logo Goodreads sur fond clair',
        tags: ['Python', 'Pandas', 'Qualité des données', 'Power BI', 'DAX'],
        github: 'https://github.com/juleescourne/goodreads-analytics-etl',
        demo: true,
        demoRoute: 'goodreads',
        demoLabel: 'Parcourir les dashboards',
        highlights: [
            '86,40 % de langues absentes : périmètre et biais documentés',
            '3 002 fiches candidates en français, puis contrôle des éditions',
            'Six listes recalculées : titres entrants, sortants et diversité',
            'Trois notebooks réexécutés et dix tests ciblés sur les règles',
        ],
    },
    {
        id: 'hospital',
        theme: 'analyses',
        title: 'Hospital SQL Analytics',
        role: 'Data Analyst / BI',
        description:
            'Analyse SQL du jeu public Maven / SyntheticMass : activité, couverture des montants, ' +
            'contrôles qualité et sensibilité aux durées extrêmes.',
        image: 'health.webp',
        tags: ['SQL', 'MySQL', 'Window Functions', 'CTE', 'Data Quality', 'Cohortes'],
        github: 'https://github.com/juleescourne/hospital-sql-analytics',
        demo: true,
        demoRoute: 'hospital',
        demoLabel: 'Explorer les résultats SQL',
        highlights: [
            'ROW_NUMBER, DENSE_RANK, NTILE, LAG/LEAD, cumuls et moyennes mobiles',
            '57 passages après décès signalés ; sensibilité des durées et tests SQL',
            'Taux de couverture pondéré, et non moyenne de ratios',
            '27 891 passages du jeu public Maven : résultats, CSV et requêtes consultables',
        ],
    },
    {
        id: 'cutting-tools',
        theme: 'modelisation',
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
        theme: 'modelisation',
        title: 'Prédiction de churn bancaire',
        role: 'Machine Learning appliqué',
        description:
            'Classification de la résiliation : comparaison à une baseline logistique, ' +
            'choix du seuil sur validation et mesure des fausses alertes sur test.',
        image: 'churn.webp',
        tags: ['Python', 'XGBoost', 'SHAP', 'ONNX', 'Feature Engineering'],
        github: 'https://github.com/juleescourne/customer-churn-prediction',
        demo: true,
        demoRoute: 'churn',
        demoLabel: 'Tester le modèle',
        highlights: [
            'Dix variables brutes ; identifiants et variables suspectes exclus',
            'Évaluation reproductible : baseline, validation du seuil et test séparé',
            'Seuil choisi selon un objectif de rappel sur validation',
            'Inférence ONNX dans le navigateur, contributions SHAP à l’appui',
        ],
    },
    {
        id: 'housing',
        theme: 'modelisation',
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
            'Évaluation séparée par blocs géographiques sur les données brutes',
            'Compromis nombre de variables / performance mesuré explicitement',
            'Biais de sélection et autocorrélation spatiale documentés',
        ],
    },
    {
        id: 'qvt',
        theme: 'applications',
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

// Chaque compétence renvoie à un projet consultable.
export const skills = [
    {
        category: 'Données & SQL',
        items: [
            { name: 'SQL analytique · MySQL', proof: 'hospital' },
            { name: 'CTE · fonctions fenêtres', proof: 'hospital' },
            { name: 'Modélisation relationnelle', proof: 'cutting-tools' },
            { name: 'Grain · jointures · contrôles', proof: 'assurance' },
        ],
    },
    {
        category: 'Python & qualité',
        items: [
            { name: 'pandas · NumPy', proof: 'goodreads' },
            { name: 'Nettoyage · rapprochement', proof: 'assurance' },
            { name: 'Notebooks reproductibles', proof: 'goodreads' },
            { name: 'SQLAlchemy', proof: 'cutting-tools' },
            { name: 'Git · GitHub Actions', proof: 'goodreads' },
        ],
    },
    {
        category: 'Analyse & restitution',
        items: [
            { name: 'Cadrage · définition de KPI', proof: 'assurance' },
            { name: 'Power BI · Power Query · DAX', proof: 'goodreads' },
            { name: 'Segmentation · Matplotlib', proof: 'assurance' },
            { name: 'Plotly', proof: 'cutting-tools' },
            { name: 'Vega-Lite', proof: 'qvt' },
        ],
    },
    {
        category: 'Modélisation',
        items: [
            { name: 'XGBoost', proof: 'churn' },
            { name: 'scikit-learn', proof: 'housing' },
            { name: 'ACP', proof: 'cutting-tools' },
            { name: 'Feature engineering', proof: 'housing' },
            { name: 'SHAP', proof: 'churn' },
        ],
    },
];

export const otherSkills = {
    'Langages': ['Python', 'SQL', 'JavaScript', 'Java'],
    'Langues': ['Français — langue maternelle', 'Anglais — B2'],
};

projects.push({
    id: 'bmx',
    theme: 'applications',
    title: 'BMX Competition Manager',
    role: 'Backend & algorithmique',
    image: 'lane-rotation.webp',
    imageAlt: 'Table de rotation des couloirs : carré latin 8 × 5',
    imageFit: 'contain',
    github: 'https://github.com/juleescourne/bmx-competition-manager',
    documentation: 'https://github.com/juleescourne/bmx-competition-manager/blob/main/ARCHITECTURE.md#3-algorithme-de-brassage-des-couloirs',
    description:
        'Application Flask de gestion de championnats BMX : inscription, génération des poules ' +
        'et phases finales, avec un algorithme de rotation pour équilibrer les couloirs de départ.',
    tags: ['Python', 'Flask', 'Modélisation relationnelle', 'Algorithmique'],
    highlights: [
        '17 entités pour représenter les règles de compétition',
        'Rotation 8 × 5 : chaque manche utilise les huit couloirs',
        'Aucun pilote ne reprend le même couloir sur les cinq manches',
        'Propriétés de répartition vérifiables par un script dédié',
    ],
});

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
            'Les dépôts documentent les sources, les contrôles et les commandes de lancement. Les études ' +
            'Assurance et Goodreads conservent les résultats des notebooks et les définitions des rapports Power BI.',
    },
    {
        icon: 'chart',
        title: 'Et surtout, ce que ça ne dit pas',
        text:
            'Chaque projet documente ses limites. Pour le churn, je distingue les départs détectés ' +
            'des départs évités : seule une campagne mesurée permettrait de démontrer la rétention.',
    },
];
