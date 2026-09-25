import career from './career.json';

export const { profile, experiences, formation, certifications } = career;

// Chiffres vérifiables, pas des adjectifs. Chacun est contrôlable dans le dépôt cité.
export const proofPoints = [
    { value: 'ETL', label: 'testé de bout en bout', context: 'pipeline ETL Goodreads' },
    { value: '7 160', label: 'passages synthétiques', context: 'étude hospitalière' },
    { value: '12', label: 'entités modélisées', context: 'base d’usinage MySQL' },
    { value: '5', label: 'démos exécutables', context: 'dans le navigateur' },
];

export const projects = [
    {
        id: 'goodreads',
        title: 'Goodreads Analytics ETL',
        role: 'Data Engineering',
        description:
            'Projet personnel réalisé pendant mon intercontrat chez SOLUTEC. Pipeline ETL Python transformant un catalogue de livres en entrepôt analytique en étoile : ' +
            'nettoyage, validation Pydantic, chargement incrémental et enrichissement ACP.',
        image: 'goodreads.webp',
        tags: ['Python', 'SQL', 'ETL', 'SQLite', 'Star Schema', 'Power BI', 'Pytest'],
        github: 'https://github.com/juleescourne/goodreads-analytics-etl',
        demo: true,
        demoRoute: 'goodreads',
        demoLabel: 'Voir les tableaux de bord',
        highlights: [
            'Tests automatisés : rechargement, mise à jour et annulation sur échec ACP',
            'Schéma en étoile : 6 dimensions, table de pont pour la relation N-N',
            'Chargement incrémental par UPSERT, recalcul ACP conditionnel',
            'Générateur synthétique et test de la chaîne complète, ACP comprise',
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
            'Générateur synthétique, contrôles qualité et résultats MySQL vérifiés',
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
            'Les dépôts documentent les prérequis et commandes de lancement. Les projets ETL et SQL proposent ' +
            'des données synthétiques ; les études ML indiquent la source à télécharger.',
    },
    {
        icon: 'chart',
        title: 'Et surtout, ce que ça ne dit pas',
        text:
            'Chaque projet documente ses limites. Pour le churn, je distingue les départs détectés ' +
            'des départs évités : seule une campagne mesurée permettrait de démontrer la rétention.',
    },
];
