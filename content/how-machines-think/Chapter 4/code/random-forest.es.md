---
title: "⚡ Bosque aleatorio para el triaje de urgencias"
weight: 88
description: "Demostración interactiva: bagging, error out-of-bag, importancia de las características y los niveles críticos, con el modelo que elige el equipo."
date:
draft: false
slug: "bosque-aleatorio-triaje-urgencias"
---

En el capítulo 4, el equipo de Minermont quiere un sistema que sugiera el nivel de urgencia de cada paciente de urgencias, del 1 (rojo) al 5 (azul), siempre como apoyo a la enfermera de triaje. Este notebook estudia el bosque aleatorio, el modelo que el equipo elige finalmente, y lo compara con los demás algoritmos del capítulo.

El notebook interactivo incluye:

- Muestras bootstrap y un bosque construido a mano, que vota con la moda.
- La exactitud out-of-bag (OOB) y el efecto del número de árboles y de las características por nodo.
- La estabilidad: los bosques entrenados con casi los mismos datos coinciden; los árboles sueltos, no.
- Evaluación multiclase: precisión, recall y F1 por clase, empezando por el ejemplo de 3 niveles del libro.
- Importancia de las características por impureza y por permutación.
- Los niveles críticos: pesos de las clases y un umbral de decisión prudente para el nivel 1, elegido con las probabilidades OOB.
- Comparación con KNN, el árbol de decisión, la regresión logística One-vs-Rest y la SVM One-vs-One.

{{< isolate name="42BosqueAleatorio" params=`lang="es"` width="100%" height="720" title="Bosque aleatorio para el triaje de urgencias (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/18YftKgkKKcwteWZNHKhsE7YDwGIQTnxv)

### Bibliografía

- **Breiman, L. (2001). Random forests.** *Machine Learning*, 45, 5–32. El artículo original: bagging, características aleatorias, estimaciones OOB e importancia de las variables. [https://doi.org/10.1023/A:1010933404324](https://doi.org/10.1023/A:1010933404324) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Bosques aleatorios**: `RandomForestClassifier`, `max_features` y los demás parámetros. [https://scikit-learn.org/stable/modules/ensemble.html#random-forests-and-other-randomized-tree-ensembles](https://scikit-learn.org/stable/modules/ensemble.html#random-forests-and-other-randomized-tree-ensembles) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Importancia por permutación**: cómo funciona y por qué es más fiable que la importancia por impureza. [https://scikit-learn.org/stable/modules/permutation_importance.html](https://scikit-learn.org/stable/modules/permutation_importance.html) 🇬🇧 (en inglés)
- **Ejemplo de scikit-learn – Errores OOB en bosques aleatorios**: cómo cambia el error OOB con el número de árboles. [https://scikit-learn.org/stable/auto_examples/ensemble/plot_ensemble_oob.html](https://scikit-learn.org/stable/auto_examples/ensemble/plot_ensemble_oob.html) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Estrategias multiclase**: `OneVsRestClassifier` y `OneVsOneClassifier`. [https://scikit-learn.org/stable/modules/multiclass.html](https://scikit-learn.org/stable/modules/multiclass.html) 🇬🇧 (en inglés)
