---
title: "IA en Matemáticas"
description: "De demostraciones a geometría: la IA como compañera de descubrimiento."
weight: 4
slug: "ia-matematicas"
draft: false
---

## Por qué las matemáticas son el "test de verdad" de la IA

En matemáticas no basta con parecer convincente: una solución es correcta o no lo es. Por eso este campo es un buen punto de partida para entender cómo está evolucionando la IA, incluso si no eres matemático.

## De resolver problemas a abrir nuevas fronteras

Una forma simple de ver el progreso:

- En un extremo, la IA ya resuelve problemas difíciles que la mayoría de personas no podría resolver a mano —incluyendo problemas de olimpiada matemática de nivel mundial.
- En el otro extremo, esas mismas capacidades de razonamiento se empiezan a usar para explorar hipótesis y acelerar descubrimientos en ciencia.

La clave no es magia: es combinar un **generador** creativo (un modelo de lenguaje que propone ideas) con un **verificador** estricto (un motor simbólico que confirma o rechaza cada paso). El generador propone; el verificador decide. Juntos hacen algo que ninguno de los dos lograría solo.

## El ejemplo más concreto: geometría de olimpiada

DeepMind publicó en 2024 **AlphaGeometry**, un sistema formado por dos piezas: un modelo neuronal que propone construcciones geométricas auxiliares (los pasos que un matemático añadiría para «ver» la demostración) y un motor de deducción simbólica que comprueba si cada paso es lógicamente válido.

En una batería de 30 problemas de geometría olímpica, el sistema resolvió **25 dentro del tiempo estándar de competición** —un resultado comparable al del medallista de oro humano promedio en esos mismos problemas. Las soluciones no son aproximaciones: tienen estructura verificable por máquina.

- Anuncio oficial AlphaGeometry: https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/
- Paper en Nature: https://www.nature.com/articles/s41586-023-06747-5
- Código original AlphaGeometry: https://github.com/google-deepmind/alphageometry

Posteriormente llegó **AlphaGeometry2**, que amplió el rango de problemas abordables, subió la tasa de resolución y fue publicado en el Journal of Machine Learning Research (JMLR) con código público para reproducir partes del sistema.

- Paper JMLR AlphaGeometry2: https://www.jmlr.org/papers/v26/25-1654.html
- Repositorio oficial AlphaGeometry2: https://github.com/google-deepmind/alphageometry2

## ¿Y OpenAI en 2025?

OpenAI también publicó en 2025 avances centrados en razonamiento y resolución de problemas de varios pasos, con resultados oficiales en benchmarks matemáticos como el AIME (una competición de matemáticas de nivel preuniversitario avanzado). La tendencia es clara: el patrón generador + verificador se está extendiendo más allá de un único equipo o sistema.

- Anuncio OpenAI o3 / o4-mini (abril 2025): https://openai.com/index/introducing-o3-and-o4-mini/
- Anuncio GPT-5 (agosto 2025): https://openai.com/index/introducing-gpt-5/
- Índice de investigación OpenAI: https://openai.com/research

## Lo que enseña más allá de las matemáticas

La historia no es «la IA ya lo sabe todo». La historia es que la IA está pasando de responder preguntas a **trabajar con métodos comprobables**. Cuando hay verificación real, la confianza sube y los resultados empiezan a ser útiles en entornos exigentes:

- Matemáticas: motores simbólicos y asistentes de demostración.
- Código: compiladores, tests y revisión humana.
- Medicina: validación clínica, controles regulatorios y firma humana.

Lección Minermont: **generar es barato; verificar lo es todo**.
