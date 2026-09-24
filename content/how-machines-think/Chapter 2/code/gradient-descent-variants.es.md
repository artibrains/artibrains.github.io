---
title: "⚡ Descenso del gradiente: por lotes, por mini-lotes y estocástico"
weight: 70
description: "Demostración interactiva: el descenso del gradiente por lotes, por mini-lotes y estocástico, las épocas, el barajado, la tasa de aprendizaje, los criterios de parada, la inicialización y la reducción de la tasa de aprendizaje."
date:
draft: false
slug: "variantes-descenso-gradiente-desde-cero"
---

Las notas de Luis en el capítulo 2 describen las decisiones que rodean al descenso del gradiente: cuántos ejemplos usa cada actualización, cuántas épocas, qué tasa de aprendizaje, por dónde empezar y cuándo parar. Este notebook las implementa todas con un único bucle de entrenamiento, con 1.000 días de pacientes y mascarillas, y mide el efecto de cada una.

El notebook interactivo incluye:

- Un solo bucle de entrenamiento para el descenso por lotes, por mini-lotes y estocástico.
- Las actualizaciones por época y el coste tras cada época con lotes de 1.000, 100, 10 y 1 ejemplo.
- Los caminos de las tres variantes sobre la superficie de coste.
- Por qué se barajan los datos al principio de cada época.
- Tasas de aprendizaje demasiado pequeñas, buenas, demasiado grandes y divergentes, como en la figura de Luis.
- Tres criterios de parada: el cambio del coste, el tamaño del gradiente y un número máximo de actualizaciones.
- Inicializaciones aleatorias y heurísticas.
- Vigilar el coste en un conjunto de validación y reducir la tasa de aprendizaje a la mitad cuando deja de mejorar.

{{< isolate name="26VariantesDelDescensoDelGradiente" params=`lang="es"` width="100%" height="720" title="Descenso del gradiente: por lotes, por mini-lotes y estocástico (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/16wzv_lX1z-nb9z50v0QEJJOXRuhJiGSF)

### Bibliografía

- **Robbins, H. y Monro, S. (1951). A stochastic approximation method.** *The Annals of Mathematical Statistics*, 22(3), 400–407. [https://doi.org/10.1214/aoms/1177729586](https://doi.org/10.1214/aoms/1177729586) 🇬🇧 (en inglés)
- **Bottou, L. (2010). Large-scale machine learning with stochastic gradient descent.** *Proceedings of COMPSTAT 2010*, 177–186. Springer. [https://doi.org/10.1007/978-3-7908-2604-3_16](https://doi.org/10.1007/978-3-7908-2604-3_16) 🇬🇧 (en inglés)
- **Ruder, S. (2016). An overview of gradient descent optimization algorithms.** arXiv:1609.04747. [https://arxiv.org/abs/1609.04747](https://arxiv.org/abs/1609.04747) 🇬🇧 (en inglés)
