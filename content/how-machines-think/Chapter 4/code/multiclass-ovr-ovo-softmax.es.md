---
title: "⚡ One-vs-Rest, One-vs-One y softmax desde cero"
weight: 89
description: "Demostración interactiva: el triaje de urgencias en cinco niveles con One-vs-Rest, One-vs-One y regresión softmax, todo escrito con NumPy."
date:
draft: false
slug: "multiclase-ovr-ovo-softmax-desde-cero"
---

Antes de los algoritmos multiclase por naturaleza, Alma enseña al equipo a construir un clasificador de cinco clases a partir de clasificadores binarios, y el equipo plantea sus puntos débiles: el desbalanceo de 'Nivel 1 frente al resto', la ambigüedad cuando ningún clasificador está seguro y los empates en la votación. Este notebook construye One-vs-Rest, One-vs-One y la regresión softmax desde cero con los pacientes del triaje y los compara.

El notebook interactivo incluye:

- La regresión logística binaria como pieza básica.
- One-vs-Rest: cinco clasificadores, y por qué el nivel del medio queda aplastado.
- La ambigüedad de One-vs-Rest: puntuaciones que no suman 1.
- One-vs-One: diez clasificadores, una votación y la regla del libro para los empates.
- La regresión softmax con la entropía cruzada categórica, comprobada con scikit-learn.
- Las tres estrategias una junto a otra: parámetros, exactitud, sensibilidad por nivel y matrices de confusión.
- Un paciente en la frontera y la respuesta de cada estrategia.

{{< isolate name="41OneVsRestOneVsOneYSoftmax" params=`lang="es"` width="100%" height="720" title="One-vs-Rest, One-vs-One y softmax desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1_L-W6td3CLYT2qtpyYdmPwZ2cQXiwc0T)

### Bibliografía

- **Rifkin, R. y Klautau, A. (2004). In defense of one-vs-all classification.** *Journal of Machine Learning Research*, 5, 101–141. [https://www.jmlr.org/papers/v5/rifkin04a.html](https://www.jmlr.org/papers/v5/rifkin04a.html) 🇬🇧 (en inglés)
- **Hastie, T. y Tibshirani, R. (1998). Classification by pairwise coupling.** *The Annals of Statistics*, 26(2), 451–471. [https://doi.org/10.1214/aos/1028144844](https://doi.org/10.1214/aos/1028144844) 🇬🇧 (en inglés)
- **Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*.** Springer. Sección 4.3.4, regresión logística multiclase. [https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/) 🇬🇧 (en inglés)
