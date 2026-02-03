---
title: "📐 Universal Approximation Theorem"
description: "States the classical single-hidden-layer universal approximation result, gives a proof sketch via Hahn–Banach/Riesz, and lists canonical references."
weight: 92
draft: false
slug: "universal-approximation-theorem"
math: true
---

## Context

Chapter 7 introduces neural networks as function approximators. The **Universal Approximation Theorem (UAT)** formalises a key idea:

> A feed-forward network with **one hidden layer** can approximate **any continuous function on a compact set**, as long as the activation is not too degenerate.

UAT is an *existence* theorem: it says “there exists a width $m$ large enough”, but it does **not** promise a small network, fast training, or good generalisation.

## Setup: one-hidden-layer networks

Fix an activation $\sigma: \mathbb{R} \to \mathbb{R}$. Consider functions of the form

$$
F_m(x) = \sum_{j=1}^m a_j\,\sigma(w_j\cdot x + b_j),
\qquad x\in \mathbb{R}^n,
$$

where $a_j\in\mathbb{R}$, $w_j\in\mathbb{R}^n$, $b_j\in\mathbb{R}$.

Let $K\subset\mathbb{R}^n$ be compact (e.g. $[0,1]^n$) and let $C(K)$ be the continuous real-valued functions on $K$ with the sup norm $\|f\|_\infty$.

## The “most important” modern statement

A widely used formulation (Leshno–Lin–Pinkus–Schocken, 1993) is:

**Theorem (UAT for continuous non-polynomial activations).**
Let $K\subset\mathbb{R}^n$ be compact and let $\sigma\in C(\mathbb{R})$. Define

$$
\mathcal{S} = \operatorname{span}\{x\mapsto \sigma(w\cdot x + b) : w\in\mathbb{R}^n,\ b\in\mathbb{R}\} \subset C(K).
$$

Then $\overline{\mathcal{S}} = C(K)$ (density in the uniform norm) **if and only if** $\sigma$ is **not a polynomial** (almost everywhere).

In particular, common activations like **sigmoid**, **tanh**, and **ReLU** are universal approximators.

## Classic “sigmoid” version (Cybenko)

Cybenko’s original result is often stated for sigmoids on the unit cube:

**Theorem (Cybenko, 1989).**
Let $\sigma$ be a *sigmoidal* function, meaning

$$
\lim_{t\to -\infty}\sigma(t)=0, \qquad \lim_{t\to +\infty}\sigma(t)=1.
$$

Then finite sums $\sum_{j=1}^m a_j\,\sigma(w_j\cdot x + b_j)$ are dense in $C([0,1]^n)$.

## Proof sketch (Hahn–Banach + Riesz)

This is the standard, conceptually clean route used in the classical proofs.

### Step 1: reduce density to a “no nonzero annihilator” condition

Assume $\overline{\mathcal{S}}\neq C(K)$. Then there exists $f\in C(K)$ not in the closure.
By the Hahn–Banach separation theorem, there exists a **nonzero** continuous linear functional

$$
L: C(K)\to\mathbb{R}
$$

such that $L(g)=0$ for all $g\in\overline{\mathcal{S}}$ but $L(f)\neq 0$.

### Step 2: represent the functional by a signed measure

By the Riesz representation theorem, there is a finite signed regular Borel measure $\mu$ on $K$ such that

$$
L(h) = \int_K h(x)\, d\mu(x) \quad \text{for all } h\in C(K).
$$

So the “$L$ annihilates $\mathcal{S}$” condition becomes

$$
\int_K \sigma(w\cdot x + b)\, d\mu(x) = 0
\quad \text{for all } w\in\mathbb{R}^n,\ b\in\mathbb{R}.
$$

### Step 3: show that this forces $\mu=0$ (the key lemma)

For suitable activations $\sigma$ (sigmoids are the classical case), the family of ridge functions
$\sigma(w\cdot x + b)$ is rich enough to determine measures:

> (**Discriminatory property**) If a finite signed measure $\mu$ satisfies
> $\int_K \sigma(w\cdot x + b)\, d\mu(x)=0$ for all $(w,b)$, then $\mu=0$.

Intuition: for large slopes, sigmoids can approximate **half-space indicators**

$$
\mathbf{1}_{\{w\cdot x + b \ge 0\}},
$$

and half-spaces generate (via standard measure-uniqueness arguments) enough sets to force a signed measure that integrates to zero against all such indicators to be the zero measure.

Once we know $\mu=0$, then $L(h)=\int h\,d\mu = 0$ for all $h$, contradicting that $L$ was nonzero.
Therefore $\overline{\mathcal{S}} = C(K)$.

{{% notice style="info" title="What this proof does (and doesn’t) give you" %}}
UAT proves **existence** of a width $m$ for a target accuracy $\varepsilon$.
It does not bound $m$ tightly in general, and it does not guarantee that gradient descent will find the approximating parameters.
{{% /notice %}}

## A useful corollary (approximation statement)

For any $f\in C(K)$ and any $\varepsilon>0$, there exist $m$ and parameters $(a_j,w_j,b_j)_{j=1}^m$ such that

$$
\sup_{x\in K}\left|f(x) - \sum_{j=1}^m a_j\,\sigma(w_j\cdot x + b_j)\right| < \varepsilon.
$$

## References (reliable sources)

1. G. Cybenko. *[Approximation by superpositions of a sigmoidal function](https://doi.org/10.1007/BF02551274)*. **Mathematics of Control, Signals and Systems**, 2:303–314, 1989.
2. K. Hornik. *[Approximation capabilities of multilayer feedforward networks](https://doi.org/10.1016/0893-6080(91)90009-T)*. **Neural Networks**, 4(2):251–257, 1991.
3. M. Leshno, V. Y. Lin, A. Pinkus, S. Schocken. *[Multilayer feedforward networks with a nonpolynomial activation function can approximate any function](https://doi.org/10.1016/S0893-6080(05)80131-5)*. **Neural Networks**, 6(6):861–867, 1993.
4. A. Pinkus. *[Approximation theory of the MLP model in neural networks](https://doi.org/10.1017/S0962492900002919)*. **Acta Numerica**, 8:143–195, 1999.

