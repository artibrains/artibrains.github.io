---
title: "8.3 Más allá de la predicción: LLMs de razonamiento"
description: "Qué cambia entre los modelos de lenguaje clásicos y la nueva generación de modelos centrados en el razonamiento (Chain-of-Thought, test-time compute, verificación, herramientas)."
weight: 30
slug: "llms-de-razonamiento"
draft: false
aliases:
  - "/how-machines-think/revolucion-lenguaje-llms/llms-de-razonamiento/"
---

## Introducción

Tras aprender cómo tokenizan y representan el lenguaje los modelos, es natural preguntar: ¿por qué algunos LLMs parecen "pensar" mejor que otros? En los últimos años han surgido **LLMs de razonamiento** que no solo predicen la siguiente palabra, sino que generan **trayectorias intermedias** (pasos, planes, borradores) y utilizan **cálculo en tiempo de inferencia** adicional (test‑time compute) para verificar y mejorar sus respuestas.

{{< notice style="info" title="Vídeo recomendado" >}}
A continuación se presenta un vídeo introductorio que resume el cambio de paradigma hacia el razonamiento explícito en LLMs.
{{< /notice >}}

<div style="margin:1rem 0">
{{< youtube "enLbj0igyx4" >}}
</div>

## ¿Qué entendemos por "LLM tradicional"?

Un LLM tradicional (GPT‑3, LLaMA iniciales, etc.) se entrena con **aprendizaje autoregresivo** para predecir la siguiente unidad (token) dada una secuencia previa. Sus rasgos típicos son:

- Objetivo único de predicción de siguiente token.
- Razona de forma implícita: el razonamiento, si aparece, está comprimido en pocas operaciones internas.
- Una sola pasada de inferencia, sin pasos explícitos ni búsqueda.
- Poca verificación de la respuesta más allá de la propia probabilidad del modelo.

## ¿Qué añade un "LLM de razonamiento"?

Los modelos de razonamiento introducen mecanismos para **hacer explícitos** los pasos intermedios y/o **aumentar el cómputo en inferencia**:

- «Chain‑of‑Thought» y variantes (Self‑Consistency, Tree/Graph of Thoughts): el modelo **explica** los pasos y/o **muestra múltiples trayectorias** para escoger la más consistente.
- Test‑time compute (más muestras, re‑ranking, verificación): se gasta **más cómputo en inferencia** para mejorar calidad.
- Uso de herramientas: cálculo, búsqueda, código, bases de conocimiento; el modelo **planifica → llama herramientas → verifica**.
- Políticas refinadas para tareas difíciles: verificación paso a paso, evaluadores auxiliares, "deliberate reasoning".

## Similitudes

- Arquitectura base tipo Transformer y entrenamiento masivo con texto.
- Capacidad de generar lenguaje natural y seguir instrucciones.
- Pueden beneficiarse de afinado (SFT) y alineación (RLHF/RLAIF) para tareas específicas.

## Diferencias clave

- Objetivo en inferencia:
  - Tradicional: una sola ruta de generación.
  - Razonamiento: múltiples rutas y selección/consenso.
- Representación del proceso:
  - Tradicional: pasos implícitos.
  - Razonamiento: **pasos explícitos** (racionales, planes, bosquejos, pruebas), a veces visibles para el usuario.
- Verificación:
  - Tradicional: confianza implícita del modelo.
  - Razonamiento: **verificación interna/externa** (auto‑verificación, evaluadores, ejecución de código, búsquedas).
- Coste y latencia:
  - Tradicional: más rápido y barato por consulta.
  - Razonamiento: **más cómputo** y latencia; a cambio, mayor robustez en tareas complejas.

## ¿Cuándo usar cada uno?

- Preguntas directas, clasificación básica, redacción estándar → un **LLM tradicional** suele ser suficiente.
- Problemas multi‑paso, matemáticas, planificación, extracción cuidada, evaluación de opciones → un **LLM de razonamiento** tiende a rendir mejor.


## Bibliografía y recursos
