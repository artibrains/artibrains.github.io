---
title: "⚡ KNN for Emergency Triage"
weight: 85
description: "Interactive demonstration: K-nearest neighbors, distance metrics and feature scaling for multiclass triage."
date:
draft: false
slug: "knn-emergency-triage"
---

In chapter 4 the Minermont team wants a system that suggests the urgency level of each emergency patient, from 1 (red) to 5 (blue), always as a support for the triage nurse. This notebook implements the first algorithm the team studies at AIA, K-nearest neighbors (KNN), by hand and with scikit-learn, on synthetic triage data.

The interactive notebook includes:

- KNN by hand on a small example: distances, the $K$ nearest neighbors and the majority vote.
- The Euclidean, Manhattan and Chebyshev distances, their unit balls, and how the metric changes the neighbors.
- Synthetic emergency patients with vital signs, symptoms and five urgency levels.
- Why feature scaling matters: no scaling versus min-max, standardization and robust scaling.
- Choosing $K$ and the metric with stratified cross-validation, and the curse of dimensionality.
- Final evaluation with the $5 \times 5$ confusion matrix and per-class metrics.

{{< isolate name="42KNearestNeighbors" params=`lang="en"` width="100%" height="720" title="KNN for emergency triage (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1OtYiET1lK4WU_hQItheRrv1_OSmOnG97)

### Bibliography

- **Cover, T. and Hart, P. (1967). Nearest neighbor pattern classification.** *IEEE Transactions on Information Theory*, 13(1), 21–27. The classic analysis of the nearest-neighbor rule. [https://doi.org/10.1109/TIT.1967.1053964](https://doi.org/10.1109/TIT.1967.1053964)
- **scikit-learn User Guide – Nearest neighbors classification**: `KNeighborsClassifier`, weights and distance metrics. [https://scikit-learn.org/stable/modules/neighbors.html#nearest-neighbors-classification](https://scikit-learn.org/stable/modules/neighbors.html#nearest-neighbors-classification)
- **scikit-learn User Guide – Standardization and scaling**: `StandardScaler`, `MinMaxScaler` and `RobustScaler`. [https://scikit-learn.org/stable/modules/preprocessing.html#standardization-or-mean-removal-and-variance-scaling](https://scikit-learn.org/stable/modules/preprocessing.html#standardization-or-mean-removal-and-variance-scaling)
