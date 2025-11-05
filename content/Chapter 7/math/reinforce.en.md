---
title: "📐 REINFORCE & RLHF"
description: "Derives policy-gradient updates and outlines the RLHF pipeline for aligning large language models."
weight: 91
draft: false
slug: "reinforce-rlhf"
math: true
---

## Context

Aligning large language models with human expectations relies on reinforcement learning. The REINFORCE algorithm supplies unbiased policy gradients, and RLHF builds on it with preference data.

## Policy Gradients in Plain Terms

For a policy $\pi_\theta(a \mid s)$ with objective $J(\theta) = \mathbb{E}_{\pi_\theta}[R]$, the gradient is

$$
\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ R \; \nabla_\theta \log \pi_\theta(a \mid s) \right].
$$

Subtracting a baseline $b(s)$ reduces variance without biasing the estimator:

$$
\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ (R - b(s)) \; \nabla_\theta \log \pi_\theta(a \mid s) \right].
$$

Actions that outperform the baseline are reinforced; those below it are discouraged.

## RLHF Pipeline

1. **Supervised fine-tuning (SFT).** Collect (prompt, ideal response) pairs and fine-tune the base model.
2. **Reward modelling.** Train a smaller network to score responses according to human rankings.
3. **Policy optimisation.** Apply a policy-gradient method—commonly PPO, a stabilised cousin of REINFORCE—using the learned reward signal plus a KL penalty to keep the policy close to the SFT baseline.

Prompts are sampled, the model generates responses, the reward model evaluates them, and gradients steer the policy toward higher-reward behaviour.

## Minermont Analogy

Physicians rank assistant responses; a reward model learns their preferences and REINFORCE-style updates encourage bedside-appropriate answers while discouraging unsafe recommendations.

## Practical Considerations

- *Stability.* PPO clips updates to avoid large steps; baselines remain essential for long sequences.
- *Reward hacking.* Reward models approximate, but do not replace, human judgement—safety reviews and fresh annotations remain critical.
- *Iteration cadence.* Alternate between collecting new human feedback and running additional policy updates to avoid overfitting to stale data.

## References

1. R. J. Williams. *Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning*. Machine Learning, 8(3-4):229–256, 1992.
2. J. Schulman et al. *Proximal Policy Optimization Algorithms*. arXiv:1707.06347, 2017.
3. J. Ouyang et al. *Training Language Models to Follow Instructions with Human Feedback*. arXiv:2203.02155, 2022.
4. OpenAI. *InstructGPT Technical Overview*. 2022.
