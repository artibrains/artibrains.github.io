---
title: "7.7 Interactive Tutorial: Backpropagation Step by Step"
description: "Learn how neural networks learn by computing the forward and backward pass yourself, understanding exactly how gradients flow and weights update."
date: 2024-01-23
weight: 70
slug: "backpropagation-step-by-step"
aliases: ["/how-machines-think/chapter-6/backpropagation-tutorial/backpropagation-step-by-step/", "/how-machines-think/chapter-6/backpropagation-tutorial/"]
---

## Introduction

Backpropagation is the fundamental algorithm that allows neural networks to learn. It's how errors at the output propagate backward through the network, telling each weight exactly how much it contributed to the mistake and how to adjust.

{{< demo-intro 
    lang="en"
    title="Backpropagation Tutorial"
    medical_scenario="The Minermont research team needs to understand exactly how their diagnostic AI learns from its mistakes to improve predictions."
    medical_highlight="Each training example flows through the network (forward pass), produces an error, and that error flows backward (backward pass) to update every weight. You will perform these calculations yourself."
    intro_text="**Backpropagation** combines the chain rule from calculus with efficient computation to train neural networks. This tutorial breaks it down into manageable steps."
    steps="🔢 You'll see a simple network with random initial weights.|📥 An input-output training example is presented.|➡️ You compute the forward pass step by step.|📊 You calculate the error at the output.|⬅️ You propagate gradients backward using the chain rule.|🔄 You update the weights using gradient descent.|🎯 See how the network improves with each pass!"
>}}

## Interactive Demonstration

{{< demo-wrapper title="Backpropagation Step-by-Step Trainer" >}}

{{< backpropagation-tutorial lang="en" >}}

{{< /demo-wrapper >}}

## Core Concepts

{{% notice style="info" title="The Two Phases of Backpropagation" %}}
Training a neural network involves two alternating phases:

1. **Forward Pass**: Input flows through the network, layer by layer, producing an output
2. **Backward Pass**: The error at the output flows backward, computing gradients for each weight
3. **Weight Update**: Each weight is adjusted in the direction that reduces the error

This process repeats for many training examples until the network learns the desired behavior.
{{% /notice %}}

{{% notice style="tip" title="The Chain Rule is the Key" %}}
The magic of backpropagation is the **chain rule** from calculus:

$$\frac{\partial E}{\partial w} = \frac{\partial E}{\partial o} \cdot \frac{\partial o}{\partial net} \cdot \frac{\partial net}{\partial w}$$

This tells us: "How does the error change when we change this weight?" by breaking it into simpler steps.

- $\frac{\partial E}{\partial o}$: How error changes with output
- $\frac{\partial o}{\partial net}$: How output changes with weighted sum (activation derivative)
- $\frac{\partial net}{\partial w}$: How weighted sum changes with weight (just the input!)
{{% /notice %}}

{{% notice style="note" title="The Activation Function" %}}
In this tutorial, we use the **sigmoid** activation function:

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

Its derivative has a beautiful property:

$$\sigma'(x) = \sigma(x) \cdot (1 - \sigma(x))$$

This means if you know the output, you can easily compute the derivative!
{{% /notice %}}

{{% notice style="warning" title="Learning Rate" %}}
The **learning rate** ($\eta$) controls how big each weight update is:

$$w_{new} = w_{old} - \eta \cdot \frac{\partial E}{\partial w}$$

- Too large: The network may overshoot and never converge
- Too small: Learning is very slow
- Just right: Smooth convergence to good solutions

In this tutorial, we use $\eta = 0.5$ for clear, visible updates.
{{% /notice %}}

{{< terminal lang="en" >}}
