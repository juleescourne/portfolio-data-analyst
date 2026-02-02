export const projects = [
    {
        id: 1,
        title: "Analyse des livres de la plateforme goodreadbooks",
        description: "Analyse approfondie des données de vente pour identifier les tendances et optimiser la stratégie marketing.",
        image: "goodreads.webp",
        tags: ["Python", "Pandas", "Matplotlib", "SQL", "Power BI", "Task Scheduler", "Power Query", "Excel", "DAX", "E-commerce"],
        github: "https://github.com/juleescourne/Goodreads_ETL",
        demo: true,
        highlights: [
            "Dataset nettoyé",
            "10,000+ livres analysés",
            "Corrélation sociale identifiée",
            "Dashboard interactif Power BI",
            "Pipeline ETL automatisé"
        ]
    },
    {
        id: 2,
        title: "Prédiction Prix Immobilier - Californie (1990)",
        description: "Prédiction du prix médian de l’immobilier par quartier à l’aide de modèles de régression machine learning.",
        image: "housing.jpg",
        tags: ["Python", "XGBoost", "Feature Engineering", "Matplotlib", "Seaborn", "GeoPandas", "Jupyter Notebook", "Real estate"],
        github: "https://github.com/juleescourne/California-Housing-Price",
        demo: true,
        highlights: [
            "R² = 0.834 (83.4% variance expliquée)",
            "RMSE = $40,273",
            "Feature Importance",
            "15 features optimisées (-59% vs modèle initial)",
            "Démo interactive Plotly"
        ]
    },
    {
        id: 3,
        title: "Prédiction de Churn Client",
        description: "Prédiction du churn client d’une banque à l’aide de modèles de classification en machine learning.",
        image: "churn.jfif",
        tags: ["Python", "XGBoost", "Feature Engineering", "Matplotlib", "Seaborn", "Jupyter Notebook", "SHAP", "Banking sector"],
        github: "https://github.com/juleescourne/Churn_analysis",
        demo: true,
        highlights: [
            "Recall 90%",
            "Précision 32% (choix métier)",
            "Feature importance",
            "Recommandations business",
            "Démo interactive SHAP"
        ]
    },
    {
        id: 4,
        title: "Meilleur choix d'un outil coupant",
        description: "Application dédiée à l’optimisation du choix des outils de coupe à partir de données issues d’expériences d’usinage.",
        image: "machining.webp",
        tags: ["Python", "TKinter", "Plotly", "MySQL", "Excel", "Pandas", "Scikit-learn", "Machining industry"],
        github: "https://github.com/juleescourne/Cutting-tools",
        demo: false,
        highlights: [
            "Nettoyage et intégration de plus de 100 expériences d’usinage",
            "Visualisation interactive en ACP (2D et 3D)",
            "Graphiques dynamiques avec application de fonctions mathématiques",
            "Calcul de transfert de forces complexe",
            "Décision d'un outil coupant optimal pour des conditions de coupe"
        ]
    }
];

export const skills = {
    "Langages": ["Python", "SQL", "DAX", "Java"],

    "Data Analysis & Processing": ["Pandas", "NumPy", "Power Query", "Excel", "ETL"],

    "Data Visualization": ["Power BI", "Matplotlib", "Seaborn", "Plotly"],

    "Data Modeling & Warehousing": ["UML", "Star Schema", "Snowflake Schema"],

    "Machine Learning": ["Scikit-learn", "Regression", "Classification", "Clustering", "PCA"],

    "Databases": ["PostgreSQL", "MySQL", "SQLite"]
};

export const statsData = [
    { label: "Projets", value: "5+" },
    { label: "Technologies", value: "10+" },
    { label: "Ans d'expérience", value: "2" },
    { label: "Dashboards & notebook", value: "5+" }
];