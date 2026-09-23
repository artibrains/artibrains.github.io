---
title: "⚡ Perceptron and Multilayer Networks from Scratch"
weight: 82
description: "Interactive demonstration: the perceptron and its learning rule, the XOR problem, backpropagation and activation functions, with NumPy only."
date:
draft: false
slug: "perceptron-multilayer-networks-from-scratch"
---

In chapter 6 the Minermont team meets neural networks at AIA. Hazel starts with Rosenblatt's perceptron and its famous limitation, and then shows how layers of neurons trained with backpropagation overcome it. This notebook builds all of it with NumPy, without any deep learning library, as in Emma's "level 0" (section 6.8).

The interactive notebook includes:

- The perceptron and its learning rule, trained on the logical AND and OR functions.
- The XOR problem: why no single straight line can solve it.
- A multilayer network that solves XOR, trained with backpropagation, and the non-linear boundary it learns.
- Activation functions: step, sigmoid, tanh and ReLU, and their derivatives.
- Martha's complete example (section 6.7): one forward pass, one backward pass and one weight update, number by number.
- Checking backpropagation against numerical derivatives.

{{< isolate name="6PerceptronAndMultilayerNetworks" params=`lang="en"` width="100%" height="720" title="Perceptron and Multilayer Networks from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1z3v_5mTINR8ZAr5y1NpVT7r10zfHY2pk)

### Bibliography

- **Rosenblatt, F. (1958). The perceptron: A probabilistic model for information storage and organization in the brain.** *Psychological Review*, 65(6), 386–408. [https://doi.org/10.1037/h0042519](https://doi.org/10.1037/h0042519)
- **Minsky, M. and Papert, S. (1969). Perceptrons: An Introduction to Computational Geometry.** MIT Press. The analysis of what a single perceptron cannot compute, XOR included.
- **Rumelhart, D. E., Hinton, G. E. and Williams, R. J. (1986). Learning representations by back-propagating errors.** *Nature*, 323, 533–536. [https://doi.org/10.1038/323533a0](https://doi.org/10.1038/323533a0)
