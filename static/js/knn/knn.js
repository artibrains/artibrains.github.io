// --- Translations ---
const translations = {
    es: {
        initialized: "KNN: Aplicación K-NN inicializada.",
        modeChanged: "KNN: Modo cambiado a {mode}.",
        dataGenerated: "KNN: Generados 30 puntos de datos aleatorios.",
        dataCleared: "KNN: Todos los datos han sido borrados.",
        showingBoundaries: "KNN: Mostrando fronteras de decisión.",
        hidingBoundaries: "KNN: Ocultando fronteras de decisión.",
        showingDistances: "KNN: Mostrando distancias a vecinos.",
        hidingDistances: "KNN: Ocultando distancias a vecinos.",
        pointAdded: "KNN: Punto de {type} añadido en ({x}, {y}).",
        classified: "KNN: Punto clasificado como {class} con confianza {conf}%."
    },
    en: {
        initialized: "KNN: K-NN application initialized.",
        modeChanged: "KNN: Mode changed to {mode}.",
        dataGenerated: "KNN: Generated 30 random data points.",
        dataCleared: "KNN: All data has been cleared.",
        showingBoundaries: "KNN: Showing decision boundaries.",
        hidingBoundaries: "KNN: Hiding decision boundaries.",
        showingDistances: "KNN: Showing distances to neighbors.",
        hidingDistances: "KNN: Hiding distances to neighbors.",
        pointAdded: "KNN: {type} point added at ({x}, {y}).",
        classified: "KNN: Point classified as {class} with {conf}% confidence."
    }
};

let lang = 'en';

function t(key, params = {}) {
    // Ensure we use the current lang from window if available, or fallback to local var
    const currentLang = window.gameLanguage || lang;
    let text = (translations[currentLang] && translations[currentLang][key]) || translations['en'][key] || key;
    Object.keys(params).forEach(k => {
        text = text.replace(`{${k}}`, params[k]);
    });
    return text;
}

document.addEventListener('DOMContentLoaded', () => {
    lang = window.gameLanguage || 'en';
    console.log("KNN Language detected:", lang);

    // --- VARIABLES GLOBALES Y CONSTANTES ---

    // Estado de la aplicación
    let currentMode = 'classify'; // 'cats', 'dogs', 'classify'
    let k = 3;
    let distanceMetric = 'euclidean';
    let showingBoundaries = false;
    let showingDistances = false;

    // Datos de entrenamiento
    let trainingData = [];
    let lastClassification = null;

    // Canvas y visualización
    let canvas, ctx;
    let canvasRect;

    // Elementos del DOM
    const kSlider = document.getElementById('k-slider');
    const kValue = document.getElementById('k-value');
    const distanceSelect = document.getElementById('distance-metric');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const generateDataBtn = document.getElementById('generate-data-btn');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const showBoundariesBtn = document.getElementById('show-boundaries-switch');
    const showDistancesBtn = document.getElementById('show-distances-switch');
    const classificationResult = document.getElementById('classification-result');
    const resultDetails = document.getElementById('result-details');
    const totalPoints = document.getElementById('total-points');
    const catCount = document.getElementById('cat-count');
    const dogCount = document.getElementById('dog-count');
    const currentK = document.getElementById('current-k');
    const currentKDisplay = document.getElementById('current-k-display');
    const currentModeDisplay = document.getElementById('current-mode-display');
    const currentMetricDisplay = document.getElementById('current-metric-display');
    const balanceFill = document.getElementById('balance-fill');
    const tooltip = document.getElementById('tooltip');

    // --- FUNCIONES DE INICIALIZACIÓN ---

    function init() {
        canvas = document.getElementById('knn-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        ctx = canvas.getContext('2d');

        // Hacer el canvas responsive
        resizeCanvas();

        // Configurar eventos
        setupEventListeners();

        // Generar datos iniciales
        generateSampleData();

        // Dibujar estado inicial
        drawCanvas();

        // Actualizar estadísticas
        updateStats();

        // Inicializar displays de estado
        if (currentModeDisplay) currentModeDisplay.textContent = 'Modo: Añadir Gatos 🐱';
        if (currentMetricDisplay) currentMetricDisplay.textContent = 'Euclidiana';

        console.log('Aplicación K-NN inicializada');
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('initialized') + "\n");
        }
    }

    function resizeCanvas() {
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth;
        const maxWidth = Math.min(600, containerWidth);
        const aspectRatio = 400 / 600;

        canvas.width = 600;
        canvas.height = 400;
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (maxWidth * aspectRatio) + 'px';
    }

    function setupEventListeners() {
        // Canvas events
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('mousemove', handleCanvasMouseMove);
        canvas.addEventListener('mouseleave', hideTooltip);

        // Control events
        if (kSlider) kSlider.addEventListener('input', handleKChange);
        if (distanceSelect) distanceSelect.addEventListener('change', handleDistanceChange);

        // Mode buttons
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => handleModeChange(btn.dataset.mode));
        });

        // Action buttons
        if (generateDataBtn) generateDataBtn.addEventListener('click', generateRandomData);
        if (clearDataBtn) clearDataBtn.addEventListener('click', clearAllData);
        if (showBoundariesBtn) showBoundariesBtn.addEventListener('change', toggleBoundaries);
        if (showDistancesBtn) showDistancesBtn.addEventListener('change', toggleDistances);

        // Window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            updateCanvasRect();
            drawCanvas();
        });
        updateCanvasRect();
    }

    function updateCanvasRect() {
        if (canvas) {
            canvasRect = canvas.getBoundingClientRect();
        }
    }

    // --- FUNCIONES DE MANEJO DE EVENTOS ---

    function handleCanvasClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (currentMode === 'cats' || currentMode === 'dogs') {
            addTrainingPoint(x, y, currentMode === 'cats' ? 'cat' : 'dog');
        } else if (currentMode === 'classify') {
            classifyPoint(x, y);
        }
    }

    function handleCanvasMouseMove(e) {
        if (currentMode !== 'classify') return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Mostrar tooltip con predicción en tiempo real
        if (trainingData.length >= k) {
            const result = performKNN(x, y);
            if (result.predictedClass) {
                const emoji = result.predictedClass === 'cat' ? '🐱' : '🐶';
                showTooltip(e, `Predicción: ${emoji} ${result.predictedClass}\nConfianza: ${(result.confidence * 100).toFixed(1)}%`);
            }
        }
    }

    function hideTooltip() {
        if (tooltip) tooltip.classList.add('hidden');
    }

    function showTooltip(e, text) {
        if (!tooltip) return;
        tooltip.textContent = text;
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
        tooltip.classList.remove('hidden');
    }

    function handleKChange() {
        k = parseInt(kSlider.value);
        if (kValue) kValue.textContent = k;
        if (currentK) currentK.textContent = k;
        if (currentKDisplay) currentKDisplay.textContent = k;

        if (window.CustomTerminal) {
            window.CustomTerminal.write(`KNN: Valor de K cambiado a ${k}.\n`);
        }

        if (showingBoundaries) {
            drawDecisionBoundaries();
        }

        if (lastClassification) {
            const result = performKNN(lastClassification.x, lastClassification.y);
            updateClassificationDisplay(result, lastClassification.x, lastClassification.y);
        }

        drawCanvas();
    }

    function handleDistanceChange() {
        distanceMetric = distanceSelect.value;
        if (currentMetricDisplay) {
            currentMetricDisplay.textContent = distanceMetric === 'euclidean' ? 'Euclidiana' : 'Manhattan';
        }

        if (window.CustomTerminal) {
            window.CustomTerminal.write(`KNN: Métrica de distancia cambiada a ${distanceMetric}.\n`);
        }

        if (showingBoundaries) {
            drawDecisionBoundaries();
        }

        if (lastClassification) {
            const result = performKNN(lastClassification.x, lastClassification.y);
            updateClassificationDisplay(result, lastClassification.x, lastClassification.y);
        }

        drawCanvas();
    }

    function handleModeChange(mode) {
        currentMode = mode;

        // Actualizar botones
        modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Actualizar display del modo actual
        if (currentModeDisplay) {
            const modeText = {
                'cats': 'Modo: Añadir Gatos 🐱',
                'dogs': 'Modo: Añadir Perros 🐶',
                'classify': 'Modo: Clasificar 🔍'
            };
            currentModeDisplay.textContent = modeText[mode] || 'Modo: Desconocido';
        }

        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('modeChanged', { mode }) + "\n");
        }

        // Cambiar cursor del canvas
        if (mode === 'classify') {
            canvas.style.cursor = 'crosshair';
        } else {
            canvas.style.cursor = 'pointer';
        }

        // Limpiar clasificación anterior si cambió de modo
        if (mode !== 'classify') {
            lastClassification = null;
            if (classificationResult) classificationResult.classList.add('hidden');
        }

        drawCanvas();
    }

    // --- FUNCIONES DE DATOS ---

    function addTrainingPoint(x, y, type) {
        trainingData.push({ x, y, type });
        updateStats();
        drawCanvas();

        if (window.CustomTerminal) {
            window.CustomTerminal.write(`KNN: Añadido punto de entrenamiento (${type}) en (${Math.round(x)}, ${Math.round(y)}).\n`);
        }

        // Si hay fronteras visibles, actualizarlas
        if (showingBoundaries) {
            drawDecisionBoundaries();
        }
    }

    function generateSampleData() {
        // Datos de ejemplo balanceados
        const samples = [
            { x: 150, y: 100, type: 'cat' },
            { x: 200, y: 120, type: 'cat' },
            { x: 180, y: 150, type: 'cat' },
            { x: 120, y: 180, type: 'cat' },
            { x: 250, y: 100, type: 'cat' },
            { x: 170, y: 130, type: 'cat' },
            { x: 140, y: 160, type: 'cat' },

            { x: 450, y: 280, type: 'dog' },
            { x: 500, y: 300, type: 'dog' },
            { x: 480, y: 330, type: 'dog' },
            { x: 420, y: 350, type: 'dog' },
            { x: 550, y: 280, type: 'dog' },
            { x: 470, y: 310, type: 'dog' },
            { x: 430, y: 320, type: 'dog' }
        ];

        trainingData = samples;
        if (window.CustomTerminal) {
            window.CustomTerminal.write("KNN: Generados datos de ejemplo.\n");
        }
    }

    function generateRandomData() {
        trainingData = [];

        // Generar 15 gatos en área superior izquierda
        for (let i = 0; i < 15; i++) {
            trainingData.push({
                x: Math.random() * 300 + 50,
                y: Math.random() * 200 + 50,
                type: 'cat'
            });
        }

        // Generar 15 perros en área inferior derecha
        for (let i = 0; i < 15; i++) {
            trainingData.push({
                x: Math.random() * 250 + 300,
                y: Math.random() * 150 + 200,
                type: 'dog'
            });
        }

        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('dataGenerated') + "\n");
        }

        updateStats();
        drawCanvas();

        if (showingBoundaries) {
            drawDecisionBoundaries();
        }
    }

    function clearAllData() {
        trainingData = [];
        lastClassification = null;
        if (classificationResult) classificationResult.classList.add('hidden');
        showingBoundaries = false;
        showingDistances = false;

        // Resetear switches
        if (showBoundariesBtn) showBoundariesBtn.checked = false;
        if (showDistancesBtn) showDistancesBtn.checked = false;

        updateStats();
        drawCanvas();
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('dataCleared') + "\n");
        }
    }

    function updateStats() {
        const cats = trainingData.filter(p => p.type === 'cat').length;
        const dogs = trainingData.filter(p => p.type === 'dog').length;
        const total = trainingData.length;

        if (totalPoints) totalPoints.textContent = total;
        if (catCount) catCount.textContent = cats;
        if (dogCount) dogCount.textContent = dogs;
        if (currentK) currentK.textContent = k;
        if (currentKDisplay) currentKDisplay.textContent = k;

        // Actualizar barra de balance
        if (balanceFill && total > 0) {
            const catPercentage = (cats / total) * 100;
            balanceFill.style.width = `${catPercentage}%`;
        }
    }

    // --- ALGORITMO K-NN ---

    function calculateDistance(p1, p2) {
        if (distanceMetric === 'euclidean') {
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        } else {
            return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
        }
    }

    function performKNN(x, y) {
        if (trainingData.length === 0) {
            return { predictedClass: null, confidence: 0, neighbors: [] };
        }

        const testPoint = { x, y };

        // Calcular distancias a todos los puntos
        const distances = trainingData.map(point => ({
            ...point,
            distance: calculateDistance(testPoint, point)
        }));

        // Ordenar por distancia y tomar los K más cercanos
        distances.sort((a, b) => a.distance - b.distance);
        const neighbors = distances.slice(0, Math.min(k, distances.length));

        // Contar votos
        const votes = {};
        neighbors.forEach(neighbor => {
            votes[neighbor.type] = (votes[neighbor.type] || 0) + 1;
        });

        // Encontrar clase mayoritaria
        let predictedClass = null;
        let maxVotes = 0;

        for (const [type, count] of Object.entries(votes)) {
            if (count > maxVotes) {
                maxVotes = count;
                predictedClass = type;
            }
        }

        const confidence = neighbors.length > 0 ? maxVotes / neighbors.length : 0;

        return {
            predictedClass,
            confidence,
            neighbors,
            votes
        };
    }

    function classifyPoint(x, y) {
        if (trainingData.length < k) {
            alert(`Necesitas al menos ${k} puntos de entrenamiento para clasificar con K=${k}`);
            return;
        }

        const result = performKNN(x, y);
        lastClassification = { x, y };

        updateClassificationDisplay(result, x, y);
        drawCanvas();
        if (window.CustomTerminal) {
            window.CustomTerminal.write(`KNN: Clasificado punto en (${Math.round(x)}, ${Math.round(y)}). Resultado: ${result.predictedClass}.\n`);
        }
    }

    function updateClassificationDisplay(result, x, y) {
        if (!result.predictedClass || !resultDetails) return;

        const emoji = result.predictedClass === 'cat' ? '🐱' : '🐶';
        const className = result.predictedClass === 'cat' ? 'gato' : 'perro';

        resultDetails.innerHTML = `
            <p><strong>Coordenadas:</strong> (${Math.round(x)}, ${Math.round(y)})</p>
            <p><strong>Predicción:</strong> ${emoji} ${className}</p>
            <p><strong>Confianza:</strong> ${(result.confidence * 100).toFixed(1)}%</p>
            <p><strong>Vecinos considerados:</strong> ${result.neighbors.length}</p>
            <p><strong>Votos:</strong></p>
            <ul>
                ${Object.entries(result.votes).map(([type, count]) =>
            `<li>${type === 'cat' ? '🐱 Gatos' : '🐶 Perros'}: ${count}</li>`
        ).join('')}
            </ul>
            <p><strong>Métrica de distancia:</strong> ${distanceMetric === 'euclidean' ? 'Euclidiana' : 'Manhattan'}</p>
        `;

        if (classificationResult) classificationResult.classList.remove('hidden');
    }

    // --- FUNCIONES DE VISUALIZACIÓN ---

    function drawCanvas() {
        if (!ctx || !canvas) return;

        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar fondo
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar cuadrícula y ejes
        drawGrid();

        // Dibujar fronteras si están activas
        if (showingBoundaries) {
            drawDecisionBoundariesBackground();
        }

        // Dibujar puntos de entrenamiento
        drawTrainingPoints();

        // Dibujar punto de clasificación y vecinos
        if (lastClassification && currentMode === 'classify') {
            drawClassificationVisualization();
        }
    }

    function drawGrid() {
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;

        // Líneas verticales
        for (let x = 0; x <= canvas.width; x += 60) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Líneas horizontales
        for (let y = 0; y <= canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Ejes principales
        ctx.strokeStyle = '#d0d0d0';
        ctx.lineWidth = 2;

        // Eje X (sociabilidad)
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 20);
        ctx.lineTo(canvas.width, canvas.height - 20);
        ctx.stroke();

        // Eje Y (agilidad)
        ctx.beginPath();
        ctx.moveTo(30, 0);
        ctx.lineTo(30, canvas.height);
        ctx.stroke();

        // Etiquetas de los ejes
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        // Etiquetas eje X
        ctx.fillText('Baja', 50, canvas.height - 5);
        ctx.fillText('SOCIABILIDAD', canvas.width / 2, canvas.height - 5);
        ctx.fillText('Alta', canvas.width - 50, canvas.height - 5);

        // Etiquetas eje Y
        ctx.save();
        ctx.translate(10, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('AGILIDAD', 0, 5);
        ctx.restore();

        ctx.textAlign = 'left';
        ctx.fillText('Baja', 3, canvas.height - 25);
        ctx.fillText('Alta', 3, 15);
    }

    function drawTrainingPoints() {
        trainingData.forEach(point => {
            const color = point.type === 'cat' ? '#e74c3c' : '#f39c12';

            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    function drawClassificationVisualization() {
        const result = performKNN(lastClassification.x, lastClassification.y);

        if (showingDistances) {
            // Dibujar líneas a todos los vecinos
            result.neighbors.forEach((neighbor, index) => {
                ctx.beginPath();
                ctx.moveTo(lastClassification.x, lastClassification.y);
                ctx.lineTo(neighbor.x, neighbor.y);
                ctx.strokeStyle = `rgba(46, 204, 113, ${0.8 - index * 0.1})`;
                ctx.lineWidth = Math.max(1, 3 - index * 0.3);
                ctx.stroke();
            });
        }

        // Resaltar vecinos más cercanos
        result.neighbors.forEach((neighbor, index) => {
            ctx.beginPath();
            ctx.arc(neighbor.x, neighbor.y, 12, 0, 2 * Math.PI);
            ctx.strokeStyle = '#2ecc71';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Número del vecino
            ctx.fillStyle = '#2ecc71';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(index + 1, neighbor.x + 15, neighbor.y - 15);
        });

        // Dibujar punto de clasificación
        const color = result.predictedClass === 'cat' ? '#e74c3c' : '#f39c12';
        ctx.beginPath();
        ctx.arc(lastClassification.x, lastClassification.y, 12, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#9b59b6';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    function toggleBoundaries(e) {
        showingBoundaries = e.target.checked;

        if (showingBoundaries) {
            if (trainingData.length < 3) {
                alert('Necesitas al menos 3 puntos para mostrar fronteras de decisión');
                showingBoundaries = false;
                e.target.checked = false;
                return;
            }
            drawDecisionBoundaries();
            if (window.CustomTerminal) {
                window.CustomTerminal.write(t('showingBoundaries') + "\n");
            }
        } else {
            drawCanvas();
            if (window.CustomTerminal) {
                window.CustomTerminal.write(t('hidingBoundaries') + "\n");
            }
        }
    }

    function toggleDistances(e) {
        showingDistances = e.target.checked;
        drawCanvas();
        if (window.CustomTerminal) {
            const key = showingDistances ? 'showingDistances' : 'hidingDistances';
            window.CustomTerminal.write(t(key) + "\n");
        }
    }

    function drawDecisionBoundaries() {
        const resolution = 10;
        const imageData = ctx.createImageData(canvas.width, canvas.height);

        for (let x = 0; x < canvas.width; x += resolution) {
            for (let y = 0; y < canvas.height; y += resolution) {
                const result = performKNN(x, y);

                if (result.predictedClass) {
                    const alpha = 0.3 * result.confidence;
                    const color = result.predictedClass === 'cat' ?
                        [231, 76, 60, Math.floor(alpha * 255)] :
                        [243, 156, 18, Math.floor(alpha * 255)];

                    for (let dx = 0; dx < resolution && x + dx < canvas.width; dx++) {
                        for (let dy = 0; dy < resolution && y + dy < canvas.height; dy++) {
                            const index = ((y + dy) * canvas.width + (x + dx)) * 4;
                            imageData.data[index] = color[0];
                            imageData.data[index + 1] = color[1];
                            imageData.data[index + 2] = color[2];
                            imageData.data[index + 3] = color[3];
                        }
                    }
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        drawTrainingPoints();

        if (lastClassification && currentMode === 'classify') {
            drawClassificationVisualization();
        }
    }

    function drawDecisionBoundariesBackground() {
        // Esta función se llama desde drawCanvas cuando showingBoundaries es true
        drawDecisionBoundaries();
    }

    // --- INICIALIZACIÓN ---
    init();
});