---
title: "📝 Linear Regression Pseudocode"
weight: 66
description: "The formal algorithm behind linear regression: from data to optimal parameters."
date: 
draft: false
slug: "linear-regression-pseudocode"
---

Linear regression is one of the foundational algorithms in machine learning. It finds the best-fitting line (or hyperplane) through data by minimizing the sum of squared errors between predictions and actual values.

## The Algorithm


### Gradient Descent Solution

When the dataset is very large or the matrix inversion is computationally expensive, we use gradient descent:

```
ALGORITHM: Linear Regression (Gradient Descent)
─────────────────────────────────────────────────────────────────

INPUT:
    X: Feature matrix of shape (n_samples, n_features)
    y: Target vector of shape (n_samples,)
    α: Learning rate (e.g., 0.01)
    max_iterations: Maximum number of iterations
    tolerance: Convergence threshold (e.g., 1e-6)

OUTPUT:
    w: Weight vector of shape (n_features + 1,)

PROCEDURE:
    1. Add bias term: X_b ← [1, X]
    
    2. Initialize weights: w ← zeros(n_features + 1)
    
    3. n ← number of samples
    
    4. FOR iteration = 1 TO max_iterations:
        
        a. Compute predictions:
           ŷ ← X_b · w
        
        b. Compute error:
           error ← ŷ - y
        
        c. Compute gradient:
           gradient ← (2/n) · X_bᵀ · error
        
        d. Update weights:
           w ← w - α · gradient
        
        e. Check convergence:
           IF ||gradient|| < tolerance:
               BREAK
    
    5. RETURN w
```

### Closed-Form Solution (Normal Equation)

For a dataset with $n$ samples and $m$ features, linear regression finds weights $\mathbf{w}$ that minimize the Mean Squared Error (MSE).

```
ALGORITHM: Linear Regression (Normal Equation)
─────────────────────────────────────────────────────────────────

INPUT:
    X: Feature matrix of shape (n_samples, n_features)
    y: Target vector of shape (n_samples,)

OUTPUT:
    w: Weight vector of shape (n_features + 1,)

PROCEDURE:
    1. Add bias term: X_b ← [1, X]  // Prepend column of ones
    
    2. Compute optimal weights using Normal Equation:
       w ← (X_bᵀ · X_b)⁻¹ · X_bᵀ · y
    
    3. RETURN w

PREDICTION:
    Given new sample x:
    ŷ ← w₀ + w₁·x₁ + w₂·x₂ + ... + wₘ·xₘ
    // Or in matrix form: ŷ ← [1, x] · w
```


## Mathematical Foundation

The cost function (Mean Squared Error) that we minimize is:

$$J(\mathbf{w}) = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 = \frac{1}{n} \sum_{i=1}^{n} (y_i - \mathbf{w}^T \mathbf{x}_i)^2$$

The gradient of this cost function with respect to the weights is:

$$\nabla_{\mathbf{w}} J = \frac{2}{n} \mathbf{X}^T (\mathbf{X}\mathbf{w} - \mathbf{y})$$

Setting the gradient to zero and solving gives us the **Normal Equation**:

$$\mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

## Complexity Analysis

| Method | Time Complexity | Space Complexity |
|--------|-----------------|------------------|
| Normal Equation | $O(n \cdot m^2 + m^3)$ | $O(m^2)$ |
| Gradient Descent | $O(k \cdot n \cdot m)$ | $O(m)$ |

Where $n$ = samples, $m$ = features, $k$ = iterations.

## Key Insights

1. **Normal Equation**: Best for small to medium datasets. No hyperparameters needed, but computationally expensive for large feature sets.

2. **Gradient Descent**: Scales better to large datasets. Requires tuning learning rate and convergence criteria.

3. **Feature Scaling**: Always normalize/standardize features when using gradient descent to ensure stable convergence.

## References

- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 3. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Chapter 3. Springer.
- **scikit-learn Documentation**: LinearRegression. [https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares](https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares)
- **Stanford CS229**: Machine Learning Course Notes on Linear Regression. [https://cs229.stanford.edu/](https://cs229.stanford.edu/)
