---
title: "4.1 Automated Triage in the ER: Decision Trees"
description: "Interactive visualization of how a decision tree builds classification rules, inspired by the 'Guess Who?' game."
weight: 2
draft: false
slug: "decision-tree-triage"
---

## Introduction

A **Decision Tree** is a predictive model that learns a series of simple rules — much like a flowchart — to reach a conclusion. Just like in the game *Guess Who?*, the algorithm looks for the most efficient sequence of questions to classify a case using as few steps as possible.

{{< demo-intro 
    title="Decision Tree Visualizer: Which Patient Is It?"
    algorithm_type="Interpretable classification"
    difficulty="beginner"
    medical_scenario="An emergency doctor needs a triage system to quickly classify patients. Based on symptoms and basic data, the system must determine the priority level without reviewing full medical histories."
    medical_highlight="A Decision Tree builds the perfect 'question protocol'. It learns which features are most distinctive for classifying patients, allowing the doctor to make quick and well-founded decisions by following a clear and explainable path."
    intro_text="A **Decision Tree** creates a sequence of questions to reach a conclusion, working like a 'Which Patient Is It?' game. Its main strength lies in **interpretability**: every decision can be explained step by step."
    steps="Define the Patient Group: Choose the set of patients the model will learn to distinguish. Each one has a unique profile with different symptoms, history, and demographic data.|Build the Question Protocol: Click 'Train Tree'. The algorithm will find the most efficient sequence of questions, placing the most discriminative one at the root.|Follow the Identification Path: Explore the generated tree. Each node is a clinical question. Follow the 'yes' or 'no' answers to see how the model guides you to the correct patient."
>}}
    
## Interactive Demonstration

{{< demo-wrapper title="Decision Tree Builder" >}}

{{< decision-tree >}}

{{< /demo-wrapper >}}

## Key Concepts

### How Does It Build the Questions?

{{% notice style="info" title="Optimal Split" %}}
At each node, the algorithm looks for the question that best separates the data into more “pure” (homogeneous) groups. This is measured using metrics such as:

- **Entropy** – measures the amount of disorder in the data.  
- **Gini Index** – probability of incorrect classification.  
- **Information Gain** – how much uncertainty is reduced by asking a question.
{{% /notice %}}

### Advantages and Limitations

{{% notice style="tip" title="Interpretability" %}}
**Main Advantages:**
- Easy to interpret and explain.  
- No need for data normalization.  
- Handles both numeric and categorical variables.  
- Can model nonlinear relationships.

**Main Limitations:**
- Prone to overfitting with complex datasets.  
- Unstable (small changes in data can yield very different trees).  
- May create bias toward variables with many categories.
{{% /notice %}}

{{% notice style="warning" title="Preventing Overfitting" %}}
To keep the tree from memorizing the training data:
- **Pruning** – remove branches that do not improve generalization.  
- **Maximum Depth** – limit how many levels the tree can grow.  
- **Minimum Samples** – require a minimum number of cases per leaf.
{{% /notice %}}

{{< terminal >}}
