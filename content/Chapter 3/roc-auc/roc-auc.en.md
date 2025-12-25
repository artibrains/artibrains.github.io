---
title: "3.5 - ROC and AUC Visualization"
description: "Interactively explore how ROC curves are built and what AUC means in Logistic Regression and SVM."
weight: 10
draft: false
---

## Simulation Guide

This interactive tool allows you to visualize how two popular classification algorithms behave: **Logistic Regression** and **SVM (Support Vector Machines)**, and how to evaluate their performance using the ROC curve and AUC.

### How to use the controls

*   **Model**: Select the algorithm you want to visualize. You can choose "Logistic Regression", "SVM", or **"Both"** to compare their performance simultaneously.
*   **Class Separation**: Adjust how far apart the two data groups (Class 0 and Class 1) are. Greater separation makes it easier for the model to distinguish them.
*   **Noise**: Increase or decrease the spread of the points. More noise causes the data to mix more, making classification harder.
*   **New Data**: Generate a new set of random points with the current parameters.

{{< roc-auc-visualization >}}

### How to read the charts

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

