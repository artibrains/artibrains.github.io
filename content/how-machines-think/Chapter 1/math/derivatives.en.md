---
title: "✏️ Taking Derivatives (moved)"
description: "A quick primer on derivatives and the most common rules."
weight: 60
draft: true
slug: "derivatives"
math: true
---

{{% notice style="warning" title="Moved" %}}
This page moved to Chapter 2: [Taking Derivatives]({{% relref "how-machines-think/Chapter 2/math/derivatives.en.md" %}}).
{{% /notice %}}

## What Is a Derivative?

The derivative of a function $f(x)$ measures how $f$ changes with respect to $x$—its instantaneous rate of change. Formally,

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}.
$$

It underpins linear approximations, optimization with gradient methods, and the geometry of curves.

{{% notice style="info" title="Tip" %}}
In practice we rely on algebraic rules to differentiate quickly rather than limits from first principles.
{{% /notice %}}

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

## Try It: Interactive Derivative

Type any function of $x$ below. The widget computes $f'(x)$ symbolically and provides a link to WolframAlpha for step-by-step explanations.

{{< derivative-widget >}}

## Quick Examples

- $\dfrac{d}{dx}(x^3 - 4x) = 3x^2 - 4$.
- $\dfrac{d}{dx}(e^{2x}) = 2e^{2x}$.
- $\dfrac{d}{dx}(\ln(x^2+1)) = \dfrac{2x}{x^2+1}$ (chain rule).
- $\dfrac{d}{dx}(\sin^2 x) = 2\sin x\cos x = \sin(2x)$.

## Notes

- Use radians for trigonometric functions.
- Many composite functions succumb to a sequence of chain, product, and power rules—practice recognizing the structure.
