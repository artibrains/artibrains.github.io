---
title: "3.1 - SVM Classification Game"
description: "Learn Support Vector Machines interactively by finding the best hyperplane that separates two classes."
weight: 1
draft: false
slug: "svm-game"
---

## Introduction

Support Vector Machines (SVM) are powerful supervised learning algorithms used for classification tasks. The fundamental idea is to find the optimal hyperplane that separates data from different classes, maximizing the margin between them. This margin maximization makes SVMs particularly robust and effective for binary classification problems.

{{< medical-context 
    type="research"  
    difficulty="intermediate"
    scenario="A medical diagnostics lab needs to classify tissue samples as benign or malignant based on two key biomarkers. Using historical data from previous biopsies, the system must find the decision boundary that best separates healthy from diseased tissue samples."
    highlight="SVMs find the optimal separating hyperplane that maximizes the margin between classes, making classifications more reliable. In medical diagnosis, this translates into more accurate detection systems that can better distinguish between healthy and diseased states, reducing both false positives and false negatives."
    steps="Adjust Hyperplane Parameters: Move the sliders to change the position and angle of the decision boundary. Watch how the margin and classification accuracy change.|Understand the Margin: The margin is the distance between the hyperplane and the nearest points from each class (support vectors). A larger margin generally means better generalization.|Find the Optimal Solution: Use the 'Find Best Hyperplane' button to have the SVM algorithm automatically calculate the optimal separating boundary that maximizes the margin."
>}}

## Interactive Demonstration

The graph shows tissue sample data points where blue dots represent benign samples and red dots represent malignant samples. Each point's position is determined by two biomarker measurements. The line is your decision boundary (hyperplane), and the shaded area represents the margin. Your goal is to adjust the boundary to maximize the margin while correctly classifying all samples.

{{< demo-wrapper title="SVM Classifier Optimizer" >}}

{{< game-results >}}

<h3>How to Use the Simulation</h3>

<ul>
<li><strong>Adjust position and angle</strong> with the controls to see how the decision boundary and <strong>margin</strong> change.</li>
<li><strong>Observe support vectors</strong>: these are the critical points (highlighted) that define the margin.</li>
<li><strong>Check classification accuracy</strong>: see how many points are correctly classified on each side of the boundary.</li>
<li><strong>Click "Find Best Hyperplane"</strong> to let the SVM algorithm automatically find the optimal parameters that maximize the margin.</li>
</ul>

{{< svm-game lang="en" >}}

{{< /demo-wrapper >}}

## Fundamental Concepts

### The SVM Approach

{{% notice style="info" title="Key SVM Concepts" %}}
**Support Vectors**
: The data points closest to the decision boundary. These points are critical because they define the position and orientation of the hyperplane.

**Margin**
: The distance between the hyperplane and the nearest support vectors from each class. SVM aims to maximize this margin for better generalization.

**Hyperplane**
: The decision boundary that separates the two classes. In 2D, it's a line; in higher dimensions, it becomes a hyperplane.
{{% /notice %}}

{{% notice style="tip" title="Classification Strategies" %}}
- **Manual Adjustment**: Helps you understand how the boundary position affects classification
- **Margin Maximization**: The wider the margin, the more confident and generalizable the classification
- **Support Vector Focus**: Pay attention to the support vectors - they are the most important points for defining the boundary
- **Automatic Optimization**: The SVM algorithm finds the optimal hyperplane by solving a constrained optimization problem
{{% /notice %}}

## Mathematical Foundations

The SVM optimization problem can be formulated as:

$$
\begin{aligned}
\text{Maximize} \quad & \frac{2}{\|\mathbf{w}\|} \\
\text{Subject to} \quad & y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1, \quad \forall i
\end{aligned}
$$

Where:
- $\mathbf{w}$ is the normal vector to the hyperplane
- $b$ is the bias term
- $\mathbf{x}_i$ are the data points
- $y_i \in \{-1, 1\}$ are the class labels
- The margin width is $\frac{2}{\|\mathbf{w}\|}$

{{% notice style="warning" title="Important Considerations" %}}
- **Linearly Separable Data**: This demonstration shows the basic case where classes can be separated by a straight line
- **Kernel Trick**: For non-linearly separable data, SVMs can use kernel functions to map data to higher dimensions
- **Soft Margin**: Real-world data may have outliers; soft margin SVMs allow some misclassifications to achieve better overall performance
{{% /notice %}}

{{< terminal >}}
