---
title: "4 - Classification Algorithms in Depth"
type: "chapter"
weight: 4
draft: false
slug: "classification-algorithms-depth"
---

After exploring general strategies for multiclass classification, the Minermont Hospital team, under Alma’s guidance at AIA, dives into the inner workings of specific algorithms. The goal is no longer just to understand *what* they do, but *how* they do it—evaluating their strengths and weaknesses for the delicate challenge of emergency triage.

In this chapter, you’ll join the team as they analyze two of the most fundamental and interpretable algorithms in machine learning. Through interactive simulations, you’ll experience firsthand the concepts the team discusses.

1. **[K-Nearest Neighbors (K-NN)]({{% relref "how-machines-think/Chapter 4/knn/knn.en.md" %}})**: You'll explore an algorithm based on the *wisdom of the crowd*. You'll see how the simple idea of classifying a new case based on its closest neighbors can be surprisingly powerful—and understand Marta and Luis's concerns about the choice of distance metric and the "curse of dimensionality."

2. **[Decision Trees]({{% relref "how-machines-think/Chapter 4/decision-tree/decision-tree.en.md" %}})**: You'll build a model that mimics human reasoning. You'll discover why Teresa and Javier felt so aligned with this approach, which creates a set of explicit, easy-to-follow rules—much like a diagnostic flowchart.

3. **[Multiclass Strategies (OvR and OvO)]({{% relref "how-machines-think/Chapter 4/multiclass-strategies/multiclass-strategies.en.md" %}})**: You'll discover how to extend binary classification algorithms to problems with multiple classes. You'll compare One-vs-Rest (OvR) and One-vs-One (OvO) strategies, understanding when to use each in complex medical contexts.

4. **[Multiclass Confusion Matrix]({{% relref "how-machines-think/Chapter 4/multiclass-confusion-matrix/multiclass-confusion-matrix.en.md" %}})**: You'll learn to evaluate multiclass classifiers using the confusion matrix. You'll interactively explore how to calculate True/False Positives/Negatives, Precision, Recall, and F1-Score for each class, and how to interpret these metrics in the hospital triage context.

5. **[Random Forests]({{% relref "how-machines-think/Chapter 4/random-forest/random-forest.en.md" %}})**: You'll explore how multiple decision trees work together like a team of consulting physicians. You'll see how combining independent predictions improves accuracy and reduces overfitting, making diagnoses more reliable.

Get ready to open the "black box" and understand the logic driving these powerful classification algorithms.

### Algorithm Pseudocode

- **[📝 K-Nearest Neighbors Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-knn.en.md" %}})**: Complete KNN algorithm with distance metrics, KD-tree optimization, and weighted voting.
- **[📝 Naive Bayes Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-naive-bayes.en.md" %}})**: Gaussian, Multinomial, and Bernoulli variants with Laplace smoothing.
- **[📝 Decision Trees Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-decision-trees.en.md" %}})**: CART algorithm with Gini impurity, entropy criteria, and pruning techniques.
- **[📝 Random Forests Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-random-forests.en.md" %}})**: Bagging, out-of-bag error estimation, and feature importance.
- **[📝 Support Vector Machines Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-svm.en.md" %}})**: SMO algorithm, kernel functions, and the dual optimization problem.

### Mathematical Foundations

- **[Evaluation Metrics Algebra]({{% relref "how-machines-think/Chapter 4/math/evaluation-metrics.en.md" %}})**: Formal derivations of confusion matrices, precision/recall variants, and multiclass ROC/AUC underpinning the triage dashboards discussed in the chapter.
- **[Naive Bayes Foundations]({{% relref "how-machines-think/Chapter 4/math/naive-bayes.en.md" %}})**: Bayes’ rule, smoothing strategies, and interpretability hooks that justify Alma’s confidence in the model’s probabilistic reasoning.

### Bibliography and Additional Resources

- **[K-NN and Decision Trees]({{% relref "how-machines-think/Chapter 4/bibliography/bibliography-knn-decision-trees.en.md" %}})**: Verified resources and references on classification algorithms, distance metrics and medical applications.
