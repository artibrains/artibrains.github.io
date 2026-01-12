---
title: "4.3 - Multiclass Confusion Matrix"
description: "Visualize and understand how to evaluate multi-class classifiers using confusion matrices and derived metrics."
weight: 14
draft: false
slug: "multiclass-confusion-matrix"
math: true
---

## Introduction
A short interactive demo below helps you explore typical errors a triage classifier makes and how those errors affect per-class metrics. Try generating matrices with different accuracies and inspect which specialties are confused most often.

{{< demo-intro 
    title="Multiclass Confusion Matrix"
    algorithm_type="Evaluation metric"
    difficulty="intermediate"
    medical_scenario="At Minermont Hospital, Alma's team has developed a classification system that assigns patients to one of three specialty categories: Cardiology, Respiratory, or Neurology. They need to evaluate how well the model performs for each class and identify which types of errors it makes."
    medical_highlight="The confusion matrix allows the medical team to see exactly where the classifier is making mistakes: which specialties are being confused with each other, and whether certain classes are harder to predict correctly. This is critical for patient safety and resource allocation."
    intro_text="The **confusion matrix** is a fundamental evaluation tool for multiclass classification that displays all combinations of predicted vs. actual classes. It allows you to calculate per-class metrics (Precision, Recall, F1) and understand the specific types of errors your model makes."
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

To evaluate the overall system performance, Alma's team calculates averages of per-class metrics:

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

In the hospital context, macro averaging is preferable to ensure that critical low-incidence pathologies aren't lost in the averages.
{{% /notice %}}

## Interpreting confusions

When observing the confusion matrix, look for:

1. **Strong diagonal**: High values on the diagonal indicate good predictions
2. **Confusion patterns**: Which classes get confused with each other?
3. **Asymmetries**: Is the confusion bidirectional or unidirectional?

**Minermont Hospital example**: If many respiratory cases are classified as cardiology but not vice versa, it may indicate that severe respiratory symptoms (dyspnea, tachycardia) are generating false cardiac positives.

## Metric-based decisions

The team uses these metrics to:

- **Adjust decision thresholds** per class
- **Identify problematic classes** that need more data or better features
- **Balance trade-offs** between precision and recall based on clinical cost of each error type
- **Justify the model** to hospital management with quantitative evidence

## Connection to ROC/AUC

The confusion matrix captures performance at a specific decision point. To explore how metrics vary when adjusting confidence thresholds, we can also use multiclass ROC curves, extending binary analysis through one-vs-rest or one-vs-one strategies.

---

### Complementary references

- **[Evaluation metrics algebra]({{% relref "how-machines-think/Chapter 4/math/evaluation-metrics.en.md" %}})**: Complete mathematical derivations of all metrics presented here.
- **[Multiclass strategies]({{% relref "how-machines-think/Chapter 4/multiclass-strategies/multiclass-strategies.en.md" %}})**: How to extend binary classifiers to multiclass problems.

{{% notice style="info" title="Clinical practice" %}}
At Minermont Hospital, Teresa and Javier review the confusion matrix weekly in quality meetings. They've identified that neurological cases with a cardiovascular component (such as ischemic stroke) are frequently confused, which has led them to train triage staff to collect more specific features for each specialty.
{{% /notice %}}
