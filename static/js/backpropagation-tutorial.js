/**
 * Backpropagation Tutorial - Step-by-Step Interactive Learning Tool
 * 
 * PEDAGOGICAL GOAL: Help users understand backpropagation by computing
 * forward pass, backward pass, and weight updates by hand with guidance.
 * 
 * MATHEMATICAL ACCURACY: This implementation uses correct backpropagation
 * mathematics with sigmoid activation and mean squared error loss.
 * 
 * NETWORK STRUCTURE: Simple 2-layer network (input -> hidden -> output)
 * to keep hand calculations manageable.
 */

// ============================================
// CONFIGURATION AND GLOBAL STATE
// ============================================

const BackpropTutorial = {
    // Current language
    lang: 'es',

    // Difficulty level
    difficulty: 'easy', // 'easy', 'medium', 'hard'

    // Network structure configurations: [input, hidden, output]
    networkConfigs: {
        easy: [1, 2, 1],    // 1 input, 2 hidden, 1 output - simplest for hand calculations
        medium: [2, 2, 1],  // 2 inputs, 2 hidden, 1 output - more realistic
        hard: [2, 3, 2]     // 2 inputs, 3 hidden, 2 outputs - comprehensive
    },

    // Current network structure (will be set based on difficulty)
    networkStructure: [1, 2, 1],

    // Network state
    network: {
        // Weights: w[layer][from][to]
        weights: [],
        // Biases: b[layer][node] (we skip biases for simplicity in this tutorial)
        // Node activations (outputs after sigmoid): a[layer][node]
        activations: [],
        // Pre-activation values (weighted sums): z[layer][node]
        preActivations: [],
        // Gradients for backprop
        deltas: [],
        weightGradients: [],
        // Initial snapshot for comparison
        initialSnapshot: null
    },

    // Current training example
    trainingExample: {
        inputs: [],  // Changed from single input to array
        targets: []  // Changed from single target to array
    },

    // All training examples pool
    trainingPool: [],

    // Tutorial state
    state: {
        currentPhase: 'forward', // 'forward', 'error', 'backward', 'update', 'complete'
        currentStep: 0,
        totalSteps: 0,
        steps: [],
        epoch: 1,
        errorsBeforeUpdate: [],
        errorsAfterUpdate: [],
        hintsShown: 0,
        answersRevealed: 0
    },

    // Learning rate
    learningRate: 0.5,

    // Tolerance for answer checking (allows for rounding)
    tolerance: 0.05
};

// ============================================
// TRANSLATIONS
// ============================================

const translations = {
    es: {
        // Phase titles
        phaseForward: 'Propagación hacia Adelante',
        phaseError: 'Cálculo del Error',
        phaseBackward: 'Propagación hacia Atrás',
        phaseUpdate: 'Actualización de Pesos',
        phaseComplete: '¡Pasada Completa!',

        // Step descriptions
        descForwardIntro: 'Calculemos cómo la entrada fluye a través de la red hacia la salida.',
        descCalcZ: 'Calcula la suma ponderada (entrada × peso):',
        descCalcA: 'Aplica la función sigmoide para obtener la activación:',
        descCalcOutput: 'Calcula la salida final de la red:',
        descError: 'Calcula el error entre la salida predicha y el objetivo:',
        descOutputDelta: 'Calcula el delta del nodo de salida (gradiente local):',
        descHiddenDelta: 'Calcula el delta del nodo oculto (propagando el error hacia atrás):',
        descWeightGradient: 'Calcula el gradiente para este peso:',
        descUpdateWeight: 'Actualiza el peso usando descenso de gradiente:',

        // Formula labels
        formulaSigmoid: 'Sigmoide: σ(x) = 1 / (1 + e^(-x))',
        formulaSigmoidDerivative: 'Derivada de sigmoide: σ\'(x) = σ(x) × (1 - σ(x))',
        formulaError: 'Error cuadrático: E = ½ × (y - ŷ)²',
        formulaOutputDelta: 'Delta de salida: δ = (ŷ - y) × σ\'(z)',
        formulaHiddenDelta: 'Delta oculto: δⱼ = (Σ wⱼₖ × δₖ) × σ\'(zⱼ)',
        formulaWeightGradient: 'Gradiente: ∂E/∂w = activación_entrada × δ_siguiente',
        formulaWeightUpdate: 'Actualización: w_nuevo = w_anterior - η × gradiente',

        // Hints
        hintSigmoid: 'Recuerda: σ(x) = 1/(1 + e^(-x)). Si x es positivo, σ(x) > 0.5. Si x es negativo, σ(x) < 0.5.',
        hintMultiply: 'Simplemente multiplica el valor de entrada por el peso.',
        hintError: 'Resta el objetivo de la predicción, elévalo al cuadrado, y multiplica por 0.5.',
        hintOutputDelta: 'Primero calcula σ\'(z) = σ(z) × (1 - σ(z)), luego multiplica por (ŷ - y).',
        hintHiddenDelta: 'Multiplica el delta de la siguiente capa por el peso que los conecta, luego por σ\'(z).',
        hintGradient: 'Multiplica la activación de entrada por el delta del nodo siguiente.',
        hintUpdate: 'Resta del peso actual el producto de la tasa de aprendizaje (0.5) por el gradiente.',

        // Feedback
        correct: '¡Correcto! 🎉',
        incorrect: 'No es correcto. Intenta de nuevo o mira la pista.',
        closeEnough: '¡Muy cerca! El valor exacto es',
        revealed: 'Aquí está la respuesta:',

        // UI
        yourAnswer: 'Tu respuesta:',
        check: 'Verificar',
        next: 'Siguiente →',
        previous: '← Anterior',
        showHint: 'Ver Pista',
        showAnswer: 'Ver Respuesta',
        anotherPass: 'Otra Pasada',
        finish: 'Terminar',
        restart: 'Empezar de Nuevo',
        reset: 'Reiniciar',
        derivativeHelper: 'Ayuda con Derivadas',
        epoch: 'Época',

        // Summary
        passComplete: '¡Has completado una pasada completa de entrenamiento!',
        errorReduced: 'El error se redujo de {before} a {after}.',
        errorIncreased: 'El error aumentó de {before} a {after}. Esto puede pasar; sigue entrenando.',
        tutorialComplete: '¡Tutorial Completado!',
        epochsCompleted: 'Épocas completadas',
        errorReduction: 'Reducción de error',
        congratulations: '¡Felicidades! Has aprendido cómo funciona backpropagation.',

        // Terminal
        terminalLoaded: 'Tutorial de Backpropagation cargado.',
        terminalNewExample: 'Nuevo ejemplo: entrada = {input}, objetivo = {target}',
        terminalForwardComplete: 'Propagación hacia adelante completa. Salida = {output}',
        terminalError: 'Error calculado: {error}',
        terminalBackwardComplete: 'Propagación hacia atrás completa. Gradientes calculados.',
        terminalWeightsUpdated: 'Pesos actualizados. Nueva predicción: {output}',
        terminalEpochComplete: 'Época {epoch} completada.',
        terminalDifficultyChanged: 'Dificultad cambiada a: {difficulty}',

        // Derivative helper
        helperTitle: 'Guía de Derivadas para Backpropagation',
        helperSigmoidTitle: 'Derivada de la Función Sigmoide',
        helperSigmoidDesc: 'La sigmoide tiene una derivada elegante que depende solo de su salida:',
        helperSigmoidExample: 'Si σ(z) = 0.73, entonces σ\'(z) = 0.73 × (1 - 0.73) = 0.73 × 0.27 ≈ 0.197',
        helperChainTitle: 'La Regla de la Cadena',
        helperChainDesc: 'Para encontrar cómo el error cambia respecto a un peso, multiplicamos derivadas parciales:',
        helperChainFormula: '∂E/∂w = ∂E/∂ŷ × ∂ŷ/∂z × ∂z/∂w',
        helperDeltaTitle: 'El Delta (δ)',
        helperDeltaDesc: 'El delta combina las derivadas hasta el nodo. Para el nodo de salida:',
        helperDeltaOutput: 'δ_salida = (ŷ - y) × σ\'(z_salida)',
        helperDeltaHidden: 'Para nodos ocultos, propagamos el delta hacia atrás:',
        helperDeltaHiddenFormula: 'δ_oculto = w_sig × δ_sig × σ\'(z_oculto)'
    },
    en: {
        // Phase titles
        phaseForward: 'Forward Propagation',
        phaseError: 'Error Calculation',
        phaseBackward: 'Backward Propagation',
        phaseUpdate: 'Weight Update',
        phaseComplete: 'Pass Complete!',

        // Step descriptions
        descForwardIntro: 'Let\'s calculate how the input flows through the network to the output.',
        descCalcZ: 'Calculate the weighted sum (input × weight):',
        descCalcA: 'Apply the sigmoid function to get the activation:',
        descCalcOutput: 'Calculate the final network output:',
        descError: 'Calculate the error between the predicted output and target:',
        descOutputDelta: 'Calculate the output node\'s delta (local gradient):',
        descHiddenDelta: 'Calculate the hidden node\'s delta (propagating error backward):',
        descWeightGradient: 'Calculate the gradient for this weight:',
        descUpdateWeight: 'Update the weight using gradient descent:',

        // Formula labels
        formulaSigmoid: 'Sigmoid: σ(x) = 1 / (1 + e^(-x))',
        formulaSigmoidDerivative: 'Sigmoid derivative: σ\'(x) = σ(x) × (1 - σ(x))',
        formulaError: 'Squared error: E = ½ × (y - ŷ)²',
        formulaOutputDelta: 'Output delta: δ = (ŷ - y) × σ\'(z)',
        formulaHiddenDelta: 'Hidden delta: δⱼ = (Σ wⱼₖ × δₖ) × σ\'(zⱼ)',
        formulaWeightGradient: 'Gradient: ∂E/∂w = input_activation × next_δ',
        formulaWeightUpdate: 'Update: w_new = w_old - η × gradient',

        // Hints
        hintSigmoid: 'Remember: σ(x) = 1/(1 + e^(-x)). If x is positive, σ(x) > 0.5. If x is negative, σ(x) < 0.5.',
        hintMultiply: 'Simply multiply the input value by the weight.',
        hintError: 'Subtract target from prediction, square it, and multiply by 0.5.',
        hintOutputDelta: 'First compute σ\'(z) = σ(z) × (1 - σ(z)), then multiply by (ŷ - y).',
        hintHiddenDelta: 'Multiply the delta from the next layer by the connecting weight, then by σ\'(z).',
        hintGradient: 'Multiply the input activation by the delta of the next node.',
        hintUpdate: 'Subtract from the current weight the product of learning rate (0.5) and gradient.',

        // Feedback
        correct: 'Correct! 🎉',
        incorrect: 'Not correct. Try again or check the hint.',
        closeEnough: 'Very close! The exact value is',
        revealed: 'Here is the answer:',

        // UI
        yourAnswer: 'Your answer:',
        check: 'Check',
        next: 'Next →',
        previous: '← Previous',
        showHint: 'Show Hint',
        showAnswer: 'Show Answer',
        anotherPass: 'Another Pass',
        finish: 'Finish',
        restart: 'Start Over',
        reset: 'Reset',
        derivativeHelper: 'Derivative Helper',
        epoch: 'Epoch',

        // Summary
        passComplete: 'You\'ve completed a full training pass!',
        errorReduced: 'Error reduced from {before} to {after}.',
        errorIncreased: 'Error increased from {before} to {after}. This can happen; keep training.',
        tutorialComplete: 'Tutorial Complete!',
        epochsCompleted: 'Epochs completed',
        errorReduction: 'Error reduction',
        congratulations: 'Congratulations! You\'ve learned how backpropagation works.',

        // Terminal
        terminalLoaded: 'Backpropagation Tutorial loaded.',
        terminalNewExample: 'New example: input = {input}, target = {target}',
        terminalForwardComplete: 'Forward propagation complete. Output = {output}',
        terminalError: 'Error calculated: {error}',
        terminalBackwardComplete: 'Backward propagation complete. Gradients calculated.',
        terminalWeightsUpdated: 'Weights updated. New prediction: {output}',
        terminalEpochComplete: 'Epoch {epoch} completed.',
        terminalDifficultyChanged: 'Difficulty changed to: {difficulty}',

        // Derivative helper
        helperTitle: 'Derivative Guide for Backpropagation',
        helperSigmoidTitle: 'Sigmoid Function Derivative',
        helperSigmoidDesc: 'Sigmoid has an elegant derivative that only depends on its output:',
        helperSigmoidExample: 'If σ(z) = 0.73, then σ\'(z) = 0.73 × (1 - 0.73) = 0.73 × 0.27 ≈ 0.197',
        helperChainTitle: 'The Chain Rule',
        helperChainDesc: 'To find how error changes with respect to a weight, we multiply partial derivatives:',
        helperChainFormula: '∂E/∂w = ∂E/∂ŷ × ∂ŷ/∂z × ∂z/∂w',
        helperDeltaTitle: 'The Delta (δ)',
        helperDeltaDesc: 'Delta combines derivatives up to the node. For output node:',
        helperDeltaOutput: 'δ_output = (ŷ - y) × σ\'(z_output)',
        helperDeltaHidden: 'For hidden nodes, we propagate delta backward:',
        helperDeltaHiddenFormula: 'δ_hidden = w_next × δ_next × σ\'(z_hidden)'
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function t(key) {
    return translations[BackpropTutorial.lang]?.[key] || translations['en'][key] || key;
}

function resolveLanguage() {
    const sources = [
        window.backpropTutorialLanguage,
        document.documentElement?.lang,
        document.documentElement?.getAttribute('xml:lang')
    ];

    for (const source of sources) {
        if (!source) continue;
        const normalized = String(source).trim().toLowerCase();
        if (normalized === 'es' || normalized === 'en') {
            return normalized;
        }
    }
    return 'es';
}

function terminalLog(message) {
    if (window.CustomTerminal) {
        window.CustomTerminal.write(message + '\n');
    }
    console.log(message);
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(sigmoidOutput) {
    // σ'(x) = σ(x) * (1 - σ(x))
    return sigmoidOutput * (1 - sigmoidOutput);
}

function round(value, decimals = 4) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function formatNumber(value, decimals = 4) {
    return value.toFixed(decimals);
}

// Format number with parentheses if negative (for cleaner math notation)
function formatMathNumber(num, decimals = 2) {
    const formatted = Number(num).toFixed(decimals);
    if (num < 0) {
        return `(${formatted})`;
    }
    return formatted;
}

// Generate weight name in standard mathematical notation: w_{ij}^{(k)}
// k = layer (0 = input->hidden, 1 = hidden->output)
// i = source neuron index (0-based)
// j = destination neuron index (0-based)
function getWeightName(layer, fromIdx, toIdx) {
    return `w_{${fromIdx}${toIdx}}^{(${layer})}`;
}

// Generate weight name for SVG display (HTML format)
function getWeightNameHTML(layer, fromIdx, toIdx) {
    return `w<tspan baseline-shift="sub" font-size="7">${fromIdx}${toIdx}</tspan><tspan baseline-shift="super" font-size="7">(${layer})</tspan>`;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// ============================================
// NETWORK INITIALIZATION
// ============================================

function initializeNetwork() {
    const BT = BackpropTutorial;
    const [inputSize, hiddenSize, outputSize] = BT.networkStructure;

    // Initialize weights with small random values
    // Layer 0: input -> hidden weights
    BT.network.weights = [
        // weights[0][from][to]: input to hidden
        Array(inputSize).fill(null).map(() =>
            Array(hiddenSize).fill(null).map(() => round(Math.random() * 1.6 - 0.8, 2))
        ),
        // weights[1][from][to]: hidden to output
        Array(hiddenSize).fill(null).map(() =>
            Array(outputSize).fill(null).map(() => round(Math.random() * 1.6 - 0.8, 2))
        )
    ];

    // Initialize activations and pre-activations
    BT.network.activations = [
        Array(inputSize).fill(0),
        Array(hiddenSize).fill(0),
        Array(outputSize).fill(0)
    ];

    BT.network.preActivations = [
        Array(inputSize).fill(0),
        Array(hiddenSize).fill(0),
        Array(outputSize).fill(0)
    ];

    // Initialize deltas
    BT.network.deltas = [
        Array(inputSize).fill(0),
        Array(hiddenSize).fill(0),
        Array(outputSize).fill(0)
    ];

    // Initialize weight gradients
    BT.network.weightGradients = [
        Array(inputSize).fill(null).map(() => Array(hiddenSize).fill(0)),
        Array(hiddenSize).fill(null).map(() => Array(outputSize).fill(0))
    ];

    // Store initial snapshot
    BT.network.initialSnapshot = JSON.parse(JSON.stringify(BT.network.weights));
}

function generateTrainingPool() {
    // Generate a pool of training examples based on difficulty
    const BT = BackpropTutorial;
    let pool = [];

    if (BT.difficulty === 'easy') {
        // Simple 1-input, 1-output examples
        pool = [
            { inputs: [0.0], targets: [0.1] },
            { inputs: [0.2], targets: [0.3] },
            { inputs: [0.4], targets: [0.5] },
            { inputs: [0.6], targets: [0.7] },
            { inputs: [0.8], targets: [0.9] },
            { inputs: [1.0], targets: [0.95] },
            { inputs: [-0.5], targets: [0.2] },
            { inputs: [0.5], targets: [0.6] }
        ];
    } else if (BT.difficulty === 'medium') {
        // 2-input, 1-output examples (XOR-like or simple functions)
        pool = [
            { inputs: [0.0, 0.0], targets: [0.1] },
            { inputs: [0.0, 1.0], targets: [0.8] },
            { inputs: [1.0, 0.0], targets: [0.7] },
            { inputs: [1.0, 1.0], targets: [0.3] },
            { inputs: [0.5, 0.5], targets: [0.5] },
            { inputs: [0.3, 0.7], targets: [0.6] },
            { inputs: [0.8, 0.2], targets: [0.4] },
            { inputs: [0.2, 0.8], targets: [0.9] }
        ];
    } else if (BT.difficulty === 'hard') {
        // 2-input, 2-output examples (multiple outputs)
        pool = [
            { inputs: [0.0, 0.0], targets: [0.1, 0.2] },
            { inputs: [0.0, 1.0], targets: [0.3, 0.9] },
            { inputs: [1.0, 0.0], targets: [0.9, 0.3] },
            { inputs: [1.0, 1.0], targets: [0.5, 0.5] },
            { inputs: [0.5, 0.5], targets: [0.6, 0.6] },
            { inputs: [0.3, 0.7], targets: [0.4, 0.8] },
            { inputs: [0.8, 0.2], targets: [0.7, 0.4] },
            { inputs: [0.2, 0.8], targets: [0.3, 0.9] }
        ];
    }

    // Shuffle the pool
    BackpropTutorial.trainingPool = pool.sort(() => Math.random() - 0.5);
}

function selectNewTrainingExample() {
    const BT = BackpropTutorial;

    // Select a random example from the pool
    const idx = Math.floor(Math.random() * BT.trainingPool.length);
    BT.trainingExample = JSON.parse(JSON.stringify(BT.trainingPool[idx]));

    // Update display based on number of inputs/outputs
    const numInputs = BT.trainingExample.inputs.length;
    const numOutputs = BT.trainingExample.targets.length;

    // Update input displays
    for (let i = 0; i < 2; i++) {
        const inputRow = document.getElementById(`inputRow${i + 1}`);
        const inputVal = document.getElementById(`inputValue${i + 1}`);
        if (i < numInputs) {
            inputRow.style.display = 'flex';
            inputVal.textContent = formatNumber(BT.trainingExample.inputs[i], 2);
        } else {
            inputRow.style.display = 'none';
        }
    }

    // Update target displays
    for (let i = 0; i < 2; i++) {
        const targetRow = document.getElementById(`targetRow${i + 1}`);
        const targetVal = document.getElementById(`targetValue${i + 1}`);
        if (i < numOutputs) {
            targetRow.style.display = 'flex';
            targetVal.textContent = formatNumber(BT.trainingExample.targets[i], 2);
        } else {
            targetRow.style.display = 'none';
        }
    }

    // Hide output rows initially
    document.getElementById('outputRow1').style.display = 'none';
    document.getElementById('outputRow2').style.display = 'none';
    document.getElementById('errorRow').style.display = 'none';

    terminalLog(t('terminalNewExample')
        .replace('{input}', BT.trainingExample.inputs.map(v => formatNumber(v, 2)).join(', '))
        .replace('{target}', BT.trainingExample.targets.map(v => formatNumber(v, 2)).join(', ')));
}

// ============================================
// FORWARD PASS COMPUTATION
// ============================================

function computeForwardPass() {
    const BT = BackpropTutorial;
    const net = BT.network;

    // Set input layer activations
    for (let i = 0; i < BT.networkStructure[0]; i++) {
        net.activations[0][i] = BT.trainingExample.inputs[i];
    }

    // Hidden layer
    for (let h = 0; h < BT.networkStructure[1]; h++) {
        let z = 0;
        for (let i = 0; i < BT.networkStructure[0]; i++) {
            z += net.activations[0][i] * net.weights[0][i][h];
        }
        net.preActivations[1][h] = z;
        net.activations[1][h] = sigmoid(z);
    }

    // Output layer
    for (let o = 0; o < BT.networkStructure[2]; o++) {
        let z = 0;
        for (let h = 0; h < BT.networkStructure[1]; h++) {
            z += net.activations[1][h] * net.weights[1][h][o];
        }
        net.preActivations[2][o] = z;
        net.activations[2][o] = sigmoid(z);
    }
}

function computeError() {
    const BT = BackpropTutorial;
    let totalError = 0;

    // Sum squared errors for all outputs
    for (let o = 0; o < BT.networkStructure[2]; o++) {
        const predicted = BT.network.activations[2][o];
        const target = BT.trainingExample.targets[o];
        // Mean squared error: E = 0.5 * Σ(y - ŷ)²
        totalError += 0.5 * Math.pow(target - predicted, 2);
    }

    return totalError;
}

// ============================================
// BACKWARD PASS COMPUTATION
// ============================================

function computeBackwardPass() {
    const BT = BackpropTutorial;
    const net = BT.network;

    // Output layer deltas
    for (let o = 0; o < BT.networkStructure[2]; o++) {
        const output = net.activations[2][o];
        const target = BT.trainingExample.targets[o];
        // δ = (ŷ - y) * σ'(z) = (ŷ - y) * σ(z) * (1 - σ(z))
        net.deltas[2][o] = (output - target) * sigmoidDerivative(output);
    }

    // Hidden layer deltas
    for (let h = 0; h < BT.networkStructure[1]; h++) {
        let delta = 0;
        for (let o = 0; o < BT.networkStructure[2]; o++) {
            delta += net.weights[1][h][o] * net.deltas[2][o];
        }
        delta *= sigmoidDerivative(net.activations[1][h]);
        net.deltas[1][h] = delta;
    }

    // Compute weight gradients
    // Hidden to output weights
    for (let h = 0; h < BT.networkStructure[1]; h++) {
        for (let o = 0; o < BT.networkStructure[2]; o++) {
            net.weightGradients[1][h][o] = net.activations[1][h] * net.deltas[2][o];
        }
    }

    // Input to hidden weights
    for (let i = 0; i < BT.networkStructure[0]; i++) {
        for (let h = 0; h < BT.networkStructure[1]; h++) {
            net.weightGradients[0][i][h] = net.activations[0][i] * net.deltas[1][h];
        }
    }
}

function updateWeights() {
    const BT = BackpropTutorial;
    const net = BT.network;
    const lr = BT.learningRate;

    // Update all weights
    for (let layer = 0; layer < net.weights.length; layer++) {
        for (let from = 0; from < net.weights[layer].length; from++) {
            for (let to = 0; to < net.weights[layer][from].length; to++) {
                net.weights[layer][from][to] -= lr * net.weightGradients[layer][from][to];
            }
        }
    }
}

// ============================================
// STEP GENERATION
// ============================================

function generateSteps() {
    const BT = BackpropTutorial;
    const net = BT.network;
    const steps = [];
    const numInputs = BT.networkStructure[0];
    const numHidden = BT.networkStructure[1];
    const numOutputs = BT.networkStructure[2];

    // Pre-calculate all expected values for the formulas
    // This computes what the forward/backward pass WILL produce
    const preCalc = {
        z_hidden: [],
        a_hidden: [],
        z_output: [],
        a_output: [],
        deltas_output: [],
        deltas_hidden: []
    };

    // Calculate hidden layer z and a values
    for (let h = 0; h < numHidden; h++) {
        let z = 0;
        for (let i = 0; i < numInputs; i++) {
            z += BT.trainingExample.inputs[i] * net.weights[0][i][h];
        }
        preCalc.z_hidden[h] = z;
        preCalc.a_hidden[h] = sigmoid(z);
    }

    // Calculate output layer z and a values
    for (let o = 0; o < numOutputs; o++) {
        let z = 0;
        for (let h = 0; h < numHidden; h++) {
            z += preCalc.a_hidden[h] * net.weights[1][h][o];
        }
        preCalc.z_output[o] = z;
        preCalc.a_output[o] = sigmoid(z);
    }

    // Calculate output deltas
    for (let o = 0; o < numOutputs; o++) {
        const yHat = preCalc.a_output[o];
        const target = BT.trainingExample.targets[o];
        preCalc.deltas_output[o] = (yHat - target) * sigmoidDerivative(yHat);
    }

    // Calculate hidden deltas
    for (let h = 0; h < numHidden; h++) {
        let delta = 0;
        for (let o = 0; o < numOutputs; o++) {
            delta += net.weights[1][h][o] * preCalc.deltas_output[o];
        }
        delta *= sigmoidDerivative(preCalc.a_hidden[h]);
        preCalc.deltas_hidden[h] = delta;
    }

    // === FORWARD PASS STEPS ===
    let weightIdx = 1;

    // Calculate z and activation for each hidden node
    for (let h = 0; h < numHidden; h++) {
        // Step: Calculate z for hidden node h
        let zFormula = `z_h${h} = `;
        let zTerms = [];
        let zValue = 0;
        for (let i = 0; i < numInputs; i++) {
            const input = BT.trainingExample.inputs[i];
            const weight = net.weights[0][i][h];
            const weightName = getWeightName(0, i, h);
            zTerms.push(`x${i}×${weightName}`);
            zValue += input * weight;
            weightIdx++;
        }
        zFormula += zTerms.join(' + ') + ' = ';

        let zNums = [];
        weightIdx -= numInputs;
        for (let i = 0; i < numInputs; i++) {
            const input = BT.trainingExample.inputs[i];
            const weight = net.weights[0][i][h];
            zNums.push(`${formatNumber(input, 2)}×${formatNumber(weight, 2)}`);
            weightIdx++;
        }
        zFormula += zNums.join(' + ');

        steps.push({
            phase: 'forward',
            type: 'calcZ',
            nodeLayer: 1,
            nodeIndex: h,
            formula: zFormula,
            expectedAnswer: round(zValue, 4),
            hint: 'hintMultiply',
            formulaRef: 'z = Σ(input × weight)'
        });

        // Step: Calculate sigmoid for hidden node h
        const zh = zValue;
        steps.push({
            phase: 'forward',
            type: 'calcA',
            nodeLayer: 1,
            nodeIndex: h,
            formula: `a_h${h + 1} = σ(z_h${h + 1}) = σ(${formatNumber(zh, 4)}) = 1/(1 + e^(-${formatNumber(zh, 4)}))`,
            expectedAnswer: round(sigmoid(zh), 4),
            hint: 'hintSigmoid',
            formulaRef: 'formulaSigmoid'
        });
    }

    // Calculate outputs
    for (let o = 0; o < numOutputs; o++) {
        // Step: Calculate z for output node o
        let zFormula = `z_out${o} = `;
        let zTerms = [];
        let zValue = 0;
        for (let h = 0; h < numHidden; h++) {
            const activation = preCalc.a_hidden[h];
            const weight = net.weights[1][h][o];
            const weightName = getWeightName(1, h, o);
            zTerms.push(`a_h${h}×${weightName}`);
            zValue += activation * weight;
            weightIdx++;
        }
        zFormula += zTerms.join(' + ') + ' = ';

        let zNums = [];
        weightIdx -= numHidden;
        for (let h = 0; h < numHidden; h++) {
            const activation = preCalc.a_hidden[h];
            const weight = net.weights[1][h][o];
            zNums.push(`${formatNumber(activation, 4)}×${formatNumber(weight, 2)}`);
            weightIdx++;
        }
        zFormula += zNums.join(' + ');

        steps.push({
            phase: 'forward',
            type: 'calcZOutput',
            nodeLayer: 2,
            nodeIndex: o,
            formula: zFormula,
            expectedAnswer: round(zValue, 4),
            hint: 'hintMultiply',
            formulaRef: 'z = Σ(activation × weight)'
        });

        // Step: Calculate output activation
        const zOut = zValue;
        steps.push({
            phase: 'forward',
            type: 'calcAOutput',
            nodeLayer: 2,
            nodeIndex: o,
            formula: `ŷ${o} = σ(z_out${o}) = σ(${formatNumber(zOut, 4)})`,
            expectedAnswer: round(sigmoid(zOut), 4),
            hint: 'hintSigmoid',
            formulaRef: 'formulaSigmoid'
        });
    }

    // === ERROR CALCULATION ===
    let errorFormula = 'E = ½×(';
    let errorTerms = [];
    let totalError = 0;
    for (let o = 0; o < numOutputs; o++) {
        const yHat = preCalc.a_output[o];
        const target = BT.trainingExample.targets[o];
        errorTerms.push(`(y${o} - ŷ${o})²`);
        totalError += 0.5 * Math.pow(target - yHat, 2);
    }
    errorFormula += errorTerms.join(' + ') + ')';

    steps.push({
        phase: 'error',
        type: 'calcError',
        formula: errorFormula,
        expectedAnswer: round(totalError, 4),
        hint: 'hintError',
        formulaRef: 'formulaError'
    });

    // === BACKWARD PASS ===

    // Output deltas
    for (let o = 0; o < numOutputs; o++) {
        const yHat = preCalc.a_output[o];
        const target = BT.trainingExample.targets[o];
        const sigmoidDeriv = sigmoidDerivative(yHat);

        steps.push({
            phase: 'backward',
            type: 'calcOutputDelta',
            nodeLayer: 2,
            nodeIndex: o,
            formula: `δ_out${o + 1} = (ŷ${o + 1} - y${o + 1}) × σ'(z_out${o + 1}) = (${formatNumber(yHat, 4)} - ${formatNumber(target, 2)}) × ${formatNumber(yHat, 4)} × (1 - ${formatNumber(yHat, 4)})`,
            expectedAnswer: round((yHat - target) * sigmoidDeriv, 4),
            hint: 'hintOutputDelta',
            formulaRef: 'formulaOutputDelta'
        });
    }

    // Hidden node deltas
    for (let h = 0; h < numHidden; h++) {
        const activation = preCalc.a_hidden[h];
        const sigmoidDeriv = sigmoidDerivative(activation);

        let deltaFormula = `δ_h${h + 1} = (`;
        let deltaTerms = [];
        let deltaSum = 0;
        for (let o = 0; o < numOutputs; o++) {
            const deltaOut = preCalc.deltas_output[o];
            const weight = net.weights[1][h][o];

            deltaTerms.push(`w${numInputs * numHidden + h * numOutputs + o + 1}×δ_out${o + 1}`);
            deltaSum += weight * deltaOut;
        }
        deltaFormula += deltaTerms.join(' + ') + `) × σ'(z_h${h + 1})`;

        steps.push({
            phase: 'backward',
            type: 'calcHiddenDelta',
            nodeLayer: 1,
            nodeIndex: h,
            formula: deltaFormula,
            expectedAnswer: round(deltaSum * sigmoidDeriv, 4),
            hint: 'hintHiddenDelta',
            formulaRef: 'formulaHiddenDelta'
        });
    }

    // Weight gradients and updates
    weightIdx = 1;

    // Input to hidden weights
    for (let i = 0; i < numInputs; i++) {
        for (let h = 0; h < numHidden; h++) {
            const input = BT.trainingExample.inputs[i];
            const deltaHidden = preCalc.deltas_hidden[h];
            const gradient = input * deltaHidden;
            const weightName = getWeightName(0, i, h);

            steps.push({
                phase: 'backward',
                type: 'calcGradient',
                weightLayer: 0,
                fromNode: i,
                toNode: h,
                formula: `∂E/∂${weightName} = x${i} × δ_h${h} = ${formatMathNumber(input, 2)} × ${formatMathNumber(deltaHidden, 4)}`,
                expectedAnswer: round(gradient, 4),
                hint: 'hintGradient',
                formulaRef: 'formulaWeightGradient'
            });

            steps.push({
                phase: 'update',
                type: 'updateWeight',
                weightLayer: 0,
                fromNode: i,
                toNode: h,
                oldWeight: net.weights[0][i][h],
                gradient: gradient,
                formula: `${weightName}_new = ${weightName}_old - η×∂E/∂${weightName} = ${formatMathNumber(net.weights[0][i][h], 2)} - ${BT.learningRate}×${formatMathNumber(gradient, 4)}`,
                expectedAnswer: round(net.weights[0][i][h] - BT.learningRate * gradient, 4),
                hint: 'hintUpdate',
                formulaRef: 'formulaWeightUpdate'
            });

            weightIdx++;
        }
    }

    // Hidden to output weights
    for (let h = 0; h < numHidden; h++) {
        for (let o = 0; o < numOutputs; o++) {
            const activation = preCalc.a_hidden[h];
            const deltaOut = preCalc.deltas_output[o];
            const gradient = activation * deltaOut;
            const weightName = getWeightName(1, h, o);

            steps.push({
                phase: 'backward',
                type: 'calcGradient',
                weightLayer: 1,
                fromNode: h,
                toNode: o,
                formula: `∂E/∂${weightName} = a_h${h} × δ_out${o} = ${formatMathNumber(activation, 4)} × ${formatMathNumber(deltaOut, 4)}`,
                expectedAnswer: round(gradient, 4),
                hint: 'hintGradient',
                formulaRef: 'formulaWeightGradient'
            });

            steps.push({
                phase: 'update',
                type: 'updateWeight',
                weightLayer: 1,
                fromNode: h,
                toNode: o,
                oldWeight: net.weights[1][h][o],
                gradient: gradient,
                formula: `${weightName}_new = ${weightName}_old - η×∂E/∂${weightName} = ${formatMathNumber(net.weights[1][h][o], 2)} - ${BT.learningRate}×${formatMathNumber(gradient, 4)}`,
                expectedAnswer: round(net.weights[1][h][o] - BT.learningRate * gradient, 4),
                hint: 'hintUpdate',
                formulaRef: 'formulaWeightUpdate'
            });

            weightIdx++;
        }
    }

    BT.state.steps = steps;
    BT.state.totalSteps = steps.length;
    BT.state.currentStep = 0;
}

// ============================================
// NETWORK VISUALIZATION
// ============================================

function getValueColor(value) {
    const clampedValue = clamp(value, -1, 1);

    if (clampedValue < 0) {
        // Red gradient for negative
        const intensity = Math.abs(clampedValue);
        const r = 255;
        const g = Math.round(255 - intensity * 200);
        const b = Math.round(255 - intensity * 200);
        return `rgb(${r}, ${g}, ${b})`;
    } else if (clampedValue > 0) {
        // Green gradient for positive
        const intensity = clampedValue;
        const r = Math.round(255 - intensity * 200);
        const g = 255;
        const b = Math.round(255 - intensity * 200);
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        return 'rgb(245, 245, 245)';
    }
}

function getConnectionColor(weight) {
    if (weight > 0) {
        return '#22c55e'; // Green for positive
    } else if (weight < 0) {
        return '#ef4444'; // Red for negative
    }
    return '#9ca3af'; // Gray for zero
}

function renderNetwork(containerId, isMini = false) {
    const BT = BackpropTutorial;
    const container = document.getElementById(containerId);
    if (!container) return;

    const net = BT.network;
    const structure = BT.networkStructure;

    const width = isMini ? 140 : 280;
    const height = isMini ? 70 : 160;
    const nodeRadius = isMini ? 8 : 16;
    const layerSpacing = width / (structure.length + 1);

    // Calculate positions
    const positions = [];
    for (let layer = 0; layer < structure.length; layer++) {
        positions[layer] = [];
        const nodeCount = structure[layer];
        const gap = height / (nodeCount + 1);

        for (let node = 0; node < nodeCount; node++) {
            positions[layer][node] = {
                x: layerSpacing * (layer + 1),
                y: gap * (node + 1)
            };
        }
    }

    // Build SVG
    let svg = `<svg class="${isMini ? 'mini-network-svg' : 'backprop-network-svg'}" 
                    viewBox="0 0 ${width} ${height}" 
                    preserveAspectRatio="xMidYMid meet">`;

    // Draw connections with weight labels
    const weights = net.weights;
    let weightIdx = 1;
    for (let layer = 0; layer < structure.length - 1; layer++) {
        for (let from = 0; from < structure[layer]; from++) {
            for (let to = 0; to < structure[layer + 1]; to++) {
                const weight = weights[layer][from][to];
                const color = getConnectionColor(weight);
                const fromPos = positions[layer][from];
                const toPos = positions[layer + 1][to];
                const strokeWidth = isMini ? Math.max(1, Math.abs(weight) * 2) : Math.max(1.5, Math.abs(weight) * 3);

                svg += `<line class="bp-connection" 
                              id="bp-conn-${layer}-${from}-${to}"
                              x1="${fromPos.x}" y1="${fromPos.y}" 
                              x2="${toPos.x}" y2="${toPos.y}" 
                              stroke="${color}" 
                              stroke-width="${strokeWidth}" 
                              stroke-opacity="0.8"/>`;

                // Weight label (midpoint)
                if (!isMini) {
                    const midX = (fromPos.x + toPos.x) / 2;
                    const midY = (fromPos.y + toPos.y) / 2;
                    const weightNameHTML = getWeightNameHTML(layer, from, to);
                    svg += `<text class="bp-weight-label" 
                                  id="bp-weight-${layer}-${from}-${to}"
                                  x="${midX}" y="${midY - 5}" 
                                  text-anchor="middle">${weightNameHTML}=${formatNumber(weight, 2)}</text>`;
                }
                weightIdx++;
            }
        }
    }

    // Draw nodes
    const layerLabels = BT.lang === 'es'
        ? ['Entrada', 'Oculta', 'Salida']
        : ['Input', 'Hidden', 'Output'];

    for (let layer = 0; layer < structure.length; layer++) {
        for (let node = 0; node < structure[layer]; node++) {
            const pos = positions[layer][node];
            const activation = net.activations[layer][node];
            const color = getValueColor(activation);

            svg += `<circle class="bp-node" 
                           id="bp-node-${layer}-${node}"
                           cx="${pos.x}" cy="${pos.y}" r="${nodeRadius}"
                           fill="${color}" 
                           stroke="#374151" 
                           stroke-width="2"/>`;

            // Show activation value
            if (!isMini) {
                const displayValue = formatNumber(activation, 2);
                svg += `<text class="bp-node-value" 
                              id="bp-value-${layer}-${node}"
                              x="${pos.x}" y="${pos.y + 4}" 
                              text-anchor="middle" 
                              fill="${Math.abs(activation) > 0.3 ? '#fff' : '#333'}"
                              font-size="10">${displayValue}</text>`;
            }
        }
    }

    // Draw layer labels (only for larger network)
    if (!isMini) {
        for (let layer = 0; layer < structure.length; layer++) {
            const x = layerSpacing * (layer + 1);
            svg += `<text class="bp-layer-label" 
                          x="${x}" y="${height - 5}" 
                          text-anchor="middle" 
                          font-size="9">${layerLabels[layer]}</text>`;
        }
    }

    svg += '</svg>';
    container.innerHTML = svg;
}

// ============================================
// WEIGHTS TABLE
// ============================================

function renderWeightsTable() {
    const BT = BackpropTutorial;
    const container = document.getElementById('weightsTableContainer');
    if (!container) return;

    const net = BT.network;
    const numInputs = BT.networkStructure[0];
    const numHidden = BT.networkStructure[1];
    const numOutputs = BT.networkStructure[2];

    let html = '<table class="weights-table"><thead><tr><th>Weight</th><th>From</th><th>To</th><th>Value</th></tr></thead><tbody>';

    let weightIdx = 1;

    // Input to hidden weights
    for (let i = 0; i < numInputs; i++) {
        for (let h = 0; h < numHidden; h++) {
            const weight = net.weights[0][i][h];
            const weightName = getWeightName(0, i, h);
            html += `<tr id="weight-row-${weightIdx}" class="weight-row">
                <td class="weight-name">$${weightName}$</td>
                <td>x${i}</td>
                <td>h${h}</td>
                <td class="weight-value" id="weight-val-${weightIdx}">${formatNumber(weight, 2)}</td>
            </tr>`;
            weightIdx++;
        }
    }

    // Hidden to output weights
    for (let h = 0; h < numHidden; h++) {
        for (let o = 0; o < numOutputs; o++) {
            const weight = net.weights[1][h][o];
            const weightName = getWeightName(1, h, o);
            html += `<tr id="weight-row-${weightIdx}" class="weight-row">
                <td class="weight-name">$${weightName}$</td>
                <td>h${h}</td>
                <td>o${o}</td>
                <td class="weight-value" id="weight-val-${weightIdx}">${formatNumber(weight, 2)}</td>
            </tr>`;
            weightIdx++;
        }
    }

    html += '</tbody></table>';
    container.innerHTML = html;

    // Trigger MathJax rendering for the table
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([container]).catch((err) => console.log('MathJax error:', err));
    }
}

function highlightWeightInTable(weightIdx) {
    // Remove previous highlights
    document.querySelectorAll('.weight-row.highlighted').forEach(el => el.classList.remove('highlighted'));

    const row = document.getElementById(`weight-row-${weightIdx}`);
    if (row) {
        row.classList.add('highlighted');
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function updateWeightInTable(weightIdx, newValue) {
    const cell = document.getElementById(`weight-val-${weightIdx}`);
    if (cell) {
        cell.textContent = formatNumber(newValue, 4);
        cell.classList.add('updated');
        setTimeout(() => cell.classList.remove('updated'), 1000);
    }
}

function highlightNode(layer, node, state = 'completed') {
    // state can be: 'computing' (orange, current) or 'completed' (green, done)
    const nodeEl = document.getElementById(`bp-node-${layer}-${node}`);
    if (nodeEl) {
        nodeEl.classList.remove('computing', 'completed');
        nodeEl.classList.add(state);
    }
}

function highlightConnection(layer, from, to, state = 'computing') {
    // state can be: 'computing' (orange, current) or 'completed' (green, done)
    const connEl = document.getElementById(`bp-conn-${layer}-${from}-${to}`);
    const labelEl = document.getElementById(`bp-weight-${layer}-${from}-${to}`);
    if (connEl) {
        connEl.classList.remove('computing', 'completed');
        connEl.classList.add(state);
    }
    if (labelEl) {
        labelEl.classList.remove('computing', 'completed');
        labelEl.classList.add(state);
    }
}

function clearNetworkHighlights() {
    document.querySelectorAll('.bp-node.computing, .bp-node.completed').forEach(el => {
        el.classList.remove('computing', 'completed');
    });
    document.querySelectorAll('.bp-connection.computing, .bp-connection.completed').forEach(el => {
        el.classList.remove('computing', 'completed');
    });
    document.querySelectorAll('.bp-weight-label.computing, .bp-weight-label.completed').forEach(el => {
        el.classList.remove('computing', 'completed');
    });
}

// ============================================
// UI RENDERING
// ============================================

function updateTimelineUI() {
    const BT = BackpropTutorial;
    const phase = BT.state.currentPhase;

    const phaseMap = {
        'forward': 0,
        'error': 1,
        'backward': 2,
        'update': 3,
        'complete': 4
    };

    const currentPhaseIdx = phaseMap[phase] || 0;

    // Update phase bar
    const phases = document.querySelectorAll('.bp-phase');
    phases.forEach((phaseEl, idx) => {
        phaseEl.classList.remove('active', 'completed');

        if (idx < currentPhaseIdx) {
            phaseEl.classList.add('completed');
        } else if (idx === currentPhaseIdx) {
            phaseEl.classList.add('active');
        }
    });
}

function updateStepUI() {
    const BT = BackpropTutorial;
    const step = BT.state.steps[BT.state.currentStep];

    if (!step) return;

    // Update phase in state
    BT.state.currentPhase = step.phase;
    updateTimelineUI();

    // Update step title
    const titleEl = document.getElementById('stepTitle');
    const phaseTitles = {
        forward: t('phaseForward'),
        error: t('phaseError'),
        backward: t('phaseBackward'),
        update: t('phaseUpdate')
    };
    titleEl.textContent = `${phaseTitles[step.phase]} (${BT.state.currentStep + 1}/${BT.state.totalSteps})`;

    // Update description based on step type
    const descEl = document.getElementById('stepDescription');
    const typeDescs = {
        calcZ: t('descCalcZ'),
        calcA: t('descCalcA'),
        calcZOutput: t('descCalcOutput'),
        calcAOutput: t('descCalcOutput'),
        calcError: t('descError'),
        calcOutputDelta: t('descOutputDelta'),
        calcHiddenDelta: t('descHiddenDelta'),
        calcGradient: t('descWeightGradient'),
        updateWeight: t('descUpdateWeight')
    };
    descEl.textContent = typeDescs[step.type] || '';

    // Update computation area
    const compArea = document.getElementById('computationArea');
    compArea.innerHTML = `
        <div class="computation-step active">
            <div class="computation-label">${BT.lang === 'es' ? 'Cálculo:' : 'Calculation:'}</div>
            <div class="computation-formula">$${step.formula}$</div>
        </div>
    `;

    // Update formula reference
    const formulaContent = document.getElementById('formulaContent');
    if (step.formulaRef && t(step.formulaRef)) {
        formulaContent.innerHTML = `$${t(step.formulaRef)}$`;
    } else {
        formulaContent.innerHTML = step.formulaRef ? `$${step.formulaRef}$` : '';
    }

    // Trigger MathJax rendering
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([compArea, formulaContent]).catch((err) => console.log('MathJax error:', err));
    }

    // Reset input
    const userInput = document.getElementById('userInput');
    userInput.value = '';
    userInput.classList.remove('correct', 'incorrect');
    userInput.disabled = false;

    // Reset feedback
    const feedback = document.getElementById('feedbackMessage');
    feedback.style.display = 'none';

    // Reset hint
    const hintContent = document.getElementById('hintContent');
    hintContent.style.display = 'none';

    // Update navigation buttons
    document.getElementById('prevStepBtn').style.display = BT.state.currentStep > 0 ? 'inline-flex' : 'none';
    document.getElementById('nextStepBtn').style.display = 'none';

    // Clear previous highlights and show current computation
    clearNetworkHighlights();

    // Mark completed elements in green
    markCompletedElements();

    // Highlight current computation elements in orange
    if (step.nodeLayer !== undefined && step.nodeIndex !== undefined) {
        highlightNode(step.nodeLayer, step.nodeIndex, 'computing');

        // For forward pass, highlight source nodes being used
        if (step.type === 'calcZ' || step.type === 'calcZOutput') {
            const prevLayer = step.nodeLayer - 1;
            const numPrevNodes = BT.networkStructure[prevLayer];
            for (let i = 0; i < numPrevNodes; i++) {
                highlightNode(prevLayer, i, 'computing');
                highlightConnection(prevLayer, i, step.nodeIndex, 'computing');
            }
        }
    }
    if (step.weightLayer !== undefined) {
        highlightConnection(step.weightLayer, step.fromNode, step.toNode, 'computing');
        // Highlight source and destination nodes
        highlightNode(step.weightLayer, step.fromNode, 'computing');
        highlightNode(step.weightLayer + 1, step.toNode, 'computing');

        // Also highlight in weights table
        const weightIdx = getWeightIndex(step.weightLayer, step.fromNode, step.toNode);
        highlightWeightInTable(weightIdx);
    }
}

// Mark all elements computed in previous steps as completed (green)
function markCompletedElements() {
    const BT = BackpropTutorial;
    const currentStep = BT.state.currentStep;

    for (let i = 0; i < currentStep; i++) {
        const prevStep = BT.state.steps[i];
        if (prevStep.nodeLayer !== undefined && prevStep.nodeIndex !== undefined) {
            if (prevStep.type === 'calcA' || prevStep.type === 'calcAOutput') {
                // Mark activated nodes as completed
                highlightNode(prevStep.nodeLayer, prevStep.nodeIndex, 'completed');
            }
        }
    }
}

// Helper to compute weight index for table highlighting
function getWeightIndex(layer, from, to) {
    const BT = BackpropTutorial;
    const numInputs = BT.networkStructure[0];
    const numHidden = BT.networkStructure[1];
    const numOutputs = BT.networkStructure[2];

    if (layer === 0) {
        // Input to hidden: w1, w2, ...
        return from * numHidden + to + 1;
    } else {
        // Hidden to output: continues after input-to-hidden weights
        return numInputs * numHidden + from * numOutputs + to + 1;
    }
}

function showHint() {
    const BT = BackpropTutorial;
    const step = BT.state.steps[BT.state.currentStep];

    if (!step) return;

    const hintContent = document.getElementById('hintContent');
    hintContent.innerHTML = t(step.hint);
    hintContent.style.display = 'block';
    BT.state.hintsShown++;
}

function revealAnswer() {
    const BT = BackpropTutorial;
    const step = BT.state.steps[BT.state.currentStep];

    if (!step) return;

    const userInput = document.getElementById('userInput');
    userInput.value = formatNumber(step.expectedAnswer, 4);
    userInput.classList.add('correct');
    userInput.disabled = true;

    const feedback = document.getElementById('feedbackMessage');
    feedback.className = 'bp-feedback info';
    feedback.innerHTML = `${t('revealed')} <strong>${formatNumber(step.expectedAnswer, 4)}</strong>`;
    feedback.style.display = 'block';

    document.getElementById('nextStepBtn').style.display = 'inline-flex';
    BT.state.answersRevealed++;

    // Apply the computation to the network state
    applyStepResult(step);
}

function checkAnswer() {
    const BT = BackpropTutorial;
    const step = BT.state.steps[BT.state.currentStep];

    if (!step) return;

    const userInput = document.getElementById('userInput');
    const userValue = parseFloat(userInput.value);

    if (isNaN(userValue)) {
        userInput.classList.add('incorrect');
        setTimeout(() => userInput.classList.remove('incorrect'), 400);
        return;
    }

    const expected = step.expectedAnswer;
    const diff = Math.abs(userValue - expected);

    const feedback = document.getElementById('feedbackMessage');

    if (diff <= BT.tolerance) {
        // Correct!
        userInput.classList.add('correct');
        userInput.disabled = true;

        if (diff < 0.001) {
            feedback.className = 'bp-feedback success';
            feedback.innerHTML = t('correct');
        } else {
            feedback.className = 'bp-feedback success';
            feedback.innerHTML = `${t('closeEnough')} <strong>${formatNumber(expected, 4)}</strong>`;
        }
        feedback.style.display = 'block';

        document.getElementById('nextStepBtn').style.display = 'inline-flex';

        // Apply the computation to the network state
        applyStepResult(step);
    } else {
        // Incorrect
        userInput.classList.add('incorrect');
        setTimeout(() => userInput.classList.remove('incorrect'), 400);

        feedback.className = 'bp-feedback error';
        feedback.innerHTML = t('incorrect');
        feedback.style.display = 'block';
    }
}

function applyStepResult(step) {
    const BT = BackpropTutorial;
    const net = BT.network;

    // Update network state based on step type
    if (step.type === 'calcZ' || step.type === 'calcZOutput') {
        net.preActivations[step.nodeLayer][step.nodeIndex] = step.expectedAnswer;
    } else if (step.type === 'calcA' || step.type === 'calcAOutput') {
        net.activations[step.nodeLayer][step.nodeIndex] = step.expectedAnswer;

        // Show output in panel if this is the final output
        if (step.nodeLayer === 2) {
            const outputEl = document.getElementById(`outputValue${step.nodeIndex + 1}`);
            const outputRow = document.getElementById(`outputRow${step.nodeIndex + 1}`);
            if (outputEl) outputEl.textContent = formatNumber(step.expectedAnswer, 4);
            if (outputRow) outputRow.style.display = 'flex';

            // Check if all outputs computed
            const numOutputs = BT.networkStructure[2];
            let allComputed = true;
            for (let o = 0; o < numOutputs; o++) {
                if (net.activations[2][o] === 0) allComputed = false;
            }
            if (allComputed) {
                terminalLog(t('terminalForwardComplete').replace('{output}',
                    net.activations[2].slice(0, numOutputs).map(v => formatNumber(v, 4)).join(', ')));
            }
        }
    } else if (step.type === 'calcError') {
        document.getElementById('errorValue').textContent = formatNumber(step.expectedAnswer, 4);
        document.getElementById('errorRow').style.display = 'flex';
        BT.state.errorsBeforeUpdate.push(step.expectedAnswer);
        terminalLog(t('terminalError').replace('{error}', formatNumber(step.expectedAnswer, 4)));
    } else if (step.type === 'calcOutputDelta') {
        net.deltas[step.nodeLayer][step.nodeIndex] = step.expectedAnswer;
    } else if (step.type === 'calcHiddenDelta') {
        net.deltas[step.nodeLayer][step.nodeIndex] = step.expectedAnswer;
    } else if (step.type === 'calcGradient') {
        net.weightGradients[step.weightLayer][step.fromNode][step.toNode] = step.expectedAnswer;
    } else if (step.type === 'updateWeight') {
        net.weights[step.weightLayer][step.fromNode][step.toNode] = step.expectedAnswer;
        highlightConnection(step.weightLayer, step.fromNode, step.toNode);

        // Update weights table
        const weightIdx = getWeightIndex(step.weightLayer, step.fromNode, step.toNode);
        updateWeightInTable(weightIdx, step.expectedAnswer);
    }

    // Re-render network
    renderNetwork('networkContainer');
}

function nextStep() {
    const BT = BackpropTutorial;

    BT.state.currentStep++;

    if (BT.state.currentStep >= BT.state.totalSteps) {
        // Pass complete!
        completePass();
    } else {
        updateStepUI();
    }
}

function prevStep() {
    const BT = BackpropTutorial;

    if (BT.state.currentStep > 0) {
        BT.state.currentStep--;
        updateStepUI();
    }
}

// ============================================
// PASS COMPLETION
// ============================================

function completePass() {
    const BT = BackpropTutorial;

    // Compute new error after weight updates
    computeForwardPass();
    const newError = computeError();
    BT.state.errorsAfterUpdate.push(newError);

    terminalLog(t('terminalWeightsUpdated').replace('{output}', formatNumber(BT.network.activations[2][0], 4)));
    terminalLog(t('terminalEpochComplete').replace('{epoch}', BT.state.epoch));

    // Show completion modal
    const errorBefore = BT.state.errorsBeforeUpdate[BT.state.errorsBeforeUpdate.length - 1];
    const errorAfter = newError;

    document.getElementById('errorBefore').textContent = formatNumber(errorBefore, 4);
    document.getElementById('errorAfter').textContent = formatNumber(errorAfter, 4);

    const summary = document.getElementById('completionSummary');
    if (errorAfter < errorBefore) {
        summary.innerHTML = t('errorReduced')
            .replace('{before}', formatNumber(errorBefore, 4))
            .replace('{after}', formatNumber(errorAfter, 4));
    } else {
        summary.innerHTML = t('errorIncreased')
            .replace('{before}', formatNumber(errorBefore, 4))
            .replace('{after}', formatNumber(errorAfter, 4));
    }

    document.getElementById('passCompleteOverlay').style.display = 'flex';

    BT.state.currentPhase = 'complete';
    updateTimelineUI();
}

function anotherPass() {
    const BT = BackpropTutorial;

    // Hide modal
    document.getElementById('passCompleteOverlay').style.display = 'none';

    // Increment epoch
    BT.state.epoch++;
    document.getElementById('epochCounter').textContent = BT.state.epoch;

    // Select new training example
    selectNewTrainingExample();

    // Generate new steps
    generateSteps();

    // Reset and start
    BT.state.currentStep = 0;
    BT.state.currentPhase = 'forward';
    updateStepUI();
    renderNetwork('networkContainer');
}

function finishTutorial() {
    const BT = BackpropTutorial;

    // Hide pass complete modal
    document.getElementById('passCompleteOverlay').style.display = 'none';

    // Calculate total error reduction
    const initialError = BT.state.errorsBeforeUpdate[0] || 0;
    const finalError = BT.state.errorsAfterUpdate[BT.state.errorsAfterUpdate.length - 1] || 0;
    const reduction = initialError > 0 ? ((initialError - finalError) / initialError * 100) : 0;

    document.getElementById('totalEpochs').textContent = BT.state.epoch;
    document.getElementById('errorReduction').textContent = `${reduction.toFixed(1)}%`;

    // Render network snapshots
    renderMiniNetwork('initialNetworkSnapshot', BT.network.initialSnapshot);
    renderMiniNetwork('finalNetworkSnapshot', BT.network.weights);

    // Show final summary
    document.getElementById('finalSummaryOverlay').style.display = 'flex';
}

function renderMiniNetwork(containerId, weights) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const structure = BackpropTutorial.networkStructure;
    const width = 120;
    const height = 60;
    const nodeRadius = 6;
    const layerSpacing = width / (structure.length + 1);

    const positions = [];
    for (let layer = 0; layer < structure.length; layer++) {
        positions[layer] = [];
        const nodeCount = structure[layer];
        const gap = height / (nodeCount + 1);
        for (let node = 0; node < nodeCount; node++) {
            positions[layer][node] = {
                x: layerSpacing * (layer + 1),
                y: gap * (node + 1)
            };
        }
    }

    let svg = `<svg class="mini-network-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">`;

    // Draw connections
    for (let layer = 0; layer < structure.length - 1; layer++) {
        for (let from = 0; from < structure[layer]; from++) {
            for (let to = 0; to < structure[layer + 1]; to++) {
                const weight = weights[layer][from][to];
                const color = getConnectionColor(weight);
                const fromPos = positions[layer][from];
                const toPos = positions[layer + 1][to];
                const strokeWidth = Math.max(0.5, Math.abs(weight) * 2);

                svg += `<line x1="${fromPos.x}" y1="${fromPos.y}" 
                              x2="${toPos.x}" y2="${toPos.y}" 
                              stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="0.8"/>`;
            }
        }
    }

    // Draw nodes
    for (let layer = 0; layer < structure.length; layer++) {
        for (let node = 0; node < structure[layer]; node++) {
            const pos = positions[layer][node];
            svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${nodeRadius}"
                           fill="#e5e7eb" stroke="#374151" stroke-width="1.5"/>`;
        }
    }

    svg += '</svg>';
    container.innerHTML = svg;
}

// ============================================
// DERIVATIVE HELPER
// ============================================

function showDerivativeHelper() {
    const helperContent = document.getElementById('helperContent');

    helperContent.innerHTML = `
        <div class="helper-section">
            <h4>${t('helperSigmoidTitle')}</h4>
            <p>${t('helperSigmoidDesc')}</p>
            <div class="helper-formula">σ'(x) = σ(x) × (1 - σ(x))</div>
            <div class="helper-example">
                <strong>${BackpropTutorial.lang === 'es' ? 'Ejemplo:' : 'Example:'}</strong><br>
                ${t('helperSigmoidExample')}
            </div>
        </div>
        
        <div class="helper-section">
            <h4>${t('helperChainTitle')}</h4>
            <p>${t('helperChainDesc')}</p>
            <div class="helper-formula">${t('helperChainFormula')}</div>
        </div>
        
        <div class="helper-section">
            <h4>${t('helperDeltaTitle')}</h4>
            <p>${t('helperDeltaDesc')}</p>
            <div class="helper-formula">${t('helperDeltaOutput')}</div>
            <p>${t('helperDeltaHidden')}</p>
            <div class="helper-formula">${t('helperDeltaHiddenFormula')}</div>
        </div>
    `;

    document.getElementById('gradientHelperOverlay').style.display = 'flex';
}

function closeDerivativeHelper() {
    document.getElementById('gradientHelperOverlay').style.display = 'none';
}

// ============================================
// INITIALIZATION AND EVENT HANDLERS
// ============================================

function initTutorial() {
    const BT = BackpropTutorial;

    BT.lang = resolveLanguage();

    // Reset state
    BT.state = {
        currentPhase: 'forward',
        currentStep: 0,
        totalSteps: 0,
        steps: [],
        epoch: 1,
        errorsBeforeUpdate: [],
        errorsAfterUpdate: [],
        hintsShown: 0,
        answersRevealed: 0
    };

    // Initialize network
    initializeNetwork();
    generateTrainingPool();
    selectNewTrainingExample();

    // Set input activations
    for (let i = 0; i < BT.networkStructure[0]; i++) {
        BT.network.activations[0][i] = BT.trainingExample.inputs[i];
    }

    // Generate steps
    generateSteps();

    // Render UI
    document.getElementById('epochCounter').textContent = '1';
    document.getElementById('learningRateValue').textContent = BT.learningRate;
    renderNetwork('networkContainer');
    updateStepUI();

    // Render weights table
    renderWeightsTable();

    // Hide overlays
    document.getElementById('passCompleteOverlay').style.display = 'none';
    document.getElementById('finalSummaryOverlay').style.display = 'none';
    document.getElementById('gradientHelperOverlay').style.display = 'none';

    terminalLog(t('terminalLoaded'));
}

function setupEventListeners() {
    // Check button
    document.getElementById('checkBtn')?.addEventListener('click', checkAnswer);

    // Enter key on input
    document.getElementById('userInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });

    // Hint and reveal buttons
    document.getElementById('hintBtn')?.addEventListener('click', showHint);
    document.getElementById('revealBtn')?.addEventListener('click', revealAnswer);

    // Navigation buttons
    document.getElementById('nextStepBtn')?.addEventListener('click', nextStep);
    document.getElementById('prevStepBtn')?.addEventListener('click', prevStep);

    // Control buttons
    document.getElementById('resetTutorialBtn')?.addEventListener('click', initTutorial);
    document.getElementById('derivativeHelperBtn')?.addEventListener('click', showDerivativeHelper);
    document.getElementById('closeHelperBtn')?.addEventListener('click', closeDerivativeHelper);

    // Difficulty selector buttons
    document.querySelectorAll('.bp-diff-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const difficulty = e.currentTarget.dataset.difficulty;
            changeDifficulty(difficulty);
        });
    });

    // Completion modal buttons
    document.getElementById('anotherPassBtn')?.addEventListener('click', anotherPass);
    document.getElementById('finishBtn')?.addEventListener('click', finishTutorial);
    document.getElementById('restartTutorialBtn')?.addEventListener('click', () => {
        document.getElementById('finalSummaryOverlay').style.display = 'none';
        initTutorial();
    });

    // Close overlay on background click
    document.getElementById('gradientHelperOverlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'gradientHelperOverlay') closeDerivativeHelper();
    });
}

function changeDifficulty(difficulty) {
    const BT = BackpropTutorial;

    // Update difficulty
    BT.difficulty = difficulty;
    BT.networkStructure = BT.networkConfigs[difficulty];

    // Update button states
    document.querySelectorAll('.bp-diff-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });

    // Restart tutorial with new difficulty
    initTutorial();

    terminalLog(t('terminalDifficultyChanged').replace('{difficulty}', difficulty));
}

// ============================================
// DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if the tutorial container exists
    if (!document.getElementById('backpropTutorial')) return;

    setupEventListeners();
    initTutorial();
});
