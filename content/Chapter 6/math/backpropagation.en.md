---
title: "📐 Backpropagation via the Chain Rule"
description: "Derives the standard backpropagation recursion using compact Jacobian notation and worked examples."
weight: 91
draft: false
slug: "backpropagation-chain-rule"
---

## Context

Alma's "conversation of learning" becomes rigorous when gradients flow backward through Jacobian products. This note derives the canonical backpropagation equations with clean matrix calculus.

{{% notice style="info" title="Watch & read" %}}
The visual primer [3Blue1Brown – "Backpropagation calculus"](https://www.3blue1brown.com/lessons/backpropagation-calculus) complements the algebra that follows.{{% /notice %}}

## Network Setup

For a feedforward network with $L$ layers:

- Weights $W^{(\ell)} \in \mathbb{R}^{n_\ell \times n_{\ell-1}}$
- Biases $b^{(\ell)} \in \mathbb{R}^{n_\ell}$
- Pre-activations $z^{(\ell)} = W^{(\ell)} a^{(\ell-1)} + b^{(\ell)}$
- Activations $a^{(\ell)} = \phi^{(\ell)}(z^{(\ell)})$

With input $a^{(0)} = x$, output $a^{(L)}$, and loss $\mathcal{L}(a^{(L)}, y)$, Jacobian notation $J_f(p) = \partial f / \partial p^\top$ keeps derivatives organised.

## Chain-Rule Backbone

The gradient with respect to $W^{(\ell)}$ factorises as

$$
\frac{\partial \mathcal{L}}{\partial W^{(\ell)}} = \delta^{(\ell)} {a^{(\ell-1)}}^\top,
$$

where the error signal $\delta^{(\ell)}$ satisfies

$$
\delta^{(\ell)} = \big(W^{(\ell+1)\top} \delta^{(\ell+1)}\big) \odot \phi^{(\ell)\,'}(z^{(\ell)}),
$$

with base case

$$
\delta^{(L)} = \nabla_{z^{(L)}} \mathcal{L} = \big(J_{a^{(L)}}(z^{(L)})\big)^\top \nabla_{a^{(L)}} \mathcal{L}.
$$

Because $J_{z^{(k)}}(a^{(k-1)}) = W^{(k)}$ and $J_{a^{(k)}}(z^{(k)}) = \operatorname{diag}(\phi^{(k)\,'}(z^{(k)}))$, the recursion emerges directly from repeated Jacobian products. Bias gradients follow as $\partial \mathcal{L} / \partial b^{(\ell)} = \delta^{(\ell)}$.

## Worked Example

For a two-layer network with hidden activation $\sigma$ and output activation $\phi$:

$$
\begin{aligned}
 z^{(1)} &= W^{(1)} x + b^{(1)}, & a^{(1)} &= \sigma(z^{(1)}), \\
 z^{(2)} &= W^{(2)} a^{(1)} + b^{(2)}, & \hat{y} &= a^{(2)} = \phi(z^{(2)}),
\end{aligned}
$$

the mean-squared-error loss yields

$$
\delta^{(2)} = (\hat{y} - y) \odot \phi'(z^{(2)}), \qquad
\delta^{(1)} = \big(W^{(2)\top} \delta^{(2)}\big) \odot \sigma'(z^{(1)}),
$$

and gradients

$$
\frac{\partial \mathcal{L}}{\partial W^{(2)}} = \delta^{(2)} {a^{(1)}}^\top, \qquad
\frac{\partial \mathcal{L}}{\partial W^{(1)}} = \delta^{(1)} x^\top.
$$

Every step mirrors matrix multiplications and element-wise products—the exact mechanics visualised in the chapter demo.

## Automatic Differentiation View

Reverse-mode autodiff applies the chain rule without forming explicit Jacobians. Denoting $g^{(\ell)} = \nabla_{a^{(\ell)}} \mathcal{L}$, we obtain

$$
g^{(\ell-1)} = W^{(\ell)\top} \big( g^{(\ell)} \odot \phi^{(\ell)\,'}(z^{(\ell)}) \big),
$$

which is the same recurrence expressed in terms of activation gradients.

## Practical Considerations

- Vectorisation handles mini-batches by promoting outer products to batched matrix multiplications.
- Non-differentiable kinks (e.g., ReLU at zero) use subgradients or define $\phi'(0)=0$.
- Softmax plus cross-entropy simplifies the output error to $\hat{y} - y$.

{{% notice style="warning" title="Vanishing gradients" %}}
Repeated multiplication by derivative matrices can shrink signals whenever $\lVert \phi' \rVert < 1$. Strategies such as residual connections and careful initialisation mitigate this effect in deeper networks.{{% /notice %}}

## References

1. D. E. Rumelhart, G. E. Hinton, R. J. Williams. *Learning representations by back-propagating errors*. Nature 323, 533–536 (1986).
2. P. J. Werbos. *Beyond Regression: New Tools for Prediction and Analysis in the Behavioral Sciences*. PhD dissertation, Harvard University, 1974.
3. I. Goodfellow, Y. Bengio, A. Courville. *Deep Learning*. MIT Press, 2016. Chapter 6.
4. 3Blue1Brown. *Backpropagation calculus*. https://www.3blue1brown.com/lessons/backpropagation-calculus. Accessed October 2025.
