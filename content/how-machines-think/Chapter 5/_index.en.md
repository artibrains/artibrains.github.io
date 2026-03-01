---
title: "Chapter 5: Unsupervised Learning"
description: "The Power of Unsupervised Learning: Discovering Patterns without Labels"
type: "chapter"
weight: 5
draft: false
slug: "unsupervised-learning"
---

{{< chapter-subtitle >}}The Power of Unsupervised Learning: Discovering Patterns without Labels{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="5" >}}

Lucy challenges the team to find hidden patient groups, and Sophia introduces unsupervised learning to reveal clusters, anomalies, and risks before they escalate.

Director Elena poses a new challenge: can AI help identify groups of users that are likely to run into problems *before* they become escalations? Unlike previous projects where categories were known (urgent/normal, attend/no-show), this requires discovering hidden patterns in data without predefined labels. Marta introduces the team to unsupervised learning, where algorithms explore data to find natural groupings and structure on their own. Through clustering algorithms like k-means and hierarchical clustering, plus dimensionality reduction techniques like PCA, the team learns to uncover patterns in service usage. They discover segments that share similar behaviors, detect anomalies that might indicate sudden spikes or workflow changes, and identify subtle correlations between signals. But they also learn a crucial lesson about interpretation—the algorithm doesn't "understand" people, it only groups numbers based on similarity rules the team chooses. This chapter explores the fascinating frontier where machines help us discover what we didn't know we didn't know.

In this chapter, you’ll follow the team through their first major unsupervised learning project, where they use the **K-Means** algorithm to segment users. Through an interactive simulation, you’ll experience their process of discovery:

1. **[5.2 The Power of Clustering: Discovering Hidden Groups]({{% relref "how-machines-think/Chapter 5/kmeans/kmeans.en.md" %}})**: Step into the shoes of Marta and Luis. First, you'll use the **Elbow Method** to determine the optimal number of clusters (K)—the same methodological dilemma they faced. Then, you'll run the K-Means algorithm to visualize how it groups users, recreating the "eureka moment" when they identified a previously invisible behavior segment.

Get ready for a new way of thinking—where AI doesn't just answer our questions, but helps us discover the ones we didn't yet know we needed to ask.

### Algorithm Pseudocode

- **[📝 K-Means Clustering Pseudocode]({{% relref "/how-machines-think/Chapter 5/code/pseudocode-kmeans.en.md" %}})**: Lloyd's algorithm, K-means++ initialization, elbow method, and silhouette score analysis.

### Bibliography and Additional Resources

- **[📚 Bibliography: K-Means and Clustering]({{% relref "how-machines-think/Chapter 5/bibliography/bibliography-kmeans-clustering.en.md" %}})**: Verified resources and references on clustering algorithms, unsupervised learning and the elbow method.
