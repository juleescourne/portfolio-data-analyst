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

                    "• Impact des adaptations : Une grande partie des livres les plus populaires ont bénéficié d'adaptations cinématographiques. Cette exposition médiatique amplifie fortement leur visibilité et leur volume de notes."
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
                    "• Dynamique sociale : Le nombre de notes est fortement corrélé au nombre de commentaires (0.87) : un livre gagne en popularité parce qu'il génère des discussions, illustrant un mécanisme de dynamique sociale proche des réseaux sociaux.",

                    "• Qualité vs Popularité : Ni le nombre de notes ni l'engagement ne sont corrélés à la note moyenne : des ouvrages polémiques peuvent être très visibles malgré une qualité perçue faible, tandis que des œuvres de grande qualité restent confidentielles (phénomène similaire à YouTube ou Netflix).",

                    "• Boucle de rétroaction : La popularité d'un livre n'est pas principalement guidée par sa qualité perçue, sa longueur ou son année de publication, mais par une boucle de rétroaction sociale : plus un livre suscite de réactions, plus il est visible, ce qui génère encore plus de réactions."
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

                    "• Pépites cachées : Les pépites cachées révèlent une lecture souvent choisie par le lecteur. Elles reflètent une adhésion sincère plutôt qu’un effet de médiatisation. Fort potentiel de croissance si elles bénéficiaient d’une meilleure exposition."
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
                    "• Auteurs de best sellers : Ces auteurs cumulent trois atouts simultanés - une base de fans très engagée, une forte présence médiatique/marketing, ET une qualité narrative validée par le grand public. Aucun auteur de niche ou expérimental n'apparaît dans ce classement, suggérant que l'excellence \"triple A\" nécessite un large consensus populaire plutôt qu'une reconnaissance critique élitiste.",

                    "• Auteurs à forte fidelisation mais faible rayonnement : Ces auteurs obtiennent d'excellentes notes et un engagement fort de leurs lecteurs, mais restent invisibles du grand public et des circuits marketing traditionnels. Ils prospèrent grâce au bouche-à-oreille, aux communautés en ligne spécialisées, et à la recommandation algorithmique plutôt qu'aux campagnes promotionnelles coûteuses.",

                    "• Auteurs \"Buzz Marketing\" : Ces auteurs bénéficient d'une forte visibilité (campagnes promotionnelles, présence médiatique, adaptations potentielles) qui crée des attentes élevées, mais la qualité perçue de leurs œuvres ne suit pas. Résultat : faible engagement des lecteurs (peu de recommandations, pas de réachat, communauté inexistante) malgré la notoriété du nom."
                ],
                position: { top: "28%", left: "50%", width: '40rem' }
            },
            {
                title: "Analyse des profils d'éditeurs",
                content: [
                    "• Editeurs à succès : Contrairement aux auteurs où la fiction commerciale domine, côté éditeurs, ce sont les producteurs de livres audio qui raflent tous les lauriers. Ils cumulent trois avantages décisifs : une audience ultra-engagée (l'audiobook crée une intimité forte), une visibilité maximale (croissance explosive du marché), et une qualité technique/narrative irréprochable (narration professionnelle, production soignée).",

                    "• Editeurs de niche premium :  Contrairement aux mastodontes, ces éditeurs choisissent délibérément la confidentialité pour maintenir leur niveau d'exigence. Ils misent sur le bouche-à-oreille, les prescripteurs qualifiés (bibliothécaires, enseignants, passionnés) et la recommandation organique plutôt que sur les campagnes publicitaires coûteuses.",

                    "• Editeurs \"grand public\" à faible satisfaction : Ces éditeurs bénéficient d'une visibilité maximale grâce à leurs réseaux de distribution puissants (grandes surfaces, chaînes, plateformes), mais leur stratégie de volume avant qualité se retourne contre eux. Résultat : notes médiocres, aucune fidélisation, et une réputation éditoriale dégradée malgré l'omniprésence en librairie."
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
                    "• Biais anglo-américain du catalogue Goodreads : 94,90% des livres anglophones viennent des États-Unis, ce qui reflète probablement un biais d'échantillonnage : les utilisateurs américains (qui dominent la plateforme) cataloguent massivement leurs lectures locales, créant une surreprésentation US.",

                    "• Le reste du monde littéraire est invisible : La plateforme souffre d'un désalignement massif entre sa base d'utilisateurs mondiale et son catalogue ultra-anglophone. Les lecteurs non-anglophones ou multilingues sont largement sous-servis.",

                    "• Distribution \"winner-takes-all\" révèle un effet réseau linguistique : Goodreads est devenu une plateforme d'agrégation anglophone avec quelques éditions traduites, plutôt qu'un vrai catalogue multilingue."
                ],
                position: { top: "30%", left: "2%", width: '40rem' }
            },
            {
                title: "Analyse des genres des livres",
                content: [
                    "• Top 4 genres = ~70% du catalogue : La structure de Goodreads favorise naturellement les catégories mainstream au détriment des niches, que ce soit en langue ou en genre. C'est un effet de réseau classique : plus un genre est populaire, plus il attire de catalogage, plus il devient visible.",

                    "• Absence visible de genres émergents ou numériques : Goodreads utilise probablement une taxonomie héritée des années 2000-2010, avant l'explosion de certains formats et audiences. La structure de catalogage n'a pas évolué avec les nouvelles habitudes de consommation."
                ],
                position: { top: "30%", left: "35%", width: '40rem' }
            },
            {
                title: "Analyse de la distribution des genres par variances et notes moyenne",
                content: [
                    "• Investir massivement dans le cluster \"Valeurs sûres\" : Ces genres ont un product-market fit validé à grande échelle : Audience massive, attentes prévisibles, taux de conversion élevé.",

                    "• Éviter les genres à haute variance : Audiences fragmentées = difficile à marketer.",

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

                    "• History & Politic et Mystery & Thriller sont groupés avec des volumes similaires mais des qualités légèrement différentes, suggérant des opportunités de consolidation marketing.",
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
    title: "Comment maximiser les ventes de Goodreads ?",
    subtitle: "Recommandations stratégiques basées sur l'analyse approfondie des données de la plateforme",
    summary: "L'analyse du dashboard révèle que la popularité d'un livre n'est pas guidée par sa qualité intrinsèque, mais par une boucle de rétroaction sociale. Les livres qui génèrent des discussions (commentaires) deviennent plus visibles, ce qui amplifie encore leur popularité. Cette dynamique crée une concentration extrême du succès sur quelques titres, laissant de nombreuses \"pépites cachées\" sous-exploitées.",
    items: [
        {
            icon: Lightbulb,
            title: "1. EXPLOITER LES PÉPITES CACHÉES",
            problem: "Des livres à forte satisfaction restent invisibles faute de masse critique initiale.",
            objective: "Déclencher la boucle de rétroaction sociale",
            actions: [
                "Programme \"Découvertes du mois\" : identifier les livres avec satisfaction élevée (>4.2/5) et faible visibilité.",
                "Créer une section \"Vous aimerez aussi ces livres moins connus\"",
                "Early access : Donner un accès anticipé à des membres sélectionnés pour nouveautés prometteuses"
            ]
        },
        {
            icon: Users,
            title: "2. VALORISER LES NICHES PERFORMANTES",
            problem: "Des communautés très engagées existent mais restent isolées.",
            objective: "Permettre aux utilisateurs de découvrir de nouvelles niches de qualité",
            actions: [
                "Création de \"hubs\" thématiques : Créer des pages dédiées, des événements.",
                "Algorithme de recommandation par niche : Recommander ces livres aux utilisateurs partageant des patterns de lecture similaires"
            ]
        },
        {
            icon: Film,
            title: "3. EXPLOITER L'EFFET \"ADAPTATION\"",
            problem: "Les adaptations cinématographiques amplifient massivement la visibilité.",
            objective: "Profiter de l'engouement massif dû à une adaptation cinématographique, théâtrale, ou autre.",
            actions: [
                "Veille des adaptations : Créer une section \"Prochaines adaptations\" 6-12 mois avant sortie",
                "Créer des packages : Promotion avant sortie d'une adaptation. Contenu exclusif",
                "Capitaliser sur les classiques adaptés : Rééditions spéciales lors de nouvelles adaptations"
            ]
        }
    ]
};

export const recommendationsAuthorPublisher = {
    title: "Comment maximiser les ventes de Goodreads ?",
    subtitle: "Recommandations stratégiques basées sur l'analyse approfondie des données de la plateforme",
    summary: "L'analyse révèle que le succès ne dépend pas uniquement de la qualité intrinsèque, mais d'une combinaison stratégique entre auteurs, éditeurs et dynamique sociale. La structure du marché montre une forte concentration côté éditeurs (14% de la production par 10 éditeurs) vs une longue traîne côté auteurs (5% seulement). Cette asymétrie crée des opportunités majeures pour valoriser les talents cachés et optimiser les partenariats éditoriaux.",
    items: [
        {
            icon: Target,
            title: "1. CIBLER LES AUTEURS & ÉDITEURS SOUS-VALORISÉS",
            problem: "Des auteurs à forte fidélisation et des éditeurs de niche premium restent invisibles malgré une qualité exceptionnelle.",
            objective: "Amplifier la visibilité des talents confidentiels à fort potentiel",
            actions: [
                "Programme \"Éditeurs d'excellence\" : Mettre en avant les petits catalogues ultra-sélectifs (variance faible, note >4) via des collections dédiées",
                "Badges \"Auteur culte\" : Identifier les auteurs à engagement fort et visibilité faible, et leur donner une exposition algorithmique prioritaire",
                "Partenariats ciblés : Créer des deals préférentiels avec éditeurs de niche (Atheneum, Bristol Classical Press) pour du contenu exclusif",
                "Section \"Découvertes éditoriales\" : Recommander les catalogues cohérents des éditeurs académiques/spécialisés aux lecteurs exigeants"
            ]
        },
        {
            icon: TrendingDown,
            title: "2. CONTRER LA DILUTION QUALITATIVE DES GROS CATALOGUES",
            problem: "Les éditeurs prolifiques bénéficient d'une visibilité maximale mais déçoivent généralement. Les auteurs sur-exposés créent du désengagement.",
            objective: "Réorienter l'attention vers la qualité plutôt que le volume",
            actions: [
                "Algorithme anti-saturation : Limiter la surexposition des auteurs/éditeurs prolifiques à faible satisfaction dans les recommandations",
                "Scoring éditorial composite : Pondérer les recommandations par (note moyenne × cohérence du catalogue) plutôt que par visibilité seule",
                "Alertes qualité : Signaler aux utilisateurs les livres d'éditeurs \"grand public\" avec historique de déception (ex: McGraw-Hill, Penguin Limited)"
            ]
        },
        {
            icon: GitBranch,
            title: "3. EXPLOITER LES PROFILS STRATÉGIQUES COMPLÉMENTAIRES",
            problem: "Les bestsellers captent l'attention mais les \"talents clivants\" (note élevée + forte variance) offrent un potentiel de différenciation inexploité.",
            objective: "Créer des parcours de découverte progressifs : du consensuel au clivant",
            actions: [
                "Funnel de recommandation : Bestsellers → Niches performantes → Talents clivants → Pépites cachées (parcours d'exploration guidé)",
                "Labels \"Audiobook Premium\" : Capitaliser sur la domination absolue des éditeurs audio (AudioGO, Brilliance) en créant des abonnements premium dédiés",
                "Section \"Lectures polarisantes\" : Valoriser les auteurs/livres à forte variance comme expériences distinctives pour lecteurs aventureux"
            ]
        }
    ]
};

export const recommendationsGenresLangues = {
    title: "Comment maximiser les ventes de Goodreads ?",
    subtitle: "Recommandations stratégiques basées sur l'analyse approfondie des données de la plateforme",
    summary: "L'analyse révèle une hyper-concentration linguistique (71% d'anglais) et générique (Top 4 genres = 70% du catalogue) créant une structure \"winner-takes-all\". Cette concentration masque des opportunités majeures dans les niches premium (Other × Japanese), les opportunités multilingues (Literature & Fiction), et l'exploitation de la saisonnalité (Q3 boost universel de +20-30%).",
    items: [
        {
            icon: Globe,
            title: "1. BRISER L'HÉGÉMONIE ANGLOPHONE PAR DES NICHES MULTILINGUES",
            problem: "94,90% des livres anglophones viennent des USA. Le reste du monde littéraire (99% de langues sous-représentées) reste invisible malgré une demande latente.",
            objective: "Désengager du biais anglo-américain et créer des ponts linguistiques rentables",
            actions: [
                "Programme \"Littérature mondiale\" : Identifier les best-sellers locaux (Japan, France, Germany) et créer des éditions traduites avec promotion ciblée",
                "Section \"Literature & Fiction × Multi Language\" : Capitaliser sur le genre phare (#1 en volume) en proposant les meilleurs titres traduits",
                "Partenariat avec éditeurs non-anglophones : Créer des deals avec éditeurs japonais (niche \"Other × Japanese\" = excellence + volume) pour exclusivités manga/light novels",
                "Algorithme de découverte linguistique : Recommander aux utilisateurs bilingues/multilingues des contenus hors-anglais alignés avec leurs préférences"
            ]
        },
        {
            icon: TrendingUp,
            title: "2. EXPLOITER LA SAISONNALITÉ ET LES \"VALEURS SÛRES\" GÉNÉRIQUES",
            problem: "La concentration sur Top 4 genres (70% du catalogue) crée une saturation concurrentielle. Q3 génère un boost universel de +20-30% inexploité. Q1 est une période creuse critique (-15 à -20%).",
            objective: "Maximiser les revenus via timing optimal et focus sur genres à faible variance",
            actions: [
                "Stratégie Q3 agressive : Lancer les nouveautés des \"valeurs sûres\" (Literature & Fiction, Science-Fiction & Fantasy, Mystery & Thriller) en juillet-août pour capitaliser sur le pic pré-fêtes",
                "Programme de liquidation Q1 : Créer des bundles promotionnels sur livres Q4 invendus pour déstocker et maintenir le cash-flow en période creuse",
                "Focus \"Philosophy & Religion\" Q2 : Exploiter l'anomalie saisonnière (faible volume = moins de concurrence) en lançant du contenu premium dans cette niche sous-servie",
                "Scoring prédictif genre × trimestre : Ajuster l'inventaire et les campagnes marketing selon les patterns saisonniers validés par l'analyse"
            ]
        },
        {
            icon: Target,
            title: "3. VALORISER LES OPPORTUNITÉS CROISÉES GENRE × LANGUE",
            problem: "Les combinaisons stratégiques (niches premium, équilibre volume/qualité, masse critique) restent sous-exploitées malgré leur potentiel validé.",
            objective: "Créer des segments rentables via ciblage multicritères",
            actions: [
                "Segment \"Self-help & Wellness × English\" : Forte demande (volume élevé pour une niche) mais légèrement sous-performant en qualité → Lancer une collection premium avec auteurs/éditeurs \"valeurs sûres\" pour élever la perception",
                "Segment \"Science-Fiction & Fantasy × English\" : Volume maximal (intérêt lecteur fort) mais concurrence intense → Différenciation via auteurs clivants (forte variance) et partenariats exclusifs avec éditeurs de niche",
                "Segment \"History & Politics\" + \"Mystery & Thriller\" : Volumes similaires, qualités légèrement différentes → Créer des bundles thématiques croisés (\"Thrillers historiques\", \"Politique noir\") pour consolidation marketing",
                "Test \"Other × Japanese\" : Niche d'excellence validée (qualité + volume) → Investissement prioritaire pour capter la croissance du marché manga/anime global"
            ]
        }
    ]
};