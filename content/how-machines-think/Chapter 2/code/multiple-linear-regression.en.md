---
title: "⚡ Multiple Linear Regression from Scratch"
weight: 69
description: "Interactive demonstration: a model with five variables for the masks of Minermont, gradient descent with and without scaling, the exact solution, the test and the difference between MSE and MAE."
date:
draft: false
slug: "multiple-linear-regression-from-scratch"
---

In the book the mask model grows from one variable to five: patients, temperature, emergencies, health alerts and weekends. This notebook builds that model from scratch on a year and a half of synthetic days that follow the book's equation, and shows why the variables must be scaled before gradient descent and why the choice of cost function matters when the records contain errors.

The interactive notebook includes:

- Martha's worked example: a prediction with five variables as a product of vectors.
- 547 synthetic days, with the winters and the health alerts of the book.
- Gradient descent on the raw variables, and why it crawls.
- The same algorithm with standardized variables, and the exact least-squares solution.
- The evaluation on three months the model has not seen.
- A few wrong records: how they spoil the MSE fit and why the MAE resists them.
- The forecast for the book's week, compared with Liam's historical ranges.

{{< isolate name="26MultipleLinearRegression" params=`lang="en"` width="100%" height="720" title="Multiple Linear Regression from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/10nFyiqda8wlO0YatqxMUMp2kVotPYs8x)

### Bibliography

- **James, G., Witten, D., Hastie, T. and Tibshirani, R. (2021). *An Introduction to Statistical Learning* (2nd ed.).** Springer. Chapter 3, linear regression. [https://www.statlearning.com/](https://www.statlearning.com/)
- **Hastie, T., Tibshirani, R. and Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.).** Springer. Chapter 3. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **Koenker, R. and Bassett, G. (1978). Regression quantiles.** *Econometrica*, 46(1), 33–50. The absolute-error (median) regression. [https://doi.org/10.2307/1913643](https://doi.org/10.2307/1913643)
