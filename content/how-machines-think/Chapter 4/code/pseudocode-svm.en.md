---
title: "📝 Support Vector Machines (SVM) Pseudocode"
weight: 84
description: "The maximum-margin classifier that finds optimal decision boundaries."
date: 
draft: false
slug: "svm-pseudocode"
---

Support Vector Machines (SVM) are powerful supervised learning models that find the optimal hyperplane separating classes by maximizing the margin between them. SVMs can handle linear and non-linear classification through the kernel trick.

## The Algorithm

### Linear SVM: The Optimization Problem

```
ALGORITHM: Linear SVM Formulation
─────────────────────────────────────────────────────────────────

OBJECTIVE: Find hyperplane w·x + b = 0 that maximizes margin

PRIMAL PROBLEM (Hard Margin):
    
    minimize:     (1/2) ||w||²
    
    subject to:   yᵢ(w · xᵢ + b) ≥ 1    for all i = 1, ..., n
    
    where:
        w: Weight vector (normal to hyperplane)
        b: Bias term
        yᵢ ∈ {-1, +1}: Class labels
        xᵢ: Training samples

PRIMAL PROBLEM (Soft Margin - allows misclassification):
    
    minimize:     (1/2) ||w||² + C Σᵢ ξᵢ
    
    subject to:   yᵢ(w · xᵢ + b) ≥ 1 - ξᵢ    for all i
                  ξᵢ ≥ 0                       for all i
    
    where:
        C: Regularization parameter (trade-off between margin and errors)
        ξᵢ: Slack variables (allow points inside margin or misclassified)
```

### SVM Training with SMO (Sequential Minimal Optimization)

```
ALGORITHM: SMO for SVM Training (Simplified)
─────────────────────────────────────────────────────────────────

INPUT:
    X: Training data of shape (n_samples, n_features)
    y: Labels {-1, +1} of shape (n_samples,)
    C: Regularization parameter
    kernel: Kernel function (default: linear)
    tolerance: Numerical tolerance (e.g., 1e-3)
    max_iterations: Maximum passes over data

OUTPUT:
    α: Lagrange multipliers of shape (n_samples,)
    b: Bias term

PROCEDURE:
    1. Initialize: α ← zeros(n_samples), b ← 0
    
    2. // Precompute kernel matrix (for efficiency)
       K[i,j] ← kernel(xᵢ, xⱼ) for all i, j
    
    3. passes ← 0
       WHILE passes < max_iterations:
           num_changed ← 0
           
           FOR i = 1 TO n_samples:
               // Calculate prediction error for sample i
               Eᵢ ← (Σⱼ αⱼ yⱼ K[i,j]) + b - yᵢ
               
               // Check if αᵢ violates KKT conditions
               IF (yᵢ Eᵢ < -tol AND αᵢ < C) OR (yᵢ Eᵢ > tol AND αᵢ > 0):
                   
                   // Select second α to optimize (heuristic: max |Eᵢ - Eⱼ|)
                   j ← select_second_alpha(i, Eᵢ)
                   Eⱼ ← (Σₖ αₖ yₖ K[j,k]) + b - yⱼ
                   
                   // Save old alphas
                   αᵢ_old ← αᵢ
                   αⱼ_old ← αⱼ
                   
                   // Compute bounds for αⱼ
                   IF yᵢ ≠ yⱼ:
                       L ← max(0, αⱼ - αᵢ)
                       H ← min(C, C + αⱼ - αᵢ)
                   ELSE:
                       L ← max(0, αᵢ + αⱼ - C)
                       H ← min(C, αᵢ + αⱼ)
                   
                   IF L = H:
                       CONTINUE
                   
                   // Compute eta (second derivative of objective)
                   η ← 2 K[i,j] - K[i,i] - K[j,j]
                   IF η ≥ 0:
                       CONTINUE
                   
                   // Update αⱼ
                   αⱼ ← αⱼ - yⱼ(Eᵢ - Eⱼ) / η
                   αⱼ ← clip(αⱼ, L, H)
                   
                   IF |αⱼ - αⱼ_old| < 1e-5:
                       CONTINUE
                   
                   // Update αᵢ
                   αᵢ ← αᵢ + yᵢ yⱼ (αⱼ_old - αⱼ)
                   
                   // Update bias b
                   b₁ ← b - Eᵢ - yᵢ(αᵢ-αᵢ_old)K[i,i] - yⱼ(αⱼ-αⱼ_old)K[i,j]
                   b₂ ← b - Eⱼ - yᵢ(αᵢ-αᵢ_old)K[i,j] - yⱼ(αⱼ-αⱼ_old)K[j,j]
                   
                   IF 0 < αᵢ < C:
                       b ← b₁
                   ELSE IF 0 < αⱼ < C:
                       b ← b₂
                   ELSE:
                       b ← (b₁ + b₂) / 2
                   
                   num_changed ← num_changed + 1
           
           IF num_changed = 0:
               passes ← passes + 1
           ELSE:
               passes ← 0
    
    4. // Extract support vectors (samples with αᵢ > 0)
       support_vectors ← indices where α > 0
    
    5. RETURN α, b, support_vectors
```

### SVM Prediction

```
ALGORITHM: SVM Prediction
─────────────────────────────────────────────────────────────────

INPUT:
    x: New sample to classify
    α: Trained Lagrange multipliers
    b: Trained bias term
    X_sv: Support vectors
    y_sv: Labels of support vectors
    kernel: Kernel function

OUTPUT:
    class: Predicted class {-1, +1}
    score: Decision function value (distance to hyperplane)

PROCEDURE:
    // Decision function: f(x) = Σᵢ αᵢ yᵢ K(xᵢ, x) + b
    score ← 0
    FOR i in support_vector_indices:
        score ← score + α[i] × y[i] × kernel(X[i], x)
    score ← score + b
    
    // Classify based on sign
    IF score ≥ 0:
        class ← +1
    ELSE:
        class ← -1
    
    RETURN class, score
```

### Kernel Functions

```
FUNCTION: Common Kernel Functions
─────────────────────────────────────────────────────────────────

LINEAR KERNEL:
    K(x, z) = x · z = xᵀz
    
    // Equivalent to standard dot product
    // Use when data is linearly separable

POLYNOMIAL KERNEL:
    K(x, z) = (γ xᵀz + r)^d
    
    where:
        d: Degree of polynomial (e.g., 2, 3)
        γ: Scale factor (default: 1/n_features)
        r: Coefficient (default: 0 or 1)

RADIAL BASIS FUNCTION (RBF/Gaussian):
    K(x, z) = exp(-γ ||x - z||²)
    
    where:
        γ: Kernel coefficient (default: 1/n_features)
        // Higher γ → narrower Gaussian → more complex boundary
    
    // Most popular for non-linear problems

SIGMOID KERNEL:
    K(x, z) = tanh(γ xᵀz + r)
    
    // Similar to neural network with one hidden layer
    // Not always a valid Mercer kernel
```

## Mathematical Foundation

### The Dual Problem

The primal SVM problem is converted to its dual for computational efficiency:

$$\max_\alpha \sum_{i=1}^{n} \alpha_i - \frac{1}{2} \sum_{i,j} \alpha_i \alpha_j y_i y_j K(x_i, x_j)$$

Subject to:
- $0 \leq \alpha_i \leq C$ for all $i$
- $\sum_{i=1}^{n} \alpha_i y_i = 0$

### The Kernel Trick

Instead of explicitly mapping to high-dimensional space $\phi(x)$:
$$K(x, z) = \phi(x) \cdot \phi(z)$$

We compute the kernel directly, avoiding the expensive explicit transformation.

### KKT Conditions

For optimal solution, each $\alpha_i$ satisfies:
- $\alpha_i = 0$ → sample is correctly classified, outside margin
- $0 < \alpha_i < C$ → sample is on the margin (support vector)
- $\alpha_i = C$ → sample is inside margin or misclassified

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Training (SMO) | $O(n^2 \cdot m)$ to $O(n^3 \cdot m)$ | $O(n^2)$ (kernel matrix) |
| Prediction | $O(n_{sv} \cdot m)$ | $O(n_{sv})$ |

Where $n$ = samples, $m$ = features, $n_{sv}$ = support vectors.

## Multiclass SVM

```
ALGORITHM: One-vs-Rest (OvR) Multiclass SVM
─────────────────────────────────────────────────────────────────

TRAINING:
    FOR each class k = 1 TO K:
        y_binary ← [+1 if yᵢ = k else -1 for all i]
        svm[k] ← train_svm(X, y_binary)

PREDICTION:
    scores ← [svm[k].decision_function(x) for k = 1 to K]
    predicted_class ← argmax(scores)


ALGORITHM: One-vs-One (OvO) Multiclass SVM
─────────────────────────────────────────────────────────────────

TRAINING:
    FOR each pair of classes (i, j) where i < j:
        X_subset ← samples from class i or j
        y_binary ← [+1 if class i, -1 if class j]
        svm[i,j] ← train_svm(X_subset, y_binary)

PREDICTION:
    votes ← zeros(K)
    FOR each pair (i, j):
        pred ← svm[i,j].predict(x)
        IF pred = +1:
            votes[i] ← votes[i] + 1
        ELSE:
            votes[j] ← votes[j] + 1
    predicted_class ← argmax(votes)
```

## Key Insights

1. **Maximum Margin**: SVMs find the decision boundary that maximizes the margin, leading to better generalization.

2. **Sparse Solution**: Only support vectors matter; other training points can be discarded.

3. **Kernel Trick**: Enables non-linear classification without explicit feature mapping.

4. **C Parameter**: Low C → wider margin, more errors; High C → narrow margin, fewer errors.

5. **γ Parameter (RBF)**: Low γ → smooth boundary; High γ → complex boundary.

6. **Feature Scaling**: Essential for SVM; use standardization.

## References

- **Cortes, C., & Vapnik, V.** (1995). *Support-vector networks*. Machine Learning, 20(3), 273-297.
- **Platt, J.** (1998). *Sequential Minimal Optimization: A Fast Algorithm for Training Support Vector Machines*. Microsoft Research.
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 12. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **scikit-learn Documentation**: SVM. [https://scikit-learn.org/stable/modules/svm.html](https://scikit-learn.org/stable/modules/svm.html)
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Chapter 7. Springer.
