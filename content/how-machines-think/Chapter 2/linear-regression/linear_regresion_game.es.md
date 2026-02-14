---
title: "2.1 - Juego de Regresión Lineal"
description: "Aprende regresión lineal de forma interactiva encontrando la mejor línea que prediga resultados continuos."
weight: 11
draft: false
slug: "juego-regresion-lineal"
---

## Introducción

La regresión lineal nos permite encontrar la mejor relación entre diferentes variables para predecir resultados continuos cuando las variables están relacionadas linealmente. Es uno de los algoritmos fundamentales en machine learning y la base para entender métodos más complejos.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro 
    lang="es"
    title="Regresión Lineal: Línea de Mejor Ajuste"
    scenario="La regresión lineal permite encontrar la línea de mejor ajuste que minimiza los errores de predicción. En contextos operativos, esto se traduce en estimaciones más consistentes sin sobrerreaccionar a unos pocos casos atípicos."
    steps="Ajusta los Parámetros: Mueve los controles deslizantes para cambiar la pendiente y la intersección de la línea. Observa cómo cambia el error total y la calidad del ajuste.|Compara Métricas de Error: Experimenta con diferentes métricas (L1 vs L2) para entender cómo cada una evalúa la calidad del modelo de manera diferente.|Encuentra la Solución Óptima: Usa el botón 'Encontrar Mejor Ajuste' para que el algoritmo calcule automáticamente los parámetros óptimos que minimizan el error."
    medical_highlight="Observa cómo la línea se ajusta a los datos para aproximar la relación entre las variables. La métrica de error te muestra como de bien se ajusta la línea a los datos, y cómo diferentes métricas pueden penalizar los errores de manera diferente."
>}}

{{< linear-regression-game lang="es" >}}
{{< /demo-wrapper >}}

## Conceptos Fundamentales

### Métodos de Error

{{% notice style="info" title="Tipos de Métricas de Error" %}}
Hay dos formas principales de medir qué tan bien nuestra línea de predicción se ajusta a los datos:

**Error Medio Absoluto (L1)**
: Calcula el promedio de las diferencias absolutas entre valores predichos y reales. Es más robusto contra valores atípicos y se prefiere cuando los datos tienen ruido.

**Error Cuadrático Medio (L2)**
: Calcula el promedio de las diferencias al cuadrado entre valores predichos y reales. Penaliza más los errores grandes y es el método más común en regresión lineal.
{{% /notice %}}

{{% notice style="tip" title="Estrategias de Optimización" %}}
- **Ajuste manual**: Permite entender intuitivamente cómo los parámetros afectan al ajuste
- **Optimización automática**: El algoritmo encuentra los parámetros óptimos minimizando la función de error
- **Validación visual**: Observa cómo la línea se ajusta a los datos para detectar problemas
{{% /notice %}}

{{< terminal >}}
