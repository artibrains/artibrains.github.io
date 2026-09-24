---
title: "⚡ Gradient Descent: Batch, Mini-batch and Stochastic"
weight: 70
description: "Interactive demonstration: batch, mini-batch and stochastic gradient descent, epochs, shuffling, the learning rate, stopping criteria, initialization and learning-rate reduction."
date:
draft: false
slug: "gradient-descent-variants-from-scratch"
---

Noah's notes in chapter 2 describe the decisions around gradient descent: how many examples each update uses, how many epochs, which learning rate, where to start and when to stop. This notebook implements all of them with a single training loop, on 1,000 days of patients and masks, and measures the effect of each one.

The interactive notebook includes:

- One training loop for batch, mini-batch and stochastic descent.
- Updates per epoch and the cost after each epoch for batches of 1,000, 100, 10 and 1 example.
- The paths of the three variants on the cost surface.
- Why the data is shuffled at the start of every epoch.
- Learning rates that are too small, good, too large and divergent, as in Noah's figure.
- Three stopping criteria: cost change, gradient size and a maximum number of updates.
- Random and heuristic initializations.
- Watching the cost on a validation set and halving the learning rate when it stops improving.

{{< isolate name="26GradientDescentVariants" params=`lang="en"` width="100%" height="720" title="Gradient Descent: Batch, Mini-batch and Stochastic (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1QeALYKe-oQBy13U20kxESxnqcHt4cUI0)

### Bibliography

- **Robbins, H. and Monro, S. (1951). A stochastic approximation method.** *The Annals of Mathematical Statistics*, 22(3), 400–407. [https://doi.org/10.1214/aoms/1177729586](https://doi.org/10.1214/aoms/1177729586)
- **Bottou, L. (2010). Large-scale machine learning with stochastic gradient descent.** *Proceedings of COMPSTAT 2010*, 177–186. Springer. [https://doi.org/10.1007/978-3-7908-2604-3_16](https://doi.org/10.1007/978-3-7908-2604-3_16)
- **Ruder, S. (2016). An overview of gradient descent optimization algorithms.** arXiv:1609.04747. [https://arxiv.org/abs/1609.04747](https://arxiv.org/abs/1609.04747)
