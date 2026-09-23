---
title: "⚡ Árbol de decisión para el triaje de urgencias"
weight: 87
description: "Demostración interactiva: cómo elige sus preguntas un árbol de decisión, sobreajuste, profundidad, interpretabilidad e inestabilidad."
date:
draft: false
slug: "arbol-decision-triaje-urgencias"
---

En el capítulo 4, el equipo de Minermont quiere un sistema que sugiera el nivel de urgencia de cada paciente de urgencias, del 1 (rojo) al 5 (azul), siempre como apoyo a la enfermera de triaje. Este notebook estudia el árbol de decisión, el modelo que más entusiasma a Teresa porque se parece a cómo piensan las enfermeras en el triaje, y también sus dos debilidades.

El notebook interactivo incluye:

- La impureza de Gini y la búsqueda de la mejor división, a mano, comparadas con scikit-learn.
- Un árbol sin límites: 100% en los datos de entrenamiento y mucho peor con pacientes nuevos.
- Elección de la profundidad máxima con validación cruzada.
- Un árbol pequeño dibujado y escrito como reglas que los clínicos pueden leer y comprobar.
- Umbrales rígidos (un año de edad cambia el nivel) e inestabilidad (dos árboles entrenados con casi los mismos datos no coinciden).
- Evaluación final con la matriz de confusión y las métricas por clase.

{{< isolate name="42ArbolDecision" params=`lang="es"` width="100%" height="720" title="Árbol de decisión para el triaje de urgencias (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1Y07iMYrEuBtnxtYIbSiAjUDyE__vHnSC)

### Bibliografía

- **Breiman, L., Friedman, J., Olshen, R. y Stone, C. (1984). Classification and Regression Trees.** Wadsworth; reeditado por Chapman & Hall/CRC. El libro que introdujo CART, el algoritmo que usa scikit-learn. [https://doi.org/10.1201/9781315139470](https://doi.org/10.1201/9781315139470) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Árboles de decisión**: clasificación, control de la complejidad y los criterios de Gini y entropía. [https://scikit-learn.org/stable/modules/tree.html](https://scikit-learn.org/stable/modules/tree.html) 🇬🇧 (en inglés)
- **Referencia de scikit-learn – `DecisionTreeClassifier`**: `max_depth`, `min_samples_leaf` y los demás parámetros. [https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html](https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html) 🇬🇧 (en inglés)
