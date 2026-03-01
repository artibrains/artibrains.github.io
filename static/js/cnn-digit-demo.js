(function () {
    const lang = window.cnnDigitDemoLanguage || "en";
    const strings = {
        en: {
            modelUntrained: "Model: untrained",
            modelScratch: "Model: trained from scratch",
            predictHint: "Draw a digit and press Predict.",
            emptyCanvas: "Canvas is empty. Draw a digit first.",
            trainingStart: "Starting training from random initialization...",
            trainingEpoch: "Epoch",
            trainingDone: "Training complete.",
            trainingStopped: "Training stopped by user.",
            resetDone: "Weights reset to random initialization.",
            prediction: "Predicted digit",
            randomPredictionTag: "(random)",
            randomPredictionWarning: "Predictions are random until full training is completed.",
            stateNotTrained: "State: not trained",
            stateTrained: "State: trained",
            predictionNoticeRandom: "⚠️ Random predictions: the network is not fully trained yet.",
            predictionNoticeTrained: "✅ Trained mode: predictions are model-based.",
            layerInput: "Input",
            layerConv: "Conv",
            layerDense: "Dense",
            layerOut: "Output",
            hoverDefault: "Hover a neuron or connection to see its interpretation.",
            hoverNode: "{id} · activation {value}. {explain}",
            hoverEdge: "{from} → {to} · signal strength {value}.",
            explainInput: "Represents average intensity in one input quadrant.",
            explainConv: "Summarizes one learned feature map after ReLU.",
            explainDense: "Intermediate learned concept before final classification.",
            explainOut: "Class probability for this digit."
        },
        es: {
            modelUntrained: "Modelo: sin entrenar",
            modelScratch: "Modelo: entrenado desde cero",
            predictHint: "Dibuja un dígito y pulsa Predecir.",
            emptyCanvas: "El lienzo está vacío. Dibuja un dígito primero.",
            trainingStart: "Iniciando entrenamiento desde una inicialización aleatoria...",
            trainingEpoch: "Época",
            trainingDone: "Entrenamiento completado.",
            trainingStopped: "Entrenamiento detenido por el usuario.",
            resetDone: "Pesos reiniciados con inicialización aleatoria.",
            prediction: "Dígito predicho",
            randomPredictionTag: "(aleatoria)",
            randomPredictionWarning: "Las predicciones son aleatorias hasta completar el entrenamiento.",
            stateNotTrained: "Estado: no entrenada",
            stateTrained: "Estado: entrenada",
            predictionNoticeRandom: "⚠️ Predicciones aleatorias: la red aún no está completamente entrenada.",
            predictionNoticeTrained: "✅ Modo entrenado: las predicciones se basan en el modelo.",
            layerInput: "Entrada",
            layerConv: "Conv",
            layerDense: "Densa",
            layerOut: "Salida",
            hoverDefault: "Pasa el cursor por una neurona o conexión para ver su interpretación.",
            hoverNode: "{id} · activación {value}. {explain}",
            hoverEdge: "{from} → {to} · intensidad de señal {value}.",
            explainInput: "Representa la intensidad media en un cuadrante de entrada.",
            explainConv: "Resume un mapa de características aprendido tras ReLU.",
            explainDense: "Concepto intermedio aprendido antes de la clasificación final.",
            explainOut: "Probabilidad de clase para este dígito."
        }
    };
    const t = strings[lang] || strings.en;

    const root = document.getElementById("cnnDigitDemo");
    if (!root) return;

    const drawCanvas = document.getElementById("cnnDrawCanvas");
    const drawCtx = drawCanvas.getContext("2d", { willReadFrequently: true });
    const inputPreview = document.getElementById("cnnInputPreview");
    const inputPreviewCtx = inputPreview.getContext("2d");
    const networkSvg = document.getElementById("cnnNetworkSvg");

    const clearBtn = document.getElementById("cnnClearBtn");
    const predictBtn = document.getElementById("cnnPredictBtn");
    const trainBtn = document.getElementById("cnnTrainBtn");
    const stopBtn = document.getElementById("cnnStopBtn");
    const resetBtn = document.getElementById("cnnResetBtn");

    const epochsInput = document.getElementById("cnnEpochsInput");
    const samplesInput = document.getElementById("cnnSamplesInput");
    const lrInput = document.getElementById("cnnLrInput");

    const logEl = document.getElementById("cnnTrainingLog");
    const predictedDigitEl = document.getElementById("cnnPredictedDigit");
    const probBarsEl = document.getElementById("cnnProbBars");
    const filtersGrid = document.getElementById("cnnFiltersGrid");
    const modelStatus = document.getElementById("cnnModelStatus");
    const trainingStateBtn = document.getElementById("cnnTrainingStateBtn");
    const hoverInfoEl = document.getElementById("cnnHoverInfo");
    const predictModal = document.getElementById("cnnPredictModal");
    const modalUntrainedWarning = document.getElementById("cnnModalUntrainedWarning");
    const modalCloseBtn = document.getElementById("cnnModalCloseBtn");

    const INPUT = 20;
    const FILTERS = 12;
    const K = 3;
    const CONV = INPUT - K + 1;
    const POOL = Math.floor(CONV / 2);
    const FLAT = FILTERS * POOL * POOL;
    const HIDDEN = 32;
    const CLASSES = 10;

    const SVG_NS = "http://www.w3.org/2000/svg";

    let isTraining = false;
    let isModelTrained = false;
    let stopRequested = false;
    let liveUpdateFrame = null;

    const networkViz = {
        nodes: {
            input: [],
            conv: [],
            dense: [],
            out: []
        },
        edges: [],
        labels: []
    };

    let latestNetworkValues = {
        input: [0, 0, 0, 0],
        conv: [0, 0, 0, 0, 0, 0],
        dense: [0, 0, 0, 0, 0, 0, 0, 0],
        out: new Array(CLASSES).fill(0)
    };

    function createRng(seed) {
        let s = seed >>> 0;
        return function rand() {
            s = (s * 1664525 + 1013904223) >>> 0;
            return s / 4294967296;
        };
    }

    function randn(rng) {
        const u = Math.max(rng(), 1e-8);
        const v = Math.max(rng(), 1e-8);
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    function clamp01(v) {
        return v < 0 ? 0 : v > 1 ? 1 : v;
    }

    function softmax(logits) {
        let max = -Infinity;
        for (let i = 0; i < logits.length; i++) {
            if (logits[i] > max) max = logits[i];
        }
        const exps = new Float32Array(logits.length);
        let sum = 0;
        for (let i = 0; i < logits.length; i++) {
            exps[i] = Math.exp(logits[i] - max);
            sum += exps[i];
        }
        for (let i = 0; i < exps.length; i++) {
            exps[i] /= sum;
        }
        return exps;
    }

    class TinyCNN {
        constructor(seed = 42) {
            this.rng = createRng(seed);
            this.convK = new Float32Array(FILTERS * K * K);
            this.convB = new Float32Array(FILTERS);
            this.dense1W = new Float32Array(HIDDEN * FLAT);
            this.dense1B = new Float32Array(HIDDEN);
            this.dense2W = new Float32Array(CLASSES * HIDDEN);
            this.dense2B = new Float32Array(CLASSES);
            this.reset(seed);
        }

        reset(seed = null) {
            if (seed !== null) this.rng = createRng(seed);

            const convScale = Math.sqrt(2 / (K * K));
            for (let i = 0; i < this.convK.length; i++) {
                this.convK[i] = randn(this.rng) * convScale;
            }
            this.convB.fill(0);

            const dense1Scale = Math.sqrt(2 / FLAT);
            for (let i = 0; i < this.dense1W.length; i++) {
                this.dense1W[i] = randn(this.rng) * dense1Scale;
            }
            this.dense1B.fill(0);

            const dense2Scale = Math.sqrt(2 / HIDDEN);
            for (let i = 0; i < this.dense2W.length; i++) {
                this.dense2W[i] = randn(this.rng) * dense2Scale;
            }
            this.dense2B.fill(0);
        }

        getState() {
            return {
                convK: Array.from(this.convK),
                convB: Array.from(this.convB),
                dense1W: Array.from(this.dense1W),
                dense1B: Array.from(this.dense1B),
                dense2W: Array.from(this.dense2W),
                dense2B: Array.from(this.dense2B)
            };
        }

        setState(state) {
            this.convK.set(state.convK);
            this.convB.set(state.convB);
            this.dense1W.set(state.dense1W);
            this.dense1B.set(state.dense1B);
            this.dense2W.set(state.dense2W);
            this.dense2B.set(state.dense2B);
        }

        forward(input) {
            const conv = new Float32Array(FILTERS * CONV * CONV);
            const relu = new Float32Array(FILTERS * CONV * CONV);
            const pool = new Float32Array(FLAT);

            for (let f = 0; f < FILTERS; f++) {
                const kOffset = f * K * K;
                const convOffset = f * CONV * CONV;

                for (let y = 0; y < CONV; y++) {
                    for (let x = 0; x < CONV; x++) {
                        let sum = this.convB[f];
                        for (let ky = 0; ky < K; ky++) {
                            const inY = y + ky;
                            const inOffset = inY * INPUT;
                            const kRow = ky * K;
                            for (let kx = 0; kx < K; kx++) {
                                sum += input[inOffset + (x + kx)] * this.convK[kOffset + kRow + kx];
                            }
                        }
                        const convIdx = convOffset + y * CONV + x;
                        conv[convIdx] = sum;
                        relu[convIdx] = sum > 0 ? sum : 0;
                    }
                }

                for (let py = 0; py < POOL; py++) {
                    for (let px = 0; px < POOL; px++) {
                        const y0 = py * 2;
                        const x0 = px * 2;
                        const i1 = convOffset + y0 * CONV + x0;
                        const i2 = i1 + 1;
                        const i3 = i1 + CONV;
                        const i4 = i3 + 1;
                        pool[f * POOL * POOL + py * POOL + px] = (relu[i1] + relu[i2] + relu[i3] + relu[i4]) * 0.25;
                    }
                }
            }

            const hiddenPre = new Float32Array(HIDDEN);
            const hidden = new Float32Array(HIDDEN);
            for (let h = 0; h < HIDDEN; h++) {
                let sum = this.dense1B[h];
                const wOffset = h * FLAT;
                for (let i = 0; i < FLAT; i++) sum += this.dense1W[wOffset + i] * pool[i];
                hiddenPre[h] = sum;
                hidden[h] = sum > 0 ? sum : 0;
            }

            const logits = new Float32Array(CLASSES);
            for (let c = 0; c < CLASSES; c++) {
                let sum = this.dense2B[c];
                const wOffset = c * HIDDEN;
                for (let h = 0; h < HIDDEN; h++) sum += this.dense2W[wOffset + h] * hidden[h];
                logits[c] = sum;
            }

            const probs = softmax(logits);
            return { conv, relu, pool, hiddenPre, hidden, logits, probs };
        }

        trainOnSample(input, label, lr) {
            const cache = this.forward(input);
            const probs = cache.probs;
            const loss = -Math.log(Math.max(probs[label], 1e-8));

            const dLogits = Float32Array.from(probs);
            dLogits[label] -= 1;

            const dHidden = new Float32Array(HIDDEN);
            for (let c = 0; c < CLASSES; c++) {
                const grad = dLogits[c];
                const wOffset = c * HIDDEN;
                this.dense2B[c] -= lr * grad;
                for (let h = 0; h < HIDDEN; h++) {
                    dHidden[h] += this.dense2W[wOffset + h] * grad;
                    this.dense2W[wOffset + h] -= lr * grad * cache.hidden[h];
                }
            }

            const dHiddenPre = new Float32Array(HIDDEN);
            for (let h = 0; h < HIDDEN; h++) {
                dHiddenPre[h] = cache.hiddenPre[h] > 0 ? dHidden[h] : 0;
            }

            const dPool = new Float32Array(FLAT);
            for (let h = 0; h < HIDDEN; h++) {
                const grad = dHiddenPre[h];
                const wOffset = h * FLAT;
                this.dense1B[h] -= lr * grad;
                for (let i = 0; i < FLAT; i++) {
                    dPool[i] += this.dense1W[wOffset + i] * grad;
                    this.dense1W[wOffset + i] -= lr * grad * cache.pool[i];
                }
            }

            const dRelu = new Float32Array(FILTERS * CONV * CONV);
            for (let f = 0; f < FILTERS; f++) {
                const convOffset = f * CONV * CONV;
                for (let py = 0; py < POOL; py++) {
                    for (let px = 0; px < POOL; px++) {
                        const grad = dPool[f * POOL * POOL + py * POOL + px] * 0.25;
                        const y0 = py * 2;
                        const x0 = px * 2;
                        const i1 = convOffset + y0 * CONV + x0;
                        const i2 = i1 + 1;
                        const i3 = i1 + CONV;
                        const i4 = i3 + 1;
                        dRelu[i1] += grad;
                        dRelu[i2] += grad;
                        dRelu[i3] += grad;
                        dRelu[i4] += grad;
                    }
                }
            }

            for (let i = 0; i < dRelu.length; i++) {
                if (cache.conv[i] <= 0) dRelu[i] = 0;
            }

            for (let f = 0; f < FILTERS; f++) {
                const kOffset = f * K * K;
                const convOffset = f * CONV * CONV;
                let gradBias = 0;

                for (let y = 0; y < CONV; y++) {
                    for (let x = 0; x < CONV; x++) {
                        const grad = dRelu[convOffset + y * CONV + x];
                        gradBias += grad;
                        for (let ky = 0; ky < K; ky++) {
                            const inY = y + ky;
                            const inOffset = inY * INPUT;
                            const kRow = ky * K;
                            for (let kx = 0; kx < K; kx++) {
                                const idx = kOffset + kRow + kx;
                                this.convK[idx] -= lr * grad * input[inOffset + (x + kx)];
                            }
                        }
                    }
                }
                this.convB[f] -= lr * gradBias;
            }

            return { loss, probs, cache };
        }
    }

    function drawThickLine(arr, x0, y0, x1, y1, thickness, intensity = 1) {
        const dx = x1 - x0;
        const dy = y1 - y0;
        const steps = Math.max(Math.abs(dx), Math.abs(dy), 1);
        for (let s = 0; s <= steps; s++) {
            const tVal = s / steps;
            const x = Math.round(x0 + dx * tVal);
            const y = Math.round(y0 + dy * tVal);
            for (let oy = -thickness; oy <= thickness; oy++) {
                for (let ox = -thickness; ox <= thickness; ox++) {
                    const xx = x + ox;
                    const yy = y + oy;
                    if (xx < 0 || yy < 0 || xx >= INPUT || yy >= INPUT) continue;
                    const dist = Math.sqrt(ox * ox + oy * oy);
                    if (dist <= thickness + 0.4) {
                        const idx = yy * INPUT + xx;
                        const val = intensity * Math.max(0.2, 1 - dist / (thickness + 0.6));
                        if (val > arr[idx]) arr[idx] = val;
                    }
                }
            }
        }
    }

    function addBlur(arr) {
        const out = new Float32Array(arr.length);
        const kernel = [
            [1, 2, 1],
            [2, 4, 2],
            [1, 2, 1]
        ];
        for (let y = 0; y < INPUT; y++) {
            for (let x = 0; x < INPUT; x++) {
                let sum = 0;
                let wsum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const yy = y + ky;
                        const xx = x + kx;
                        if (yy < 0 || yy >= INPUT || xx < 0 || xx >= INPUT) continue;
                        const w = kernel[ky + 1][kx + 1];
                        sum += arr[yy * INPUT + xx] * w;
                        wsum += w;
                    }
                }
                out[y * INPUT + x] = sum / wsum;
            }
        }
        return out;
    }

    function sampleGrid(arr, x, y) {
        const xx = Math.max(0, Math.min(INPUT - 1, x));
        const yy = Math.max(0, Math.min(INPUT - 1, y));
        const x0 = Math.floor(xx);
        const y0 = Math.floor(yy);
        const x1 = Math.min(INPUT - 1, x0 + 1);
        const y1 = Math.min(INPUT - 1, y0 + 1);
        const tx = xx - x0;
        const ty = yy - y0;

        const v00 = arr[y0 * INPUT + x0];
        const v10 = arr[y0 * INPUT + x1];
        const v01 = arr[y1 * INPUT + x0];
        const v11 = arr[y1 * INPUT + x1];

        const top = v00 * (1 - tx) + v10 * tx;
        const bottom = v01 * (1 - tx) + v11 * tx;
        return top * (1 - ty) + bottom * ty;
    }

    function transformGrid(arr, tx, ty, scale, gamma) {
        const out = new Float32Array(INPUT * INPUT);
        const c = (INPUT - 1) * 0.5;
        for (let y = 0; y < INPUT; y++) {
            for (let x = 0; x < INPUT; x++) {
                const sx = (x - c) / scale + c - tx;
                const sy = (y - c) / scale + c - ty;
                const v = sampleGrid(arr, sx, sy);
                out[y * INPUT + x] = Math.pow(clamp01(v), gamma);
            }
        }
        return out;
    }

    const DIGIT_STROKES = {
        0: [
            [[0.28, 0.12], [0.18, 0.3], [0.18, 0.7], [0.3, 0.88], [0.7, 0.88], [0.82, 0.7], [0.82, 0.3], [0.7, 0.12], [0.28, 0.12]]
        ],
        1: [
            [[0.52, 0.12], [0.52, 0.9]],
            [[0.42, 0.24], [0.52, 0.12], [0.62, 0.2]]
        ],
        2: [
            [[0.2, 0.28], [0.35, 0.12], [0.72, 0.14], [0.82, 0.3], [0.68, 0.5], [0.4, 0.68], [0.2, 0.88], [0.82, 0.88]]
        ],
        3: [
            [[0.22, 0.18], [0.7, 0.14], [0.82, 0.3], [0.58, 0.5], [0.82, 0.7], [0.7, 0.88], [0.22, 0.82]]
        ],
        4: [
            [[0.7, 0.1], [0.7, 0.9]],
            [[0.22, 0.56], [0.82, 0.56]],
            [[0.22, 0.56], [0.55, 0.1]]
        ],
        5: [
            [[0.78, 0.14], [0.3, 0.14], [0.24, 0.48], [0.68, 0.48], [0.82, 0.62], [0.72, 0.88], [0.24, 0.84]]
        ],
        6: [
            [[0.72, 0.14], [0.35, 0.26], [0.22, 0.54], [0.32, 0.84], [0.68, 0.86], [0.82, 0.66], [0.66, 0.48], [0.24, 0.5]]
        ],
        7: [
            [[0.2, 0.14], [0.82, 0.14], [0.45, 0.88]]
        ],
        8: [
            [[0.3, 0.5], [0.2, 0.3], [0.3, 0.14], [0.7, 0.14], [0.82, 0.32], [0.7, 0.5], [0.3, 0.5]],
            [[0.3, 0.5], [0.2, 0.7], [0.32, 0.88], [0.68, 0.88], [0.82, 0.7], [0.7, 0.5]]
        ],
        9: [
            [[0.78, 0.5], [0.66, 0.2], [0.3, 0.14], [0.2, 0.34], [0.34, 0.52], [0.76, 0.5], [0.64, 0.88]]
        ]
    };

    function drawStrokePath(arr, points, thickness, rng, params) {
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = transformPoint(points[i], rng, params);
            const p1 = transformPoint(points[i + 1], rng, params);
            drawThickLine(arr, p0[0], p0[1], p1[0], p1[1], thickness, 0.86 + rng() * 0.2);
        }
    }

    function transformPoint(p, rng, params) {
        const x = p[0] - 0.5;
        const y = p[1] - 0.5;
        const sx = x * params.scaleX;
        const sy = y * params.scaleY;
        const slantedX = sx + sy * params.shear;
        const angle = params.rotation;
        const rx = slantedX * Math.cos(angle) - sy * Math.sin(angle);
        const ry = slantedX * Math.sin(angle) + sy * Math.cos(angle);
        const jx = (rng() - 0.5) * params.jitter;
        const jy = (rng() - 0.5) * params.jitter;
        return [
            Math.round((rx + 0.5 + params.tx + jx) * (INPUT - 1)),
            Math.round((ry + 0.5 + params.ty + jy) * (INPUT - 1))
        ];
    }

    function generateSyntheticDigit(label, rng) {
        const arr = new Float32Array(INPUT * INPUT);
        const thickness = 1 + Math.floor(rng() * 2);
        const params = {
            scaleX: 0.85 + rng() * 0.25,
            scaleY: 0.82 + rng() * 0.28,
            shear: (rng() - 0.5) * 0.35,
            rotation: (rng() - 0.5) * 0.45,
            tx: (rng() - 0.5) * 0.14,
            ty: (rng() - 0.5) * 0.14,
            jitter: 0.06
        };

        const strokes = DIGIT_STROKES[label];
        for (let i = 0; i < strokes.length; i++) {
            drawStrokePath(arr, strokes[i], thickness, rng, params);
        }

        if (label === 0 || label === 6 || label === 8 || label === 9) {
            const x0 = 6 + Math.floor(rng() * 4);
            drawThickLine(arr, x0, 5, x0 + 2, 15, 1, 0.25 + rng() * 0.3);
        }

        let out = addBlur(arr);
        for (let i = 0; i < out.length; i++) {
            out[i] = clamp01(out[i] + (rng() - 0.5) * 0.09);
        }

        if (rng() < 0.65) {
            const tx = (rng() - 0.5) * 2.2;
            const ty = (rng() - 0.5) * 2.2;
            const scale = 0.88 + rng() * 0.28;
            const gamma = 0.8 + rng() * 0.55;
            out = transformGrid(out, tx, ty, scale, gamma);
        }

        const max = Math.max(...out);
        if (max > 0) {
            for (let i = 0; i < out.length; i++) out[i] = clamp01(out[i] / max);
        }
        return out;
    }

    function sampleRaw(raw, w, h, x, y) {
        const xx = Math.max(0, Math.min(w - 1, Math.round(x)));
        const yy = Math.max(0, Math.min(h - 1, Math.round(y)));
        return raw[(yy * w + xx) * 4] / 255;
    }

    function preprocessCanvasToInput() {
        const w = drawCanvas.width;
        const h = drawCanvas.height;
        const raw = drawCtx.getImageData(0, 0, w, h).data;

        let minX = w;
        let minY = h;
        let maxX = 0;
        let maxY = 0;
        let active = 0;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const v = raw[(y * w + x) * 4] / 255;
                if (v > 0.08) {
                    active++;
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                }
            }
        }

        if (active < 40) return null;

        const bw = Math.max(1, maxX - minX + 1);
        const bh = Math.max(1, maxY - minY + 1);
        const side = Math.max(bw, bh) * 1.18;
        const cx = (minX + maxX) * 0.5;
        const cy = (minY + maxY) * 0.5;
        const left = cx - side * 0.5;
        const top = cy - side * 0.5;

        const out = new Float32Array(INPUT * INPUT);
        const targetSize = 16;
        const pad = 2;

        for (let ty = 0; ty < targetSize; ty++) {
            for (let tx = 0; tx < targetSize; tx++) {
                const rx = left + ((tx + 0.5) / targetSize) * side;
                const ry = top + ((ty + 0.5) / targetSize) * side;
                out[(ty + pad) * INPUT + (tx + pad)] = sampleRaw(raw, w, h, rx, ry);
            }
        }

        const blurred = addBlur(out);
        const max = Math.max(...blurred);
        if (max > 0) {
            for (let i = 0; i < blurred.length; i++) blurred[i] = clamp01(blurred[i] / max);
        }
        return blurred;
    }

    function renderInputPreview(input) {
        const cell = inputPreview.width / INPUT;
        inputPreviewCtx.fillStyle = "#000";
        inputPreviewCtx.fillRect(0, 0, inputPreview.width, inputPreview.height);
        for (let y = 0; y < INPUT; y++) {
            for (let x = 0; x < INPUT; x++) {
                const c = Math.floor(input[y * INPUT + x] * 255);
                inputPreviewCtx.fillStyle = `rgb(${c}, ${c}, ${c})`;
                inputPreviewCtx.fillRect(x * cell, y * cell, cell, cell);
            }
        }
    }

    function initProbBars() {
        probBarsEl.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            const row = document.createElement("div");
            row.className = "cnn-prob-row";
            row.innerHTML = `
        <span>${i}</span>
        <div class="cnn-bar-track"><div class="cnn-bar-fill" id="cnnProbFill${i}"></div></div>
        <span id="cnnProbText${i}">0.0%</span>
      `;
            probBarsEl.appendChild(row);
        }
    }

    function renderProbs(probs) {
        let best = 0;
        for (let i = 1; i < probs.length; i++) if (probs[i] > probs[best]) best = i;
        predictedDigitEl.textContent = `${best}`;

        for (let i = 0; i < 10; i++) {
            const p = probs[i] * 100;
            const fill = document.getElementById(`cnnProbFill${i}`);
            const text = document.getElementById(`cnnProbText${i}`);
            fill.style.width = `${p.toFixed(1)}%`;
            text.textContent = `${p.toFixed(1)}%`;
        }
    }

    function initFiltersView() {
        filtersGrid.innerHTML = "";
        for (let f = 0; f < FILTERS; f++) {
            const box = document.createElement("div");
            box.className = "cnn-filter-box";
            box.innerHTML = `<canvas width="64" height="64" id="cnnFilterCanvas${f}"></canvas><div class="cnn-filter-name">F${f + 1}</div>`;
            filtersGrid.appendChild(box);
        }
    }

    function renderFilters() {
        for (let f = 0; f < FILTERS; f++) {
            const canvas = document.getElementById(`cnnFilterCanvas${f}`);
            const ctx = canvas.getContext("2d");
            const cell = canvas.width / K;
            const kOffset = f * K * K;
            let maxAbs = 0.001;

            for (let i = 0; i < K * K; i++) {
                maxAbs = Math.max(maxAbs, Math.abs(model.convK[kOffset + i]));
            }

            for (let ky = 0; ky < K; ky++) {
                for (let kx = 0; kx < K; kx++) {
                    const w = model.convK[kOffset + ky * K + kx] / maxAbs;
                    const pos = Math.max(0, w);
                    const neg = Math.max(0, -w);
                    const r = Math.floor(neg * 230);
                    const g = Math.floor(pos * 220);
                    const b = 70;
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(kx * cell, ky * cell, cell, cell);
                }
            }
        }
    }

    function addLog(message) {
        const line = document.createElement("div");
        line.className = "log-line";
        line.textContent = message;
        logEl.appendChild(line);
        logEl.scrollTop = logEl.scrollHeight;
    }

    function setModelStatus(value) {
        modelStatus.textContent = value;
    }

    function updateTrainingStateUI() {
        if (trainingStateBtn) {
            trainingStateBtn.textContent = isModelTrained ? t.stateTrained : t.stateNotTrained;
            trainingStateBtn.classList.toggle("is-trained", isModelTrained);
            trainingStateBtn.classList.toggle("is-untrained", !isModelTrained);
        }
    }

    function showPredictionModal(isTrained) {
        if (modalUntrainedWarning) modalUntrainedWarning.hidden = isTrained;
        if (predictModal) predictModal.hidden = false;
    }

    function closePredictionModal() {
        if (predictModal) predictModal.hidden = true;
    }

    function setTrainButtonsState(training) {
        isTraining = training;
        trainBtn.disabled = training;
        resetBtn.disabled = training;
        stopBtn.disabled = !training;
    }

    function fillTemplate(template, values) {
        let out = template;
        for (const key in values) {
            out = out.replaceAll(`{${key}}`, values[key]);
        }
        return out;
    }

    function setHoverInfo(text) {
        if (!hoverInfoEl) return;
        hoverInfoEl.textContent = text;
    }

    function explainLayer(layer) {
        if (layer === "input") return t.explainInput;
        if (layer === "conv") return t.explainConv;
        if (layer === "dense") return t.explainDense;
        return t.explainOut;
    }

    function makeNode(x, y, r, label, layer, index) {
        const group = document.createElementNS(SVG_NS, "g");
        const circle = document.createElementNS(SVG_NS, "circle");
        const txt = document.createElementNS(SVG_NS, "text");
        const value = document.createElementNS(SVG_NS, "text");

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", r);
        circle.setAttribute("class", "cnn-net-node");

        txt.setAttribute("x", x);
        txt.setAttribute("y", y - r - 4);
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("class", "cnn-net-layer");
        txt.textContent = label;

        value.setAttribute("x", x);
        value.setAttribute("y", y + 3);
        value.setAttribute("text-anchor", "middle");
        value.setAttribute("class", "cnn-net-value");
        value.textContent = "0.00";

        group.appendChild(circle);
        group.appendChild(txt);
        group.appendChild(value);

        group.addEventListener("mouseenter", () => {
            const val = latestNetworkValues[layer][index] || 0;
            circle.setAttribute("stroke-width", "2");
            setHoverInfo(
                fillTemplate(t.hoverNode, {
                    id: label,
                    value: val.toFixed(2),
                    explain: explainLayer(layer)
                })
            );
        });
        group.addEventListener("mouseleave", () => {
            circle.setAttribute("stroke-width", "1");
            setHoverInfo(t.hoverDefault);
        });

        networkSvg.appendChild(group);
        return { circle, value, label, layer, index };
    }

    function makeLayerTitle(x, y, text) {
        const el = document.createElementNS(SVG_NS, "text");
        el.setAttribute("x", x);
        el.setAttribute("y", y);
        el.setAttribute("class", "cnn-net-layer");
        el.setAttribute("text-anchor", "middle");
        el.textContent = text;
        networkSvg.appendChild(el);
        networkViz.labels.push(el);
    }

    function makeEdge(x1, y1, x2, y2, fromLayer, fromIndex, toLayer, toIndex) {
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("class", "cnn-net-edge");

        line.addEventListener("mouseenter", () => {
            line.setAttribute("stroke-width", "2.2");
            const fromLabel = networkViz.nodes[fromLayer][fromIndex]?.label || "?";
            const toLabel = networkViz.nodes[toLayer][toIndex]?.label || "?";
            const signal = (latestNetworkValues[fromLayer][fromIndex] || 0) * (latestNetworkValues[toLayer][toIndex] || 0);
            setHoverInfo(fillTemplate(t.hoverEdge, { from: fromLabel, to: toLabel, value: signal.toFixed(2) }));
        });
        line.addEventListener("mouseleave", () => {
            line.setAttribute("stroke-width", "1");
            setHoverInfo(t.hoverDefault);
        });

        networkSvg.appendChild(line);
        networkViz.edges.push({ line, fromLayer, fromIndex, toLayer, toIndex });
    }

    function layerPositions(x, n, y0, y1) {
        const out = [];
        for (let i = 0; i < n; i++) {
            const tVal = n === 1 ? 0.5 : i / (n - 1);
            out.push([x, y0 + (y1 - y0) * tVal]);
        }
        return out;
    }

    function initNetworkViz() {
        if (!networkSvg) return;
        networkSvg.innerHTML = "";
        networkViz.nodes.input = [];
        networkViz.nodes.conv = [];
        networkViz.nodes.dense = [];
        networkViz.nodes.out = [];
        networkViz.edges = [];
        networkViz.labels = [];

        const inputPos = layerPositions(60, 4, 60, 200);
        const convPos = layerPositions(180, 6, 40, 210);
        const densePos = layerPositions(320, 8, 30, 220);
        const outPos = layerPositions(460, 10, 22, 228);

        for (let i = 0; i < inputPos.length; i++) networkViz.nodes.input.push(makeNode(inputPos[i][0], inputPos[i][1], 13, `I${i + 1}`, "input", i));
        for (let i = 0; i < convPos.length; i++) networkViz.nodes.conv.push(makeNode(convPos[i][0], convPos[i][1], 12, `C${i + 1}`, "conv", i));
        for (let i = 0; i < densePos.length; i++) networkViz.nodes.dense.push(makeNode(densePos[i][0], densePos[i][1], 11, `H${i + 1}`, "dense", i));
        for (let i = 0; i < outPos.length; i++) networkViz.nodes.out.push(makeNode(outPos[i][0], outPos[i][1], 9.5, `${i}`, "out", i));

        for (let i = 0; i < inputPos.length; i++) {
            for (let j = 0; j < convPos.length; j++) makeEdge(inputPos[i][0], inputPos[i][1], convPos[j][0], convPos[j][1], "input", i, "conv", j);
        }
        for (let i = 0; i < convPos.length; i++) {
            for (let j = 0; j < densePos.length; j++) makeEdge(convPos[i][0], convPos[i][1], densePos[j][0], densePos[j][1], "conv", i, "dense", j);
        }
        for (let i = 0; i < densePos.length; i++) {
            for (let j = 0; j < outPos.length; j++) makeEdge(densePos[i][0], densePos[i][1], outPos[j][0], outPos[j][1], "dense", i, "out", j);
        }

        makeLayerTitle(60, 14, t.layerInput);
        makeLayerTitle(180, 14, t.layerConv);
        makeLayerTitle(320, 14, t.layerDense);
        makeLayerTitle(460, 14, t.layerOut);

        setHoverInfo(t.hoverDefault);
    }

    function nodeColor(v) {
        const p = clamp01(v);
        const r = Math.floor(45 + 60 * p);
        const g = Math.floor(70 + 160 * p);
        const b = Math.floor(120 + 90 * p);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function updateNode(node, value) {
        node.circle.setAttribute("fill", nodeColor(value));
        node.value.textContent = value.toFixed(2);
    }

    function updateEdges() {
        for (let i = 0; i < networkViz.edges.length; i++) {
            const edge = networkViz.edges[i];
            const fromV = latestNetworkValues[edge.fromLayer][edge.fromIndex] || 0;
            const toV = latestNetworkValues[edge.toLayer][edge.toIndex] || 0;
            const signal = Math.min(1, Math.max(0, fromV * toV));
            const alpha = 0.15 + 0.55 * signal;
            const width = 0.8 + 1.8 * signal;
            edge.line.setAttribute("stroke", `rgba(115, 170, 220, ${alpha.toFixed(3)})`);
            edge.line.setAttribute("stroke-width", width.toFixed(2));
        }
    }

    function summarizeInput(input) {
        const q = [0, 0, 0, 0];
        const counts = [0, 0, 0, 0];
        for (let y = 0; y < INPUT; y++) {
            for (let x = 0; x < INPUT; x++) {
                const idx = y * INPUT + x;
                const qi = (y >= INPUT / 2 ? 2 : 0) + (x >= INPUT / 2 ? 1 : 0);
                q[qi] += input[idx];
                counts[qi]++;
            }
        }
        for (let i = 0; i < 4; i++) q[i] /= counts[i];
        return q;
    }

    function summarizeConv(cache) {
        const out = new Array(6).fill(0);
        const mapSize = CONV * CONV;
        for (let f = 0; f < 6; f++) {
            const offset = f * mapSize;
            let sum = 0;
            for (let i = 0; i < mapSize; i++) sum += cache.relu[offset + i];
            out[f] = Math.min(1, sum / (mapSize * 1.8));
        }
        return out;
    }

    function summarizeDense(cache) {
        const out = new Array(8).fill(0);
        for (let i = 0; i < 8; i++) {
            out[i] = Math.min(1, cache.hidden[i] / 2.5);
        }
        return out;
    }

    function updateNetworkViz(input, cache) {
        if (!networkSvg) return;
        const inputVals = summarizeInput(input);
        const convVals = summarizeConv(cache);
        const denseVals = summarizeDense(cache);

        latestNetworkValues = {
            input: inputVals,
            conv: convVals,
            dense: denseVals,
            out: Array.from(cache.probs)
        };

        for (let i = 0; i < networkViz.nodes.input.length; i++) updateNode(networkViz.nodes.input[i], inputVals[i]);
        for (let i = 0; i < networkViz.nodes.conv.length; i++) updateNode(networkViz.nodes.conv[i], convVals[i]);
        for (let i = 0; i < networkViz.nodes.dense.length; i++) updateNode(networkViz.nodes.dense[i], denseVals[i]);
        for (let i = 0; i < networkViz.nodes.out.length; i++) updateNode(networkViz.nodes.out[i], cache.probs[i]);
        updateEdges();
    }

    function evaluateOnSynthetic(samples = 160, seed = 999) {
        const rng = createRng(seed);
        let correct = 0;
        let lossSum = 0;
        for (let i = 0; i < samples; i++) {
            const label = Math.floor(rng() * 10);
            const sample = generateSyntheticDigit(label, rng);
            const probs = model.forward(sample).probs;
            let best = 0;
            for (let k = 1; k < 10; k++) if (probs[k] > probs[best]) best = k;
            if (best === label) correct++;
            lossSum += -Math.log(Math.max(probs[label], 1e-8));
        }
        return {
            acc: correct / samples,
            loss: lossSum / samples
        };
    }

    async function trainFromScratch() {
        if (isTraining) return;
        stopRequested = false;
        isModelTrained = false;
        updateTrainingStateUI();

        const epochs = Math.max(1, Math.min(80, Number(epochsInput.value) || 16));
        const samplesPerEpoch = Math.max(200, Math.min(8000, Number(samplesInput.value) || 1800));
        const lr = Math.max(0.001, Math.min(0.2, Number(lrInput.value) || 0.02));

        model.reset(Math.floor(Math.random() * 100000));
        renderFilters();
        setModelStatus(t.modelUntrained);
        addLog(t.trainingStart);

        setTrainButtonsState(true);
        const rng = createRng(2026032301);

        for (let e = 1; e <= epochs; e++) {
            if (stopRequested) break;
            let runningLoss = 0;
            let runningCorrect = 0;

            for (let i = 0; i < samplesPerEpoch; i++) {
                if (stopRequested) break;
                const label = Math.floor(rng() * 10);
                const sample = generateSyntheticDigit(label, rng);
                const res = model.trainOnSample(sample, label, lr);

                runningLoss += res.loss;
                let pred = 0;
                for (let k = 1; k < 10; k++) if (res.probs[k] > res.probs[pred]) pred = k;
                if (pred === label) runningCorrect++;

                if ((i + 1) % 100 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }

            renderFilters();
            const trainLoss = runningLoss / samplesPerEpoch;
            const trainAcc = runningCorrect / samplesPerEpoch;
            const evalStats = evaluateOnSynthetic(180, 8000 + e);
            addLog(`${t.trainingEpoch} ${e}/${epochs} · train loss=${trainLoss.toFixed(3)} · train acc=${(trainAcc * 100).toFixed(1)}% · val acc=${(evalStats.acc * 100).toFixed(1)}%`);
        }

        if (stopRequested) {
            addLog(t.trainingStopped);
        } else {
            addLog(t.trainingDone);
            setModelStatus(t.modelScratch);
            isModelTrained = true;
            updateTrainingStateUI();
        }

        setTrainButtonsState(false);
        scheduleLiveRefresh();
    }

    function clearCanvas() {
        drawCtx.fillStyle = "black";
        drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    }

    function drawStroke(x, y) {
        drawCtx.fillStyle = "white";
        drawCtx.beginPath();
        drawCtx.arc(x, y, 11, 0, Math.PI * 2);
        drawCtx.fill();
    }

    function randomProbabilities() {
        const values = new Float32Array(CLASSES);
        let sum = 0;
        for (let i = 0; i < CLASSES; i++) {
            const v = 0.05 + Math.random();
            values[i] = v;
            sum += v;
        }
        for (let i = 0; i < CLASSES; i++) values[i] /= sum;
        return values;
    }

    function runPrediction(logPrediction) {
        const input = preprocessCanvasToInput();
        if (!input) {
            if (logPrediction) addLog(t.emptyCanvas);
            return;
        }

        renderInputPreview(input);
        const baseCache = model.forward(input);

        if (!isModelTrained) {
            const randomProbs = randomProbabilities();
            renderProbs(randomProbs);
            updateNetworkViz(input, baseCache);

            if (logPrediction) {
                let bestRandom = 0;
                for (let i = 1; i < randomProbs.length; i++) if (randomProbs[i] > randomProbs[bestRandom]) bestRandom = i;
                addLog(`${t.prediction} ${t.randomPredictionTag}: ${bestRandom}`);
                addLog(t.randomPredictionWarning);
                showPredictionModal(false);
            }
            return;
        }

        const ttaTransforms = [
            [0, 0, 1.0, 1.0],
            [0.8, 0, 1.0, 1.0],
            [-0.8, 0, 1.0, 1.0],
            [0, 0.8, 1.0, 1.0],
            [0, -0.8, 1.0, 1.0],
            [0, 0, 0.93, 1.0],
            [0, 0, 1.08, 1.0],
            [0.5, -0.4, 0.97, 0.95]
        ];

        const avg = new Float32Array(CLASSES);
        let cache = null;
        for (let i = 0; i < ttaTransforms.length; i++) {
            const [tx, ty, scale, gamma] = ttaTransforms[i];
            const variant = i === 0 ? input : transformGrid(input, tx, ty, scale, gamma);
            const forward = i === 0 ? baseCache : model.forward(variant);
            if (i === 0) cache = baseCache;
            for (let c = 0; c < CLASSES; c++) avg[c] += forward.probs[c];
        }

        for (let c = 0; c < CLASSES; c++) avg[c] /= ttaTransforms.length;

        renderProbs(avg);
        updateNetworkViz(input, cache);

        if (logPrediction) {
            let best = 0;
            for (let i = 1; i < avg.length; i++) if (avg[i] > avg[best]) best = i;
            addLog(`${t.prediction}: ${best}`);
            showPredictionModal(true);
        }
    }

    function scheduleLiveRefresh() {
        if (liveUpdateFrame !== null) cancelAnimationFrame(liveUpdateFrame);
        liveUpdateFrame = requestAnimationFrame(() => {
            liveUpdateFrame = null;
            runPrediction(false);
        });
    }

    function setupDrawing() {
        clearCanvas();
        let drawing = false;

        function getPoint(e) {
            const rect = drawCanvas.getBoundingClientRect();
            const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
            return {
                x: ((clientX - rect.left) / rect.width) * drawCanvas.width,
                y: ((clientY - rect.top) / rect.height) * drawCanvas.height
            };
        }

        function start(e) {
            e.preventDefault();
            drawing = true;
            const p = getPoint(e);
            drawStroke(p.x, p.y);
            scheduleLiveRefresh();
        }

        function move(e) {
            if (!drawing) return;
            e.preventDefault();
            const p = getPoint(e);
            drawStroke(p.x, p.y);
            scheduleLiveRefresh();
        }

        function end() {
            drawing = false;
        }

        drawCanvas.addEventListener("mousedown", start);
        drawCanvas.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);

        drawCanvas.addEventListener("touchstart", start, { passive: false });
        drawCanvas.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", end);
    }

    function installHandlers() {
        clearBtn.addEventListener("click", () => {
            clearCanvas();
            predictedDigitEl.textContent = "-";
            renderProbs(new Float32Array(10).fill(0.1));
        });

        predictBtn.addEventListener("click", () => runPrediction(true));

        if (modalCloseBtn) modalCloseBtn.addEventListener("click", closePredictionModal);
        if (predictModal) predictModal.addEventListener("click", (e) => {
            if (e.target === predictModal) closePredictionModal();
        });

        trainBtn.addEventListener("click", () => {
            trainFromScratch();
        });

        stopBtn.addEventListener("click", () => {
            stopRequested = true;
        });

        resetBtn.addEventListener("click", () => {
            if (isTraining) return;
            model.reset(Math.floor(Math.random() * 100000));
            renderFilters();
            isModelTrained = false;
            setModelStatus(t.modelUntrained);
            updateTrainingStateUI();
            addLog(t.resetDone);
            predictedDigitEl.textContent = "-";
            renderProbs(new Float32Array(10).fill(0.1));
            scheduleLiveRefresh();
        });
    }

    const model = new TinyCNN(2026);

    initProbBars();
    initFiltersView();
    initNetworkViz();
    setupDrawing();
    installHandlers();
    renderFilters();
    renderProbs(new Float32Array(10).fill(0.1));
    predictedDigitEl.textContent = "-";
    setModelStatus(t.modelUntrained);
    updateTrainingStateUI();
    addLog(t.predictHint);
})();
