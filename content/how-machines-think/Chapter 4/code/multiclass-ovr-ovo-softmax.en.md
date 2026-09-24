---
title: "⚡ One-vs-Rest, One-vs-One and Softmax from Scratch"
weight: 89
description: "Interactive demonstration: five-level emergency triage with One-vs-Rest, One-vs-One and softmax regression, all written with NumPy."
date:
draft: false
slug: "multiclass-ovr-ovo-softmax-from-scratch"
---

Before the algorithms that are multiclass by nature, Hazel shows the team how to build a five-class classifier out of binary ones, and the team raises their weak points: the imbalance of 'Level 1 vs the rest', the ambiguity when no classifier is confident and the ties in the vote. This notebook builds One-vs-Rest, One-vs-One and softmax regression from scratch on the triage patients and compares them.

The interactive notebook includes:

- Binary logistic regression as the building block.
- One-vs-Rest: five classifiers, and why the middle level gets squeezed.
- The ambiguity of One-vs-Rest: scores that do not add up to 1.
- One-vs-One: ten classifiers, a vote and the book's rule for ties.
- Softmax regression with the categorical cross-entropy, checked against scikit-learn.
- The three strategies side by side: parameters, accuracy, recall per level and confusion matrices.
- One borderline patient and the answer of each strategy.

{{< isolate name="41OneVsRestOneVsOneAndSoftmax" params=`lang="en"` width="100%" height="720" title="One-vs-Rest, One-vs-One and Softmax from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/17w_RGY0a0AAWT6b7jrRz50aY2SNDtlJ_)

### Bibliography

- **Rifkin, R. and Klautau, A. (2004). In defense of one-vs-all classification.** *Journal of Machine Learning Research*, 5, 101–141. [https://www.jmlr.org/papers/v5/rifkin04a.html](https://www.jmlr.org/papers/v5/rifkin04a.html)
- **Hastie, T. and Tibshirani, R. (1998). Classification by pairwise coupling.** *The Annals of Statistics*, 26(2), 451–471. [https://doi.org/10.1214/aos/1028144844](https://doi.org/10.1214/aos/1028144844)
- **Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*.** Springer. Section 4.3.4, multiclass logistic regression. [https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)
