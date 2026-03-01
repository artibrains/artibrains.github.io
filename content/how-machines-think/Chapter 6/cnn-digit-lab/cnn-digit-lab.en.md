---
title: "6.4 CNN Digit Lab: Draw, Train, and Predict"
description: "Interactive CNN lab to recognize handwritten digits: train from scratch or load a pretrained snapshot."
weight: 7
draft: false
slug: "cnn-digit-lab"
---

## Introduction

So far, we have seen single neurons and multilayer learning. The next step is to understand why **Convolutional Neural Networks (CNNs)** became the standard for image recognition tasks.

A CNN does not look at an image as an unstructured list of pixels. It learns local patterns (strokes, corners, edges), then combines them into richer visual concepts.

{{< medical-context 
    type="radiology" 
    scenario="A triage assistant receives thousands of chest X-rays every week. A traditional model that flattens pixels misses spatial structure and struggles with subtle local cues."
    highlight="A CNN scans small regions, detects local signals, and progressively builds higher-level features. This spatial hierarchy is exactly what image tasks need."
>}}

## Interactive Laboratory: CNN for Digit Recognition

In this demo, you can follow the classical workflow used in introductory computer vision:

1. Draw a digit in a box.
2. Run prediction and inspect probabilities.
3. Choose one of two paths:
   - **Train from scratch** on synthetic digit samples.
   - **Load a pretrained snapshot** and jump directly to experimentation.

{{< demo-wrapper title="CNN Digit Recognition Lab" >}}

{{< cnn-digit-demo lang="en" >}}

{{< /demo-wrapper >}}

## What is happening inside the model?

{{% notice style="info" title="CNN Architecture in this Lab" %}}
The demo uses a compact CNN pipeline:

- **Input (20×20)**: Your drawing is normalized and centered.
- **Convolution (3×3 filters)**: Detects local stroke patterns.
- **ReLU**: Keeps informative positive activations.
- **Pooling**: Compresses local responses while preserving useful structure.
- **Dense + Softmax**: Produces probabilities for digits 0–9.
{{% /notice %}}

{{% notice style="tip" title="How to explore effectively" %}}
- Draw the same digit with different writing styles.
- Compare predictions before and after training.
- Inspect the filter visualization to see how kernels specialize.
- Try short vs. longer training and observe validation accuracy.
{{% /notice %}}

{{% notice style="warning" title="Important limitation" %}}
This is an educational sandbox, not a production OCR system. It is intentionally lightweight so the learning process remains visible and interactive.
{{% /notice %}}

## Why this matters beyond digits

Digit recognition is the classic gateway to CNN intuition. Once this pipeline makes sense, the same logic scales to:

- Skin lesion triage
- Retinal image analysis
- Chest X-ray screening
- Histopathology support tools

Different domain, same principle: local visual patterns combine into high-level evidence.

## References and inspiration

- [Neural Networks (3Blue1Brown)](https://www.3blue1brown.com/lessons/neural-network-analysis)
- [CS231n: Convolutional Neural Networks](http://cs231n.stanford.edu/)
- [Deep Learning Book](https://www.deeplearningbook.org/)

{{< terminal >}}
