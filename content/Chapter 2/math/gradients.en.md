---
title: "📐 Partial Derivatives and Gradients"
description: "From partial derivatives to the gradient vector, geometric intuition, and an interactive gradient widget."
weight: 61
draft: false
slug: "gradients"
math: true
---

## What Is a Partial Derivative?

For a function $f(x_1,\dots,x_d)$, the partial derivative with respect to $x_k$ measures how $f$ changes when only $x_k$ varies while the rest are held constant:

$$
\frac{\partial f}{\partial x_k}(\mathbf{x}) = \lim_{h\to 0} \frac{f(x_1,\dots, x_k+h,\dots, x_d) - f(x_1,\dots,x_k,\dots,x_d)}{h}.
$$

## The Gradient Vector

The gradient collects all partial derivatives in a single vector:

$$
\nabla f(\mathbf{x}) = \begin{bmatrix}
\tfrac{\partial f}{\partial x_1} & \tfrac{\partial f}{\partial x_2} & \cdots & \tfrac{\partial f}{\partial x_d}
\end{bmatrix}^{\!\top}.
$$

It points in the direction of the steepest increase of $f$ and its magnitude equals the maximal directional derivative at $\mathbf{x}$.

{{% notice style="info" title="Geometric intuition" %}}
Level sets (contours) of $f$ are orthogonal to the gradient: moving along $-\nabla f$ decreases $f$ most rapidly.
{{% /notice %}}

## Why Gradients Matter in ML

Optimization methods such as gradient descent update parameters $\theta$ by following $-\nabla J(\theta)$, where $J$ is the objective. Accurate partial derivatives ensure stable learning and diagnose vanishing/exploding sensitivity across dimensions.

## Rules You’ll Use Often

- Linearity across coordinates: $\tfrac{\partial}{\partial x_k}(af + bg) = a\,\tfrac{\partial f}{\partial x_k} + b\,\tfrac{\partial g}{\partial x_k}$.
- Product (per coordinate): $\tfrac{\partial}{\partial x_k}(fg) = (\tfrac{\partial f}{\partial x_k})g + f(\tfrac{\partial g}{\partial x_k})$.
- Chain rule (vector form): if $g(\mathbf{x})\in\mathbb{R}$ and $h(t)\in\mathbb{R}$, then $\nabla(h\circ g) = h'(g(\mathbf{x}))\,\nabla g(\mathbf{x})$.
- Common tables: power, exp/log, and trig derivatives apply componentwise.

## Interactive Gradient

Enter a multivariable function and variables to compute $\nabla f$ symbolically. Use WolframAlpha for stepwise explanations.

{{< gradient-widget >}}

## Worked Example

Let $f(x,y) = x^2 y + \sin(xy)$. Then

$$
\frac{\partial f}{\partial x} = 2xy + y\cos(xy), \qquad
\frac{\partial f}{\partial y} = x^2 + x\cos(xy),
$$

and

$$
\nabla f(x,y) = \begin{bmatrix} 2xy + y\cos(xy) \\ x^2 + x\cos(xy) \end{bmatrix}.
$$

## Practical Considerations

- Notation: $\nabla f$ is a column vector; be consistent when matching library conventions.
- Domains: respect domain restrictions (e.g., $\ln x$ requires $x>0$).
- Scaling: feature scaling affects the relative magnitude of partials and can improve optimization stability.
- Verification: cross-check symbolic results numerically via finite differences if needed.

## References

1. S. Boyd, L. Vandenberghe. Convex Optimization — https://web.stanford.edu/~boyd/cvxbook/
2. J. Nocedal, S. Wright. Numerical Optimization (Wiley) — https://www.wiley.com/en-us/Numerical+Optimization-p-9780387400653
3. Wikipedia. Gradient — https://en.wikipedia.org/wiki/Gradient
4. Wolfram MathWorld. Gradient — https://mathworld.wolfram.com/Gradient.html
