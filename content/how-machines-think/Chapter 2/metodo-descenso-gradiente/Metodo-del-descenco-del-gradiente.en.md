---
title: "2.5 - The Gradient Descent Method"
description: "Learn how the gradient descent algorithm finds minimum points of complex functions to optimize machine learning models."
weight: 51
draft: false
slug: "gradient-descent-method"
---

## Introduction

The **Gradient Descent Method** is the fundamental algorithm that allows machine learning models to "learn" by finding optimal values for their parameters. It works like an explorer searching for the lowest point on a mountain by always following the direction of greatest descent.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro
lang="en"
title="Gradient Descent Algorithm"
scenario="In this simulation, you can visualize that process. The left graph shows the surface of the cost function (in this case, Mean Squared Error or MSE). Each point on this surface represents the total error for a specific combination of w and b. The goal is to find the lowest point in the valley. Use the controls to start the algorithm. Watch how the parameters are updated in each iteration (right graph), following the direction opposite to the gradient, until converging on the optimal solution that minimizes the error. You can experiment with different learning rates to see how it affects the speed and stability of the process."
steps="Observe the Exploration: See how the algorithm moves across the surface of the function, always following the direction of greatest descent according to the gradient.|Adjust the Parameters: Experiment with the learning rate to see how it affects the speed and stability of convergence.|Analyze the Convergence: Observe how the gradient norm decreases, indicating that it is approaching the minimum, and when the algorithm decides to stop."
medical_highlight="Watch how each step updates the current position using the gradient direction. A suitable learning rate produces stable convergence, while extreme values can cause slow learning or oscillations."
>}}

{{< descenso-gradiente_intro_es lang="en" >}}

{{< descenso-gradiente lang="en" >}}
{{< /demo-wrapper >}}

## Fundamental Concepts

### What is the Gradient?

{{% notice style="info" title="The Gradient as a Mathematical Compass" %}}
The **gradient** (∇f) is a vector that points in the direction of greatest growth of a function. In optimization:

- **Direction**: Indicates where the function grows most rapidly
- **Magnitude**: Its length indicates how steep the gradient is
- **Descent**: To minimize, we go in the **opposite** direction of the gradient
{{% /notice %}}

### Stopping Criterion

{{% notice style="tip" title="When to Stop?" %}}
#### Gradient Norm (|∇f|)

Think of the gradient as an arrow indicating the steepest climb. The **norm** is simply the length of that arrow:

- **Long arrow** → Steep slope → Continue optimizing
- **Short arrow** → Flat terrain → Near the minimum
- **Criterion**: Stop when |∇f| < tolerance (e.g., 0.001)

This tells us that we've reached the "valley" where the terrain is almost flat.
{{% /notice %}}

### Key Parameters

{{% notice style="warning" title="Learning Rate" %}}
- **Too high**: The algorithm may "jump" over the minimum

- **Too low**: Very slow convergence

- **Optimal**: Balance between speed and accuracy
{{% /notice %}}

{{< terminal >}}