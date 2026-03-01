---
title: "4.2 A Spectrum of Possibilities: K-NN for Multiclass Classification"
description: "Learn how the K-NN algorithm works for classification through an interactive visualization"
weight: 10
draft: false
slug: "knn-classification-proximity"
---

## Introduction

The **K-Nearest Neighbors** (K-NN) algorithm is one of the simplest and most effective machine learning algorithms for classification tasks. Its logic is intuitive: *“tell me who you hang out with, and I’ll tell you who you are.”*

{{< demo-intro 
    title="Interactive K-NN Classifier"
    medical_highlight="The K-NN algorithm classifies new data based on its proximity to known data points. It is a form of lazy learning that does not build an explicit model but instead uses the training data directly."
>}}

## Interactive Demonstration

{{< demo-wrapper title="K-NN Classifier: Cat or Dog?" >}}

{{< knn lang="en" >}}

{{< /demo-wrapper >}}

## Core Concepts

{{% notice style="info" title="How Does K-NN Work?" %}}
K-NN is a **lazy learning** algorithm — it does not build an explicit model during training. Instead, when it needs to classify a new point:

1. **Computes the distance** between the new point and all training points.  
2. **Selects the K nearest neighbors** based on that distance.  
3. **Assigns the class** that is most common among these K neighbors (majority voting).
{{% /notice %}}

{{% notice style="tip" title="Key Considerations" %}}
- **Value of K**: A small K makes the model sensitive to noise, while a large K overly smooths the decision boundaries.  
- **Distance metric**: Euclidean distance is common, but other metrics may be better suited depending on the problem.  
- **Normalization**: It’s important to normalize features when they have different scales.
{{% /notice %}}

{{< terminal >}}
