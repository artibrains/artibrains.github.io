---
title: "📝 Decision Trees Pseudocode"
weight: 82
description: "The algorithm that learns interpretable rules through recursive partitioning."
date: 
draft: false
slug: "decision-trees-pseudocode"
---

Decision Trees are interpretable machine learning models that learn decision rules from data by recursively partitioning the feature space. They form the foundation for powerful ensemble methods like Random Forests and Gradient Boosting.

## The Algorithm

### Decision Tree Training (ID3/CART)

```
ALGORITHM: Decision Tree Construction (Recursive)
─────────────────────────────────────────────────────────────────

INPUT:
    D: Dataset with features X and labels y
    features: Set of available features to split on
    max_depth: Maximum tree depth (stopping criterion)
    min_samples_split: Minimum samples required to split a node
    criterion: Splitting criterion ('gini', 'entropy', or 'mse')

OUTPUT:
    tree: Trained decision tree

FUNCTION build_tree(D, features, depth):
    
    1. // Check stopping conditions
       IF depth ≥ max_depth OR
          |D| < min_samples_split OR
          all labels in D are the same OR
          features is empty:
           
           // Create leaf node
           IF classification:
               RETURN LeafNode(prediction = majority_class(D))
           ELSE:  // regression
               RETURN LeafNode(prediction = mean(D.y))
    
    2. // Find the best split
       best_gain ← -∞
       best_feature ← None
       best_threshold ← None
       
       FOR each feature f in features:
           thresholds ← unique values or candidate splits for f
           
           FOR each threshold t in thresholds:
               // Split data
               D_left ← samples where X[f] ≤ t
               D_right ← samples where X[f] > t
               
               // Skip invalid splits
               IF |D_left| = 0 OR |D_right| = 0:
                   CONTINUE
               
               // Calculate information gain
               gain ← compute_gain(D, D_left, D_right, criterion)
               
               IF gain > best_gain:
                   best_gain ← gain
                   best_feature ← f
                   best_threshold ← t
    
    3. // If no valid split found, create leaf
       IF best_feature is None:
           RETURN LeafNode(prediction = majority_class(D) or mean(D.y))
    
    4. // Create internal node and recurse
       D_left ← samples where X[best_feature] ≤ best_threshold
       D_right ← samples where X[best_feature] > best_threshold
       
       left_child ← build_tree(D_left, features, depth + 1)
       right_child ← build_tree(D_right, features, depth + 1)
       
       RETURN DecisionNode(
           feature = best_feature,
           threshold = best_threshold,
           left = left_child,
           right = right_child
       )

MAIN:
    RETURN build_tree(D, all_features, depth = 0)
```

### Splitting Criteria

```
FUNCTION: Impurity Measures and Information Gain
─────────────────────────────────────────────────────────────────

GINI IMPURITY (Classification):
    Gini(D) = 1 - Σₖ pₖ²
    
    where pₖ = proportion of class k in D

ENTROPY (Classification):
    Entropy(D) = -Σₖ pₖ log₂(pₖ)
    
    where pₖ = proportion of class k in D

MEAN SQUARED ERROR (Regression):
    MSE(D) = (1/|D|) Σᵢ (yᵢ - ȳ)²
    
    where ȳ = mean of y values in D

INFORMATION GAIN:
    Gain(D, split) = Impurity(D) - weighted_avg(Impurity(D_left), Impurity(D_right))
    
    weighted_avg = (|D_left|/|D|) × Impurity(D_left) + 
                   (|D_right|/|D|) × Impurity(D_right)
```

### Prediction

```
ALGORITHM: Decision Tree Prediction
─────────────────────────────────────────────────────────────────

INPUT:
    x: Sample feature vector
    tree: Trained decision tree

OUTPUT:
    prediction: Predicted class or value

FUNCTION predict(x, node):
    
    // Base case: reached a leaf
    IF node is LeafNode:
        RETURN node.prediction
    
    // Recursive case: traverse based on split
    IF x[node.feature] ≤ node.threshold:
        RETURN predict(x, node.left)
    ELSE:
        RETURN predict(x, node.right)

MAIN:
    RETURN predict(x, tree.root)
```

### Pruning (Post-Training)

```
ALGORITHM: Cost-Complexity Pruning (Minimal Cost-Complexity Pruning)
─────────────────────────────────────────────────────────────────

INPUT:
    tree: Fully grown decision tree
    X_val, y_val: Validation set
    α: Complexity parameter (regularization strength)

PROCEDURE:
    1. // Calculate cost-complexity for each subtree
       FOR each internal node in tree (bottom-up):
           
           // Cost of keeping subtree
           R(subtree) ← misclassification_rate(subtree, X_val, y_val)
           |leaves| ← number of leaves in subtree
           
           // Cost of pruning to single leaf
           R(leaf) ← misclassification_rate(majority_prediction, X_val, y_val)
           
           // Effective alpha for this node
           α_eff ← (R(leaf) - R(subtree)) / (|leaves| - 1)
           
           // Prune if complexity cost exceeds benefit
           IF α_eff ≤ α:
               Replace subtree with leaf node
    
    2. RETURN pruned tree
```

## Mathematical Foundation

### Gini Impurity

For a node with $K$ classes and proportion $p_k$ of class $k$:

$$\text{Gini}(D) = 1 - \sum_{k=1}^{K} p_k^2$$

- Gini = 0 means perfect purity (all samples belong to one class)
- Maximum Gini = $1 - 1/K$ (uniform distribution across classes)

### Information Gain (Entropy-based)

$$\text{Gain}(D, A) = H(D) - \sum_{v \in \text{values}(A)} \frac{|D_v|}{|D|} H(D_v)$$

Where entropy:
$$H(D) = -\sum_{k=1}^{K} p_k \log_2(p_k)$$

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Training | $O(n \cdot m \cdot \log n \cdot d)$ | $O(d)$ nodes |
| Prediction | $O(d)$ | $O(1)$ |

Where $n$ = samples, $m$ = features, $d$ = tree depth.

## Handling Different Feature Types

```
CATEGORICAL FEATURES:
    Option 1: One split per category value
    Option 2: Binary split (subset vs. complement)
    
MISSING VALUES:
    Option 1: Surrogate splits (use correlated features)
    Option 2: Fractional instances (send fraction down each branch)
    Option 3: Separate category for missing
```

## Key Insights

1. **Interpretability**: Trees can be visualized and explained to non-experts.

2. **No Feature Scaling**: Trees are invariant to monotonic transformations.

3. **Overfitting**: Deep trees overfit; use pruning, max_depth, or ensembles.

4. **Instability**: Small data changes can produce very different trees.

5. **Axis-Aligned Splits**: Standard trees create rectangular decision boundaries.

6. **Bias-Variance**: Shallow trees → high bias; deep trees → high variance.

## References

- **Breiman, L., Friedman, J., Olshen, R., & Stone, C.** (1984). *Classification and Regression Trees*. Wadsworth.
- **Quinlan, J. R.** (1986). *Induction of Decision Trees*. Machine Learning, 1(1), 81-106.
- **Quinlan, J. R.** (1993). *C4.5: Programs for Machine Learning*. Morgan Kaufmann.
- **scikit-learn Documentation**: Decision Trees. [https://scikit-learn.org/stable/modules/tree.html](https://scikit-learn.org/stable/modules/tree.html)
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 9. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
