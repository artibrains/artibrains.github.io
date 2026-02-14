---
title: "5.2 The Power of Clustering: Discovering Hidden Groups"
description: "Interactive visualizer of the K-Means algorithm to uncover hidden user segments, inspired by the Minermont Service Center project."
weight: 1
draft: false
slug: "kmeans-hidden-groups"
---

## Introduction

The **K-Means** algorithm is a powerful unsupervised learning tool whose mission is to explore a dataset and discover hidden "groups" or "clusters" without requiring prior labels. It works by grouping data points that are most similar to each other, revealing the inherent structure of the information.

{{< medical-context 
    type="hospital" 
    scenario="A service center needs to identify profiles of similar users based on a few behavioral signals, without knowing beforehand how many different groups exist. The goal is to discover segments that may benefit from different routing, messaging, or support workflows."
    highlight="K-Means uncovers hidden groups with similar characteristics, helping the team design tailored processes for each segment and detect unusual clusters early."
>}}

## Interactive Demonstration

{{< demo-wrapper title="K-Means Cluster Explorer" >}}

{{< kmeans_intro_es lang="en" >}}

{{< kmeans lang="en" >}}

{{< /demo-wrapper >}}

## Core Concepts

### The Elbow Method: Finding the Optimal K

{{% notice style="info" title="What is the Elbow Method?" %}}
The Elbow Method is a fundamental heuristic technique to determine the optimal number of clusters (K) in a dataset. It runs K-Means for different values of K and computes the sum of squared errors (SSE) or "inertia" for each value.

**Process:**
1. **Run K-Means** for a range of K values (e.g., 1 to 10).  
2. **Compute Inertia (SSE)** for each K: `SSE = Σ(distance² between each point and its centroid)`.  
3. **Plot the Curve** (K on the X axis, inertia on the Y axis).  
4. **Find the "Elbow"** where the rate of decrease slows down.
{{% /notice %}}

{{% notice style="tip" title="Interpretation and Application" %}}
- **Few clusters (small K)**: High inertia, points far from centroids.  
- **Many clusters (large K)**: Low inertia, but risk of overfitting.  
- **Optimal K**: Balance between compactness and model simplicity.

The optimal point is where the curve forms an "elbow", indicating that adding more clusters does not significantly improve the grouping.
{{% /notice %}}

### K-Means Algorithm Step by Step

{{% notice style="warning" title="Iterative Process" %}}
K-Means uses an iterative refinement process:

1. **Initialization**: Place K centroids randomly.  
2. **Assignment**: Assign each point to the nearest centroid.  
3. **Update**: Recompute centroid positions as the mean of their assigned points.  
4. **Repeat** until convergence (centroids stop moving significantly).
{{% /notice %}}

{{< terminal >}}