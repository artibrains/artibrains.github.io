---
title: "⚡ Linear Regression with sklearn"
weight: 62
description: "Interactive demonstration: how to build a linear regression model using the scikit-learn library."
date:
draft: false 
slug: "linear-regression-sklearn"
---

These are Luis's notes on how to implement a linear regression model using the scikit-learn library. This demonstration will help you understand how scikit-learn simplifies the process of training, evaluating, and using linear regression models.

The interactive notebook includes:

- Preparation and visualization of synthetic data.  
- Implementation of a linear regression model with scikit-learn.  
- Splitting the data into training and test sets.  
- Model training and evaluation.  
- Visualization of data and the regression line.  
- Example of prediction for new data.

{{< isolate name="26LinearRegresionSklearn" params=`lang="en"` width="100%" height="720" title="Linear Regression (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1_kpx_S6zrrAY2fGQnXMWtUfOBOPIg1nq)

### Bibliography

- **scikit-learn API Reference – `LinearRegression`**: Estimator parameters, attributes, and practical notes. [https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html)
- **scikit-learn User Guide – Train/Test Split**: Best practices for `train_test_split` and validation strategies. [https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation)
- **scikit-learn Metrics – Regression**: Definitions of R², MAE, and other metrics used in the example. [https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics)
- **Pandas Documentation – DataFrame**: Data preparation utilities referenced in the notebook. [https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)
