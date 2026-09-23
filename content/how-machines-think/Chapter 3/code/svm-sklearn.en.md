---
title: "⚡ SVM with sklearn"
weight: 84
description: "Interactive demonstration: support vector machines with scikit-learn, the kernel trick and hyperparameter search."
date:
draft: false
slug: "svm-sklearn"
---

These are Noah's notes on how to use support vector machines with scikit-learn: the example of the book with `SVC`, the kernel trick for curved boundaries, and the choice between a linear and an RBF kernel for the no-show problem.

The interactive notebook includes:

- The book's example solved with `SVC`, and the effect of `C` (the book's $\lambda$) on the margin.
- The kernel trick: data that no straight line can separate, the explicit transformation to 3D, and the linear, polynomial and RBF kernels.
- The parameter `gamma` of the RBF kernel, from underfitting to overfitting.
- `GridSearchCV` with stratified 5-fold cross-validation to choose `C` and `gamma` on the no-show data.
- Final comparison with logistic regression (accuracy, sensitivity, specificity and AUC), including `class_weight`.
- Calibrated probabilities with `SVC(probability=True)` for new patients.

{{< isolate name="35SVMSklearn" params=`lang="en"` width="100%" height="720" title="SVM with sklearn (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1-4l4kZlKXQxdkF--t8pPuURTVnNb_FsB)

### Bibliography

- **scikit-learn Reference – `SVC`**: Parameters (`kernel`, `C`, `gamma`, `class_weight`, `probability`) and attributes such as the support vectors. [https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html](https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html)
- **scikit-learn User Guide – Kernel functions**: Linear, polynomial, RBF and sigmoid kernels. [https://scikit-learn.org/stable/modules/svm.html#kernel-functions](https://scikit-learn.org/stable/modules/svm.html#kernel-functions)
- **scikit-learn Example – RBF SVM parameters**: How `C` and `gamma` shape the decision boundary. [https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html](https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html)
- **scikit-learn – Tuning hyperparameters**: `GridSearchCV` and cross-validated search. [https://scikit-learn.org/stable/modules/grid_search.html](https://scikit-learn.org/stable/modules/grid_search.html)
- **scikit-learn – Probability calibration**: How scores are turned into probabilities. [https://scikit-learn.org/stable/modules/calibration.html](https://scikit-learn.org/stable/modules/calibration.html)
