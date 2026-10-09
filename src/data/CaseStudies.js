const assuranceRepo = 'https://github.com/juleescourne/assurance-auto-analytics';
const goodreadsRepo = 'https://github.com/juleescourne/goodreads-analytics-etl';

export const assuranceStudy = {
    title: 'Assurance auto — comprendre les sinistres',
    eyebrow: 'Étude de cas · assurance automobile',
    intro: 'Où se concentrent les sinistres automobiles ? Je pars des volumes, puis je les rapporte à la durée assurée pour identifier les groupes à examiner en priorité.',
    context: 'Mission fictive sur les données publiques freMTPL2. Je travaille au grain contrat pour les fréquences et au grain sinistre rapproché pour les coûts.',
    github: assuranceRepo,
    tags: ['Python', 'Pandas', 'Matplotlib', 'Power Query', 'Power BI', 'DAX'],
    metrics: [
        ['678 013', 'contrats conservés'],
        ['36 102', 'sinistres déclarés'],
        ['10,07', 'sinistres / 100 années assurées'],
        ['26,76 %', 'des contrats sinistrés sans montant retrouvé'],
    ],
    question: 'Où se concentrent les sinistres ?',
    questionDetail: 'Un segment peut avoir beaucoup de sinistres parce qu’il contient beaucoup de contrats. Je compare donc les volumes et une fréquence calculée sur la durée assurée, avant de croiser les caractéristiques des groupes repérés.',
    findings: [
        {
            title: 'Le volume ne suffit pas à classer les segments',
            text: 'R24 concentre 25,49 % des sinistres, avec une fréquence de 8,96 contre 10,07 pour le portefeuille. Pourtant, les véhicules de 1–2 ans avec un bonus-malus de 76–100 atteignent 16,96, contre 12,81 pour les mêmes tranches hors R24 : un sous-groupe à examiner malgré la moyenne régionale basse.',
        },
        {
            title: 'B12 : le signal persiste au-delà des expositions courtes',
            text: 'Parmi les véhicules codés 0 an exposés plus de six mois et jusqu’à un an, B12 atteint 21,33 sinistres pour 100 années assurées, contre 9,68 pour les autres marques. Le groupe compte 7 237 contrats, mais 75,15 % de ses contrats sinistrés n’ont aucun montant retrouvé : les périodes et les montants restent à vérifier.',
        },
        {
            title: 'R11 : préciser les profils concernés',
            text: 'À densité de 1 001 à 5 000 habitants/km² et bonus-malus de 51 à 75, la fréquence atteint 14,77 en R11, contre 12,26 pour les mêmes tranches ailleurs. Dans la tranche de densité suivante, les fréquences sont proches : 12,61 et 12,70. Le signal ne se généralise pas à tous les profils.',
        },
    ],
    steps: [
        ['Cadrer', 'Définir la question métier, les grains et les dénominateurs des KPI.'],
        ['Contrôler', 'Vérifier les clés, les valeurs manquantes et les écarts entre les deux sources.'],
        ['Analyser', 'Comparer les volumes et les fréquences, puis croiser les caractéristiques des groupes repérés.'],
        ['Restituer', 'Construire cinq pages Power BI : portefeuille, B12, R24, R11, puis qualité et suites proposées.'],
    ],
    figure: {
        src: 'assurance-frequence-regions.png',
        alt: 'Graphique du notebook : fréquence des sinistres par région, pour 100 années assurées.',
        caption: 'Graphique issu de l’analyse globale. Le filtre d’exposition sert uniquement à la lisibilité du graphique ; les contrats restent conservés dans les tableaux.',
        source: `${assuranceRepo}/blob/main/notebook/analyse_globale.ipynb`,
    },
    reportPages: [
        ['Vue d’ensemble', 'Lire les KPI, les volumes régionaux et les fréquences.'],
        ['B12 / véhicules de 0 an', 'Comparer les marques à âge codé et tranche d’exposition proches ; vérifier la couverture des montants.'],
        ['R24', 'Approfondir une région qui concentre un quart des sinistres malgré une fréquence globale sous la moyenne.'],
        ['R11', 'Croiser densité et bonus-malus pour préciser les profils dont la fréquence dépasse celle du comparateur.'],
        ['Qualité et limites', 'Suivre les montants manquants, les orphelins et l’influence des gros sinistres.'],
    ],
    reportPath: `${assuranceRepo}/tree/main/powerbi`,
    reportCheckedAt: '9 octobre 2026',
    reportStatus: 'Les cinq pages du PDF fourni le 9 octobre 2026 sont consultables dans le parcours guidé. Cet export atteste du rendu présenté ; il ne remplace pas les contrôles d’actualisation et des mesures dans Power BI Desktop.',
    limits: 'Analyse descriptive : sans primes, frais ni dates exploitables, je ne conclus ni sur la rentabilité, ni sur une évolution mensuelle, ni sur une causalité. La fréquence est un nombre de sinistres pour 100 années assurées, pas un pourcentage de contrats.',
    recommendation: 'Fiabiliser les données et leur rapprochement, puis vérifier les périodes et les montants de B12, examiner les sinistres du sous-groupe R24 et approfondir le profil densité / bonus-malus repéré en R11. Les montants inconnus restent manquants et les six contrats orphelins sont suivis à part. Aucune recommandation tarifaire n’est tirée de ces seules données.',
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
            text: 'Le catalogue compte 16 327 fiches explicitement en français. Les critères retiennent 3 002 candidates, puis 2 716 groupes titre/auteur. La variante plafonnée à deux fiches par libellé auteur passe de 12 à 16 auteurs, avec quatre remplacements. Les éditions, séries et disponibilités restent à vérifier.',
        },
        {
            title: 'Mesurer la sensibilité des choix',
            text: 'À note au moins égale à 4, passer de 100 à 500 notations réduit les candidats de 3 002 à 2 409. Les listes recalculées remplacent cinq fiches sur vingt et permettent de consulter leurs remplaçantes. Les seuils sont des choix de travail, pas une sélection optimale démontrée.',
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
    reportCheckedAt: '9 octobre 2026',
    reportStatus: 'Évolution du 9 octobre : cinq tables, 34 mesures, six listes recalculées. Les trois notebooks et les contrôles des exports passent, ainsi que dix tests ciblés. Les vérifications historiques du moteur DAX concernent la version précédente ; cette évolution reste à actualiser et à vérifier dans Desktop.',
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
