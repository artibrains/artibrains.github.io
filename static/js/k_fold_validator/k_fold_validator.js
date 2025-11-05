document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        es: {
            terminal: {
                init: 'KFoldValidator: Inicializado.',
                dataGenerated: (count) => `KFoldValidator: Generados ${count} nuevos puntos de datos.`,
                simpleStart: 'KFoldValidator: Iniciando validación simple (80/20 split).',
                simpleComplete: (error) => `KFoldValidator: Validación simple completada. Error: ${error}%.`,
                invalidK: (k) => `KFoldValidator: Intento de K-Fold cancelado por valor de K inválido: ${k}.`,
                kfoldStart: (k) => `KFoldValidator: Iniciando validación K-Fold con K=${k}.`,
                kfoldComplete: (error) => `KFoldValidator: K-Fold completado. Error promedio: ${error}%.`
            },
            ui: {
                calculating: 'Calculando...',
                dataRegenerated: '¡Datos Regenerados!',
                simpleResult: (error) => `Último Error: ${error}%`,
                foldRound: (round, error) => `Ronda ${round}: Error = ${error}%`,
                averaging: 'Calculando promedio...',
                kfoldResult: (error) => `Último Error Promedio: ${error}%`
            },
            alerts: {
                invalidK: 'Por favor, elige un valor de K entre 2 y 10.'
            }
        },
        en: {
            terminal: {
                init: 'KFoldValidator: Initialized.',
                dataGenerated: (count) => `KFoldValidator: Generated ${count} new data points.`,
                simpleStart: 'KFoldValidator: Starting simple validation (80/20 split).',
                simpleComplete: (error) => `KFoldValidator: Simple validation finished. Error: ${error}%.`,
                invalidK: (k) => `KFoldValidator: K-Fold attempt cancelled due to invalid K value: ${k}.`,
                kfoldStart: (k) => `KFoldValidator: Starting K-Fold validation with K=${k}.`,
                kfoldComplete: (error) => `KFoldValidator: K-Fold completed. Average error: ${error}%.`
            },
            ui: {
                calculating: 'Calculating...',
                dataRegenerated: 'Data regenerated!',
                simpleResult: (error) => `Latest Error: ${error}%`,
                foldRound: (round, error) => `Fold ${round}: Error = ${error}%`,
                averaging: 'Calculating average...',
                kfoldResult: (error) => `Latest Average Error: ${error}%`
            },
            alerts: {
                invalidK: 'Please choose a K value between 2 and 10.'
            }
        }
    };

    function resolveLanguage() {
        const sources = [
            window.gameLanguage,
            document.documentElement ? document.documentElement.lang : null,
            document.documentElement ? document.documentElement.getAttribute('xml:lang') : null
        ];

        for (const source of sources) {
            if (!source) continue;
            const normalized = String(source).trim().toLowerCase();
            if (translations[normalized]) {
                return normalized;
            }
        }

        return 'es';
    }

    function getStrings() {
        const lang = resolveLanguage();
        return translations[lang] || translations.es;
    }

    const strings = getStrings();

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

        let retries = 0;
        const MAX_RETRIES = 80;

        (function pollUntilReady() {
            if (flushTerminalQueue()) {
                return;
            }

            if (retries >= MAX_RETRIES) {
                console.warn('[KFoldValidator] Terminal not ready after retries.');
                return;
            }

            retries += 1;
            setTimeout(pollUntilReady, 120);
        })();
    }

    function logToTerminal(message) {
        if (!message) {
            return;
        }

        const formatted = message.endsWith('\n') ? message : `${message}\n`;
        terminalQueue.push(formatted);

        if (!flushTerminalQueue()) {
            bindTerminalReady();
        }
    }

    // --- Constants ---
    const NUM_DATA_POINTS = 1000;

    // --- DOM Elements ---
    const dataContainer = document.getElementById('data-container');
    const kFoldsInput = document.getElementById('k-folds-input');
    const runSimpleSplitBtn = document.getElementById('run-simple-split-btn');
    const runKFoldBtn = document.getElementById('run-k-fold-btn');
    const regenerateDataBtn = document.getElementById('regenerate-data-btn');

    const simpleResultLatestEl = document.getElementById('simple-result-latest');
    const simpleResultHistoryEl = document.getElementById('simple-result-history');

    const kFoldProcessEl = document.getElementById('k-fold-process');
    const kFoldFinalResultLatestEl = document.getElementById('k-fold-final-result-latest');
    const kFoldHistoryEl = document.getElementById('k-fold-history');

    // --- State ---
    let dataPoints = [];
    let simpleSplitHistory = [];
    let kFoldHistory = [];
    const allButtons = [runSimpleSplitBtn, runKFoldBtn, regenerateDataBtn];

    function init() {
        generateDataPoints();
        runSimpleSplitBtn.addEventListener('click', runSimpleSplitStandalone);
        runKFoldBtn.addEventListener('click', runKFoldStandalone);
        regenerateDataBtn.addEventListener('click', regenerateData);
        logToTerminal(strings.terminal.init);
    }

    function setControlsDisabled(disabled) {
        allButtons.forEach(btn => btn.disabled = disabled);
        kFoldsInput.disabled = disabled;
    }

    function generateDataPoints() {
        dataContainer.innerHTML = '';
        dataPoints = [];
        for (let i = 0; i < NUM_DATA_POINTS; i++) {
            const point = document.createElement('div');
            point.className = 'data-point';
            point.dataset.id = i;
            point.dataset.difficulty = Math.random();
            dataContainer.appendChild(point);
            dataPoints.push(point);
        }
        logToTerminal(strings.terminal.dataGenerated(NUM_DATA_POINTS));
    }

    function regenerateData() {
        clearAll();
        generateDataPoints();
        const originalText = regenerateDataBtn.textContent;
        regenerateDataBtn.textContent = strings.ui.dataRegenerated;
        setControlsDisabled(true);
        setTimeout(() => {
            regenerateDataBtn.textContent = originalText;
            setControlsDisabled(false);
        }, 1000);
    }

    function clearAll() {
        dataPoints.forEach(point => { point.className = 'data-point'; });
        simpleResultLatestEl.textContent = '';
        kFoldProcessEl.innerHTML = '';
        kFoldProcessEl.classList.remove('visible');
        kFoldFinalResultLatestEl.textContent = '';
        simpleSplitHistory = [];
        kFoldHistory = [];
        updateHistoryDisplay('simple');
        updateHistoryDisplay('kfold');
    }

    function clearSpecificVisuals(type) {
        if (type === 'simple') {
            dataPoints.forEach(p => p.classList.remove('train', 'test'));
        } else if (type === 'kfold') {
            dataPoints.forEach(p => { p.className = 'data-point'; });
            kFoldProcessEl.classList.remove('visible');
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function simulateModelEvaluation(testPoints, trainPoints) {
        const trainDifficultySum = trainPoints.reduce((sum, point) => sum + parseFloat(point.dataset.difficulty), 0);
        const avgTrainDifficulty = trainDifficultySum / trainPoints.length;
        const trainingNoise = (Math.random() - 0.5) * 0.5;
        const modelQualityPenalty = (0.5 - avgTrainDifficulty) * 3 + trainingNoise;
        const testDifficultySum = testPoints.reduce((sum, point) => sum + parseFloat(point.dataset.difficulty), 0);
        const avgTestDifficulty = testDifficultySum / testPoints.length;
        const baseError = 5 + avgTestDifficulty * 10;
        const finalError = baseError + modelQualityPenalty;
        return Math.max(3.0, Math.min(17.0, finalError));
    }


    async function runSimpleSplitStandalone() {
        setControlsDisabled(true);
        clearSpecificVisuals('kfold');
        simpleResultLatestEl.textContent = strings.ui.calculating;
        logToTerminal(strings.terminal.simpleStart);
        await new Promise(res => setTimeout(res, 200));
        const shuffledPoints = [...dataPoints];
        shuffleArray(shuffledPoints);
        const trainSize = Math.floor(NUM_DATA_POINTS * 0.8);
        const trainPoints = shuffledPoints.slice(0, trainSize);
        const testPoints = shuffledPoints.slice(trainSize);
        shuffledPoints.forEach((point, index) => {
            point.classList.remove('train', 'test');
            point.classList.add(index < trainSize ? 'train' : 'test');
        });
        const error = simulateModelEvaluation(testPoints, trainPoints);
        simpleSplitHistory.push(error);
        simpleResultLatestEl.textContent = strings.ui.simpleResult(error.toFixed(2));
        updateHistoryDisplay('simple');
        setControlsDisabled(false);
        logToTerminal(strings.terminal.simpleComplete(error.toFixed(2)));
    }

    async function runKFoldStandalone() {
        setControlsDisabled(true);
        clearSpecificVisuals('simple');

        // --- LÓGICA DE PREPARACIÓN CORREGIDA ---
        // 1. Limpiar el contenido anterior del cuadro.
        kFoldProcessEl.innerHTML = '';
        // 2. Hacer visible el cuadro para que la animación pueda empezar.
        kFoldProcessEl.classList.add('visible');
        // 3. Limpiar cualquier texto de resultado final anterior.
        kFoldFinalResultLatestEl.textContent = '';

        // 4. Ahora, ejecutar el proceso que llenará el cuadro ya visible.
        await runKFold();

        setControlsDisabled(false);
    }

    async function runKFold() {
        const k = parseInt(kFoldsInput.value, 10);
        if (k < 2 || k > 10) {
            alert(strings.alerts.invalidK);
            // Si el usuario cancela o pone un valor malo, ocultamos el cuadro.
            kFoldProcessEl.classList.remove('visible');
            logToTerminal(strings.terminal.invalidK(k));
            return;
        }
        logToTerminal(strings.terminal.kfoldStart(k));

        // --- LIMPIEZA PROBLEMÁTICA ELIMINADA DE AQUÍ ---

        const shuffledPoints = [...dataPoints];
        shuffleArray(shuffledPoints);
        const foldSize = Math.floor(NUM_DATA_POINTS / k);
        const folds = [];
        for (let i = 0; i < k; i++) {
            const start = i * foldSize;
            const end = (i === k - 1) ? NUM_DATA_POINTS : start + foldSize;
            const fold = shuffledPoints.slice(start, end);
            folds.push(fold);
            fold.forEach(point => point.classList.add(`fold-${i + 1}`));
        }

        await new Promise(res => setTimeout(res, 300));

        let totalError = 0;
        for (let i = 0; i < k; i++) {
            dataPoints.forEach(point => point.classList.remove('is-training', 'is-testing'));
            await new Promise(res => setTimeout(res, 50));
            const testPoints = folds[i];
            const trainPoints = folds.filter((_, index) => index !== i).flat();
            for (let j = 0; j < k; j++) {
                folds[j].forEach(point => point.classList.add(i === j ? 'is-testing' : 'is-training'));
            }
            const error = simulateModelEvaluation(testPoints, trainPoints);
            totalError += error;
            const resultP = document.createElement('p');
            resultP.textContent = strings.ui.foldRound(i + 1, error.toFixed(2));
            kFoldProcessEl.appendChild(resultP);
            kFoldProcessEl.scrollTop = kFoldProcessEl.scrollHeight;
            await new Promise(res => setTimeout(res, 800));
        }

        kFoldFinalResultLatestEl.textContent = strings.ui.averaging;
        await new Promise(res => setTimeout(res, 600));

        const avgError = totalError / k;
        kFoldHistory.push(avgError);
        kFoldFinalResultLatestEl.textContent = strings.ui.kfoldResult(avgError.toFixed(2));
        updateHistoryDisplay('kfold');
        dataPoints.forEach(point => point.classList.remove('is-training', 'is-testing'));
        logToTerminal(strings.terminal.kfoldComplete(avgError.toFixed(2)));
    }

    function updateHistoryDisplay(type) {
        if (type === 'simple') {
            simpleResultHistoryEl.innerHTML = '';
            const stableAvg = kFoldHistory.length > 0 ? kFoldHistory.reduce((a, b) => a + b, 0) / kFoldHistory.length : 10;
            simpleSplitHistory.forEach(val => {
                const item = document.createElement('span');
                item.className = 'history-item';
                item.textContent = val.toFixed(2);
                if (val < stableAvg - 1.5) item.classList.add('lucky');
                if (val > stableAvg + 1.5) item.classList.add('unlucky');
                simpleResultHistoryEl.appendChild(item);
            });
            simpleResultHistoryEl.scrollTop = simpleResultHistoryEl.scrollHeight;
        } else {
            kFoldHistoryEl.innerHTML = '';
            kFoldHistory.forEach(val => {
                const item = document.createElement('span');
                item.className = 'history-item';
                item.textContent = val.toFixed(2);
                kFoldHistoryEl.appendChild(item);
            });
            kFoldHistoryEl.scrollTop = kFoldHistoryEl.scrollHeight;
        }
    }

    init();
});