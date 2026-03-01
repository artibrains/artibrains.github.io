---
title: "7.4 Interactive Game: Training a Language Model"
description: "Experience how a language model progressively improves its predictions as its internal parameters are adjusted."
date: 2024-01-22
weight: 4
slug: "training-language-model"
---

## Introduction

Language models don't memorize phrases. Instead, they adjust millions of numbers (parameters) based on countless related examples. Each time they process new data, they slightly modify these internal values to improve future predictions.

{{< demo-intro 
    lang="en"
    title="Training a Language Model"
    medical_highlight="The model explores different textual contexts, adjusting its internal parameters. With each processed example, its predictions gradually improve. You'll understand how accumulated context makes predictions more accurate."
    intro_text="Language model training allows AI to discover patterns in text without explicit rules, only through repeated exposure to related examples."
    steps="📝 Goal: Predict missing, next, or incorrect words in a thematic paragraph.|🧠 Mechanics: A small neural network adjusts its values after each prediction.|📊 Learning: Network nodes change color based on their values (blue = negative, white = zero, red = positive).|🎯 Progress: As you advance through the paragraph, predictions become easier thanks to accumulated context."
>}}

## Interactive Demonstration

{{< demo-wrapper title="Language Model Trainer" >}}

{{< llm-training-game lang="en" >}}

{{< /demo-wrapper >}}

## Core Concepts

{{% notice style="info" title="How Does the Model Learn?" %}}
The model adjusts its parameters iteratively:

1. **Presentation**: A sentence is shown with a word to predict
2. **Prediction**: The user (or model) chooses an answer
3. **Evaluation**: The response is compared to the correct one
4. **Adjustment**: Internal values are modified based on the result
5. **Accumulation**: Context from previous sentences facilitates future predictions
{{% /notice %}}

{{% notice style="tip" title="Training Modes" %}}
- **Missing word**: Fill in the blank in a sentence (BERT-style)
- **Next word**: Predict what word comes next (GPT-style)
- **Correction**: Identify and correct an incorrect word
{{% /notice %}}


{{< terminal lang="en" >}}
