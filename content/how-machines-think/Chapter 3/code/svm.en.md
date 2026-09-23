---
title: "⚡ SVM from Scratch"
weight: 83
description: "Interactive demonstration: how to build a linear support vector machine from scratch with the hinge loss."
date:
draft: false
slug: "svm-from-scratch"
---

These are Noah's notes on how to implement a linear support vector machine (SVM) from scratch, following the soft-margin formulation of Martha's notes. The notebook starts with the example of the book and then returns to the Physiotherapy no-shows.

The interactive notebook includes:

- The 14 points of the book's linear SVM figure, and the conditions that define the margin.
- The hinge loss, compared with the log loss of logistic regression.
- Training with gradient descent, which recovers the line of the book and its two support vectors.
- Soft margin: how $\lambda$ trades margin width for training errors when a suspicious point appears.
- k-fold cross-validation implemented by hand to choose $\lambda$ on the no-show data.
- Evaluation on the test set, comparison with logistic regression, and the effect of moving the threshold on the SVM score.

{{< isolate name="35SVM" params=`lang="en"` width="100%" height="720" title="SVM from scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1vgHPhgtuW12ce8KO7XArPplsnuxVUHD9)

### Bibliography

- **Cortes, C. and Vapnik, V. (1995). Support-vector networks.** *Machine Learning*, 20, 273–297. The paper that introduced the soft-margin SVM. [https://doi.org/10.1007/BF00994018](https://doi.org/10.1007/BF00994018)
- **Shalev-Shwartz, S., Singer, Y., Srebro, N. and Cotter, A. (2011). Pegasos: primal estimated sub-gradient solver for SVM.** *Mathematical Programming*, 127, 3–30. Training an SVM with (sub)gradient descent, as in the notebook. [https://doi.org/10.1007/s10107-010-0420-4](https://doi.org/10.1007/s10107-010-0420-4)
- **scikit-learn User Guide – SVM, mathematical formulation**: The primal and dual problems and the role of `C`. [https://scikit-learn.org/stable/modules/svm.html#mathematical-formulation](https://scikit-learn.org/stable/modules/svm.html#mathematical-formulation)
