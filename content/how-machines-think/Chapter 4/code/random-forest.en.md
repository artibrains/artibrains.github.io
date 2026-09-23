---
title: "⚡ Random Forest for Emergency Triage"
weight: 88
description: "Interactive demonstration: bagging, out-of-bag error, feature importance and the critical levels, with the model the team chooses."
date:
draft: false
slug: "random-forest-emergency-triage"
---

In chapter 4 the Minermont team wants a system that suggests the urgency level of each emergency patient, from 1 (red) to 5 (blue), always as a support for the triage nurse. This notebook studies the random forest, the model the team finally chooses, and compares it with the other algorithms of the chapter.

The interactive notebook includes:

- Bootstrap samples and a forest built by hand, voting with the mode.
- The out-of-bag (OOB) accuracy, and the effect of the number of trees and of the features per node.
- Stability: forests trained on almost the same data agree, single trees do not.
- Multiclass evaluation: per-class precision, recall and F1, starting with the book's 3-level example.
- Impurity-based and permutation feature importance.
- The critical levels: class weights, and a cautious decision threshold for Level 1 chosen with OOB probabilities.
- Comparison with KNN, the decision tree, One-vs-Rest logistic regression and One-vs-One SVM.

{{< isolate name="42RandomForest" params=`lang="en"` width="100%" height="720" title="Random forest for emergency triage (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1QCoEPZzMCqJZo_P-kNImGUoxp_1YmcDv)

### Bibliography

- **Breiman, L. (2001). Random forests.** *Machine Learning*, 45, 5–32. The original paper: bagging, random features, OOB estimates and variable importance. [https://doi.org/10.1023/A:1010933404324](https://doi.org/10.1023/A:1010933404324)
- **scikit-learn User Guide – Random forests**: `RandomForestClassifier`, `max_features` and the other parameters. [https://scikit-learn.org/stable/modules/ensemble.html#random-forests-and-other-randomized-tree-ensembles](https://scikit-learn.org/stable/modules/ensemble.html#random-forests-and-other-randomized-tree-ensembles)
- **scikit-learn User Guide – Permutation feature importance**: how it works and why it is more reliable than impurity-based importance. [https://scikit-learn.org/stable/modules/permutation_importance.html](https://scikit-learn.org/stable/modules/permutation_importance.html)
- **scikit-learn Example – OOB errors for random forests**: how the OOB error changes with the number of trees. [https://scikit-learn.org/stable/auto_examples/ensemble/plot_ensemble_oob.html](https://scikit-learn.org/stable/auto_examples/ensemble/plot_ensemble_oob.html)
- **scikit-learn User Guide – Multiclass strategies**: `OneVsRestClassifier` and `OneVsOneClassifier`. [https://scikit-learn.org/stable/modules/multiclass.html](https://scikit-learn.org/stable/modules/multiclass.html)
