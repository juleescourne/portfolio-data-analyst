const GITHUB_USER = 'juleescourne';
const GITHUB_REPO = 'portfolio-data-analyst';
const ASSET_BRANCH = 'assets';

export const getDataUrl = (filename) =>
  `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${ASSET_BRANCH}/models/${filename}`;

export const getImageUrl = (filename) =>
  `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${ASSET_BRANCH}/images/${filename}`;
