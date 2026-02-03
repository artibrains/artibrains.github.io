---
title: "3.2 The Next Step: Sigmoid Decision Function"
weight: 3
description: "Interactive visualization to understand how the sigmoid function turns any linear combination into a probability between 0 and 1, becoming the key component of logistic regression."
date: 2025-04-17
draft: false
slug: "sigmoid-function-classifier"
---

## Introduction

Explore how the sigmoid function transforms any linear combination into a probability between 0 and 1, becoming the cornerstone of logistic regression. In this interactive simulation you will separate high- and low-risk cases by adjusting the slope and the initial height of the curve.

{{< medical-context
    type="research"
    difficulty="intermediate"
    scenario="You have built a model that estimates the **probability of an undesired outcome** using two input signals. Your goal is to tune the decision boundary to correctly separate low- and high-risk cases."
    highlight="The sigmoid function transforms any numerical value into a probability between 0 and 1, turning raw scores into interpretable confidence. Adjusting the curve controls how aggressively the system flags high-risk cases, balancing misses vs. false alarms."
    steps="Adjust Parameters: Use the w₁, w₂, and bias (b) sliders to modify the slope and position of the sigmoid curve. Observe how the performance metrics react in real time.|Minimize Log-Loss: Separate the green points (low-risk) from the red points (high-risk) by tuning the sigmoid parameters to achieve the best classification.|Evaluate Metrics: Check accuracy and log-loss to judge classification quality. Adjust the threshold to be more or less strict when flagging high-risk cases."
>}}

## Interactive Demonstration

The graph shows data points defined by two input signals. Green points indicate low-risk cases and red points show high-risk cases. The sigmoid curve is your classification model. Your goal is to adjust the curve's parameters so it separates both groups as accurately as possible, minimizing the error between predicted and actual classifications.

{{< demo-wrapper title="Sigmoid Function Simulator" >}}

<h3>How to use the simulation</h3>

<ul>
<li><strong>Adjust the w₁, w₂, and bias (b) parameters</strong> using the sliders to modify the slope and position of the sigmoid curve.</li>
<li><strong>Watch the metrics in real time</strong>: Accuracy and log-loss update instantly, showing the quality of your classification.</li>
<li><strong>Experiment with the threshold</strong> to adjust how strict the high-risk classification should be.</li>
<li><strong>Toggle between modes</strong> to view discrete classification or the probability heatmap.</li>
</ul>

{{< sigmoid-legend >}}
{{< sigmoid-game lang="en" >}}

{{< game-results >}}

{{< /demo-wrapper >}}

### Controls and Configuration

- **w₁ and w₂ sliders** tilt the decision boundary so the curve leans toward the high- or low-risk clusters.
- **Bias (b)** shifts the sigmoid left or right to re-centre the threshold over the data cloud.
- **Threshold** changes how strict the classifier is when deciding which cases are flagged as high risk.
- **Mode toggle** alternates between the crisp classification view and a probability heatmap.
- **Check classification / New game** evaluate the current settings or regenerate a new population.

### Terminal Feedback

The terminal below captures every reset and evaluation: it reports when the simulator loads, logs each accuracy check with the current threshold, and confirms when fresh data is generated so you can track improvements step by step.

## Core Concepts

### Sigmoid Function

{{% notice style="info" title="What Is the Sigmoid Function?" %}}
The sigmoid function transforms the combination of our indicators into a probability between 0 and 1. It is defined as:

$$\sigma(z) = \frac{1}{1 + e^{-z}}, \quad z = w_1 \cdot \text{age} + w_2 \cdot \text{pressure} + b$$

Where:
- **z** is the linear combination of features  
- **σ(z)** is the resulting probability (0 to 1)  
- **w₁, w₂** are the feature weights  
- **b** is the bias term
{{% /notice %}}

### Decision Boundary and Threshold

{{% notice style="tip" title="Interpreting the Results" %}}
The sigmoid converts the value `z` into a probability between 0 and 1. The threshold (0.5 by default) determines when a case is labeled “high risk”:

- Probability > threshold → classify as **“high risk”** (red)  
- Probability ≤ threshold → classify as **“low risk”** (green)

Adjusting the threshold lets you be more or less strict. A higher threshold demands stronger evidence before flagging someone as “high risk.”
{{% /notice %}}

{{< terminal >}}
