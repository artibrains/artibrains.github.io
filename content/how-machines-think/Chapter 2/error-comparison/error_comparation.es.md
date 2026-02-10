---
title: "2.2 - Comparando Error Absoluto (L1) vs Error Cuadrático (L2)"
weight: 21
description: "Demostración interactiva para comprender las diferencias entre las funciones de error L1 y L2, y cómo afectan la evaluación de modelos de machine learning en contextos médicos."
description: "Demostración interactiva para comprender las diferencias entre las funciones de error L1 y L2, y cómo afectan la evaluación de modelos de machine learning en contextos reales."
date: 2025-04-17
draft: false
slug: "comparacion-error-l1-vs-l2"
---

## Introducción

Cuando desarrollamos modelos de machine learning, la elección de la función de error es crucial. Esta demostración te ayudará a comprender visualmente las diferencias entre el Error Absoluto Medio (L1) y el Error Cuadrático Medio (L2), y cómo cada uno responde de manera diferente a los valores atípicos o outliers.

{{< medical-context 
    type="research" 
    level="intermediate" 
    scenario="Estás desarrollando un modelo para predecir el tiempo de entrega según distancia, tráfico y clima. Algunas rutas tienen valores extremos o inconsistentes (incidencias, retrasos) que pueden sesgar la evaluación."
    highlight="- **L1 (MAE)** es más robusto ante outliers: los errores grandes no dominan la media.\n- **L2 (MSE)** castiga mucho más los fallos grandes: útil cuando los errores grandes son especialmente costosos.\n\nObserva cómo cambian las rectas ajustadas y los errores medios cuando introduces outliers."
>}}


{{< demo-wrapper title="Comparador L1 vs L2" >}}

{{< error-comparison-game >}}

<h3>Cómo usar la simulación</h3>

<ul>
<li><strong>Alterna entre L1 y L2</strong> para comparar cómo cambia la penalización del error.</li>
<li><strong>Ajusta los controles</strong> para modificar los datos y observa cómo reaccionan las métricas.</li>
<li><strong>Interpreta las curvas</strong>: L2 crece más rápido con errores grandes; L1 es más estable ante outliers.</li>
</ul>

{{< /demo-wrapper >}}

## Conceptos Fundamentales

{{% notice style="info" title="Error Absoluto Medio (L1 - MAE)" %}}
El Error Absoluto Medio mide la media de las diferencias absolutas entre los valores reales y los predichos:

**Fórmula**: `MAE = (1/n) × Σ|yi - ŷi|`

**Características:**
- **Robusto frente a outliers**: Los valores extremos no dominan el cálculo
- **Interpretación intuitiva**: Cada unidad de error cuenta por igual  
- **Lineal**: El error crece proporcionalmente con la desviación
- **Útil para**: Datos con errores de medición o casos excepcionales
{{% /notice %}}

{{% notice style="info" title="Error Cuadrático Medio (L2 - MSE)" %}}
El Error Cuadrático Medio mide la media de los cuadrados de las diferencias:

**Fórmula**: `MSE = (1/n) × Σ(yi - ŷi)²`

**Características:**
- **Sensible a outliers**: Los errores grandes se penalizan exponencialmente
- **Favorece precisión**: Minimiza desviaciones grandes agresivamente
- **Cuadrático**: El castigo crece exponencialmente con el error
- **Útil para**: Cuando errores grandes son especialmente costosos
{{% /notice %}}

### Guía de Selección

{{% notice style="tip" title="¿Cuándo usar L1?" %}}
- **Datos ruidosos**: Presencia de muchos outliers o errores de medición
- **Robustez**: Necesitas un modelo estable y predecible
- **Equidad en errores**: Errores pequeños y grandes tienen similar importancia
- **Interpretabilidad**: Quieres que las métricas sean fáciles de entender
{{% /notice %}}

{{% notice style="tip" title="¿Cuándo usar L2?" %}}
- **Errores críticos**: Los errores grandes son especialmente problemáticos
- **Datos limpios**: El conjunto de datos es relativamente confiable
- **Precisión extrema**: Necesitas penalizar fuertemente predicciones incorrectas
- **Optimización**: L2 es diferenciable y facilita algoritmos de optimización
{{% /notice %}}

{{% notice style="warning" title="Consideraciones de alto impacto" %}}
En aplicaciones de alto impacto o sensibles a costes, la elección es especialmente importante:

- **Detección de anomalías**: L2 puede desalentar fuertemente grandes fallos en eventos raros pero críticos
- **Mediciones ruidosas**: L1 suele ser más estable cuando se esperan outliers puntuales
- **Monitorización**: L2 reacciona de forma más agresiva ante grandes desviaciones
- **Datos heterogéneos**: L1 puede dar una evaluación agregada más robusta
{{% /notice %}}

{{< terminal >}}
