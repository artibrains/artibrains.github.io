---
title: "3.4 Regularization Comparison: L1, L2, and Elastic Net"
description: "Interactive visualization of how different regularization types (L1, L2, Elastic Net) affect model weights and feature selection."
weight: 7
draft: false
slug: "regularization-comparison"
---

## Introduction

When training a predictive model, **regularization** helps us control its complexity by adding a penalty to the model's weights (coefficients). There are three main types of regularization: **L1 (Lasso)**, **L2 (Ridge)**, and **Elastic Net** (combination of both). Each has different effects on how the model selects and weights features.

{{< medical-context
    type="research"
    difficulty="intermediate"
    scenario="A medical team is developing a model to predict the risk of post-operative complications. They have many available variables: age, weight, blood pressure, glucose, cholesterol, smoking history, medications, etc. Not all are equally relevant, and some may be correlated. How to decide which features to keep and how to prevent the model from overfitting the training data?"
    highlight="Regularization not only prevents overfitting but can also help with **feature selection**. L1 (Lasso) tends to eliminate irrelevant features by driving their weights to zero. L2 (Ridge) reduces all weights but keeps all features. Elastic Net combines both approaches, being especially useful when there are many correlated features."
    steps="Generate Patient Data: Create a synthetic dataset with multiple biomarkers, some relevant and others irrelevant or redundant.|Compare Regularizations: Adjust the regularization factor (λ) and observe how L1, L2, and Elastic Net affect each feature's weights differently.|Visualize the Impact: See how the prediction curve and weight table change according to the type and strength of regularization applied."
>}}

## Interactive Demonstration

This tool allows you to compare the three main regularization types and see their effect in real-time:

{{< demo-wrapper title="Regularization Comparator" >}}

{{< regularization-comparison >}}

{{< /demo-wrapper >}}

## Mathematics Behind Regularization

### Cost Function with Regularization

For a regression problem, the cost function to minimize is:

$$
J(w) = \underbrace{\frac{1}{2m} \sum_{i=1}^{m} (h_w(x^{(i)}) - y^{(i)})^2}_{\text{Prediction error}} + \underbrace{\text{Penalty}}_{\text{Regularization}}
$$

Where the penalty is:
- **L1**: $\lambda \sum_{j=1}^{p} |w_j|$
- **L2**: $\frac{\lambda}{2} \sum_{j=1}^{p} w_j^2$
- **Elastic Net**: $\lambda \left[ \alpha \sum_{j=1}^{p} |w_j| + \frac{1-\alpha}{2} \sum_{j=1}^{p} w_j^2 \right]$

## Key Concepts

### L1 Regularization (Lasso)

{{% notice style="info" title="Lasso - Least Absolute Shrinkage and Selection Operator" %}}
**Penalty formula:** $\lambda \sum_{j=1}^{p} |w_j|$

L1 regularization adds the **sum of absolute values** of weights as a penalty. Its distinctive feature is that it can **drive weights exactly to zero**, automatically performing feature selection.

**Advantages:**
- Automatic feature selection
- More interpretable models with fewer variables
- Useful when many features are irrelevant

**Disadvantages:**
- Can be unstable with correlated features
- May eliminate important features if they're correlated

**When to use it:** When you suspect many features are irrelevant or when you need a very interpretable model with few variables.
{{% /notice %}}

### L2 Regularization (Ridge)

{{% notice style="info" title="Ridge Regression" %}}
**Penalty formula:** $\lambda \sum_{j=1}^{p} w_j^2$

L2 regularization adds the **sum of squares** of weights as a penalty. It reduces all weights toward zero but **never eliminates them completely**.

**Advantages:**
- Handles correlated features well
- More stable and smooth solution
- Reduces all weights proportionally

**Disadvantages:**
- Does not perform feature selection
- Keeps all variables, even irrelevant ones

**When to use it:** When most features are relevant or when there's multicollinearity (correlated features) and you want to keep them all.
{{% /notice %}}

### Elastic Net Regularization

{{% notice style="info" title="Elastic Net - Best of Both Worlds" %}}
**Penalty formula:** $\lambda \left[ \alpha \sum_{j=1}^{p} |w_j| + (1-\alpha) \sum_{j=1}^{p} w_j^2 \right]$

Elastic Net combines L1 and L2 with an $\alpha$ parameter that controls the balance between both ($\alpha = 1$ is pure L1, $\alpha = 0$ is pure L2).

**Advantages:**
- Inherits advantages of both L1 and L2
- Performs feature selection like L1
- Handles correlations like L2
- More flexible and robust

**Disadvantages:**
- One additional hyperparameter ($\alpha$) to tune
- Somewhat more complex to understand

**When to use it:** When you have many features, some correlated, and want to perform feature selection robustly. It's the most versatile option in practice.
{{% /notice %}}

## Visual Comparison

| Aspect | L1 (Lasso) | L2 (Ridge) | Elastic Net |
|--------|------------|------------|-------------|
| **Penalty shape** | Sum of absolute values | Sum of squares | Combination of both |
| **Feature selection** | ✅ Yes (weights → 0) | ❌ No (only reduces) | ✅ Yes (but smoother) |
| **Correlated features** | ⚠️ Can be unstable | ✅ Handles well | ✅ Handles well |
| **Interpretability** | ⭐⭐⭐ High | ⭐⭐ Medium | ⭐⭐⭐ High |
| **Stability** | ⭐⭐ Medium | ⭐⭐⭐ High | ⭐⭐⭐ High |
| **Number of parameters** | 1 (λ) | 1 (λ) | 2 (λ, α) |

### Why does L1 drive weights to zero?

The geometry of L1 regularization creates corners in the optimization space. When gradient descent searches for the minimum, it's more likely to "land" on a corner where some weights are exactly zero.

In contrast, L2 has circular/elliptical geometry without corners, so weights are reduced but rarely reach exactly zero.

## Suggested Experiments

Use the interactive demonstration to:

1. **Effect of λ**: Start with λ = 0 (no regularization) and gradually increase it. Observe how weights are reduced.

2. **L1 vs L2 Comparison**: With the same λ, compare how L1 eliminates features while L2 only reduces them.

3. **Irrelevant Features**: Observe how L1 and Elastic Net identify and eliminate features with low predictive power.

4. **Multicollinearity**: When two features are correlated, L1 may arbitrarily eliminate one, while L2 and Elastic Net keep both with reduced weights.

5. **Balance in Elastic Net**: Adjust the α parameter to see how it behaves more like L1 (α → 1) or more like L2 (α → 0).

{{% notice style="warning" title="Important in Medicine" %}}
Automatic feature selection by L1/Elastic Net should be complemented with medical knowledge. A model might eliminate a variable that doctors know is clinically relevant. Always validate results with domain experts.
{{% /notice %}}

## References

To delve deeper into regularization, see:
- **[Classification and Evaluation Bibliography]({{% relref "/how-machines-think/Chapter 3/bibliography/bibliography-classification-evaluation.en.md" %}})**: Resources on regularization, cross-validation, and complexity control.

{{< terminal >}}
