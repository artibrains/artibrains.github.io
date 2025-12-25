---
title: "⚡ Linear Regression from Scratch"
weight: 65
description: "Interactive demonstration: how to build a linear regression model from scratch and apply it."
date: 
draft: false
slug: "linear-regression-from-scratch"
---

These are Luis's notes on how to implement a linear regression model from scratch, using gradient descent and early stopping. This demonstration will help you understand the fundamentals of linear regression and how it is applied to real-world problems.

The interactive notebook includes:

- Preparation and visualization of synthetic data.  
- Manual implementation of the linear regression model.  
- Training using gradient descent with early stopping.  
- Visualization of the learning process and results.  
- Example of prediction for new data.

{{< isolate name="26LinearRegresion" params=`lang="en"` width="100%" height="720" title="Linear Regression (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1ByemaftzReAXxfvmohqu_g1AZ1y9KrBA)

### Bibliography

- **scikit-learn Documentation – Linear Models**: Ordinary least squares, assumptions, and API usage. [https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares](https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares)
- **NumPy Reference – `numpy.linalg.lstsq`**: Linear algebra solver leveraged for implementing least squares fits. [https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html](https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html)
- **Matplotlib Tutorials – Pyplot**: Guidelines for creating the diagnostic plots used in the notebook. [https://matplotlib.org/stable/tutorials/introductory/pyplot.html](https://matplotlib.org/stable/tutorials/introductory/pyplot.html)
- **Google ML Crash Course – Linear Regression**: Conceptual refresher on gradient descent and error analysis. [https://developers.google.com/machine-learning/crash-course/linear-regression](https://developers.google.com/machine-learning/crash-course/linear-regression)
