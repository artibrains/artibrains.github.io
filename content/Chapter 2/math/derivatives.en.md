---
title: "📐 Taking Derivatives"
description: "Why derivatives matter for gradient descent, core rules, worked examples, and an interactive widget."
weight: 60
draft: false
slug: "derivatives"
math: true
---

## What Is a Derivative?

The derivative of a function $f(x)$ measures how $f$ changes with respect to $x$—its instantaneous rate of change. Formally,

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}.
$$

It underpins linear approximations, optimization with gradient methods, and the geometry of curves.

{{% notice style="info" title="Tip" %}}
In practice we rely on algebraic rules to differentiate quickly rather than limits from first principles.
{{% /notice %}}

## Why Derivatives Matter

In this chapter we train models via gradient-based optimization. Derivatives turn model errors into actionable parameter updates. For linear regression with prediction $\hat{y}=\theta_0+\theta_1 x$ and mean squared error

$$
J(\theta_0,\theta_1) = \frac{1}{N} \sum_{n=1}^N (y_n - \hat{y}_n)^2,
$$

the partial derivatives are

$$
\frac{\partial J}{\partial \theta_0} = -\frac{2}{N} \sum_n (y_n-\hat{y}_n), \qquad
\frac{\partial J}{\partial \theta_1} = -\frac{2}{N} \sum_n x_n\,(y_n-\hat{y}_n).
$$

Gradient descent updates parameters by stepping opposite the gradient: $\theta \leftarrow \theta - \eta\,\nabla J$.

## Basic Rules and Derivatives

- Linearity: $(af + bg)' = a f' + b g'$.
- Constant: $\dfrac{d}{dx}(c) = 0$.
- Power rule: $\dfrac{d}{dx}(x^n) = n x^{n-1}$ for any real $n$.
- Exponential: $\dfrac{d}{dx}(e^x) = e^x$, and more generally $\dfrac{d}{dx}(a^x) = a^x \ln a$.
- Logarithm: $\dfrac{d}{dx}(\ln x) = \dfrac{1}{x}$, and $\dfrac{d}{dx}(\log_a x) = \dfrac{1}{x\ln a}$.
- Trigonometric:
  - $\dfrac{d}{dx}(\sin x) = \cos x$, $\dfrac{d}{dx}(\cos x) = -\sin x$.
  - $\dfrac{d}{dx}(\tan x) = \sec^2 x$, $\dfrac{d}{dx}(\cot x) = -\csc^2 x$.
  - $\dfrac{d}{dx}(\sec x) = \sec x\tan x$, $\dfrac{d}{dx}(\csc x) = -\csc x\cot x$.
- Inverse trigonometric:
  - $\dfrac{d}{dx}(\arcsin x) = \dfrac{1}{\sqrt{1-x^2}}$, $\dfrac{d}{dx}(\arccos x) = -\dfrac{1}{\sqrt{1-x^2}}$.
  - $\dfrac{d}{dx}(\arctan x) = \dfrac{1}{1+x^2}$.
- Product rule: $(fg)' = f'g + fg'$.
- Quotient rule: $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$ with $g\neq 0$.
- Chain rule: $\dfrac{d}{dx}\, f(g(x)) = f'(g(x))\, g'(x)$.

## Interactive Derivative

Type any function of $x$ below. The widget computes $f'(x)$ symbolically and provides a link to WolframAlpha for step-by-step explanations.

{{< derivative-widget >}}

## Worked Example

Let $f(x) = \sin^2 x \cdot \ln x$. Differentiate using product + chain rules.

1. Set $u(x)=\sin^2 x$ and $v(x)=\ln x$. Then $f=uv$ and $f'=u'v+uv'$.
2. $u'(x)=2\sin x\cos x=\sin(2x)$.
3. $v'(x)=\tfrac{1}{x}$ (for $x>0$).

Putting it together:

$$
f'(x) = \sin(2x)\,\ln x + \frac{\sin^2 x}{x},\qquad x>0.
$$

You can verify this result in the widget above or on WolframAlpha.

## Quick Examples

- $\dfrac{d}{dx}(x^3 - 4x) = 3x^2 - 4$.
- $\dfrac{d}{dx}(e^{2x}) = 2e^{2x}$.
- $\dfrac{d}{dx}(\ln(x^2+1)) = \dfrac{2x}{x^2+1}$ (chain rule).
- $\dfrac{d}{dx}(\sin^2 x) = 2\sin x\cos x = \sin(2x)$.

## Practical Considerations

- Domains: expressions like $\ln x$ require $x>0$; denominators must be nonzero.
- Units: trigonometric derivatives assume radians.
- Structure: identify compositions to apply the chain rule systematically.
- Computation: the widget uses symbolic rules (via math.js). For didactic, step-by-step proofs, follow the WolframAlpha link.

## References

1. J. Stewart. Calculus: Early Transcendentals. (Cengage) — https://www.cengage.com/c/calculus-early-transcendentals-8e-stewart/
2. M. Spivak. Calculus. (Publish or Perish) — https://www.mathpop.com/book.htm
3. Wikipedia. Derivative — https://en.wikipedia.org/wiki/Derivative
4. Wolfram MathWorld. Derivative — https://mathworld.wolfram.com/Derivative.html
