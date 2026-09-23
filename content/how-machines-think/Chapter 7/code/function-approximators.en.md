---
title: "⚡ Neural Networks as Function Approximators"
weight: 83
description: "Interactive demonstration: ReLU neurons as basis functions, piecewise-linear approximation, the universal approximation theorem and why depth helps."
date:
draft: false
slug: "neural-networks-function-approximators"
---

In her notes (section 7.6), Martha describes neural networks as what they are mathematically: function approximators that combine simple building blocks. The universal approximation theorem says that a network with a single, wide enough hidden layer can approximate any continuous function on a bounded interval as closely as we want. This notebook shows why, with ReLU neurons and NumPy.

The interactive notebook includes:

- The building block: a ReLU neuron as a hinged ruler.
- Adding hinges: piecewise-linear approximations of a curve, and how the error falls as we add neurons.
- Letting a trained network choose where to put its hinges, and what training does not guarantee.
- Why depth helps: stacking layers of just 2 neurons multiplies the number of linear pieces.

{{< isolate name="7NeuralNetworksAsFunctionApproximators" params=`lang="en"` width="100%" height="720" title="Neural Networks as Function Approximators (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1gWxXhsNbjMtGcoo46b8yWOeWQ3Cal1TK)

### Bibliography

- **Cybenko, G. (1989). Approximation by superpositions of a sigmoidal function.** *Mathematics of Control, Signals and Systems*, 2(4), 303–314. [https://doi.org/10.1007/BF02551274](https://doi.org/10.1007/BF02551274)
- **Hornik, K., Stinchcombe, M. and White, H. (1989). Multilayer feedforward networks are universal approximators.** *Neural Networks*, 2(5), 359–366. [https://doi.org/10.1016/0893-6080(89)90020-8](https://doi.org/10.1016/0893-6080(89)90020-8)
- **Telgarsky, M. (2016). Benefits of depth in neural networks.** *Proceedings of the 29th Conference on Learning Theory*, PMLR 49, 1517–1539. The "tent" construction. [https://proceedings.mlr.press/v49/telgarsky16.html](https://proceedings.mlr.press/v49/telgarsky16.html)
