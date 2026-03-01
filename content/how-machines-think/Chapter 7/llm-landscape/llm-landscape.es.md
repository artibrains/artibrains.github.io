---
title: "7.5 Panorama de LLMs: Los modelos más relevantes (y cómo compararlos)"
description: "Un mapa práctico de las familias de LLM más importantes, cuándo usarlas y dónde compararlas con benchmarks fiables."
weight: 5
draft: false
slug: "panorama-llms"
---

## Por qué existe esta página

El mundo de los LLM cambia muy rápido. En lugar de intentar coronar un único “mejor modelo”, esta página te ayuda a responder una pregunta más útil:

> **¿Qué familia de modelos es más relevante para mi caso de uso, mis restricciones y mi forma de evaluar?**

En entornos tipo Minermont (sanidad, datos sensibles, procesos regulados) la respuesta depende tanto de **despliegue y gobernanza** como de capacidad bruta.

{{% notice style="tip" title="Cómo usar esta página" %}}
Usa las **familias** para hacer una preselección y luego valida con los **hubs de benchmarks** y **leaderboards** enlazados en “Dónde comparar modelos”.
{{% /notice %}}

## Qué significa “más relevante” en la práctica

Cuando se dice “el mejor LLM”, a menudo se mezclan dimensiones distintas. Es más claro comparar según:

- **Calidad**: razonamiento, escritura, código, multilingüe
- **Fiabilidad**: seguimiento de instrucciones, salida estructurada, consistencia
- **Ventana de contexto**: cuánto texto puedes pasar (y qué tanto lo aprovecha)
- **Multimodalidad**: solo texto vs. texto+visión (y a veces audio)
- **Latencia y rendimiento**: velocidad en apps vs. procesamiento por lotes
- **Coste**: tokens, límites y coste operativo si lo autoalojas
- **Privacidad y cumplimiento**: retención de datos, opciones on-prem, auditoría
- **Licencia y despliegue**: API vs. modelos open-weight ejecutables por ti

## Familias principales de LLM (con ejemplos representativos)

### 1) Modelos “frontier” propietarios vía API

Suelen liderar en capacidad general y multimodalidad, y normalmente tienen los ecosistemas de herramientas más maduros.

- **OpenAI (familia GPT)** – capacidad general fuerte y tooling amplio.
  - Docs: https://platform.openai.com/docs/
- **Anthropic (familia Claude)** – escritura y seguimiento de instrucciones muy buenos.
  - Docs: https://docs.anthropic.com/
- **Google (familia Gemini)** – flujos de trabajo multimodales y de contexto largo en su ecosistema.
  - Docs: https://ai.google.dev/

**Cuándo son más relevantes**
- Necesitas llegar rápido a alta calidad en un producto.
- Te beneficias de multimodalidad o tool-calling “listo para usar”.

**Qué vigilar**
- Gobernanza de datos, retención y requisitos regulatorios.
- Dependencia del proveedor y cambios entre versiones.

### 2) Modelos open-weight (autoalojables)

Son la base de despliegues privados y de muchos flujos de investigación. Se pueden ejecutar en local, en tu cloud o on-prem.

Familias frecuentes:
- **Meta Llama**: https://www.llama.com/ y https://github.com/meta-llama/
- **Mistral / Mixtral**: https://docs.mistral.ai/
- **Qwen (Alibaba)**: https://huggingface.co/Qwen

**Cuándo son más relevantes**
- Necesitas **control total** sobre datos y logs.
- Quieres adaptar el modelo a un dominio (fine-tuning, alineamiento, etc.).

**Qué vigilar**
- “Open-weight” no siempre significa “open-source”: revisa licencias y usos permitidos.
- Carga operativa: serving, escalado, observabilidad y seguridad.

### 3) Modelos pequeños / en dispositivo

Son útiles cuando manda la latencia y la privacidad, o cuando quieres un “primer filtro” barato.

Ejemplos y hubs:
- **Microsoft Phi** (hub): https://huggingface.co/microsoft
- **Google Gemma** (hub): https://huggingface.co/google

### 4) Modelos orientados a código

Suelen rendir mejor en autocompletado, refactorización y tareas sobre repositorios.

Dónde seguirlos:
- Hubs “coder” en Hugging Face: https://huggingface.co/models?pipeline_tag=text-generation&search=coder
- SWE-bench (benchmark realista de bugs): https://www.swebench.com/

### 5) Sistemas con herramientas (tool-using) y verificación

Muchos despliegues modernos combinan:
- un LLM,
- **retrieval** (RAG),
- **herramientas** (búsqueda, calculadora, BD), y
- **verificadores/guardrails**.

Esto importa porque parte de las mejoras de “razonamiento” vienen del *diseño del sistema*, no solo del modelo base.

Referencias útiles:
- vLLM (serving de modelos open-weight): https://docs.vllm.ai/
- Ollama (ejecución local): https://ollama.com/

## Dónde comparar modelos (benchmarks & leaderboards)

Aquí puedes consultar “la mayoría de benchmarks” de forma agregada (leaderboards) o mediante suites reproducibles:

- **LMSYS Chatbot Arena** (preferencia humana): https://lmarena.ai/
- **Hugging Face Open LLM Leaderboard** (open-weight, evals estandarizados): https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- **Stanford CRFM HELM** (suite amplia y reportes): https://crfm.stanford.edu/helm/
- **Papers with Code** (benchmarks por tarea + leaderboards): https://paperswithcode.com/
- **EleutherAI LM Evaluation Harness** (evaluación reproducible): https://github.com/EleutherAI/lm-evaluation-harness
- **SWE-bench** (ingeniería de software real): https://www.swebench.com/
- **MLPerf** (benchmarks de rendimiento; incluye tracks de LLM): https://mlcommons.org/en/mlperf/

{{% notice style="info" title="Regla práctica" %}}
Usa **más de una señal**:
- una suite estandarizada (HELM / Open LLM Leaderboard)
- una señal humana (Arena)
- un benchmark específico de tu caso (p. ej., SWE-bench para código)
{{% /notice %}}

## Checklist ligero para selección (estilo Minermont)

1. **Empieza por restricciones**: ¿dónde viven los datos? ¿quién audita?
2. **Elige 2–4 familias**: un modelo API + un open-weight + (opcional) un modelo pequeño.
3. **Usa benchmarks para acotar**: no te obsesiones con una sola métrica.
4. **Haz una evaluación de dominio**: un set pequeño pero bien curado gana a cualquier leaderboard genérico.
5. **Añade guardrails**: citas, RAG, salida estructurada y revisión humana en tareas de alto riesgo.

## Referencias y lectura adicional

- OpenAI Docs: https://platform.openai.com/docs/
- Anthropic Docs: https://docs.anthropic.com/
- Google Gemini Docs: https://ai.google.dev/
- Meta Llama: https://www.llama.com/
- Mistral Docs: https://docs.mistral.ai/
- Hugging Face Model Hub: https://huggingface.co/models
- HELM: https://crfm.stanford.edu/helm/
- Open LLM Leaderboard: https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- Chatbot Arena: https://lmarena.ai/
- Papers with Code: https://paperswithcode.com/
