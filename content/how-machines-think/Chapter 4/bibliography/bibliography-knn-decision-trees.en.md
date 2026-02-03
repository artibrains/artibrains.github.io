---
title: "📚 K-NN and Decision Trees"
description: "Verified sources to expand on the K-Nearest Neighbors and Decision Trees concepts shown in the interactive demonstrations."
weight: 101
draft: false
slug: "bibliography-knn-decision-trees"
---

These references reinforce the chapter’s storyline on **interpretable classifiers** by expanding the math behind proximity-based methods, surfacing tuning tips for tree-based models, and curating case studies where clarity is critical for adoption.

---

## Table of Contents

1. [K-Nearest Neighbors Foundations](#1-k-nearest-neighbors-foundations)  
2. [Decision Trees](#2-decision-trees)  
3. [Distance Metrics & Feature Scaling](#3-distance-metrics--feature-scaling)  
4. [Case Studies and Adoption](#4-case-studies-and-adoption)  
5. [Additional Resources](#5-additional-resources)

---

## 1. K-Nearest Neighbors Foundations

| Resource | Type | Notes | Access |
|----------|------|-------|--------|
| [Nearest Neighbors — scikit-learn](https://scikit-learn.org/stable/modules/neighbors.html) | Documentation | Covers algorithm choices (`KNeighborsClassifier`, `RadiusNeighbors`), distance metrics, and tree-based acceleration. | [https://scikit-learn.org/stable/modules/neighbors.html](https://scikit-learn.org/stable/modules/neighbors.html)
| [K-nearest neighbors algorithm — Wikipedia](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) | Reference article | Historical origins, mathematical formulation, and common variants (weighted, radius-based). | [https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
| [K-Nearest Neighbors — IBM Think](https://www.ibm.com/topics/knn) | Overview | Business-friendly explanation of strengths, limitations, and data preparation requirements. | [https://www.ibm.com/topics/knn](https://www.ibm.com/topics/knn)
| [Machine Learning Basics with K-NN](https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761) | Tutorial | Step-by-step example highlighting decision boundaries, hyperparameter selection, and scaling. | [https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761](https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761)
| Bishop, C. M. (2006). *Pattern Recognition and Machine Learning* | Textbook | Chapter 2 presents nearest-neighbor methods and links them to Bayesian decision theory. | [https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)

---

## 2. Decision Trees

| Resource | Type | Notes | Access |
|----------|------|-------|--------|
| [Decision Trees — scikit-learn](https://scikit-learn.org/stable/modules/tree.html) | Documentation | Explains CART splits, impurity measures, cost-complexity pruning, and feature importance. | [https://scikit-learn.org/stable/modules/tree.html](https://scikit-learn.org/stable/modules/tree.html)
| [Decision tree — Wikipedia](https://en.wikipedia.org/wiki/Decision_tree) | Reference article | Surveys ID3, C4.5, CART, and includes algorithmic pseudocode and applications. | [https://en.wikipedia.org/wiki/Decision_tree](https://en.wikipedia.org/wiki/Decision_tree)
| [Decision Tree Algorithm Explained](https://www.analyticsvidhya.com/blog/2021/08/decision-tree-algorithm/) | Tutorial | Visual walkthrough of split criteria, pruning strategies, and implementation tips. | [https://www.analyticsvidhya.com/blog/2021/08/decision-tree-algorithm/](https://www.analyticsvidhya.com/blog/2021/08/decision-tree-algorithm/)
| [Decision Region Visualizer — MLxtend](http://rasbt.github.io/mlxtend/user_guide/plotting/plot_decision_regions/) | Tool | Ready-to-use plotting utility for showcasing K-NN vs. tree boundaries in 2D. | [http://rasbt.github.io/mlxtend/user_guide/plotting/plot_decision_regions/](http://rasbt.github.io/mlxtend/user_guide/plotting/plot_decision_regions/)
| Breiman, L., Friedman, J., Olshen, R., & Stone, C. (1984). *Classification and Regression Trees* | Monograph | Definitive treatment of tree induction, pruning, and interpretability. | [https://doi.org/10.1201/9781315139470](https://doi.org/10.1201/9781315139470)

---

## 3. Distance Metrics & Feature Scaling

| Resource | Focus | Access |
|----------|-------|--------|
| [Pairwise distances — scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise_distances.html) | Catalog of supported metrics (Euclidean, cosine, Mahalanobis) with usage notes. | [https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise_distances.html](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise_distances.html)
| [Feature scaling and normalization — scikit-learn](https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler) | Highlights `StandardScaler`, `MinMaxScaler`, and pipelines for consistent preprocessing. | [https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler](https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler)
| [The Curse of Dimensionality — StatQuest](https://www.youtube.com/watch?v=mDaxrKL2iWw) | Animated explainer detailing why high dimensionality degrades K-NN performance. | [https://www.youtube.com/watch?v=mDaxrKL2iWw](https://www.youtube.com/watch?v=mDaxrKL2iWw)
| [Dimensionality reduction — Wikipedia](https://en.wikipedia.org/wiki/Dimensionality_reduction) | Overview of PCA, ICA, and manifold learning to mitigate distance concentration. | [https://en.wikipedia.org/wiki/Dimensionality_reduction](https://en.wikipedia.org/wiki/Dimensionality_reduction)

---

## 4. Case Studies and Adoption

| Resource | Highlight | Access |
|----------|----------|--------|
| [K-NN for cancer classification](https://link.springer.com/article/10.1007/s10916-012-9833-7) | Demonstrates benign vs. malignant tumor detection with K-NN on the WBCD dataset. | [https://link.springer.com/article/10.1007/s10916-012-9833-7](https://link.springer.com/article/10.1007/s10916-012-9833-7)
| [Decision trees in medical diagnosis](https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/1472-6947-9-11) | Evaluates tree-based decision support for clinical protocols and transparency. | [https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/1472-6947-9-11](https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/1472-6947-9-11)
| [Clinical decision support systems — WHO](https://www.who.int/publications/i/item/clinical-decision-support-systems-for-family-planning) | WHO guidance on rule-based systems echoing tree logic in reproductive health. | [https://www.who.int/publications/i/item/clinical-decision-support-systems-for-family-planning](https://www.who.int/publications/i/item/clinical-decision-support-systems-for-family-planning)
| [Machine Learning for Healthcare — MIT OCW](https://ocw.mit.edu/courses/hst-953j-machine-learning-for-healthcare-spring-2019/) | Graduate-level lectures featuring K-NN and tree applications with medical datasets. | [https://ocw.mit.edu/courses/hst-953j-machine-learning-for-healthcare-spring-2019/](https://ocw.mit.edu/courses/hst-953j-machine-learning-for-healthcare-spring-2019/)

---

## 5. Additional Resources

| Resource | Focus | Access |
|----------|-------|--------|
| [scikit-learn example gallery — classification](https://scikit-learn.org/stable/auto_examples/index.html#classification) | Curated notebooks comparing K-NN, trees, ensembles, and evaluation visuals. | [https://scikit-learn.org/stable/auto_examples/index.html#classification](https://scikit-learn.org/stable/auto_examples/index.html#classification)
| [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course) | Interactive modules covering supervised learning best practices. | [https://developers.google.com/machine-learning/crash-course](https://developers.google.com/machine-learning/crash-course)
| Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* | Chapters 13–14 deepen K-NN and tree theory with medical examples. | [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)

---

**Note**: All links were re-checked in October 2025. For licensed material, leverage institutional access or open repositories.
