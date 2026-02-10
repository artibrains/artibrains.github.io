---
title: "Chapter 3: Binary Classification Systems"
description: "The Next Step: Logistic Regression and SVM"
type: "chapter"
weight: 3
draft: false
slug: "classification-model-evaluation"
---

{{< chapter-subtitle >}}The Next Step: Logistic Regression and SVM{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="3" >}}

With supply predictions working, Ethan and the team tackle no-shows; Hazel guides them through logistic regression and SVM to turn yes/no decisions into better scheduling.

This chapter introduces **binary classification**: turning signals into a yes/no decision, evaluating performance correctly, and controlling overfitting with regularization.

Use the interactive sections below to experiment with decision boundaries, thresholds, validation, and regularization:

1. **[SVM Classification Game]({{% relref "how-machines-think/Chapter 3/svm-game/svm_game.en.md" %}})**: Learn about **Support Vector Machines**, one of the most powerful classification algorithms. Find the optimal decision boundary that separates two classes by maximizing the margin.
2. **[The Probability Translator]({{% relref "how-machines-think/Chapter 3/probabilities_translator/probabilities_translator.en.md" %}})**: Discover **logistic regression**, the engine behind the team’s new model. See how it transforms input signals into actionable probabilities.
3. **[The Classifier]({{% relref "how-machines-think/Chapter 3/juego-sigmoide/juego-sigmoide.en.md" %}})**: Learn to find the optimal classification boundary by tuning the model’s different parameters. Experiment with the **decision threshold** and observe how it affects predictions.
4. **[The Risk Manager]({{% relref "how-machines-think/Chapter 3/risk_gestor/risk_gestor.en.md" %}})**: Step into the shoes of a manager and adjust the model’s **decision threshold**. Experience the critical balance between the cost of false positives and false negatives.
5. **[The Honest Validator]({{% relref "how-machines-think/Chapter 3/k_fold_validator/k_fold_validator.en.md" %}})**: Understand why a single test isn’t enough. Compare simple validation with **cross-validation (K-Fold)** — the method the team uses to obtain a stable and reliable error estimate.
6. **[The Complexity Tamer]({{% relref "how-machines-think/Chapter 3/complexity/complexity.en.md" %}})**: Battle **overfitting**. Adjust complexity and **regularization** to create a model that learns real patterns instead of memorizing noise, ensuring it performs well on future cases.
7. **[Regularization Comparison]({{% relref "how-machines-think/Chapter 3/regularization-comparison/regularization-comparison.en.md" %}})**: Discover the differences between **L1 (Lasso)**, **L2 (Ridge)**, and **Elastic Net**. See in real-time how each regularization type affects model weights and feature selection, helping you choose the best strategy for your problem.
 

### Algorithm Pseudocode

- **[📝 Logistic Regression Pseudocode]({{% relref "/how-machines-think/Chapter 3/code/pseudocode-logistic-regression.en.md" %}})**: Complete pseudocode for binary and multiclass logistic regression with gradient descent training.

### Bibliography and Additional Resources

- **[Logistic Regression & Probability Translators]({{% relref "/how-machines-think/Chapter 3/bibliography/bibliography-logistic-regression.en.md" %}})**: Theoretical foundations, tooling, and interpretability for The Probability Translator.
- **[Classification Thresholds, Validation & Regularization]({{% relref "/how-machines-think/Chapter 3/bibliography/bibliography-classification-evaluation.en.md" %}})**: Metrics, cross-validation strategies, and complexity control supporting the Risk Manager, Honest Validator, and Complexity Tamer demos.
