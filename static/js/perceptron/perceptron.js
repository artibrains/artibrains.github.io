document.addEventListener('DOMContentLoaded', () => {
    // --- Internationalization ---
    const lang = (window.perceptronLanguage || document.documentElement.lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
    const i18n = {
        en: {
            dataLoaded: 'Iris dataset loaded successfully.',
            dataError: 'Failed to load Iris data.',
            modelInit: 'Model initialized with random weights.',
            trainingEpoch: 'Epoch {epoch}: {errors} classification errors.',
            trainingPerfect: 'Epoch {epoch}: Perfect classification achieved!',
            trainingStarted: 'Automatic training started...',
            trainingStopped: 'Training stopped at epoch {epoch}.',
            trainingMaxEpochs: 'Max epochs ({max}) reached. Showing best solution.',
            modelReset: 'Model reset to initial state.',
            speciesChanged: 'Dataset changed: {s1} vs {s2}.',
            selectDifferent: 'Please select two different species.',
            petalLength: 'Petal Length (X axis)',
            petalWidth: 'Petal Width (Y axis)',
            perfect: '0 (Perfect!)',
            stopTraining: 'Stop Training',
            trainAuto: 'Train Automatically'
        },
        es: {
            dataLoaded: 'Dataset Iris cargado correctamente.',
            dataError: 'Error al cargar los datos del Iris.',
            modelInit: 'Modelo inicializado con pesos aleatorios.',
            trainingEpoch: 'Época {epoch}: {errors} errores de clasificación.',
            trainingPerfect: 'Época {epoch}: ¡Clasificación perfecta!',
            trainingStarted: 'Entrenamiento automático iniciado...',
            trainingStopped: 'Entrenamiento detenido en época {epoch}.',
            trainingMaxEpochs: 'Máximo de épocas ({max}) alcanzado. Mostrando mejor solución.',
            modelReset: 'Modelo reiniciado al estado inicial.',
            speciesChanged: 'Dataset cambiado: {s1} vs {s2}.',
            selectDifferent: 'Por favor, selecciona dos especies diferentes.',
            petalLength: 'Largo del Pétalo (Eje X)',
            petalWidth: 'Ancho del Pétalo (Eje Y)',
            perfect: '0 (¡Perfecto!)',
            stopTraining: 'Detener Entrenamiento',
            trainAuto: 'Entrenar Automático'
        }
    };
    const t = (key, params = {}) => {
        let str = (i18n[lang] || i18n.en)[key] || key;
        Object.keys(params).forEach(k => str = str.replace(`{${k}}`, params[k]));
        return str;
    };

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

    const termLog = (msg) => {
        if (!msg) {
            return;
        }

        terminalQueue.push(msg);

        if (!flushTerminalQueue()) {
            bindTerminalReady();
        }
    };

    // --- DOM Elements ---
    const canvas = document.getElementById('perceptronCanvas');
    const ctx = canvas.getContext('2d');
    const species1Select = document.getElementById('species1');
    const species2Select = document.getElementById('species2');
    const trainEpochBtn = document.getElementById('trainEpochBtn');
    const trainAutoBtn = document.getElementById('trainAutoBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lrSlider = document.getElementById('lrSlider');
    const speedSlider = document.getElementById('speedSlider');
    const lrValueSpan = document.getElementById('lrValue');
    const speedValueSpan = document.getElementById('speedValue');
    const epochDisplay = document.getElementById('epochDisplay');
    const errorDisplay = document.getElementById('errorDisplay');
    const w1Display = document.getElementById('w1Display');
    const w2Display = document.getElementById('w2Display');
    const bDisplay = document.getElementById('bDisplay');
    const minErrorDisplay = document.getElementById('minErrorDisplay');

    // --- STYLE CONSTANTS ---
    const computedStyles = getComputedStyle(document.documentElement);
    const ACCENT_COLOR = computedStyles.getPropertyValue('--accent-color').trim();
    const SECONDARY_COLOR = computedStyles.getPropertyValue('--secondary-color').trim();
    const MAIN_TEXT_COLOR = computedStyles.getPropertyValue('--main-text-color').trim();
    const FONT_FAMILY = computedStyles.getPropertyValue('--font-family').trim();
    const BEST_LINE_COLOR = computedStyles.getPropertyValue('--best-line-color').trim();

    // --- GLOBAL STATE ---
    let weights = [0, 0], bias = 0, learningRate = 0.1, animationSpeed = 100;
    let irisData = [], currentDataset = [], featureScalers = {};
    let epoch = 0, isTrainingAuto = false, autoTrainIntervalId = null;
    let bestWeights = [0, 0], bestBias = 0, minError = Infinity;
    const MAX_EPOCHS = 500;

    const initializeModel = () => {
        weights = [Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05];
        bias = Math.random() * 0.1 - 0.05;
        epoch = 0;
        minError = Infinity;
        bestWeights = [...weights];
        bestBias = bias;
        updateInfoPanel();
        termLog(t('modelInit'));
    };

    const loadAndParseData = async () => {
        const url = 'https://gist.githubusercontent.com/rodriguezda/f005f670fe85cd77c72cd929cf897acf/raw/iris.csv';
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
            const csvText = await response.text();
            const lines = csvText.trim().split('\n');
            irisData = lines.slice(1).map(line => {
                const values = line.split(',');
                return {
                    petal_length: parseFloat(values[2]),
                    petal_width: parseFloat(values[3]),
                    species: values[4]
                };
            });
            const species = [...new Set(irisData.map(d => d.species))];
            species1Select.innerHTML = species.map(s => `<option value="${s}">${s}</option>`).join('');
            species2Select.innerHTML = species.map(s => `<option value="${s}">${s}</option>`).join('');
            species1Select.value = species[0];
            species2Select.value = species[1];
            enableControls();
            prepareDataset();
            termLog(t('dataLoaded'));
        } catch (error) {
            console.error('Failed to load data:', error);
            termLog(t('dataError'));
        }
    };

    const prepareDataset = () => {
        const species1 = species1Select.value, species2 = species2Select.value;
        if (species1 === species2) {
            alert(t('selectDifferent'));
            species2Select.value = [...new Set(irisData.map(d => d.species))].find(s => s !== species1);
            return;
        }
        const filteredData = irisData.filter(d => d.species === species1 || d.species === species2);
        const xMin = Math.min(...filteredData.map(d => d.petal_length));
        const xMax = Math.max(...filteredData.map(d => d.petal_length));
        const yMin = Math.min(...filteredData.map(d => d.petal_width));
        const yMax = Math.max(...filteredData.map(d => d.petal_width));
        featureScalers.x = val => (val - xMin) / (xMax - xMin) * (canvas.width * 0.9) + (canvas.width * 0.05);
        featureScalers.y = val => (val - yMin) / (yMax - yMin) * (canvas.height * 0.9) + (canvas.height * 0.05);
        currentDataset = filteredData.map(d => ({
            features: [featureScalers.x(d.petal_length), featureScalers.y(d.petal_width)],
            label: d.species === species1 ? 1 : -1,
        }));
        termLog(t('speciesChanged', { s1: species1, s2: species2 }));
        resetModel();
    };

    const activate = sum => (sum >= 0 ? 1 : -1);
    const predict = (inputs, w, b) => activate(inputs.reduce((acc, input, i) => acc + input * w[i], 0) + b);

    const trainEpoch = () => {
        if (currentDataset.length === 0) return;
        currentDataset.sort(() => Math.random() - 0.5);
        for (const dataPoint of currentDataset) {
            const prediction = predict(dataPoint.features, weights, bias);
            const error = dataPoint.label - prediction;
            if (error !== 0) {
                weights[0] += learningRate * error * dataPoint.features[0];
                weights[1] += learningRate * error * dataPoint.features[1];
                bias += learningRate * error;
            }
        }
        const totalError = currentDataset.reduce((acc, dp) => acc + (predict(dp.features, weights, bias) !== dp.label ? 1 : 0), 0);
        if (totalError < minError) {
            minError = totalError;
            bestWeights = [...weights];
            bestBias = bias;
        }
        epoch++;
        updateInfoPanel(totalError, minError);
        drawAll();

        if (totalError === 0) {
            termLog(t('trainingPerfect', { epoch }));
            if (isTrainingAuto) {
                toggleAutoTrain();
                minErrorDisplay.textContent = t('perfect');
            }
        } else {
            termLog(t('trainingEpoch', { epoch, errors: totalError }));
        }
    };

    const toggleAutoTrain = () => {
        isTrainingAuto = !isTrainingAuto;
        if (isTrainingAuto) {
            trainAutoBtn.textContent = t('stopTraining');
            trainEpochBtn.disabled = true;
            resetBtn.disabled = true;
            termLog(t('trainingStarted'));
            const trainingLoop = () => {
                if (epoch >= MAX_EPOCHS) {
                    termLog(t('trainingMaxEpochs', { max: MAX_EPOCHS }));
                    weights = [...bestWeights];
                    bias = bestBias;
                    drawAll();
                    updateInfoPanel(minError, minError);
                    toggleAutoTrain();
                    return;
                }
                trainEpoch();
            };
            autoTrainIntervalId = setInterval(trainingLoop, animationSpeed);
        } else {
            clearInterval(autoTrainIntervalId);
            trainAutoBtn.textContent = t('trainAuto');
            trainEpochBtn.disabled = false;
            resetBtn.disabled = false;
            termLog(t('trainingStopped', { epoch }));
        }
    };

    const resetModel = () => {
        if (isTrainingAuto) toggleAutoTrain();
        initializeModel();
        drawAll();
        termLog(t('modelReset'));
    };

    // --- DRAWING FUNCTIONS ---
    const drawAxisLabels = () => {
        ctx.fillStyle = MAIN_TEXT_COLOR;
        ctx.font = `14px ${FONT_FAMILY}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(t('petalLength'), canvas.width / 2, canvas.height - 5);
        ctx.save();
        ctx.translate(20, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(t('petalWidth'), 0, 0);
        ctx.restore();
    };

    const drawLine = (w, b, color, isDashed = false) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        if (isDashed) { ctx.setLineDash([5, 8]); }
        let x1 = 0, y1 = (-w[0] * x1 - b) / w[1];
        let x2 = canvas.width, y2 = (-w[0] * x2 - b) / w[1];
        if (Math.abs(w[1]) < 1e-6) { x1 = x2 = -b / w[0]; y1 = 0; y2 = canvas.height; }
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        if (isDashed) { ctx.setLineDash([]); }
    };

    const drawDataPoints = () => {
        currentDataset.forEach(dp => {
            ctx.beginPath();
            ctx.arc(dp.features[0], dp.features[1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = dp.label === 1 ? ACCENT_COLOR : SECONDARY_COLOR;
            ctx.fill();
        });
    };

    const drawAll = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxisLabels();
        drawDataPoints();
        if (minError !== Infinity) {
            drawLine(bestWeights, bestBias, BEST_LINE_COLOR, true);
        }
        if (weights.some(w => w !== 0)) {
            drawLine(weights, bias, 'rgba(0, 0, 0, 0.8)');
        }
    };

    const updateInfoPanel = (error = 'N/A', bestError = 'N/A') => {
        epochDisplay.textContent = epoch;
        errorDisplay.textContent = error;
        minErrorDisplay.textContent = bestError === Infinity ? 'N/A' : bestError;
        w1Display.textContent = weights[0].toFixed(4);
        w2Display.textContent = weights[1].toFixed(4);
        bDisplay.textContent = bias.toFixed(4);
    };

    const enableControls = () => {
        [species1Select, species2Select, trainEpochBtn, trainAutoBtn, resetBtn, lrSlider, speedSlider].forEach(c => c.disabled = false);
    };

    // --- EVENT LISTENERS ---
    species1Select.addEventListener('change', prepareDataset);
    species2Select.addEventListener('change', prepareDataset);
    trainEpochBtn.addEventListener('click', trainEpoch);
    trainAutoBtn.addEventListener('click', toggleAutoTrain);
    resetBtn.addEventListener('click', resetModel);
    lrSlider.addEventListener('input', e => {
        learningRate = parseFloat(e.target.value);
        lrValueSpan.textContent = learningRate;
    });
    speedSlider.addEventListener('input', e => {
        animationSpeed = parseInt(e.target.value);
        speedValueSpan.textContent = animationSpeed;
        if (isTrainingAuto) {
            toggleAutoTrain();
            toggleAutoTrain();
        }
    });

    // --- INITIALIZATION ---
    initializeModel();
    loadAndParseData();
    drawAll();
});