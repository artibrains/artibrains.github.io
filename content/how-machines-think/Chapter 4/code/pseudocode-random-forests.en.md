---
title: "📝 Random Forests Pseudocode"
weight: 83
description: "The ensemble method that combines multiple decision trees for robust predictions."
date: 
draft: false
slug: "random-forests-pseudocode"
---

Random Forests is a powerful ensemble learning method that builds multiple decision trees during training and outputs the mode (classification) or mean prediction (regression) of the individual trees. It reduces overfitting and improves generalization compared to single decision trees.

## The Algorithm

### Random Forest Training

```
ALGORITHM: Random Forest Training
─────────────────────────────────────────────────────────────────

INPUT:
    X: Training feature matrix of shape (n_samples, n_features)
    y: Training labels of shape (n_samples,)
    n_trees: Number of trees in the forest (e.g., 100)
    max_features: Number of features to consider at each split
                  (default: √n_features for classification, n_features/3 for regression)
    max_depth: Maximum depth of each tree (optional)
    min_samples_split: Minimum samples to split a node
    bootstrap: Whether to use bootstrap sampling (default: True)

OUTPUT:
    forest: List of trained decision trees

PROCEDURE:
    forest ← empty list
    
    FOR i = 1 TO n_trees:
        
        1. // Create bootstrap sample (sampling with replacement)
           IF bootstrap:
               indices ← sample_with_replacement(range(n_samples), size=n_samples)
               X_boot ← X[indices]
               y_boot ← y[indices]
           ELSE:
               X_boot ← X
               y_boot ← y
        
        2. // Train decision tree with random feature selection
           tree ← DecisionTree(
               max_depth = max_depth,
               min_samples_split = min_samples_split,
               max_features = max_features,  // KEY: Random feature subset at each split
               splitter = "random_subset"
           )
           
           tree.fit(X_boot, y_boot)
        
        3. APPEND tree to forest
    
    RETURN forest
```

### Modified Tree Building (Random Feature Selection)

```
ALGORITHM: Random Forest Tree Split
─────────────────────────────────────────────────────────────────

This modifies the standard decision tree split selection:

FUNCTION find_best_split(X, y, max_features):
    
    1. // Randomly select a subset of features
       all_features ← [0, 1, 2, ..., n_features-1]
       candidate_features ← random_sample(all_features, size=max_features, replace=False)
    
    2. // Find best split among only the candidate features
       best_gain ← -∞
       best_feature ← None
       best_threshold ← None
       
       FOR each feature f in candidate_features:  // NOT all features!
           FOR each threshold t in candidate_thresholds(f):
               gain ← compute_information_gain(X, y, f, t)
               
               IF gain > best_gain:
                   best_gain ← gain
                   best_feature ← f
                   best_threshold ← t
    
    3. RETURN best_feature, best_threshold
```

### Random Forest Prediction

```
ALGORITHM: Random Forest Classification Prediction
─────────────────────────────────────────────────────────────────

INPUT:
    x: Sample feature vector
    forest: List of trained decision trees

OUTPUT:
    predicted_class: Final predicted class
    probabilities: Class probability distribution

PROCEDURE:
    1. // Collect predictions from all trees
       votes ← empty dictionary
       
       FOR each tree in forest:
           prediction ← tree.predict(x)
           votes[prediction] ← votes.get(prediction, 0) + 1
    
    2. // Majority voting
       predicted_class ← argmax(votes)
    
    3. // Compute probabilities
       total_votes ← sum(votes.values())
       FOR each class c:
           probabilities[c] ← votes.get(c, 0) / total_votes
    
    4. RETURN predicted_class, probabilities


ALGORITHM: Random Forest Regression Prediction
─────────────────────────────────────────────────────────────────

INPUT:
    x: Sample feature vector
    forest: List of trained decision trees

OUTPUT:
    predicted_value: Averaged prediction

PROCEDURE:
    predictions ← empty list
    
    FOR each tree in forest:
        pred ← tree.predict(x)
        APPEND pred to predictions
    
    predicted_value ← mean(predictions)
    
    RETURN predicted_value
```

### Out-of-Bag (OOB) Error Estimation

```
ALGORITHM: Out-of-Bag Error Estimation
─────────────────────────────────────────────────────────────────

// OOB samples are those NOT included in the bootstrap sample for each tree
// They provide a "free" validation estimate

PROCEDURE:
    oob_predictions ← empty dictionary  // sample_idx → list of predictions
    
    FOR i, tree in enumerate(forest):
        // Find samples NOT in bootstrap sample for this tree
        oob_indices ← samples not in bootstrap_sample[i]
        
        FOR idx in oob_indices:
            pred ← tree.predict(X[idx])
            oob_predictions[idx].append(pred)
    
    // Aggregate OOB predictions
    oob_error ← 0
    FOR idx in oob_predictions:
        IF classification:
            final_pred ← majority_vote(oob_predictions[idx])
        ELSE:
            final_pred ← mean(oob_predictions[idx])
        
        IF final_pred ≠ y[idx]:
            oob_error ← oob_error + 1
    
    oob_error ← oob_error / n_samples
    
    RETURN oob_error
```

### Feature Importance

```
ALGORITHM: Feature Importance (Mean Decrease in Impurity)
─────────────────────────────────────────────────────────────────

PROCEDURE:
    feature_importances ← zeros(n_features)
    
    FOR each tree in forest:
        FOR each node in tree:
            IF node is internal (not leaf):
                // Weighted impurity decrease
                importance ← (node.n_samples / total_samples) × 
                             (node.impurity - 
                              (left.n_samples/node.n_samples) × left.impurity -
                              (right.n_samples/node.n_samples) × right.impurity)
                
                feature_importances[node.feature] += importance
    
    // Normalize
    feature_importances ← feature_importances / sum(feature_importances)
    
    RETURN feature_importances


ALGORITHM: Permutation Feature Importance
─────────────────────────────────────────────────────────────────

// More reliable but computationally expensive

PROCEDURE:
    baseline_score ← evaluate(forest, X_test, y_test)
    
    FOR j = 1 TO n_features:
        X_permuted ← copy(X_test)
        X_permuted[:, j] ← random_permutation(X_test[:, j])
        
        permuted_score ← evaluate(forest, X_permuted, y_test)
        
        feature_importances[j] ← baseline_score - permuted_score
    
    RETURN feature_importances
```

## Mathematical Foundation

### Why Random Forests Work

The key insight is **variance reduction through averaging**:

For $B$ independent trees with variance $\sigma^2$:
$$\text{Var}\left(\frac{1}{B}\sum_{b=1}^{B} T_b(x)\right) = \frac{\sigma^2}{B}$$

But trees from the same data are correlated with correlation $\rho$:
$$\text{Var}\left(\frac{1}{B}\sum_{b=1}^{B} T_b(x)\right) = \rho\sigma^2 + \frac{1-\rho}{B}\sigma^2$$

**Random feature selection reduces $\rho$** → Lower ensemble variance!

### Bootstrap Aggregating (Bagging)

Each tree sees approximately 63.2% of the original samples:
$$P(\text{sample NOT selected}) = \left(1 - \frac{1}{n}\right)^n \approx e^{-1} \approx 0.368$$

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Training | $O(B \cdot n \cdot m' \cdot \log n \cdot d)$ | $O(B \cdot d)$ |
| Prediction | $O(B \cdot d)$ | $O(1)$ |

Where $B$ = trees, $n$ = samples, $m'$ = max_features, $d$ = tree depth.

## Hyperparameters

| Parameter | Effect | Typical Values |
|-----------|--------|----------------|
| n_trees | More trees → better, but diminishing returns | 100-500 |
| max_features | Lower → less correlation, more bias | √m (clf), m/3 (reg) |
| max_depth | Deeper → more complex trees | None or 10-30 |
| min_samples_split | Higher → more regularization | 2-10 |
| bootstrap | True enables OOB estimation | True |

## Key Insights

1. **Parallelizable**: Trees are independent; train on multiple cores.

2. **Handles High Dimensions**: Works well even with many features.

3. **Built-in Validation**: OOB error provides estimate without separate validation set.

4. **Feature Importance**: Provides interpretable feature rankings.

5. **Robust**: Less sensitive to outliers and noise than single trees.

6. **No Scaling Needed**: Invariant to monotonic feature transformations.

## References

- **Breiman, L.** (2001). *Random Forests*. Machine Learning, 45(1), 5-32. [https://link.springer.com/article/10.1023/A:1010933404324](https://link.springer.com/article/10.1023/A:1010933404324)
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 15. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **scikit-learn Documentation**: Random Forests. [https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees](https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees)
- **Louppe, G.** (2014). *Understanding Random Forests*. PhD Thesis. [https://arxiv.org/abs/1407.7502](https://arxiv.org/abs/1407.7502)
