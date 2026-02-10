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

## Basic Rules and Derivatives

| Rule | Function | Derivative |
|------|----------|------------|
| Linearity | af + bg | a f' + b g' |
| Constant | c | 0 |
| Power rule | x^n | n x^{n-1} (n real) |
| Exponential | e^x | e^x |
|  | a^x | a^x ln a |
| Logarithm | ln x | 1/x |
|  | log_a x | 1/(x ln a) |
| Trigonometric | sin x | cos x |
|  | cos x | -sin x |
|  | tan x | sec^2 x |
|  | cot x | -csc^2 x |
|  | sec x | sec x tan x |
|  | csc x | -csc x cot x |
| Inverse trigonometric | arcsin x | 1/√(1-x^2) |
|  | arccos x | -1/√(1-x^2) |
|  | arctan x | 1/(1+x^2) |
| Product rule | fg | f'g + fg' |
| Quotient rule | f/g | (f'g - fg')/g^2 (g ≠ 0) |
| Chain rule | f(g(x)) | f'(g(x)) g'(x) |

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
