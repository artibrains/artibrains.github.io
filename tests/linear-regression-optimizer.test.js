const test = require('node:test');
const assert = require('node:assert/strict');
const optimizer = require('../static/js/linear-regression-game/linear-regression-optimizer.js');

const bounds = {
    slopeMin: 0,
    slopeMax: 5,
    interceptMin: 0,
    interceptMax: 100
};

test('L2 finds the exact least-squares line', () => {
    const data = [
        { x: 1, y: 5 },
        { x: 2, y: 7 },
        { x: 3, y: 9 },
        { x: 4, y: 11 }
    ];

    const result = optimizer.optimize(data, bounds, 'L2');
    assert.ok(Math.abs(result.slope - 2) < 1e-10);
    assert.ok(Math.abs(result.intercept - 3) < 1e-10);
    assert.ok(result.error < 1e-20);
});

test('L1 optimum cannot be beaten by slider-grid solutions', () => {
    const data = [
        { x: 5.4, y: 24 }, { x: 8.2, y: 29 }, { x: 12.7, y: 36 },
        { x: 17.1, y: 44 }, { x: 23.5, y: 58 }, { x: 31.2, y: 72 },
        { x: 38.9, y: 91 }, { x: 44.6, y: 98 }, { x: 49.1, y: 111 }
    ];
    const result = optimizer.optimize(data, bounds, 'L1');

    for (let slope = bounds.slopeMin; slope <= bounds.slopeMax + 1e-9; slope += 0.1) {
        for (let intercept = bounds.interceptMin; intercept <= bounds.interceptMax; intercept += 1) {
            const gridError = optimizer.calculateError(data, slope, intercept, 'L1');
            assert.ok(result.error <= gridError + 1e-9);
        }
    }
});

test('both optimizers honor the same bounds as the player', () => {
    const data = [{ x: 1, y: 100 }, { x: 2, y: 200 }, { x: 3, y: 300 }];

    for (const errorType of ['L1', 'L2']) {
        const result = optimizer.optimize(data, bounds, errorType);
        assert.ok(result.slope >= bounds.slopeMin && result.slope <= bounds.slopeMax);
        assert.ok(result.intercept >= bounds.interceptMin && result.intercept <= bounds.interceptMax);
    }
});

test('neither optimum can be beaten across random games on the player grid', () => {
    let seed = 123456789;
    const random = () => {
        seed = (1664525 * seed + 1013904223) >>> 0;
        return seed / 0x100000000;
    };

    for (let game = 0; game < 20; game++) {
        const data = Array.from({ length: 15 }, () => ({
            x: 5 + random() * 45,
            y: Math.round(10 + random() * 120)
        }));

        for (const errorType of ['L1', 'L2']) {
            const result = optimizer.optimize(data, bounds, errorType);
            for (let slope = bounds.slopeMin; slope <= bounds.slopeMax + 1e-9; slope += 0.1) {
                for (let intercept = bounds.interceptMin; intercept <= bounds.interceptMax; intercept += 1) {
                    const gridError = optimizer.calculateError(data, slope, intercept, errorType);
                    assert.ok(result.error <= gridError + 1e-8);
                }
            }
        }
    }
});
