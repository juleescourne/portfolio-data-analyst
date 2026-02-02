import * as ort from 'onnxruntime-web';

// Votre username GitHub
const GITHUB_USER = 'juleescourne';
const GITHUB_REPO = 'portfolio-data-analyst';

export const initONNX = () => {
    // WASM depuis jsDelivr CDN (officiel)
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.0/dist/';

    ort.env.wasm.numThreads = 4;
    ort.env.wasm.simd = true;
};

export const getDataUrl = (filename) => {

    return `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@assets/models/${filename}`;
};

export const getImageUrl = (filename) => {

    return `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@assets/images/${filename}`;
};

export default ort;