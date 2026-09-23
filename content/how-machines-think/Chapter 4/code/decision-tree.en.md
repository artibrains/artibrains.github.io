---
title: "⚡ Decision Tree for Emergency Triage"
weight: 87
description: "Interactive demonstration: how a decision tree chooses its questions, overfitting, depth, interpretability and instability."
date:
draft: false
slug: "decision-tree-emergency-triage"
---

In chapter 4 the Minermont team wants a system that suggests the urgency level of each emergency patient, from 1 (red) to 5 (blue), always as a support for the triage nurse. This notebook studies the decision tree, the model that most excites Claire because it resembles how nurses think in triage, and also its two weaknesses.

The interactive notebook includes:

- The Gini impurity and the search for the best split, by hand, compared with scikit-learn.
- A tree without limits: 100% on the training data and much worse on new patients.
- Choosing the maximum depth with cross-validation.
- A small tree drawn and written as rules that clinicians can read and check.
- Rigid thresholds (one year of age changes the level) and instability (two trees trained on almost the same data disagree).
- Final evaluation with the confusion matrix and per-class metrics.

{{< isolate name="42DecisionTree" params=`lang="en"` width="100%" height="720" title="Decision tree for emergency triage (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1wsXaCUhzBKZTsdLX-KQ3Afrvz71pF76y)

### Bibliography

- **Breiman, L., Friedman, J., Olshen, R. and Stone, C. (1984). Classification and Regression Trees.** Wadsworth; reprinted by Chapman & Hall/CRC. The book that introduced CART, the algorithm scikit-learn uses. [https://doi.org/10.1201/9781315139470](https://doi.org/10.1201/9781315139470)
- **scikit-learn User Guide – Decision trees**: classification, complexity control and the Gini and entropy criteria. [https://scikit-learn.org/stable/modules/tree.html](https://scikit-learn.org/stable/modules/tree.html)
- **scikit-learn Reference – `DecisionTreeClassifier`**: `max_depth`, `min_samples_leaf` and the other parameters. [https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html](https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html)
