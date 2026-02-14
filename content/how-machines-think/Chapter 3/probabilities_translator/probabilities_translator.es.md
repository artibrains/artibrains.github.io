---
title: "3.1 El siguiente paso: Regresión logística"
weight: 2
description: "Demostración interactiva de cómo la regresión logística convierte combinaciones lineales en probabilidades para clasificar casos y predecir un evento binario."
date: 2025-04-17
draft: false
slug: "traductor-probabilidades-regresion-logistica"
---

## Introducción

La **Regresión Logística** es un modelo fundamental para predecir resultados categóricos, como decidir si un caso pertenece a un grupo u otro. En lugar de predecir un valor continuo, calcula la probabilidad de que un caso pertenezca a una categoría específica (por ejemplo, "abandonará"), convirtiéndola en una herramienta esencial para la clasificación.

{{< medical-context 
    type="clinic" 
    scenario="Tu equipo quiere reducir el churn (abandono). Necesitas un modelo que identifique qué usuarios tienen alta probabilidad de abandonar, basándose en su historial de uso y características de comportamiento."
    highlight="La regresión logística permite estimar la probabilidad de un evento a partir de variables de entrada. Esa probabilidad permite tomar acciones preventivas como recordatorios o intervenciones selectivas."
>}}

## Demostración Interactiva

{{< demo-wrapper title="Regresión Logística: Traductor de Probabilidades" >}}

<p>El gráfico muestra cómo la regresión logística convierte variables de entrada en probabilidades. Cada punto representa un caso: <strong>azul</strong> indica el resultado positivo y <strong>rojo</strong> el resultado negativo. El fondo coloreado representa la probabilidad predicha por el modelo en diferentes combinaciones de características—las áreas rojas más oscuras indican mayor riesgo, mientras que las áreas azules más oscuras sugieren menor riesgo. La frontera de decisión (donde probabilidad = 0.5) separa estas dos regiones.</p>

{{< probabilities_translator lang="es" >}}

{{% notice style="tip" title="Consejo" %}}Haz clic en cualquier punto del gráfico para ver las variables del caso, la probabilidad predicha y el resultado real.{{% /notice %}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

{{% notice style="info" title="¿Cómo Funciona la Regresión Logística?" %}}
La regresión logística transforma una combinación lineal de variables en una probabilidad entre 0 y 1:

1. **Combinación lineal**: `z = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ`
2. **Función sigmoide**: `p = 1 / (1 + e^(-z))`
3. **Interpretación**: `p` es la probabilidad del evento (ej: no asistir)
4. **Clasificación**: Si `p > 0.5` → predicción positiva, si `p ≤ 0.5` → predicción negativa
{{% /notice %}}

{{% notice style="tip" title="Ventajas de la Regresión Logística" %}}
- **Probabilidades interpretables**: Ofrece probabilidades reales, no solo clasificaciones
- **No asume linealidad**: Aunque es lineal en log-odds, la relación con probabilidades es no lineal
- **Robusto**: Menos sensible a outliers que modelos lineales tradicionales
- **Eficiente**: Computacionalmente rápido para entrenamiento y predicción
- **Baseline sólido**: Excelente punto de partida para problemas de clasificación
{{% /notice %}}

{{% notice style="warning" title="Limitaciones Importantes" %}}
- **Separabilidad lineal**: Assume que las clases son separables por una frontera lineal
- **Independencia**: Las observaciones deben ser independientes entre sí
- **Tamaño de muestra**: Necesita suficientes datos para estimar parámetros confiablemente
- **Multicolinealidad**: Variables predictoras altamente correlacionadas pueden causar problemas
{{% /notice %}}

### Ejemplo de Interpretación

{{% notice style="tip" title="Análisis de Probabilidades" %}}
En un contexto de churn / abandono:

- **Probabilidad < 0.3**: Riesgo bajo; normalmente no requiere intervención
- **Probabilidad 0.3-0.7**: Zona de incertidumbre; considerar recordatorios o acción ligera
- **Probabilidad > 0.7**: Riesgo alto; priorizar intervención

**Variables del modelo:**
- **Recencia**: Intervalos largos pueden indicar desconexión
- **Engagement**: Baja interacción puede correlacionar con abandono
- **Historial**: El comportamiento pasado suele predecir el futuro
{{% /notice %}}

{{< terminal >}}
