/**
 * LLM Training Game - Interactive Language Model Training Simulator
 * 
 * Educational game that simulates progressive training of a language model
 * on a small coherent text corpus.
 * 
 * PEDAGOGICAL GOAL: Experience how a language model improves predictions
 * as the same internal parameters are adjusted across multiple related examples.
 */

// ============================================
// CONFIGURATION AND GLOBAL STATE
// ============================================

const LLMGame = {
    // Current language
    lang: 'es',

    // Current training mode
    currentMode: 'fill-blank', // 'fill-blank', 'next-word', 'correction'

    // Current paragraph and sentence index
    currentParagraph: null,
    currentSentenceIndex: 0,

    // Neural network state (persistent across mode changes)
    network: {
        structure: [4, 5, 4, 3], // Input, Hidden1, Hidden2, Output
        weights: [], // Connection weights
        biases: [],  // Node biases (used as node values)
        positions: [], // SVG positions for drawing
        initialSnapshot: { weights: [], biases: [] } // For comparison at end
    },

    // Statistics
    stats: {
        examplesProcessed: 0,
        correct: 0,
        errors: 0
    },

    // Accumulated context
    completedSentences: [],

    // UI state
    feedbackShown: false,
    gameComplete: false
};

// ============================================
// TRANSLATIONS
// ============================================

const translations = {
    es: {
        // Mode titles
        modeFillBlank: 'Palabra Faltante',
        modeNextWord: 'Siguiente Palabra',
        modeCorrection: 'Corrección',

        // Challenge titles
        challengeFillBlank: '🎯 Completa la frase',
        challengeNextWord: '🎯 ¿Cuál es la siguiente palabra?',
        challengeCorrection: '🎯 Encuentra la palabra incorrecta',

        // Feedback
        feedbackCorrect: '✅ ¡Correcto!',
        feedbackIncorrect: '❌ Incorrecto',
        feedbackExplanation: 'La red ha ajustado sus valores basándose en este ejemplo.',
        feedbackCorrectWord: 'La palabra correcta es: ',

        // Network labels
        layerInput: 'Entrada',
        layerHidden1: 'Oculta 1',
        layerHidden2: 'Oculta 2',
        layerOutput: 'Salida',

        // UI text
        contextPlaceholder: 'El contexto aparecerá aquí a medida que avances...',
        blankPlaceholder: '___',
        continue: 'Continuar ➡️',

        // Completion
        completionTitle: '🎉 ¡Párrafo Completado!',
        totalExamples: 'Ejemplos procesados',
        accuracy: 'Precisión',
        networkTrained: 'La red está entrenada en este tema',

        // Terminal messages
        terminalGameLoaded: 'Juego de Entrenamiento LLM cargado.',
        terminalNewParagraph: 'Nuevo párrafo seleccionado: ',
        terminalModeChanged: 'Modo cambiado a: ',
        terminalCorrectAnswer: '✅ Respuesta correcta. Ajustando red...',
        terminalIncorrectAnswer: '❌ Respuesta incorrecta. Ajustando red...',
        terminalNetworkReset: 'Red neuronal reiniciada.',
        terminalParagraphComplete: '🎉 Párrafo completado. Modelo entrenado.',
        terminalNetworkAdjusted: 'Valores de red ajustados. Cambio promedio: '
    },
    en: {
        // Mode titles
        modeFillBlank: 'Missing Word',
        modeNextWord: 'Next Word',
        modeCorrection: 'Correction',

        // Challenge titles
        challengeFillBlank: '🎯 Complete the sentence',
        challengeNextWord: '🎯 What is the next word?',
        challengeCorrection: '🎯 Find the incorrect word',

        // Feedback
        feedbackCorrect: '✅ Correct!',
        feedbackIncorrect: '❌ Incorrect',
        feedbackExplanation: 'The network has adjusted its values based on this example.',
        feedbackCorrectWord: 'The correct word is: ',

        // Network labels
        layerInput: 'Input',
        layerHidden1: 'Hidden 1',
        layerHidden2: 'Hidden 2',
        layerOutput: 'Output',

        // UI text
        contextPlaceholder: 'Context will appear here as you progress...',
        blankPlaceholder: '___',
        continue: 'Continue ➡️',

        // Completion
        completionTitle: '🎉 Paragraph Complete!',
        totalExamples: 'Examples processed',
        accuracy: 'Accuracy',
        networkTrained: 'The network is trained on this topic',

        // Terminal messages
        terminalGameLoaded: 'LLM Training Game loaded.',
        terminalNewParagraph: 'New paragraph selected: ',
        terminalModeChanged: 'Mode changed to: ',
        terminalCorrectAnswer: '✅ Correct answer. Adjusting network...',
        terminalIncorrectAnswer: '❌ Incorrect answer. Adjusting network...',
        terminalNetworkReset: 'Neural network reset.',
        terminalParagraphComplete: '🎉 Paragraph complete. Model trained.',
        terminalNetworkAdjusted: 'Network values adjusted. Average change: '
    }
};

// ============================================
// THEMATIC PARAGRAPHS (CORPUS)
// ============================================

const paragraphs = {
    es: [
        {
            topic: 'Diagnóstico Médico',
            sentences: [
                { text: 'El paciente llegó con fiebre alta.', target: 'fiebre', position: 4 },
                { text: 'La fiebre indicaba una posible infección.', target: 'posible', position: 5 },
                { text: 'El médico ordenó análisis de sangre.', target: 'análisis', position: 4 },
                { text: 'Los análisis revelaron una infección bacteriana.', target: 'infección', position: 5 },
                { text: 'Se prescribió un tratamiento con antibióticos.', target: 'tratamiento', position: 4 },
                { text: 'Los antibióticos combaten las bacterias.', target: 'combaten', position: 3 },
                { text: 'Después del tratamiento la fiebre bajó.', target: 'fiebre', position: 5 },
                { text: 'El paciente se recuperó completamente.', target: 'recuperó', position: 3 }
            ],
            distractors: ['dolor', 'probable', 'pruebas', 'enfermedad', 'medicamento', 'eliminan', 'temperatura', 'empeoró']
        },
        {
            topic: 'Clima y Estaciones',
            sentences: [
                { text: 'En verano el sol brilla intensamente.', target: 'brilla', position: 5 },
                { text: 'El sol calienta la tierra cada día.', target: 'tierra', position: 5 },
                { text: 'Las plantas necesitan luz solar.', target: 'luz', position: 4 },
                { text: 'La luz permite la fotosíntesis vegetal.', target: 'fotosíntesis', position: 5 },
                { text: 'En otoño las hojas cambian de color.', target: 'hojas', position: 4 },
                { text: 'Las hojas caen de los árboles.', target: 'caen', position: 3 },
                { text: 'Los árboles quedan desnudos en invierno.', target: 'desnudos', position: 4 },
                { text: 'El invierno trae frío y nieve.', target: 'frío', position: 4 }
            ],
            distractors: ['resplandece', 'agua', 'calor', 'respiración', 'ramas', 'crecen', 'cubiertos', 'calor']
        },
        {
            topic: 'Aprendizaje Automático',
            sentences: [
                { text: 'Los modelos aprenden de los datos.', target: 'datos', position: 6 },
                { text: 'Los datos contienen patrones ocultos.', target: 'patrones', position: 4 },
                { text: 'Identificar patrones mejora las predicciones.', target: 'predicciones', position: 5 },
                { text: 'Las predicciones se comparan con la realidad.', target: 'realidad', position: 7 },
                { text: 'El error mide la diferencia observada.', target: 'diferencia', position: 5 },
                { text: 'Reducir la diferencia mejora el modelo.', target: 'modelo', position: 6 },
                { text: 'El modelo ajusta sus parámetros internos.', target: 'parámetros', position: 5 },
                { text: 'Los parámetros definen el comportamiento final.', target: 'comportamiento', position: 5 }
            ],
            distractors: ['información', 'ruido', 'estimaciones', 'teoría', 'similitud', 'sistema', 'valores', 'resultado']
        }
    ],
    en: [
        {
            topic: 'Medical Diagnosis',
            sentences: [
                { text: 'The patient arrived with high fever.', target: 'high', position: 5 },
                { text: 'The fever indicated a possible infection.', target: 'possible', position: 5 },
                { text: 'The doctor ordered blood tests.', target: 'blood', position: 4 },
                { text: 'The tests revealed a bacterial infection.', target: 'bacterial', position: 5 },
                { text: 'A treatment with antibiotics was prescribed.', target: 'treatment', position: 2 },
                { text: 'Antibiotics fight against harmful bacteria.', target: 'harmful', position: 5 },
                { text: 'After treatment the fever went down.', target: 'went', position: 5 },
                { text: 'The patient recovered completely well.', target: 'completely', position: 4 }
            ],
            distractors: ['low', 'probable', 'urine', 'viral', 'medication', 'dangerous', 'stayed', 'partially']
        },
        {
            topic: 'Weather and Seasons',
            sentences: [
                { text: 'In summer the sun shines brightly.', target: 'shines', position: 5 },
                { text: 'The sun warms the earth daily.', target: 'earth', position: 5 },
                { text: 'Plants need sunlight to grow.', target: 'sunlight', position: 3 },
                { text: 'Light enables plant photosynthesis processes.', target: 'photosynthesis', position: 4 },
                { text: 'In autumn leaves change their color.', target: 'leaves', position: 3 },
                { text: 'The leaves fall from the trees.', target: 'fall', position: 3 },
                { text: 'Trees become bare during cold winter.', target: 'bare', position: 3 },
                { text: 'Winter brings cold weather and snow.', target: 'cold', position: 4 }
            ],
            distractors: ['glows', 'sky', 'water', 'respiration', 'branches', 'grow', 'covered', 'warm']
        },
        {
            topic: 'Machine Learning',
            sentences: [
                { text: 'Models learn from the training data.', target: 'training', position: 5 },
                { text: 'Data contains many hidden patterns.', target: 'hidden', position: 4 },
                { text: 'Finding patterns improves model predictions.', target: 'predictions', position: 5 },
                { text: 'Predictions are compared with actual reality.', target: 'actual', position: 5 },
                { text: 'Error measures the observed difference accurately.', target: 'difference', position: 5 },
                { text: 'Reducing the difference improves the model.', target: 'model', position: 7 },
                { text: 'The model adjusts its internal parameters.', target: 'internal', position: 5 },
                { text: 'Parameters define the final model behavior.', target: 'behavior', position: 6 }
            ],
            distractors: ['testing', 'obvious', 'estimates', 'expected', 'similarity', 'system', 'external', 'output']
        }
    ]
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function t(key) {
    return translations[LLMGame.lang]?.[key] || translations['es'][key] || key;
}

function terminalLog(message) {
    if (window.CustomTerminal) {
        window.CustomTerminal.write('INFO: ' + message + '\n');
    }
    console.log('[LLM Game]', message);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function normalizeWord(word) {
    if (!word) return '';
    return String(word)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[.,!?;:]/g, '')
        .trim();
}

function buildUniqueOptions(correctAnswer, distractors, count = 4) {
    const unique = [];
    const seen = new Set();

    const addOption = (option) => {
        const key = normalizeWord(option);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        unique.push(option);
        return true;
    };

    addOption(correctAnswer);

    const shuffled = shuffle(distractors);
    for (const option of shuffled) {
        if (unique.length >= count) break;
        addOption(option);
    }

    return shuffle(unique);
}

// ============================================
// NEURAL NETWORK FUNCTIONS
// ============================================

function initializeNetwork() {
    const structure = LLMGame.network.structure;
    LLMGame.network.weights = [];
    LLMGame.network.biases = [];

    // Initialize biases for each layer
    for (let l = 0; l < structure.length; l++) {
        const layerBiases = [];
        for (let n = 0; n < structure[l]; n++) {
            // Random value between -0.8 and 0.8
            layerBiases.push((Math.random() * 1.6 - 0.8));
        }
        LLMGame.network.biases.push(layerBiases);
    }

    // Initialize weights between layers
    for (let l = 0; l < structure.length - 1; l++) {
        const layerWeights = [];
        for (let i = 0; i < structure[l]; i++) {
            const nodeWeights = [];
            for (let j = 0; j < structure[l + 1]; j++) {
                // Random weight between -1 and 1
                nodeWeights.push(Math.random() * 2 - 1);
            }
            layerWeights.push(nodeWeights);
        }
        LLMGame.network.weights.push(layerWeights);
    }

    // Save initial snapshot for comparison
    LLMGame.network.initialSnapshot = {
        weights: JSON.parse(JSON.stringify(LLMGame.network.weights)),
        biases: JSON.parse(JSON.stringify(LLMGame.network.biases))
    };
}

function getValueColor(value) {
    // Map value (-1 to 1) to color (blue -> white -> red)
    const clampedValue = Math.max(-1, Math.min(1, value));

    if (clampedValue < 0) {
        // Blue gradient (negative): from white to blue
        const intensity = Math.abs(clampedValue);
        const r = Math.round(255 - intensity * 222); // 255 -> 33
        const g = Math.round(255 - intensity * 105); // 255 -> 150
        const b = 255;
        return `rgb(${r}, ${g}, ${b})`;
    } else if (clampedValue > 0) {
        // Red gradient (positive): from white to red
        const intensity = clampedValue;
        const r = 255;
        const g = Math.round(255 - intensity * 188); // 255 -> 67
        const b = Math.round(255 - intensity * 201); // 255 -> 54
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        return 'rgb(245, 245, 245)';
    }
}

function getWeightColor(weight) {
    if (weight > 0) {
        return '#198754'; // Green for positive
    } else {
        return '#dc3545'; // Red for negative
    }
}

function adjustNetwork(isCorrect) {
    // Simulate network parameter adjustment
    const adjustmentMagnitude = isCorrect ? 0.12 : 0.20;
    const direction = isCorrect ? 1 : -1;

    let totalChange = 0;
    let changesCount = 0;
    const highlightedElements = [];

    // Adjust random biases
    const biasesToAdjust = getRandomInt(3, 6);
    for (let i = 0; i < biasesToAdjust; i++) {
        const layerIdx = getRandomInt(0, LLMGame.network.biases.length - 1);
        const nodeIdx = getRandomInt(0, LLMGame.network.biases[layerIdx].length - 1);

        const change = (Math.random() * adjustmentMagnitude) * direction;
        LLMGame.network.biases[layerIdx][nodeIdx] += change;
        LLMGame.network.biases[layerIdx][nodeIdx] = Math.max(-1, Math.min(1, LLMGame.network.biases[layerIdx][nodeIdx]));

        totalChange += Math.abs(change);
        changesCount++;
        highlightedElements.push({ type: 'node', layer: layerIdx, node: nodeIdx });
    }

    // Adjust random weights
    const weightsToAdjust = getRandomInt(4, 8);
    for (let i = 0; i < weightsToAdjust; i++) {
        const layerIdx = getRandomInt(0, LLMGame.network.weights.length - 1);
        const fromIdx = getRandomInt(0, LLMGame.network.weights[layerIdx].length - 1);
        const toIdx = getRandomInt(0, LLMGame.network.weights[layerIdx][fromIdx].length - 1);

        const change = (Math.random() * adjustmentMagnitude * 1.5) * direction;
        LLMGame.network.weights[layerIdx][fromIdx][toIdx] += change;
        LLMGame.network.weights[layerIdx][fromIdx][toIdx] = Math.max(-1, Math.min(1, LLMGame.network.weights[layerIdx][fromIdx][toIdx]));

        totalChange += Math.abs(change);
        changesCount++;
        highlightedElements.push({ type: 'connection', layer: layerIdx, from: fromIdx, to: toIdx });
    }

    // Animate the highlighted elements
    highlightNetworkElements(highlightedElements);

    const avgChange = (totalChange / changesCount).toFixed(3);
    terminalLog(t('terminalNetworkAdjusted') + avgChange);

    return highlightedElements;
}

function highlightNetworkElements(elements) {
    // First, update the network visualization
    updateNetworkVisualization();

    // Then highlight changed elements
    elements.forEach(el => {
        if (el.type === 'node') {
            const nodeEl = document.getElementById(`llm-node-${el.layer}-${el.node}`);
            if (nodeEl) {
                nodeEl.classList.add('highlighted');
            }
        } else if (el.type === 'connection') {
            const connEl = document.getElementById(`llm-conn-${el.layer}-${el.from}-${el.to}`);
            if (connEl) {
                connEl.classList.add('highlighted');
            }
        }
    });

    // Remove highlights after animation
    setTimeout(() => {
        document.querySelectorAll('.llm-node.highlighted, .llm-connection.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
    }, 1200);
}

// ============================================
// NETWORK VISUALIZATION (SVG-based like backpropagation)
// ============================================

function drawNetwork() {
    const container = document.getElementById('networkContainer');
    if (!container) return;

    // Create SVG element
    container.innerHTML = '<svg id="llmNetworkSvg" class="llm-network-svg"></svg>';
    const svg = document.getElementById('llmNetworkSvg');

    const width = 260;
    const height = 220;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const structure = LLMGame.network.structure;
    const layerGap = width / (structure.length + 1);
    LLMGame.network.positions = [];

    // Draw connections first (so they appear behind nodes)
    for (let l = 0; l < structure.length - 1; l++) {
        const x1 = layerGap * (l + 1);
        const x2 = layerGap * (l + 2);
        const gap1 = height / (structure[l] + 1);
        const gap2 = height / (structure[l + 1] + 1);

        for (let i = 0; i < structure[l]; i++) {
            const y1 = gap1 * (i + 1);
            for (let j = 0; j < structure[l + 1]; j++) {
                const y2 = gap2 * (j + 1);
                const weight = LLMGame.network.weights[l][i][j];

                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute('id', `llm-conn-${l}-${i}-${j}`);
                line.setAttribute('class', 'llm-connection');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', getWeightColor(weight));
                line.setAttribute('stroke-width', Math.max(0.5, Math.abs(weight) * 2));
                line.setAttribute('stroke-opacity', Math.max(0.3, Math.abs(weight)));
                svg.appendChild(line);
            }
        }
    }

    // Draw nodes
    for (let l = 0; l < structure.length; l++) {
        const layerPositions = [];
        const x = layerGap * (l + 1);
        const gap = height / (structure[l] + 1);

        for (let n = 0; n < structure[l]; n++) {
            const y = gap * (n + 1);
            layerPositions.push({ x, y });

            const value = LLMGame.network.biases[l][n];

            // Node circle
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('id', `llm-node-${l}-${n}`);
            circle.setAttribute('class', 'llm-node');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 12);
            circle.setAttribute('fill', getValueColor(value));
            circle.setAttribute('stroke', '#666');
            circle.setAttribute('stroke-width', '2');
            svg.appendChild(circle);

            // Value text
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute('id', `llm-value-${l}-${n}`);
            text.setAttribute('class', 'llm-node-value');
            text.setAttribute('x', x);
            text.setAttribute('y', y + 3);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '7');
            text.setAttribute('fill', Math.abs(value) > 0.5 ? '#fff' : '#333');
            text.textContent = value.toFixed(1);
            svg.appendChild(text);
        }

        LLMGame.network.positions.push(layerPositions);
    }

    // Draw layer labels
    const labels = [t('layerInput'), t('layerHidden1'), t('layerHidden2'), t('layerOutput')];
    for (let l = 0; l < structure.length; l++) {
        const x = layerGap * (l + 1);
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute('class', 'llm-layer-label');
        label.setAttribute('x', x);
        label.setAttribute('y', 12);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '8');
        label.setAttribute('fill', '#666');
        label.textContent = labels[l] || `L${l}`;
        svg.appendChild(label);
    }
}

function updateNetworkVisualization() {
    const structure = LLMGame.network.structure;

    // Update connections
    for (let l = 0; l < structure.length - 1; l++) {
        for (let i = 0; i < structure[l]; i++) {
            for (let j = 0; j < structure[l + 1]; j++) {
                const weight = LLMGame.network.weights[l][i][j];
                const line = document.getElementById(`llm-conn-${l}-${i}-${j}`);
                if (line) {
                    line.setAttribute('stroke', getWeightColor(weight));
                    line.setAttribute('stroke-width', Math.max(0.5, Math.abs(weight) * 2.5));
                    line.setAttribute('stroke-opacity', Math.max(0.3, Math.abs(weight)));
                }
            }
        }
    }

    // Update nodes
    for (let l = 0; l < structure.length; l++) {
        for (let n = 0; n < structure[l]; n++) {
            const value = LLMGame.network.biases[l][n];
            const circle = document.getElementById(`llm-node-${l}-${n}`);
            const text = document.getElementById(`llm-value-${l}-${n}`);

            if (circle) {
                circle.setAttribute('fill', getValueColor(value));
            }
            if (text) {
                text.textContent = value.toFixed(1);
                text.setAttribute('fill', Math.abs(value) > 0.5 ? '#fff' : '#333');
            }
        }
    }
}

function renderMiniNetwork(container, biases, weights) {
    if (!container) return;

    container.innerHTML = '<svg class="mini-network-svg"></svg>';
    const svg = container.querySelector('svg');

    const width = 120;
    const height = 80;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const structure = LLMGame.network.structure;
    const layerGap = width / (structure.length + 1);

    // Draw connections
    for (let l = 0; l < structure.length - 1; l++) {
        const x1 = layerGap * (l + 1);
        const x2 = layerGap * (l + 2);
        const gap1 = height / (structure[l] + 1);
        const gap2 = height / (structure[l + 1] + 1);

        for (let i = 0; i < structure[l]; i++) {
            const y1 = gap1 * (i + 1);
            for (let j = 0; j < structure[l + 1]; j++) {
                const y2 = gap2 * (j + 1);
                const weight = weights[l][i][j];

                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute('stroke', getWeightColor(weight));
                line.setAttribute('stroke-width', Math.max(0.3, Math.abs(weight) * 1.5));
                line.setAttribute('stroke-opacity', Math.max(0.3, Math.abs(weight) * 0.8));
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                svg.appendChild(line);
            }
        }
    }

    // Draw nodes
    for (let l = 0; l < structure.length; l++) {
        const x = layerGap * (l + 1);
        const gap = height / (structure[l] + 1);

        for (let n = 0; n < structure[l]; n++) {
            const y = gap * (n + 1);
            const value = biases[l][n];

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 5);
            circle.setAttribute('fill', getValueColor(value));
            circle.setAttribute('stroke', '#999');
            circle.setAttribute('stroke-width', '1');
            svg.appendChild(circle);
        }
    }
}

// ============================================
// GAME LOGIC
// ============================================

function selectRandomParagraph() {
    const paragraphList = paragraphs[LLMGame.lang];
    const idx = getRandomInt(0, paragraphList.length - 1);
    LLMGame.currentParagraph = paragraphList[idx];
    LLMGame.currentSentenceIndex = 0;
    LLMGame.completedSentences = [];
    LLMGame.gameComplete = false;

    terminalLog(t('terminalNewParagraph') + LLMGame.currentParagraph.topic);
}

function getCurrentChallenge() {
    const paragraph = LLMGame.currentParagraph;
    const sentence = paragraph.sentences[LLMGame.currentSentenceIndex];
    const mode = LLMGame.currentMode;

    let displayText = '';
    let options = [];

    // Extract the actual word from the sentence at the target position
    const words = sentence.text.split(' ');
    let targetIndex = typeof sentence.position === 'number' ? sentence.position - 1 : -1;

    if (sentence.target) {
        const normalizedTarget = normalizeWord(sentence.target);
        const foundIndex = words.findIndex(
            word => normalizeWord(word) === normalizedTarget
        );
        if (foundIndex !== -1) {
            targetIndex = foundIndex;
        }
    }

    if (targetIndex < 0 || targetIndex >= words.length) {
        targetIndex = 0;
    }

    const targetWord = words[targetIndex];
    const correctAnswer = targetWord.replace(/[.,!?;:]/g, '');
    const normalizedCorrect = normalizeWord(correctAnswer);

    // Get distractors that don't match the correct answer (normalized)
    const availableDistractors = paragraph.distractors.filter(
        d => normalizeWord(d) !== normalizedCorrect
    );

    if (mode === 'fill-blank') {
        // Replace target word with blank, keeping punctuation
        const wordsCopy = [...words];
        const punctuation = targetWord.replace(correctAnswer, '');
        wordsCopy[targetIndex] = `<span class="word-blank">${t('blankPlaceholder')}</span>${punctuation}`;
        displayText = wordsCopy.join(' ');

        // Generate options: correct + 3 distractors
        options = buildUniqueOptions(correctAnswer, availableDistractors, 4);

    } else if (mode === 'next-word') {
        // Show sentence up to (but not including) target word
        const partialWords = words.slice(0, targetIndex);
        displayText = partialWords.join(' ') + ' <span class="word-highlight">?</span>';

        options = buildUniqueOptions(correctAnswer, availableDistractors, 4);

    } else if (mode === 'correction') {
        // Replace target with a random distractor (incorrect word)
        const shuffledDistractors = shuffle(availableDistractors);
        const incorrectWord = shuffledDistractors.find(
            d => normalizeWord(d) !== normalizedCorrect
        ) || shuffledDistractors[0] || correctAnswer;

        // Preserve punctuation
        const punctuation = targetWord.replace(correctAnswer, '');
        const wordsCopy = [...words];
        wordsCopy[targetIndex] = `<span class="word-incorrect">${incorrectWord}</span>${punctuation}`;
        displayText = wordsCopy.join(' ');

        // Options: correct answer + the incorrect word shown + 2 more distractors
        options = buildUniqueOptions(correctAnswer, [incorrectWord, ...shuffledDistractors], 4);
    }

    return {
        displayText,
        options,
        correctAnswer
    };
}

function updateChallengeTitle() {
    const titleElement = document.getElementById('challengeTitle');
    if (!titleElement) return;

    switch (LLMGame.currentMode) {
        case 'fill-blank':
            titleElement.textContent = t('challengeFillBlank');
            break;
        case 'next-word':
            titleElement.textContent = t('challengeNextWord');
            break;
        case 'correction':
            titleElement.textContent = t('challengeCorrection');
            break;
    }
}

function renderChallenge() {
    const challenge = getCurrentChallenge();

    // Update sentence display
    const sentenceDisplay = document.getElementById('sentenceDisplay');
    if (sentenceDisplay) {
        sentenceDisplay.innerHTML = challenge.displayText;
    }

    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';

        challenge.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.onclick = () => handleAnswer(option, challenge.correctAnswer);
            optionsContainer.appendChild(btn);
        });
    }

    // Update progress
    updateProgress();

    // Update context display
    updateContextDisplay();

    // Update challenge title
    updateChallengeTitle();

    // Hide feedback
    hideFeedback();
}

function handleAnswer(selected, correct) {
    const isCorrect = selected.toLowerCase() === correct.toLowerCase();

    // Update stats
    LLMGame.stats.examplesProcessed++;
    if (isCorrect) {
        LLMGame.stats.correct++;
        terminalLog(t('terminalCorrectAnswer'));
    } else {
        LLMGame.stats.errors++;
        terminalLog(t('terminalIncorrectAnswer'));
    }

    // Update stats display
    document.getElementById('examplesProcessed').textContent = LLMGame.stats.examplesProcessed;
    document.getElementById('correctCount').textContent = LLMGame.stats.correct;
    document.getElementById('errorCount').textContent = LLMGame.stats.errors;

    // Disable all option buttons and show correct/incorrect
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.toLowerCase() === correct.toLowerCase()) {
            btn.classList.add('correct');
        } else if (btn.textContent.toLowerCase() === selected.toLowerCase() && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Adjust network and update visualization
    adjustNetwork(isCorrect);

    // Show feedback
    showFeedback(isCorrect, correct);
}

function showFeedback(isCorrect, correctWord) {
    // Small delay to let user see the network adjustment
    setTimeout(() => {
        const feedbackOverlay = document.getElementById('feedbackModalOverlay');
        const feedbackContent = document.getElementById('feedbackContent');
        const feedbackIcon = document.getElementById('feedbackIcon');

        if (!feedbackOverlay || !feedbackContent || !feedbackIcon) return;

        // Set icon
        feedbackIcon.textContent = isCorrect ? '✅' : '❌';

        let html = `<p class="${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
            ${isCorrect ? t('feedbackCorrect') : t('feedbackIncorrect')}
        </p>`;

        if (!isCorrect) {
            html += `<p class="feedback-explanation">${t('feedbackCorrectWord')}<strong>${correctWord}</strong></p>`;
        }

        html += `<p class="feedback-explanation">${t('feedbackExplanation')}</p>`;

        feedbackContent.innerHTML = html;
        feedbackOverlay.style.display = 'flex';
        LLMGame.feedbackShown = true;
    }, 800); // Delay to show network animation first
}

function hideFeedback() {
    const feedbackOverlay = document.getElementById('feedbackModalOverlay');
    if (feedbackOverlay) {
        feedbackOverlay.style.display = 'none';
    }
    LLMGame.feedbackShown = false;
}

function updateProgress() {
    const total = LLMGame.currentParagraph.sentences.length;
    const current = LLMGame.currentSentenceIndex + 1;

    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');

    if (progressText) {
        progressText.textContent = `${current} / ${total}`;
    }

    if (progressFill) {
        const percentage = (current / total) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

function updateContextDisplay() {
    const contextDisplay = document.getElementById('contextDisplay');
    if (!contextDisplay) return;

    if (LLMGame.completedSentences.length === 0) {
        contextDisplay.innerHTML = `<p class="context-placeholder">${t('contextPlaceholder')}</p>`;
    } else {
        let html = '';
        LLMGame.completedSentences.forEach((sentence, idx) => {
            const isLast = idx === LLMGame.completedSentences.length - 1;
            html += `<p class="context-sentence ${isLast ? 'current' : ''}">${sentence}</p>`;
        });
        contextDisplay.innerHTML = html;

        // Scroll to bottom
        contextDisplay.scrollTop = contextDisplay.scrollHeight;
    }
}

function nextSentence() {
    // Add current sentence to completed
    const currentSentence = LLMGame.currentParagraph.sentences[LLMGame.currentSentenceIndex];
    LLMGame.completedSentences.push(currentSentence.text);

    LLMGame.currentSentenceIndex++;

    if (LLMGame.currentSentenceIndex >= LLMGame.currentParagraph.sentences.length) {
        // Game complete
        showGameComplete();
    } else {
        renderChallenge();
    }
}

function showGameComplete() {
    LLMGame.gameComplete = true;
    terminalLog(t('terminalParagraphComplete'));

    const overlay = document.getElementById('gameCompleteOverlay');
    if (!overlay) return;

    // Render initial and final network states
    const initialContainer = document.getElementById('initialNetworkSnapshot');
    const finalContainer = document.getElementById('finalNetworkSnapshot');

    if (initialContainer) {
        renderMiniNetwork(
            initialContainer,
            LLMGame.network.initialSnapshot.biases,
            LLMGame.network.initialSnapshot.weights
        );
    }

    if (finalContainer) {
        renderMiniNetwork(
            finalContainer,
            LLMGame.network.biases,
            LLMGame.network.weights
        );
    }

    // Show results
    const resultsSummary = document.getElementById('resultsSummary');
    if (resultsSummary) {
        const accuracy = LLMGame.stats.examplesProcessed > 0
            ? ((LLMGame.stats.correct / LLMGame.stats.examplesProcessed) * 100).toFixed(1)
            : 0;

        resultsSummary.innerHTML = `
            <div class="result-item">
                <span>${t('totalExamples')}</span>
                <span><strong>${LLMGame.stats.examplesProcessed}</strong></span>
            </div>
            <div class="result-item">
                <span>${t('accuracy')}</span>
                <span><strong>${accuracy}%</strong></span>
            </div>
            <div class="result-item">
                <span>${t('networkTrained')}</span>
                <span>✅</span>
            </div>
        `;
    }

    overlay.style.display = 'flex';
}

function hideGameComplete() {
    const overlay = document.getElementById('gameCompleteOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function resetGame(keepNetwork = false) {
    if (!keepNetwork) {
        initializeNetwork();
        LLMGame.stats = { examplesProcessed: 0, correct: 0, errors: 0 };

        // Update stats display
        document.getElementById('examplesProcessed').textContent = '0';
        document.getElementById('correctCount').textContent = '0';
        document.getElementById('errorCount').textContent = '0';

        terminalLog(t('terminalNetworkReset'));
    }

    selectRandomParagraph();
    drawNetwork(); // Redraw the network
    renderChallenge();
    hideGameComplete();
}

function changeMode(mode) {
    LLMGame.currentMode = mode;

    // Update tab styles
    document.querySelectorAll('.training-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    terminalLog(t('terminalModeChanged') + t('mode' + mode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')));

    // Re-render current challenge with new mode
    renderChallenge();
}

// ============================================
// INITIALIZATION
// ============================================

function initGame() {
    // Set language
    LLMGame.lang = window.llmGameLanguage || 'es';

    // Initialize network
    initializeNetwork();

    // Select initial paragraph
    selectRandomParagraph();

    // Draw network visualization
    drawNetwork();

    // Render initial challenge
    renderChallenge();

    // Setup event listeners
    setupEventListeners();

    terminalLog(t('terminalGameLoaded'));
}

function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.training-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            changeMode(tab.dataset.mode);
        });
    });

    // Next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSentence);
    }

    // Reset network button
    const resetNetworkBtn = document.getElementById('resetNetworkBtn');
    if (resetNetworkBtn) {
        resetNetworkBtn.addEventListener('click', () => {
            initializeNetwork();
            LLMGame.stats = { examplesProcessed: 0, correct: 0, errors: 0 };
            document.getElementById('examplesProcessed').textContent = '0';
            document.getElementById('correctCount').textContent = '0';
            document.getElementById('errorCount').textContent = '0';
            drawNetwork();
            terminalLog(t('terminalNetworkReset'));
        });
    }

    // New paragraph button
    const newParagraphBtn = document.getElementById('newParagraphBtn');
    if (newParagraphBtn) {
        newParagraphBtn.addEventListener('click', () => resetGame(true));
    }

    // Restart button (in completion modal)
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => resetGame(false));
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
