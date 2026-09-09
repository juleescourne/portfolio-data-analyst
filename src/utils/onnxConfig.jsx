import * as ort from 'onnxruntime-web';
export { getDataUrl, getImageUrl } from './assetsConfig';

export const initONNX = () => {
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.0/dist/';
    // GitHub Pages ne peut pas envoyer les en-têtes COOP/COEP requis par crossOriginIsolated :
    // le multi-threading WASM n'est donc jamais disponible. Le forcer à 1 évite deux
    // avertissements console à chaque chargement, sans changer le résultat.
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.simd = true;
};

export default ort;
