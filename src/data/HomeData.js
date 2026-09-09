export const projects = [
    {
        id: 'goodreads',
        title: 'Goodreads Analytics ETL & BI',
        description: 'Pipeline ETL Python automatisé transformant des données Goodreads en un modèle analytique en étoile, avec contrôles qualité, chargement incrémental et restitution BI.',
        image: 'goodreads.webp',
        tags: ['Python', 'SQL', 'ETL', 'SQLite', 'Star Schema', 'Power BI', 'Pytest'],
        github: 'https://github.com/juleescourne/goodreads-analytics-etl',
        demo: true,
        demoRoute: 'goodreads',
        highlights: [
            'Pipeline CSV → nettoyage → validation → modèle en étoile',
            'Chargement incrémental et sorties prêtes pour la BI',
            'Automatisation quotidienne et tests de la chaîne ETL',
            'Analyse exploratoire de 10K+ livres et 183M de notes agrégées'
        ]
    },
    {
        id: 'hospital',
        title: 'Hospital SQL Analytics',
        description: 'Étude analytique SQL sur des données hospitalières synthétiques : qualité des données, parcours patients, fenêtres analytiques et analyse financière.',
        image: 'health.webp',
        tags: ['SQL', 'MySQL', 'Window Functions', 'CTE', 'Data Quality', 'BI'],
        github: 'https://github.com/juleescourne/hospital-sql-analytics',
        demo: false,
        highlights: [
            'CTE, fonctions fenêtres, jointures et sous-requêtes',
            'Contrôles de qualité et d’intégrité référentielle',
            'Analyse des utilisations et retours à 30 jours',
            'Indicateurs financiers et couverture assurantielle'
        ]
    },
    {
        id: 'cutting-tools',
        title: 'Cutting Tool Decision Support',
        description: 'Application de décision sur données d’usinage combinant modélisation relationnelle, traitement Python, PCA et visualisations interactives.',
        image: 'machining.webp',
        tags: ['Python', 'MySQL', 'SQLAlchemy', 'PCA', 'Plotly', 'Data Modeling'],
        github: 'https://github.com/juleescourne/cutting-tool-recommender',
        demo: false,
        highlights: [
            'Modèle relationnel d’expériences industrielles',
            'Réduction dimensionnelle PCA après standardisation',
            'Visualisation interactive des expériences',
            'Logique de recommandation pour l’aide à la décision'
        ]
    },
    {
        id: 'churn',
        title: 'Customer Churn Prediction',
        description: 'Cas d’usage de classification orienté rétention client : préparation des données, feature engineering, XGBoost, choix de seuil et interprétation SHAP.',
        image: 'churn.webp',
        tags: ['Python', 'XGBoost', 'Classification', 'SHAP', 'Feature Engineering'],
        github: 'https://github.com/juleescourne/customer-churn-prediction',
        demo: true,
        demoRoute: 'churn',
        highlights: [
            'ROC-AUC ≈ 0,866',
            'Recall churn ≈ 90 % avec compromis de précision ≈ 36 %',
            'Analyse du seuil selon l’objectif de détection',
            'Démo d’inférence ONNX dans le navigateur'
        ]
    },
    {
        id: 'housing',
        title: 'California Housing Price Prediction',
        description: 'Projet de régression XGBoost avec exploration, feature engineering géographique, validation croisée et étude de la sélection de variables.',
        image: 'housing.webp',
        tags: ['Python', 'XGBoost', 'Regression', 'GeoPandas', 'Cross-validation'],
        github: 'https://github.com/juleescourne/california-housing-price-prediction',
        demo: true,
        demoRoute: 'housing',
        highlights: [
            'R² holdout exploratoire = 0,8338',
            'R² moyen en validation croisée = 0,8317',
            'RMSE ≈ 40 273 $',
            'Démo cartographique en score relatif, non en prix calibré'
        ]
    }
];

export const skills = {
    'Data & SQL': ['SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'Data Quality', 'Window Functions'],
    'Data Engineering': ['Python', 'Pandas', 'ETL / ELT', 'Data Validation', 'Data Warehousing', 'Star / Snowflake Schema'],
    'BI & Visualisation': ['Power BI', 'Power Query', 'Plotly', 'Matplotlib', 'Vega-Lite'],
    'Machine Learning': ['Scikit-learn', 'XGBoost', 'Classification', 'Regression', 'Clustering', 'PCA'],
    'Engineering': ['Git / GitHub', 'Docker', 'SQLAlchemy', 'Pytest', 'GitHub Actions'],
    'Langages': ['Python', 'SQL', 'Java'],
    'Langues': ['Français — natif', 'Anglais — B2']
};

export const focusData = [
    { label: 'Profil', value: 'Ingénieur Data' },
    { label: 'Cœur de stack', value: 'SQL + Python' },
    { label: 'Orientation', value: 'Data / BI' },
    { label: 'Localisation', value: 'Rouen' }
];

export const experiences = [
    {
        company: 'SOLUTEC',
        role: 'Data Analyst & Engineer',
        period: '2024',
        details: 'Cadrage des besoins, architecture de données, PostgreSQL, Docker et travail en méthodologie Agile.'
    },
    {
        company: 'Mécatek / CMS',
        role: 'Data Scientist / Analyst — Projet de fin d’études',
        period: '2023–2024',
        details: 'Analyse statistique multivariée sur 100K+ observations industrielles, modélisation prédictive et tableaux de bord KPI.'
    },
    {
        company: 'LIFAT',
        role: 'Data Scientist R&D — NLP',
        period: '2023',
        details: 'Pipeline NLP de fact-checking : transcription, extraction d’entités et recherche de similarité sur un corpus volumineux.'
    }
];
