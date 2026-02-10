---
Title: "2.2 - Comparing Absolute Error (L1) vs. Mean Squared Error (L2)"
Weight: 21
Description: "Interactive demo to understand the differences between L1 and L2 error functions and how they affect the evaluation of machine learning models in real-world settings."
Date: 2025-04-17
draft: false
slug: "error-comparison-l1-vs-l2"
---

## Introduction

When developing machine learning models, the choice of error function is crucial. This demo will help you visually understand the differences between Mean Absolute Error (L1) and Mean Squared Error (L2), and how each responds differently to outliers.

{{< medical-context
type="research"
level="intermediate"
scenario="You are developing a model to predict delivery time based on factors such as distance, traffic, and weather. Some routes have extreme or inconsistent values (incidents, delays) that can skew the evaluation."
highlight="- **L1 (MAE)** stays stable under outliers: big misses don’t dominate the average.\n- **L2 (MSE)** punishes big misses much more: great when large errors are especially costly.\n\nWatch how the fitted lines and the average errors react when you introduce outliers."
>}}

{{< demo-wrapper title="L1 vs L2 Error Function Comparison" >}}

{{< error-comparison-game >}}

<h3>How to use the simulation</h3>

<ul>
<li><strong>Toggle between L1 and L2</strong> to compare how the error penalty changes.</li>
<li><strong>Adjust the controls</strong> to modify the data and watch the metrics respond.</li>
<li><strong>Read the curves</strong>: L2 grows faster with large errors; L1 is more stable under outliers.</li>
</ul>

{{< /demo-wrapper >}}

## Fundamental Concepts

{{% notice style="info" title="Mean Absolute Error (L1 - MAE)" %}}
Mean Absolute Error measures the average of the absolute differences between actual and predicted values:

**Formula**: `MAE = (1/n) × Σ|yi - ŷi|`

**Characteristics:**
- **Robust against outliers**: Extreme values do not dominate the calculation
- **Intuitive interpretation**: Every unit of error counts equally
- **Linear**: The error grows proportionally with the deviation
- **Useful for**: Data with measurement errors or exceptional cases
{{% /notice %}}

{{% notice style="info" title="Mean Squared Error (L2 - MSE)" %}}
The Mean Squared Error measures the average of the squares of the differences:

**Formula**: `MSE = (1/n) × Σ(yi - ŷi)²`

**Characteristics:**
- **Sensitive to outliers**: Large errors are penalized exponentially
- **Precision-boosting**: Aggressively minimizes large deviations
- **Quadratic**: The penalty grows exponentially with the error
- **Useful for**: When large errors are especially costly
{{% /notice %}}

### Selection Guide

{{% notice style="tip" title="When to use L1?" %}}
{{% /notice %}}

{{% notice style="tip" title="When to use L2?" %}}
 
- **Clean Data**: The dataset is relatively reliable
- **Extreme Accuracy**: You need to heavily penalize incorrect predictions
- **Optimization**: L2 is differentiable and facilitates optimization algorithms
{{% /notice %}}

{{% notice style="warning" title="High-stakes considerations" %}}
In high-stakes or cost-sensitive applications, the choice is especially important:

- **Anomaly detection**: L2 can strongly discourage large misses on rare but critical events
- **Noisy measurements**: L1 is often more stable when occasional outliers are expected
- **Monitoring**: L2 reacts more aggressively to large deviations
- **Heterogeneous data**: L1 can produce more robust aggregate evaluation
{{% /notice %}}

{{< terminal >}}