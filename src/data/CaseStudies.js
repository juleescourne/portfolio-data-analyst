const assuranceRepo = 'https://github.com/juleescourne/assurance-auto-analytics';
const goodreadsRepo = 'https://github.com/juleescourne/goodreads-analytics-etl';

export const assuranceStudy = {
    title: 'Assurance auto — comprendre les sinistres',
    eyebrow: 'Étude de cas · assurance automobile',
    intro: 'Identifier les segments à examiner en priorité, en tenant compte du volume de contrats, de leur exposition et de la qualité des montants disponibles.',
    context: 'Mission fictive sur les données publiques freMTPL2. Je travaille au grain contrat pour les fréquences et au grain sinistre rapproché pour les coûts.',
    github: assuranceRepo,
    tags: ['Python', 'Pandas', 'Matplotlib', 'Power Query', 'Power BI', 'DAX'],
    metrics: [
        ['678 013', 'contrats conservés'],
        ['36 102', 'sinistres déclarés'],
        ['10,07', 'sinistres / 100 années assurées'],
        ['26,76 %', 'des contrats sinistrés sans montant retrouvé'],
    ],
    question: 'Où approfondir l’analyse du portefeuille ?',
    questionDetail: 'Un segment peut avoir beaucoup de sinistres parce qu’il contient beaucoup de contrats. Je compare donc les volumes et une fréquence calculée sur la durée assurée, avant de croiser les caractéristiques des groupes repérés.',
    findings: [
        {
            title: 'Le volume ne suffit pas à classer les segments',
            text: 'La région R24 concentre 25,49 % des sinistres déclarés, mais sa fréquence est de 8,96 pour 100 années assurées, contre 10,07 pour le portefeuille. Une forte contribution au total ne signifie pas une fréquence supérieure.',
        },
        {
            title: 'Un signal élevé appelle d’abord une vérification',
            text: 'Le groupe B12 / véhicule de 0 an regroupe 37 069 contrats et atteint une fréquence de 45,16 pour 100 années assurées. Pourtant, 87,10 % de ses contrats sinistrés n’ont aucun montant retrouvé. Je recommande de vérifier ce périmètre avant de conclure sur ses coûts.',
        },
        {
            title: 'Garder les écarts visibles',
            text: 'Six contrats présents dans la table des montants sont absents de la table de fréquence : 195 lignes et 788 714,18 € sont suivies séparément. Un montant non retrouvé reste inconnu ; le remplacer par zéro fausserait la lecture des coûts.',
        },
    ],
    steps: [
        ['Cadrer', 'Définir la question métier, les grains et les dénominateurs des KPI.'],
        ['Contrôler', 'Vérifier les clés, les valeurs manquantes et les écarts entre les deux sources.'],
        ['Analyser', 'Comparer les segments, puis approfondir les groupes avec du volume et une fréquence élevée.'],
        ['Restituer', 'Exporter les tables contrôlées et préparer trois pages Power BI avec les limites visibles.'],
    ],
    figure: {
        src: 'assurance-frequence-regions.png',
        alt: 'Graphique du notebook : fréquence des sinistres par région, pour 100 années assurées.',
        caption: 'Graphique issu de l’analyse globale. Le filtre d’exposition sert uniquement à la lisibilité du graphique ; les contrats restent conservés dans les tableaux.',
        source: `${assuranceRepo}/blob/main/notebook/analyse_globale.ipynb`,
    },
    reportPages: [
        ['Vue d’ensemble', 'Lire les KPI, les volumes régionaux et les fréquences.'],
        ['Comprendre les segments', 'Croiser marque et âge du véhicule, âge du conducteur et bonus-malus.'],
        ['Qualité et limites', 'Suivre les montants manquants, les orphelins et l’influence des gros sinistres.'],
    ],
    reportPath: `${assuranceRepo}/tree/main/powerbi`,
    reportStatus: 'Les notebooks et les exports ont été exécutés et contrôlés. Les définitions du rapport et les références aux champs ont été vérifiées. L’actualisation, les mesures DAX et le rendu restent à confirmer dans Power BI Desktop.',
    limits: 'Analyse descriptive : sans primes, frais ni dates exploitables, je ne conclus ni sur la rentabilité, ni sur une évolution mensuelle, ni sur une causalité. La fréquence est un nombre de sinistres pour 100 années assurées, pas un pourcentage de contrats.',
    recommendation: 'Vérifier les écarts de couverture sur les segments signalés, puis discuter des investigations prioritaires avec le métier. Aucune recommandation tarifaire n’est tirée de ces seules données.',
    resources: [
        ['Cadrage', `${assuranceRepo}/blob/main/docs/Cadrage.md`],
        ['Contrôles qualité', `${assuranceRepo}/blob/main/docs/Qualité.md`],
        ['Synthèse des analyses', `${assuranceRepo}/blob/main/docs/Analyse.md`],
        ['Notebooks exécutés', `${assuranceRepo}/tree/main/notebook`],
    ],
    source: ['freMTPL2 · OpenML, versions 1 · sources et licences', `${assuranceRepo}/blob/main/data/SOURCES.md`],
};

export const goodreadsStudy = {
    title: 'Goodreads — du catalogue à la sélection',
    eyebrow: 'Étude de cas · découverte de livres',
    intro: 'Préparer une sélection de livres en français à partir d’un catalogue imparfait, en tenant compte de la qualité des fiches et du nombre de notations.',
    context: 'Mission pour la librairie fictive Lire & Choisir. L’étude porte sur les 23 fichiers de livres du dataset Kaggle, version 18 de décembre 2020. Une fiche peut décrire une édition ; elle ne représente pas une vente.',
    github: goodreadsRepo,
    tags: ['Python', 'Pandas', 'Matplotlib', 'Power Query', 'Power BI', 'DAX'],
    metrics: [
        ['1 850 032', 'fiches conservées après contrôle'],
        ['86,40 %', 'de langues absentes'],
        ['3 002', 'fiches candidates en français'],
        ['20', 'fiches proposées à vérifier'],
    ],
    question: 'Quels livres proposer à une équipe éditoriale ?',
    questionDetail: 'Trier uniquement la note moyenne favorise des scores parfois fondés sur très peu d’avis. Je combine langue renseignée, note et volume de notations, puis rapproche les titres et les auteurs pour limiter les répétitions d’éditions.',
    findings: [
        {
            title: 'Contrôler avant de sélectionner',
            text: 'Sur 1 850 310 lignes, 112 répétitions sont retirées et 166 versions contradictoires isolées. La médiane n’est que de cinq notations par fiche : les scores doivent se lire avec leur volume.',
        },
        {
            title: 'Construire une liste de travail explicable',
            text: 'Le catalogue compte 16 327 fiches explicitement en français. Les critères retiennent 3 002 candidates, puis 2 716 groupes titre/auteur. Les 20 fiches proposées demandent encore une vérification des éditions, des séries et de la disponibilité.',
        },
        {
            title: 'Mesurer la sensibilité des choix',
            text: 'À note au moins égale à 4, passer de 100 à 500 notations réduit les candidats de 3 002 à 2 409. Cinq fiches de la première liste de 20 seraient concernées. Les seuils sont des choix de travail, pas une sélection optimale démontrée.',
        },
    ],
    steps: [
        ['Cadrer', 'Formuler la décision, définir le grain fiche et les données nécessaires.'],
        ['Contrôler', 'Repérer les répétitions, les conflits, les manquants et les valeurs invalides.'],
        ['Analyser', 'Décrire le catalogue puis tester les critères de la sélection en français.'],
        ['Restituer', 'Documenter les 20 fiches et présenter le catalogue, la sélection et la qualité dans Power BI.'],
    ],
    figure: {
        src: 'goodreads-selection-francais.png',
        alt: 'Étapes de sélection : français renseigné, note exploitable, note au moins égale à 4, au moins 100 notations et métadonnées utiles présentes.',
        caption: 'Figure issue de l’analyse approfondie sur le dataset Kaggle. Les étapes décrivent la constitution de la liste, sans mesurer un résultat commercial.',
        source: `${goodreadsRepo}/blob/main/notebooks/03_analyse_approfondie.ipynb`,
    },
    reportPages: [
        ['Comprendre le catalogue', 'KPI, langues et volume de notations.'],
        ['Sélection en français', 'Critères, candidates et liste des 20 fiches.'],
        ['Qualité des données', 'Défauts du catalogue filtré et bilan fixe de l’import.'],
    ],
    reportPath: `${goodreadsRepo}/tree/main/powerbi`,
    reportStatus: 'Les trois tables ont été actualisées dans le moteur de Power BI Desktop. Les 33 mesures DAX ont été comparées à Pandas dans six contextes : 198 comparaisons concordantes. Le rendu et les interactions des pages restent à vérifier manuellement dans Desktop.',
    limits: 'Photographie de 2020 : ni ventes, ni stock, ni prix, ni historique daté des notations, ni genres dans les fichiers étudiés. Les éditions ne sont pas additionnées pour annoncer des lecteurs uniques. Les résultats ne décrivent pas le marché actuel du livre.',
    recommendation: 'Faire relire les 20 fiches, vérifier la disponibilité dans le catalogue commercial, puis tester une petite mise en avant avec des indicateurs d’usage et de diversité. Aucun gain de ventes n’est revendiqué.',
    resources: [
        ['Sujet et cadrage', `${goodreadsRepo}/blob/main/docs/Cadrage.md`],
        ['Contrôles qualité', `${goodreadsRepo}/blob/main/docs/Qualité.md`],
        ['Synthèse des analyses', `${goodreadsRepo}/blob/main/docs/Analyse.md`],
        ['Notebooks exécutés', `${goodreadsRepo}/tree/main/notebooks`],
    ],
    source: ['Dataset Kaggle de Bahram Jannesar · version 18 · sources et fichiers', `${goodreadsRepo}/blob/main/data/README.md`],
};
