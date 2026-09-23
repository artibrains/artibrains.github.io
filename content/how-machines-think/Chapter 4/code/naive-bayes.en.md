---
title: "⚡ Naive Bayes for Emergency Triage"
weight: 86
description: "Interactive demonstration: the Naive Bayes classifier by hand and with scikit-learn, following Martha's notes."
date:
draft: false
slug: "naive-bayes-emergency-triage"
---

In chapter 4 the Minermont team wants a system that suggests the urgency level of each emergency patient, from 1 (red) to 5 (blue), always as a support for the triage nurse. This notebook follows Martha's notes (section 4.5) on the Naive Bayes classifier: it implements it by hand, compares it with scikit-learn and shows where its naive assumption helps and where it hurts.

The interactive notebook includes:

- Bayes' theorem, the prior, the likelihood and the naive independence assumption.
- A prediction worked out by hand from two symptoms.
- Gaussian Naive Bayes by hand, with logarithms, and why a bell curve fails for yes/no symptoms.
- Naive Bayes by counting frequencies, with vital signs cut into intervals and Laplace smoothing, checked against `CategoricalNB`.
- What happens when the same evidence is counted several times: an overconfident model.
- Final evaluation with the confusion matrix and per-class metrics.

{{< isolate name="42NaiveBayesClassifier" params=`lang="en"` width="100%" height="720" title="Naive Bayes for emergency triage (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/19a95pcqnabKknRas18XYxfqgaU-MFHBL)

### Bibliography

- **Domingos, P. and Pazzani, M. (1997). On the optimality of the simple Bayesian classifier under zero-one loss.** *Machine Learning*, 29, 103–130. Why Naive Bayes can classify well even when its independence assumption is false. [https://doi.org/10.1023/A:1007413511361](https://doi.org/10.1023/A:1007413511361)
- **scikit-learn User Guide – Naive Bayes**: Gaussian, multinomial, Bernoulli and categorical variants. [https://scikit-learn.org/stable/modules/naive_bayes.html](https://scikit-learn.org/stable/modules/naive_bayes.html)
- **Manning, C. D., Raghavan, P. and Schütze, H. – Introduction to Information Retrieval, chapter 13**: Naive Bayes text classification, logarithms and add-one smoothing. [https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html](https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html)
