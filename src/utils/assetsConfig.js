const GITHUB_USER = 'juleescourne';
const GITHUB_REPO = 'portfolio-data-analyst';
const ASSET_BRANCH = 'assets';

/**
 * Les modèles restent sur jsDelivr : ils pèsent plusieurs Mo bruts et n'ont pas leur
 * place dans le dépôt applicatif. Ils sont servis compressés (xgb_trees.json : 17 Mo
 * bruts, ~1,9 Mo transférés).
 */
export const getDataUrl = (filename) =>
  `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${ASSET_BRANCH}/models/${filename}`;

/**
 * Les images sont en revanche servies par le site lui-même. Deux raisons :
 * - un CDN externe filtré par un réseau d'entreprise vidait la page de tous ses visuels ;
 * - les captures sont compressées en WebP ; leurs versions détaillées ne sont
 *   chargées qu’à l’ouverture du zoom.
 */
export const getImageUrl = (filename) =>
  `${process.env.PUBLIC_URL}/images/${filename}`;
