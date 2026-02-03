---
title: "4.3 - Matriz de Confusión Multiclase"
description: "Visualiza y comprende cómo evaluar clasificadores de múltiples clases usando la matriz de confusión y métricas derivadas."
weight: 14
draft: false
slug: "matriz-confusion-multiclase"
math: true
---

## Introducción
Un breve demo interactivo a continuación te ayuda a explorar los errores típicos que comete un modelo multiclase de enrutamiento y cómo esos errores afectan las métricas por clase. Genera matrices con distintas precisiones y observa qué categorías se confunden con mayor frecuencia.

{{< demo-intro 
    title="Matriz de Confusión Multiclase"
    algorithm_type="Métrica de evaluación"
    difficulty="intermedio"
    medical_scenario="En Minermont, el equipo de Alma ha desarrollado un sistema que asigna solicitudes entrantes a una de tres categorías: Facturación, Soporte técnico o Cuenta. Necesitan evaluar qué tan bien funciona el modelo para cada clase e identificar qué tipos de errores comete."
    medical_highlight="La matriz de confusión permite ver exactamente dónde el clasificador está cometiendo errores: qué categorías se están confundiendo entre sí y si ciertas clases son más difíciles de predecir correctamente. Esto es clave para la priorización y la asignación de trabajo."
    intro_text="La **matriz de confusión** es una herramienta fundamental de evaluación para clasificación multiclase que muestra todas las combinaciones de clases predichas vs. reales. Permite calcular métricas por clase (Precisión, Recall, F1) y entender los tipos específicos de errores que comete tu modelo."
>}}

## ¿Qué es una matriz de confusión?

La matriz de confusión es una tabla que compara las predicciones del modelo con la realidad. Para un clasificador de $K$ clases, es una matriz $C \in \mathbb{R}^{K \times K}$ donde:

$$
C_{ij} = |\{ n : y_n = i, \; \hat{y}_n = j \}|
$$

Cada elemento $C_{ij}$ cuenta cuántas veces una muestra de la clase real $i$ fue predicha como clase $j$.

- **Diagonal principal** ($C_{ii}$): Predicciones correctas para cada clase
- **Fuera de la diagonal**: Confusiones entre clases

## Exploración interactiva

Utiliza la herramienta siguiente para:

1. **Generar matrices** con diferentes niveles de precisión
2. **Seleccionar una clase** para ver sus métricas específicas (VP, FP, FN, VN, Precisión, Recall, F1)
3. **Destacar componentes** en la matriz para visualizar de dónde vienen los cálculos
4. **Ver detalles** haciendo clic en el icono ⓘ de cada métrica

{{< multiclass-confusion-matrix lang="es" >}}

## Métricas globales: Macro promediado

Para evaluar el rendimiento general del sistema, el equipo de Alma calcula promedios de las métricas por clase:

### Precisión Macro
$$
\mathrm{Precisión}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{Precisión}_k
$$

### Recall Macro
$$
\mathrm{Recall}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{Recall}_k
$$

### F1-Score Macro
$$
\mathrm{F1}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{F1}_k
$$

{{% notice style="tip" title="¿Macro o Micro?" %}}
- **Macro promediado**: Da igual peso a cada clase, útil para no descuidar clases minoritarias o raras.
- **Micro promediado**: Agrega todas las decisiones antes de calcular, favoreciendo a clases más frecuentes.

En muchos contextos operativos, el macro promediado es preferible cuando no quieres que las clases menos frecuentes queden ocultas en los promedios.
{{% /notice %}}

## Interpretando confusiones

Cuando observas la matriz de confusión, busca:

1. **Diagonal fuerte**: Valores altos en la diagonal indican buenas predicciones
2. **Patrones de confusión**: ¿Qué clases se confunden entre sí?
3. **Asimetrías**: ¿La confusión es bidireccional o unidireccional?

**Ejemplo**: Si muchas solicitudes de Soporte técnico se clasifican como Facturación pero no al revés, puede indicar solapamiento de palabras o señales y que falta una característica más discriminante para Soporte técnico.

## Decisiones basadas en métricas

Los equipos usan estas métricas para:

- **Ajustar umbrales** de decisión por clase
- **Identificar clases problemáticas** que necesitan más datos o mejores características
- **Balancear trade-offs** entre precisión y recall según el costo operativo de cada tipo de error
- **Justificar el modelo** ante interesados con evidencia cuantitativa

## Conexión con ROC/AUC

La matriz de confusión captura el rendimiento en un punto de decisión específico. Para explorar cómo varían las métricas al ajustar umbrales de confianza, también podemos utilizar curvas ROC multiclase, extendiendo el análisis binario mediante estrategias uno-contra-resto o uno-contra-uno.

---

### Referencias complementarias

- **[Álgebra de métricas de evaluación]({{% relref "how-machines-think/Chapter 4/math/evaluation-metrics.es.md" %}})**: Derivaciones matemáticas completas de todas las métricas presentadas aquí.
- **[Estrategias multiclase]({{% relref "how-machines-think/Chapter 4/multiclass-strategies/multiclass-strategies.es.md" %}})**: Cómo extender clasificadores binarios a problemas multiclase.

{{% notice style="info" title="Práctica operativa" %}}
En Minermont, Teresa y Javier revisan la matriz de confusión semanalmente. La usan para detectar confusiones sistemáticas (por ejemplo, problemas de Cuenta que se enrutan a Facturación) y mejorar las guías de etiquetado y la recolección de señales para que el modelo tenga entradas más claras.
{{% /notice %}}
