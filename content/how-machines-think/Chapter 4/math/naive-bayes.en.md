---
title: "📐 Naive Bayes Foundations"
description: "Derives the Naive Bayes classifier, smoothing strategies, and interpretability hooks for clinical workflows."
weight: 91
draft: false
slug: "naive-bayes-foundations"
math: true
---

## Context

Alma's push for transparency leads the Minermont team to revisit Naive Bayes. Its simplicity comes from conditional independence assumptions paired with pragmatic smoothing, which keep probabilities stable even when data are sparse.

## From Bayes' Rule to a Classifier

For classes $y \in \{1, \dots, K\}$ and feature vector $x = (x_1, \dots, x_d)$, Bayes' theorem gives

$$
P(y \mid x) = \frac{P(y) P(x \mid y)}{P(x)}.
$$

Since $P(x)$ is constant across classes, the classifier that maximises the posterior is

$$
\hat{y}(x) = \arg\max_y P(y) P(x \mid y),
$$

reducing the problem to modelling $P(x \mid y)$.

## Naive Independence Assumption

Naive Bayes factorises the likelihood as

$$
P(x \mid y) = \prod_{j=1}^d P(x_j \mid y).
$$

Although rarely exact, the approximation works when dependencies affect each class similarly or when features are engineered to be weakly correlated.

## Parameter Estimation

For categorical features the maximum-likelihood estimates are

$$
\widehat{P}(y = k) = \frac{N_k}{N}, \qquad
\widehat{P}(x_j = v \mid y = k) = \frac{N_{jk}(v)}{N_k},
$$

with $N_k$ the number of training examples in class $k$ and $N_{jk}(v)$ the count with feature $x_j = v$. Continuous variants adopt Gaussian assumptions or kernel densities, but Minermont's storyline relies on discretised vitals, so the categorical case suffices.

## Laplace Smoothing

Zero counts collapse the product, so Laplace (add-one) smoothing adds pseudocounts:

$$
\widehat{P}_\alpha(x_j = v \mid y = k) = \frac{N_{jk}(v) + \alpha}{N_k + \alpha |\mathcal{V}_j|},
$$

where $|\mathcal{V}_j|$ is the number of possible values for feature $j$. Setting $\alpha = 1$ yields classic Laplace smoothing; smaller $\alpha$ values implement Lidstone priors.

## Log-Space Implementation

To avoid numerical underflow, compute log-probabilities:

$$
\log P(y \mid x) \propto \log P(y) + \sum_{j=1}^d \log P(x_j \mid y).
$$

During prediction, score each class in log-space and pick the maximum.

## Worked Example

For triage categories `Cardiac`, `Respiratory`, `Neurology`, suppose the symptom `ChestPain` takes values {`Yes`, `No`} with counts:

- `Cardiac`: 35 `Yes`, 15 `No`
- `Respiratory`: 5 `Yes`, 45 `No`
- `Neurology`: 2 `Yes`, 48 `No`

With $\alpha = 1$ and $|\mathcal{V}_{ChestPain}| = 2$:

$$
\widehat{P}(\text{ChestPain=Yes} \mid \text{Cardiac}) = \frac{35 + 1}{50 + 2} = 0.69, \\
\widehat{P}(\text{ChestPain=Yes} \mid \text{Respiratory}) = \frac{5 + 1}{50 + 2} = 0.12.
$$

Thus `ChestPain=Yes` strongly boosts the cardiac posterior while smoothing prevents zero-probability pitfalls for the other classes.

## Strengths and Limitations

- Pros: closed-form training, fast inference, resilient with limited data, interpretable per-feature contributions.
- Cons: independence assumptions fail with strongly correlated features; calibration may require Platt scaling or isotonic regression.

## Narrative Link

Clinicians can inspect per-feature likelihoods to justify predictions, aligning with Alma's emphasis on transparency. The smoothing term echoes the caution of not dismissing rare symptoms due to scarce data.

## References

1. H. Zhang. *The Optimality of Naive Bayes*. FLAIRS Conference, 2004.
2. T. Mitchell. *Machine Learning*. McGraw-Hill, 1997. Chapter 6.
3. D. J. C. MacKay. *Information Theory, Inference, and Learning Algorithms*. Cambridge University Press, 2003. Section 4.3.
4. C. M. Bishop. *Pattern Recognition and Machine Learning*. Springer, 2006. Section 1.6.
