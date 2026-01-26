---
title: "4 - Algoritmos de Clasificación en Profundidad"
type: "chapter"
weight: 4
draft: false
slug: "algoritmos-clasificacion-profundidad"
---

Después de explorar las estrategias generales para la clasificación multiclase, el equipo del Hospital Minermont, bajo la tutela de Alma en AIA, se adentra en el funcionamiento interno de los algoritmos específicos. El objetivo ya no es solo entender qué hacen, sino cómo lo hacen, evaluando sus fortalezas y debilidades para el delicado desafío del triaje en urgencias.

En este capítulo, te unirás al equipo en el análisis de dos de los algoritmos más fundamentales e interpretables del aprendizaje automático. A través de simulaciones interactivas, experimentarás de primera mano los conceptos que el equipo discutió.

1.  **[K-Nearest Neighbors (K-NN)]({{% relref "how-machines-think/Chapter 4/knn/knn.es.md" %}})**: Explorarás un algoritmo basado en la "sabiduría de la multitud". Descubrirás cómo la simple idea de clasificar un nuevo caso basándose en sus vecinos más cercanos puede ser sorprendentemente poderosa, y entenderás las dudas de Marta y Luis sobre la importancia de la métrica de distancia y la "maldición de la dimensionalidad".

2.  **[Árboles de Decisión]({{% relref "how-machines-think/Chapter 4/decision-tree/decision-tree.es.md" %}})**: Construirás un modelo que imita el razonamiento humano. Verás por qué Teresa y Javier se sintieron tan identificados con este enfoque, que crea un conjunto de reglas explícitas y fáciles de seguir, similar a un diagrama de flujo de diagnóstico.

3.  **[Estrategias Multiclase (OvR y OvO)]({{% relref "how-machines-think/Chapter 4/multiclass-strategies/multiclass-strategies.es.md" %}})**: Descubrirás cómo extender algoritmos de clasificación binaria a problemas con múltiples clases. Compararás las estrategias Uno contra Resto (OvR) y Uno contra Uno (OvO), entendiendo cuándo usar cada una en contextos médicos complejos.

4.  **[Matriz de Confusión Multiclase]({{% relref "how-machines-think/Chapter 4/multiclass-confusion-matrix/multiclass-confusion-matrix.es.md" %}})**: Aprenderás a evaluar clasificadores multiclase usando la matriz de confusión. Explorarás interactivamente cómo calcular Verdaderos/Falsos Positivos/Negativos, Precisión, Recall y F1-Score para cada clase, y cómo interpretar estas métricas en el contexto del triaje hospitalario.

5.  **[Bosques Aleatorios]({{% relref "how-machines-think/Chapter 4/random-forest/random-forest.es.md" %}})**: Explorarás cómo múltiples árboles de decisión trabajan juntos como un equipo de médicos consultores. Verás cómo la combinación de predicciones independientes mejora la precisión y reduce el sobreajuste, haciendo los diagnósticos más confiables.

Prepárate para desmontar la "caja negra" y comprender la lógica que impulsa a estos potentes algoritmos de clasificación.

### Pseudocódigo de Algoritmos

- **[📝 Pseudocódigo de K-Vecinos Más Cercanos]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-knn.es.md" %}})**: Algoritmo KNN completo con métricas de distancia, optimización KD-tree y votación ponderada.
- **[📝 Pseudocódigo de Naive Bayes]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-naive-bayes.es.md" %}})**: Variantes Gaussiana, Multinomial y Bernoulli con suavizado de Laplace.
- **[📝 Pseudocódigo de Árboles de Decisión]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-decision-trees.es.md" %}})**: Algoritmo CART con impureza de Gini, criterio de entropía y técnicas de poda.
- **[📝 Pseudocódigo de Bosques Aleatorios]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-random-forests.es.md" %}})**: Bagging, estimación de error out-of-bag e importancia de características.
- **[📝 Pseudocódigo de Máquinas de Vectores de Soporte]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-svm.es.md" %}})**: Algoritmo SMO, funciones kernel y el problema de optimización dual.

### Fundamentos Matemáticos

#### Álgebra de métricas de evaluación

**Contexto.** En el capítulo 4 el equipo de Minermont despliega un asistente de triaje y necesita justificar su comportamiento en múltiples clases. Las derivaciones siguientes formalizan la matriz de confusión, las variantes de precisión/recobrado/F1 y extienden el análisis ROC/AUC más allá del caso binario.

**Fundamentos de la matriz de confusión.** Para un clasificador de $K$ clases evaluado sobre $N$ ejemplos, definimos la matriz de confusión $C \in \mathbb{R}^{K \times K}$ con entradas

$$
C_{ij} = |\{ n : y_n = i, \; \hat{y}_n = j \}|,
$$

donde $y_n$ es la etiqueta real y $\hat{y}_n$ la predicción. Las sumas por fila igualan el número de instancias reales por clase; las sumas por columna cuentan las predicciones. A partir de $C$ obtenemos cantidades por clase:

- Verdaderos positivos $\mathrm{VP}_k = C_{kk}$
- Falsos positivos $\mathrm{FP}_k = \sum_{i \ne k} C_{ik}$
- Falsos negativos $\mathrm{FN}_k = \sum_{j \ne k} C_{kj}$
- Verdaderos negativos $\mathrm{VN}_k = \sum_{i \ne k} \sum_{j \ne k} C_{ij}$

**Precisión, revocación y F1.** Tratamos cada clase $k$ como “positiva” frente al resto:

$$
\mathrm{Precisión}_k = \frac{\mathrm{VP}_k}{\mathrm{VP}_k + \mathrm{FP}_k}, \qquad
\mathrm{Revocación}_k = \frac{\mathrm{VP}_k}{\mathrm{VP}_k + \mathrm{FN}_k}.
$$
### Fundamentos Matemáticos

- **[Álgebra de métricas de evaluación]({{% relref "how-machines-think/Chapter 4/math/evaluation-metrics.es.md" %}})**: Derivaciones formales de la matriz de confusión, las variantes de precisión/recall y la AUC multiclase que respaldan los tableros del capítulo.
- **[Fundamentos de Naive Bayes]({{% relref "how-machines-think/Chapter 4/math/naive-bayes.es.md" %}})**: De la regla de Bayes al suavizado y la interpretabilidad que sostienen la confianza de Alma en el modelo probabilístico.