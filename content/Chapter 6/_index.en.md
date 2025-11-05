---
title: "6 - Inside the Machine's Mind: Neural Networks"
type: "chapter"
weight: 6
draft: true
slug: "neural-networks"
---

After successfully implementing regression, classification, and clustering models, the Hospital Minermont team reaches a moment of reflection. They have seen what AI can do, but now they yearn to understand *how* it does it. What really happens inside those “black boxes”? How does a neural network learn from data?

Guided by Alma, the team embarks on a journey into the fundamentals of deep learning. They set aside complex architectures for a moment to focus on the two concepts that make it all possible: the artificial neuron and the algorithm that enables it to learn.

In this chapter, you will join them to demystify the inner workings of neural networks:

1. **[The Perceptron: The Artificial Neuron]({{% relref "Chapter 6/perceptron/perceptron.en.md" %}})**: You will start with the most basic building block. Using a simple diagnostic simulator, you will train a Perceptron to classify patients, discovering how this "neuron" learns to make binary decisions.

2. **[Backpropagation: The Conversation of Learning]({{% relref "Chapter 6/backpropagation/backpropagation.en.md" %}})**: You will visualize the **backpropagation** algorithm, the engine of learning in neural networks. You will understand how errors propagate backward through the network, allowing each neuron to adjust its connections and improve overall model performance, just as the team envisioned in their discussion.

### Mathematical Foundations

- **[📐 Mathematical Proof: The XOR Problem]({{% relref "Chapter 6/xor-proof/xor-proof.en.md" %}})**: Explore the formal mathematical proof that single-layer perceptrons cannot solve the XOR problem, the insight that sparked the rise of multilayer networks.
- **[Perceptron Convergence Theorem]({{% relref "Chapter 6/math/perceptron-convergence.en.md" %}})**: Rosenblatt–Novikoff mistake bounds proving the perceptron converges on linearly separable datasets.
- **[Backpropagation via the Chain Rule]({{% relref "Chapter 6/math/backpropagation.en.md" %}})**: Jacobian-based derivation of the gradient recursions powering the chapter’s interactive visualisation.

### Bibliography and Additional Resources

- **[📚 Neural Networks and Perceptron]({{% relref "Chapter 6/bibliography/bibliography-neural-networks.en.md" %}})**: Verified resources and references on neural networks, Rosenblatt's perceptron and the backpropagation algorithm.

Get ready to open the "black box" and grasp the fundamental principles that drive today's most advanced artificial intelligence technologies.
