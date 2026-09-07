class XGBoostPredictor {
    constructor(modelData, featureMap) {
        this.trees = modelData.trees;
        this.baseScore = modelData.base_score;
        this.learningRate = modelData.learning_rate;
        this.featureMap = featureMap || {};
    }

    predictTree(tree, features) {
        let node = tree;
        let depth = 0;
        const maxDepth = 100;

        while (node.children && depth < maxDepth) {
            const splitFeature = node.split;
            const threshold = node.split_condition;
            const featureIdx = typeof splitFeature === 'string'
                ? this.featureMap[splitFeature]
                : splitFeature;

            if (featureIdx === undefined) break;
            const featureValue = features[featureIdx];
            if (featureValue === undefined || featureValue === null) break;

            node = featureValue < threshold ? node.children[0] : node.children[1];
            depth += 1;
        }

        return node.leaf !== undefined ? node.leaf : 0;
    }

    predict(featuresMatrix) {
        return featuresMatrix.map((features) => {
            let prediction = this.baseScore;
            for (let t = 0; t < this.trees.length; t += 1) {
                prediction += this.learningRate * this.predictTree(this.trees[t], features);
            }
            return prediction;
        });
    }

    static async load(url, featureMap) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Unable to load model (${response.status})`);
        const modelData = await response.json();

        if (!modelData.trees || !Array.isArray(modelData.trees)) {
            throw new Error('Invalid model format: missing trees array');
        }
        if (modelData.trees.length === 0) throw new Error('Model has no trees');

        return new XGBoostPredictor(modelData, featureMap);
    }
}

export default XGBoostPredictor;
