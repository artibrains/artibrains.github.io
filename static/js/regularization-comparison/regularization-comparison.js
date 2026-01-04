// Regularization Comparison Visualization
// Compares L1 (Lasso), L2 (Ridge), and Elastic Net regularization

// --- Translation System ---
const regTranslations = {
    es: {
        appInitialized: "REG: Aplicación de comparación de regularización inicializada.",
        dataGenerated: "REG: Datos generados - {samples} muestras, {features} características.",
        trainingStarted: "REG: Entrenando modelo con regularización {type}...",
        trainingComplete: "REG: Entrenamiento completado. MSE: {mse}",
        featureName: "Característica {num}",
        weight: "Peso",
        l1Reg: "L1 (Lasso)",
        l2Reg: "L2 (Ridge)",
        elasticNet: "Elastic Net",
        noReg: "Sin regularización",
        trainMSE: "MSE Entrenamiento",
        testMSE: "MSE Prueba",
        nonZeroFeatures: "Características no cero",
        totalWeightSum: "Suma total de pesos",
        feature: "Característica",
        relevant: "Relevante",
        irrelevant: "Irrelevante"
    },
    en: {
        appInitialized: "REG: Regularization comparison application initialized.",
        dataGenerated: "REG: Data generated - {samples} samples, {features} features.",
        trainingStarted: "REG: Training model with {type} regularization...",
        trainingComplete: "REG: Training completed. MSE: {mse}",
        featureName: "Feature {num}",
        weight: "Weight",
        l1Reg: "L1 (Lasso)",
        l2Reg: "L2 (Ridge)",
        elasticNet: "Elastic Net",
        noReg: "No regularization",
        trainMSE: "Training MSE",
        testMSE: "Test MSE",
        nonZeroFeatures: "Non-zero features",
        totalWeightSum: "Total weight sum",
        feature: "Feature",
        relevant: "Relevant",
        irrelevant: "Irrelevant"
    }
};

let regLang = 'en';

function reg_t(key, params = {}) {
    const currentLang = window.regularizationLanguage || regLang;
    let text = (regTranslations[currentLang] && regTranslations[currentLang][key]) || regTranslations['en'][key] || key;
    Object.keys(params).forEach(k => {
        text = text.replace(`{${k}}`, params[k]);
    });
    return text;
}

// Terminal buffering helper so logs appear even if terminal initializes later
const _reg_terminal_queue = [];
let _reg_terminal_flushed = false;
function _reg_flushTerminal() {
    if (window.CustomTerminal && window.CustomTerminal.initialized) {
        while (_reg_terminal_queue.length) {
            const msg = _reg_terminal_queue.shift();
            try { window.CustomTerminal.write(msg); } catch (e) { console.log('[REG-T] flush failed', e); }
        }
        _reg_terminal_flushed = true;
        return true;
    }
    return false;
}

// Try flushing if terminal becomes ready
window.addEventListener('CustomTerminalReady', () => {
    _reg_flushTerminal();
});

function writeToTerminal(message) {
    // Always log to console too so developers can see messages even without terminal
    console.log('[REG-T] ' + message);
    if (_reg_terminal_flushed || (window.CustomTerminal && window.CustomTerminal.initialized)) {
        try { window.CustomTerminal && window.CustomTerminal.write(message); } catch (e) { /* ignore */ }
    } else {
        _reg_terminal_queue.push(message);
    }
}

// Linear Regression with Regularization
class RegularizedRegression {
    constructor(regType = 'l2', lambda = 0.5, alpha = 0.5) {
        this.regType = regType;
        this.lambda = lambda;
        this.alpha = alpha; // For elastic net
        this.weights = null;
        this.bias = 0;
    }

    fit(X, y, learningRate = 0.05, epochs = 2000) {
        const m = X.length;
        const n = X[0].length;

        // Initialize weights
        this.weights = Array(n).fill(0).map(() => Math.random() * 0.01);
        this.bias = 0;

        // Gradient descent with regularization (uses proximal step for L1)
        for (let epoch = 0; epoch < epochs; epoch++) {
            // Compute predictions
            const predictions = X.map(sample => this.predict([sample])[0]);

            // Compute gradients
            const dw = Array(n).fill(0);
            let db = 0;

            for (let i = 0; i < m; i++) {
                const error = predictions[i] - y[i];
                db += error;
                for (let j = 0; j < n; j++) {
                    dw[j] += error * X[i][j];
                }
            }

            // Update weights
            for (let j = 0; j < n; j++) {
                // Average gradient
                let grad = dw[j] / m;

                // L2 contribution (scaled by 1/m)
                if (this.regType === 'l2') {
                    grad += (this.lambda / m) * this.weights[j];
                } else if (this.regType === 'elasticnet') {
                    // Elastic Net: L2 part in gradient, L1 handled by proximal operator below
                    grad += (this.lambda * (1 - this.alpha) / m) * this.weights[j];
                }

                // Gradient step
                const temp = this.weights[j] - learningRate * grad;

                // Proximal (soft-threshold) step for L1 and ElasticNet L1 part
                if (this.regType === 'l1') {
                    const threshold = learningRate * (this.lambda / m);
                    if (Math.abs(temp) <= threshold) {
                        this.weights[j] = 0;
                    } else {
                        this.weights[j] = Math.sign(temp) * (Math.abs(temp) - threshold);
                    }
                } else if (this.regType === 'elasticnet') {
                    const threshold = learningRate * (this.lambda * this.alpha / m);
                    if (Math.abs(temp) <= threshold) {
                        this.weights[j] = 0;
                    } else {
                        this.weights[j] = Math.sign(temp) * (Math.abs(temp) - threshold);
                    }
                } else {
                    // No L1 -> just take the gradient step
                    this.weights[j] = temp;
                }
            }

            // Update bias (no regularization applied to bias)
            this.bias -= learningRate * (db / m);
        }
    }

    predict(X) {
        return X.map(sample => {
            let pred = this.bias;
            for (let j = 0; j < sample.length; j++) {
                pred += this.weights[j] * sample[j];
            }
            return pred;
        });
    }

    mse(X, y) {
        const predictions = this.predict(X);
        let sumSquaredError = 0;
        for (let i = 0; i < y.length; i++) {
            const error = predictions[i] - y[i];
            sumSquaredError += error * error;
        }
        return sumSquaredError / y.length;
    }

    getNonZeroCount() {
        return this.weights.filter(w => Math.abs(w) > 1e-4).length;
    }

    getTotalWeightSum() {
        return this.weights.reduce((sum, w) => sum + Math.abs(w), 0);
    }

    getL2Norm() {
        return Math.sqrt(this.weights.reduce((s, w) => s + w * w, 0));
    }
} 

// Data generation
function generateRegressionData(numSamples = 100, numFeatures = 10, relevantFeatures = 5, noise = 0.5) {
    const X = [];
    const y = [];
    
    // True weights (only first relevantFeatures are non-zero)
    const trueWeights = Array(numFeatures).fill(0);
    for (let i = 0; i < relevantFeatures; i++) {
        trueWeights[i] = (Math.random() - 0.5) * 4;
    }

    for (let i = 0; i < numSamples; i++) {
        const sample = [];
        let target = 0;
        
        for (let j = 0; j < numFeatures; j++) {
            const value = Math.random() * 2 - 1; // Random feature value
            sample.push(value);
            target += trueWeights[j] * value;
        }
        
        // Add noise
        target += (Math.random() - 0.5) * noise;
        
        X.push(sample);
        y.push(target);
    }

    return { X, y, trueWeights };
}

// Split data into train and test
function trainTestSplit(X, y, testSize = 0.2) {
    const n = X.length;
    const testN = Math.floor(n * testSize);
    
    const indices = Array(n).fill(0).map((_, i) => i);
    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    const testIndices = indices.slice(0, testN);
    const trainIndices = indices.slice(testN);
    
    return {
        XTrain: trainIndices.map(i => X[i]),
        yTrain: trainIndices.map(i => y[i]),
        XTest: testIndices.map(i => X[i]),
        yTest: testIndices.map(i => y[i])
    };
}

// Chart instance
let weightsChart = null;

// Create weights comparison chart
function createWeightsChart(labels, datasets) {
    const ctx = document.getElementById('reg-data-chart');

    // If Chart.js is not available (offline or failed to load), render a simple HTML fallback
    if (typeof Chart === 'undefined') {
        renderFallbackBarChart(labels, datasets);
        return;
    }
    
    // Ensure canvas is visible and remove fallback if present
    ctx.style.display = '';
    const fb = document.getElementById('reg-data-fallback');
    if (fb) fb.remove();

    if (weightsChart) {
        weightsChart.destroy();
    }

    weightsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: reg_t('weight')
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: reg_t('feature')
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(4);
                        }
                    }
                }
            }
        }
    });
}

// Fallback renderer when Chart.js is not available (e.g., offline)
function renderFallbackBarChart(labels, datasets) {
    const canvas = document.getElementById('reg-data-chart');
    if (!canvas) return;
    // Hide canvas and show fallback container
    canvas.style.display = 'none';
    let fallback = document.getElementById('reg-data-fallback');
    if (!fallback) {
        fallback = document.createElement('div');
        fallback.id = 'reg-data-fallback';
        fallback.className = 'fallback-chart';
        canvas.parentNode.appendChild(fallback);
    }
    fallback.innerHTML = '';
    // compute max absolute value
    const allValues = [];
    datasets.forEach(ds => (ds.data || []).forEach(v => allValues.push(Math.abs(v))));
    const max = Math.max(...allValues, 1);
    // legend
    let legendHtml = '<div class="fc-legend">';
    datasets.forEach(ds => {
        legendHtml += '<span class="fc-legend-item"><span class="fc-swatch" style="background:' + (ds.backgroundColor || '#888') + '"></span> ' + ds.label + '</span>';
    });
    legendHtml += '</div>';
    // rows
    let rowsHtml = '<div class="fc-rows">';
    labels.forEach((label, i) => {
        rowsHtml += '<div class="fc-row"><div class="fc-label">' + label + '</div><div class="fc-bars">';
        datasets.forEach(ds => {
            const v = Math.abs((ds.data || [])[i] || 0);
            const pct = Math.round((v / max) * 100);
            rowsHtml += '<div class="fc-bar" title="' + ds.label + ': ' + ((ds.data || [])[i] || 0).toFixed(4) + '"><div class="fc-fill" style="width:' + pct + '%; background:' + (ds.backgroundColor || '#888') + ';"></div></div>';
        });
        rowsHtml += '</div></div>';
    });
    rowsHtml += '</div>';
    fallback.innerHTML = legendHtml + rowsHtml;
}

// DOM initialization
document.addEventListener('DOMContentLoaded', () => {
    regLang = window.regularizationLanguage || 'en';
    writeToTerminal(reg_t('appInitialized'));

    const typeSelect = document.getElementById('reg-type-select');
    const lambdaSlider = document.getElementById('reg-lambda-slider');
    const lambdaValue = document.getElementById('reg-lambda-value');
    const alphaControl = document.getElementById('reg-alpha-control');
    const alphaSlider = document.getElementById('reg-alpha-slider');
    const alphaValue = document.getElementById('reg-alpha-value');
    const featuresSlider = document.getElementById('reg-features-slider');
    const featuresValue = document.getElementById('reg-features-value');
    const generateBtn = document.getElementById('reg-generate-btn');
    const visualizationContainer = document.getElementById('reg-visualization-container');
    const weightsContainer = document.getElementById('reg-weights-container');
    const metricsContainer = document.getElementById('reg-metrics-container');
    const comparisonContainer = document.getElementById('reg-comparison-container');

    let currentData = null;
    let models = {};

    // Update slider values
    lambdaSlider.addEventListener('input', (e) => {
        lambdaValue.textContent = parseFloat(e.target.value).toFixed(2);
        if (currentData) {
            trainModels(); // Real-time update
        }
    });

    alphaSlider.addEventListener('input', (e) => {
        alphaValue.textContent = parseFloat(e.target.value).toFixed(2);
        if (currentData && typeSelect.value === 'elasticnet') {
            trainModels(); // Real-time update
        }
    });

    featuresSlider.addEventListener('input', (e) => {
        featuresValue.textContent = e.target.value;
    });

    // Show/hide alpha control
    typeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'elasticnet') {
            alphaControl.classList.remove('hidden');
        } else {
            alphaControl.classList.add('hidden');
        }
        
        if (currentData) {
            trainModels(); // Real-time update
        }
    });

    // Generate data
    generateBtn.addEventListener('click', () => {
        const numFeatures = parseInt(featuresSlider.value);
        const relevantFeatures = Math.ceil(numFeatures / 2);
        
        const data = generateRegressionData(100, numFeatures, relevantFeatures, 1.0);
        const split = trainTestSplit(data.X, data.y, 0.2);
        
        currentData = {
            ...split,
            trueWeights: data.trueWeights,
            numFeatures: numFeatures
        };
        
        writeToTerminal(reg_t('dataGenerated', { 
            samples: data.X.length, 
            features: numFeatures 
        }));
        
        visualizationContainer.classList.remove('hidden');
        
        trainModels();
    });

    // Training runs automatically when parameters or data change; no separate train button.

    function trainModels() {
        if (!currentData) return;

        const lambda = parseFloat(lambdaSlider.value);
        const alpha = parseFloat(alphaSlider.value);
        const regType = typeSelect.value;

        models = {};

        if (regType === 'compare') {
            // Train all models
            comparisonContainer.classList.remove('hidden');
            
            const types = ['none', 'l1', 'l2', 'elasticnet'];
            types.forEach(type => {
                writeToTerminal(reg_t('trainingStarted', { type: type.toUpperCase() }));
                const model = new RegularizedRegression(type, lambda, alpha);
                model.fit(currentData.XTrain, currentData.yTrain);
                const testMSE = model.mse(currentData.XTest, currentData.yTest);
                writeToTerminal(reg_t('trainingComplete', { mse: testMSE.toFixed(4) }));

                // Diagnostic logging for each model
                const l1norm = model.getTotalWeightSum().toFixed(4);
                const l2norm = model.getL2Norm().toFixed(4);
                const nonZero = model.getNonZeroCount();
                writeToTerminal(`REG: ${type.toUpperCase()} -> L1 |${l1norm}| L2 |${l2norm}| non-zero |${nonZero}|`);

                models[type] = model;
            });

            // Quick similarity check: compare pairwise max absolute differences between weight vectors
            (function() {
                const th = 1e-3; // threshold for near-equality
                let allSimilar = true;
                const typesList = types;
                for (let i = 0; i < typesList.length; i++) {
                    for (let j = i + 1; j < typesList.length; j++) {
                        const a = models[typesList[i]].weights;
                        const b = models[typesList[j]].weights;
                        let maxDiff = 0;
                        for (let k = 0; k < a.length; k++) {
                            maxDiff = Math.max(maxDiff, Math.abs((a[k] || 0) - (b[k] || 0)));
                        }
                        writeToTerminal(`REG: max diff ${typesList[i]} vs ${typesList[j]} = ${maxDiff.toFixed(6)}`);
                        if (maxDiff > th) allSimilar = false;
                    }
                }
                if (allSimilar) {
                    writeToTerminal('REG: Warning: all models are extremely similar. This may indicate an implementation issue or hyperparameters that make regularization ineffective.');
                }
            })();
            
            displayComparison();
        } else {
            // Train single model
            comparisonContainer.classList.add('hidden');
            
            writeToTerminal(reg_t('trainingStarted', { type: regType.toUpperCase() }));
            const model = new RegularizedRegression(regType, lambda, alpha);
            model.fit(currentData.XTrain, currentData.yTrain);
            const testMSE = model.mse(currentData.XTest, currentData.yTest);
            writeToTerminal(reg_t('trainingComplete', { mse: testMSE.toFixed(4) }));
            models[regType] = model;
            
            displaySingleModel(regType);
        }
    }

    function displaySingleModel(regType) {
        const model = models[regType];
        
        // Create chart
        const labels = Array(currentData.numFeatures).fill(0).map((_, i) => 
            reg_t('featureName', { num: i + 1 })
        );
        
        const datasets = [{
            label: getRegTypeName(regType),
            data: model.weights,
            backgroundColor: getRegTypeColor(regType),
            borderColor: getRegTypeColor(regType),
            borderWidth: 1
        }];
        
        // Add true weights for reference
        datasets.push({
            label: regLang === 'es' ? 'Pesos verdaderos' : 'True weights',
            data: currentData.trueWeights,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 1
        });
        
        createWeightsChart(labels, datasets);
        
        // Display weights table
        displayWeightsTable([{ type: regType, model: model }]);
        
        // Display metrics
        displayMetrics([{ type: regType, model: model }]);
    }

    function displayComparison() {
        const types = ['none', 'l1', 'l2', 'elasticnet'];
        
        // Create chart
        const labels = Array(currentData.numFeatures).fill(0).map((_, i) => 
            reg_t('featureName', { num: i + 1 })
        );
        
        const datasets = types.map(type => ({
            label: getRegTypeName(type),
            data: models[type].weights,
            backgroundColor: getRegTypeColor(type),
            borderColor: getRegTypeColor(type),
            borderWidth: 1
        }));
        
        // Add true weights
        datasets.push({
            label: regLang === 'es' ? 'Pesos verdaderos' : 'True weights',
            data: currentData.trueWeights,
            type: 'line',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(0, 0, 0, 0.8)',
            borderWidth: 2,
            pointRadius: 4,
            fill: false
        });
        
        createWeightsChart(labels, datasets);
        
        // Display comparison table
        const modelsArray = types.map(type => ({ type, model: models[type] }));
        displayWeightsTable(modelsArray);
        displayMetrics(modelsArray);
        displayComparisonSummary(modelsArray);
    }

    function displayWeightsTable(modelsArray) {
        let html = '<div class="weights-table-container"><table class="weights-table">';
        html += '<thead><tr><th>' + reg_t('feature') + '</th>';
        
        modelsArray.forEach(({ type }) => {
            html += '<th>' + getRegTypeName(type) + '</th>';
        });
        html += '</tr></thead><tbody>';
        
        for (let i = 0; i < currentData.numFeatures; i++) {
            const isRelevant = Math.abs(currentData.trueWeights[i]) > 0.01;
            html += '<tr>';
            html += '<td><strong>' + reg_t('featureName', { num: i + 1 }) + '</strong> ';
            html += '<span class="feature-tag ' + (isRelevant ? 'relevant' : 'irrelevant') + '">';
            html += isRelevant ? reg_t('relevant') : reg_t('irrelevant');
            html += '</span></td>';
            
            modelsArray.forEach(({ model }) => {
                const weight = model.weights[i];
                const absWeight = Math.abs(weight);
                const isZero = absWeight < 0.0001;
                html += '<td class="' + (isZero ? 'weight-zero' : '') + '">';
                html += weight.toFixed(4);
                html += '</td>';
            });
            html += '</tr>';
        }
        
        html += '</tbody></table></div>';
        weightsContainer.innerHTML = html;
    }

    function displayMetrics(modelsArray) {
        let html = '<div class="metrics-grid">';
        
        modelsArray.forEach(({ type, model }) => {
            const trainMSE = model.mse(currentData.XTrain, currentData.yTrain);
            const testMSE = model.mse(currentData.XTest, currentData.yTest);
            const nonZero = model.getNonZeroCount();
            const totalWeight = model.getTotalWeightSum();
            
            html += '<div class="metric-card">';
            html += '<h5>' + getRegTypeName(type) + '</h5>';
            html += '<p><strong>' + reg_t('trainMSE') + ':</strong> ' + trainMSE.toFixed(4) + '</p>';
            html += '<p><strong>' + reg_t('testMSE') + ':</strong> ' + testMSE.toFixed(4) + '</p>';
            html += '<p><strong>' + reg_t('nonZeroFeatures') + ':</strong> ' + nonZero + ' / ' + currentData.numFeatures + '</p>';
            html += '<p><strong>' + reg_t('totalWeightSum') + ':</strong> ' + totalWeight.toFixed(4) + '</p>';
            html += '</div>';
        });
        
        html += '</div>';
        metricsContainer.innerHTML = html;
    }

    function displayComparisonSummary(modelsArray) {
        let html = '<div class="comparison-summary">';
        html += '<table class="comparison-table">';
        html += '<thead><tr>';
        html += '<th>' + (regLang === 'es' ? 'Tipo' : 'Type') + '</th>';
        html += '<th>' + reg_t('testMSE') + '</th>';
        html += '<th>' + reg_t('nonZeroFeatures') + '</th>';
        html += '<th>' + (regLang === 'es' ? 'Características relevantes capturadas' : 'Relevant features captured') + '</th>';
        html += '</tr></thead><tbody>';
        
        const relevantCount = currentData.trueWeights.filter(w => Math.abs(w) > 0.01).length;
        
        modelsArray.forEach(({ type, model }) => {
            const testMSE = model.mse(currentData.XTest, currentData.yTest);
            const nonZero = model.getNonZeroCount();
            
            // Count how many relevant features have non-zero weights
            let relevantCaptured = 0;
            for (let i = 0; i < currentData.numFeatures; i++) {
                if (Math.abs(currentData.trueWeights[i]) > 0.01 && Math.abs(model.weights[i]) > 0.0001) {
                    relevantCaptured++;
                }
            }
            
            html += '<tr>';
            html += '<td><strong>' + getRegTypeName(type) + '</strong></td>';
            html += '<td>' + testMSE.toFixed(4) + '</td>';
            html += '<td>' + nonZero + ' / ' + currentData.numFeatures + '</td>';
            html += '<td>' + relevantCaptured + ' / ' + relevantCount + '</td>';
            html += '</tr>';
        });
        
        html += '</tbody></table></div>';
        comparisonContainer.querySelector('#reg-comparison-content').innerHTML = html;
    }

    function getRegTypeName(type) {
        const names = {
            'none': reg_t('noReg'),
            'l1': reg_t('l1Reg'),
            'l2': reg_t('l2Reg'),
            'elasticnet': reg_t('elasticNet')
        };
        return names[type] || type;
    }

    function getRegTypeColor(type) {
        const colors = {
            'none': 'rgba(128, 128, 128, 0.6)',
            'l1': 'rgba(255, 99, 132, 0.6)',
            'l2': 'rgba(54, 162, 235, 0.6)',
            'elasticnet': 'rgba(75, 192, 192, 0.6)'
        };
        return colors[type] || 'rgba(200, 200, 200, 0.6)';
    }

    // Set default selection and generate data on page load
    try {
        typeSelect.value = 'compare';
        typeSelect.dispatchEvent(new Event('change'));
        // Generate default data so the demo is visible immediately
        generateBtn.click();
    } catch (e) {
        // If any of the elements are not present for some reason, ignore
        console.warn('Regularization demo: could not auto-generate data on load', e);
    }
});
