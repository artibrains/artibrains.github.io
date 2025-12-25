// ROC-AUC Visualization Logic

const POINT_COUNT = 200; // Total points
let points = [];
let modelType = 'logistic'; // 'logistic', 'svm', or 'both'
let separation = 2.5;
let noise = 1.0;
let trainedModelLogistic = { w: { x: 1, y: 0 }, b: 0 };
let trainedModelSVM = { w: { x: 1, y: 0 }, b: 0 };

// Chart instances
let classificationChart = null;
let rocChart = null;

// DOM Elements
const modelSelect = document.getElementById('modelSelect');
const separationSlider = document.getElementById('separationSlider');
const separationValue = document.getElementById('separationValue');
const noiseSlider = document.getElementById('noiseSlider');
const noiseValue = document.getElementById('noiseValue');
const regenerateBtn = document.getElementById('regenerateData');
const aucBoxLogistic = document.getElementById('aucBoxLogistic');
const aucValueLogistic = document.getElementById('aucValueLogistic');
const aucBoxSVM = document.getElementById('aucBoxSVM');
const aucValueSVM = document.getElementById('aucValueSVM');

// --- Data Generation ---
function generateData() {
    points = [];

    // Class 0: Centered at (-separation/2, 0)
    for (let i = 0; i < POINT_COUNT / 2; i++) {
        points.push({
            x: -separation / 2 + randn() * noise,
            y: randn() * noise,
            label: 0
        });
    }

    // Class 1: Centered at (separation/2, 0)
    for (let i = 0; i < POINT_COUNT / 2; i++) {
        points.push({
            x: separation / 2 + randn() * noise,
            y: randn() * noise,
            label: 1
        });
    }
}

// Box-Muller transform for normal distribution
function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// --- Model Training (Simple Gradient Descent) ---

function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
}

function trainSingleModel(type) {
    // Initialize weights randomly
    let w = { x: Math.random() - 0.5, y: Math.random() - 0.5 };
    let b = 0;

    const learningRate = 0.1;
    const epochs = 500;
    const lambda = 0.01; // Regularization for SVM

    if (type === 'logistic') {
        for (let epoch = 0; epoch < epochs; epoch++) {
            let dw = { x: 0, y: 0 };
            let db = 0;

            points.forEach(p => {
                const z = w.x * p.x + w.y * p.y + b;
                const y_pred = sigmoid(z);
                const error = y_pred - p.label;

                dw.x += error * p.x;
                dw.y += error * p.y;
                db += error;
            });

            w.x -= (learningRate * dw.x) / points.length;
            w.y -= (learningRate * dw.y) / points.length;
            b -= (learningRate * db) / points.length;
        }
        trainedModelLogistic = { w, b };
    } else if (type === 'svm') {
        // Linear SVM with Hinge Loss
        // Labels need to be -1, 1
        for (let epoch = 0; epoch < epochs; epoch++) {
            let dw = { x: 0, y: 0 };
            let db = 0;

            points.forEach(p => {
                const y_target = p.label === 0 ? -1 : 1;
                const score = w.x * p.x + w.y * p.y + b;

                if (y_target * score < 1) {
                    dw.x += -y_target * p.x;
                    dw.y += -y_target * p.y;
                    db += -y_target;
                }
            });

            // Add regularization gradient
            dw.x += 2 * lambda * w.x;
            dw.y += 2 * lambda * w.y;

            w.x -= (learningRate * dw.x) / points.length;
            w.y -= (learningRate * dw.y) / points.length;
            b -= (learningRate * db) / points.length; // Usually bias is not regularized
        }
        trainedModelSVM = { w, b };
    }
}

function trainModel() {
    if (modelType === 'logistic') {
        trainSingleModel('logistic');
    } else if (modelType === 'svm') {
        trainSingleModel('svm');
    } else if (modelType === 'both') {
        trainSingleModel('logistic');
        trainSingleModel('svm');
    }
}

// --- Metrics Calculation ---

function calculateROC(model, type) {
    // Get scores
    const scoredPoints = points.map(p => {
        const z = model.w.x * p.x + model.w.y * p.y + model.b;
        let score;
        if (type === 'logistic') {
            score = sigmoid(z);
        } else {
            score = z;
        }
        return { label: p.label, score: score };
    });

    // Sort by score descending
    scoredPoints.sort((a, b) => b.score - a.score);

    const rocPoints = [];
    let tp = 0;
    let fp = 0;
    const totalPos = scoredPoints.filter(p => p.label === 1).length;
    const totalNeg = scoredPoints.filter(p => p.label === 0).length;

    rocPoints.push({ x: 0, y: 0 }); // Start at 0,0

    // Iterate through all unique thresholds (scores)
    for (let i = 0; i < scoredPoints.length; i++) {
        if (scoredPoints[i].label === 1) {
            tp++;
        } else {
            fp++;
        }
        rocPoints.push({
            x: fp / totalNeg,
            y: tp / totalPos
        });
    }

    // Calculate AUC
    let auc = 0;
    for (let i = 1; i < rocPoints.length; i++) {
        const x_diff = rocPoints[i].x - rocPoints[i - 1].x;
        const y_avg = (rocPoints[i].y + rocPoints[i - 1].y) / 2;
        auc += x_diff * y_avg;
    }

    return { rocPoints, auc };
}

// --- Visualization ---

function initCharts() {
    // Classification Chart
    const ctxClass = document.getElementById('classificationChart').getContext('2d');
    classificationChart = new Chart(ctxClass, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Class 0',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    pointRadius: 4
                },
                {
                    label: 'Class 1',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    pointRadius: 4
                },
                {
                    label: 'Logistic Boundary',
                    data: [],
                    type: 'line',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    hidden: true
                },
                {
                    label: 'SVM Boundary',
                    data: [],
                    type: 'line',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    hidden: true
                },
                {
                    label: 'SVM Margin +',
                    data: [],
                    type: 'line',
                    borderColor: 'rgba(255, 159, 64, 0.5)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0,
                    hidden: true
                },
                {
                    label: 'SVM Margin -',
                    data: [],
                    type: 'line',
                    borderColor: 'rgba(255, 159, 64, 0.5)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0,
                    hidden: true
                }
            ]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            scales: {
                x: { min: -10, max: 10 },
                y: { min: -10, max: 10 }
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // ROC Chart
    const ctxRoc = document.getElementById('rocChart').getContext('2d');
    rocChart = new Chart(ctxRoc, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Logistic ROC',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    fill: false,
                    pointRadius: 0,
                    tension: 0.1,
                    hidden: true
                },
                {
                    label: 'SVM ROC',
                    data: [],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    fill: false,
                    pointRadius: 0,
                    tension: 0.1,
                    hidden: true
                },
                {
                    label: 'Random Guess',
                    data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    borderColor: '#ccc',
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            scales: {
                x: {
                    type: 'linear',
                    min: 0,
                    max: 1,
                    title: { display: true, text: 'False Positive Rate (1 - Specificity)' }
                },
                y: {
                    min: 0,
                    max: 1,
                    title: { display: true, text: 'True Positive Rate (Sensitivity)' }
                }
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function getBoundaryPoints(model) {
    const boundaryPoints = [];
    if (Math.abs(model.w.y) > 0.001) {
        for (let x = -10; x <= 10; x += 1) {
            const y = -(model.w.x * x + model.b) / model.w.y;
            boundaryPoints.push({ x, y });
        }
    } else {
        const x = -model.b / model.w.x;
        boundaryPoints.push({ x: x, y: -10 });
        boundaryPoints.push({ x: x, y: 10 });
    }
    return boundaryPoints;
}

function getMarginPoints(model) {
    const marginPosPoints = [];
    const marginNegPoints = [];

    if (Math.abs(model.w.y) > 0.001) {
        for (let x = -10; x <= 10; x += 1) {
            const yPos = (1 - model.b - model.w.x * x) / model.w.y;
            marginPosPoints.push({ x, y: yPos });
            const yNeg = (-1 - model.b - model.w.x * x) / model.w.y;
            marginNegPoints.push({ x, y: yNeg });
        }
    } else {
        const xPos = (1 - model.b) / model.w.x;
        marginPosPoints.push({ x: xPos, y: -10 });
        marginPosPoints.push({ x: xPos, y: 10 });
        const xNeg = (-1 - model.b) / model.w.x;
        marginNegPoints.push({ x: xNeg, y: -10 });
        marginNegPoints.push({ x: xNeg, y: 10 });
    }
    return { pos: marginPosPoints, neg: marginNegPoints };
}

function updateCharts() {
    // Update Classification Chart
    const class0 = points.filter(p => p.label === 0);
    const class1 = points.filter(p => p.label === 1);

    classificationChart.data.datasets[0].data = class0;
    classificationChart.data.datasets[1].data = class1;

    // Reset visibility
    classificationChart.data.datasets[2].hidden = true; // Logistic
    classificationChart.data.datasets[3].hidden = true; // SVM
    classificationChart.data.datasets[4].hidden = true; // SVM Margin +
    classificationChart.data.datasets[5].hidden = true; // SVM Margin -

    rocChart.data.datasets[0].hidden = true; // Logistic ROC
    rocChart.data.datasets[1].hidden = true; // SVM ROC

    // Hide AUC boxes initially
    aucBoxLogistic.style.display = 'none';
    aucBoxSVM.style.display = 'none';

    if (modelType === 'logistic' || modelType === 'both') {
        // Logistic Boundary
        classificationChart.data.datasets[2].data = getBoundaryPoints(trainedModelLogistic);
        classificationChart.data.datasets[2].hidden = false;

        // Logistic ROC
        const { rocPoints, auc } = calculateROC(trainedModelLogistic, 'logistic');
        rocChart.data.datasets[0].data = rocPoints;
        rocChart.data.datasets[0].hidden = false;

        // AUC Display
        aucValueLogistic.textContent = auc.toFixed(3);
        aucBoxLogistic.style.display = 'inline-block';
    }

    if (modelType === 'svm' || modelType === 'both') {
        // SVM Boundary
        classificationChart.data.datasets[3].data = getBoundaryPoints(trainedModelSVM);
        classificationChart.data.datasets[3].hidden = false;

        // SVM Margins (only show if just SVM is selected to avoid clutter, or show anyway?)
        // Let's show them but maybe lighter.
        const margins = getMarginPoints(trainedModelSVM);
        classificationChart.data.datasets[4].data = margins.pos;
        classificationChart.data.datasets[5].data = margins.neg;
        classificationChart.data.datasets[4].hidden = false;
        classificationChart.data.datasets[5].hidden = false;

        // SVM ROC
        const { rocPoints, auc } = calculateROC(trainedModelSVM, 'svm');
        rocChart.data.datasets[1].data = rocPoints;
        rocChart.data.datasets[1].hidden = false;

        // AUC Display
        aucValueSVM.textContent = auc.toFixed(3);
        aucBoxSVM.style.display = 'inline-block';
    }

    classificationChart.update();
    rocChart.update();
}

// --- Event Handlers ---

function handleUpdate() {
    trainModel();
    updateCharts();
}

modelSelect.addEventListener('change', (e) => {
    modelType = e.target.value;
    handleUpdate();
});

separationSlider.addEventListener('input', (e) => {
    separation = parseFloat(e.target.value);
    separationValue.textContent = separation.toFixed(1);
    generateData();
    handleUpdate();
});

noiseSlider.addEventListener('input', (e) => {
    noise = parseFloat(e.target.value);
    noiseValue.textContent = noise.toFixed(1);
    generateData();
    handleUpdate();
});

regenerateBtn.addEventListener('click', () => {
    generateData();
    handleUpdate();
});

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    generateData();
    handleUpdate();
});
