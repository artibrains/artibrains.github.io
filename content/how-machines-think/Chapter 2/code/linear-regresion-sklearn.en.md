---
title: "⚡ Linear Regression with sklearn"
weight: 68
description: "Interactive demonstration: how to build a linear regression model using the scikit-learn library."
date:
draft: false 
slug: "linear-regression-sklearn"
---

These are Noah's notes on how to implement a linear regression model using the scikit-learn library. This demonstration will help you understand how scikit-learn simplifies the process of training, evaluating, and using linear regression models.

The interactive notebook includes:

- Synthetic data generated from a line we plant ourselves ($y = 4 + 3x$), so the result can be checked.  
- Splitting the data into training and test sets with `train_test_split`.  
- Training a `LinearRegression` model with a single call to `fit()`, and comparing what it learns with the planted line.  
- Evaluation on unseen data with MSE and R², and a comparison with the training error.  
- Visualization of the training data, the test data and the regression line.  
- Predictions for new data, and the difference between interpolation and extrapolation.

{{< isolate name="26LinearRegresionSklearn" params=`lang="en"` width="100%" height="720" title="Linear Regression (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1_kpx_S6zrrAY2fGQnXMWtUfOBOPIg1nq)

### Bibliography

- **scikit-learn API Reference – `LinearRegression`**: Estimator parameters, attributes, and practical notes. [https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html)
- **scikit-learn User Guide – Train/Test Split**: Best practices for `train_test_split` and validation strategies. [https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation)
- **scikit-learn Metrics – Regression**: Definitions of the MSE and R² metrics used in the example. [https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics)
- **NumPy – Random sampling**: `np.random.rand`, `np.random.randn` and `np.random.seed`, used to generate the synthetic data. [https://numpy.org/doc/stable/reference/random/index.html](https://numpy.org/doc/stable/reference/random/index.html)
