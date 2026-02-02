import * as ort from 'onnxruntime-web';

// Votre username GitHub
const GITHUB_USER = 'juleescourne';
const GITHUB_REPO = 'portfolio-data-analyst';

export const initONNX = () => {
    // WASM depuis jsDelivr CDN (officiel)
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.17.0/dist/';

    ort.env.wasm.numThreads = 4;
    ort.env.wasm.simd = true;
};

// URL pour vos modèles via jsDelivr
export const getModelUrl = (filename) => {
    return `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@models/${filename}`;
};

export const getDataUrl = (filename) => {
    const file = filename.endsWith('.json') ? filename : `${filename}.json`;

    // Déterminer le dossier selon le nom du fichier
    let folder = 'models';
    if (filename.includes('geo_cache')) {
        folder = 'data';
    }

    return `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@assets/${folder}/${file}`;
};

export default ort;