---
title: "3.2 El siguiente paso: Regresión logística"
weight: 2
description: "Demostración interactiva de cómo la regresión logística convierte combinaciones lineales en probabilidades para clasificar pacientes y predecir asistencia a citas médicas."
date: 2025-04-17
draft: false
slug: "traductor-probabilidades-regresion-logistica"
---

## Introducción

La **Regresión Logística** es un modelo fundamental para predecir resultados categóricos, como decidir si un paciente pertenece a un grupo u otro. En lugar de predecir un valor continuo, calcula la probabilidad de que un caso (por ejemplo, un paciente) pertenezca a una categoría específica (como "no acudirá a la cita"), convirtiéndola en una herramienta esencial para la clasificación.

{{< medical-context 
    type="clinic" 
    level="intermediate" 
    scenario="Tu centro de salud quiere reducir el número de citas a las que los pacientes no acuden. Para ello, necesitas un modelo que identifique qué pacientes tienen una alta probabilidad de faltar, basándose en su historial de asistencia y características demográficas."
    highlight="La regresión logística permite predecir la probabilidad de inasistencia basándose en factores como edad y días desde la última visita. Esto permite al centro tomar medidas preventivas como llamadas de recordatorio o reprogramación proactiva de citas."
>}}

## Demostración Interactiva

{{< demo-wrapper title="Predictor de Asistencia a Citas Médicas" >}}

<p>El gráfico muestra cómo la regresión logística convierte las características del paciente (edad y días desde la última visita) en probabilidades de asistencia. Cada punto representa un paciente: <strong>azul</strong> indica que acudió a su cita, <strong>rojo</strong> que no asistió. El fondo coloreado representa la probabilidad predicha por el modelo en diferentes combinaciones de características—las áreas rojas más oscuras indican mayor riesgo de inasistencia, mientras que las áreas azules más oscuras sugieren mayor probabilidad de asistencia. La frontera de decisión (donde probabilidad = 0.5) separa estas dos regiones.</p>

{{< probabilities_translator lang="es" >}}

{{% notice style="tip" title="Consejo" %}}Haz clic en cualquier punto del gráfico para ver la edad del paciente, días desde la última visita, la probabilidad predicha y el resultado real.{{% /notice %}}

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

### Interpretación en el Contexto Médico

{{% notice style="tip" title="Análisis de Probabilidades" %}}
En el contexto de asistencia a citas:

- **Probabilidad < 0.3**: Paciente confiable, baja probabilidad de inasistencia
- **Probabilidad 0.3-0.7**: Zona de incertidumbre, considerar recordatorios
- **Probabilidad > 0.7**: Alto riesgo de inasistencia, intervención recomendada

**Variables del modelo:**
- **Edad**: Pacientes jóvenes y muy mayores pueden tener patrones diferentes
- **Días desde última visita**: Intervalos muy largos pueden indicar desconexión
- **Historial**: Comportamiento pasado es predictor del futuro
{{% /notice %}}

{{< terminal >}}
