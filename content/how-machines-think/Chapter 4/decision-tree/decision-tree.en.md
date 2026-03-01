title: "4.2 Automated Ticket Routing: Decision Trees"
description: "Interactive visualization of how a decision tree builds classification rules, inspired by the 'Guess Who?' game."
weight: 12
draft: false
slug: "decision-tree-triage"
---

## Introduction

A **Decision Tree** is a predictive model that learns a series of simple rules — much like a flowchart — to reach a conclusion. Just like in the game *Guess Who?*, the algorithm looks for the most efficient sequence of questions to classify a case using as few steps as possible.

{{< demo-intro 
    title="Decision Tree Visualizer: Which Profile Is It?"
    medical_highlight="A Decision Tree creates a sequence of questions to reach a conclusion, working like a 'Which Profile Is It?' game. Its main strength lies in interpretability: every decision can be explained step by step."
    steps="Define the Case Set: Choose the set of cases the model will learn to distinguish. Each one has a unique profile with different attributes.|Build the Question Protocol: Click 'Train Tree'. The algorithm will find the most efficient sequence of questions, placing the most discriminative one at the root.|Follow the Identification Path: Explore the generated tree. Each node is a yes/no question about a feature. Follow the answers to see how the model guides you to the correct profile."
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
