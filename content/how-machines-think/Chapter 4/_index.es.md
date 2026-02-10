---
title: "Capítulo 4: Clasificación Multiclase"
description: "Enrutamiento automático de tickets: clasificación multiclase"
type: "chapter"
weight: 4
draft: false
slug: "algoritmos-clasificacion-profundidad"
---

{{< chapter-subtitle >}}Enrutamiento automático de tickets: clasificación multiclase{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="4" >}}

Urgencias en Minermont está desbordada, y Víctor trabaja con Teresa para crear apoyo de triaje multiclase que asista al equipo sin quitar el control humano.

El centro de soporte de Minermont está abrumado. El equipo debe leer manualmente cada solicitud entrante y enviarla al grupo correcto (y a veces con la prioridad adecuada): un proceso que consume tiempo, es estresante y crea cuellos de botella en los días de mayor carga. Víctor propone usar IA para asistir (no reemplazar) el criterio humano en el flujo de entrada. Pero esto es más complejo que los proyectos anteriores: en lugar de predecir un número o una respuesta sí/no, el sistema necesita asignar cada solicitud a una de varias categorías (por ejemplo: Facturación, Soporte técnico o Cuenta). Aquí entra la clasificación multiclase con Bosques Aleatorios y otros algoritmos. El equipo aprende sobre árboles de decisión, métodos de conjunto, matrices de confusión y la importancia del equilibrio de clases. Trabajando estrechamente con Teresa, responsable de operaciones de soporte, desarrollan un sistema que sugiere categorías y prioridad manteniendo siempre a las personas en el bucle para las decisiones finales. El resultado: enrutamiento más rápido, menos carga para el equipo y más tiempo para casos complejos, manteniendo altos estándares de calidad.

Después de explorar las estrategias generales para la clasificación multiclase, el equipo de Minermont, bajo la tutela de Alma en AIA, se adentra en el funcionamiento interno de los algoritmos específicos. El objetivo ya no es solo entender qué hacen, sino cómo lo hacen, evaluando sus fortalezas y debilidades para un sistema de enrutamiento con múltiples categorías.

En este capítulo, te unirás al equipo en el análisis de dos de los algoritmos más fundamentales e interpretables del aprendizaje automático. A través de simulaciones interactivas, experimentarás de primera mano los conceptos que el equipo discutió.

1.  **[K-Nearest Neighbors (K-NN)]({{% relref "how-machines-think/Chapter 4/knn/knn.es.md" %}})**: Explorarás un algoritmo basado en la "sabiduría de la multitud". Descubrirás cómo la simple idea de clasificar un nuevo caso basándose en sus vecinos más cercanos puede ser sorprendentemente poderosa, y entenderás las dudas de Marta y Luis sobre la importancia de la métrica de distancia y la "maldición de la dimensionalidad".

2.  **[Árboles de Decisión]({{% relref "how-machines-think/Chapter 4/decision-tree/decision-tree.es.md" %}})**: Construirás un modelo que imita el razonamiento humano. Verás por qué Teresa y Javier se sintieron tan identificados con este enfoque, que crea un conjunto de reglas explícitas y fáciles de seguir, similar a un diagrama de flujo de resolución.

3.  **[Estrategias Multiclase (OvR y OvO)]({{% relref "how-machines-think/Chapter 4/multiclass-strategies/multiclass-strategies.es.md" %}})**: Descubrirás cómo extender algoritmos de clasificación binaria a problemas con múltiples clases. Compararás las estrategias Uno contra Resto (OvR) y Uno contra Uno (OvO), entendiendo cuándo usar cada una en contextos más complejos.

4.  **[Matriz de Confusión Multiclase]({{% relref "how-machines-think/Chapter 4/multiclass-confusion-matrix/multiclass-confusion-matrix.es.md" %}})**: Aprenderás a evaluar clasificadores multiclase usando la matriz de confusión. Explorarás interactivamente cómo calcular Verdaderos/Falsos Positivos/Negativos, Precisión, Recall y F1-Score para cada clase, y cómo interpretar estas métricas cuando hay que enrutar solicitudes a varias colas.

5.  **[Bosques Aleatorios]({{% relref "how-machines-think/Chapter 4/random-forest/random-forest.es.md" %}})**: Explorarás cómo múltiples árboles de decisión trabajan juntos como un equipo de especialistas. Verás cómo la combinación de predicciones independientes mejora la precisión y reduce el sobreajuste, haciendo las clasificaciones más confiables.

Prepárate para desmontar la "caja negra" y comprender la lógica que impulsa a estos potentes algoritmos de clasificación.

### Pseudocódigo de Algoritmos

- **[📝 Pseudocódigo de K-Vecinos Más Cercanos]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-knn.es.md" %}})**: Algoritmo KNN completo con métricas de distancia, optimización KD-tree y votación ponderada.
- **[📝 Pseudocódigo de Naive Bayes]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-naive-bayes.es.md" %}})**: Variantes Gaussiana, Multinomial y Bernoulli con suavizado de Laplace.
- **[📝 Pseudocódigo de Árboles de Decisión]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-decision-trees.es.md" %}})**: Algoritmo CART con impureza de Gini, criterio de entropía y técnicas de poda.
- **[📝 Pseudocódigo de Bosques Aleatorios]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-random-forests.es.md" %}})**: Bagging, estimación de error out-of-bag e importancia de características.
- **[📝 Pseudocódigo de Máquinas de Vectores de Soporte]({{% relref "/how-machines-think/Chapter 4/code/pseudocode-svm.es.md" %}})**: Algoritmo SMO, funciones kernel y el problema de optimización dual.

### Fundamentos Matemáticos

- **[Álgebra de métricas de evaluación]({{% relref "how-machines-think/Chapter 4/math/evaluation-metrics.es.md" %}})**: Derivaciones formales de la matriz de confusión, las variantes de precisión/recall y la AUC multiclase que respaldan los tableros del capítulo.
- **[Fundamentos de Naive Bayes]({{% relref "how-machines-think/Chapter 4/math/naive-bayes.es.md" %}})**: De la regla de Bayes al suavizado y la interpretabilidad que sostienen la confianza de Alma en el modelo probabilístico.