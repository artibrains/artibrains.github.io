---
title: "2.1 - Juego de Regresión Lineal"
description: "Aprende regresión lineal de forma interactiva encontrando la mejor línea que prediga resultados continuos."
weight: 11
draft: false
slug: "juego-regresion-lineal"
---

## Introducción

La regresión lineal nos permite encontrar la mejor relación entre diferentes variables para predecir resultados continuos cuando las variables están relacionadas linealmente. Es uno de los algoritmos fundamentales en machine learning y la base para entender métodos más complejos.

{{< medical-context 
    type="research"  
    difficulty="beginner"
    scenario="Una persona de logística quiere estimar el coste de envío en función del peso del paquete. Usando datos históricos de envíos, necesita encontrar la relación matemática que mejor describa esta tendencia."
    highlight="La regresión lineal permite encontrar la 'línea de mejor ajuste' que minimiza los errores de predicción. En contextos operativos, esto se traduce en estimaciones más consistentes sin sobrerreaccionar a unos pocos casos atípicos."
    steps="Ajusta los Parámetros: Mueve los controles deslizantes para cambiar la pendiente y la intersección de la línea. Observa cómo cambia el error total y la calidad del ajuste.|Compara Métricas de Error: Experimenta con diferentes métricas (L1 vs L2) para entender cómo cada una evalúa la calidad del modelo de manera diferente.|Encuentra la Solución Óptima: Usa el botón 'Encontrar Mejor Ajuste' para que el algoritmo calcule automáticamente los parámetros óptimos que minimizan el error."
>}}

## Demostración Interactiva

El gráfico muestra puntos de datos (puntos azules) donde cada punto representa el peso del paquete en el eje x y el coste de envío en el eje y. La línea rosa es tu modelo de predicción. Tu objetivo es ajustar la pendiente y la altura inicial de la línea para que pase lo más cerca posible de todos los puntos, minimizando el error entre los valores predichos y reales.

{{< demo-wrapper title="Optimizador de Regresión Lineal" >}}

{{< game-results >}}

<h3>Cómo usar la simulación</h3>

<ul>
<li><strong>Ajusta la pendiente e intersección</strong> con los controles para ver cómo cambia la línea y el <strong>error total</strong>.</li>
<li><strong>Prueba L1 y L2</strong> para comparar la sensibilidad a valores atípicos: L1 es más robusto, L2 penaliza más errores grandes.</li>
<li><strong>Pulsa "Encontrar Mejor Ajuste"</strong> para que el sistema busque automáticamente los parámetros que minimizan la métrica elegida.</li>
</ul>

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
