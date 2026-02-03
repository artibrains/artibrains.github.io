---
title: "8.3 Beyond Prediction: Reasoning LLMs"
description: "What changes between classic language models and the new generation focused on explicit reasoning (Chain‑of‑Thought, test‑time compute, verification, tools)."
weight: 30
slug: "reasoning-llms"
draft: false
aliases:
  - "/how-machines-think/language-revolution-llms/reasoning-llms/"
---

## Introduction

After learning how models tokenize and represent language, a natural question arises: why do some LLMs seem to "think" better than others? In recent years, **reasoning LLMs** have emerged that don’t just predict the next token—they produce **intermediate trajectories** (steps, plans, drafts) and use extra **test‑time compute** to verify and improve answers.

{{< notice style="info" title="Recommended video" >}}
The following video offers a friendly introduction to the shift toward explicit reasoning in LLMs.
{{< /notice >}}

<div style="margin:1rem 0">
{{< youtube "enLbj0igyx4" >}}
</div>

## What is a “traditional LLM”?

A traditional LLM (early GPT‑3, LLaMA, etc.) is trained with **autoregressive next‑token prediction**. Typical characteristics:

- Single objective of next‑token prediction.
- Reasoning is implicit: if present, it’s compressed in a few internal operations.
- Single forward pass at inference, with no explicit steps or search.
- Little verification beyond the model’s own probabilities.

## What does a “reasoning LLM” add?

Reasoning‑oriented models introduce mechanisms to **make steps explicit** and/or **increase inference compute**:

- Chain‑of‑Thought and variants (Self‑Consistency, Tree/Graph of Thoughts): the model **explains** steps and/or **samples multiple trajectories** to pick a consistent one.
- Test‑time compute (more samples, re‑ranking, verification): spending **more compute at inference** to improve quality.
- Tool use: code execution, math, search, knowledge bases; the model **plans → calls tools → verifies**.
- Policies tuned for hard tasks: step‑by‑step verification, auxiliary evaluators, deliberate reasoning.

## Similarities

- Transformer‑style backbone and large‑scale pretraining on text.
- Natural‑language generation and instruction following.
- Benefit from SFT and alignment (RLHF/RLAIF) for specific tasks.

## Key differences

- Inference objective:
  - Traditional: single path generation.
  - Reasoning: multiple paths and selection/consensus.
- Process representation:
  - Traditional: steps implicit.
  - Reasoning: **explicit steps** (rationales, plans, sketches, proofs), sometimes user‑visible.
- Verification:
  - Traditional: implicit confidence.
  - Reasoning: **internal/external verification** (self‑checks, evaluators, code execution, search).
- Cost and latency:
  - Traditional: faster and cheaper per query.
  - Reasoning: **more compute** and latency; in exchange, higher robustness on complex tasks.

## When to use which?

- Direct questions, basic classification, standard drafting → a **traditional LLM** often suffices.
- Multi‑step problems, math, planning, careful extraction, option evaluation → a **reasoning LLM** tends to perform better.


## References and resources

