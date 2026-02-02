// predictionWorker.js - Web Worker pour calculs non-bloquants
self.onmessage = async function (e) {
    const { type, data } = e.data;

    if (type === 'PREDICT') {
        try {
            const { features_matrix, trees, baseScore, learningRate } = data;

            // Calcul des prédictions dans le worker
            const predictions = [];
            const batchSize = 100; // Traiter par lots pour meilleure réactivité

            for (let i = 0; i < features_matrix.length; i++) {
                const features = features_matrix[i];
                let prediction = baseScore;

                // Calculer la prédiction pour ce point
                for (let t = 0; t < trees.length; t++) {
                    const treeValue = predictTree(trees[t], features);
                    prediction += learningRate * treeValue;
                }

                predictions.push(prediction);

                // Envoyer progression toutes les 100 prédictions
                if ((i + 1) % batchSize === 0) {
                    self.postMessage({
                        type: 'PROGRESS',
                        progress: ((i + 1) / features_matrix.length) * 100
                    });
                }
            }

            // Normalisation
            const min_raw = Math.min(...predictions);
            const max_raw = Math.max(...predictions);

            const normalizedPredictions = predictions.map(p => {
                const normalized = (p - min_raw) / (max_raw - min_raw);
                const price = 50000 + normalized * 450000;
                return Math.round(price);
            });

            // Retourner les résultats
            self.postMessage({
                type: 'COMPLETE',
                predictions: normalizedPredictions
            });

        } catch (error) {
            self.postMessage({
                type: 'ERROR',
                error: error.message
            });
        }
    }
};

// Fonction de prédiction d'arbre (copiée de xgboostPredictor)
function predictTree(tree, features) {
    let node = tree;
    let depth = 0;
    const maxDepth = 100;

    while (node.children && depth < maxDepth) {
        const featureIdx = node.split;
        const threshold = node.split_condition;
        const featureValue = features[featureIdx];

        if (featureValue === undefined || featureValue === null) {
            break;
        }

        if (featureValue < threshold) {
            node = node.children[0];
        } else {
            node = node.children[1];
        }

        depth++;
    }

    return node.leaf !== undefined ? node.leaf : 0;
}