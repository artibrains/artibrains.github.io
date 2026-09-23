---
title: "⚡ Las redes neuronales como aproximadores de funciones"
weight: 83
description: "Demostración interactiva: las neuronas ReLU como funciones base, la aproximación lineal a trozos, el teorema de aproximación universal y por qué ayuda la profundidad."
date:
draft: false
slug: "redes-neuronales-aproximadores-funciones"
---

En sus notas (sección 7.6), Marta describe las redes neuronales como lo que son matemáticamente: aproximadores de funciones que combinan piezas sencillas. El teorema de aproximación universal dice que una red con una sola capa oculta suficientemente ancha puede aproximar cualquier función continua en un intervalo acotado tanto como queramos. Este notebook muestra por qué, con neuronas ReLU y NumPy.

El notebook interactivo incluye:

- La pieza básica: una neurona ReLU como una regla con bisagra.
- Sumar bisagras: aproximaciones lineales a trozos de una curva, y cómo baja el error al añadir neuronas.
- Dejar que una red entrenada elija dónde poner sus bisagras, y lo que el entrenamiento no garantiza.
- Por qué ayuda la profundidad: apilar capas de solo 2 neuronas multiplica el número de trozos lineales.

{{< isolate name="7RedesNeuronalesComoAproximadoresDeFunciones" params=`lang="es"` width="100%" height="720" title="Las redes neuronales como aproximadores de funciones (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1tjVw8BAD6-WOWiWAmLjSL3PqE3Qn7h9H)

### Bibliografía

- **Cybenko, G. (1989). Approximation by superpositions of a sigmoidal function.** *Mathematics of Control, Signals and Systems*, 2(4), 303–314. [https://doi.org/10.1007/BF02551274](https://doi.org/10.1007/BF02551274) 🇬🇧 (en inglés)
- **Hornik, K., Stinchcombe, M. y White, H. (1989). Multilayer feedforward networks are universal approximators.** *Neural Networks*, 2(5), 359–366. [https://doi.org/10.1016/0893-6080(89)90020-8](https://doi.org/10.1016/0893-6080(89)90020-8) 🇬🇧 (en inglés)
- **Telgarsky, M. (2016). Benefits of depth in neural networks.** *Proceedings of the 29th Conference on Learning Theory*, PMLR 49, 1517–1539. La construcción de la "tienda". [https://proceedings.mlr.press/v49/telgarsky16.html](https://proceedings.mlr.press/v49/telgarsky16.html) 🇬🇧 (en inglés)
