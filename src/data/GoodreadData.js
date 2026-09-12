import { Target, Users, Globe, GitBranch, TrendingUp, Lightbulb } from 'lucide-react';
export const dashboardImages = [
 {id:1,title:'Catalogue : volume, appréciation et concentration',path:'dashboard.webp',width:1600,height:1053,insights:[
  {title:'Définir le périmètre',content:'Les KPI de cette capture décrivent le catalogue historique analysé, pas le jeu synthétique interactif. Un enregistrement est un livre ou une édition du catalogue ; le nombre de notes est un volume cumulé d’avis. Il ne mesure ni les ventes, ni les impressions, ni des lecteurs uniques.'},
  {title:'Traiter les distributions asymétriques',content:'Comparer médiane et quantiles du nombre de pages ; utiliser une échelle logarithmique pour les volumes d’avis. Une longue traîne visible ne suffit pas à démontrer une loi de puissance. La concentration doit être quantifiée sur un périmètre explicite.'},
  {title:'Éviter les fausses conclusions temporelles',content:'L’année de publication est une caractéristique du titre ou de son édition. Elle ne donne pas la date des notes ni une trajectoire d’engagement. On ne peut donc pas en déduire une saisonnalité de la demande ou l’effet d’une adaptation.'}
 ]},
 {id:2,title:'Auteurs et éditeurs : contrôler les tailles de catalogue',path:'dashboard2.webp',width:1600,height:1053,insights:[
  {title:'Ne pas confondre dispersion et polarisation',content:'Une variance des notes moyennes entre livres décrit l’hétérogénéité d’un catalogue. Elle ne mesure pas le désaccord entre lecteurs sur un livre : il faudrait la distribution des notes individuelles pour cela.'},
  {title:'Stabiliser les comparaisons',content:'Afficher le nombre de titres et le volume d’avis avec chaque moyenne. Un auteur à un seul titre a une variance nulle par construction : ce n’est pas une preuve de régularité. Comparer des groupes de taille suffisante et tester la sensibilité au seuil retenu.'},
  {title:'Respecter le grain des tables',content:'Un livre peut avoir plusieurs auteurs. La table de liaison livre–auteur ne doit pas multiplier les nombres d’avis dans les totaux du catalogue. Agréger au grain livre avant de joindre, et comparer les sommes avant/après jointure.'}
 ]},
 {id:3,title:'Genres et langues : analyser le biais de couverture',path:'dashboard3.webp',width:1600,height:1053,insights:[
  {title:'Décrire l’échantillon, pas le marché',content:'La part des langues et des genres décrit les données collectées. Elle ne permet pas d’identifier une demande insatisfaite ou une opportunité commerciale sans dénominateur externe ni données d’usage.'},
  {title:'Normaliser les catégories',content:'Regrouper les variantes d’un code langue (eng, en-US) selon une règle explicite. Conserver une catégorie inconnue et un indicateur de couverture plutôt que lui attribuer arbitrairement une langue.'},
  {title:'Comparer des signaux comparables',content:'Fixer un effectif minimal, présenter les distributions, et distinguer la somme des avis du nombre moyen d’avis par titre. Une différence entre genres peut venir de la composition du catalogue et de l’ancienneté des éditions.'}
 ]}
];
export const goodreadsRecommendations = {title:'Décision produit : tester la découverte',summary:'L’analyse peut proposer des candidats à exposer. Elle ne démontre pas une hausse de revenus ou un effet causal de la visibilité.',items:[
 {icon:Lightbulb,title:'Candidats peu exposés',problem:'Une note élevée sur peu d’avis constitue un signal fragile.',objective:'Tester un classement qui tient compte du volume.',actions:['Comparer score brut et score régularisé','Mesurer la sensibilité au minimum de notes','A/B tester une liste de découverte avec impressions et clics']},
 {icon:Users,title:'Mesurer l’usage réel',problem:'Les avis cumulés ne donnent ni les impressions ni les conversions.',objective:'Définir les événements produit avant de mesurer un gain.',actions:['Tracer exposition, clic et ajout à une liste','Définir une fenêtre et un dénominateur par métrique','Surveiller diversité et couverture du catalogue']},
 {icon:Target,title:'Conserver un groupe témoin',problem:'Une variation après mise en avant peut avoir plusieurs causes.',objective:'Estimer un effet incrémental plutôt qu’une simple corrélation.',actions:['Randomiser au niveau utilisateur','Fixer une métrique principale avant le test','Rapporter incertitude et effets indésirables']}
]};
export const recommendationsAuthorPublisher = {title:'Fiabiliser les agrégations',summary:'Le principal enjeu data est la justesse des grains, des jointures et des dénominateurs.',items:[
 {icon:GitBranch,title:'Livre → auteurs',problem:'Une relation plusieurs-à-plusieurs peut dupliquer les volumes.',objective:'Préserver des totaux vérifiables.',actions:['Tester les clés et la cardinalité','Contrôler les sommes avant/après jointure','Documenter attribution intégrale ou fractionnée']},
 {icon:Target,title:'Petits catalogues',problem:'Une moyenne ou une variance peut être instable.',objective:'Rendre les comparaisons lisibles.',actions:['Afficher les effectifs','Tester plusieurs seuils de couverture','Ne pas interpréter une variance nulle sur un seul titre']},
 {icon:TrendingUp,title:'Métriques distinctes',problem:'Moyenne par titre et moyenne pondérée par avis répondent à deux questions.',objective:'Éviter les comparaisons ambiguës.',actions:['Nommer précisément la métrique','Afficher le dénominateur','Comparer les deux vues sans les confondre']}
]};
export const recommendationsGenresLangues = {title:'Tester la robustesse de la segmentation',summary:'Les catégories sont utiles pour explorer, mais leur couverture et leur mode de collecte limitent la généralisation.',items:[
 {icon:Globe,title:'Couverture linguistique',problem:'Les langues sont inégalement représentées.',objective:'Distinguer collecte et préférence.',actions:['Normaliser les codes','Mesurer les valeurs inconnues','Comparer à une source de couverture externe']},
 {icon:Target,title:'Genre × langue',problem:'Certains croisements ont très peu de titres.',objective:'Éviter de surinterpréter les petits groupes.',actions:['Montrer la taille du segment','Présenter médiane et dispersion','Reporter les conclusions si le signal est trop fragile']},
 {icon:TrendingUp,title:'Dimension temporelle',problem:'La date de publication n’est pas la date des interactions.',objective:'Ne pas inventer une saisonnalité.',actions:['Collecter des observations datées','Suivre les mêmes titres dans le temps','Séparer effet d’âge, composition et évolution d’usage']}
]};
