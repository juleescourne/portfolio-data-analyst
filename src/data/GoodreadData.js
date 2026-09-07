import { Lightbulb, Users, Film, Target, Globe, TrendingUp, TrendingDown, GitBranch } from 'lucide-react';

export const dashboardImages = [
    {
        id: 1,
        title: "Dashboard 1 : Vue d'ensemble du dashboard d'analyse des livres",
        path: "dashboard.png",
        description: "Dashboard complet avec KPIs, distributions et top livres",
        insights: [
            {
                title: "Métriques clés",
                content: "• 10.55K livres analysés, 5.61M commentaires, 183M notes au total avec une note moyenne de 3.93/5",
                position: { top: "15%", left: "98%" }
            },
            {
                title: "Classement des livres les plus populaires",
                content: [
                    "• Concentration du succès : Les 10 livres les plus notés concentrent 13% de l'ensemble des notes. Le succès n'est pas distribué de manière uniforme : il est fortement concentré autour de quelques titres dominants, typique d'un effet boule de neige sur les plateformes culturelles.",

                    "• Valeur des classiques : La popularité des livres ne décroît pas nécessairement avec le temps. Des œuvres anciennes comme Of Mice and Men (1939) ou Romeo and Juliet (1597) restent parmi les titres les plus engageants, ce qui montre la valeur durable des classiques.",

                    "• Adaptations et popularité : plusieurs titres très notés ont aussi connu une adaptation. Cette association est intéressante à investiguer, mais le dataset ne permet pas d’attribuer causalement la visibilité à l’adaptation."
                ],
                position: { top: "15%", left: "2%", width: '40rem' }
            },
            {
                title: "Distribution par année de publication",
                content: "• Le volume de publications n’est pas stable dans le temps, ce qui peut biaiser toute analyse non normalisée par année. Les analyses temporelles saisonnière ou mensuels seraient plus juste.",
                position: { top: "30%", left: "36%" }
            },
            {
                title: "Distribution des notes moyenne",
                content: "• Distribution quasi normale. La note seule explique mal l’engagement ou le succès.",
                position: { top: "47%", left: "36%" }
            },
            {
                title: "Distribution du nombre de pages",
                content: "• La longueur des livres suit une distribution très asymétrique, avec une forte standardisation autour de 300 pages. Préférer la médiane à la moyenne pour les analyses sur le nombre de pages.",
                position: { top: "65%", left: "36%" }
            },
            {
                title: "Distribution du nombre de notes",
                content: "• Distribution typique d'un loi de puissance. Le nombre de notes est extrêmement concentré : quelques titres dominent largement l’attention des lecteurs.",
                position: { top: "83%", left: "36%" }
            },
            {
                title: "Analyse des corrélations entre variables clés",
                content: [
                    "• Engagement : le nombre de notes est fortement corrélé au nombre de commentaires (0,87). Cela décrit une association forte entre les deux signaux d’engagement, sans établir lequel cause l’autre.",

                    "• Qualité vs Popularité : Ni le nombre de notes ni l'engagement ne sont corrélés à la note moyenne : des ouvrages polémiques peuvent être très visibles malgré une qualité perçue faible, tandis que des œuvres de grande qualité restent confidentielles (phénomène similaire à YouTube ou Netflix).",

                    "• Hypothèse de boucle sociale : les variables de visibilité et d’engagement évoluent ensemble davantage que la note moyenne, la longueur ou l’année. Une expérimentation serait nécessaire pour tester un mécanisme causal de rétroaction."
                ],
                position: { top: "58%", left: "2%", width: '40rem' }
            },
            {
                title: "Analyse des profils de livres",
                content: [
                    "La performance d’un livre dépend davantage de l’alignement entre visibilité, engagement, qualité perçue et du décile du nombre de note que de la visibilité seule : ",

                    "• Livres de niches performantes : Les livres de niche présentent un excellent ratio engagement/visibilité, révélant des communautés très investies malgré une diffusion limitée.",

                    "• Livres sur-exposés : Certains livres bénéficient d’une sur-exposition médiatique sans générer un engagement proportionnel, suggérant un décalage entre visibilité et satisfaction.",

                    "• Livres survalorisés : Les œuvres du canon littéraire bénéficient d’une forte visibilité et génèrent beaucoup d’engagement, mais affichent des niveaux de satisfaction plus faibles que la moyenne. Un fort engagement peut refléter la controverse, la discussion ou la complexité, plutôt qu’une adhésion positive.",

                    "• Pépites cachées : certains titres combinent une bonne appréciation et une faible visibilité. Ils constituent des candidats intéressants pour tester l’effet d’une meilleure exposition."
                ],
                position: { top: "40%", left: "98%", width: '40rem' }
            },
        ]
    },
    {
        id: 2,
        title: "Dashboard 2 : Vue d'ensemble du dashboard d'analyse des auteurs et éditeurs",
        path: "dashboard2.png",
        description: "Dashboard complet avec KPIs",
        insights: [
            {
                title: "Métriques clés",
                content: "• 8612 auteurs analysés, 2156 éditeurs analysés, moyenne de 2 livres par auteur, moyenne de 5 livre par éditeur",
                position: { top: "15%", left: "2%" }
            },
            {
                title: "Analyse des auteurs les plus prolifiques",
                content: [
                    "• Faible concentration de la production : Les 10 auteurs les plus prolifiques ne représentent qu’environ 5 % du total des livres. La production éditoriale est largement distribuée entre un grand nombre d’auteurs, illustrant une structure en longue traîne plutôt qu’une domination par quelques acteurs.",

                    "• La prolificité dilue la qualité perçue : Le nombre de livres publiés n’est pas corrélé positivement à la note moyenne. Les auteurs les plus prolifiques affichent des notes plus stables mais rarement excellentes, suggérant une qualité perçue décroissante.",

                    "• La force de l’auteur-marque prime sur le volume : Les auteurs avec une identité narrative forte ou un statut canonique obtiennent les meilleures notes malgré un catalogue plus restreint. La cohérence stylistique et la réputation génèrent une appréciation durable et homogène."
                ],
                position: { top: "30%", left: "2%", width: '40rem' }
            },
            {
                title: "Analyse des éditeurs les plus prolifiques",
                content: [
                    "• Concentration éditoriale marquée : Les 10 éditeurs les plus prolifiques concentrent plus de 14 % de la production totale, contre seulement 5 % pour les auteurs. Le marché est donc bien plus concentré du côté des éditeurs, reflétant une structuration industrielle autour de quelques grands catalogues dominants.",

                    "• Décorrélation volume–appréciation : Les éditeurs les plus prolifiques affichent des notes moyennes relativement stables mais non exceptionnelles. À l’inverse, certains éditeurs avec des catalogues plus restreints obtiennent des notes nettement plus élevées, suggérant une stratégie orientée qualité plutôt que quantité.",

                    "• Prime à la spécialisation éditoriale : Les éditeurs académiques ou spécialisés (Oxford University Press, Library of America, VIZ Media LLC) présentent des pics de notes moyennes. La cohérence éditoriale et le positionnement de niche favorisent une meilleure réception critique, malgré un volume de publications inférieur."
                ],
                position: { top: "65%", left: "2%", width: '40rem' }
            },
            {
                title: "Analyse des distributions d'auteurs selon leur consistence et note moyenne",
                content: [
                    "• La note moyenne mesure la performance, mais la variance révèle le risque et le potentiel : c’est la combinaison des deux qui permet de distinguer auteurs consensuels, talents clivants et valeurs sûres.",

                    "• Les “valeurs sûres” sont rares mais stratégiques : Le quadrant note élevée / faible variance contient relativement peu d’auteurs, mais ils représentent le profil le plus fiable. Ce sont des cibles idéales pour les recommandations.",

                    "• Les talents clivants concentrent le potentiel de découverte : Les auteurs avec note élevée mais forte variance génèrent des avis polarisés. Ils offrent un fort potentiel de différenciation et d’engagement, notamment pour des lecteurs en quête de nouveautés"
                ],
                position: { top: "72%", left: "50%", width: '40rem' }
            },
            {
                title: "Analyse des distributions d'éditeurs selon leur consistence et note moyenne",
                content: [
                    "• Forte concentration autour de la moyenne : La grande majorité des éditeurs se situent dans une zone centrale (note moyenne entre 3,5 et 4,5, variance faible à modérée). Cela suggère que la plupart des catalogues éditoriaux maintiennent une qualité relativement homogène et prévisible.",

                    "• L'excellence nécessite volume ET sélectivité : Les meilleurs éditeurs (note moyenne > 4) combinent deux profils : soit des petits catalogues ultra-sélectifs (points gris/beiges, variance très faible), soit des catalogues moyens à gros avec une variance maîtrisée. Les très gros éditeurs (rouge vif) peinent à atteindre ce niveau - la masse critique rend difficile le maintien d'une qualité homogène.",

                    "• La stratégie du \"petit catalogue d'exception\"  : Dans la zone d'excellence (droite, variance faible), on trouve majoritairement des petits éditeurs (points gris clairs). Leur modèle économique repose sur une curation extrême : peu de titres, mais une qualité remarquablement constante. C'est une niche viable face aux mastodontes."
                ],
                position: { top: "72%", left: "98%", width: '40rem' }
            },
            {
                title: "Analyse des profils d'auteurs",
                content: [
                    "• Auteurs très visibles : ce groupe combine un volume d’interactions élevé et de bonnes notes moyennes. Le dataset ne mesure pas directement la présence marketing, la taille d’une base de fans ou la qualité narrative.",

                    "• Auteurs bien notés mais moins visibles : certains auteurs ont une appréciation élevée malgré un volume d'interactions plus faible. La fidélisation et l'origine de leur audience ne sont pas observées dans ces données.",

                    "• Auteurs à visibilité élevée et note plus modérée : ce profil peut être décrit statistiquement, mais les causes possibles (marketing, notoriété, adaptations) ne sont pas observées dans le dataset."
                ],
                position: { top: "28%", left: "50%", width: '40rem' }
            },
            {
                title: "Analyse des profils d'éditeurs",
                content: [
                    "• Éditeurs audio : certains éditeurs audio apparaissent avec des niveaux d'engagement et de note élevés dans l'échantillon. Le dataset ne permet pas d'attribuer ce profil au format audio ou à la qualité de production.",

                    "• Éditeurs de niche : certains petits catalogues présentent des notes élevées et relativement stables. Leur stratégie commerciale ou leur mode d'acquisition n'est pas observé.",

                    "• Grands catalogues à note moyenne plus modérée : le volume publié et la note moyenne ne progressent pas ensemble dans cet échantillon. Cela ne permet pas de conclure sur la fidélisation, la réputation ou la stratégie de distribution."
                ],
                position: { top: "28%", left: "98%", width: '40rem' }
            },
        ]
    },
    {
        id: 3,
        title: "Dashboard 3 : Vue d'ensemble du dashboard d'analyse des genres et langues",
        path: "dashboard3.png",
        description: "Dashboard complet avec KPIs",
        insights: [
            {
                title: "Métriques clés",
                content: "• 25 langues analysés, 20 genres analysés, indicateur de concentration des langues 0.71, indicateur de concentration des genres 0.14, top genre \"Literature & Fiction\", top langue \"Anglais\"",
                position: { top: "15%", left: "2%" }
            },
            {
                title: "Analyse des languages des livres",
                content: [
                    "• Surreprésentation anglo-américaine : 94,90 % des livres anglophones de cet échantillon sont associés aux États-Unis. Cela peut refléter la collecte, le catalogue ou les usages ; le dataset seul ne permet pas d'en déterminer la cause.",

                    "• Langues minoritaires : elles sont peu représentées dans l'échantillon. On ne peut pas en déduire le niveau de service ou la demande des lecteurs sans données d'usage complémentaires.",

                    "• Distribution \"winner-takes-all\" révèle un effet réseau linguistique : Goodreads est devenu une plateforme d'agrégation anglophone avec quelques éditions traduites, plutôt qu'un vrai catalogue multilingue."
                ],
                position: { top: "30%", left: "2%", width: '40rem' }
            },
            {
                title: "Analyse des genres des livres",
                content: [
                    "• Top 4 genres ≈ 70 % du catalogue observé : la distribution est fortement concentrée, sans que le dataset permette d'identifier le mécanisme qui l'explique.",

                    "• Taxonomie : certains genres ou formats récents sont peu visibles dans cet échantillon. Il faudrait vérifier la taxonomie source avant d'interpréter ce constat."
                ],
                position: { top: "30%", left: "35%", width: '40rem' }
            },
            {
                title: "Analyse de la distribution des genres par variances et notes moyenne",
                content: [
                    "• Cluster à note élevée / variance faible : ces genres peuvent constituer un groupe candidat pour une expérimentation de recommandation, sans supposer un taux de conversion ou un product-market fit.",

                    "• Genres à variance élevée : ils peuvent refléter des préférences plus polarisées ; ce point mérite une segmentation plutôt qu'une exclusion a priori.",

                    "• Exploiter la \"longue traîne inversée\" : Concentrer sur le Top 5 genres = Loi de Pareto commerciale.",
                ],
                position: { top: "58%", left: "2%", width: '40rem' }
            },
            {
                title: "Analyse des genres par nombre de livre publié par trimestre (normalisé)",
                content: [
                    "• Q3 = Prépare la saison des fêtes avec boost universel de +20-30% sur tous les genres",

                    "• Q1 = Période creuse critique (-15 à -20%) = Opportunité de liquidation/désengorgement",

                    "• Anomalie \"Other\" Q2 = Signal de niche saisonnière sous-exploitée (+12% alors que tout est stable).",
                ],
                position: { top: "58%", left: "35%", width: '40rem' }
            },
            {
                title: "Analyse des opportunités croisées (Genres x Langues) pour les niches premiums",
                content: [
                    "• Self-help & Wellness x English : Niche légèrement moins bien noté que les autres (bien qu'au dessus de la moyenne). Cependant le fort volume pour une niche indique un intérêt du lecteur.",

                    "• Literature & Fiction x Multi Language : Literature & Fiction est le genre phare de la plateforme goodreads. Il peut être intérressant de proposer les meilleurs livres du genre dans différente langues.",

                    "• Other x Japanese : Une niche d'excellence. Allie qualité et volumne. Probablement des mangas ou autre genre atypique japonais qui connait un rayonnement culturel à travers le monde.",
                ],
                position: { top: "15%", left: "98%", width: '40rem' }
            },
            {
                title: "Analyse des opportunités croisées (Genres x Langues) avec équilibre volume / qualité",
                content: [
                    "• Les 3 combinaisons ont relativement la même qualité perçue et English domine pour les 3.",

                    "• Science-Fiction & Fantasy : Volume plus élevé ce qui indique un intérêt du lecteur mais plus de concurrence.",

                    "• Philosophy & Religion : Volume moins élevé que les autres genres, moins de livres disponible dans ce genre. Possibilité de prendre par à ce marché.",
                ],
                position: { top: "45%", left: "98%", width: '40rem' }
            },
            {
                title: "Analyse des opportunités croisées (Genres x Langues) pour les livres de masse",
                content: [
                    "• Literature & Fiction est LE genre phare de la plateforme. Notes proche de la moyenne pour un volume qui représente environ 30% des livres. C'est un genre populaire qui, si le contenu est bon, se vendera à coup sûr.",

                    "• History & Politics et Mystery & Thriller présentent des volumes proches et des notes légèrement différentes ; cette proximité peut servir de point de départ à une analyse segmentée.",
                ],
                position: { top: "73%", left: "98%", width: '40rem' }
            },
        ]
    },
];

export const kpiMetrics = [
    { label: "Livres analysés", value: "10,550" },
    { label: "Commentaires", value: "5.61M" },
    { label: "Notes totales", value: "183M" },
    { label: "Note moyenne", value: "3.93/5" }
];


export const goodreadsRecommendations = {
    title: "Hypothèses produit à tester — Livres",
    subtitle: "Pistes exploratoires issues des associations observées",
    summary: "Le catalogue présente une forte concentration des interactions sur quelques titres et une corrélation élevée entre nombre de notes et nombre de commentaires. Ces résultats décrivent des associations : ils ne permettent pas d'établir que la discussion cause la visibilité ni qu'une action donnée augmenterait les ventes.",
    items: [
        {
            icon: Lightbulb,
            title: "1. TESTER LA DÉCOUVERTE DE TITRES PEU VISIBLES",
            problem: "Certains titres combinent une bonne note moyenne avec un volume d'interactions relativement faible.",
            objective: "Mesurer si une exposition contrôlée augmente l'engagement sur ces titres.",
            actions: [
                "Construire une cohorte de titres à bonne appréciation et faible visibilité",
                "A/B tester une mise en avant limitée auprès de segments pertinents",
                "Mesurer clics, ajouts aux listes et interactions avant/après"
            ]
        },
        {
            icon: Users,
            title: "2. TESTER DES PARCOURS DE NICHE",
            problem: "Des groupes de livres présentent des profils d'engagement distincts malgré une audience plus réduite.",
            objective: "Vérifier si des recommandations thématiques améliorent la découverte sans dégrader la pertinence.",
            actions: [
                "Créer des collections thématiques basées sur des critères reproductibles",
                "Comparer recommandation globale vs recommandation par niche",
                "Suivre engagement, diversité consommée et taux de retour"
            ]
        },
        {
            icon: Film,
            title: "3. MESURER L'ASSOCIATION AVEC LES ADAPTATIONS",
            problem: "Plusieurs titres très visibles ont aussi fait l'objet d'adaptations, mais le dataset ne démontre aucun effet causal.",
            objective: "Quantifier l'évolution d'engagement autour des dates d'adaptation lorsque ces dates sont disponibles.",
            actions: [
                "Enrichir les données avec les dates d'annonce et de sortie",
                "Comparer des trajectoires avant/après avec un groupe témoin",
                "Éviter de conclure à un effet marketing sans contrôle temporel"
            ]
        }
    ]
};

export const recommendationsAuthorPublisher = {
    title: "Hypothèses produit à tester — Auteurs & éditeurs",
    subtitle: "Segmentation exploratoire, à valider par expérimentation",
    summary: "Les distributions montrent une production plus concentrée chez les éditeurs que chez les auteurs et des différences de note moyenne / variance selon les groupes. Ces profils peuvent guider des tests de recommandation, mais ne mesurent ni fidélisation réelle, ni réputation, ni rentabilité.",
    items: [
        {
            icon: Target,
            title: "1. TESTER LA MISE EN AVANT DE CATALOGUES COHÉRENTS",
            problem: "Certains petits catalogues présentent une note moyenne élevée et une variance relativement faible.",
            objective: "Tester si cette cohérence est utile pour la recommandation utilisateur.",
            actions: [
                "Construire un score transparent note moyenne + variance + volume minimal",
                "A/B tester une collection dédiée",
                "Mesurer engagement et diversité plutôt que supposer une valeur commerciale"
            ]
        },
        {
            icon: TrendingDown,
            title: "2. CONTRÔLER L'EFFET DU VOLUME",
            problem: "Le volume de publications n'est pas systématiquement associé à une meilleure note moyenne.",
            objective: "Évaluer si le volume apporte réellement un signal utile dans un système de recommandation.",
            actions: [
                "Comparer des modèles avec et sans variable de prolificité",
                "Contrôler le biais lié au nombre d'observations par auteur / éditeur",
                "Rapporter les intervalles d'incertitude sur les petits catalogues"
            ]
        },
        {
            icon: GitBranch,
            title: "3. TESTER DES PROFILS DE DÉCOUVERTE",
            problem: "La combinaison note moyenne / variance fait apparaître des profils consensuels ou plus polarisés.",
            objective: "Vérifier si ces profils améliorent la pertinence pour différents types de lecteurs.",
            actions: [
                "Créer des segments descriptifs sans les présenter comme des catégories universelles",
                "Tester leur usage comme feature de recommandation",
                "Évaluer précision, diversité et satisfaction utilisateur"
            ]
        }
    ]
};

export const recommendationsGenresLangues = {
    title: "Hypothèses produit à tester — Genres & langues",
    subtitle: "Pistes issues de la composition du dataset",
    summary: "Le jeu de données est très concentré sur l'anglais et sur quelques genres. Cette composition peut refléter autant les usages de la plateforme que des biais d'échantillonnage ; elle ne permet pas d'inférer une demande latente ou un potentiel de revenu.",
    items: [
        {
            icon: Globe,
            title: "1. MESURER LE BIAIS LINGUISTIQUE",
            problem: "L'anglais est fortement surreprésenté dans l'échantillon.",
            objective: "Distinguer biais de collecte, structure du catalogue et préférences réelles des utilisateurs.",
            actions: [
                "Comparer la distribution à une source externe de référence",
                "Analyser les taux d'engagement par langue à taille d'échantillon comparable",
                "Tester des recommandations multilingues sur des utilisateurs explicitement concernés"
            ]
        },
        {
            icon: TrendingUp,
            title: "2. VALIDER LES PATTERNS TEMPORELS",
            problem: "Des variations par trimestre apparaissent dans les agrégats exploratoires.",
            objective: "Vérifier qu'elles persistent après contrôle de l'année, du genre et du volume publié.",
            actions: [
                "Normaliser les métriques par volume disponible",
                "Comparer plusieurs années plutôt qu'un seul agrégat",
                "Tester la robustesse statistique avant toute décision de campagne"
            ]
        },
        {
            icon: Target,
            title: "3. EXPLORER GENRE × LANGUE",
            problem: "Certaines combinaisons genre × langue présentent des profils d'engagement différents dans l'échantillon.",
            objective: "Identifier des segments assez volumineux pour être testés proprement.",
            actions: [
                "Fixer un seuil minimum d'observations par segment",
                "Comparer des métriques normalisées et leurs incertitudes",
                "Transformer les segments prometteurs en hypothèses A/B testables"
            ]
        }
    ]
};
