---
title: "7.5 Benchmarks de LLM: Cuáles están vigentes, cuáles están saturados y cómo leer los resultados"
description: "Guía práctica de benchmarks modernos para LLM, qué pruebas siguen diferenciando modelos y dónde verificar resultados."
weight: 6
draft: false
slug: "benchmarks-llm"
---

## Por qué importan los benchmarks (y por qué engañan)

Los benchmarks son la forma más rápida de comparar modelos, pero es fácil malinterpretarlos.

Dos problemas típicos:

1. **Saturación**: los modelos se vuelven tan buenos (y tan entrenados sobre datasets públicos) que una prueba deja de diferenciar.
2. **Sobre-optimización del leaderboard**: se mejora la puntuación sin mejorar la utilidad real.

{{% notice style="info" title="Recordatorio en escenarios clínicos" %}}
En flujos de trabajo tipo sanidad, los leaderboards son **señales**, no pruebas. Añade siempre una evaluación de dominio y revisión humana en resultados de alto impacto.
{{% /notice %}}

## Clasificación simple: “vigentes” vs “saturados”

- **Vigentes (aún discriminan)**: separan modelos fuertes de modelos muy fuertes *hoy*.
- **Saturados (o frágiles)**: cercanos al techo, fáciles de “optimizar”, sensibles al prompt o contaminados.

Como esto cambia con el tiempo, lo más seguro es:
- usar varios benchmarks,
- fijarte en el **formato** (opción múltiple vs. respuesta libre), y
- verificar resultados en una fuente fiable.

## Benchmarks a seguir (set curado)

La lista es deliberadamente corta: cubre categorías clave sin convertirse en un catálogo.

| Categoría | Benchmarks (ejemplos) | Qué te dice |
|---|---|---|
| Conocimiento + razonamiento general | **MMLU / MMLU-Pro** | Amplitud académica; variantes Pro reducen efectos de techo |
| Ciencia/Q&A difícil | **GPQA** | Preguntas de nivel experto; menos “trivia” |
| Razonamiento desafiante | **BBH (Big-Bench Hard)** | Subconjunto difícil; útil pero sensible al prompt |
| Matemáticas en lenguaje natural | **GSM8K** *(a menudo saturado)* | Señal rápida; bueno como smoke test |
| Evaluación multi-escenario | **HELM** | Framework con reportes y metodología más principiada |
| Seguimiento de instrucciones | **IFEval** | Si cumple restricciones y formatos de salida |
| Código (clásicos) | **HumanEval / MBPP** *(a menudo saturados)* | Señal rápida; realismo limitado |
| Código “del mundo real” | **SWE-bench** | Bugs sobre repos reales; señal práctica fuerte |
| Contexto largo | **LongBench / RULER** | Si realmente usa bien contextos largos |
| Preferencia humana | **Chatbot Arena / AlpacaEval-style** | Proxy de preferencia; captura calidad “percibida” |

### Enlaces rápidos: páginas de benchmarks (para verificar metodología)

Si quieres validar una puntuación, empieza por la página/paper del benchmark:

- MMLU (paper): https://arxiv.org/abs/2009.03300
- MMLU-Pro (paper): https://arxiv.org/abs/2406.01574
- GPQA (paper): https://arxiv.org/abs/2311.12022
- BBH (paper): https://arxiv.org/abs/2210.09261
- GSM8K (paper): https://arxiv.org/abs/2110.14168
- IFEval (paper): https://arxiv.org/abs/2311.07911
- HumanEval (paper): https://arxiv.org/abs/2107.03374
- MBPP (dataset): https://github.com/google-research/google-research/tree/master/mbpp
- SWE-bench (web + leaderboard): https://www.swebench.com/
- LongBench (paper): https://arxiv.org/abs/2308.14508
- RULER (paper): https://arxiv.org/abs/2404.06654
- Chatbot Arena: https://lmarena.ai/
- AlpacaEval 2: https://tatsu-lab.github.io/alpaca_eval/

### Qué suele estar saturado (pero sigue siendo útil como baseline)

- **GSM8K**: muchos modelos rozan el techo; cambios pequeños de prompt alteran resultados.
- **HumanEval / MBPP**: buenos para checks rápidos, pero limitados para ingeniería real.
- Algunos sets de opción múltiple: vulnerables a contaminación/memorización.

### Qué suele mantenerse vigente más tiempo

- Benchmarks difíciles de memorizar (formato novedoso, nivel experto).
- Benchmarks cercanos a workflows reales (SWE-bench, tool use, tareas de contexto largo).
- Pruebas de seguimiento de instrucciones y cumplimiento de formato.

## Dónde consultar resultados (y verificar afirmaciones)

Si un model card o blog dice “SOTA”, estas páginas ayudan a comprobar el benchmark exacto, el split y la metodología:

- **Papers with Code** (páginas de benchmark + papers/implementaciones): https://paperswithcode.com/
- **Stanford HELM** (framework + reportes): https://crfm.stanford.edu/helm/
- **Hugging Face Open LLM Leaderboard** (modelos open-weight): https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- **LMSYS Chatbot Arena** (comparación por preferencia): https://lmarena.ai/
- **SWE-bench** (leaderboard + metodología): https://www.swebench.com/
- **EleutherAI lm-evaluation-harness** (evaluación reproducible): https://github.com/EleutherAI/lm-evaluation-harness

## Receta práctica de evaluación (estilo Minermont)

1. **Elige 2–3 benchmarks públicos** que se parezcan a tu tarea (p. ej., IFEval + razonamiento + contexto largo).
2. **Crea un set interno “gold”** (50–200 ejemplos) realista para tu dominio y flujo.
3. **Evalúa con prompts reales** (plantillas, herramientas, retrieval y formatos).
4. **Mide fallos**: alucinaciones, incumplimiento de restricciones, consejo inseguro, filtrado de PII.
5. **Repite tras cambios** (prompt, versión del modelo, pipeline de retrieval).

## Referencias

- HELM: https://crfm.stanford.edu/helm/
- Papers with Code: https://paperswithcode.com/
- Open LLM Leaderboard: https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- Chatbot Arena: https://lmarena.ai/
- EleutherAI LM Evaluation Harness: https://github.com/EleutherAI/lm-evaluation-harness
- SWE-bench: https://www.swebench.com/
