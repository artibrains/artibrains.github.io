---
title: "⚡ Logistic Regression with sklearn"
weight: 82
description: "Interactive demonstration: logistic regression with scikit-learn, regularization and k-fold cross-validation."
date:
draft: false
slug: "logistic-regression-sklearn"
---

These are Noah's notes on how to solve the no-show problem with scikit-learn, and on the two tools of the chapter that a real project cannot do without: regularization and k-fold cross-validation.

The interactive notebook includes:

- A `Pipeline` that chains `StandardScaler` and `LogisticRegression`, so the test set never leaks into training.
- Evaluation with the confusion matrix, the classification report and the ROC curve with its AUC.
- A reproducible case of overfitting: few patients and many irrelevant variables.
- L2 and L1 regularization, and how scikit-learn's `C` relates to the $\lambda$ of the book.
- Choosing $\lambda$ with stratified 5-fold cross-validation over the book's logarithmic grid, and a final evaluation on an untouched test set.
- Elastic Net with correlated variables: the two penalties together, how L1 splits a group of correlated columns and how stable its choice is across bootstrap samples.
- Imbalanced classes: moving the threshold versus `class_weight='balanced'`.

{{< isolate name="35LogisticRegressionSklearn" params=`lang="en"` width="100%" height="720" title="Logistic Regression with sklearn (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1djr1uNOr8TdhlrcFPyxgfLgtFeWCevKl)

### Bibliography

- **scikit-learn Reference – `LogisticRegression`**: Parameters (`C`, `penalty`, `solver`, `class_weight`) and attributes of the estimator. [https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html)
- **scikit-learn – Cross-validation**: k-fold, stratified folds and why the test set must be kept apart. [https://scikit-learn.org/stable/modules/cross_validation.html](https://scikit-learn.org/stable/modules/cross_validation.html)
- **scikit-learn – Pipelines**: Chaining preprocessing and model to avoid data leakage. [https://scikit-learn.org/stable/modules/compose.html#pipeline](https://scikit-learn.org/stable/modules/compose.html#pipeline)
- **Zou, H. and Hastie, T. (2005). Regularization and variable selection via the elastic net.** *Journal of the Royal Statistical Society: Series B*, 67(2), 301–320. [https://doi.org/10.1111/j.1467-9868.2005.00503.x](https://doi.org/10.1111/j.1467-9868.2005.00503.x)
- **Efron, B. (1979). Bootstrap methods: another look at the jackknife.** *The Annals of Statistics*, 7(1), 1–26. [https://doi.org/10.1214/aos/1176344552](https://doi.org/10.1214/aos/1176344552)
- **scikit-learn – ROC metrics**: The ROC curve and the area under it. [https://scikit-learn.org/stable/modules/model_evaluation.html#roc-metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#roc-metrics)
