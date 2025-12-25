// SVM Game Configuration
const SVM_POINT_COUNT = 30; // 15 per class
const FEATURE_MIN = -10;
const FEATURE_MAX = 10;
const MARGIN_THRESHOLD = 0.5; // Minimum acceptable margin

// --- Translations ---
const svmTranslations = {
    es: {
        gameInitialized: "SVMGame: Juego de clasificación SVM inicializado.",
        gameStarted: "Juego de Clasificación SVM iniciado.",
        generatingData: "Generando nuevos datos de clasificación...",
        userAdjustedHyperplane: "Usuario ajustó hiperplano: Posición={position}, Ángulo={angle}",
        hyperplaneUpdated: "Hiperplano actualizado. Margen: {margin}, Precisión: {accuracy}%",
        findingOptimal: "Buscando hiperplano óptimo...",
        optimalFound: "Hiperplano óptimo encontrado: Posición={position}, Ángulo={angle}, Margen={margin}",
        gameReset: "Juego reiniciado.",
        userCheckedResult: "Usuario verificó resultado. Margen: {margin}, Precisión: {accuracy}%",
        excellent: "¡Excelente! 🎉 Tu hiperplano tiene un margen óptimo de {margin}.",
        veryGood: "¡Muy bien! 👍 Tu margen de {userMargin} está cerca del óptimo ({optimalMargin}).",
        canImprove: "Puedes mejorar. 📈 Margen óptimo: {optimal}, Tu margen: {user}.",
        lowAccuracy: "⚠️ Tu precisión es baja ({accuracy}%). Ajusta el hiperplano para clasificar mejor los puntos.",
        comparisonTitle: "Comparación de Resultados",
        parameter: "Parámetro",
        yourSolution: "Tu Solución",
        optimalSolution: "Solución Óptima",
        position: "Posición (b)",
        angle: "Ángulo (°)",
        margin: "Margen",
        accuracy: "Precisión",
        class0Label: "Clase 0 (Benigno)",
        class1Label: "Clase 1 (Maligno)",
        hyperplaneLabel: "Tu Hiperplano",
        marginLabel: "Margen",
        supportVectorLabel: "Vector de Soporte",
        biomarker1: "Biomarcador 1",
        biomarker2: "Biomarcador 2"
    },
    en: {
        gameInitialized: "SVMGame: SVM classification game initialized.",
        gameStarted: "SVM Classification Game started.",
        generatingData: "Generating new classification data...",
        userAdjustedHyperplane: "User adjusted hyperplane: Position={position}, Angle={angle}",
        hyperplaneUpdated: "Hyperplane updated. Margin: {margin}, Accuracy: {accuracy}%",
        findingOptimal: "Finding optimal hyperplane...",
        optimalFound: "Optimal hyperplane found: Position={position}, Angle={angle}, Margin={margin}",
        gameReset: "Game reset.",
        userCheckedResult: "User checked result. Margin: {margin}, Accuracy: {accuracy}%",
        excellent: "Excellent! 🎉 Your hyperplane has an optimal margin of {margin}.",
        veryGood: "Very good! 👍 Your margin of {userMargin} is close to optimal ({optimalMargin}).",
        canImprove: "You can improve. 📈 Optimal margin: {optimal}, Your margin: {user}.",
        lowAccuracy: "⚠️ Your accuracy is low ({accuracy}%). Adjust the hyperplane to better classify points.",
        comparisonTitle: "Results Comparison",
        parameter: "Parameter",
        yourSolution: "Your Solution",
        optimalSolution: "Optimal Solution",
        position: "Position (b)",
        angle: "Angle (°)",
        margin: "Margin",
        accuracy: "Accuracy",
        class0Label: "Class 0 (Benign)",
        class1Label: "Class 1 (Malignant)",
        hyperplaneLabel: "Your Hyperplane",
        marginLabel: "Margin",
        supportVectorLabel: "Support Vector",
        biomarker1: "Biomarker 1",
        biomarker2: "Biomarker 2"
    }
};

// Helper function to get translated text
function svmT(key, params = {}) {
    const lang = window.svmGameLanguage || 'es';
    let text = svmTranslations[lang]?.[key] || svmTranslations['es'][key] || key;

    // Replace parameters in the text
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}

// Generate classification data (two classes)
function generateSVMData() {
    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('generatingData') + "\n");
    }

    const data = [];

    // Generate Class 0 (centered around (-3, -3))
    for (let i = 0; i < SVM_POINT_COUNT / 2; i++) {
        const x = -3 + (Math.random() - 0.5) * 4;
        const y = -3 + (Math.random() - 0.5) * 4;
        data.push({ x, y, label: 0 });
    }

    // Generate Class 1 (centered around (3, 3))
    for (let i = 0; i < SVM_POINT_COUNT / 2; i++) {
        const x = 3 + (Math.random() - 0.5) * 4;
        const y = 3 + (Math.random() - 0.5) * 4;
        data.push({ x, y, label: 1 });
    }

    return data;
}

// Calculate distance from point to line
function pointToLineDistance(px, py, angle, position) {
    // Line equation: cos(θ)x + sin(θ)y + b = 0
    const angleRad = (angle * Math.PI) / 180;
    const a = Math.cos(angleRad);
    const b = Math.sin(angleRad);
    const c = position;

    return Math.abs(a * px + b * py + c) / Math.sqrt(a * a + b * b);
}

// Classify point based on hyperplane
function classifyPoint(px, py, angle, position) {
    const angleRad = (angle * Math.PI) / 180;
    const a = Math.cos(angleRad);
    const b = Math.sin(angleRad);
    const c = position;

    // Return 0 if on negative side, 1 if on positive side
    return (a * px + b * py + c) >= 0 ? 1 : 0;
}

// Calculate margin (distance to nearest points from each class)
function calculateMargin(data, angle, position) {
    let minDist0 = Infinity;
    let minDist1 = Infinity;

    data.forEach(point => {
        const dist = pointToLineDistance(point.x, point.y, angle, position);
        if (point.label === 0) {
            minDist0 = Math.min(minDist0, dist);
        } else {
            minDist1 = Math.min(minDist1, dist);
        }
    });

    // Margin is the minimum of the two distances
    return Math.min(minDist0, minDist1);
}

// Calculate accuracy
function calculateAccuracy(data, angle, position) {
    let correct = 0;
    data.forEach(point => {
        const predicted = classifyPoint(point.x, point.y, angle, position);
        if (predicted === point.label) correct++;
    });
    return (correct / data.length) * 100;
}

// Find support vectors
function findSupportVectors(data, angle, position, margin) {
    const supportVectors = [];
    const tolerance = 0.3; // Tolerance for identifying support vectors

    data.forEach(point => {
        const dist = pointToLineDistance(point.x, point.y, angle, position);
        if (Math.abs(dist - margin) < tolerance) {
            supportVectors.push(point);
        }
    });

    return supportVectors;
}

// Find optimal hyperplane using simple grid search
function findOptimalHyperplane(data) {
    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('findingOptimal') + "\n");
    }

    let bestMargin = -Infinity;
    let bestAngle = 0;
    let bestPosition = 0;

    // Grid search over angle and position
    for (let angle = -90; angle <= 90; angle += 2) {
        for (let position = -10; position <= 10; position += 0.5) {
            const accuracy = calculateAccuracy(data, angle, position);

            // Only consider if accuracy is 100%
            if (accuracy === 100) {
                const margin = calculateMargin(data, angle, position);
                if (margin > bestMargin) {
                    bestMargin = margin;
                    bestAngle = angle;
                    bestPosition = position;
                }
            }
        }
    }

    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('optimalFound', {
            position: bestPosition.toFixed(2),
            angle: bestAngle.toFixed(0),
            margin: bestMargin.toFixed(2)
        }) + "\n");
    }

    return { angle: bestAngle, position: bestPosition, margin: bestMargin };
}

// Generate hyperplane line points for visualization
function getHyperplaneLine(angle, position) {
    const angleRad = (angle * Math.PI) / 180;
    const a = Math.cos(angleRad);
    const b = Math.sin(angleRad);
    const c = position;

    // Generate points along the line
    const points = [];

    // Check if line is more vertical or horizontal
    if (Math.abs(b) > 0.01) {
        // Line is not too vertical, solve for y: y = -(ax + c) / b
        for (let x = FEATURE_MIN; x <= FEATURE_MAX; x += 0.5) {
            const y = -(a * x + c) / b;
            if (y >= FEATURE_MIN && y <= FEATURE_MAX) {
                points.push({ x, y });
            }
        }
    } else {
        // Line is vertical or nearly vertical, solve for x: x = -c / a
        for (let y = FEATURE_MIN; y <= FEATURE_MAX; y += 0.5) {
            if (Math.abs(a) > 0.01) {
                const x = -(c) / a;
                if (x >= FEATURE_MIN && x <= FEATURE_MAX) {
                    points.push({ x, y });
                }
            }
        }
    }

    return points;
}

// Generate margin boundary lines
function getMarginLines(angle, position, margin) {
    const angleRad = (angle * Math.PI) / 180;
    const a = Math.cos(angleRad);
    const b = Math.sin(angleRad);
    const norm = Math.sqrt(a * a + b * b);

    // Calculate offset for margin
    const offset = margin * norm;

    const upperLine = getHyperplaneLine(angle, position + offset);
    const lowerLine = getHyperplaneLine(angle, position - offset);

    return { upper: upperLine, lower: lowerLine };
}

// Initialize game
const svmData = generateSVMData();
let currentAngle = 45; // Start with 45 degrees so line is visible
let currentPosition = 0;
let optimalSolution = null;
let userAngle = 45;
let userPosition = 0;

if (window.CustomTerminal) {
    window.CustomTerminal.write(svmT('gameInitialized') + "\n");
    window.CustomTerminal.write(svmT('gameStarted') + "\n");
}

// Prepare datasets for Chart.js
const class0Data = svmData.filter(p => p.label === 0);
const class1Data = svmData.filter(p => p.label === 1);

const svmChart = new Chart(document.getElementById('svmChart'), {
    type: 'scatter',
    data: {
        datasets: [
            {
                label: svmT('class0Label'),
                data: class0Data,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                pointRadius: 6,
                pointStyle: 'circle'
            },
            {
                label: svmT('class1Label'),
                data: class1Data,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                pointRadius: 6,
                pointStyle: 'circle'
            },
            {
                label: svmT('hyperplaneLabel'),
                data: [],
                type: 'line',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 3,
                fill: false,
                showLine: true,
                pointRadius: 0
            },
            {
                label: svmT('marginLabel') + ' +',
                data: [],
                type: 'line',
                borderColor: 'rgba(75, 192, 192, 0.3)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                showLine: true,
                pointRadius: 0
            },
            {
                label: svmT('marginLabel') + ' -',
                data: [],
                type: 'line',
                borderColor: 'rgba(75, 192, 192, 0.3)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                showLine: true,
                pointRadius: 0
            },
            {
                label: svmT('supportVectorLabel'),
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.8)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 3,
                pointRadius: 10,
                pointStyle: 'star'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        scales: {
            x: {
                title: {
                    display: true,
                    text: svmT('biomarker1')
                },
                min: FEATURE_MIN,
                max: FEATURE_MAX
            },
            y: {
                title: {
                    display: true,
                    text: svmT('biomarker2')
                },
                min: FEATURE_MIN,
                max: FEATURE_MAX
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        }
    }
});

// Update visualization
function updateSVMVisualization() {
    const hyperplaneLine = getHyperplaneLine(currentAngle, currentPosition);
    const margin = calculateMargin(svmData, currentAngle, currentPosition);
    const marginLines = getMarginLines(currentAngle, currentPosition, margin);
    const accuracy = calculateAccuracy(svmData, currentAngle, currentPosition);
    const supportVectors = findSupportVectors(svmData, currentAngle, currentPosition, margin);

    // Update datasets
    svmChart.data.datasets[2].data = hyperplaneLine;
    svmChart.data.datasets[3].data = marginLines.upper;
    svmChart.data.datasets[4].data = marginLines.lower;
    svmChart.data.datasets[5].data = supportVectors;

    svmChart.update('none'); // Update without animation for smooth interaction

    // Update metrics display
    document.getElementById('marginValue').textContent = margin.toFixed(3);
    document.getElementById('accuracyValue').textContent = accuracy.toFixed(1) + '%';
    document.getElementById('supportVectorCount').textContent = supportVectors.length;

    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('hyperplaneUpdated', {
            margin: margin.toFixed(3),
            accuracy: accuracy.toFixed(1)
        }) + "\n");
    }
}

// Event listeners
document.getElementById('svmPositionSlider').addEventListener('input', (e) => {
    currentPosition = parseFloat(e.target.value);
    document.getElementById('svmPositionValue').textContent = currentPosition.toFixed(1);
    updateSVMVisualization();

    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('userAdjustedHyperplane', {
            position: currentPosition.toFixed(1),
            angle: currentAngle.toFixed(0)
        }) + "\n");
    }
});

document.getElementById('svmAngleSlider').addEventListener('input', (e) => {
    currentAngle = parseFloat(e.target.value);
    document.getElementById('svmAngleValue').textContent = currentAngle.toFixed(0);
    updateSVMVisualization();

    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('userAdjustedHyperplane', {
            position: currentPosition.toFixed(1),
            angle: currentAngle.toFixed(0)
        }) + "\n");
    }
});

document.getElementById('svmCheckButton').addEventListener('click', () => {
    // Save user's current hyperplane
    userAngle = currentAngle;
    userPosition = currentPosition;

    const userMargin = calculateMargin(svmData, userAngle, userPosition);
    const userAccuracy = calculateAccuracy(svmData, userAngle, userPosition);

    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('userCheckedResult', {
            margin: userMargin.toFixed(3),
            accuracy: userAccuracy.toFixed(1)
        }) + "\n");
    }

    // Disable controls during optimization
    document.getElementById('svmCheckButton').disabled = true;
    document.getElementById('svmPositionSlider').disabled = true;
    document.getElementById('svmAngleSlider').disabled = true;
    document.getElementById('svmOptimizationStatus').classList.remove('demo-hidden');

    // Find optimal solution
    if (!optimalSolution) {
        optimalSolution = findOptimalHyperplane(svmData);
    }

    // Animate to optimal solution
    animateToOptimal(optimalSolution, () => {
        document.getElementById('svmOptimizationStatus').classList.add('demo-hidden');

        // Determine result message
        let message = '';
        let resultClass = '';

        if (userAccuracy < 100) {
            message = svmT('lowAccuracy', { accuracy: userAccuracy.toFixed(1) });
            resultClass = 'warning';
        } else if (userMargin >= optimalSolution.margin * 0.95) {
            message = svmT('excellent', { margin: userMargin.toFixed(3) });
            resultClass = 'success';
        } else if (userMargin >= optimalSolution.margin * 0.8) {
            message = svmT('veryGood', {
                userMargin: userMargin.toFixed(3),
                optimalMargin: optimalSolution.margin.toFixed(3)
            });
            resultClass = 'info';
        } else {
            message = svmT('canImprove', {
                optimal: optimalSolution.margin.toFixed(3),
                user: userMargin.toFixed(3)
            });
            resultClass = 'warning';
        }

        // Display results
        displaySVMResults(message, resultClass, userMargin, userAccuracy, optimalSolution);

        // Re-enable controls
        document.getElementById('svmCheckButton').disabled = false;
        document.getElementById('svmPositionSlider').disabled = false;
        document.getElementById('svmAngleSlider').disabled = false;
    });
});

// Animation function to smoothly transition to optimal hyperplane
function animateToOptimal(optimal, callback) {
    const steps = 30;
    let step = 0;
    const startAngle = currentAngle;
    const startPosition = currentPosition;
    const angleStep = (optimal.angle - startAngle) / steps;
    const positionStep = (optimal.position - startPosition) / steps;

    const interval = setInterval(() => {
        step++;
        currentAngle = startAngle + angleStep * step;
        currentPosition = startPosition + positionStep * step;

        updateSVMVisualization();

        if (step >= steps) {
            clearInterval(interval);
            currentAngle = optimal.angle;
            currentPosition = optimal.position;
            updateSVMVisualization();
            if (callback) callback();
        }
    }, 30);
}

document.getElementById('svmResetButton').addEventListener('click', () => {
    // Reset game
    svmData.length = 0;
    svmData.push(...generateSVMData());

    // Reset UI
    currentAngle = 45;
    currentPosition = 0;
    userAngle = 45;
    userPosition = 0;
    optimalSolution = null;

    document.getElementById('svmAngleSlider').value = 45;
    document.getElementById('svmAngleValue').textContent = '45';
    document.getElementById('svmPositionSlider').value = 0;
    document.getElementById('svmPositionValue').textContent = '0.0';

    // Re-enable controls
    document.getElementById('svmCheckButton').disabled = false;
    document.getElementById('svmPositionSlider').disabled = false;
    document.getElementById('svmAngleSlider').disabled = false;

    // Clear results
    if (window.GameResultsModal && window.GameResultsModal.hide) {
        window.GameResultsModal.hide();
    }

    // Update chart data
    const newClass0Data = svmData.filter(p => p.label === 0);
    const newClass1Data = svmData.filter(p => p.label === 1);
    svmChart.data.datasets[0].data = newClass0Data;
    svmChart.data.datasets[1].data = newClass1Data;

    updateSVMVisualization();

    if (window.CustomTerminal) {
        window.CustomTerminal.write(svmT('gameReset') + "\n");
    }
});

// Display results in modal
function displaySVMResults(message, resultClass, userMargin, accuracy, optimal) {
    const comparisonHTML = `
        <div class="results-table-container">
            <table class="results-comparison-table">
                <thead>
                    <tr>
                        <th>${svmT('parameter')}</th>
                        <th>${svmT('yourSolution')}</th>
                        <th>${svmT('optimalSolution')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${svmT('position')}</td>
                        <td>${userPosition.toFixed(2)}</td>
                        <td>${optimal.position.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>${svmT('angle')}</td>
                        <td>${userAngle.toFixed(0)}°</td>
                        <td>${optimal.angle.toFixed(0)}°</td>
                    </tr>
                    <tr>
                        <td>${svmT('margin')}</td>
                        <td>${userMargin.toFixed(3)}</td>
                        <td>${optimal.margin.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td>${svmT('accuracy')}</td>
                        <td>${accuracy.toFixed(1)}%</td>
                        <td>100.0%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    if (window.GameResultsModal) {
        window.GameResultsModal.show(
            svmT('comparisonTitle'),
            message,
            comparisonHTML
        );
    } else {
        console.error("GameResultsModal not available");
        alert(message);
    }
}

// Initial visualization - ensure DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateSVMVisualization();
    });
} else {
    updateSVMVisualization();
}
