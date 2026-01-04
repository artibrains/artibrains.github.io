// Random Forest Visualization
// Demonstrates how multiple decision trees work together

// --- Translation System ---
const rfTranslations = {
    es: {
        appInitialized: "RF: Aplicación de Random Forest inicializada.",
        dataGenerated: "RF: Datos generados - {samples} muestras, {features} características.",
        trainingStarted: "RF: Iniciando entrenamiento de {trees} árboles...",
        treeTraining: "RF: Entrenando árbol {current}/{total}...",
        trainingComplete: "RF: Entrenamiento completado. Precisión: {accuracy}%",
        predictionMade: "RF: Predicción para punto: {result}",
        viral: "Viral",
        bacterial: "Bacteriana",
        fungal: "Fúngica",
        accuracy: "Precisión",
        oobError: "Error OOB",
        treesVoting: "Votos de los árboles",
        finalPrediction: "Predicción final",
        confidence: "Confianza",
        symptom: "Síntoma",
        biomarker: "Biomarcador"
    },
    en: {
        appInitialized: "RF: Random Forest application initialized.",
        dataGenerated: "RF: Data generated - {samples} samples, {features} features.",
        trainingStarted: "RF: Starting training of {trees} trees...",
        treeTraining: "RF: Training tree {current}/{total}...",
        trainingComplete: "RF: Training completed. Accuracy: {accuracy}%",
        predictionMade: "RF: Prediction for point: {result}",
        viral: "Viral",
        bacterial: "Bacterial",
        fungal: "Fungal",
        accuracy: "Accuracy",
        oobError: "OOB Error",
        treesVoting: "Tree votes",
        finalPrediction: "Final prediction",
        confidence: "Confidence",
        symptom: "Symptom",
        biomarker: "Biomarker"
    }
};

let rfLang = 'en';

function rf_t(key, params = {}) {
    const currentLang = window.randomForestLanguage || rfLang;
    let text = (rfTranslations[currentLang] && rfTranslations[currentLang][key]) || rfTranslations['en'][key] || key;
    Object.keys(params).forEach(k => {
        text = text.replace(`{${k}}`, params[k]);
    });
    return text;
}

function writeToTerminal(message) {
    if (window.CustomTerminal && typeof window.CustomTerminal.write === 'function') {
        window.CustomTerminal.write(message + "\n");
    }
}

// Simple Decision Tree class
class SimpleDecisionTree {
    constructor(maxDepth = 4, minSamples = 5, featuresRatio = 0.7) {
        this.maxDepth = maxDepth;
        this.minSamples = minSamples;
        this.featuresRatio = featuresRatio;
        this.tree = null;
    }

    fit(X, y, availableFeatures = null) {
        const features = availableFeatures || [...Array(X[0].length).keys()];
        this.tree = this.buildTree(X, y, features, 0);
    }

    buildTree(X, y, features, depth) {
        // Base cases
        if (depth >= this.maxDepth || X.length < this.minSamples) {
            return this.createLeaf(y);
        }

        // Check if all samples have same class
        const uniqueClasses = [...new Set(y)];
        if (uniqueClasses.length === 1) {
            return this.createLeaf(y);
        }

        // Select random subset of features
        const numFeatures = Math.max(1, Math.floor(features.length * this.featuresRatio));
        const selectedFeatures = this.randomSubset(features, numFeatures);

        // Find best split
        const bestSplit = this.findBestSplit(X, y, selectedFeatures);
        
        if (!bestSplit) {
            return this.createLeaf(y);
        }

        // Create split
        const leftIndices = [];
        const rightIndices = [];
        
        X.forEach((sample, idx) => {
            if (sample[bestSplit.feature] <= bestSplit.threshold) {
                leftIndices.push(idx);
            } else {
                rightIndices.push(idx);
            }
        });

        if (leftIndices.length === 0 || rightIndices.length === 0) {
            return this.createLeaf(y);
        }

        const leftX = leftIndices.map(i => X[i]);
        const leftY = leftIndices.map(i => y[i]);
        const rightX = rightIndices.map(i => X[i]);
        const rightY = rightIndices.map(i => y[i]);

        return {
            feature: bestSplit.feature,
            threshold: bestSplit.threshold,
            left: this.buildTree(leftX, leftY, features, depth + 1),
            right: this.buildTree(rightX, rightY, features, depth + 1)
        };
    }

    findBestSplit(X, y, features) {
        let bestGini = Infinity;
        let bestSplit = null;

        features.forEach(feature => {
            const values = X.map(sample => sample[feature]);
            const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

            for (let i = 0; i < uniqueValues.length - 1; i++) {
                const threshold = (uniqueValues[i] + uniqueValues[i + 1]) / 2;
                
                const leftY = [];
                const rightY = [];
                
                X.forEach((sample, idx) => {
                    if (sample[feature] <= threshold) {
                        leftY.push(y[idx]);
                    } else {
                        rightY.push(y[idx]);
                    }
                });

                if (leftY.length === 0 || rightY.length === 0) continue;

                const gini = (leftY.length / y.length) * this.giniImpurity(leftY) +
                            (rightY.length / y.length) * this.giniImpurity(rightY);

                if (gini < bestGini) {
                    bestGini = gini;
                    bestSplit = { feature, threshold };
                }
            }
        });

        return bestSplit;
    }

    giniImpurity(y) {
        const counts = {};
        y.forEach(label => {
            counts[label] = (counts[label] || 0) + 1;
        });

        let impurity = 1.0;
        Object.values(counts).forEach(count => {
            const p = count / y.length;
            impurity -= p * p;
        });

        return impurity;
    }

    createLeaf(y) {
        const counts = {};
        y.forEach(label => {
            counts[label] = (counts[label] || 0) + 1;
        });

        let maxCount = 0;
        let prediction = 0;

        Object.entries(counts).forEach(([label, count]) => {
            if (count > maxCount) {
                maxCount = count;
                prediction = parseInt(label);
            }
        });

        return { prediction, isLeaf: true };
    }

    predict(X) {
        return X.map(sample => this.predictSample(sample, this.tree));
    }

    predictSample(sample, node) {
        if (node.isLeaf) {
            return node.prediction;
        }

        if (sample[node.feature] <= node.threshold) {
            return this.predictSample(sample, node.left);
        } else {
            return this.predictSample(sample, node.right);
        }
    }

    randomSubset(array, size) {
        const shuffled = array.slice().sort(() => Math.random() - 0.5);
        return shuffled.slice(0, size);
    }
}

// Random Forest class
class RandomForest {
    constructor(numTrees = 10, maxDepth = 4, featuresRatio = 0.7) {
        this.numTrees = numTrees;
        this.maxDepth = maxDepth;
        this.featuresRatio = featuresRatio;
        this.trees = [];
        this.oobIndices = [];
    }

    fit(X, y) {
        this.trees = [];
        this.oobIndices = [];

        for (let i = 0; i < this.numTrees; i++) {
            writeToTerminal(rf_t('treeTraining', { current: i + 1, total: this.numTrees }));
            
            // Bootstrap sampling
            const { bootstrapX, bootstrapY, oobIndices } = this.bootstrap(X, y);
            this.oobIndices.push(oobIndices);

            // Train tree
            const tree = new SimpleDecisionTree(this.maxDepth, 5, this.featuresRatio);
            tree.fit(bootstrapX, bootstrapY);
            this.trees.push(tree);
        }
    }

    bootstrap(X, y) {
        const n = X.length;
        const bootstrapX = [];
        const bootstrapY = [];
        const indices = new Set();
        const oobIndices = [];

        // Sample with replacement
        for (let i = 0; i < n; i++) {
            const idx = Math.floor(Math.random() * n);
            bootstrapX.push(X[idx]);
            bootstrapY.push(y[idx]);
            indices.add(idx);
        }

        // Collect OOB indices
        for (let i = 0; i < n; i++) {
            if (!indices.has(i)) {
                oobIndices.push(i);
            }
        }

        return { bootstrapX, bootstrapY, oobIndices };
    }

    predict(X) {
        // Get predictions from all trees
        const allPredictions = this.trees.map(tree => tree.predict(X));

        // Majority voting
        const finalPredictions = [];
        for (let i = 0; i < X.length; i++) {
            const votes = {};
            allPredictions.forEach(predictions => {
                const pred = predictions[i];
                votes[pred] = (votes[pred] || 0) + 1;
            });

            let maxVotes = 0;
            let finalPred = 0;
            Object.entries(votes).forEach(([pred, count]) => {
                if (count > maxVotes) {
                    maxVotes = count;
                    finalPred = parseInt(pred);
                }
            });

            finalPredictions.push(finalPred);
        }

        return finalPredictions;
    }

    predictWithVotes(sample) {
        const votes = {};
        this.trees.forEach(tree => {
            const pred = tree.predictSample(sample, tree.tree);
            votes[pred] = (votes[pred] || 0) + 1;
        });
        return votes;
    }
}

// Data generation
function generateData(samplesPerClass = 30) {
    const data = { X: [], y: [] };
    const numFeatures = 4;
    
    // Three classes with different patterns
    const patterns = [
        { mean: [1, 1, 0, 0], std: 0.5 },   // viral
        { mean: [0, 0, 1, 1], std: 0.5 },   // bacterial
        { mean: [1, 0, 1, 0], std: 0.5 }    // fungal
    ];

    patterns.forEach((pattern, classIdx) => {
        for (let i = 0; i < samplesPerClass; i++) {
            const sample = pattern.mean.map((mean, featIdx) => 
                mean + (Math.random() - 0.5) * 2 * pattern.std
            );
            data.X.push(sample);
            data.y.push(classIdx);
        }
    });

    return data;
}

// Calculate accuracy
function calculateAccuracy(yTrue, yPred) {
    let correct = 0;
    yTrue.forEach((label, idx) => {
        if (label === yPred[idx]) correct++;
    });
    return (correct / yTrue.length * 100).toFixed(1);
}

// DOM initialization
document.addEventListener('DOMContentLoaded', () => {
    rfLang = window.randomForestLanguage || 'en';
    writeToTerminal(rf_t('appInitialized'));

    const treesSlider = document.getElementById('rf-trees-slider');
    const treesValue = document.getElementById('rf-trees-value');
    const depthSlider = document.getElementById('rf-depth-slider');
    const depthValue = document.getElementById('rf-depth-value');
    const featuresSlider = document.getElementById('rf-features-slider');
    const featuresValue = document.getElementById('rf-features-value');
    const generateBtn = document.getElementById('rf-generate-btn');
    const trainBtn = document.getElementById('rf-train-btn');
    const visualizationContainer = document.getElementById('rf-visualization-container');
    const trainingStatus = document.getElementById('rf-training-status');
    const treesContainer = document.getElementById('rf-trees-container');
    const metricsDiv = document.getElementById('rf-metrics');

    let currentData = null;
    let forest = null;

    // Update slider values
    treesSlider.addEventListener('input', (e) => {
        treesValue.textContent = e.target.value;
    });

    depthSlider.addEventListener('input', (e) => {
        depthValue.textContent = e.target.value;
    });

    featuresSlider.addEventListener('input', (e) => {
        featuresValue.textContent = e.target.value + '%';
    });

    // Generate data
    generateBtn.addEventListener('click', () => {
        currentData = generateData(30);
        writeToTerminal(rf_t('dataGenerated', { 
            samples: currentData.X.length, 
            features: currentData.X[0].length 
        }));
        
        trainBtn.disabled = false;
        visualizationContainer.classList.remove('hidden');
        trainingStatus.innerHTML = '<p>' + (rfLang === 'es' ? 'Datos generados. Listo para entrenar.' : 'Data generated. Ready to train.') + '</p>';
    });

    // Train forest
    trainBtn.addEventListener('click', async () => {
        if (!currentData) return;
        
        const numTrees = parseInt(treesSlider.value);
        const maxDepth = parseInt(depthSlider.value);
        const featuresRatio = parseInt(featuresSlider.value) / 100;
        
        writeToTerminal(rf_t('trainingStarted', { trees: numTrees }));
        trainingStatus.innerHTML = '<p>' + (rfLang === 'es' ? 'Entrenando...' : 'Training...') + '</p>';
        
        // Small delay for UI update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        forest = new RandomForest(numTrees, maxDepth, featuresRatio);
        forest.fit(currentData.X, currentData.y);
        
        const predictions = forest.predict(currentData.X);
        const accuracy = calculateAccuracy(currentData.y, predictions);
        
        writeToTerminal(rf_t('trainingComplete', { accuracy: accuracy }));
        
        displayResults(forest, currentData, accuracy);
    });

    function displayResults(forest, data, accuracy) {
        trainingStatus.innerHTML = `
            <p><strong>${rfLang === 'es' ? '✓ Entrenamiento completado' : '✓ Training completed'}</strong></p>
            <p>${rfLang === 'es' ? 'Árboles en el bosque' : 'Trees in forest'}: ${forest.numTrees}</p>
        `;

        // Display individual trees info
        treesContainer.innerHTML = `
            <div class="demo-info-card">
                <p>${rfLang === 'es' ? 'El bosque contiene ' + forest.numTrees + ' árboles de decisión.' : 'The forest contains ' + forest.numTrees + ' decision trees.'}</p>
                <p>${rfLang === 'es' ? 'Cada árbol fue entrenado con una muestra bootstrap diferente.' : 'Each tree was trained on a different bootstrap sample.'}</p>
            </div>
        `;

        // Display metrics
        metricsDiv.innerHTML = `
            <p><strong>${rf_t('accuracy')}:</strong> ${accuracy}%</p>
            <p><strong>${rfLang === 'es' ? 'Número de árboles' : 'Number of trees'}:</strong> ${forest.numTrees}</p>
            <p><strong>${rfLang === 'es' ? 'Profundidad máxima' : 'Maximum depth'}:</strong> ${forest.maxDepth}</p>
        `;
    }
});
