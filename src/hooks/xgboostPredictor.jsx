// utils/xgboostPredictor.js
class XGBoostPredictor {
    constructor(modelData, featureMap) {
        this.trees = modelData.trees;
        this.baseScore = modelData.base_score;
        this.learningRate = modelData.learning_rate;
        this.featureMap = featureMap || {};

        console.log(`Modèle chargé: ${this.trees.length} arbres, base=${this.baseScore}, lr=${this.learningRate}`);
    }

    predictTree(tree, features) {
        let node = tree;
        let depth = 0;
        const maxDepth = 100;

        while (node.children && depth < maxDepth) {
            const splitFeature = node.split;
            const threshold = node.split_condition;

            // CRITIQUE: Convertir le nom de feature en index
            let featureIdx;
            if (typeof splitFeature === 'string') {
                // Le modèle utilise des noms de features
                featureIdx = this.featureMap[splitFeature];
                if (featureIdx === undefined) {
                    console.error(`Feature "${splitFeature}" not found in feature map!`);
                    break;
                }
            } else {
                // Le modèle utilise déjà des indices
                featureIdx = splitFeature;
            }

            const featureValue = features[featureIdx];

            if (featureValue === undefined || featureValue === null) {
                console.error(`Feature at index ${featureIdx} is undefined!`, features);
                break;
            }

            // Navigation dans l'arbre
            if (featureValue < threshold) {
                node = node.children[0]; // Gauche
            } else {
                node = node.children[1]; // Droite
            }

            depth++;
        }

        if (depth >= maxDepth) {
            console.warn('Max depth reached in tree traversal');
        }

        return node.leaf !== undefined ? node.leaf : 0;
    }

    predict(featuresMatrix) {
        const predictions = featuresMatrix.map((features, idx) => {
            let prediction = this.baseScore;

            for (let t = 0; t < this.trees.length; t++) {
                const treeValue = this.predictTree(this.trees[t], features);
                prediction += this.learningRate * treeValue;
            }

            // Debug pour le premier point
            if (idx === 0) {
                console.log(`🌳 Debug first prediction:`);
                console.log(`  Base score: ${this.baseScore}`);
                console.log(`  Final raw prediction: ${prediction}`);
            }

            return prediction;
        });

        return predictions;
    }

    static async load(url, featureMap) {
        const response = await fetch(url);
        const modelData = await response.json();

        if (!modelData.trees || !Array.isArray(modelData.trees)) {
            throw new Error('Invalid model format: missing trees array');
        }

        if (modelData.trees.length === 0) {
            throw new Error('Model has no trees!');
        }

        console.log(`Model structure:`, {
            numTrees: modelData.trees.length,
            baseScore: modelData.base_score,
            learningRate: modelData.learning_rate,
            firstTreeSplit: modelData.trees[0].split
        });

        return new XGBoostPredictor(modelData, featureMap);
    }
}

export default XGBoostPredictor;