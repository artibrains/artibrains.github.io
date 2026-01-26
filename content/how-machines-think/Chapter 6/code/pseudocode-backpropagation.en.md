---
title: "📝 Backpropagation Algorithm Pseudocode"
weight: 81
description: "The engine of deep learning: how neural networks learn through gradient propagation."
date: 
draft: false
slug: "backpropagation-pseudocode"
---

Backpropagation (backward propagation of errors) is the fundamental algorithm that enables neural networks to learn. It efficiently computes gradients of the loss function with respect to every weight in the network using the chain rule of calculus.

## The Algorithm

### Neural Network Forward Pass

```
ALGORITHM: Forward Propagation
─────────────────────────────────────────────────────────────────

INPUT:
    x: Input vector of shape (n_input,)
    W: List of weight matrices [W¹, W², ..., Wᴸ]
    b: List of bias vectors [b¹, b², ..., bᴸ]
    activations: List of activation functions [σ¹, σ², ..., σᴸ]

OUTPUT:
    a: List of activations for each layer [a⁰, a¹, ..., aᴸ]
    z: List of pre-activations for each layer [z¹, z², ..., zᴸ]

PROCEDURE:
    a[0] ← x  // Input is the first "activation"
    L ← number of layers
    
    FOR l = 1 TO L:
        // Linear transformation
        z[l] ← W[l] · a[l-1] + b[l]
        
        // Apply activation function
        a[l] ← σ[l](z[l])
    
    RETURN a, z
```

### Backpropagation Algorithm

```
ALGORITHM: Backpropagation
─────────────────────────────────────────────────────────────────

INPUT:
    x: Input sample
    y: Target output
    W, b: Network weights and biases
    activations: Activation functions for each layer
    loss_function: Loss function (e.g., MSE, cross-entropy)

OUTPUT:
    ∂L/∂W: Gradients for all weight matrices
    ∂L/∂b: Gradients for all bias vectors

PROCEDURE:
    L ← number of layers
    
    // ========== FORWARD PASS ==========
    a, z ← forward_propagation(x, W, b, activations)
    
    // ========== BACKWARD PASS ==========
    
    // Step 1: Compute output layer error (δᴸ)
    // δᴸ = ∂L/∂aᴸ ⊙ σ'(zᴸ)
    
    ∂L/∂a[L] ← derivative_of_loss(a[L], y)  // e.g., (a[L] - y) for MSE
    δ[L] ← ∂L/∂a[L] ⊙ σ'[L](z[L])           // ⊙ is element-wise multiply
    
    // Step 2: Backpropagate error through hidden layers
    FOR l = L-1 DOWN TO 1:
        // Propagate error backward: δˡ = (Wˡ⁺¹)ᵀ δˡ⁺¹ ⊙ σ'(zˡ)
        δ[l] ← (W[l+1]ᵀ · δ[l+1]) ⊙ σ'[l](z[l])
    
    // Step 3: Compute gradients for weights and biases
    FOR l = 1 TO L:
        ∂L/∂W[l] ← δ[l] ⊗ a[l-1]ᵀ   // Outer product
        ∂L/∂b[l] ← δ[l]
    
    RETURN ∂L/∂W, ∂L/∂b
```

### Full Training Loop with Backpropagation

```
ALGORITHM: Neural Network Training with Backpropagation
─────────────────────────────────────────────────────────────────

INPUT:
    X: Training data of shape (n_samples, n_input)
    Y: Target values of shape (n_samples, n_output)
    architecture: List of layer sizes [n_input, n_hidden₁, ..., n_output]
    learning_rate: η
    n_epochs: Number of training epochs
    batch_size: Mini-batch size

OUTPUT:
    W, b: Trained weights and biases

PROCEDURE:
    1. // Initialize weights (Xavier/He initialization)
       FOR l = 1 TO L:
           W[l] ← random_normal(0, √(2/n_in)) × shape(n_out, n_in)
           b[l] ← zeros(n_out)
    
    2. // Training loop
       FOR epoch = 1 TO n_epochs:
           
           // Shuffle data
           shuffle(X, Y)
           
           // Mini-batch training
           FOR each batch (X_batch, Y_batch):
               
               // Initialize gradient accumulators
               ∂L/∂W_total ← [zeros_like(W[l]) for each layer]
               ∂L/∂b_total ← [zeros_like(b[l]) for each layer]
               
               // Accumulate gradients over batch
               FOR each (x, y) in (X_batch, Y_batch):
                   
                   // Backpropagation for single sample
                   ∂L/∂W, ∂L/∂b ← backpropagation(x, y, W, b)
                   
                   // Accumulate
                   FOR l = 1 TO L:
                       ∂L/∂W_total[l] ← ∂L/∂W_total[l] + ∂L/∂W[l]
                       ∂L/∂b_total[l] ← ∂L/∂b_total[l] + ∂L/∂b[l]
               
               // Average gradients
               FOR l = 1 TO L:
                   ∂L/∂W_total[l] ← ∂L/∂W_total[l] / batch_size
                   ∂L/∂b_total[l] ← ∂L/∂b_total[l] / batch_size
               
               // Update weights (gradient descent)
               FOR l = 1 TO L:
                   W[l] ← W[l] - η × ∂L/∂W_total[l]
                   b[l] ← b[l] - η × ∂L/∂b_total[l]
    
    3. RETURN W, b
```

### Common Activation Functions and Their Derivatives

```
FUNCTION: Activation Functions and Derivatives
─────────────────────────────────────────────────────────────────

SIGMOID:
    σ(z) = 1 / (1 + exp(-z))
    σ'(z) = σ(z) × (1 - σ(z))

TANH:
    σ(z) = (exp(z) - exp(-z)) / (exp(z) + exp(-z))
    σ'(z) = 1 - σ(z)²

ReLU (Rectified Linear Unit):
    σ(z) = max(0, z)
    σ'(z) = { 1  if z > 0
            { 0  if z ≤ 0

LEAKY ReLU:
    σ(z) = { z        if z > 0
           { α × z    if z ≤ 0    (α typically 0.01)
    σ'(z) = { 1  if z > 0
            { α  if z ≤ 0

SOFTMAX (for output layer with multiple classes):
    σ(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ)
    // Jacobian is more complex; often combined with cross-entropy loss
```

### Loss Functions

```
FUNCTION: Common Loss Functions and Their Gradients
─────────────────────────────────────────────────────────────────

MEAN SQUARED ERROR (Regression):
    L(ŷ, y) = (1/2) × ||ŷ - y||²
    ∂L/∂ŷ = ŷ - y

BINARY CROSS-ENTROPY (Binary Classification):
    L(ŷ, y) = -[y log(ŷ) + (1-y) log(1-ŷ)]
    ∂L/∂ŷ = -y/ŷ + (1-y)/(1-ŷ)
    
    // With sigmoid output, simplifies to:
    ∂L/∂z = ŷ - y

CATEGORICAL CROSS-ENTROPY (Multiclass):
    L(ŷ, y) = -Σᵢ yᵢ log(ŷᵢ)
    
    // With softmax output:
    ∂L/∂z = ŷ - y  (where y is one-hot encoded)
```

## Mathematical Foundation

### The Chain Rule

Backpropagation is an efficient application of the chain rule:

$$\frac{\partial L}{\partial w_{ij}^{(l)}} = \frac{\partial L}{\partial a_j^{(l)}} \cdot \frac{\partial a_j^{(l)}}{\partial z_j^{(l)}} \cdot \frac{\partial z_j^{(l)}}{\partial w_{ij}^{(l)}}$$

### The Error Signal (δ)

We define the error signal at layer $l$:

$$\delta_j^{(l)} = \frac{\partial L}{\partial z_j^{(l)}}$$

### Backpropagation Equations

For output layer $L$:
$$\delta^{(L)} = \nabla_a L \odot \sigma'(z^{(L)})$$

For hidden layers:
$$\delta^{(l)} = ((W^{(l+1)})^T \delta^{(l+1)}) \odot \sigma'(z^{(l)})$$

Gradients:
$$\frac{\partial L}{\partial W^{(l)}} = \delta^{(l)} (a^{(l-1)})^T$$
$$\frac{\partial L}{\partial b^{(l)}} = \delta^{(l)}$$

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Forward pass | $O(\sum_l n_l \times n_{l-1})$ | $O(\sum_l n_l)$ |
| Backward pass | $O(\sum_l n_l \times n_{l-1})$ | $O(\sum_l n_l)$ |
| Full epoch | $O(N \times \sum_l n_l \times n_{l-1})$ | $O(\sum_l n_l^2)$ |

Where $N$ = samples, $n_l$ = neurons in layer $l$.

## Common Issues and Solutions

```
VANISHING GRADIENTS:
    Problem: Gradients become tiny in deep networks (especially with sigmoid/tanh)
    Solutions:
    - Use ReLU activation
    - Use batch normalization
    - Use residual connections (skip connections)
    - Proper weight initialization

EXPLODING GRADIENTS:
    Problem: Gradients become very large, causing unstable training
    Solutions:
    - Gradient clipping: ||g|| ← min(||g||, threshold) × (g/||g||)
    - Lower learning rate
    - Proper weight initialization

DEAD NEURONS (ReLU):
    Problem: ReLU outputs 0 for all inputs → gradient = 0 → neuron never updates
    Solutions:
    - Use Leaky ReLU or ELU
    - Careful weight initialization
    - Lower learning rate
```

## Key Insights

1. **Efficiency**: Backprop computes all gradients in $O(W)$ time, where $W$ is the number of weights—same as a forward pass!

2. **Dynamic Programming**: Backprop is essentially dynamic programming, reusing intermediate computations.

3. **Automatic Differentiation**: Modern frameworks (PyTorch, TensorFlow) implement backprop automatically.

4. **Credit Assignment**: Backprop solves the credit assignment problem—determining how much each weight contributed to the error.

5. **Locality**: Each weight update depends only on local information (connected activations and incoming error signal).

## References

- **Rumelhart, D. E., Hinton, G. E., & Williams, R. J.** (1986). *Learning representations by back-propagating errors*. Nature, 323, 533-536.
- **Goodfellow, I., Bengio, Y., & Courville, A.** (2016). *Deep Learning*, Chapter 6. MIT Press. [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/)
- **Nielsen, M.** (2015). *Neural Networks and Deep Learning*, Chapter 2. [http://neuralnetworksanddeeplearning.com/](http://neuralnetworksanddeeplearning.com/)
- **LeCun, Y., Bottou, L., Orr, G. B., & Müller, K.-R.** (1998). *Efficient BackProp*. In Neural Networks: Tricks of the Trade.
- **Glorot, X., & Bengio, Y.** (2010). *Understanding the difficulty of training deep feedforward neural networks*. AISTATS.
