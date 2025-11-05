---
title: "📚 Bibliography: K-Means and Clustering"
description: "Resources and references on K-Means clustering algorithms and unsupervised learning"
weight: 101
draft: false
slug: "bibliography-kmeans-clustering"
---

These references build on the storyline behind the **K-Means Cluster Explorer** demo by highlighting rigorous treatments of the algorithm, practical tooling for experimentation, heuristics to pick the right number of clusters, and real-world deployments in healthcare analytics.

---

## Table of Contents

1. [Algorithm Foundations](#1-algorithm-foundations)  
2. [Hands-On Guides & Tooling](#2-hands-on-guides--tooling)  
3. [Choosing the Number of Clusters](#3-choosing-the-number-of-clusters)  
4. [Domain Applications](#4-domain-applications)

---

## 1. Algorithm Foundations

| Resource | Type | Notes | Access |
|----------|------|-------|--------|
| [scikit-learn: Clustering](https://scikit-learn.org/stable/modules/clustering.html) | Technical guide | Detailed comparison between K-Means variants, initialization schemes, and convergence criteria. | [https://scikit-learn.org/stable/modules/clustering.html](https://scikit-learn.org/stable/modules/clustering.html)
| [Wikipedia: K-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) | Reference article | Historical context, Lloyd’s algorithm, and common refinements. | [https://en.wikipedia.org/wiki/K-means_clustering](https://en.wikipedia.org/wiki/K-means_clustering)
| Bishop, C. M. (2006). *Pattern Recognition and Machine Learning* | Textbook | Chapter 9 develops the derivation of K-Means from an expectation–maximization perspective. | [https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)
| Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* | Textbook | Section 14.3 contrasts K-Means with model-based clustering approaches. | [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)

---

## 2. Hands-On Guides & Tooling

| Resource | Focus | Language |
|----------|-------|----------|
| [Google ML Crash Course: Clustering](https://developers.google.com/machine-learning/clustering) | Interactive exercises that mirror the experimentation flow of the chapter demo. | 🇬🇧 English |
| [Stanford CS229: Unsupervised Learning](http://cs229.stanford.edu/notes2021fall/cs229-notes7a.pdf) | Worked derivations plus Python pseudocode for implementing K-Means. | 🇬🇧 English |
| [Scikit-learn Tutorial – Clustering](https://scikit-learn.org/stable/auto_examples/cluster/plot_cluster_comparison.html) | Companion notebook comparing K-Means with Spectral, Agglomerative, and DBSCAN clustering. | 🇬🇧 English |

---

## 3. Choosing the Number of Clusters

| Resource | Why it matters | Access |
|----------|----------------|--------|
| [scikit-learn: Selecting the number of clusters](https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html) | Demonstrates silhouette analysis—the same heuristic emphasized in the notebook sidebar. | [https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html](https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html)
| [Wikipedia: Determining the number of clusters](https://en.wikipedia.org/wiki/Determining_the_number_of_clusters_in_a_data_set) | Summarizes elbow, gap statistic, and information criteria-based approaches. | [https://en.wikipedia.org/wiki/Determining_the_number_of_clusters_in_a_data_set](https://en.wikipedia.org/wiki/Determining_the_number_of_clusters_in_a_data_set)
| [Elbow Method for optimal value of k](https://www.geeksforgeeks.org/elbow-method-for-optimal-value-of-k-in-kmeans/) | Step-by-step tutorial for visualizing inertia curves in Python. | [https://www.geeksforgeeks.org/elbow-method-for-optimal-value-of-k-in-kmeans/](https://www.geeksforgeeks.org/elbow-method-for-optimal-value-of-k-in-kmeans/)

---

## 4. Domain Applications

| Resource | Highlight | Language |
|----------|----------|----------|
| [NIH: Machine Learning in Cancer Research](https://www.cancer.gov/research/areas/diagnosis/artificial-intelligence) | Surveys how clustering supports oncology diagnostics and treatment planning. | 🇬🇧 English |
| [Nature: Clustering for patient stratification](https://www.nature.com/articles/s41598-019-55840-z) | Case study on uncovering patient phenotypes via unsupervised pipelines. | 🇬🇧 English |
| [PubMed: K-means clustering in medical diagnosis](https://pubmed.ncbi.nlm.nih.gov/30906153/) | Literature review of clinical support tools powered by K-Means. | 🇬🇧 English |
| [WHO: Data analysis for health](https://www.who.int/data/data-collection-tools) | Multi-language hub for public health analytics platforms that rely on clustering. | 🌐 Multi-language |

---

**Note**: All links were re-checked in April 2024. For licensed materials, consult institutional libraries or open-access repositories.
