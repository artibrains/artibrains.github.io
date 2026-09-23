---
title: "⚡ KNN para el triaje de urgencias"
weight: 85
description: "Demostración interactiva: K vecinos más cercanos, métricas de distancia y escalado de características para el triaje multiclase."
date:
draft: false
slug: "knn-triaje-urgencias"
---

En el capítulo 4, el equipo de Minermont quiere un sistema que sugiera el nivel de urgencia de cada paciente de urgencias, del 1 (rojo) al 5 (azul), siempre como apoyo a la enfermera de triaje. Este notebook implementa el primer algoritmo que estudia el equipo en AIA, K vecinos más cercanos (KNN), a mano y con scikit-learn, con datos de triaje sintéticos.

El notebook interactivo incluye:

- KNN a mano con un ejemplo pequeño: distancias, los $K$ vecinos más cercanos y el voto por mayoría.
- Las distancias euclídea, Manhattan y Chebyshev, sus bolas unidad y cómo la métrica cambia los vecinos.
- Pacientes de urgencias sintéticos con signos vitales, síntomas y cinco niveles de urgencia.
- Por qué importa el escalado: sin escalar frente a min-max, estandarización y escalado robusto.
- Elección de $K$ y de la métrica con validación cruzada estratificada, y la maldición de la dimensionalidad.
- Evaluación final con la matriz de confusión de $5 \times 5$ y las métricas por clase.

{{< isolate name="42KNN" params=`lang="es"` width="100%" height="720" title="KNN para el triaje de urgencias (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1TETE4HK3ytBSxNR5U5O1enIwzEw6pNF1)

### Bibliografía

- **Cover, T. y Hart, P. (1967). Nearest neighbor pattern classification.** *IEEE Transactions on Information Theory*, 13(1), 21–27. El análisis clásico de la regla del vecino más cercano. [https://doi.org/10.1109/TIT.1967.1053964](https://doi.org/10.1109/TIT.1967.1053964) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Clasificación por vecinos más cercanos**: `KNeighborsClassifier`, pesos y métricas de distancia. [https://scikit-learn.org/stable/modules/neighbors.html#nearest-neighbors-classification](https://scikit-learn.org/stable/modules/neighbors.html#nearest-neighbors-classification) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Estandarización y escalado**: `StandardScaler`, `MinMaxScaler` y `RobustScaler`. [https://scikit-learn.org/stable/modules/preprocessing.html#standardization-or-mean-removal-and-variance-scaling](https://scikit-learn.org/stable/modules/preprocessing.html#standardization-or-mean-removal-and-variance-scaling) 🇬🇧 (en inglés)
