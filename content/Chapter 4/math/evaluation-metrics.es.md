---
title: "📐 Álgebra de métricas de evaluación"
description: "Formaliza la matriz de confusión, las variantes de precisión/recall/F1 y la AUC multiclase."
weight: 90
draft: false
slug: "algebra-metricas-evaluacion"
---

## Por qué importan las métricas

El asistente de triaje de Minermont solo es tan confiable como la evidencia que respalda cada predicción. Las matemáticas de esta nota sustentan los paneles de precisión y recall que Alma presenta a la dirección del hospital.

## Fundamentos de la matriz de confusión

Para un clasificador de $K$ clases evaluado sobre $N$ ejemplos, la matriz de confusión $C \in \mathbb{R}^{K \times K}$ tiene entradas

$$
C_{ij} = |\{ n : y_n = i, \; \hat{y}_n = j \}|,
$$

donde $y_n$ es la etiqueta real y $\hat{y}_n$ la predicción. Las filas suman las instancias reales por clase y las columnas cuentan las predicciones. A partir de $C$ derivamos cantidades por clase:

- Verdaderos positivos $\mathrm{TP}_k = C_{kk}$
- Falsos positivos $\mathrm{FP}_k = \sum_{i \ne k} C_{ik}$
- Falsos negativos $\mathrm{FN}_k = \sum_{j \ne k} C_{kj}$
- Verdaderos negativos $\mathrm{TN}_k = \sum_{i \ne k} \sum_{j \ne k} C_{ij}$

## Precisión, recall y F1

Trata cada clase $k$ como la clase "positiva" frente a las demás:

$$
\mathrm{Precision}_k = \frac{\mathrm{TP}_k}{\mathrm{TP}_k + \mathrm{FP}_k}, \qquad
\mathrm{Recall}_k = \frac{\mathrm{TP}_k}{\mathrm{TP}_k + \mathrm{FN}_k}.
$$

El F1 específico por clase es la media armónica

$$
\mathrm{F1}_k = \frac{2 \cdot \mathrm{Precision}_k \cdot \mathrm{Recall}_k}{\mathrm{Precision}_k + \mathrm{Recall}_k}.
$$

## Macro vs. micro promediado

- *Macro promediado* da el mismo peso a cada clase:

  $$
  \mathrm{Precision}_\text{macro} = \frac{1}{K} \sum_{k=1}^K \mathrm{Precision}_k,
  
$$

  con fórmulas análogas para recall y F1. Puedes promediar los F1 por clase o recalcular a partir de la precisión y el recall macro.
- *Micro promediado* agrega las decisiones antes de calcular:

  $$
  \mathrm{Precision}_\text{micro} = \frac{\sum_k \mathrm{TP}_k}{\sum_k (\mathrm{TP}_k + \mathrm{FP}_k)}, \qquad
  \mathrm{Recall}_\text{micro} = \frac{\sum_k \mathrm{TP}_k}{\sum_k (\mathrm{TP}_k + \mathrm{FN}_k)}.
  
$$

  Como los numeradores coinciden, la precisión micro es igual al recall micro y el F1 micro toma ese mismo valor.

{{% notice style="info" title="Escoge la métrica adecuada" %}}
Las métricas macro ponen en primer plano a las clases raras, mientras que las micro siguen la prevalencia global. En triaje hospitalario conviene revisar ambas para no descuidar patologías críticas de baja incidencia.
{{% /notice %}}

## Curvas ROC en decisiones binarias

Para un clasificador binario con puntajes $s(x)$ y umbral $t$, traza:

- Tasa de verdaderos positivos $\mathrm{TPR}(t) = \frac{\mathrm{TP}(t)}{\mathrm{TP}(t) + \mathrm{FN}(t)}$
- Tasa de falsos positivos $\mathrm{FPR}(t) = \frac{\mathrm{FP}(t)}{\mathrm{FP}(t) + \mathrm{TN}(t)}$

El **área bajo la curva (AUC)** integra la TPR respecto a la FPR:

$$
\mathrm{AUC} = \int_0^1 \mathrm{TPR}(\mathrm{FPR}) \, d\mathrm{FPR},
$$

y suele aproximarse con la regla del trapecio sobre puntos sucesivos de la ROC.

## Extensión de ROC/AUC al caso multiclase

Dos enfoques estándar generalizan el concepto cuando $K > 2$:

1. **Uno contra el resto.** Construye $K$ problemas binarios (la clase $k$ frente a las demás), calcula la ROC/AUC para cada uno y luego promedia (opcionalmente ponderando por frecuencia de clase).
2. **Uno contra uno.** Calcula ROC/AUC para cada par de clases y promedia, obteniendo la AUC multiclase de Hand–Till (2001):

   $$
   \mathrm{AUC}_{\text{HT}} = \frac{2}{K(K-1)} \sum_{i<j} \mathrm{AUC}_{ij},
   
$$

   donde $\mathrm{AUC}_{ij}$ es la probabilidad de que una instancia aleatoria de la clase $i$ obtenga más puntuación para $i$ que una instancia aleatoria de la clase $j$, y viceversa.

## Ejemplo trabajado

Para las clases de triaje `Cardiología`, `Respiratorio`, `Neurología`, considera la matriz

$$
C = \begin{pmatrix}
40 & 5 & 5 \\
10 & 30 & 10 \\
4 & 6 & 20
\end{pmatrix}.
$$

- Precisión cardiología $= \tfrac{40}{40 + 10 + 4} = 0.74$
- Recall respiratorio $= \tfrac{30}{5 + 30 + 6} = 0.77$
- F1 neurología combina precisión $= \tfrac{20}{5 + 10 + 20}$ y recall $= \tfrac{20}{5 + 10 + 20}$, dando $0.57$

Los promedios macro toman la media aritmética entre clases. Para dibujar la ROC de `Cardiología`, trátala como positiva frente al resto y recorre el umbral de decisión.

## Consideraciones prácticas

- Desbalance de clases: las métricas macro impiden que patologías críticas desaparezcan en los promedios.
- Selección de umbral: las curvas ROC ayudan a elegir el punto de operación; incorpora costos sensibles al contexto hospitalario.
- Incertidumbre: el remuestreo bootstrap ofrece intervalos de confianza para la AUC y el F1 macro al reportar a clínicos.

## Referencias

1. T. Fawcett. *An Introduction to ROC Analysis*. Pattern Recognition Letters, 27(8):861–874, 2006.
2. J. A. Swets. *Measuring the Accuracy of Diagnostic Systems*. Science, 240(4857):1285–1293, 1988.
3. D. J. Hand, R. J. Till. *A Simple Generalisation of the Area Under the ROC Curve for Multiple Class Classification Problems*. Machine Learning, 45(2):171–186, 2001.
4. S. Saito, M. Rehmsmeier. *The Precision-Recall Plot Is More Informative than the ROC Plot When Evaluating Binary Classifiers on Imbalanced Datasets*. PLoS ONE 10(3), 2015.
