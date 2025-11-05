---
title: "📚 Classification Thresholds, Validation & Regularization"
description: "Key references for the Risk Manager, Honest Validator, and Complexity Tamer demos in Chapter 3."
weight: 102
draft: false
slug: "classification-evaluation-bibliography"
---

This collection focuses on **decision thresholds**, **model evaluation**, **cross-validation**, and **regularization**—the pillars behind the interactive experiences that balance clinical risk, assess generalization, and control model complexity.

---

## Table of Contents

1. [Evaluation Metrics & Thresholding](#evaluation-metrics--thresholding)  
2. [Cross-Validation & Resampling](#cross-validation--resampling)  
3. [Regularization & Generalization Control](#regularization--generalization-control)  
4. [Healthcare Case Studies](#healthcare-case-studies)

---

## 1. Evaluation Metrics & Thresholding

| Resource | Focus | Access |
|----------|-------|--------|
| Google ML Crash Course – [Thresholds and the Confusion Matrix](https://developers.google.com/machine-learning/crash-course/classification/thresholding) | Illustrated guide to shifting thresholds and interpreting error trade-offs. | 🇬🇧 English |
| Google ML Crash Course – [Accuracy, Precision, Recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) | Definitions and intuition for the metrics surfaced in the Risk Manager demo. | 🇬🇧 English |
| Google ML Crash Course – [ROC and AUC](https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc) | Explains ROC analysis, tying directly to balancing false negatives and false positives. | 🇬🇧 English |
| [scikit-learn Model Evaluation Guide](https://scikit-learn.org/stable/modules/model_evaluation.html) | Comprehensive reference covering confusion matrices, ROC, precision-recall, and calibration. | 🇬🇧 English |

---

## 2. Cross-Validation & Resampling

| Resource | Why it matters | Access |
|----------|----------------|--------|
| [scikit-learn Cross-Validation Overview](https://scikit-learn.org/stable/modules/cross_validation.html) | Describes K-Fold, Stratified, ShuffleSplit, and nested cross-validation. | 🇬🇧 English |
| Stone, M. (1974). *Cross-Validatory Choice and Assessment of Statistical Predictions.* | Classic paper formalizing cross-validation for model assessment. | [https://projecteuclid.org/journals/journal-of-the-royal-statistical-society-series-b/volume-36/issue-2/Cross-Validatory-Choice-and-Assessment-of-Statistical-Predictions/10.1111/j.2517-6161.1974.tb00994.x.full](https://projecteuclid.org/journals/journal-of-the-royal-statistical-society-series-b/volume-36/issue-2/Cross-Validatory-Choice-and-Assessment-of-Statistical-Predictions/10.1111/j.2517-6161.1974.tb00994.x.full) |
| Arlot, S. & Celisse, A. (2010). *A Survey of Cross-Validation Procedures for Model Selection.* | Survey detailing when to prefer K-Fold, leave-one-out, and Monte-Carlo cross-validation. | [https://arxiv.org/abs/0907.3838](https://arxiv.org/abs/0907.3838) |
| Kohavi, R. (1995). *A Study of Cross-Validation and Bootstrap for Accuracy Estimation and Model Selection.* | Empirical comparison that motivates the Honest Validator storyline. | [https://dl.acm.org/doi/10.5555/1643031.1643047](https://dl.acm.org/doi/10.5555/1643031.1643047) |

---

## 3. Regularization & Generalization Control

| Resource | Highlight | Access |
|----------|----------|--------|
| [scikit-learn – Regularization in Logistic Regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) | Explains the `C` hyperparameter, penalties (`L1`, `L2`, elastic net), and solver behavior. | 🇬🇧 English |
| Hastie, Tibshirani & Wainwright (2015). *Statistical Learning with Sparsity: The Lasso and Generalizations.* | Deep dive into L1/L2 penalties, shrinkage, and sparsity. | [https://web.stanford.edu/~hastie/StatLearnSparsity/](https://web.stanford.edu/~hastie/StatLearnSparsity/) |
| Ng, A. (2004). *Feature Selection, L1 vs. L2 Regularization and Rotational Invariance.* | Shows why L1 induces sparsity and when to prefer L2. | [https://cs229.stanford.edu/notes2020spring/cs229-notes3.pdf](https://cs229.stanford.edu/notes2020spring/cs229-notes3.pdf) |
| Goodfellow, Bengio & Courville (2016). *Deep Learning* – Chapter 7 | Conceptual overview of capacity control, regularization, and bias-variance trade-offs. | [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/) |

---

## 4. Healthcare Case Studies

| Resource | Contribution | Access |
|----------|--------------|--------|
| Rajkomar et al. (2018). *Scalable and Accurate Deep Learning with Electronic Health Records.* | Includes logistic baselines and evaluation metrics in clinical settings. | [https://www.nature.com/articles/s41746-018-0029-1](https://www.nature.com/articles/s41746-018-0029-1) |
| Powers (2011). *Evaluation: From Precision, Recall and F-Measure to ROC, Informedness & Markedness.* | Provides statistical interpretation of evaluation metrics used for medical classification. | [https://arxiv.org/abs/2010.16061](https://arxiv.org/abs/2010.16061) |
| Chicco & Jurman (2020). *The Advantages of the Matthews Correlation Coefficient (MCC).* | Discusses alternative metrics valuable for imbalanced clinical datasets. | [https://www.nature.com/articles/s41598-020-76158-9](https://www.nature.com/articles/s41598-020-76158-9) |
| Saito & Rehmsmeier (2015). *The Precision-Recall Plot Is More Informative than the ROC Plot when Evaluating Binary Classifiers.* | Supplement to ROC discussions for imbalanced medical screening. | [https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0118432](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0118432) |

---

**Note**: All links were re-checked in October 2025. For licensed resources, rely on institutional subscriptions or open-access copies.
