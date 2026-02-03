// Multiclass Confusion Matrix Interactive Demo

(function () {
    'use strict';

    const lang = window.confusionMatrixLanguage || 'es';

    // Class names
    const classNames = {
        es: ['Facturación', 'Soporte técnico', 'Cuenta'],
        en: ['Billing', 'Technical', 'Account']
    };

    // State
    let confusionMatrix = [];
    let selectedClass = 0;
    // Default to the first category (TP) per user's request
    let currentHighlight = 'tp';

    // DOM Elements
    const accuracySlider = document.getElementById('cm-accuracy-slider');
    const accuracyValue = document.getElementById('cm-accuracy-value');
    const samplesSlider = document.getElementById('cm-samples-slider');
    const samplesValue = document.getElementById('cm-samples-value');
    const generateBtn = document.getElementById('cm-generate-btn');
    const matrixGrid = document.getElementById('confusion-matrix-grid');
    const classSelector = document.getElementById('class-selector');
    const highlightSelect = document.getElementById('cm-highlight-select');
    const modal = document.getElementById('metric-info-modal');
    const modalClose = document.querySelector('.info-modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalFormula = document.getElementById('modal-formula');
    const modalExplanation = document.getElementById('modal-explanation');

    // Helper: update active state on metric cards
    function updateMetricCardActive() {
        document.querySelectorAll('.metric-card').forEach(card => {
            const m = card.dataset.metric;
            card.classList.toggle('active', m === currentHighlight);
        });
    }

    // Helper: toggle/set highlight programmatically
    function setHighlight(metric) {
        // Only allow toggling for matrix-relevant metrics
        const allowed = new Set(['tp', 'fp', 'fn', 'tn']);
        if (!allowed.has(metric)) return;

        if (currentHighlight === metric) {
            // If the clicked metric is already active, revert to default 'tp'
            currentHighlight = 'tp';
            if (highlightSelect) highlightSelect.value = 'tp';
        } else {
            currentHighlight = metric;
            if (highlightSelect) highlightSelect.value = metric;
        }

        // Keep everything in sync and notify any listeners
        updateMatrixHighlight();
        updateMetricCardActive();
        if (highlightSelect) highlightSelect.dispatchEvent(new Event('change'));
    }

    // Initialize
    function init() {
        setupEventListeners();
        generateMatrix();
        createClassSelector();
        // Ensure the highlight select matches the default
        if (highlightSelect) highlightSelect.value = currentHighlight;
        updateDisplay();
        // Apply the default highlight visually on load
        setTimeout(() => {
            // use setHighlight so select, matrix and cards are all synchronized
            setHighlight(currentHighlight);
        }, 0);
    }

    function setupEventListeners() {
        accuracySlider.addEventListener('input', (e) => {
            accuracyValue.textContent = e.target.value + '%';
        });

        samplesSlider.addEventListener('input', (e) => {
            samplesValue.textContent = e.target.value;
        });

        generateBtn.addEventListener('click', () => {
            generateMatrix();
            updateDisplay();
        });

        highlightSelect.addEventListener('change', (e) => {
            currentHighlight = e.target.value;
            updateMatrixHighlight();
            // Sync visual active state on metric cards
            updateMetricCardActive();
        });

        // Modal event listeners
        document.querySelectorAll('.info-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                // Prevent the click from bubbling up to the metric-card container
                e.stopPropagation();
                const metricType = icon.dataset.info || e.target.dataset.info;
                showModal(metricType);
            });
        });

        // Clicking a metric card highlights that metric in the matrix
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('click', () => {
                const metric = card.dataset.metric;
                // Only allow 'tp','fp','fn','tn' to control matrix highlighting
                if (['tp', 'fp', 'fn', 'tn'].includes(metric)) {
                    setHighlight(metric);
                }
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('show');
                modal.style.display = 'none';
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    modal.style.display = 'none';
                }
            });
        }
    }

    // Generate confusion matrix based on accuracy
    function generateMatrix() {
        const accuracy = parseInt(accuracySlider.value) / 100;
        const samplesPerClass = parseInt(samplesSlider.value);
        const numClasses = classNames[lang].length;

        // Initialize matrix
        confusionMatrix = Array(numClasses).fill(null).map(() =>
            Array(numClasses).fill(0)
        );

        // Generate matrix with desired accuracy
        for (let i = 0; i < numClasses; i++) {
            const correctPredictions = Math.round(samplesPerClass * accuracy);
            const incorrectPredictions = samplesPerClass - correctPredictions;

            // Diagonal (correct predictions)
            confusionMatrix[i][i] = correctPredictions;

            // Distribute errors among other classes
            if (incorrectPredictions > 0) {
                const errorsPerClass = Math.floor(incorrectPredictions / (numClasses - 1));
                const remainder = incorrectPredictions % (numClasses - 1);

                let errorIndex = 0;
                for (let j = 0; j < numClasses; j++) {
                    if (i !== j) {
                        confusionMatrix[i][j] = errorsPerClass + (errorIndex < remainder ? 1 : 0);
                        errorIndex++;
                    }
                }
            }
        }

        // Add some randomness for realism
        for (let i = 0; i < numClasses; i++) {
            for (let j = 0; j < numClasses; j++) {
                if (i !== j && confusionMatrix[i][j] > 0) {
                    const variance = Math.floor(Math.random() * 5) - 2;
                    const newValue = Math.max(0, confusionMatrix[i][j] + variance);
                    confusionMatrix[i][j] = newValue;
                }
            }
        }
    }

    // Create class selector buttons
    function createClassSelector() {
        classSelector.innerHTML = '';
        classNames[lang].forEach((name, index) => {
            const btn = document.createElement('button');
            btn.className = 'class-btn' + (index === selectedClass ? ' active' : '');
            btn.textContent = name;
            btn.addEventListener('click', () => {
                selectedClass = index;
                updateDisplay();
                document.querySelectorAll('.class-btn').forEach((b, i) => {
                    b.classList.toggle('active', i === index);
                });
            });
            classSelector.appendChild(btn);
        });
    }

    // Render confusion matrix using CSS Grid
    function renderMatrix() {
        const classes = classNames[lang];
        const numClasses = classes.length;

        // Set grid template columns: 1 for row header + N for classes
        matrixGrid.style.gridTemplateColumns = `auto repeat(${numClasses}, 1fr)`;

        let html = '';

        // 1. Top-Left Corner (Empty or Labels)
        html += `<div class="cm-cell cm-header" style="grid-column: 1; grid-row: 1;"></div>`;

        // 2. Top Header Row (Prediction Labels)
        classes.forEach((name, index) => {
            html += `<div class="cm-cell cm-header" style="grid-column: ${index + 2}; grid-row: 1;">
                        <div style="font-size: 0.8em; color: var(--demo-neutral);">${lang === 'es' ? 'Predicción' : 'Pred'}</div>
                        ${name}
                     </div>`;
        });

        // 3. Data Rows
        for (let i = 0; i < numClasses; i++) {
            // Row Header (Actual Label)
            html += `<div class="cm-cell cm-header" style="grid-column: 1; grid-row: ${i + 2};">
                        <div style="font-size: 0.8em; color: var(--demo-neutral);">${lang === 'es' ? 'Real' : 'Actual'}</div>
                        ${classes[i]}
                     </div>`;

            // Matrix Cells
            for (let j = 0; j < numClasses; j++) {
                const isDiagonal = i === j;
                // We use data attributes to identify cells for highlighting
                html += `<div class="cm-cell cm-value" data-row="${i}" data-col="${j}" style="grid-column: ${j + 2}; grid-row: ${i + 2}; cursor: pointer;">
                            ${confusionMatrix[i][j]}
                         </div>`;
            }
        }

        matrixGrid.innerHTML = html;

        // Add click events to cells
        document.querySelectorAll('.cm-value').forEach(cell => {
            cell.addEventListener('click', () => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                // If user clicks a cell, maybe select the class of that row?
                // Or just let them select via buttons. 
                // Let's select the row class (Actual) as the class of interest
                selectedClass = row;
                updateDisplay();
                document.querySelectorAll('.class-btn').forEach((b, i) => {
                    b.classList.toggle('active', i === row);
                });
            });
        });
    }

    // Calculate metrics for selected class
    function calculateMetrics(classIndex) {
        const numClasses = classNames[lang].length;

        // TP: diagonal element
        const tp = confusionMatrix[classIndex][classIndex];

        // FP: sum of column (excluding diagonal)
        let fp = 0;
        for (let i = 0; i < numClasses; i++) {
            if (i !== classIndex) {
                fp += confusionMatrix[i][classIndex];
            }
        }

        // FN: sum of row (excluding diagonal)
        let fn = 0;
        for (let j = 0; j < numClasses; j++) {
            if (j !== classIndex) {
                fn += confusionMatrix[classIndex][j];
            }
        }

        // TN: sum of all other cells
        let tn = 0;
        for (let i = 0; i < numClasses; i++) {
            for (let j = 0; j < numClasses; j++) {
                if (i !== classIndex && j !== classIndex) {
                    tn += confusionMatrix[i][j];
                }
            }
        }

        // Calculate derived metrics
        const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
        const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
        const f1 = precision + recall > 0 ? 2 * precision * recall / (precision + recall) : 0;

        return { tp, fp, fn, tn, precision, recall, f1 };
    }

    // Calculate global metrics
    function calculateGlobalMetrics() {
        const numClasses = classNames[lang].length;
        let totalCorrect = 0;
        let totalSamples = 0;
        let sumPrecision = 0;
        let sumRecall = 0;
        let sumF1 = 0;

        for (let i = 0; i < numClasses; i++) {
            const metrics = calculateMetrics(i);
            sumPrecision += metrics.precision;
            sumRecall += metrics.recall;
            sumF1 += metrics.f1;
            totalCorrect += metrics.tp;
        }

        // Calculate total samples
        for (let i = 0; i < numClasses; i++) {
            for (let j = 0; j < numClasses; j++) {
                totalSamples += confusionMatrix[i][j];
            }
        }

        const accuracy = totalSamples > 0 ? totalCorrect / totalSamples : 0;
        const macroPrecision = sumPrecision / numClasses;
        const macroRecall = sumRecall / numClasses;
        const macroF1 = sumF1 / numClasses;

        return { accuracy, macroPrecision, macroRecall, macroF1, totalCorrect, totalSamples };
    }

    // Update all displays
    function updateDisplay() {
        renderMatrix();
        updateMetricsDisplay();
        updateGlobalMetrics();
        updateMatrixHighlight();
    }

    // Update metrics display for selected class
    function updateMetricsDisplay() {
        const metrics = calculateMetrics(selectedClass);

        // Update basic metrics
        document.getElementById('metric-tp').textContent = metrics.tp;
        document.getElementById('metric-fp').textContent = metrics.fp;
        document.getElementById('metric-fn').textContent = metrics.fn;
        document.getElementById('metric-tn').textContent = metrics.tn;

        // Update performance metrics
        document.getElementById('metric-precision').textContent = metrics.precision.toFixed(3);
        document.getElementById('metric-recall').textContent = metrics.recall.toFixed(3);
        document.getElementById('metric-f1').textContent = metrics.f1.toFixed(3);
    }

    // Update global metrics
    function updateGlobalMetrics() {
        const global = calculateGlobalMetrics();

        document.getElementById('global-accuracy').textContent = (global.accuracy * 100).toFixed(1) + '%';
        document.getElementById('global-macro-precision').textContent = global.macroPrecision.toFixed(3);
        document.getElementById('global-macro-recall').textContent = global.macroRecall.toFixed(3);
        document.getElementById('global-macro-f1').textContent = global.macroF1.toFixed(3);
    }

    // Update matrix highlighting
    function updateMatrixHighlight() {
        const classIndex = selectedClass;

        document.querySelectorAll('.cm-value').forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            // Clear previous highlight classes (including the combined error class)
            cell.classList.remove('highlight-tp', 'highlight-fp', 'highlight-fn', 'highlight-tn', 'highlight-error');

            if (currentHighlight === 'tp') {
                // Highlight single diagonal cell(s)
                if (row === classIndex && col === classIndex) {
                    cell.classList.add('highlight-tp');
                }
            } else if (currentHighlight === 'fp') {
                // FP: Predicted as classIndex (col == classIndex), but Actual is not classIndex (row != classIndex)
                if (col === classIndex && row !== classIndex) {
                    cell.classList.add('highlight-error');
                }
            } else if (currentHighlight === 'fn') {
                // FN: Actual is classIndex (row == classIndex), but Predicted is not classIndex (col != classIndex)
                if (row === classIndex && col !== classIndex) {
                    cell.classList.add('highlight-error');
                }
            } else if (currentHighlight === 'tn') {
                // TN: Actual is not classIndex AND Predicted is not classIndex
                if (row !== classIndex && col !== classIndex) {
                    cell.classList.add('highlight-tn');
                }
            }
        });
    }

    // Show modal with metric information
    function showModal(metricType) {
        const metrics = calculateMetrics(selectedClass);
        const className = classNames[lang][selectedClass];
        const rowIndex = selectedClass;

        const metricInfo = {
            tp: {
                title: lang === 'es' ? 'Verdaderos Positivos (VP)' : 'True Positives (TP)',
                formula: `C[${rowIndex}][${rowIndex}] = ${metrics.tp}`,
                explanation: lang === 'es'
                    ? `Casos de la clase "${className}" que fueron correctamente clasificados como "${className}". Este es el elemento diagonal de la matriz para la clase seleccionada.`
                    : `Cases of class "${className}" that were correctly classified as "${className}". This is the diagonal element of the matrix for the selected class.`
            },
            fp: {
                title: lang === 'es' ? 'Falsos Positivos (FP)' : 'False Positives (FP)',
                formula: lang === 'es'
                    ? `Σ(columna ${rowIndex}, i≠${rowIndex}) = ${metrics.fp}`
                    : `Σ(column ${rowIndex}, i≠${rowIndex}) = ${metrics.fp}`,
                explanation: lang === 'es'
                    ? `Casos de otras clases que fueron incorrectamente clasificados como "${className}". Estos son los valores en la columna ${rowIndex} excluyendo la diagonal.`
                    : `Cases from other classes that were incorrectly classified as "${className}". These are the values in column ${rowIndex} excluding the diagonal.`
            },
            fn: {
                title: lang === 'es' ? 'Falsos Negativos (FN)' : 'False Negatives (FN)',
                formula: lang === 'es'
                    ? `Σ(fila ${rowIndex}, j≠${rowIndex}) = ${metrics.fn}`
                    : `Σ(row ${rowIndex}, j≠${rowIndex}) = ${metrics.fn}`,
                explanation: lang === 'es'
                    ? `Casos reales de "${className}" que fueron incorrectamente clasificados como otras clases. Estos son los valores en la fila ${rowIndex} excluyendo la diagonal.`
                    : `Actual cases of "${className}" that were incorrectly classified as other classes. These are the values in row ${rowIndex} excluding the diagonal.`
            },
            tn: {
                title: lang === 'es' ? 'Verdaderos Negativos (VN)' : 'True Negatives (TN)',
                formula: lang === 'es'
                    ? `Σ(resto de celdas) = ${metrics.tn}`
                    : `Σ(other cells) = ${metrics.tn}`,
                explanation: lang === 'es'
                    ? `Casos de otras clases que fueron correctamente clasificados como otras clases (no como "${className}"). Estos son todos los elementos que no están en la fila ni columna ${rowIndex}.`
                    : `Cases from other classes that were correctly classified as other classes (not as "${className}"). These are all elements that are not in row or column ${rowIndex}.`
            },
            precision: {
                title: lang === 'es' ? 'Precisión (Precision)' : 'Precision',
                formula: `Precisión = VP / (VP + FP) = ${metrics.tp} / (${metrics.tp} + ${metrics.fp}) = ${metrics.precision.toFixed(3)}`,
                explanation: lang === 'es'
                    ? `¿Qué proporción de las predicciones como "${className}" fueron correctas? La precisión mide la exactitud de las predicciones positivas. Una precisión alta significa que cuando el modelo predice "${className}", generalmente acierta.`
                    : `What proportion of predictions as "${className}" were correct? Precision measures the accuracy of positive predictions. High precision means that when the model predicts "${className}", it's usually right.`
            },
            recall: {
                title: lang === 'es' ? 'Recall / Sensibilidad' : 'Recall / Sensitivity',
                formula: `Recall = VP / (VP + FN) = ${metrics.tp} / (${metrics.tp} + ${metrics.fn}) = ${metrics.recall.toFixed(3)}`,
                explanation: lang === 'es'
                    ? `¿Qué proporción de los casos reales de "${className}" fueron detectados? El recall mide la capacidad del modelo para encontrar todos los casos positivos. Un recall alto significa que el modelo rara vez se pierde casos de "${className}".`
                    : `What proportion of actual "${className}" cases were detected? Recall measures the model's ability to find all positive cases. High recall means the model rarely misses cases of "${className}".`
            },
            f1: {
                title: 'F1-Score',
                formula: `F1 = 2 × (Precisión × Recall) / (Precisión + Recall) = 2 × (${metrics.precision.toFixed(3)} × ${metrics.recall.toFixed(3)}) / (${metrics.precision.toFixed(3)} + ${metrics.recall.toFixed(3)}) = ${metrics.f1.toFixed(3)}`,
                explanation: lang === 'es'
                    ? `Media armónica de precisión y recall. El F1-Score equilibra ambas métricas, siendo útil cuando se necesita un balance entre no tener falsos positivos (precisión) y no perder casos verdaderos (recall). Un F1 alto indica buen rendimiento en ambas métricas.`
                    : `Harmonic mean of precision and recall. F1-Score balances both metrics, being useful when you need a balance between not having false positives (precision) and not missing true cases (recall). A high F1 indicates good performance in both metrics.`
            }
        };

        const info = metricInfo[metricType];
        if (info) {
            modalTitle.textContent = info.title;
            modalFormula.textContent = info.formula;
            modalExplanation.textContent = info.explanation;
            modal.style.display = 'flex';
            modal.classList.add('show');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
