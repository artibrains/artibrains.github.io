---
title: "3.3 El siguiente paso: Función sigmoide"
weight: 3
description: "Visualización interactiva para comprender cómo la función sigmoide transforma cualquier combinación lineal en una probabilidad entre 0 y 1, convirtiéndose en la pieza clave de la regresión logística."
date: 2025-04-17
draft: false
slug: "clasificador-funcion-sigmoide"
---

## Introducción

Comprende cómo la función sigmoide transforma cualquier combinación lineal en una probabilidad entre 0 y 1 y se convierte en la pieza clave de la regresión logística. En esta simulación interactiva jugarás a separar pacientes de alto y bajo riesgo ajustando la pendiente y la altura inicial de la curva.

{{< medical-context 
    type="research"
    difficulty="intermediate"
    scenario="Has creado un modelo que estima la **probabilidad de complicaciones post‑operatorias** a partir de la edad y la presión arterial de cada paciente. Tu objetivo es ajustar la línea de decisión para separar correctamente a los pacientes de bajo y alto riesgo."
    highlight="La función sigmoide transforma cualquier valor numérico en una probabilidad entre 0 y 1, permitiendo tomar decisiones terapéuticas seguras. Ajustar correctamente la curva garantiza que los pacientes de alto riesgo reciban la atención preventiva necesaria, mientras se evitan intervenciones innecesarias en pacientes de bajo riesgo."
    steps="Ajusta los parámetros: Usa los deslizadores w₁, w₂ y sesgo (b) para modificar la pendiente y posición de la curva sigmoide. Observa cómo cambian las métricas de desempeño en tiempo real.|Minimiza la Log-Loss: Separa los puntos verdes (sin complicaciones) de los rojos (con complicaciones) ajustando los parámetros de la función sigmoide para lograr la mejor clasificación.|Evalúa las métricas: Consulta la exactitud y la pérdida logística para evaluar la calidad de tu clasificación. Ajusta el umbral para ser más o menos estricto en la clasificación de alto riesgo."
>}}

## Demostración Interactiva

El gráfico muestra datos de pacientes (puntos) donde cada punto representa la edad y la presión arterial. Los puntos verdes indican pacientes sin complicaciones post-operatorias y los rojos con complicaciones. La curva sigmoide es tu modelo de clasificación. Tu objetivo es ajustar los parámetros de la curva para que separe lo mejor posible ambos grupos, minimizando el error entre las clasificaciones predichas y reales.

{{< demo-wrapper title="Simulador de Función Sigmoide" >}}

<h3>Cómo usar la simulación</h3>

<ul>
<li><strong>Ajusta los parámetros w₁, w₂ y sesgo (b)</strong> con los deslizadores para modificar la pendiente y posición de la curva sigmoide.</li>
<li><strong>Observa las métricas en tiempo real</strong>: La exactitud y la pérdida logística (log-loss) se actualizan instantáneamente mostrando la calidad de tu clasificación.</li>
<li><strong>Experimenta con el umbral</strong> para ajustar qué tan estricta es la clasificación de alto riesgo.</li>
<li><strong>Alterna entre modos</strong> para ver la clasificación discreta o el mapa de calor de probabilidades.</li>
</ul>

{{< sigmoid-legend >}}

{{< sigmoid-game lang="es" >}}

{{< game-results >}}

{{< /demo-wrapper >}}

### Controles y configuración

- **Deslizadores w₁ y w₂** inclinan la frontera de decisión para acercar la curva al grupo de mayor o menor riesgo.
- **Sesgo (b)** desplaza la sigmoide hacia la izquierda o la derecha para recentrar el umbral sobre la nube de datos.
- **Umbral** ajusta qué tan estricta es la clasificación al marcar pacientes como de alto riesgo.
- **Botón de modo** alterna entre la vista de clasificación discreta y un mapa de calor de probabilidades.
- **Comprobar clasificación / Nueva partida** evalúan la configuración actual o regeneran una nueva cohorte de pacientes.

### Terminal en acción

El terminal recoge cada reinicio y evaluación: anuncia cuando el simulador se inicializa, registra cada comprobación de precisión con el umbral vigente y confirma cuando se generan datos nuevos para seguir la mejora paso a paso.

## Conceptos Fundamentales

### Función Sigmoide

{{% notice style="info" title="¿Qué es la Función Sigmoide?" %}}
La función sigmoide transforma la combinación de nuestros indicadores en una probabilidad entre 0 y 1. Se define como:

$$\sigma(z) = \frac{1}{1 + e^{-z}}, \quad z = w_1 \cdot \text{edad} + w_2 \cdot \text{presión} + b$$

Donde:
- **z** es la combinación lineal de las características
- **σ(z)** es la probabilidad resultante (0 a 1)
- **w₁, w₂** son los pesos de las características
- **b** es el sesgo (bias)
{{% /notice %}}

### Frontera de Decisión y Umbral

{{% notice style="tip" title="Interpretación de Resultados" %}}
La función sigmoide convierte el valor z en una probabilidad entre 0 y 1. El umbral (por defecto 0.5) determina cuándo un paciente se clasifica como "alto riesgo":

- Si la probabilidad > umbral → Clasificar como **"alto riesgo"** (rojo)
- Si la probabilidad ≤ umbral → Clasificar como **"bajo riesgo"** (verde)

Ajustar el umbral permite ser más o menos estricto en la clasificación. Un umbral más alto requiere más evidencia para clasificar a alguien como "alto riesgo".
{{% /notice %}}

{{< terminal >}}
