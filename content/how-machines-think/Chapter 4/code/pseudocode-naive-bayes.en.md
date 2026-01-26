---
title: "📝 Naive Bayes Classifier Pseudocode"
weight: 81
description: "The probabilistic classifier based on Bayes' theorem with naive independence assumptions."
date: 
draft: false
slug: "naive-bayes-pseudocode"
---

The Naive Bayes classifier is a family of simple yet surprisingly effective probabilistic classifiers based on applying Bayes' theorem with strong (naive) independence assumptions between features.

## The Algorithm

### Core Principle: Bayes' Theorem

$$P(C_k | x) = \frac{P(x | C_k) \cdot P(C_k)}{P(x)}$$

Where:
- $P(C_k | x)$ is the **posterior** probability of class $C_k$ given features $x$
- $P(x | C_k)$ is the **likelihood** of features given class
- $P(C_k)$ is the **prior** probability of class
- $P(x)$ is the **evidence** (normalization constant)

### Naive Bayes Classification

```
ALGORITHM: Naive Bayes Classification
─────────────────────────────────────────────────────────────────

INPUT:
    x: Feature vector of shape (n_features,)
    class_priors: Prior probabilities P(C_k) for each class
    feature_likelihoods: P(x_j | C_k) for each feature j and class k

OUTPUT:
    predicted_class: The class with highest posterior probability
    posteriors: Posterior probabilities for all classes

PROCEDURE:
    1. // For each class, compute unnormalized posterior
       posteriors ← empty dictionary
       
       FOR each class k:
           // Start with log prior (use log to avoid underflow)
           log_posterior ← log(class_priors[k])
           
           // Multiply by likelihood of each feature (add in log space)
           FOR j = 1 TO n_features:
               log_posterior ← log_posterior + log(P(x[j] | C_k))
           
           posteriors[k] ← log_posterior
    
    2. // Normalize to get proper probabilities
       max_log ← max(posteriors.values())
       total ← Σ exp(posteriors[k] - max_log) for all k
       
       FOR each class k:
           posteriors[k] ← exp(posteriors[k] - max_log) / total
    
    3. // Select class with highest posterior
       predicted_class ← argmax_k(posteriors)
    
    4. RETURN predicted_class, posteriors
```

### Training: Gaussian Naive Bayes

For continuous features, we assume each feature follows a Gaussian distribution:

```
ALGORITHM: Gaussian Naive Bayes Training
─────────────────────────────────────────────────────────────────

INPUT:
    X: Training feature matrix of shape (n_samples, n_features)
    y: Training labels of shape (n_samples,)
    classes: List of unique class labels

OUTPUT:
    class_priors: Prior probability for each class
    means: Mean of each feature for each class
    variances: Variance of each feature for each class

PROCEDURE:
    1. n ← total number of samples
    
    2. // Compute class priors
       FOR each class k:
           n_k ← count samples where y = k
           class_priors[k] ← n_k / n
    
    3. // Compute mean and variance for each feature per class
       FOR each class k:
           X_k ← subset of X where y = k
           
           FOR j = 1 TO n_features:
               means[k][j] ← mean(X_k[:, j])
               variances[k][j] ← variance(X_k[:, j]) + ε
               // Add small ε to prevent division by zero
    
    4. RETURN class_priors, means, variances

GAUSSIAN LIKELIHOOD:
    P(x_j | C_k) = (1 / √(2π σ²_kj)) × exp(-(x_j - μ_kj)² / (2σ²_kj))
```

### Training: Multinomial Naive Bayes

For discrete count features (e.g., word counts in text):

```
ALGORITHM: Multinomial Naive Bayes Training
─────────────────────────────────────────────────────────────────

INPUT:
    X: Training feature matrix (counts) of shape (n_samples, n_features)
    y: Training labels
    α: Smoothing parameter (Laplace smoothing, default = 1)

OUTPUT:
    class_priors: Prior probability for each class
    feature_log_probs: Log probability of each feature given class

PROCEDURE:
    1. // Compute class priors
       FOR each class k:
           n_k ← count samples where y = k
           class_priors[k] ← n_k / n
    
    2. // Compute feature probabilities with Laplace smoothing
       FOR each class k:
           X_k ← subset of X where y = k
           
           // Total count of all features in class k
           total_count_k ← Σ X_k
           
           FOR j = 1 TO n_features:
               count_j_k ← Σ X_k[:, j]  // Sum of feature j in class k
               
               // Smoothed probability
               feature_log_probs[k][j] ← log((count_j_k + α) / 
                                              (total_count_k + α × n_features))
    
    3. RETURN class_priors, feature_log_probs
```

### Training: Bernoulli Naive Bayes

For binary features:

```
ALGORITHM: Bernoulli Naive Bayes Training
─────────────────────────────────────────────────────────────────

INPUT:
    X: Binary feature matrix of shape (n_samples, n_features)
    y: Training labels
    α: Smoothing parameter (default = 1)

OUTPUT:
    class_priors: Prior probability for each class
    feature_probs: P(x_j = 1 | C_k) for each feature and class

PROCEDURE:
    FOR each class k:
        X_k ← subset of X where y = k
        n_k ← count samples in X_k
        
        FOR j = 1 TO n_features:
            // Count occurrences of feature j = 1 in class k
            count_j_k ← sum(X_k[:, j])
            
            // Smoothed probability
            feature_probs[k][j] ← (count_j_k + α) / (n_k + 2α)
    
    RETURN class_priors, feature_probs

BERNOULLI LIKELIHOOD (includes absence of features):
    P(x | C_k) = Π_j [P(j|k)^x_j × (1 - P(j|k))^(1-x_j)]
```

## Mathematical Foundation

### The Naive Independence Assumption

The "naive" assumption is that features are conditionally independent given the class:

$$P(x_1, x_2, \ldots, x_n | C_k) = \prod_{j=1}^{n} P(x_j | C_k)$$

This simplification makes the algorithm computationally tractable:

$$P(C_k | x) \propto P(C_k) \prod_{j=1}^{n} P(x_j | C_k)$$

### Log-Probability for Numerical Stability

To avoid underflow with many features:

$$\log P(C_k | x) \propto \log P(C_k) + \sum_{j=1}^{n} \log P(x_j | C_k)$$

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Training | $O(n \cdot m \cdot k)$ | $O(m \cdot k)$ |
| Prediction | $O(m \cdot k)$ | $O(k)$ |

Where $n$ = samples, $m$ = features, $k$ = classes.

## Key Insights

1. **Speed**: Extremely fast training and prediction—scales linearly.

2. **Independence Assumption**: Often violated in practice, but algorithm still works well!

3. **Zero-Frequency Problem**: Laplace smoothing prevents zero probabilities.

4. **Text Classification**: Multinomial NB is particularly effective for document classification.

5. **Calibration**: Probabilities are often poorly calibrated; use isotonic regression if calibration matters.

## References

- **Mitchell, T.** (1997). *Machine Learning*, Chapter 6. McGraw-Hill. 
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Chapter 6. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)
- **scikit-learn Documentation**: Naive Bayes. [https://scikit-learn.org/stable/modules/naive_bayes.html](https://scikit-learn.org/stable/modules/naive_bayes.html)
- **Rish, I.** (2001). *An empirical study of the naive Bayes classifier*. IJCAI Workshop on Empirical Methods in AI.
