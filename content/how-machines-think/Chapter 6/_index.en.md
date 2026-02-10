---
title: "Chapter 6: Neural Networks"
description: "The Limit of Known Patterns: The Artificial Brain"
type: "chapter"
weight: 6
draft: false
slug: "neural-networks"
---

{{< chapter-subtitle >}}The Limit of Known Patterns: The Artificial Brain{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="6" >}}

In dermatology, Ethan recalls Hazel’s ImageNet moment and the team turns to neural networks to flag risky lesions while specialists stay in the loop.

This chapter demystifies neural networks: the perceptron as a building block, how gradients flow via backpropagation, and how architecture and hyperparameters shape learning.

1. **[The Perceptron: The Artificial Neuron]({{% relref "how-machines-think/Chapter 6/perceptron/perceptron.en.md" %}})**: Train a Perceptron on a simple 2D dataset and see how a linear decision rule emerges.

2. **[Backpropagation: The Engine of Learning]({{% relref "how-machines-think/Chapter 6/backpropagation/backpropagation.en.md" %}})**: You will visualize the **backpropagation** algorithm, the engine of learning in neural networks. You will understand how errors propagate backward through the network, allowing each neuron to adjust its connections and improve overall model performance.

2.1 **[Interactive Tutorial: Backpropagation Step by Step]({{% relref "how-machines-think/Chapter 6/backpropagation-tutorial/backpropagation-tutorial.en.md" %}})**: A guided, hands-on trainer where you compute the forward pass, calculate output error, propagate gradients backward, and update weights — step by step.

2.2 **[Classic Paper: "Learning representations by back-propagating errors"]({{% relref "how-machines-think/Chapter 6/backpropagation-paper/backpropagation-paper.en.md" %}})**: A concise note on Rumelhart, Hinton & Williams (1986), the paper that popularized backpropagation and demonstrated its practical power.

3. **[Neural Network Playground: Experimenting with Deep Learning]({{% relref "how-machines-think/Chapter 6/neural-network-playground/neural-network-playground.en.md" %}})**: Experience hands-on experimentation with TensorFlow Playground. Build, train, and visualize neural networks in your browser, exploring how architecture, hyperparameters, and data affect learning in real time.

### Algorithm Pseudocode

- **[📝 Perceptron Training Pseudocode]({{% relref "/how-machines-think/Chapter 6/code/pseudocode-perceptron.en.md" %}})**: The perceptron learning rule, convergence theorem, Pocket algorithm, and Voted Perceptron variants.
- **[📝 Backpropagation Pseudocode]({{% relref "/how-machines-think/Chapter 6/code/pseudocode-backpropagation.en.md" %}})**: Forward pass, backward pass, chain rule derivations, and full training loop with mini-batches.

### Mathematical Foundations

- **[📐 Mathematical Proof: The XOR Problem]({{% relref "how-machines-think/Chapter 6/xor-proof/xor-proof.en.md" %}})**: Explore the formal mathematical proof that single-layer perceptrons cannot solve the XOR problem, the insight that sparked the rise of multilayer networks.
- **[Perceptron Convergence Theorem]({{% relref "how-machines-think/Chapter 6/math/perceptron-convergence.en.md" %}})**: Rosenblatt–Novikoff mistake bounds proving the perceptron converges on linearly separable datasets.
- **[Backpropagation via the Chain Rule]({{% relref "how-machines-think/Chapter 6/math/backpropagation.en.md" %}})**: Jacobian-based derivation of the gradient recursions.

### Bibliography and Additional Resources

- **[📚 Neural Networks and Perceptron]({{% relref "how-machines-think/Chapter 6/bibliography/bibliography-neural-networks.en.md" %}})**: Verified resources and references on neural networks, Rosenblatt's perceptron and the backpropagation algorithm.


