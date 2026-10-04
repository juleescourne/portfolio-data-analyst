// Renseigner src quand la vidéo est prête. Un chemin local commence par /videos/.
// Pour YouTube : type: 'youtube', src: 'IDENTIFIANT_VIDEO' (11 caractères).
// Pour un MP4 : type: 'file', src: '/videos/assurance-demo.mp4' ou une URL HTTPS.
export const assuranceVideo = {
    type: 'file',
    src: '',
    captionsSrc: '', // Fichier .vtt en français, facultatif.
    poster: '', // Capture réelle du rapport, facultative.
};

export const assuranceChapters = [
    ['Vue d’ensemble', 'Situer les volumes de sinistres, puis comparer les fréquences en tenant compte de la durée assurée.'],
    ['B12 / véhicules de 0 an', 'Vérifier si le signal persiste entre six mois et un an d’exposition et préciser les montants manquants.'],
    ['R24', 'Chercher les sous-groupes à examiner derrière une fréquence régionale inférieure à la moyenne.'],
    ['R11', 'Comparer les profils par densité et bonus-malus pour localiser les écarts.'],
    ['Qualité et suites', 'Expliquer les limites des données et les vérifications à proposer au métier.'],
];
