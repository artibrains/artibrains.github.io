// Multiclass Strategies Visualization
// Demonstrates OvR (One-vs-Rest) and OvO (One-vs-One) strategies

// --- Translation System ---
const mcTranslations = {
    es: {
        appInitialized: "MC: Aplicación de estrategias multiclase inicializada.",
        dataGenerated: "MC: Datos generados: {samples} muestras por clase.",
        trainingStarted: "MC: Iniciando entrenamiento con estrategia {strategy}...",
        trainingComplete: "MC: Entrenamiento completado. Precisión: {accuracy}%",
        classifierTrained: "MC: Clasificador {name} entrenado.",
        viral: "Viral",
        bacterial: "Bacteriana",
        fungal: "Fúngica",
        biomarker1: "Biomarcador 1",
        biomarker2: "Biomarcador 2",
        ovrClassifier: "OvR: {class} vs. Resto",
        ovoClassifier: "OvO: {class1} vs. {class2}",
        accuracy: "Precisión",
        trainedModels: "Modelos entrenados",
        finalDecision: "Decisión final",
        voting: "Votación"
    },
    en: {
        appInitialized: "MC: Multiclass strategies application initialized.",
        dataGenerated: "MC: Data generated: {samples} samples per class.",
        trainingStarted: "MC: Starting training with {strategy} strategy...",
        trainingComplete: "MC: Training completed. Accuracy: {accuracy}%",
        classifierTrained: "MC: Classifier {name} trained.",
        viral: "Viral",
        bacterial: "Bacterial",
        fungal: "Fungal",
        biomarker1: "Biomarker 1",
        biomarker2: "Biomarker 2",
        ovrClassifier: "OvR: {class} vs. Rest",
        ovoClassifier: "OvO: {class1} vs. {class2}",
        accuracy: "Accuracy",
        trainedModels: "Trained models",
        finalDecision: "Final decision",
        voting: "Voting"
    }
};

let mcLang = 'en';

function mc_t(key, params = {}) {
    const currentLang = window.multiclassLanguage || mcLang;
    let text = (mcTranslations[currentLang] && mcTranslations[currentLang][key]) || mcTranslations['en'][key] || key;
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

// Main class for multiclass classification
class MulticlassClassifier {
    constructor(strategy = 'ovr') {
        this.strategy = strategy;
        this.classifiers = [];
        this.classes = [0, 1, 2]; // viral, bacterial, fungal
        this.trained = false;
    }

    fit(X, y) {
        if (this.strategy === 'ovr') {
            this.fitOvR(X, y);
        } else if (this.strategy === 'ovo') {
            this.fitOvO(X, y);
        }
        this.trained = true;
    }

    fitOvR(X, y) {
        // Train one classifier per class
        this.classifiers = [];
        this.classes.forEach(cls => {
            const binaryY = y.map(label => label === cls ? 1 : -1);
            const classifier = this.trainBinaryClassifier(X, binaryY);
            classifier.class = cls;
            classifier.name = mc_t('ovrClassifier', { class: this.getClassName(cls) });
            this.classifiers.push(classifier);
            writeToTerminal(mc_t('classifierTrained', { name: classifier.name }));
        });
    }

    fitOvO(X, y) {
        // Train one classifier per pair of classes
        this.classifiers = [];
        for (let i = 0; i < this.classes.length; i++) {
            for (let j = i + 1; j < this.classes.length; j++) {
                const cls1 = this.classes[i];
                const cls2 = this.classes[j];
                
                // Filter data for these two classes
                const indices = [];
                const binaryX = [];
                const binaryY = [];
                
                X.forEach((point, idx) => {
                    if (y[idx] === cls1 || y[idx] === cls2) {
                        binaryX.push(point);
                        binaryY.push(y[idx] === cls1 ? 1 : -1);
                    }
                });
                
                const classifier = this.trainBinaryClassifier(binaryX, binaryY);
                classifier.class1 = cls1;
                classifier.class2 = cls2;
                classifier.name = mc_t('ovoClassifier', { 
                    class1: this.getClassName(cls1), 
                    class2: this.getClassName(cls2) 
                });
                this.classifiers.push(classifier);
                writeToTerminal(mc_t('classifierTrained', { name: classifier.name }));
            }
        }
    }

    trainBinaryClassifier(X, y) {
        // Simple linear classifier using gradient descent
        let w = [Math.random() * 0.1, Math.random() * 0.1];
        let b = 0;
        const learningRate = 0.01;
        const epochs = 100;

        for (let epoch = 0; epoch < epochs; epoch++) {
            let dw = [0, 0];
            let db = 0;

            X.forEach((point, idx) => {
                const score = w[0] * point[0] + w[1] * point[1] + b;
                const target = y[idx];
                
                // Hinge loss gradient
                if (target * score < 1) {
                    dw[0] += -target * point[0];
                    dw[1] += -target * point[1];
                    db += -target;
                }
            });

            // Update weights
            w[0] -= (learningRate * dw[0]) / X.length;
            w[1] -= (learningRate * dw[1]) / X.length;
            b -= (learningRate * db) / X.length;
        }

        return { w, b };
    }

    predict(X) {
        if (!this.trained) {
            throw new Error("Classifier not trained");
        }

        if (this.strategy === 'ovr') {
            return this.predictOvR(X);
        } else if (this.strategy === 'ovo') {
            return this.predictOvO(X);
        }
    }

    predictOvR(X) {
        return X.map(point => {
            const scores = this.classifiers.map(clf => {
                return clf.w[0] * point[0] + clf.w[1] * point[1] + clf.b;
            });
            
            // Return class with highest score
            const maxIdx = scores.indexOf(Math.max(...scores));
            return this.classifiers[maxIdx].class;
        });
    }

    predictOvO(X) {
        return X.map(point => {
            const votes = [0, 0, 0];
            
            this.classifiers.forEach(clf => {
                const score = clf.w[0] * point[0] + clf.w[1] * point[1] + clf.b;
                const predictedClass = score > 0 ? clf.class1 : clf.class2;
                votes[predictedClass]++;
            });
            
            // Return class with most votes
            return votes.indexOf(Math.max(...votes));
        });
    }

    getClassName(cls) {
        const names = [mc_t('viral'), mc_t('bacterial'), mc_t('fungal')];
        return names[cls];
    }

    getDecisionBoundary(classifier, xRange, yRange) {
        // Generate points along the decision boundary
        const points = [];
        const steps = 100;
        
        for (let i = 0; i <= steps; i++) {
            const x = xRange[0] + (xRange[1] - xRange[0]) * i / steps;
            // Solve for y: w[0]*x + w[1]*y + b = 0
            const y = -(classifier.w[0] * x + classifier.b) / classifier.w[1];
            if (y >= yRange[0] && y <= yRange[1]) {
                points.push([x, y]);
            }
        }
        
        return points;
    }
}

// Data generation
function generateData(samplesPerClass, separation) {
    const data = { X: [], y: [] };
    const centers = [
        [-separation, -separation],  // viral
        [separation, -separation],   // bacterial
        [0, separation]              // fungal
    ];
    const noise = 0.8;

    centers.forEach((center, classIdx) => {
        for (let i = 0; i < samplesPerClass; i++) {
            const x = center[0] + (Math.random() - 0.5) * 2 * noise;
            const y = center[1] + (Math.random() - 0.5) * 2 * noise;
            data.X.push([x, y]);
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
    mcLang = window.multiclassLanguage || 'en';
    writeToTerminal(mc_t('appInitialized'));

    const strategySelect = document.getElementById('mc-strategy-select');
    const samplesSlider = document.getElementById('mc-samples-slider');
    const samplesValue = document.getElementById('mc-samples-value');
    const separationSlider = document.getElementById('mc-separation-slider');
    const separationValue = document.getElementById('mc-separation-value');
    const generateBtn = document.getElementById('mc-generate-btn');
    const trainBtn = document.getElementById('mc-train-btn');
    const visualizationContainer = document.getElementById('mc-visualization-container');
    const chartsContainer = document.getElementById('mc-charts-container');
    const classifiersInfo = document.getElementById('mc-classifiers-info');
    const metricsInfo = document.getElementById('mc-metrics-info');

    let currentData = null;
    let classifiers = {};

    // Update slider values
    samplesSlider.addEventListener('input', (e) => {
        samplesValue.textContent = e.target.value;
    });

    separationSlider.addEventListener('input', (e) => {
        separationValue.textContent = e.target.value;
    });

    // Generate data
    generateBtn.addEventListener('click', () => {
        const samplesPerClass = parseInt(samplesSlider.value);
        const separation = parseFloat(separationSlider.value);
        
        currentData = generateData(samplesPerClass, separation);
        writeToTerminal(mc_t('dataGenerated', { samples: samplesPerClass }));
        
        trainBtn.disabled = false;
        visualizationContainer.classList.remove('hidden');
        
        // Display data
        displayData(currentData);
    });

    // Train classifiers
    trainBtn.addEventListener('click', () => {
        if (!currentData) return;
        
        const strategy = strategySelect.value;
        
        if (strategy === 'both') {
            // Train both strategies
            writeToTerminal(mc_t('trainingStarted', { strategy: 'OvR' }));
            const ovrClassifier = new MulticlassClassifier('ovr');
            ovrClassifier.fit(currentData.X, currentData.y);
            const ovrPred = ovrClassifier.predict(currentData.X);
            const ovrAcc = calculateAccuracy(currentData.y, ovrPred);
            writeToTerminal(mc_t('trainingComplete', { accuracy: ovrAcc }));
            
            writeToTerminal(mc_t('trainingStarted', { strategy: 'OvO' }));
            const ovoClassifier = new MulticlassClassifier('ovo');
            ovoClassifier.fit(currentData.X, currentData.y);
            const ovoPred = ovoClassifier.predict(currentData.X);
            const ovoAcc = calculateAccuracy(currentData.y, ovoPred);
            writeToTerminal(mc_t('trainingComplete', { accuracy: ovoAcc }));
            
            classifiers = { ovr: ovrClassifier, ovo: ovoClassifier };
            displayComparison(currentData, classifiers);
        } else {
            writeToTerminal(mc_t('trainingStarted', { strategy: strategy.toUpperCase() }));
            const classifier = new MulticlassClassifier(strategy);
            classifier.fit(currentData.X, currentData.y);
            const predictions = classifier.predict(currentData.X);
            const accuracy = calculateAccuracy(currentData.y, predictions);
            writeToTerminal(mc_t('trainingComplete', { accuracy: accuracy }));
            
            classifiers = { [strategy]: classifier };
            displayResults(currentData, classifier, strategy);
        }
    });

    function displayData(data) {
        chartsContainer.innerHTML = '<canvas id="mc-data-chart"></canvas>';
        // Visualization code would go here using Chart.js or similar
        // For now, just show basic info
        chartsContainer.innerHTML = `
            <div class="demo-info-card">
                <p>${mc_t('dataGenerated', { samples: data.X.length / 3 })}</p>
            </div>
        `;
    }

    function displayResults(data, classifier, strategy) {
        // Display classifier info
        classifiersInfo.innerHTML = `
            <p><strong>${mc_t('trainedModels')}:</strong> ${classifier.classifiers.length}</p>
            <ul>
                ${classifier.classifiers.map(clf => `<li>${clf.name}</li>`).join('')}
            </ul>
        `;
        
        // Display metrics
        const predictions = classifier.predict(data.X);
        const accuracy = calculateAccuracy(data.y, predictions);
        metricsInfo.innerHTML = `
            <p><strong>${mc_t('accuracy')}:</strong> ${accuracy}%</p>
        `;
    }

    function displayComparison(data, classifiers) {
        // Display comparison of both strategies
        classifiersInfo.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <h5>OvR</h5>
                    <p><strong>${mc_t('trainedModels')}:</strong> ${classifiers.ovr.classifiers.length}</p>
                </div>
                <div>
                    <h5>OvO</h5>
                    <p><strong>${mc_t('trainedModels')}:</strong> ${classifiers.ovo.classifiers.length}</p>
                </div>
            </div>
        `;
        
        const ovrPred = classifiers.ovr.predict(data.X);
        const ovoPred = classifiers.ovo.predict(data.X);
        const ovrAcc = calculateAccuracy(data.y, ovrPred);
        const ovoAcc = calculateAccuracy(data.y, ovoPred);
        
        metricsInfo.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <h5>OvR</h5>
                    <p><strong>${mc_t('accuracy')}:</strong> ${ovrAcc}%</p>
                </div>
                <div>
                    <h5>OvO</h5>
                    <p><strong>${mc_t('accuracy')}:</strong> ${ovoAcc}%</p>
                </div>
            </div>
        `;
    }
});
