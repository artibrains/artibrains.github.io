---
title: "📝 Gradient Descent Pseudocode"
weight: 67
description: "The optimization algorithm that powers machine learning: understanding gradient descent step by step."
date: 
draft: false
slug: "gradient-descent-pseudocode"
---

Gradient descent is the workhorse optimization algorithm in machine learning. It iteratively adjusts parameters to minimize a cost function by following the direction of steepest descent.

## The Core Algorithm

### Batch Gradient Descent (One Epoch)

```
ALGORITHM: Batch Gradient Descent (One Epoch)
─────────────────────────────────────────────────────────────────

INPUT:
    θ: Current parameter vector
    X: Full training dataset (n_samples, n_features)
    y: Target values (n_samples,)
    α: Learning rate
    loss_function: Function to compute loss
    gradient_function: Function to compute gradient

OUTPUT:
    θ: Updated parameter vector

PROCEDURE:
    1. Compute predictions for all samples:
       ŷ ← predict(X, θ)
    
    2. Compute loss (optional, for monitoring):
       L ← loss_function(y, ŷ)
    
    3. Compute gradient over entire dataset:
       ∇L ← gradient_function(X, y, ŷ, θ)
    
    4. Update parameters:
       θ ← θ - α · ∇L
    
    5. RETURN θ
```

### Full Training Loop

```
ALGORITHM: Gradient Descent Training
─────────────────────────────────────────────────────────────────

INPUT:
    X: Training data of shape (n_samples, n_features)
    y: Target values of shape (n_samples,)
    α: Learning rate (e.g., 0.01)
    max_epochs: Maximum number of epochs
    tolerance: Convergence threshold (e.g., 1e-6)
    loss_function: Function to compute loss
    gradient_function: Function to compute gradient

OUTPUT:
    θ: Optimized parameter vector
    history: List of loss values per epoch

PROCEDURE:
    1. Initialize parameters θ randomly or to zeros
    
    2. history ← empty list
    
    3. FOR epoch = 1 TO max_epochs:
        
        a. // Forward pass: compute predictions
           ŷ ← predict(X, θ)
        
        b. // Compute and record loss
           L ← loss_function(y, ŷ)
           APPEND L to history
        
        c. // Compute gradient
           ∇L ← gradient_function(X, y, ŷ, θ)
        
        d. // Update parameters (gradient step)
           θ ← θ - α · ∇L
        
        e. // Check for convergence
           IF ||∇L|| < tolerance:
               PRINT "Converged at epoch", epoch
               BREAK
    
    4. RETURN θ, history
```

## Variants of Gradient Descent

### Stochastic Gradient Descent (SGD)

Updates parameters using one random sample at a time:

```
ALGORITHM: Stochastic Gradient Descent (One Epoch)
─────────────────────────────────────────────────────────────────

INPUT:
    θ: Current parameter vector
    X: Training data of shape (n_samples, n_features)
    y: Target values of shape (n_samples,)
    α: Learning rate

OUTPUT:
    θ: Updated parameter vector

PROCEDURE:
    1. Shuffle the dataset indices
    
    2. FOR each sample i in shuffled order:
        
        a. Get single sample: xᵢ, yᵢ
        
        b. Compute prediction: ŷᵢ ← predict(xᵢ, θ)
        
        c. Compute gradient for single sample:
           ∇Lᵢ ← gradient(xᵢ, yᵢ, ŷᵢ, θ)
        
        d. Update parameters:
           θ ← θ - α · ∇Lᵢ
    
    3. RETURN θ
```

### Mini-Batch Gradient Descent

The most common variant, balancing speed and stability:

```
ALGORITHM: Mini-Batch Gradient Descent (One Epoch)
─────────────────────────────────────────────────────────────────

INPUT:
    θ: Current parameter vector
    X: Training data of shape (n_samples, n_features)
    y: Target values of shape (n_samples,)
    α: Learning rate
    batch_size: Number of samples per batch (e.g., 32)

OUTPUT:
    θ: Updated parameter vector

PROCEDURE:
    1. n ← number of samples
    
    2. Shuffle the dataset
    
    3. n_batches ← ceil(n / batch_size)
    
    4. FOR batch_idx = 0 TO n_batches - 1:
        
        a. // Extract mini-batch
           start ← batch_idx × batch_size
           end ← min(start + batch_size, n)
           X_batch ← X[start:end]
           y_batch ← y[start:end]
        
        b. // Forward pass
           ŷ_batch ← predict(X_batch, θ)
        
        c. // Compute gradient on mini-batch
           ∇L ← gradient(X_batch, y_batch, ŷ_batch, θ)
        
        d. // Update parameters
           θ ← θ - α · ∇L
    
    5. RETURN θ
```

## Mathematical Foundation

For a differentiable loss function $L(\theta)$, gradient descent updates parameters as:

$$\theta_{t+1} = \theta_t - \alpha \nabla_\theta L(\theta_t)$$

Where:
- $\theta_t$ is the parameter vector at iteration $t$
- $\alpha$ is the learning rate (step size)
- $\nabla_\theta L$ is the gradient of the loss with respect to parameters

### Convergence Conditions

For convex functions with Lipschitz-continuous gradients, gradient descent converges when:

1. The learning rate satisfies: $\alpha < \frac{2}{L}$ where $L$ is the Lipschitz constant
2. For convergence rate: $L(\theta_t) - L(\theta^*) \leq \frac{\|\theta_0 - \theta^*\|^2}{2\alpha t}$

## Comparison of Variants

| Variant | Update Frequency | Convergence | Memory Usage | Noise Level |
|---------|-----------------|-------------|--------------|-------------|
| Batch GD | Once per epoch | Smooth, stable | High | Low |
| SGD | Once per sample | Noisy, can escape local minima | Low | High |
| Mini-Batch | Once per batch | Good balance | Medium | Medium |

## Key Hyperparameters

1. **Learning Rate (α)**: Too high → divergence; too low → slow convergence
2. **Batch Size**: Larger → more stable; smaller → more noise, better generalization
3. **Number of Epochs**: Enough to converge but avoid overfitting

## References

- **Ruder, S.** (2016). *An overview of gradient descent optimization algorithms*. arXiv:1609.04747. [https://arxiv.org/abs/1609.04747](https://arxiv.org/abs/1609.04747)
- **Bottou, L.** (2010). *Large-Scale Machine Learning with Stochastic Gradient Descent*. COMPSTAT 2010.
- **Goodfellow, I., Bengio, Y., & Courville, A.** (2016). *Deep Learning*, Chapter 8. MIT Press. [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/)
- **Stanford CS231n**: Optimization notes. [https://cs231n.github.io/optimization-1/](https://cs231n.github.io/optimization-1/)
