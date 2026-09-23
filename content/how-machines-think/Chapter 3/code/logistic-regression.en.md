---
title: "⚡ Logistic Regression from Scratch"
weight: 81
description: "Interactive demonstration: how to build a logistic regression model from scratch to predict missed appointments."
date:
draft: false
slug: "logistic-regression-from-scratch"
---

These are Noah's notes on how to implement a logistic regression model from scratch, with NumPy and gradient descent. The notebook applies it to the problem of the chapter: predicting which Physiotherapy patients at Minermont will miss their appointment.

The interactive notebook includes:

- Synthetic appointment data (age, days since the last visit, distance, time, first visit, previous no-shows) and a first exploration.
- Stratified split into training and test sets, and feature scaling with the training statistics only.
- The sigmoid function and the log loss, with examples of how it punishes confident mistakes.
- Training with gradient descent and the evolution of the cost.
- Evaluation with the confusion matrix, sensitivity, specificity, PPV and NPV, and the effect of the decision threshold.
- Interpretation of the weights as odds ratios, and predictions for new patients.

{{< isolate name="35LogisticRegression" params=`lang="en"` width="100%" height="720" title="Logistic Regression (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1iV-FIGyUQxlq4dlgI1m2RotkGU8_4Xs_)

### Bibliography

- **scikit-learn User Guide – Logistic regression**: The model, its cost function and its regularized variants. [https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression)
- **Google ML Crash Course – Logistic regression**: The sigmoid, the log loss and how probabilities are computed. [https://developers.google.com/machine-learning/crash-course/logistic-regression](https://developers.google.com/machine-learning/crash-course/logistic-regression)
- **Google ML Crash Course – Classification**: Thresholds, the confusion matrix and the metrics derived from it. [https://developers.google.com/machine-learning/crash-course/classification](https://developers.google.com/machine-learning/crash-course/classification)
- **NumPy – Random Generator**: `default_rng`, `binomial`, `poisson` and `gamma`, used to generate the synthetic appointments. [https://numpy.org/doc/stable/reference/random/generator.html](https://numpy.org/doc/stable/reference/random/generator.html)
