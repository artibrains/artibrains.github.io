// Configuración inicial
const POINT_COUNT = 100;
const CANVAS_SIZE = 400;

// --- Translations ---
const sigmoidTranslations = {
    es: {
        modeNotProb: "Modo actual: Clasificación Simple",
        modeProb: "Modo actual: Probabilidades",
        toggleToProb: "Ver Probabilidades",
        toggleToClass: "Ver Clasificación",
        titleSimple: "Clasificación de Pacientes",
        titleProb: "Probabilidad de No Asistencia",
        gameLabelProb: "Probabilidad",
        newGameMsg: "Nueva partida",
        checkMsg: "Comprobar clasificación",
        gameReset: "Juego Sigmoide reiniciado. Nuevos datos generados y parámetros reseteados.",
        logComprobacion: "Comprobación de clasificación: Precisión={accuracy}%, Correctos={correct}/{total}, Umbral={threshold}",
        excellent: "¡Excelente trabajo! 🎉 Has conseguido una precisión del {accuracy}%, superando el objetivo del 80%. Tu modelo identifica correctamente la clase de la mayoría de los casos.",
        veryGood: "¡Buen intento! 👍 Has alcanzado una precisión del {accuracy}%. Estás cerca del objetivo. Prueba ajustando un poco más los parámetros.",
        canImprove: "Sigue intentándolo 💪 Tu precisión actual es del {accuracy}%. Consejo: Observa cómo la línea verde separa los grupos de puntos y ajusta los parámetros para mejorar la clasificación.",
        modalTitle: "Resultados de la Clasificación",
        metric: "Métrica",
        value: "Valor",
        accuracy: "Precisión",
        correct: "Casos Correctamente Clasificados",
        incorrect: "Casos Incorrectamente Clasificados",
        threshold: "Umbral de Decisión",
        modelParams: "Parámetros del Modelo",
        modalError: "Error: GameResultsModal no disponible para mostrar resultados.",
        goal: "Objetivo: Lograr una precisión superior al 80%",
        outOf: "de",
        patientsLabel: "Pacientes",
        decisionBoundaryLabel: "Frontera de decisión",
        zoneLabelsLabel: "Etiquetas de zona",
        zoneWillNotAttend: "No asistirán",
        zoneWillAttend: "Asistirán",
        tooltipReal: "Real",
        tooltipPrediction: "Predicción",
        tooltipProbability: "Probabilidad",
        classWillNotAttend: "No asistirá",
        classWillAttend: "Asistirá",
        indicator1: "Indicador 1",
        indicator2: "Indicador 2",
        initLog: "Juego Sigmoide: Gráfico inicializado."
    },
    en: {
        modeNotProb: "Current mode: Simple Classification",
        modeProb: "Current mode: Probabilities",
        toggleToProb: "Show Probabilities",
        toggleToClass: "Show Classification",
        titleSimple: "Patient Classification",
        titleProb: "Non-Attendance Probability",
        gameLabelProb: "Probability",
        newGameMsg: "New game",
        checkMsg: "Check classification",
        gameReset: "Sigmoid Game restarted. New data generated and parameters reset.",
        logComprobacion: "Classification check: Accuracy={accuracy}%, Correct={correct}/{total}, Threshold={threshold}",
        excellent: "Excellent work! 🎉 You've achieved an accuracy of {accuracy}%, exceeding the 80% goal. Your model correctly identifies the class for most cases.",
        veryGood: "Good attempt! 👍 You've achieved an accuracy of {accuracy}%. You're close to the goal. Try adjusting the parameters a bit more.",
        canImprove: "Keep trying 💪 Your current accuracy is {accuracy}%. Tip: Look at how the green line separates the groups of points and adjust the parameters to improve the classification.",
        modalTitle: "Classification Results",
        metric: "Metric",
        value: "Value",
        accuracy: "Accuracy",
        correct: "Correctly Classified Cases",
        incorrect: "Incorrectly Classified Cases",
        threshold: "Threshold",
        modelParams: "Model Parameters",
        modalError: "Error: GameResultsModal unavailable to display results.",
        goal: "Goal: Achieve accuracy above 80%",
        outOf: "of",
        patientsLabel: "Patients",
        decisionBoundaryLabel: "Decision boundary",
        zoneLabelsLabel: "Zone labels",
        zoneWillNotAttend: "Will not attend",
        zoneWillAttend: "Will attend",
        tooltipReal: "Actual",
        tooltipPrediction: "Prediction",
        tooltipProbability: "Probability",
        classWillNotAttend: "Will not attend",
        classWillAttend: "Will attend",
        indicator1: "Indicator 1",
        indicator2: "Indicator 2",
        initLog: "Sigmoid Game: Chart initialized."
    }
};

// Helper function to get translated text
function sigmoidT(key, params = {}) {
    const pageLang = (document.documentElement.lang || '').toLowerCase();
    const windowLang = (window.gameLanguage || '').toLowerCase();
    // Prioritize windowLang (set by shortcode) over pageLang
    const langSource = windowLang || pageLang || 'es';
    const lang = langSource.startsWith('en') ? 'en' : 'es';
    let text = sigmoidTranslations[lang]?.[key] || sigmoidTranslations['es'][key] || key;

    // Replace parameters in the text
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}

// Generación de datos
function generateData() {
    const data = [];
    for (let i = 0; i < POINT_COUNT; i++) {
        // Clase 0: distribución normal alrededor de (-1, -1)
        if (i < POINT_COUNT / 2) {
            data.push({
                x: randn_bm() - 1,
                y: randn_bm() - 1,
                class: 0
            });
        }
        // Clase 1: distribución normal alrededor de (1, 1)
        else {
            data.push({
                x: randn_bm() + 1,
                y: randn_bm() + 1,
                class: 1
            });
        }
    }
    return data;
}

// Distribución normal Box-Muller
function randn_bm() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Función sigmoide
function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
}

function probabilityToColor(probability, alpha = 0.75) {
    const red = Math.round(255 * probability);
    const blue = Math.round(255 * (1 - probability));
    return `rgba(${red}, 0, ${blue}, ${alpha})`;
}

// Generar puntos de la línea de decisión
function generateDecisionBoundary() {
    const points = [];
    for (let x = -3; x <= 3; x += 0.1) {
        // Resolver w1*x + w2*y + b = 0 para y
        const y = (-w1 * x - b) / w2;
        points.push({ x: x, y: y });
    }
    return points;
}

// Función para generar las etiquetas flotantes
function generateZoneLabels() {
    // Calcular un punto en el centro de cada zona
    const x = 2;  // Posición x fija para las etiquetas
    const y = (-w1 * x - b) / w2;  // Punto en la línea de decisión

    return [{
        label: sigmoidT('zoneWillNotAttend'),
        position: { x: x, y: y + 1 },  // Etiqueta encima de la línea
        color: 'rgba(255, 0, 0, 0.8)',
        anchor: 'center'
    }, {
        label: sigmoidT('zoneWillAttend'),
        position: { x: x, y: y - 1 },  // Etiqueta debajo de la línea
        color: 'rgba(0, 0, 255, 0.8)',
        anchor: 'center'
    }];
}

// Variables globales
let data = generateData();
let showSigmoid = false; // Cambiar a false para empezar en modo clasificación
let w1 = 1, w2 = 1, b = 0, threshold = 0.5;

// Terminal logging support (queue until terminal is ready)
const terminalQueue = [];
let terminalBindingEstablished = false;

function flushTerminalQueue() {
    if (!window.CustomTerminal || typeof window.CustomTerminal.write !== 'function' || !window.CustomTerminal.initialized) {
        return false;
    }

    while (terminalQueue.length) {
        window.CustomTerminal.write(terminalQueue.shift());
    }

    return true;
}

function bindTerminalReady() {
    if (terminalBindingEstablished) {
        return;
    }

    terminalBindingEstablished = true;

    const deliverQueue = () => {
        flushTerminalQueue();
    };

    if (window.CustomTerminal && typeof window.CustomTerminal.onReady === 'function') {
        window.CustomTerminal.onReady(deliverQueue);
    } else {
        window.addEventListener('CustomTerminalReady', deliverQueue, { once: true });
    }

    const pollUntilReady = () => {
        if (!flushTerminalQueue()) {
            setTimeout(pollUntilReady, 120);
        }
    };

    pollUntilReady();
}

function logToTerminal(message) {
    if (!message) {
        return;
    }

    terminalQueue.push(message);

    if (!flushTerminalQueue()) {
        bindTerminalReady();
    }
}

// Registrar el plugin datalabels
Chart.register(ChartDataLabels);

// Inicialización del gráfico
const ctx = document.getElementById('gameChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: sigmoidT('patientsLabel'),
            data: data,
            pointBackgroundColor: function (context) {
                const index = context.dataIndex;
                const point = data[index];

                const z = w1 * point.x + w2 * point.y + b;
                const prob = sigmoid(z);

                if (showSigmoid) {
                    return probabilityToColor(prob, 0.75);
                }

                // Color según su clase real (no predicha)
                const trueColor = point.class === 1 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 0, 255, 0.3)';

                return trueColor; // Color real del punto
            },
            pointBorderColor: function (context) {
                const index = context.dataIndex;
                const point = data[index];
                const z = w1 * point.x + w2 * point.y + b;
                const prob = sigmoid(z);

                if (showSigmoid) {
                    return probabilityToColor(prob, 1);
                }

                return prob > threshold ? 'rgba(255, 0, 0, 0.9)' : 'rgba(0, 0, 255, 0.9)';
            },
            pointBorderWidth: 2,
            pointRadius: 6
        },
        {
            label: sigmoidT('decisionBoundaryLabel'),
            data: generateDecisionBoundary(),
            type: 'line',
            borderColor: '#28a745',
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        },
        {
            label: sigmoidT('zoneLabelsLabel'),
            data: generateZoneLabels().map(label => label.position),
            backgroundColor: 'transparent',
            datalabels: {
                color: function (context) {
                    return context.dataIndex === 0 ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 0, 255, 0.8)';
                },
                font: { size: 16, weight: 'bold' },
                formatter: function (value, context) {
                    return context.dataIndex === 0 ? sigmoidT('zoneWillNotAttend') : sigmoidT('zoneWillAttend');
                }
            }
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: sigmoidT('titleSimple')
            },
            legend: {
                display: true,
                position: 'top'
            },
            datalabels: {
                display: function (context) {
                    return context.datasetIndex === 2;  // Solo mostrar etiquetas para el tercer dataset
                },
                anchor: 'center',
                align: 'center'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const point = data[context.dataIndex];
                        const realClass = point.class === 1 ? sigmoidT('classWillNotAttend') : sigmoidT('classWillAttend');
                        const z = w1 * point.x + w2 * point.y + b;
                        const prob = sigmoid(z);
                        const predicted = prob > threshold ? sigmoidT('classWillNotAttend') : sigmoidT('classWillAttend');
                        return [
                            `${sigmoidT('tooltipReal')}: ${realClass}`,
                            `${sigmoidT('tooltipPrediction')}: ${predicted}`,
                            `${sigmoidT('tooltipProbability')}: ${(prob * 100).toFixed(1)}%`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: sigmoidT('indicator1')
                },
                min: -3,
                max: 3,
                grid: {
                    drawOnChartArea: true
                }
            },
            y: {
                title: {
                    display: true,
                    text: sigmoidT('indicator2')
                },
                min: -3,
                max: 3,
                grid: {
                    drawOnChartArea: true
                }
            }
        }
    }
});

// Event listeners
document.getElementById('w1Slider').addEventListener('input', e => {
    w1 = parseFloat(e.target.value);
    document.getElementById('w1Value').textContent = w1.toFixed(1);
    updateChart();
});

document.getElementById('w2Slider').addEventListener('input', e => {
    w2 = parseFloat(e.target.value);
    document.getElementById('w2Value').textContent = w2.toFixed(1);
    updateChart();
});

document.getElementById('bSlider').addEventListener('input', e => {
    b = parseFloat(e.target.value);
    document.getElementById('bValue').textContent = b.toFixed(1);
    updateChart();
});

document.getElementById('thresholdSlider').addEventListener('input', e => {
    threshold = parseFloat(e.target.value);
    document.getElementById('thresholdValue').textContent = threshold.toFixed(1);
    updateChart();
});

document.getElementById('toggleSigmoid').addEventListener('click', () => {
    showSigmoid = !showSigmoid;

    // Actualizar texto del botón y modo
    const toggleText = document.getElementById('toggleText');
    const modeText = document.getElementById('modeText');

    if (showSigmoid) {
        toggleText.textContent = sigmoidT('toggleToClass');
        modeText.textContent = sigmoidT('modeProb');
        chart.options.plugins.title.text = sigmoidT('titleProb');
    } else {
        toggleText.textContent = sigmoidT('toggleToProb');
        modeText.textContent = sigmoidT('modeNotProb');
        chart.options.plugins.title.text = sigmoidT('titleSimple');
    }

    chart.data.datasets[0].pointBackgroundColor = chart.data.datasets[0].pointBackgroundColor;
    chart.update();
});

document.getElementById('resetButton').addEventListener('click', () => {
    // Generar nuevos datos primero
    data = generateData();

    // Restablecer parámetros
    w1 = 1;
    w2 = 1;
    b = 0;
    threshold = 0.5;
    showSigmoid = false;

    // Reset sliders
    document.getElementById('w1Slider').value = w1;
    document.getElementById('w2Slider').value = w2;
    document.getElementById('bSlider').value = b;
    document.getElementById('thresholdSlider').value = threshold;

    // Reset values
    document.getElementById('w1Value').textContent = w1.toFixed(1);
    document.getElementById('w2Value').textContent = w2.toFixed(1);
    document.getElementById('bValue').textContent = b.toFixed(1);
    document.getElementById('thresholdValue').textContent = threshold.toFixed(1);

    // Reset mode text
    document.getElementById('toggleText').textContent = sigmoidT('toggleToProb');
    document.getElementById('modeText').textContent = sigmoidT('modeNotProb');

    // Actualizar gráfico con los nuevos datos
    chart.data.datasets[0].data = data;
    updateChart();
    if (window.GameResultsModal) { // Hide modal on reset
        window.GameResultsModal.hide();
    }
    logToTerminal(sigmoidT('gameReset') + "\n");
});

// Modificar el event listener del botón de comprobar
document.getElementById('checkButton').addEventListener('click', () => {
    const accuracy = calculateAccuracy();
    const correct = Math.round(accuracy * data.length / 100);
    const incorrect = data.length - correct;
    const total = data.length;
    const currentThreshold = parseFloat(document.getElementById('thresholdSlider').value);

    let summaryMessage;
    let detailsHtml = `
        <table>
            <tr><th>${sigmoidT('metric')}</th><th>${sigmoidT('value')}</th></tr>
            <tr><td>${sigmoidT('accuracy')}</td><td>${accuracy.toFixed(1)}%</td></tr>
            <tr><td>${sigmoidT('correct')}</td><td>${correct} ${sigmoidT('outOf')} ${total}</td></tr>
            <tr><td>${sigmoidT('incorrect')}</td><td>${incorrect} ${sigmoidT('outOf')} ${total}</td></tr>
            <tr><td>${sigmoidT('threshold')}</td><td>${currentThreshold.toFixed(2)}</td></tr>
            <tr><td>${sigmoidT('modelParams')}</td><td>w₁=${w1.toFixed(2)}, w₂=${w2.toFixed(2)}, b=${b.toFixed(2)}</td></tr>
        </table>
    `;

    if (accuracy >= 80) {
        summaryMessage = sigmoidT('excellent', { accuracy: accuracy.toFixed(1) });
    } else if (accuracy >= 70) {
        summaryMessage = sigmoidT('veryGood', { accuracy: accuracy.toFixed(1) });
    } else {
        summaryMessage = sigmoidT('canImprove', { accuracy: accuracy.toFixed(1) });
    }

    logToTerminal(sigmoidT('logComprobacion', {
        accuracy: accuracy.toFixed(1),
        correct: correct,
        total: total,
        threshold: currentThreshold.toFixed(2)
    }) + "\n");

    if (window.GameResultsModal) {
        window.GameResultsModal.show(
            sigmoidT('modalTitle'),
            summaryMessage,
            detailsHtml
        );
    } else {
        console.error(sigmoidT('modalError'));
        logToTerminal(sigmoidT('modalError') + "\n");
        // Fallback to alert if modal is not available
        alert(`${sigmoidT('modalTitle')}:\n${sigmoidT('accuracy')}: ${accuracy.toFixed(1)}%\n${sigmoidT('correct')}: ${correct}/${total}\n${sigmoidT('threshold')}: ${currentThreshold.toFixed(2)}\n\n${summaryMessage}`);
    }
});

function calculateAccuracy() {
    let correct = 0;
    data.forEach(point => {
        // Usar el modelo de regresión logística
        const z = w1 * point.x + w2 * point.y + b;  // Combinación lineal
        const prob = sigmoid(z);  // Transformación sigmoide
        const predicted = prob > threshold ? 1 : 0;  // Clasificación según umbral
        if (predicted === point.class) correct++;
    });
    return (correct / data.length) * 100;
}

// Modificar updateChart para evitar mostrar modal automáticamente
function updateChart() {
    // Actualizar línea de decisión
    chart.data.datasets[1].data = generateDecisionBoundary();
    chart.data.datasets[2].data = generateZoneLabels();
    chart.update();

    // Logica de actualización del modal anterior eliminada de aquí.
    // El botón "Comprobar clasificación" se encargará de mostrar los resultados.
}

// Inicialización
updateChart();
document.getElementById('goalText').textContent = sigmoidT('goal');
logToTerminal(sigmoidT('initLog') + "\n");
