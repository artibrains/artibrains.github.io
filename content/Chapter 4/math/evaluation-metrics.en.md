---
title: "📐 Evaluation Metrics"
description: "Precision, recall, F-score, ROC curves, and multiclass extensions."
weight: 90
draft: false
slug: "evaluation-metrics"
---

## Why Metrics Matter

Minermont's triage assistant is only as trustworthy as the evidence behind each prediction. The mathematics in this note grounds the precision/recall dashboards that Alma's team presents to the hospital board.

## Confusion Matrix Fundamentals

For a $K$-class classifier evaluated on $N$ examples, the confusion matrix $C \in \mathbb{R}^{K \times K}$ has entries

$$
C_{ij} = |\{ n : y_n = i, \; \hat{y}_n = j \}|,
$$

where $y_n$ is the true label and $\hat{y}_n$ the prediction. Row sums equal the number of actual instances per class and column sums count predictions per class. From $C$ we derive per-class quantities:

- True positives $\mathrm{TP}_k = C_{kk}$
- False positives $\mathrm{FP}_k = \sum_{i \ne k} C_{ik}$
- False negatives $\mathrm{FN}_k = \sum_{j \ne k} C_{kj}$
- True negatives $\mathrm{TN}_k = \sum_{i \ne k} \sum_{j \ne k} C_{ij}$

## Precision, Recall, and F1

Treat each class $k$ as the "positive" class against all others:

$$
\mathrm{Precision}_k = \frac{\mathrm{TP}_k}{\mathrm{TP}_k + \mathrm{FP}_k}, \qquad
\mathrm{Recall}_k = \frac{\mathrm{TP}_k}{\mathrm{TP}_k + \mathrm{FN}_k}.
$$

The class-specific F1 score is the harmonic mean

$$
\mathrm{F1}_k = \frac{2 \cdot \mathrm{Precision}_k \cdot \mathrm{Recall}_k}{\mathrm{Precision}_k + \mathrm{Recall}_k}.
$$

## Macro vs. Micro Averaging

- *Macro averages* weight every class equally:

  $$
  \mathrm{Precision}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{Precision}_k,
  $$

  with analogous formulas for recall and F1. You may average the per-class F1 values or recompute from macro precision and recall.
- *Micro averages* pool all decisions first:

  $$
  \mathrm{Precision}_\text{micro} = \frac{\sum_k \mathrm{TP}_k}{\sum_k (\mathrm{TP}_k + \mathrm{FP}_k)}, \qquad
  \mathrm{Recall}_\text{micro} = \frac{\sum_k \mathrm{TP}_k}{\sum_k (\mathrm{TP}_k + \mathrm{FN}_k)}.
  $$

  Because the numerators match, micro precision equals micro recall and the micro F1 collapses to that same value.

{{% notice style="info" title="Choosing the right summary" %}}
Macro metrics highlight rare classes, while micro metrics follow overall prevalence. For hospital triage you need both: macro scores expose weaknesses on critical but uncommon conditions.
{{% /notice %}}

## ROC Curves for Binary Decisions

For a binary classifier with scores $s(x)$ and threshold $t$, plot:

- True positive rate $\mathrm{TPR}(t) = \frac{\mathrm{TP}(t)}{\mathrm{TP}(t) + \mathrm{FN}(t)}$
- False positive rate $\mathrm{FPR}(t) = \frac{\mathrm{FP}(t)}{\mathrm{FP}(t) + \mathrm{TN}(t)}$

The **area under the curve (AUC)** integrates TPR with respect to FPR:

$$
\mathrm{AUC} = \int_0^1 \mathrm{TPR}(\mathrm{FPR}) \, d\mathrm{FPR},
$$

usually approximated via the trapezoidal rule over successive ROC points.

## Extending ROC/AUC to Multiclass Settings

Two standard approaches generalise the ROC concept when $K > 2$:

1. **One-vs-rest.** Build $K$ binary problems (class $k$ versus all others), compute ROC/AUC for each, then macro-average (optionally weighted by class frequency).
2. **One-vs-one.** Compute pairwise ROC/AUC for every class pair and average, leading to the Hand–Till (2001) multiclass AUC:

   $$
   \mathrm{AUC}_{\text{HT}} = \frac{2}{K(K-1)} \sum_{i<j} \mathrm{AUC}_{ij},
   $$

   where $\mathrm{AUC}_{ij}$ is the probability that a random instance of class $i$ scores higher for $i$ than a random instance of class $j$, and vice versa.

## Worked Example

For triage classes `Cardiac`, `Respiratory`, `Neurology`, consider the confusion matrix

$$
C = \begin{pmatrix}
40 & 5 & 5 \\
10 & 30 & 10 \\
4 & 6 & 20
\end{pmatrix}.
$$

- Cardiac precision $= \tfrac{40}{40 + 10 + 4} = 0.74$
- Respiratory recall $= \tfrac{30}{5 + 30 + 6} = 0.77$
- Neurology F1 combines precision $= \tfrac{20}{5 + 10 + 20}$ and recall $= \tfrac{20}{5 + 10 + 20}$, yielding $0.57$

Macro averages take the arithmetic mean across classes. To draw the ROC curve for `Cardiac`, treat it as positive versus the remaining classes and sweep the decision threshold.

## Practical Considerations

- Class imbalance: macro metrics prevent rare but critical categories from vanishing in the averages.
- Threshold selection: ROC curves help pick operating points; incorporate cost-sensitive utilities for hospital policy decisions.
- Uncertainty: bootstrap resampling gives confidence intervals for AUC and macro F1 when reporting to clinicians.

## References

1. T. Fawcett. *An Introduction to ROC Analysis*. Pattern Recognition Letters, 27(8):861–874, 2006.
2. J. A. Swets. *Measuring the Accuracy of Diagnostic Systems*. Science, 240(4857):1285–1293, 1988.
3. D. J. Hand, R. J. Till. *A Simple Generalisation of the Area Under the ROC Curve for Multiple Class Classification Problems*. Machine Learning, 45(2):171–186, 2001.
4. S. Saito, M. Rehmsmeier. *The Precision-Recall Plot Is More Informative than the ROC Plot When Evaluating Binary Classifiers on Imbalanced Datasets*. PLoS ONE 10(3), 2015.
