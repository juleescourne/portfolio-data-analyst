export const goodreadsSteps = [
    {
        id: 'catalogue', label: 'Comprendre le catalogue', image: '01-catalogue',
        title: 'Définir un périmètre exploitable avant de classer les livres',
        highlight: '86,4 % de langues absentes : la couverture du catalogue limite l’analyse',
        observation: 'Le catalogue contient 1 850 032 fiches. La note moyenne exploitable est de 3,83 / 5, mais le nombre médian de notations est seulement de 5. La langue française est renseignée sur 16 327 fiches.',
        interpretation: 'Une bonne note peut reposer sur peu de notations. La langue manquante empêche aussi de déduire la place réelle du français dans le catalogue ou sur le marché.',
        next: 'Partir des fiches explicitement en français, puis combiner note, volume de notations et présence des métadonnées nécessaires à une sélection éditoriale.',
        note: 'Une ligne représente une fiche Goodreads, éventuellement une édition. Les graphiques de volumes utilisent une échelle logarithmique. La carte « 2M » arrondit les 1 850 032 fiches ; elle ne compte pas des œuvres uniques.',
    },
    {
        id: 'selection', label: 'Préparer la sélection', image: '02-selection',
        title: 'Passer de 3 002 fiches candidates à 20 propositions à relire',
        highlight: 'Plafonner à deux fiches par auteur fait passer la liste de 12 à 16 libellés auteur',
        observation: 'Les critères retiennent 3 002 fiches, soit 2 716 groupes titre/auteur. Au seuil de 100 notations, la liste initiale compte jusqu’à six fiches du même auteur ; la proposition plafonnée en compte au maximum deux.',
        interpretation: 'Le plafond diversifie les auteurs avec quatre remplacements sur vingt. Relever le seuil de notations à 500 ou 1 000 conserve quinze fiches sur vingt par rapport au seuil 100 de la même règle.',
        next: 'Proposer la variante à 100 notations et deux fiches maximum par libellé auteur, puis vérifier les séries, coffrets, éditions et disponibilités avant toute mise en avant.',
        note: 'Les menus réduisent la liste sans recalculer son classement ; les six scénarios restent fixes. La capture montre une partie des tableaux défilants : les 20 propositions et les six listes complètes sont téléchargeables en CSV ci-dessous.',
    },
    {
        id: 'qualite', label: 'Qualité & suites', image: '03-qualite',
        title: 'Rendre les limites visibles et prioriser les vérifications',
        highlight: '24,4 % des fiches sans notation : une absence ne devient pas une note inventée',
        observation: 'Le rapport signale 328 paginations supérieures à 5 000 et 18,9 % de fiches appartenant à un groupe titre/auteur répété. À l’import, 112 répétitions ont été retirées et 166 lignes isolées.',
        interpretation: 'Un titre/auteur répété peut correspondre à plusieurs éditions et ne constitue pas automatiquement une erreur. Les motifs de qualité se chevauchent : leurs taux ne doivent pas être additionnés.',
        next: 'Contrôler langue, ISBN, pagination et identité de l’œuvre sur les fiches retenues ; compléter avec le stock, les prix et des signaux récents du catalogue réel.',
        note: 'Le bilan d’import porte sur les 23 fichiers complets et reste indépendant des filtres. L’extraction date de décembre 2020 ; sans ventes ni exposition commerciale, aucun effet sur le chiffre d’affaires n’est démontré.',
    },
];
