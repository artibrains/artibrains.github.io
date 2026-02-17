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

## Demostración Interactiva

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro
lang="es"
title="Regresión Logística: Traductor de Probabilidades"
scenario="Un equipo de retención necesita estimar el riesgo de abandono a partir de señales de comportamiento (recencia y edad). El gráfico muestra usuarios históricos donde los puntos azules representan un resultado y los rojos el contrario. El fondo coloreado visualiza la probabilidad predicha según las combinaciones de variables, y la frontera cercana a probabilidad 0.5 separa ambas regiones."
steps="Explora la Superficie de Probabilidad: Observa cómo cambia la intensidad del color según los valores de las variables, representando distintos niveles de riesgo.|Inspecciona Casos Individuales: Haz clic en un punto para ver la puntuación lineal (Z), la probabilidad sigmoide y el resultado real.|Regenera Escenarios: Genera nuevos datos de ejemplo para comparar cómo cambian los coeficientes y la frontera de decisión."
medical_highlight="La regresión logística convierte variables de entrada en probabilidades accionables, permitiendo intervenciones selectivas antes de que ocurra el abandono."
>}}

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
