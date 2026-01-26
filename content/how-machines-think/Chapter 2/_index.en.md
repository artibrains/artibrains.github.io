---
title: "2. Machine Learning Models"
description: "From theory to practice: Building the first predictive models."
weight: 2
slug: "machine-learning-models"
---

After a failed first attempt with an overly complex system, Victor, Marta, Luis, and Carlos learn a fundamental lesson: sometimes, the simplest solution is the most powerful. Guided by the advice of Alma García of AIA, the team embarks on implementing a linear regression model to predict the need for medical supplies.

This new approach is not only more manageable but also transparent and interpretable, gaining the trust of even the most skeptical, like Dr. Javier.

## What Will You Learn?

In this chapter, we delve into the heart of machine learning through the experience of the hospital team. You will follow their steps from manual adjustments to automated learning.

1. **[Fit a Linear Regression Model]({{% relref "/how-machines-think/Chapter 2/linear-regression/linear_regresion_game.en.md" %}})**  
   Put yourself in the shoes of Marta and Luis, manually adjusting the parameters of a model to predict mask consumption. Understand the relationship between slope, intercept, and prediction.

2. **[Visualize Gradient Descent]({{% relref "/how-machines-think/Chapter 2/metodo-descenso-gradiente/Metodo-del-descenco-del-gradiente.en.md" %}})**  
   Grasp the intuition behind the algorithm the team used to automatically train their model. See how the system "descends" the error mountain to find the optimal parameters.

3. **[Comparing Cost Functions]({{% relref "how-machines-think/Chapter 2/error-comparison/error_comparation.en.md" %}})**  
   Explore why the choice of cost function (MSE vs. MAE) was a key point in the team's discussion and how it affects model behavior, especially when dealing with outliers.

### Practical Implementation

- **[Linear Regression from Scratch]({{% relref "/how-machines-think/Chapter 2/code/linear-regresion.en.md" %}})**: Build a linear regression model from scratch, applying the concepts learned to a real problem.
- **[Linear Regression with Scikit-Learn]({{% relref "/how-machines-think/Chapter 2/code/linear-regresion-sklearn.en.md" %}})**: Use the industry-standard library to implement a linear regression model efficiently.

### Algorithm Pseudocode

- **[📝 Linear Regression Pseudocode]({{% relref "/how-machines-think/Chapter 2/code/pseudocode-linear-regression.en.md" %}})**: Detailed pseudocode for linear regression with normal equation and gradient descent approaches.
- **[📝 Gradient Descent Pseudocode]({{% relref "/how-machines-think/Chapter 2/code/pseudocode-gradient-descent.en.md" %}})**: Step-by-step pseudocode for batch, stochastic, and mini-batch gradient descent algorithms.

### Mathematical Foundations

- **[Taking Derivatives]({{% relref "how-machines-think/Chapter 2/math/derivatives.en.md" %}})**: A concise reference of common derivative rules and an interactive widget to compute $f'(x)$ and explore step-by-step explanations via WolframAlpha.
- **[Partial Derivatives and Gradients]({{% relref "how-machines-think/Chapter 2/math/gradients.en.md" %}})**: From partial derivatives to the gradient vector, geometric intuition, and a widget to compute $\nabla f$ symbolically.

### Bibliography and Additional Resources

- **[Linear Regression Resources]({{% relref "/how-machines-think/Chapter 2/bibliography/bibliography-linear-regresion.en.md" %}})**: Deepen your understanding from theory to practice.
- **[Gradient Descent Resources]({{% relref "/how-machines-think/Chapter 2/bibliography/bibliography-gradient-descent.en.md" %}})**: From fundamentals to advanced optimization techniques.
