---
title: "⚡ K-Means Clustering of Patients"
weight: 81
description: "Interactive demonstration: K-means by hand, K-means++, feature scaling, the elbow method and the clinical reading of patient groups."
date:
draft: false
slug: "kmeans-patient-clustering"
---

In chapter 5, Lucy asks the Minermont team whether they can identify groups of patients at risk *before* they become ill. There are no labels this time, so Martha proposes unsupervised learning: let the algorithm discover the groups that exist in the data. This notebook implements K-means by hand and with scikit-learn, on a synthetic population of 2000 patients.

The interactive notebook includes:

- K-means by hand, step by step, on the small example of Martha's notes (section 5.4): assignment, update and the sum of squared errors.
- Local optima: how a bad start gets stuck, and how K-means++ chooses better starting centroids.
- A synthetic Minermont patient population with hidden profiles, and why the features must be scaled first.
- Choosing $K$ with the elbow method, and comparing several values of $K$.
- The clinical interpretation of each group, including a group at silent risk.
- How the variables we include decide the groups, and how to assign a new patient to a group.

{{< isolate name="5ClusteringWithKMeans" params=`lang="en"` width="100%" height="720" title="K-Means Clustering of Patients (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1Swme6K7b0SbUvf6EkZhC_W6tRvaA2Kkp)

### Bibliography

- **Lloyd, S. (1982). Least squares quantization in PCM.** *IEEE Transactions on Information Theory*, 28(2), 129–137. The algorithm we know today as K-means. [https://doi.org/10.1109/TIT.1982.1056489](https://doi.org/10.1109/TIT.1982.1056489)
- **Arthur, D. and Vassilvitskii, S. (2007). k-means++: The advantages of careful seeding.** *Proceedings of the 18th Annual ACM-SIAM Symposium on Discrete Algorithms*, 1027–1035. The initialization used by scikit-learn. [https://dl.acm.org/doi/10.5555/1283383.1283494](https://dl.acm.org/doi/10.5555/1283383.1283494)
- **Hubert, L. and Arabie, P. (1985). Comparing partitions.** *Journal of Classification*, 2, 193–218. The adjusted Rand index. [https://doi.org/10.1007/BF01908075](https://doi.org/10.1007/BF01908075)
- **scikit-learn User Guide – K-means**: `KMeans`, inertia and initialization. [https://scikit-learn.org/stable/modules/clustering.html#k-means](https://scikit-learn.org/stable/modules/clustering.html#k-means)
