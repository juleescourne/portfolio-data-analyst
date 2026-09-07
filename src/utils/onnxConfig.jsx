import * as ort from 'onnxruntime-web';
export { getDataUrl, getImageUrl } from './assetsConfig';

export const initONNX = () => {
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.0/dist/';
    ort.env.wasm.numThreads = Math.min(4, navigator.hardwareConcurrency || 1);
    ort.env.wasm.simd = true;
};

export default ort;
