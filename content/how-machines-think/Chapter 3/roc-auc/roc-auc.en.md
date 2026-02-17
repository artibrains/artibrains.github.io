---
title: "3.5 - ROC and AUC Visualization"
description: "Interactively explore how ROC curves are built and what AUC means in Logistic Regression and SVM."
weight: 10
draft: false
---

## Introduction

This interactive tool allows you to visualize how two popular classification algorithms behave: **Logistic Regression** and **SVM (Support Vector Machines)**, and how to evaluate their performance using the ROC curve and AUC.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro
    lang="en"
    title="ROC and AUC Visualization"
    context_type="research"
    scenario="You are validating two classifiers that flag high-risk cases from diagnostic signals. Before deployment, you need to compare how each model balances detection sensitivity and false alarms across different thresholds."
    medical_highlight="ROC analysis helps compare classifiers beyond a single threshold. AUC summarizes discriminative power: higher AUC means the model separates classes more reliably across operating points."
    steps="Choose the model: Select Logistic Regression, SVM, or Both to compare their behavior side-by-side.|Adjust data difficulty: Tune class separation and noise to make the classification task easier or harder and observe how ROC changes.|Generate and compare: Click New Data and inspect how the ROC curve and AUC move for each model under different conditions."
>}}

{{< roc-auc-visualization >}}
{{< /demo-wrapper >}}

## How to read the charts

1.  **Classification Space (Left)**:
    *   Shows the generated data points.
    *   The **solid line** represents the model's decision boundary. The model classifies everything on one side as one class and everything on the other side as the other.
    *   In SVM mode, you will see additional dashed lines representing the **margin** of separation.

2.  **ROC Curve (Right)**:
    *   The ROC (Receiver Operating Characteristic) curve shows the diagnostic ability of the classifier.
    *   The Y-axis is the **True Positive Rate (Sensitivity)**: What percentage of actual positive cases did the model detect?
    *   The X-axis is the **False Positive Rate (1 - Specificity)**: What percentage of actual negative cases were incorrectly classified as positive?
    *   The **dashed diagonal line** represents a random classifier (like flipping a coin).
    *   A curve that approaches the top-left corner indicates better performance.

3.  **AUC (Area Under the Curve)**:
    *   A single number summarizing the ROC curve.
    *   **1.0**: Perfect classification.
    *   **0.5**: Random classification (no better than chance).
    *   **< 0.5**: The model is classifying inversely (worse than chance).

