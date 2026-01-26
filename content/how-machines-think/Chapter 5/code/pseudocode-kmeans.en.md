---
title: "📝 K-Means Clustering Pseudocode"
weight: 80
description: "The unsupervised algorithm that discovers natural groupings in data."
date: 
draft: false
slug: "kmeans-pseudocode"
---

K-Means is one of the most popular unsupervised learning algorithms for clustering. It partitions data into K clusters by iteratively assigning points to the nearest centroid and updating centroids based on assigned points.

## The Algorithm

### K-Means Clustering (Lloyd's Algorithm)

```
ALGORITHM: K-Means Clustering
─────────────────────────────────────────────────────────────────

INPUT:
    X: Data matrix of shape (n_samples, n_features)
    K: Number of clusters
    max_iterations: Maximum number of iterations (e.g., 300)
    tolerance: Convergence threshold (e.g., 1e-4)
    init: Initialization method ('random', 'k-means++')

OUTPUT:
    centroids: Final cluster centers of shape (K, n_features)
    labels: Cluster assignment for each sample of shape (n_samples,)
    inertia: Sum of squared distances to nearest centroid

PROCEDURE:
    1. // Initialize centroids
       IF init = 'random':
           centroids ← random_sample(X, K)  // Select K random points
       ELSE IF init = 'k-means++':
           centroids ← kmeans_plus_plus_init(X, K)
    
    2. // Main loop
       FOR iteration = 1 TO max_iterations:
           
           // Step 1: Assignment - assign each point to nearest centroid
           labels ← empty array of size n_samples
           
           FOR i = 1 TO n_samples:
               distances ← [||X[i] - centroids[k]||² for k = 1 to K]
               labels[i] ← argmin(distances)
           
           // Step 2: Update - recompute centroids
           new_centroids ← empty array of shape (K, n_features)
           
           FOR k = 1 TO K:
               points_in_cluster ← X[labels == k]
               
               IF |points_in_cluster| > 0:
                   new_centroids[k] ← mean(points_in_cluster, axis=0)
               ELSE:
                   // Handle empty cluster: keep old centroid or reinitialize
                   new_centroids[k] ← centroids[k]
           
           // Check for convergence
           centroid_shift ← max(||new_centroids - centroids||)
           
           IF centroid_shift < tolerance:
               PRINT "Converged at iteration", iteration
               BREAK
           
           centroids ← new_centroids
    
    3. // Compute final inertia (within-cluster sum of squares)
       inertia ← 0
       FOR i = 1 TO n_samples:
           inertia ← inertia + ||X[i] - centroids[labels[i]]||²
    
    4. RETURN centroids, labels, inertia
```

### K-Means++ Initialization

This improved initialization leads to faster convergence and better results:

```
ALGORITHM: K-Means++ Initialization
─────────────────────────────────────────────────────────────────

INPUT:
    X: Data matrix of shape (n_samples, n_features)
    K: Number of clusters

OUTPUT:
    centroids: Initial centroid positions of shape (K, n_features)

PROCEDURE:
    1. // Choose first centroid uniformly at random
       centroids ← [X[random_int(0, n_samples-1)]]
    
    2. // Choose remaining centroids with probability proportional to D²
       FOR k = 2 TO K:
           
           // Compute distance from each point to nearest existing centroid
           D² ← zeros(n_samples)
           FOR i = 1 TO n_samples:
               min_dist ← ∞
               FOR c in centroids:
                   dist ← ||X[i] - c||²
                   min_dist ← min(min_dist, dist)
               D²[i] ← min_dist
           
           // Sample next centroid with probability ∝ D²
           probabilities ← D² / sum(D²)
           next_idx ← random_choice(range(n_samples), p=probabilities)
           
           APPEND X[next_idx] to centroids
    
    3. RETURN array(centroids)
```

### The Elbow Method for Choosing K

```
ALGORITHM: Elbow Method
─────────────────────────────────────────────────────────────────

INPUT:
    X: Data matrix
    K_range: Range of K values to try (e.g., 1 to 10)

OUTPUT:
    inertias: List of inertia values for each K
    suggested_K: Suggested number of clusters (elbow point)

PROCEDURE:
    inertias ← empty list
    
    FOR K in K_range:
        _, _, inertia ← kmeans(X, K)
        APPEND inertia to inertias
    
    // Find elbow point (maximum curvature)
    // Simple heuristic: largest decrease in inertia rate
    decreases ← [inertias[i-1] - inertias[i] for i = 1 to len(inertias)-1]
    second_derivatives ← [decreases[i-1] - decreases[i] for i = 1 to len(decreases)-1]
    
    suggested_K ← argmax(second_derivatives) + 2  // +2 adjusts for indexing
    
    RETURN inertias, suggested_K

// Plot inertias vs K to visualize the "elbow"
```

### Silhouette Score

```
ALGORITHM: Silhouette Coefficient
─────────────────────────────────────────────────────────────────

// Measures how similar a point is to its own cluster vs other clusters

INPUT:
    X: Data matrix
    labels: Cluster assignments

OUTPUT:
    silhouette_scores: Score for each sample
    mean_silhouette: Average silhouette score

PROCEDURE:
    FOR each sample i:
        cluster_i ← labels[i]
        
        // a(i): Mean distance to other points in same cluster
        same_cluster ← X[labels == cluster_i AND index ≠ i]
        a[i] ← mean(||X[i] - p|| for p in same_cluster)
        
        // b(i): Mean distance to points in nearest other cluster
        b[i] ← ∞
        FOR each cluster c ≠ cluster_i:
            other_cluster ← X[labels == c]
            mean_dist ← mean(||X[i] - p|| for p in other_cluster)
            b[i] ← min(b[i], mean_dist)
        
        // Silhouette coefficient for point i
        s[i] ← (b[i] - a[i]) / max(a[i], b[i])
    
    mean_silhouette ← mean(s)
    
    RETURN s, mean_silhouette

// Interpretation:
//   s ≈ +1: Point is well-clustered
//   s ≈ 0: Point is on cluster boundary  
//   s ≈ -1: Point might be in wrong cluster
```

## Mathematical Foundation

### Objective Function

K-Means minimizes the **Within-Cluster Sum of Squares (WCSS)**:

$$J = \sum_{k=1}^{K} \sum_{i \in C_k} ||x_i - \mu_k||^2$$

Where:
- $C_k$ is the set of points in cluster $k$
- $\mu_k$ is the centroid of cluster $k$

### Convergence Proof

Each iteration decreases (or maintains) $J$:

1. **Assignment step**: For fixed centroids, assigning each point to its nearest centroid minimizes $J$.

2. **Update step**: For fixed assignments, setting $\mu_k = \frac{1}{|C_k|}\sum_{i \in C_k} x_i$ minimizes $J$.

Since $J$ is bounded below by 0 and decreases monotonically, the algorithm converges.

### Connection to EM Algorithm

K-Means can be viewed as a special case of the Expectation-Maximization algorithm for Gaussian Mixture Models with:
- Equal, fixed, spherical covariances
- Hard (0/1) cluster assignments instead of soft probabilities

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| One iteration | $O(n \cdot K \cdot m)$ | $O(K \cdot m)$ |
| Full algorithm | $O(t \cdot n \cdot K \cdot m)$ | $O(K \cdot m + n)$ |
| K-Means++ init | $O(n \cdot K \cdot m)$ | $O(K \cdot m)$ |

Where $n$ = samples, $m$ = features, $K$ = clusters, $t$ = iterations.

## Variants and Extensions

```
MINI-BATCH K-MEANS:
    // Uses random subsets for faster updates on large datasets
    
    FOR each iteration:
        batch ← random_sample(X, batch_size)
        
        // Assign batch points to clusters
        FOR x in batch:
            label ← nearest_centroid(x)
        
        // Incremental centroid update
        FOR each cluster k:
            count[k] ← count[k] + batch_count[k]
            centroids[k] ← centroids[k] + 
                           (batch_mean[k] - centroids[k]) × (batch_count[k] / count[k])


K-MEDOIDS (PAM):
    // Uses actual data points as cluster centers
    // More robust to outliers
    
    Objective: minimize Σ Σ ||x - medoid_k||
    Constraint: medoid_k ∈ X  (must be a data point)
```

## Key Insights

1. **Local Optima**: K-Means finds local minima; run multiple times with different initializations.

2. **K-Means++ Matters**: Proper initialization dramatically improves results.

3. **Feature Scaling**: Essential! Use standardization before clustering.

4. **Spherical Clusters**: Assumes clusters are roughly spherical and similar in size.

5. **Choosing K**: Use elbow method, silhouette scores, or domain knowledge.

6. **Outliers**: Sensitive to outliers; consider K-Medoids or robust alternatives.

7. **Dimensionality**: Performance degrades in high dimensions (curse of dimensionality).

## References

- **Lloyd, S.** (1982). *Least squares quantization in PCM*. IEEE Transactions on Information Theory.
- **Arthur, D., & Vassilvitskii, S.** (2007). *k-means++: The Advantages of Careful Seeding*. SODA 2007. [http://ilpubs.stanford.edu:8090/778/](http://ilpubs.stanford.edu:8090/778/)
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 14. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **scikit-learn Documentation**: KMeans. [https://scikit-learn.org/stable/modules/clustering.html#k-means](https://scikit-learn.org/stable/modules/clustering.html#k-means)
- **Sculley, D.** (2010). *Web-Scale K-Means Clustering*. WWW 2010. (Mini-batch K-Means)
