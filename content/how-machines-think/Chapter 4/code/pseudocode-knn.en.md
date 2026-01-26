---
title: "📝 K-Nearest Neighbors (KNN) Pseudocode"
weight: 80
description: "The instance-based learning algorithm: classifying by the wisdom of neighbors."
date: 
draft: false
slug: "knn-pseudocode"
---

K-Nearest Neighbors (KNN) is one of the simplest yet powerful machine learning algorithms. It's a non-parametric, instance-based learning method that makes predictions based on the similarity to training examples.

## The Algorithm

### KNN Classification

```
ALGORITHM: K-Nearest Neighbors Classification
─────────────────────────────────────────────────────────────────

INPUT:
    X_train: Training feature matrix of shape (n_samples, n_features)
    y_train: Training labels of shape (n_samples,)
    x_query: New sample to classify of shape (n_features,)
    k: Number of neighbors to consider
    distance_metric: Function to compute distance (default: Euclidean)

OUTPUT:
    predicted_class: The predicted class label
    probabilities: Class probability distribution (optional)

PROCEDURE:
    1. // Compute distances to all training samples
       distances ← empty list
       FOR i = 1 TO n_samples:
           d ← distance_metric(x_query, X_train[i])
           APPEND (d, y_train[i], i) to distances
    
    2. // Sort by distance (ascending)
       SORT distances by first element
    
    3. // Select k nearest neighbors
       k_nearest ← first k elements of distances
    
    4. // Extract labels of k nearest neighbors
       neighbor_labels ← [label for (_, label, _) in k_nearest]
    
    5. // Majority voting
       class_counts ← count occurrences of each class in neighbor_labels
       predicted_class ← class with maximum count
    
    6. // Compute probabilities (optional)
       probabilities ← class_counts / k
    
    7. RETURN predicted_class, probabilities
```

### KNN Regression

```
ALGORITHM: K-Nearest Neighbors Regression
─────────────────────────────────────────────────────────────────

INPUT:
    X_train: Training feature matrix of shape (n_samples, n_features)
    y_train: Training target values of shape (n_samples,)
    x_query: New sample to predict
    k: Number of neighbors to consider
    distance_metric: Function to compute distance
    weighting: 'uniform' or 'distance'

OUTPUT:
    predicted_value: The predicted continuous value

PROCEDURE:
    1. // Compute distances to all training samples
       distances ← empty list
       FOR i = 1 TO n_samples:
           d ← distance_metric(x_query, X_train[i])
           APPEND (d, y_train[i]) to distances
    
    2. // Sort by distance (ascending)
       SORT distances by first element
    
    3. // Select k nearest neighbors
       k_nearest ← first k elements of distances
    
    4. IF weighting = 'uniform':
           // Simple average
           predicted_value ← mean([y for (_, y) in k_nearest])
       
       ELSE IF weighting = 'distance':
           // Weighted average (inverse distance)
           weights ← [1/d for (d, _) in k_nearest]
           // Handle d=0: set weight to very large number
           values ← [y for (_, y) in k_nearest]
           predicted_value ← Σ(weights[i] × values[i]) / Σ(weights)
    
    5. RETURN predicted_value
```

### Common Distance Metrics

```
FUNCTION: Distance Metrics
─────────────────────────────────────────────────────────────────

Euclidean Distance (L2):
    d(x, y) = √(Σᵢ (xᵢ - yᵢ)²)

Manhattan Distance (L1):
    d(x, y) = Σᵢ |xᵢ - yᵢ|

Minkowski Distance (Lp):
    d(x, y) = (Σᵢ |xᵢ - yᵢ|ᵖ)^(1/p)

Cosine Distance:
    d(x, y) = 1 - (x · y) / (||x|| × ||y||)

Hamming Distance (for categorical):
    d(x, y) = Σᵢ 𝟙(xᵢ ≠ yᵢ)
```

## Optimized KNN with KD-Tree

For large datasets, we use spatial data structures to speed up neighbor search:

```
ALGORITHM: KNN with KD-Tree
─────────────────────────────────────────────────────────────────

BUILD KD-TREE:
    FUNCTION build_kdtree(points, depth=0):
        IF points is empty:
            RETURN null
        
        axis ← depth MOD n_features
        
        SORT points by axis dimension
        median_idx ← length(points) / 2
        
        RETURN Node(
            point: points[median_idx],
            left: build_kdtree(points[:median_idx], depth + 1),
            right: build_kdtree(points[median_idx+1:], depth + 1)
        )

SEARCH K-NEAREST:
    FUNCTION search_knn(node, query, k, depth=0, heap=empty):
        IF node is null:
            RETURN heap
        
        // Add current node to candidates
        d ← distance(query, node.point)
        IF size(heap) < k:
            push (d, node.point) to heap
        ELSE IF d < max_distance in heap:
            replace max in heap with (d, node.point)
        
        axis ← depth MOD n_features
        diff ← query[axis] - node.point[axis]
        
        // Search the side containing query first
        IF diff < 0:
            first, second ← node.left, node.right
        ELSE:
            first, second ← node.right, node.left
        
        search_knn(first, query, k, depth + 1, heap)
        
        // Check if we need to search the other side
        IF size(heap) < k OR |diff| < max_distance in heap:
            search_knn(second, query, k, depth + 1, heap)
        
        RETURN heap
```

## Complexity Analysis

| Operation | Brute Force | KD-Tree (balanced) | Ball Tree |
|-----------|-------------|-------------------|-----------|
| Training | $O(1)$ | $O(n \log n)$ | $O(n \log n)$ |
| Query | $O(n \cdot m)$ | $O(k \log n)$ avg | $O(k \log n)$ avg |
| Space | $O(n \cdot m)$ | $O(n)$ | $O(n)$ |

Where $n$ = samples, $m$ = features, $k$ = neighbors.

**Note**: KD-Trees degrade to $O(n)$ in high dimensions (curse of dimensionality).

## Choosing K

```
ALGORITHM: Cross-Validation for K Selection
─────────────────────────────────────────────────────────────────

INPUT:
    X, y: Dataset
    k_range: List of k values to test (e.g., [1, 3, 5, 7, 9, ...])
    n_folds: Number of cross-validation folds

PROCEDURE:
    best_k ← 1
    best_score ← -∞
    
    FOR k in k_range:
        scores ← cross_validate(KNN(k), X, y, n_folds)
        mean_score ← average(scores)
        
        IF mean_score > best_score:
            best_score ← mean_score
            best_k ← k
    
    RETURN best_k
```

## Key Insights

1. **Lazy Learning**: No explicit training phase; all computation happens at prediction time.

2. **Feature Scaling**: Essential! Features with larger ranges dominate distance calculations.

3. **Curse of Dimensionality**: Performance degrades in high dimensions; consider dimensionality reduction.

4. **Odd K for Binary Classification**: Avoids ties in voting.

5. **Weighted Voting**: Giving closer neighbors more influence often improves results.

## References

- **Cover, T., & Hart, P.** (1967). *Nearest neighbor pattern classification*. IEEE Transactions on Information Theory. [https://ieeexplore.ieee.org/document/1053964](https://ieeexplore.ieee.org/document/1053964)
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 13. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **scikit-learn Documentation**: KNeighborsClassifier. [https://scikit-learn.org/stable/modules/neighbors.html](https://scikit-learn.org/stable/modules/neighbors.html)
- **Bentley, J. L.** (1975). *Multidimensional binary search trees used for associative searching*. Communications of the ACM.
