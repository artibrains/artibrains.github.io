---
title: "⚡ Perceptrón y redes multicapa desde cero"
weight: 82
description: "Demostración interactiva: el perceptrón y su regla de aprendizaje, el problema XOR, la retropropagación y las funciones de activación, solo con NumPy."
date:
draft: false
slug: "perceptron-redes-multicapa-desde-cero"
---

En el capítulo 6, el equipo de Minermont conoce las redes neuronales en AIA. Alma empieza por el perceptrón de Rosenblatt y su famosa limitación, y después muestra cómo las capas de neuronas entrenadas con retropropagación la superan. Este notebook lo construye todo con NumPy, sin ninguna biblioteca de aprendizaje profundo, como en el "nivel 0" de Ana (sección 6.8).

El notebook interactivo incluye:

- El perceptrón y su regla de aprendizaje, entrenado con las funciones lógicas AND y OR.
- El problema XOR: por qué ninguna línea recta puede resolverlo.
- Una red multicapa que resuelve XOR, entrenada con retropropagación, y la frontera no lineal que aprende.
- Las funciones de activación: escalón, sigmoide, tanh y ReLU, y sus derivadas.
- El ejemplo completo de Marta (sección 6.7): una pasada hacia delante, una hacia atrás y una actualización de los pesos, número a número.
- La comprobación de la retropropagación con derivadas numéricas.

{{< isolate name="6Perceptron" params=`lang="es"` width="100%" height="720" title="Perceptrón y redes multicapa desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/13RbNHbziLx-J5SBDerYlHqG2xkVKIUTl)

### Bibliografía

- **Rosenblatt, F. (1958). The perceptron: A probabilistic model for information storage and organization in the brain.** *Psychological Review*, 65(6), 386–408. [https://doi.org/10.1037/h0042519](https://doi.org/10.1037/h0042519) 🇬🇧 (en inglés)
- **Minsky, M. y Papert, S. (1969). Perceptrons: An Introduction to Computational Geometry.** MIT Press. El análisis de lo que un solo perceptrón no puede calcular, XOR incluido. 🇬🇧 (en inglés)
- **Rumelhart, D. E., Hinton, G. E. y Williams, R. J. (1986). Learning representations by back-propagating errors.** *Nature*, 323, 533–536. [https://doi.org/10.1038/323533a0](https://doi.org/10.1038/323533a0) 🇬🇧 (en inglés)
