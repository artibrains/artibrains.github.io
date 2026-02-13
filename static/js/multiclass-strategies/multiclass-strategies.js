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
        viral: "Facturación",
        bacterial: "Soporte técnico",
        fungal: "Cuenta",
        biomarker1: "Señal 1",
        biomarker2: "Señal 2",
        ovrClassifier: "{class} vs. Resto",
        ovoClassifier: "{class1} vs. {class2}",
        accuracy: "Precisión",
        trainedModels: "Modelos entrenados",
        finalDecision: "Decisión final",
        voting: "Votación",
        howOvrWorks: "Cómo funciona One-vs-Rest (OvR)",
        howOvoWorks: "Cómo funciona One-vs-One (OvO)",
        ovrExplanation: "OvR entrena {n} clasificadores binarios, uno por cada clase:",
        ovoExplanation: "OvO entrena {n} clasificadores binarios, uno por cada par de clases:",
        binaryClassifiers: "Clasificadores Binarios",
        finalResult: "Resultado Final",
        classifierNumber: "Clasificador {n}",
        votingProcess: "Proceso de Votación",
        eachClassifierVotes: "Cada clasificador vota por una clase",
        classWithMostVotes: "La clase con más votos gana",
        generatedData: "Datos Generados",
        positiveClass: "Clase Positiva",
        negativeClass: "Clase Negativa",
        vsRest: "vs. Resto"
    },
    en: {
        appInitialized: "MC: Multiclass strategies application initialized.",
        dataGenerated: "MC: Data generated: {samples} samples per class.",
        trainingStarted: "MC: Starting training with {strategy} strategy...",
        trainingComplete: "MC: Training completed. Accuracy: {accuracy}%",
        classifierTrained: "MC: Classifier {name} trained.",
        viral: "Billing",
        bacterial: "Technical",
        fungal: "Account",
        biomarker1: "Signal 1",
        biomarker2: "Signal 2",
        ovrClassifier: "{class} vs. Rest",
        ovoClassifier: "{class1} vs. {class2}",
        accuracy: "Accuracy",
        trainedModels: "Trained models",
        finalDecision: "Final decision",
        voting: "Voting",
        howOvrWorks: "How One-vs-Rest (OvR) Works",
        howOvoWorks: "How One-vs-One (OvO) Works",
        ovrExplanation: "OvR trains {n} binary classifiers, one per class:",
        ovoExplanation: "OvO trains {n} binary classifiers, one per each pair of classes:",
        binaryClassifiers: "Binary Classifiers",
        finalResult: "Final Result",
        classifierNumber: "Classifier {n}",
        votingProcess: "Voting Process",
        eachClassifierVotes: "Each classifier votes for a class",
        classWithMostVotes: "The class with most votes wins",
        generatedData: "Generated Data",
        positiveClass: "Positive Class",
        negativeClass: "Negative Class",
        vsRest: "vs. Rest"
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

// Helper functions for dynamic class handling
function generateColors(numClasses) {
    // Generate visually distinct colors using HSL
    const colors = [];
    const hueStep = 360 / numClasses;

    for (let i = 0; i < numClasses; i++) {
        const hue = (i * hueStep) % 360;
        const saturation = 65 + (i % 3) * 10; // Vary saturation slightly
        const lightness = 50 + (i % 2) * 5; // Vary lightness slightly
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
}

function getClassNames(numClasses, lang) {
    // Default class names in both languages
    const defaultNames = {
        es: ['Clase A', 'Clase B', 'Clase C', 'Clase D', 'Clase E',
            'Clase F', 'Clase G', 'Clase H', 'Clase I', 'Clase J'],
        en: ['Class A', 'Class B', 'Class C', 'Class D', 'Class E',
            'Class F', 'Class G', 'Class H', 'Class I', 'Class J']
    };

    // For 3 classes, use the original names
    if (numClasses === 3) {
        return lang === 'es'
            ? ['Facturación', 'Soporte técnico', 'Cuenta']
            : ['Billing', 'Technical', 'Account'];
    }

    return defaultNames[lang].slice(0, numClasses);
}

function generateClassCenters(numClasses, separation) {
    // Generate centers in a circular pattern
    const centers = [];
    const angleStep = (2 * Math.PI) / numClasses;
    const radius = separation * 1.5;

    for (let i = 0; i < numClasses; i++) {
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        centers.push([x, y]);
    }

    return centers;
}

// Main class for multiclass classification
class MulticlassClassifier {
    constructor(strategy = 'ovr', numClasses = 3) {
        this.strategy = strategy;
        this.classifiers = [];
        this.classes = Array.from({ length: numClasses }, (_, i) => i);
        this.numClasses = numClasses;
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
        const lang = window.multiclassLanguage || 'en';
        const names = getClassNames(this.numClasses, lang);
        return names[cls] || `Class ${cls}`;
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
function generateData(samplesPerClass, separation, numClasses) {
    const data = { X: [], y: [] };
    const centers = generateClassCenters(numClasses, separation);
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

// Canvas visualization functions
function drawBinaryClassifier(canvasId, data, classifier, classInfo, title) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find data range
    const xValues = data.X.map(p => p[0]);
    const yValues = data.X.map(p => p[1]);
    const xMin = Math.min(...xValues) - 1;
    const xMax = Math.max(...xValues) + 1;
    const yMin = Math.min(...yValues) - 1;
    const yMax = Math.max(...yValues) + 1;

    // Scale functions
    const scaleX = (x) => padding + (x - xMin) / (xMax - xMin) * (width - 2 * padding);
    const scaleY = (y) => height - padding - (y - yMin) / (yMax - yMin) * (height - 2 * padding);

    // Draw decision regions
    const step = (xMax - xMin) / 80;
    ctx.globalAlpha = 0.15;

    for (let x = xMin; x < xMax; x += step) {
        for (let y = yMin; y < yMax; y += step) {
            const score = classifier.w[0] * x + classifier.w[1] * y + classifier.b;
            ctx.fillStyle = score > 0 ? '#2ecc71' : '#e74c3c';
            const px = scaleX(x);
            const py = scaleY(y);
            ctx.fillRect(px, py, scaleX(x + step) - px, scaleY(y - step) - py);
        }
    }
    ctx.globalAlpha = 1.0;

    // Draw decision boundary
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    const x1 = xMin;
    const y1 = -(classifier.w[0] * x1 + classifier.b) / classifier.w[1];
    const x2 = xMax;
    const y2 = -(classifier.w[0] * x2 + classifier.b) / classifier.w[1];
    ctx.moveTo(scaleX(x1), scaleY(y1));
    ctx.lineTo(scaleX(x2), scaleY(y2));
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw points
    const numClasses = Math.max(...data.y) + 1;
    const colors = generateColors(numClasses);
    data.X.forEach((point, idx) => {
        const x = scaleX(point[0]);
        const y = scaleY(point[1]);
        const trueClass = data.y[idx];

        // Determine if this point is positive or negative for this classifier
        let isPositive = false;
        if (classInfo.type === 'ovr') {
            isPositive = trueClass === classInfo.positiveClass;
        } else { // ovo
            if (trueClass === classInfo.class1 || trueClass === classInfo.class2) {
                isPositive = trueClass === classInfo.class1;
            } else {
                return; // Don't draw points from other classes in OvO
            }
        }

        // Draw point
        ctx.fillStyle = isPositive ? '#2ecc71' : '#95a5a6';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Draw border for emphasis
        ctx.strokeStyle = colors[trueClass];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.stroke();
    });

    // Draw title
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 15);

    // Draw legend
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#2ecc71';
    ctx.fillText('Positive', 5, height - 15);
    ctx.fillStyle = '#95a5a6';
    ctx.fillText('Negative', 5, height - 5);
}

function drawScatterPlot(canvasId, data, predictions, title) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find data range
    const xValues = data.X.map(p => p[0]);
    const yValues = data.X.map(p => p[1]);
    const xMin = Math.min(...xValues) - 1;
    const xMax = Math.max(...xValues) + 1;
    const yMin = Math.min(...yValues) - 1;
    const yMax = Math.max(...yValues) + 1;

    // Scale functions
    const scaleX = (x) => padding + (x - xMin) / (xMax - xMin) * (width - 2 * padding);
    const scaleY = (y) => height - padding - (y - yMin) / (yMax - yMin) * (height - 2 * padding);

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Draw title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 20);

    // Class colors and names
    const numClasses = Math.max(...data.y) + 1;
    const colors = generateColors(numClasses);
    const lang = window.multiclassLanguage || 'en';
    const classNames = getClassNames(numClasses, lang);

    // Draw points
    data.X.forEach((point, idx) => {
        const x = scaleX(point[0]);
        const y = scaleY(point[1]);
        const trueClass = data.y[idx];
        const predClass = predictions ? predictions[idx] : trueClass;

        // Outer circle (true class)
        ctx.fillStyle = colors[trueClass];
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();

        // If prediction is wrong, show with border
        if (predictions && trueClass !== predClass) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.stroke();
        }
    });

    // Draw legend
    const legendX = width - padding - 100;
    const legendY = padding + 10;
    classNames.forEach((name, idx) => {
        ctx.fillStyle = colors[idx];
        ctx.beginPath();
        ctx.arc(legendX, legendY + idx * 20, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(name, legendX + 10, legendY + idx * 20 + 4);
    });
}

function drawDecisionBoundary(canvasId, classifier, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Find data range
    const xValues = data.X.map(p => p[0]);
    const yValues = data.X.map(p => p[1]);
    const xMin = Math.min(...xValues) - 1;
    const xMax = Math.max(...xValues) + 1;
    const yMin = Math.min(...yValues) - 1;
    const yMax = Math.max(...yValues) + 1;

    // Scale functions
    const scaleX = (x) => padding + (x - xMin) / (xMax - xMin) * (width - 2 * padding);
    const scaleY = (y) => height - padding - (y - yMin) / (yMax - yMin) * (height - 2 * padding);

    // Draw decision regions with low opacity
    const step = (xMax - xMin) / 100;
    ctx.globalAlpha = 0.1;
    const numClasses = Math.max(...data.y) + 1;
    const colors = generateColors(numClasses);

    for (let x = xMin; x < xMax; x += step) {
        for (let y = yMin; y < yMax; y += step) {
            const pred = classifier.predict([[x, y]])[0];
            ctx.fillStyle = colors[pred];
            const px = scaleX(x);
            const py = scaleY(y);
            ctx.fillRect(px, py, scaleX(x + step) - px, scaleY(y - step) - py);
        }
    }

    ctx.globalAlpha = 1.0;
}

// DOM initialization
document.addEventListener('DOMContentLoaded', () => {
    mcLang = window.multiclassLanguage || 'en';
    writeToTerminal(mc_t('appInitialized'));

    const numClassesSelect = document.getElementById('mc-num-classes');
    const samplesSlider = document.getElementById('mc-samples-slider');
    const samplesValue = document.getElementById('mc-samples-value');
    const separationSlider = document.getElementById('mc-separation-slider');
    const separationValue = document.getElementById('mc-separation-value');
    const generateBtn = document.getElementById('mc-generate-btn');
    const trainBtn = document.getElementById('mc-train-btn');
    const visualizationContainer = document.getElementById('mc-visualization-container');
    const tabsContainer = document.getElementById('mc-tabs-container');
    const chartsContainer = document.getElementById('mc-charts-container');
    const classifiersInfo = document.getElementById('mc-classifiers-info');
    const metricsInfo = document.getElementById('mc-metrics-info');

    let currentData = null;
    let classifiers = {};
    let currentTab = 'ovr';
    let currentNumClasses = 3;

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
        currentNumClasses = parseInt(numClassesSelect.value);

        currentData = generateData(samplesPerClass, separation, currentNumClasses);
        writeToTerminal(mc_t('dataGenerated', { samples: samplesPerClass }));

        trainBtn.disabled = false;
        visualizationContainer.classList.remove('hidden');
        tabsContainer.classList.add('hidden'); // Hide tabs until training

        // Display data
        displayData(currentData);
    });

    // Tab switching
    function switchTab(tabName) {
        currentTab = tabName;

        // Update tab buttons
        document.querySelectorAll('.mc-tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Display content for selected tab
        if (classifiers.ovr && classifiers.ovo) {
            if (tabName === 'ovr') {
                displayResults(currentData, classifiers.ovr, 'ovr');
            } else if (tabName === 'ovo') {
                displayResults(currentData, classifiers.ovo, 'ovo');
            } else if (tabName === 'comparison') {
                displayComparison(currentData, classifiers);
            }
        }
    }

    // Add event listeners to tab buttons
    document.querySelectorAll('.mc-tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // Train classifiers
    trainBtn.addEventListener('click', () => {
        if (!currentData) return;

        // Train both strategies
        writeToTerminal(mc_t('trainingStarted', { strategy: 'OvR' }));
        const ovrClassifier = new MulticlassClassifier('ovr', currentNumClasses);
        ovrClassifier.fit(currentData.X, currentData.y);
        const ovrPred = ovrClassifier.predict(currentData.X);
        const ovrAcc = calculateAccuracy(currentData.y, ovrPred);
        writeToTerminal(mc_t('trainingComplete', { accuracy: ovrAcc }));

        writeToTerminal(mc_t('trainingStarted', { strategy: 'OvO' }));
        const ovoClassifier = new MulticlassClassifier('ovo', currentNumClasses);
        ovoClassifier.fit(currentData.X, currentData.y);
        const ovoPred = ovoClassifier.predict(currentData.X);
        const ovoAcc = calculateAccuracy(currentData.y, ovoPred);
        writeToTerminal(mc_t('trainingComplete', { accuracy: ovoAcc }));

        classifiers = { ovr: ovrClassifier, ovo: ovoClassifier };

        // Show tabs and display first tab
        tabsContainer.classList.remove('hidden');
        switchTab('ovr');
    });

    function displayData(data) {
        chartsContainer.innerHTML = `
            <div class="demo-info-card">
                <h5>${mc_t('dataGenerated', { samples: data.X.length / 3 })}</h5>
                <canvas id="mc-data-canvas" width="600" height="400" style="max-width: 100%; border: 1px solid #ddd; border-radius: 4px;"></canvas>
            </div>
        `;

        // Wait for canvas to be in DOM
        setTimeout(() => {
            drawScatterPlot('mc-data-canvas', data, null, 'Generated Data');
        }, 0);
    }

    function displayResults(data, classifier, strategy) {
        const predictions = classifier.predict(data.X);
        const accuracy = calculateAccuracy(data.y, predictions);

        const strategyTitle = strategy === 'ovr' ? mc_t('howOvrWorks') : mc_t('howOvoWorks');
        const explanation = strategy === 'ovr'
            ? mc_t('ovrExplanation', { n: classifier.classifiers.length })
            : mc_t('ovoExplanation', { n: classifier.classifiers.length });

        // Create grid of binary classifiers
        let classifiersHTML = '';
        classifier.classifiers.forEach((clf, idx) => {
            classifiersHTML += `
                <div class="binary-classifier-card">
                    <canvas id="mc-binary-${idx}" width="300" height="250" style="border: 1px solid #ddd; border-radius: 4px;"></canvas>
                    <p class="classifier-label">${clf.name}</p>
                </div>
            `;
        });

        chartsContainer.innerHTML = `
            <div class="demo-info-card">
                <h4>${strategyTitle}</h4>
                <p style="margin-bottom: 1rem;">${explanation}</p>
                
                <h5 style="margin-top: 1.5rem;">${mc_t('binaryClassifiers')}</h5>
                <div class="binary-classifiers-grid">
                    ${classifiersHTML}
                </div>
                
                <h5 style="margin-top: 1.5rem;">${mc_t('finalResult')}</h5>
                <canvas id="mc-result-canvas" width="600" height="400" style="max-width: 100%; border: 1px solid #ddd; border-radius: 4px; margin-top: 0.5rem;"></canvas>
            </div>
        `;

        // Display classifier info
        classifiersInfo.innerHTML = `
            <p><strong>${mc_t('trainedModels')}:</strong> ${classifier.classifiers.length}</p>
            <ul style="font-size: 0.9em;">
                ${classifier.classifiers.map(clf => `<li>${clf.name}</li>`).join('')}
            </ul>
        `;

        // Display metrics
        metricsInfo.innerHTML = `
            <p><strong>${mc_t('accuracy')}:</strong> ${accuracy}%</p>
        `;

        // Draw visualizations
        setTimeout(() => {
            // Draw each binary classifier
            classifier.classifiers.forEach((clf, idx) => {
                let classInfo;
                if (strategy === 'ovr') {
                    classInfo = { type: 'ovr', positiveClass: clf.class };
                } else {
                    classInfo = { type: 'ovo', class1: clf.class1, class2: clf.class2 };
                }
                drawBinaryClassifier(`mc-binary-${idx}`, data, clf, classInfo, clf.name);
            });

            // Draw final result
            drawScatterPlot('mc-result-canvas', data, predictions, `${strategy.toUpperCase()} ${mc_t('finalDecision')}`);
            drawDecisionBoundary('mc-result-canvas', classifier, data);
            drawScatterPlot('mc-result-canvas', data, predictions, `${strategy.toUpperCase()} ${mc_t('finalDecision')}`);
        }, 0);
    }

    function displayComparison(data, classifiers) {
        const ovrPred = classifiers.ovr.predict(data.X);
        const ovoPred = classifiers.ovo.predict(data.X);
        const ovrAcc = calculateAccuracy(data.y, ovrPred);
        const ovoAcc = calculateAccuracy(data.y, ovoPred);

        // Create OvR binary classifiers
        let ovrClassifiersHTML = '';
        classifiers.ovr.classifiers.forEach((clf, idx) => {
            ovrClassifiersHTML += `
                <div class="binary-classifier-card-small">
                    <canvas id="mc-ovr-binary-${idx}" width="220" height="180"></canvas>
                    <p class="classifier-label-small">${clf.name}</p>
                </div>
            `;
        });

        // Create OvO binary classifiers
        let ovoClassifiersHTML = '';
        classifiers.ovo.classifiers.forEach((clf, idx) => {
            ovoClassifiersHTML += `
                <div class="binary-classifier-card-small">
                    <canvas id="mc-ovo-binary-${idx}" width="220" height="180"></canvas>
                    <p class="classifier-label-small">${clf.name}</p>
                </div>
            `;
        });

        chartsContainer.innerHTML = `
            <div class="comparison-container">
                <div class="strategy-section">
                    <h4 class="strategy-title">${mc_t('howOvrWorks')}</h4>
                    <p class="strategy-explanation">${mc_t('ovrExplanation', { n: 3 })}</p>
                    
                    <div class="binary-classifiers-grid-small">
                        ${ovrClassifiersHTML}
                    </div>
                    
                    <h5 style="margin-top: 1rem; text-align: center;">${mc_t('finalResult')}</h5>
                    <canvas id="mc-ovr-final" width="500" height="350" style="max-width: 100%; border: 1px solid #ddd; border-radius: 4px;"></canvas>
                    <p class="accuracy-display">${mc_t('accuracy')}: ${ovrAcc}%</p>
                </div>
                
                <div class="strategy-section">
                    <h4 class="strategy-title">${mc_t('howOvoWorks')}</h4>
                    <p class="strategy-explanation">${mc_t('ovoExplanation', { n: 3 })}</p>
                    
                    <div class="binary-classifiers-grid-small">
                        ${ovoClassifiersHTML}
                    </div>
                    
                    <h5 style="margin-top: 1rem; text-align: center;">${mc_t('finalResult')}</h5>
                    <canvas id="mc-ovo-final" width="500" height="350" style="max-width: 100%; border: 1px solid #ddd; border-radius: 4px;"></canvas>
                    <p class="accuracy-display">${mc_t('accuracy')}: ${ovoAcc}%</p>
                </div>
            </div>
        `;

        // Display comparison info
        classifiersInfo.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <h5>One-vs-Rest (OvR)</h5>
                    <p><strong>${mc_t('trainedModels')}:</strong> ${classifiers.ovr.classifiers.length}</p>
                    <ul style="font-size: 0.85em; margin-top: 0.5rem;">
                        ${classifiers.ovr.classifiers.map(clf => `<li>${clf.name}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h5>One-vs-One (OvO)</h5>
                    <p><strong>${mc_t('trainedModels')}:</strong> ${classifiers.ovo.classifiers.length}</p>
                    <ul style="font-size: 0.85em; margin-top: 0.5rem;">
                        ${classifiers.ovo.classifiers.map(clf => `<li>${clf.name}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        metricsInfo.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <h5>OvR</h5>
                    <p><strong>${mc_t('accuracy')}:</strong> ${ovrAcc}%</p>
                    <p style="font-size: 0.9em; margin-top: 0.5rem;">✓ Más eficiente (3 modelos)</p>
                </div>
                <div>
                    <h5>OvO</h5>
                    <p><strong>${mc_t('accuracy')}:</strong> ${ovoAcc}%</p>
                    <p style="font-size: 0.9em; margin-top: 0.5rem;">✓ Más robusto con clases desbalanceadas</p>
                </div>
            </div>
        `;

        // Draw visualizations
        setTimeout(() => {
            // Draw OvR binary classifiers
            classifiers.ovr.classifiers.forEach((clf, idx) => {
                const classInfo = { type: 'ovr', positiveClass: clf.class };
                drawBinaryClassifier(`mc-ovr-binary-${idx}`, data, clf, classInfo, clf.name);
            });

            // Draw OvO binary classifiers
            classifiers.ovo.classifiers.forEach((clf, idx) => {
                const classInfo = { type: 'ovo', class1: clf.class1, class2: clf.class2 };
                drawBinaryClassifier(`mc-ovo-binary-${idx}`, data, clf, classInfo, clf.name);
            });

            // Draw final results
            drawScatterPlot('mc-ovr-final', data, ovrPred, 'OvR Final');
            drawDecisionBoundary('mc-ovr-final', classifiers.ovr, data);
            drawScatterPlot('mc-ovr-final', data, ovrPred, 'OvR Final');

            drawScatterPlot('mc-ovo-final', data, ovoPred, 'OvO Final');
            drawDecisionBoundary('mc-ovo-final', classifiers.ovo, data);
            drawScatterPlot('mc-ovo-final', data, ovoPred, 'OvO Final');
        }, 0);
    }
});
