---
title: "3.1 The Next Step: Sigmoid Decision Function"
weight: 2
description: "Interactive visualization to understand how the sigmoid function turns any linear combination into a probability between 0 and 1, becoming the key component of logistic regression."
date: 2025-04-17
draft: false
slug: "sigmoid-function-classifier"
---

## Introduction

Explore how the sigmoid function transforms any linear combination into a probability between 0 and 1, becoming the cornerstone of logistic regression. In this interactive simulation you will separate high- and low-risk patients by adjusting the slope and the initial height of the curve.

{{< demo-intro
    title="Simulator: Sigmoid Function Game"
    algorithm_type="Logistic classification"
    difficulty="intermediate"
    medical_scenario="You have built a model that estimates the **probability of post-operative complications** using each patient's age and blood pressure (every point on the chart)."
    medical_highlight="Your goal is to tune the decision boundary and **guarantee** safe therapeutic decisions by separating *low*- and *high*-risk patients correctly."
    intro_text="Adjust the **slope** and the **offset** of the sigmoid curve to reach the highest possible accuracy. Watch how the performance metrics react in real time."
    steps="Minimize the Log-Loss: Separate the green points (no complications) from the red points (complications) by tuning the sigmoid parameters.|Use the sliders: Modify the curve with the controls. The plot and metrics update instantly so you can see the impact.|Evaluate the metrics: Check **accuracy** and **log-loss** to judge classification quality and discover the best fit."
>}}

## Interactive Demonstration

{{< demo-wrapper title="Sigmoid Function Simulator" >}}

{{< sigmoid-legend >}}
{{< sigmoid-game lang="en" >}}

{{< game-results >}}

{{< /demo-wrapper >}}

### Controls and Configuration

- **w₁ and w₂ sliders** tilt the decision boundary so the curve leans toward the high- or low-risk clusters.
- **Bias (b)** shifts the sigmoid left or right to re-centre the threshold over the data cloud.
- **Threshold** changes how strict the classifier is when deciding which patients are flagged as high risk.
- **Mode toggle** alternates between the crisp classification view and a probability heatmap.
- **Check classification / New game** evaluate the current settings or regenerate a new population of patients.

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
The sigmoid converts the value `z` into a probability between 0 and 1. The threshold (0.5 by default) determines when a patient is labeled “high risk”:

- Probability > threshold → classify as **“high risk”** (red)  
- Probability ≤ threshold → classify as **“low risk”** (green)

Adjusting the threshold lets you be more or less strict. A higher threshold demands stronger evidence before flagging someone as “high risk.”
{{% /notice %}}

{{< terminal >}}
