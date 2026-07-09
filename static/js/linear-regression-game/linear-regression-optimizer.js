(function (root, factory) {
    const optimizer = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = optimizer;
    } else {
        root.LinearRegressionOptimizer = optimizer;
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    const EPSILON = 1e-9;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function calculateError(data, slope, intercept, errorType) {
        const total = data.reduce((sum, point) => {
            const residual = point.y - (slope * point.x + intercept);
            return sum + (errorType === 'L1' ? Math.abs(residual) : residual * residual);
        }, 0);

        return total / data.length;
    }

    function findBestCandidate(data, candidates, bounds, errorType) {
        let best = null;

        function consider(slope, intercept) {
            if (!Number.isFinite(slope) || !Number.isFinite(intercept)) {
                return;
            }
            if (slope < bounds.slopeMin - EPSILON || slope > bounds.slopeMax + EPSILON
                || intercept < bounds.interceptMin - EPSILON || intercept > bounds.interceptMax + EPSILON) {
                return;
            }

            const candidate = {
                slope: clamp(slope, bounds.slopeMin, bounds.slopeMax),
                intercept: clamp(intercept, bounds.interceptMin, bounds.interceptMax)
            };
            candidate.error = calculateError(data, candidate.slope, candidate.intercept, errorType);

            if (best === null || candidate.error < best.error - EPSILON) {
                best = candidate;
            }
        }

        candidates.forEach(candidate => consider(candidate.slope, candidate.intercept));
        return best;
    }

    // Least squares is quadratic and convex. Its constrained minimum is either
    // the unconstrained solution or the one-dimensional minimum on a box edge.
    function optimizeL2(data, bounds) {
        const count = data.length;
        const sums = data.reduce((result, point) => ({
            x: result.x + point.x,
            y: result.y + point.y,
            xx: result.xx + point.x * point.x,
            xy: result.xy + point.x * point.y
        }), { x: 0, y: 0, xx: 0, xy: 0 });
        const candidates = [];
        const determinant = count * sums.xx - sums.x * sums.x;

        if (Math.abs(determinant) > EPSILON) {
            candidates.push({
                slope: (count * sums.xy - sums.x * sums.y) / determinant,
                intercept: (sums.y * sums.xx - sums.x * sums.xy) / determinant
            });
        }

        [bounds.slopeMin, bounds.slopeMax].forEach(slope => {
            candidates.push({
                slope,
                intercept: clamp((sums.y - slope * sums.x) / count, bounds.interceptMin, bounds.interceptMax)
            });
        });

        [bounds.interceptMin, bounds.interceptMax].forEach(intercept => {
            const slope = sums.xx > EPSILON
                ? (sums.xy - intercept * sums.x) / sums.xx
                : bounds.slopeMin;
            candidates.push({
                slope: clamp(slope, bounds.slopeMin, bounds.slopeMax),
                intercept
            });
        });

        candidates.push(
            { slope: bounds.slopeMin, intercept: bounds.interceptMin },
            { slope: bounds.slopeMin, intercept: bounds.interceptMax },
            { slope: bounds.slopeMax, intercept: bounds.interceptMin },
            { slope: bounds.slopeMax, intercept: bounds.interceptMax }
        );

        return findBestCandidate(data, candidates, bounds, 'L2');
    }

    // LAD/L1 is convex and piecewise linear. Inside a rectangular domain, at
    // least one global minimum lies at a vertex formed by two residual lines,
    // by a residual line and a boundary, or by two boundaries.
    function optimizeL1(data, bounds) {
        const candidates = [
            { slope: bounds.slopeMin, intercept: bounds.interceptMin },
            { slope: bounds.slopeMin, intercept: bounds.interceptMax },
            { slope: bounds.slopeMax, intercept: bounds.interceptMin },
            { slope: bounds.slopeMax, intercept: bounds.interceptMax }
        ];

        data.forEach(point => {
            [bounds.slopeMin, bounds.slopeMax].forEach(slope => {
                candidates.push({ slope, intercept: point.y - slope * point.x });
            });

            if (Math.abs(point.x) > EPSILON) {
                [bounds.interceptMin, bounds.interceptMax].forEach(intercept => {
                    candidates.push({ slope: (point.y - intercept) / point.x, intercept });
                });
            }
        });

        for (let first = 0; first < data.length; first++) {
            for (let second = first + 1; second < data.length; second++) {
                const xDifference = data[second].x - data[first].x;
                if (Math.abs(xDifference) <= EPSILON) {
                    continue;
                }
                const slope = (data[second].y - data[first].y) / xDifference;
                candidates.push({
                    slope,
                    intercept: data[first].y - slope * data[first].x
                });
            }
        }

        return findBestCandidate(data, candidates, bounds, 'L1');
    }

    function optimize(data, bounds, errorType) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('At least one data point is required.');
        }
        return errorType === 'L1' ? optimizeL1(data, bounds) : optimizeL2(data, bounds);
    }

    return { calculateError, optimize };
}));
