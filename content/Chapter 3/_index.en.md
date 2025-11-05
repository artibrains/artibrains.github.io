---
title: "3 - Classification Systems and Model Evaluation"
type: "chapter"
weight: 3
draft: false
slug: "classification-model-evaluation"
---

With the success of the linear regression model, the hospital team has gained confidence and credibility. Now, they face a new kind of challenge: not just predicting quantities, but classifying outcomes. Their new goal is to predict whether a patient will miss their appointment — a **binary classification** problem with major economic and operational implications.

This chapter immerses you in the techniques and dilemmas the team must solve to build a reliable classification model. You’ll learn that building the model is only the beginning; evaluating it properly and ensuring it generalizes well to new cases is just as important.

Throughout the following interactive sections, you’ll explore:

1. **[The Probability Translator]({{% relref "Chapter 3/probabilities_translator/probabilities_translator.en.md" %}})**: Discover **logistic regression**, the engine behind the team’s new model. See how it transforms patient data into a probability of absence.  
2. **[The Classifier]({{% relref "Chapter 3/juego-sigmoide/juego-sigmoide.en.md" %}})**: Learn to find the optimal classification boundary by tuning the model’s different parameters. Experiment with the **decision threshold** and observe how it affects predictions.  
3. **[The Risk Manager]({{% relref "Chapter 3/risk_gestor/risk_gestor.en.md" %}})**: Step into the shoes of a manager and adjust the model’s **decision threshold**. Experience the critical balance between the cost of false positives and false negatives.  
4. **[The Honest Validator]({{% relref "Chapter 3/k_fold_validator/k_fold_validator.en.md" %}})**: Understand why a single test isn’t enough. Compare simple validation with **cross-validation (K-Fold)** — the method the team uses to obtain a stable and reliable error estimate.  
5. **[The Complexity Tamer]({{% relref "Chapter 3/complexity/complexity.en.md" %}})**: Battle **overfitting**. Adjust complexity and **regularization** to create a model that learns real patterns instead of memorizing noise, ensuring it performs well on future patients.

Get ready to dive into the art of classification and evaluation — two foundational pillars of any real-world artificial intelligence application.

### Bibliography and Additional Resources

- **[Logistic Regression & Probability Translators]({{% relref "/Chapter 3/bibliography/bibliography-logistic-regression.en.md" %}})**: Theoretical foundations, tooling, and clinical interpretability for The Probability Translator.
- **[Classification Thresholds, Validation & Regularization]({{% relref "/Chapter 3/bibliography/bibliography-classification-evaluation.en.md" %}})**: Metrics, cross-validation strategies, and complexity control supporting the Risk Manager, Honest Validator, and Complexity Tamer demos.
