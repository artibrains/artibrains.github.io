---
title: "4.3 Multiclass Confusion Matrix"
description: "Visualize and understand how to evaluate multi-class classifiers using confusion matrices and derived metrics."
weight: 14
draft: false
slug: "multiclass-confusion-matrix"
math: true
---

## Introduction
A short interactive demo below helps you explore typical errors Minermont's triage classifier makes and how those errors affect per-class metrics. The system must assign each incoming case to one of three queues: **Emergency**, **Consultation**, or **Follow-up**. Try generating matrices with different accuracies and inspect which categories are confused most often.

{{< demo-intro 
    title="Triage classifier: Emergency · Consultation · Follow-up"
    medical_highlight="The confusion matrix shows exactly where the triage classifier is making mistakes — which queues are confused with each other and whether certain categories are harder to predict correctly. This is key for prioritizing improvements to the routing system."
    intro_text="The **confusion matrix** is the central tool for evaluating Minermont's triage classifier. It displays all combinations of predicted vs. actual queues, letting you compute per-class metrics (Precision, Recall, F1) and understand which types of routing errors the model is making."
    context_type="hospital"
>}}

## What is a confusion matrix?

A confusion matrix is a table that compares the model's predictions with reality. For a $K$-class classifier, it's a matrix $C \in \mathbb{R}^{K \times K}$ where:

$$
C_{ij} = |\{ n : y_n = i, \; \hat{y}_n = j \}|
$$

Each element $C_{ij}$ counts how many times a sample from actual class $i$ was predicted as class $j$.

- **Main diagonal** ($C_{ii}$): Correct predictions for each class
- **Off-diagonal**: Confusions between classes

## Interactive exploration

Use the tool below to:

1. **Generate matrices** with different accuracy levels
2. **Select a class** to see its specific metrics (TP, FP, FN, TN, Precision, Recall, F1)
3. **Highlight components** in the matrix to visualize where calculations come from
4. **View details** by clicking the ⓘ icon on each metric

{{< multiclass-confusion-matrix lang="en" >}}

## Global metrics: Macro averaging

To evaluate the overall performance of the triage system, Minermont's team calculates averages of per-class metrics:

### Macro Precision
$$
\mathrm{Precision}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{Precision}_k
$$

### Macro Recall
$$
\mathrm{Recall}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{Recall}_k
$$

### Macro F1-Score
$$
\mathrm{F1}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{F1}_k
$$

{{% notice style="tip" title="Macro or Micro?" %}}
- **Macro averaging**: Gives equal weight to each class, useful for not neglecting minority or rare classes.
- **Micro averaging**: Aggregates all decisions before calculating, favoring more frequent classes.

In many operational settings, macro averaging is preferable when you don't want smaller categories to be ignored just because they are less frequent.
{{% /notice %}}

## Interpreting confusions

When observing the confusion matrix, look for:

1. **Strong diagonal**: High values on the diagonal indicate good predictions
2. **Confusion patterns**: Which classes get confused with each other?
3. **Asymmetries**: Is the confusion bidirectional or unidirectional?

**Example**: If many Consultation cases are classified as Emergency but not vice versa, it may indicate that patient descriptions use urgent-sounding language without being truly urgent — the model needs better signals to distinguish those two queues.

## Metric-based decisions

Teams use these metrics to:

- **Adjust decision thresholds** per class
- **Identify problematic classes** that need more data or better features
- **Balance trade-offs** between precision and recall based on the operational cost of each error type
- **Justify the model** to stakeholders with quantitative evidence

## Connection to ROC/AUC

The confusion matrix captures performance at a specific decision point. To explore how metrics vary when adjusting confidence thresholds, we can also use multiclass ROC curves, extending binary analysis through one-vs-rest or one-vs-one strategies.

---

### Complementary references

- **[Evaluation metrics algebra]({{% relref "how-machines-think/Chapter 4/math/evaluation-metrics.en.md" %}})**: Complete mathematical derivations of all metrics presented here.
- **[Multiclass strategies]({{% relref "how-machines-think/Chapter 4/multiclass-strategies/_index.en.md" %}})**: How to extend binary classifiers to multiclass problems.

{{% notice style="info" title="Operational practice" %}}
At Minermont, Teresa and Javier review the confusion matrix weekly. They use it to spot systematic confusions (for example, Follow-up cases being misrouted to Emergency) and then improve data collection and labeling guidelines so the model has clearer signals.
{{% /notice %}}
