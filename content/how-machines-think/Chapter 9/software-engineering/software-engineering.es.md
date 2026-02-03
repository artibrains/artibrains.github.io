---
title: "IA en Ingeniería de Software"
description: "Asistentes de código, revisión y el paso a automatización verificada por humanos."
weight: 5
slug: "ia-ingenieria-software"
draft: false
---

## Despliegues reales que ya cambiaron el trabajo diario

Este es uno de los dominios donde más se nota que “la IA ya está aquí”, porque impacta directamente en repositorios y despliegues.

## Implementación concreta: GitHub Copilot (asistente en el IDE)

GitHub Copilot es un asistente integrado en IDEs que ayuda con autocompletado, chat en el editor y tareas del ciclo de desarrollo.

- Producto: https://github.com/features/copilot
- Anuncio Copilot X (chat en el editor, PRs, docs): https://github.blog/2023-03-22-github-copilot-x-the-ai-powered-developer-experience/

Por qué importa: mete la IA dentro de un flujo que ya tiene “verificadores” (tests, compilación, revisión).

## Implementación concreta: AlphaDev en LLVM libc++ (mejores algoritmos)

No toda “IA para software” genera código. A veces descubre mejores rutinas de bajo nivel.

DeepMind describe cómo **AlphaDev** encontró rutinas de ordenación más rápidas que acabaron integradas en **LLVM libc++**, y también mejoras de hashing publicadas en **Abseil**.

- Artículo de DeepMind: https://deepmind.google/discover/blog/alphadev-discovers-faster-sorting-algorithms/

## El flujo seguro (reutilizable)

- IA propone cambios.
- Herramientas verifican (build/tests/linters).
- Humanos revisan y asumen responsabilidad.

{{< notice style="info" title="Por qué funciona aquí" >}}
En software existen verificadores automáticos potentes. Por eso la adopción es rápida.
{{< /notice >}}
