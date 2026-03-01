// Random Forest Visualization v2 – canvas-based graphical output

// ── Colours ──────────────────────────────────────────────────────────────────
const RF_COLORS = ['#e85d04', '#0077b6', '#2d6a4f'];
const RF_COLORS_BG = ['rgba(232,93,4,0.20)', 'rgba(0,119,182,0.20)', 'rgba(45,106,79,0.20)'];

// ── i18n ─────────────────────────────────────────────────────────────────────
const rfI18n = {
    es: {
        init: 'RF: Aplicación inicializada.',
        generated: 'RF: Datos generados – {n} muestras.',
        training: 'RF: Entrenando {t} árboles...',
        done: 'RF: Entrenamiento completado. Precisión: {a}%',
        predicted: 'RF: Predicción → {cls} (confianza: {c}%)',
        c0: 'Facturación', c1: 'Soporte técnico', c2: 'Cuentas',
        accuracy: 'Precisión', trees: 'Árboles', depth: 'Profundidad',
        treeLabel: 'Árbol', votes: 'votos'
    },
    en: {
        init: 'RF: Application initialized.',
        generated: 'RF: Data generated – {n} samples.',
        training: 'RF: Training {t} trees...',
        done: 'RF: Training complete. Accuracy: {a}%',
        predicted: 'RF: Prediction → {cls} (confidence: {c}%)',
        c0: 'Billing', c1: 'Tech support', c2: 'Accounts',
        accuracy: 'Accuracy', trees: 'Trees', depth: 'Depth',
        treeLabel: 'Tree', votes: 'votes'
    }
};

function rfT(key, vars = {}) {
    const lang = window.randomForestLanguage || 'en';
    const dict = rfI18n[lang] || rfI18n.en;
    let s = dict[key] || key;
    Object.keys(vars).forEach(k => { s = s.replace(`{${k}}`, vars[k]); });
    return s;
}

function toTerminal(msg) {
    if (window.CustomTerminal && typeof window.CustomTerminal.write === 'function') {
        window.CustomTerminal.write(msg + '\n');
    }
}

// ── Gaussian helper ───────────────────────────────────────────────────────────
function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// ── Data generator (2-D so we can plot it) ───────────────────────────────────
function generateData(n = 30) {
    const clusters = [
        { cx: 0.25, cy: 0.75, s: 0.10 },
        { cx: 0.75, cy: 0.75, s: 0.10 },
        { cx: 0.50, cy: 0.25, s: 0.10 }
    ];
    const X = [], y = [];
    clusters.forEach((c, cls) => {
        for (let i = 0; i < n; i++) {
            const x = Math.max(0.02, Math.min(0.98, c.cx + randn() * c.s));
            const z = Math.max(0.02, Math.min(0.98, c.cy + randn() * c.s));
            X.push([x, z]);
            y.push(cls);
        }
    });
    return { X, y };
}

// ── Decision Tree ─────────────────────────────────────────────────────────────
class DecisionTree {
    constructor(maxDepth = 4, minSamples = 3, featRatio = 0.7) {
        this.maxDepth = maxDepth;
        this.minSamples = minSamples;
        this.featRatio = featRatio;
        this.root = null;
    }

    fit(X, y) {
        const nFeat = X[0].length;
        this.root = this._build(X, y, [...Array(nFeat).keys()], 0);
    }

    _build(X, y, feats, depth) {
        if (depth >= this.maxDepth || X.length < this.minSamples || this._pure(y)) {
            return this._leaf(y);
        }

        const k = Math.max(1, Math.round(feats.length * this.featRatio));
        const sub = feats.slice().sort(() => Math.random() - 0.5).slice(0, k);
        const split = this._bestSplit(X, y, sub);
        if (!split) return this._leaf(y);

        const li = [], ri = [];
        X.forEach((s, i) => (s[split.f] <= split.t ? li : ri).push(i));
        if (!li.length || !ri.length) return this._leaf(y);

        return {
            leaf: false, f: split.f, t: split.t,
            left: this._build(li.map(i => X[i]), li.map(i => y[i]), feats, depth + 1),
            right: this._build(ri.map(i => X[i]), ri.map(i => y[i]), feats, depth + 1)
        };
    }

    _pure(y) { return new Set(y).size === 1; }

    _bestSplit(X, y, feats) {
        let best = null, bestG = Infinity;
        feats.forEach(f => {
            const vals = [...new Set(X.map(s => s[f]))].sort((a, b) => a - b);
            const thresholds = vals.slice(0, -1).map((v, i) => (v + vals[i + 1]) / 2).slice(0, 12);
            thresholds.forEach(t => {
                const lY = y.filter((_, i) => X[i][f] <= t);
                const rY = y.filter((_, i) => X[i][f] > t);
                if (!lY.length || !rY.length) return;
                const g = (lY.length * this._gini(lY) + rY.length * this._gini(rY)) / y.length;
                if (g < bestG) { bestG = g; best = { f, t }; }
            });
        });
        return best;
    }

    _gini(y) {
        const n = y.length, counts = {};
        y.forEach(c => { counts[c] = (counts[c] || 0) + 1; });
        return 1 - Object.values(counts).reduce((s, c) => s + (c / n) ** 2, 0);
    }

    _leaf(y) {
        const counts = {};
        y.forEach(c => { counts[c] = (counts[c] || 0) + 1; });
        const pred = +Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        return { leaf: true, pred, counts };
    }

    predict(X) { return X.map(s => this.predictOne(s)); }

    predictOne(sample, node = this.root) {
        if (!node || node.leaf) return node ? node.pred : 0;
        return sample[node.f] <= node.t
            ? this.predictOne(sample, node.left)
            : this.predictOne(sample, node.right);
    }
}

// ── Random Forest ─────────────────────────────────────────────────────────────
class RandomForest {
    constructor(nTrees = 10, maxDepth = 4, featRatio = 0.7) {
        this.nTrees = nTrees;
        this.maxDepth = maxDepth;
        this.featRatio = featRatio;
        this.trees = [];
    }

    fit(X, y) {
        this.trees = [];
        for (let i = 0; i < this.nTrees; i++) {
            const { bX, bY } = this._bootstrap(X, y);
            const t = new DecisionTree(this.maxDepth, 3, this.featRatio);
            t.fit(bX, bY);
            this.trees.push(t);
        }
    }

    _bootstrap(X, y) {
        const n = X.length, bX = [], bY = [];
        for (let i = 0; i < n; i++) {
            const idx = (Math.random() * n) | 0;
            bX.push(X[idx]); bY.push(y[idx]);
        }
        return { bX, bY };
    }

    votes(sample) {
        const v = {};
        this.trees.forEach(t => {
            const p = t.predictOne(sample);
            v[p] = (v[p] || 0) + 1;
        });
        return v;
    }

    predictOne(sample) {
        const v = this.votes(sample);
        return +Object.entries(v).sort((a, b) => b[1] - a[1])[0][0];
    }

    predict(X) { return X.map(s => this.predictOne(s)); }
}

function rfAccuracy(yTrue, yPred) {
    return (yTrue.filter((y, i) => y === yPred[i]).length / yTrue.length * 100).toFixed(1);
}

// ── Canvas rendering ──────────────────────────────────────────────────────────
const RF_GRID = 50;

/**
 * Draw decision boundary (coloured background) + scatter plot on a canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {function} predictFn  (sample:[x,y]) => classIndex
 * @param {{ X: number[][], y: number[] }|null} data  data points to overlay
 * @param {number} dotR  dot radius for data points
 */
function drawCanvas(canvas, predictFn, data, dotR = 4) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Decision boundary background
    const step = 1 / RF_GRID;
    const pW = W / RF_GRID, pH = H / RF_GRID;
    for (let row = 0; row < RF_GRID; row++) {
        for (let col = 0; col < RF_GRID; col++) {
            const x = col * step + step / 2;
            const z = 1 - (row * step + step / 2); // y-axis flipped
            const pred = predictFn([x, z]);
            ctx.fillStyle = RF_COLORS_BG[pred] || 'rgba(128,128,128,0.12)';
            ctx.fillRect(col * pW, row * pH, pW + 1, pH + 1);
        }
    }

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(0,0,0,0.07)';
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 5; i++) {
        ctx.beginPath(); ctx.moveTo(W * i / 5, 0); ctx.lineTo(W * i / 5, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, H * i / 5); ctx.lineTo(W, H * i / 5); ctx.stroke();
    }

    // Data points
    if (data) {
        data.X.forEach((s, i) => {
            const px = s[0] * W, py = (1 - s[1]) * H;
            ctx.beginPath();
            ctx.arc(px, py, dotR, 0, 2 * Math.PI);
            ctx.fillStyle = RF_COLORS[data.y[i]];
            ctx.fill();
            if (dotR >= 4) {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    }
}

// ── DOM init ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    toTerminal(rfT('init'));

    const treesSlider = document.getElementById('rf-trees-slider');
    const treesVal = document.getElementById('rf-trees-value');
    const depthSlider = document.getElementById('rf-depth-slider');
    const depthVal = document.getElementById('rf-depth-value');
    const featSlider = document.getElementById('rf-features-slider');
    const featVal = document.getElementById('rf-features-value');
    const generateBtn = document.getElementById('rf-generate-btn');
    const mainCanvas = document.getElementById('rf-main-canvas');
    const treesGrid = document.getElementById('rf-trees-container');
    const metricsDiv = document.getElementById('rf-metrics');
    const votingDiv = document.getElementById('rf-voting-results');
    const legendDiv = document.getElementById('rf-canvas-legend');

    let data = null;
    let forest = null;

    // Slider labels
    treesSlider.addEventListener('input', e => { treesVal.textContent = e.target.value; });
    depthSlider.addEventListener('input', e => { depthVal.textContent = e.target.value; });
    featSlider.addEventListener('input', e => { featVal.textContent = e.target.value + '%'; });

    // Retrain when a slider is released
    [treesSlider, depthSlider, featSlider].forEach(s =>
        s.addEventListener('change', () => { if (data) train(); })
    );

    // Regenerate button
    generateBtn.addEventListener('click', () => {
        data = generateData(30);
        toTerminal(rfT('generated', { n: data.X.length }));
        votingDiv.classList.add('rf-hidden');
        train();
    });

    // Click on main canvas → show votes
    mainCanvas.addEventListener('click', e => {
        if (!forest) return;
        const rect = mainCanvas.getBoundingClientRect();
        const scaleX = mainCanvas.width / rect.width;
        const scaleY = mainCanvas.height / rect.height;
        const px = (e.clientX - rect.left) * scaleX;
        const py = (e.clientY - rect.top) * scaleY;
        const x = px / mainCanvas.width;
        const z = 1 - py / mainCanvas.height;

        const v = forest.votes([x, z]);
        const total = Object.values(v).reduce((a, b) => a + b, 0);
        const winner = +Object.entries(v).sort((a, b) => b[1] - a[1])[0][0];
        const conf = ((v[winner] / total) * 100).toFixed(0);

        toTerminal(rfT('predicted', { cls: rfT('c' + winner), c: conf }));

        // Redraw + highlight clicked point
        drawCanvas(mainCanvas, s => forest.predictOne(s), data, 4);
        const ctx = mainCanvas.getContext('2d');
        ctx.beginPath(); ctx.arc(px, py, 9, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white'; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(px, py, 9, 0, 2 * Math.PI);
        ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(px, py, 4.5, 0, 2 * Math.PI);
        ctx.fillStyle = RF_COLORS[winner]; ctx.fill();

        // Voting bars
        const names = [rfT('c0'), rfT('c1'), rfT('c2')];
        votingDiv.classList.remove('rf-hidden');
        votingDiv.innerHTML = Object.entries(v)
            .sort((a, b) => b[1] - a[1])
            .map(([cls, cnt]) => {
                const pct = (cnt / total * 100).toFixed(0);
                const name = names[+cls] || `Class ${cls}`;
                return `<div class="rf-vote-row">
                    <span class="rf-vote-label" style="color:${RF_COLORS[+cls]}">${name}</span>
                    <div class="rf-bar-bg"><div class="rf-bar-fill" style="width:${pct}%;background:${RF_COLORS[+cls]}"></div></div>
                    <span class="rf-vote-pct">${cnt}&nbsp;${rfT('votes')}&nbsp;(${pct}%)</span>
                </div>`;
            }).join('');
    });

    // Legend
    function renderLegend() {
        legendDiv.innerHTML = [rfT('c0'), rfT('c1'), rfT('c2')].map((n, i) =>
            `<span class="rf-legend-item">
                <span class="rf-legend-dot" style="background:${RF_COLORS[i]}"></span>${n}
             </span>`
        ).join('');
    }

    // Train
    function train() {
        if (!data) return;
        const nTrees = +treesSlider.value;
        const maxDepth = +depthSlider.value;
        const featRatio = +featSlider.value / 100;

        toTerminal(rfT('training', { t: nTrees }));
        forest = new RandomForest(nTrees, maxDepth, featRatio);
        forest.fit(data.X, data.y);

        const preds = forest.predict(data.X);
        const acc = rfAccuracy(data.y, preds);
        toTerminal(rfT('done', { a: acc }));

        // Main canvas: decision boundary + scatter
        drawCanvas(mainCanvas, s => forest.predictOne(s), data, 4);
        renderLegend();

        // Metrics
        metricsDiv.innerHTML = `
            <p><strong>${rfT('accuracy')}:</strong>&nbsp;${acc}%</p>
            <p><strong>${rfT('trees')}:</strong>&nbsp;${nTrees}&emsp;
               <strong>${rfT('depth')}:</strong>&nbsp;${maxDepth}</p>`;

        // Individual tree mini-canvases (max 9)
        treesGrid.innerHTML = '';
        const show = Math.min(nTrees, 9);
        for (let i = 0; i < show; i++) {
            const card = document.createElement('div');
            card.className = 'rf-tree-card';
            const lbl = document.createElement('p');
            lbl.className = 'rf-tree-label';
            lbl.textContent = `${rfT('treeLabel')} ${i + 1}`;
            const cv = document.createElement('canvas');
            cv.width = 110; cv.height = 110;
            card.appendChild(lbl);
            card.appendChild(cv);
            treesGrid.appendChild(card);
            const tree = forest.trees[i];
            drawCanvas(cv, s => tree.predictOne(s), data, 2);
        }
    }

    // Auto-init on load
    data = generateData(30);
    toTerminal(rfT('generated', { n: data.X.length }));
    train();
    renderLegend();
});
