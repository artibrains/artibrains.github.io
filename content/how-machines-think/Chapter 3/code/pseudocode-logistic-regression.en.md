---
title: "📝 Logistic Regression Pseudocode"
weight: 80
description: "The algorithm behind binary classification: transforming linear outputs into probabilities."
date: 
draft: false
slug: "logistic-regression-pseudocode"
---

Logistic regression is the fundamental algorithm for binary classification. Despite its name, it's a classification algorithm that uses the logistic (sigmoid) function to transform linear combinations of features into probabilities.

## The Algorithm

### Training with Gradient Descent

```
ALGORITHM: Logistic Regression Training
─────────────────────────────────────────────────────────────────

INPUT:
    X: Feature matrix of shape (n_samples, n_features)
    y: Binary labels {0, 1} of shape (n_samples,)
    α: Learning rate (e.g., 0.01)
    max_iterations: Maximum number of iterations
    tolerance: Convergence threshold (e.g., 1e-6)

OUTPUT:
    w: Weight vector of shape (n_features,)
    b: Bias term (scalar)

PROCEDURE:
    1. Initialize weights: w ← zeros(n_features)
    2. Initialize bias: b ← 0
    3. n ← number of samples
    
    4. FOR iteration = 1 TO max_iterations:
        
        a. // Forward pass: compute linear combination
           z ← X · w + b
        
        b. // Apply sigmoid activation
           ŷ ← σ(z) = 1 / (1 + exp(-z))
        
        c. // Compute gradients (from cross-entropy loss)
           dw ← (1/n) · Xᵀ · (ŷ - y)
           db ← (1/n) · Σ(ŷ - y)
        
        d. // Update parameters
           w ← w - α · dw
           b ← b - α · db
        
        e. // Check convergence
           IF ||dw|| < tolerance AND |db| < tolerance:
               BREAK
    
    5. RETURN w, b
```

### Prediction

```
ALGORITHM: Logistic Regression Prediction
─────────────────────────────────────────────────────────────────

INPUT:
    x: Sample feature vector of shape (n_features,)
    w: Trained weight vector
    b: Trained bias term
    threshold: Decision threshold (default = 0.5)

OUTPUT:
    class: Predicted class {0, 1}
    probability: Probability of class 1

PROCEDURE:
    1. Compute linear combination:
       z ← w · x + b
    
    2. Apply sigmoid to get probability:
       p ← σ(z) = 1 / (1 + exp(-z))
    
    3. Apply threshold to get class:
       IF p ≥ threshold:
           class ← 1
       ELSE:
           class ← 0
    
    4. RETURN class, p
```

### The Sigmoid Function

```
FUNCTION: Sigmoid (Logistic Function)
─────────────────────────────────────────────────────────────────

INPUT:
    z: Real number or array

OUTPUT:
    σ(z): Value(s) in range (0, 1)

DEFINITION:
    σ(z) = 1 / (1 + exp(-z))

PROPERTIES:
    - σ(0) = 0.5
    - lim(z → +∞) σ(z) = 1
    - lim(z → -∞) σ(z) = 0
    - σ'(z) = σ(z) · (1 - σ(z))  // Derivative
```

## Mathematical Foundation

### The Model

Logistic regression models the probability that sample $x$ belongs to class 1:

$$P(y=1|x) = \sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}}$$

### The Loss Function (Binary Cross-Entropy)

For a single sample:
$$L(y, \hat{y}) = -[y \log(\hat{y}) + (1-y) \log(1-\hat{y})]$$

For the entire dataset:
$$J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} [y_i \log(\hat{y}_i) + (1-y_i) \log(1-\hat{y}_i)]$$

### The Gradients

$$\frac{\partial J}{\partial w} = \frac{1}{n} X^T (\hat{y} - y)$$

$$\frac{\partial J}{\partial b} = \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)$$

## Regularized Logistic Regression

To prevent overfitting, we add a regularization term:

```
ALGORITHM: L2-Regularized Logistic Regression
─────────────────────────────────────────────────────────────────

MODIFIED GRADIENT UPDATE (step 4d in training):

    // L2 Regularization (Ridge)
    dw ← (1/n) · Xᵀ · (ŷ - y) + (λ/n) · w
    
    // Note: bias is typically not regularized
    db ← (1/n) · Σ(ŷ - y)

WHERE:
    λ: Regularization strength (hyperparameter)
```

The regularized loss function becomes:

$$J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} [y_i \log(\hat{y}_i) + (1-y_i) \log(1-\hat{y}_i)] + \frac{\lambda}{2n} \|w\|^2$$

## Multiclass Extension (Softmax Regression)

For $K$ classes, we extend to softmax regression:

```
ALGORITHM: Softmax Regression (Multinomial Logistic Regression)
─────────────────────────────────────────────────────────────────

INPUT:
    X: Feature matrix of shape (n_samples, n_features)
    y: Labels {0, 1, ..., K-1} of shape (n_samples,)

PREDICTION:
    1. Compute scores for each class:
       z_k ← X · w_k + b_k    for k = 0, 1, ..., K-1
    
    2. Apply softmax to get probabilities:
       P(y = k | x) = exp(z_k) / Σⱼ exp(z_j)
    
    3. Predict class with highest probability:
       ŷ ← argmax_k P(y = k | x)
```

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Training (per iteration) | $O(n \cdot m)$ | $O(m)$ |
| Prediction (per sample) | $O(m)$ | $O(1)$ |

Where $n$ = samples, $m$ = features.

## Key Insights

1. **Interpretability**: Weights represent log-odds ratios; $e^{w_j}$ is the multiplicative change in odds per unit increase in feature $j$.

2. **Threshold Tuning**: The default 0.5 threshold can be adjusted based on the cost of false positives vs. false negatives.

3. **Feature Scaling**: Standardizing features speeds up convergence.

4. **Class Imbalance**: Use class weights or resampling for imbalanced datasets.

## References

- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 4. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Chapter 4. Springer.
- **scikit-learn Documentation**: LogisticRegression. [https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression)
- **Andrew Ng's CS229 Notes**: Logistic Regression. [https://cs229.stanford.edu/](https://cs229.stanford.edu/)
