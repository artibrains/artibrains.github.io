---
title: "📝 Perceptron Training Algorithm Pseudocode"
weight: 80
description: "The foundational neural network algorithm: the building block of modern deep learning."
date: 
draft: false
slug: "perceptron-pseudocode"
---

The Perceptron is the simplest form of a neural network—a single artificial neuron that learns to classify linearly separable data. Invented by Frank Rosenblatt in 1958, it laid the foundation for all modern neural networks.

## The Algorithm

### Perceptron Model

```
PERCEPTRON: Single Artificial Neuron
─────────────────────────────────────────────────────────────────

STRUCTURE:
    Inputs:     x = [x₁, x₂, ..., xₙ]
    Weights:    w = [w₁, w₂, ..., wₙ]
    Bias:       b (or w₀ with x₀ = 1)
    Activation: Step function

FORWARD PASS:
    1. Compute weighted sum:
       z = Σᵢ (wᵢ × xᵢ) + b = w · x + b
    
    2. Apply activation function:
       ŷ = step(z) = { 1  if z ≥ 0
                     { 0  if z < 0

    // Alternative: use {-1, +1} labels
       ŷ = sign(z) = { +1  if z ≥ 0
                     { -1  if z < 0
```

### Perceptron Learning Algorithm

```
ALGORITHM: Perceptron Training
─────────────────────────────────────────────────────────────────

INPUT:
    X: Training data of shape (n_samples, n_features)
    y: Binary labels {0, 1} or {-1, +1} of shape (n_samples,)
    η: Learning rate (default: 1.0)
    max_epochs: Maximum number of passes through data

OUTPUT:
    w: Learned weight vector
    b: Learned bias term

PROCEDURE:
    1. Initialize weights and bias:
       w ← zeros(n_features)  // or small random values
       b ← 0
    
    2. FOR epoch = 1 TO max_epochs:
           
           errors ← 0
           
           FOR each training sample (xᵢ, yᵢ):
               
               // Compute prediction
               z ← w · xᵢ + b
               ŷ ← step(z)  // or sign(z)
               
               // Update only if misclassified
               IF ŷ ≠ yᵢ:
                   
                   // Update rule (Perceptron Learning Rule)
                   // For {0, 1} labels:
                   w ← w + η × (yᵢ - ŷ) × xᵢ
                   b ← b + η × (yᵢ - ŷ)
                   
                   // Equivalently, for {-1, +1} labels:
                   // w ← w + η × yᵢ × xᵢ
                   // b ← b + η × yᵢ
                   
                   errors ← errors + 1
           
           // Check for convergence
           IF errors = 0:
               PRINT "Converged at epoch", epoch
               BREAK
    
    3. RETURN w, b
```

### Perceptron Prediction

```
ALGORITHM: Perceptron Prediction
─────────────────────────────────────────────────────────────────

INPUT:
    x: New sample of shape (n_features,)
    w: Trained weights
    b: Trained bias

OUTPUT:
    predicted_class: {0, 1} or {-1, +1}

PROCEDURE:
    z ← w · x + b
    
    IF z ≥ 0:
        RETURN 1  // or +1
    ELSE:
        RETURN 0  // or -1
```

### Pocket Algorithm (Handling Non-Separable Data)

```
ALGORITHM: Pocket Perceptron
─────────────────────────────────────────────────────────────────

// Keeps the best weights found so far in a "pocket"
// Useful when data is not linearly separable

INPUT:
    X, y: Training data
    η: Learning rate
    max_iterations: Maximum updates

OUTPUT:
    w_pocket: Best weights found
    b_pocket: Best bias found

PROCEDURE:
    w ← zeros(n_features)
    b ← 0
    
    w_pocket ← w
    b_pocket ← b
    best_accuracy ← 0
    
    FOR iteration = 1 TO max_iterations:
        
        // Select random misclassified sample
        misclassified ← [i for i where predict(xᵢ) ≠ yᵢ]
        
        IF misclassified is empty:
            BREAK  // Perfect classification
        
        // Pick random misclassified point
        i ← random_choice(misclassified)
        
        // Perceptron update
        w ← w + η × yᵢ × xᵢ
        b ← b + η × yᵢ
        
        // Check if this is the best so far
        accuracy ← count_correct(X, y, w, b) / n_samples
        
        IF accuracy > best_accuracy:
            w_pocket ← w
            b_pocket ← b
            best_accuracy ← accuracy
    
    RETURN w_pocket, b_pocket
```

### Voted Perceptron

```
ALGORITHM: Voted Perceptron
─────────────────────────────────────────────────────────────────

// Stores all weight vectors encountered during training
// Uses weighted voting for prediction

TRAINING:
    weights_list ← empty list
    survival_counts ← empty list
    
    w ← zeros(n_features)
    b ← 0
    count ← 0
    
    FOR epoch = 1 TO max_epochs:
        FOR each (xᵢ, yᵢ):
            IF sign(w · xᵢ + b) ≠ yᵢ:
                // Store current weights and their survival count
                APPEND (w, b) to weights_list
                APPEND count to survival_counts
                
                // Update
                w ← w + yᵢ × xᵢ
                b ← b + yᵢ
                count ← 1
            ELSE:
                count ← count + 1
    
    // Don't forget the last weights
    APPEND (w, b) to weights_list
    APPEND count to survival_counts

PREDICTION:
    vote ← 0
    FOR i = 1 TO length(weights_list):
        (wᵢ, bᵢ) ← weights_list[i]
        cᵢ ← survival_counts[i]
        vote ← vote + cᵢ × sign(wᵢ · x + bᵢ)
    
    RETURN sign(vote)
```

## Mathematical Foundation

### Decision Boundary

The perceptron defines a hyperplane in feature space:

$$w \cdot x + b = 0$$

Points on one side are classified as positive, on the other as negative:
- $w \cdot x + b > 0 \Rightarrow$ class 1
- $w \cdot x + b < 0 \Rightarrow$ class 0 (or -1)

### Convergence Theorem (Novikoff, 1962)

For **linearly separable** data, the perceptron converges in at most:

$$k \leq \left(\frac{R}{\gamma}\right)^2$$

iterations, where:
- $R = \max_i ||x_i||$ (radius of data)
- $\gamma = \min_i y_i(w^* \cdot x_i + b^*)$ (margin of optimal separator)

### Why It Works

The update rule moves the decision boundary to correctly classify the misclassified point:

$$w_{new} = w_{old} + y \cdot x$$

- If $y = +1$ and we predicted $-1$: Adding $x$ increases $w \cdot x$
- If $y = -1$ and we predicted $+1$: Subtracting $x$ decreases $w \cdot x$

## The XOR Limitation

```
THE XOR PROBLEM:
─────────────────────────────────────────────────────────────────

XOR Truth Table:
    x₁ | x₂ | y
    ───┼────┼───
    0  | 0  | 0
    0  | 1  | 1
    1  | 0  | 1
    1  | 1  | 0

PROBLEM: No single line can separate the classes!

This limitation was famously highlighted by Minsky & Papert (1969),
leading to the first "AI Winter."

SOLUTION: Multi-layer perceptrons (neural networks) with hidden layers
can solve XOR and other non-linearly separable problems.
```

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| One update | $O(m)$ | $O(m)$ |
| Full training | $O(k \cdot m)$ | $O(m)$ |
| Prediction | $O(m)$ | $O(1)$ |

Where $m$ = features, $k$ = number of mistakes (≤ $(R/\gamma)^2$ for separable data).

## Key Insights

1. **Guaranteed Convergence**: For linearly separable data, the algorithm always converges.

2. **Online Learning**: Updates weights immediately after each mistake—no need to store all data.

3. **Margin Dependence**: Convergence speed depends on the margin; larger margin = faster convergence.

4. **Non-Separable Data**: Basic perceptron oscillates forever; use Pocket, Voted, or Averaged variants.

5. **Building Block**: Single perceptrons are limited, but stacking them creates powerful neural networks.

6. **Feature Engineering**: The perceptron can solve non-linear problems if given the right features.

## References

- **Rosenblatt, F.** (1958). *The perceptron: A probabilistic model for information storage and organization in the brain*. Psychological Review.
- **Novikoff, A. B. J.** (1962). *On convergence proofs on perceptrons*. Symposium on the Mathematical Theory of Automata.
- **Minsky, M., & Papert, S.** (1969). *Perceptrons: An Introduction to Computational Geometry*. MIT Press.
- **Freund, Y., & Schapire, R. E.** (1999). *Large Margin Classification Using the Perceptron Algorithm*. Machine Learning, 37(3), 277-296.
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Chapter 4. Springer.
