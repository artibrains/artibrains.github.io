---
title: "Chapter 4: Multiclass Classification"
description: "Automated Ticket Routing: Multiclass Classification"
type: "chapter"
weight: 4
draft: false
slug: "classification-algorithms-depth"
---

{{< chapter-subtitle >}}Automated Ticket Routing: Multiclass Classification{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="4" >}}

Minermont’s emergency desk is overwhelmed, and Ethan partners with Claire to build multiclass triage support that assists nurses while keeping humans in control.

This chapter focuses on **multiclass classification**: extending classifiers beyond yes/no decisions, evaluating performance per class, and using ensemble methods to improve robustness.

1. **[4.2 Multiclass Strategies: One-vs-Rest (OvR) and One-vs-One (OvO)]({{% relref "how-machines-think/Chapter 4/multiclass-strategies/_index.en.md" %}})**: You'll discover how to extend binary classification algorithms to problems with multiple classes. You'll compare One-vs-Rest (OvR) and One-vs-One (OvO) strategies, understanding when to use each in more complex real-world settings.

2. **[4.2 K-Nearest Neighbors (K-NN)]({{% relref "how-machines-think/Chapter 4/knn/knn.en.md" %}})**: You'll explore an algorithm based on the *wisdom of the crowd*. You'll see how the simple idea of classifying a new case based on its closest neighbors can be surprisingly powerful—and understand Marta and Luis's concerns about the choice of distance metric and the "curse of dimensionality."

3. **[4.2 Decision Trees]({{% relref "how-machines-think/Chapter 4/decision-tree/decision-tree.en.md" %}})**: You'll build a model that mimics human reasoning. You'll discover why Teresa and Javier felt so aligned with this approach, which creates a set of explicit, easy-to-follow rules—much like a troubleshooting flowchart.

4. **[4.2 Random Forests]({{% relref "how-machines-think/Chapter 4/random-forest/random-forest.en.md" %}})**: You'll explore how multiple decision trees work together like a team of specialists. You'll see how combining independent predictions improves accuracy and reduces overfitting, making classifications more reliable.

5. **[4.3 Multiclass Confusion Matrix]({{% relref "how-machines-think/Chapter 4/multiclass-confusion-matrix/multiclass-confusion-matrix.en.md" %}})**: You'll learn to evaluate multiclass classifiers using the confusion matrix. You'll interactively explore how to calculate True/False Positives/Negatives, Precision, Recall, and F1-Score for each class, and how to interpret these metrics when you're routing requests into multiple queues.


### Algorithm Pseudocode

- **[📝 K-Nearest Neighbors Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-knn.en.md" %}})**: Complete KNN algorithm with distance metrics, KD-tree optimization, and weighted voting.
- **[📝 Naive Bayes Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-naive-bayes.en.md" %}})**: Gaussian, Multinomial, and Bernoulli variants with Laplace smoothing.
- **[📝 Decision Trees Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-decision-trees.en.md" %}})**: CART algorithm with Gini impurity, entropy criteria, and pruning techniques.
- **[📝 Random Forests Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-random-forests.en.md" %}})**: Bagging, out-of-bag error estimation, and feature importance.
- **[📝 Support Vector Machines Pseudocode]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-svm.en.md" %}})**: SMO algorithm, kernel functions, and the dual optimization problem.

### Mathematical Foundations

- **[📐 Evaluation Metrics Algebra]({{% relref "how-machines-think/Chapter 4/math/evaluation-metrics.en.md" %}})**: Formal derivations of confusion matrices, precision/recall variants, and multiclass ROC/AUC underpinning the evaluation dashboards discussed in the chapter.
- **[📐 Naive Bayes Foundations]({{% relref "how-machines-think/Chapter 4/math/naive-bayes.en.md" %}})**: Bayes’ rule, smoothing strategies, and interpretability hooks that justify Alma’s confidence in the model’s probabilistic reasoning.

### Bibliography and Additional Resources
- **[📚 K-NN and Decision Trees]({{% relref "how-machines-think/Chapter 4/bibliography/bibliography-knn-decision-trees.en.md" %}})**: Verified resources and references on classification algorithms, distance metrics, and interpretability.
