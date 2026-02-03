---
title: "IA en Matemáticas"
description: "De demostraciones a geometría: la IA como compañera de descubrimiento."
weight: 4
slug: "ia-matematicas"
draft: false
---

## Por qué las matemáticas son el “test de verdad” de la IA

En matemáticas no vale sonar convincente. O la prueba verifica, o no.

Por eso los avances más importantes aquí se parecen a esto:

> **Generador + verificador** (creatividad guiada por una verificación estricta).

## Avance concreto: AlphaGeometry (geometría a nivel olimpiada)

**AlphaGeometry** (DeepMind) es un ejemplo claro de “IA que se puede comprobar”. Combina:

- Un modelo neuronal que propone construcciones geométricas útiles.
- Un motor simbólico que produce pasos de demostración con estructura verificable.

DeepMind reporta que AlphaGeometry resolvió **25 de 30** problemas de geometría de una batería tipo olimpiada dentro del tiempo estándar, y publica referencias y código.

- Resumen: https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/
- Artículo (Nature): https://www.nature.com/articles/s41586-023-06747-5
- Código: https://github.com/google-deepmind/alphageometry

## Lo que enseña (más allá de matemáticas)

Si quieres IA confiable en dominios de alto riesgo, el verificador debe ser parte del flujo:

- Matemáticas: motores simbólicos / asistentes de prueba.
- Código: compiladores, tests, linters.
- Medicina: validación clínica, controles regulatorios, firma humana.

Lección Minermont: **generar es barato; verificar lo es todo**.
