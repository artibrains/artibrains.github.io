---
title: "📐 Perceptron Convergence Theorem"
description: "Rosenblatt–Novikoff mistake bound proving single-layer perceptrons converge on separable data."
weight: 90
draft: false
slug: "perceptron-convergence"
math: true
---

## Context

Chapter 6 introduces the perceptron as Minermont's first learning neuron. The classical Rosenblatt–Novikoff analysis guarantees that, on linearly separable data, the algorithm eventually settles on a separating hyperplane.

{{% notice style="info" title="Reading map" %}}
Pair this derivation with the chapter's radiology triage example. The proof applies to any separable dataset, regardless of dimensionality.{{% /notice %}}

## Algorithm Recap

Given labelled examples $(x_i, y_i)$ with $y_i \in \{-1, +1\}$ and homogeneous inputs $x_i \in \mathbb{R}^d$, initialise $w_0 = 0$ and repeat:

1. Select a misclassified point $x_i$.
2. Update the weights via
   $$
   w_{t+1} = w_t + y_i x_i.
   
$$

Predictions are correct when $\operatorname{sign}(w_t \cdot x_i) = y_i$; the process stops once every example is classified correctly.

## Mistake Bound

Assume a vector $u$ separates the data with margin $\gamma > 0$, i.e. $y_i (u \cdot x_i) \ge \gamma$ for all $i$, and let $R = \max_i \lVert x_i \rVert$. After each mistake the projection on $u$ increases:

$$
w_{t+1} \cdot u = (w_t + y_i x_i) \cdot u \ge w_t \cdot u + \gamma.
$$

After $M$ mistakes, $w_M \cdot u \ge M\gamma$. The squared norm evolves as

$$
\lVert w_{t+1} \rVert^2 = \lVert w_t \rVert^2 + 2 y_i (w_t \cdot x_i) + \lVert x_i \rVert^2 \le \lVert w_t \rVert^2 + R^2,
$$

because mistakes imply $y_i (w_t \cdot x_i) \le 0$. Hence $\lVert w_M \rVert^2 \le M R^2$.

By Cauchy–Schwarz,

$$
w_M \cdot u \le \lVert w_M \rVert \lVert u \rVert \le \sqrt{M} R.
$$

Combining inequalities gives $M \le (R/\gamma)^2$, proving the perceptron makes finitely many mistakes and converges whenever a separating margin exists.

## Geometric Intuition

Each correction nudges $w$ toward a mislabelled sample. If a margin exists, these nudges cannot spin indefinitely; eventually $w$ lies inside the margin "slab" separating the classes. Larger margins imply fewer updates because the bound $(R/\gamma)^2$ shrinks.

## Beyond Separability

Non-separable datasets cause perpetual cycling. Practical variants—pocket perceptrons, averaged perceptrons, or kernel lifts—extend the idea when perfect separability is absent.

## References

1. F. Rosenblatt. *The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain*. Psychological Review, 65(6):386–408, 1958.
2. A. B. Novikoff. *On Convergence Proofs on Perceptrons*. Proceedings of the Symposium on the Mathematical Theory of Automata, 1962.
3. S. Shalev-Shwartz, S. Ben-David. *Understanding Machine Learning: From Theory to Algorithms*. Cambridge University Press, 2014. Chapter 9.
4. Y. Freund, R. E. Schapire. *Large Margin Classification Using the Perceptron Algorithm*. Machine Learning, 37(3):277–296, 1999.
