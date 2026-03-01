---
title: "4.2 Bosques Aleatorios: La Sabiduría de Múltiples Árboles"
description: "Visualización interactiva de cómo un Random Forest combina múltiples árboles de decisión para mejorar la precisión y robustez en clasificación multiclase."
weight: 13
draft: false
slug: "bosques-aleatorios"
---

## Introducción

Un **Bosque Aleatorio (Random Forest)** es un conjunto de múltiples árboles de decisión que trabajan juntos para tomar una decisión. Cada árbol se entrena con una muestra aleatoria diferente de los datos, y la predicción final se obtiene por votación mayoritaria.

{{< demo-intro
    title="Constructor de Bosques Aleatorios"
    medical_highlight="Random Forest mejora la precisión y reduce el sobreajuste al combinar predicciones de múltiples árboles. Cada árbol ve una muestra diferente de datos y un subconjunto de características, lo que hace al bosque más robusto ante entradas nuevas."
    steps="Configura el Bosque: Ajusta el número de árboles, la profundidad máxima y el porcentaje de características por división.|Genera los Datos: Pulsa «Generar Datos de Ejemplo» para crear el conjunto de entrenamiento.|Entrena el Bosque: Pulsa «Entrenar Bosque» y observa cómo cada árbol se entrena con una muestra bootstrap distinta.|Analiza los Resultados: Revisa la precisión del bosque y las métricas de validación."
>}}

## Demostración Interactiva

{{< demo-wrapper title="Constructor de Bosques Aleatorios" >}}

{{< random-forest >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

{{% notice style="info" title="Proceso de Construcción" %}}
Un Random Forest se construye en tres pasos principales:

1. **Bootstrap Sampling**: Para cada árbol, se toma una muestra aleatoria con reemplazo del conjunto de entrenamiento.
2. **Random Feature Selection**: En cada nodo solo se considera un subconjunto aleatorio de características (típicamente $\sqrt{n}$ para clasificación).
3. **Votación Mayoritaria**: La clase más votada entre todos los árboles es la predicción final.
{{% /notice %}}

{{% notice style="tip" title="Fortalezas del Bosque" %}}
- **Reduce el sobreajuste**: El promedio de muchos árboles generaliza mejor que uno solo.
- **Robusto a valores atípicos**: La votación mayoritaria amortigua los errores individuales.
- **Estima importancia de características**: Mide qué variables son más predictivas.
- **Funciona bien sin mucho ajuste**: Menos hiperparámetros críticos que optimizar.
{{% /notice %}}

{{% notice style="warning" title="Nota Práctica" %}}
Random Forest consume más memoria y tiempo de cómputo que un árbol único. En sistemas con requisitos estrictos de latencia puede ser necesario balancear precisión con velocidad de respuesta.
{{% /notice %}}

{{< terminal >}}
