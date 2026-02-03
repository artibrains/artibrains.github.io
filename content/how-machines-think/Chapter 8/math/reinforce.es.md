---
title: "8.1 📐 REINFORCE y RLHF"
description: "Deriva las actualizaciones de gradiente de política y describe el flujo RLHF para alinear modelos de lenguaje."
weight: 91
draft: false
slug: "refuerzo-rlhf"
math: true
aliases:
  - "/how-machines-think/revolucion-lenguaje-llms/refuerzo-rlhf/"
---

## Contexto

Alinear modelos de lenguaje con expectativas humanas se apoya en aprendizaje por refuerzo. El algoritmo REINFORCE proporciona gradientes de política sin sesgo; RLHF los complementa con datos de preferencia.

## Gradientes de política

Con política $\pi_\theta(a \mid s)$ y objetivo $J(\theta) = \mathbb{E}_{\pi_\theta}[R]$, el gradiente es

$$
\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ R \; \nabla_\theta \log \pi_\theta(a \mid s) \right].
$$

Restar un baseline $b(s)$ reduce la varianza sin sesgar el estimador:

$$
\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ (R - b(s)) \; \nabla_\theta \log \pi_\theta(a \mid s) \right].
$$

Las acciones que superan la referencia se refuerzan; las que quedan por debajo se penalizan.

## Flujo RLHF

1. **Fine-tuning supervisado (SFT).** Recolecta pares (prompt, respuesta ideal) y ajusta el modelo base.
2. **Modelado de recompensa.** Entrena una red más pequeña que puntúe respuestas según rankings humanos.
3. **Optimización de la política.** Aplica un método de gradiente de política—habitualmente PPO, pariente estable de REINFORCE—usando la recompensa aprendida más una penalización KL para mantener la política cercana al modelo SFT.

Se muestrean prompts, el modelo genera respuestas, el modelo de recompensa las evalúa y los gradientes guían la política hacia comportamientos de mayor recompensa.

## Analogía Minermont

Los médicos ordenan respuestas del asistente; un modelo de recompensa aprende esas preferencias y las actualizaciones tipo REINFORCE fomentan respuestas acordes al trato clínico deseado, desalentando recomendaciones inseguras.

## Consideraciones prácticas

- *Estabilidad.* PPO recorta actualizaciones para evitar pasos grandes; los baselines siguen siendo cruciales en secuencias extensas.
- *Reward hacking.* El modelo de recompensa solo aproxima el juicio humano; siguen siendo necesarias revisiones de seguridad y anotaciones frescas.
- *Ritmo iterativo.* Alterna entre recolectar nuevo feedback humano y ejecutar más pasos de optimización para evitar sobreajuste a datos caducos.

## Referencias

1. R. J. Williams. *Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning*. Machine Learning, 8(3-4):229–256, 1992.
2. J. Schulman et al. *Proximal Policy Optimization Algorithms*. arXiv:1707.06347, 2017.
3. J. Ouyang et al. *Training Language Models to Follow Instructions with Human Feedback*. arXiv:2203.02155, 2022.
4. OpenAI. *InstructGPT Technical Overview*. 2022.
