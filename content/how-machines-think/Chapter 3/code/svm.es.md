---
title: "⚡ SVM desde cero"
weight: 83
description: "Demostración interactiva: cómo crear una máquina de vectores de soporte lineal desde cero con la pérdida bisagra."
date:
draft: false
slug: "svm-desde-cero"
---

Estas son las notas de Luis sobre cómo implementar una máquina de vectores de soporte (SVM) lineal desde cero, siguiendo la formulación de margen suave de las notas de Marta. El notebook empieza con el ejemplo del libro y después vuelve a las ausencias de Fisioterapia.

El notebook interactivo incluye:

- Los 14 puntos de la figura de la SVM lineal del libro y las condiciones que definen el margen.
- La pérdida bisagra (hinge loss), comparada con la pérdida logarítmica de la regresión logística.
- Entrenamiento con descenso del gradiente, que recupera la recta del libro y sus dos vectores de soporte.
- Margen suave: cómo $\lambda$ cambia anchura del margen por errores de entrenamiento cuando aparece un punto sospechoso.
- Validación cruzada de k grupos implementada a mano para elegir $\lambda$ con los datos de ausencias.
- Evaluación en el conjunto de prueba, comparación con la regresión logística y efecto de mover el umbral sobre la puntuación de la SVM.

{{< isolate name="35MVS" params=`lang="es"` width="100%" height="720" title="SVM desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1cnjOYzvZ_q85ZOu5RsH3Mz8DBqJBJc9R)

### Bibliografía

- **Cortes, C. y Vapnik, V. (1995). Support-vector networks.** *Machine Learning*, 20, 273–297. El artículo que introdujo la SVM de margen suave. [https://doi.org/10.1007/BF00994018](https://doi.org/10.1007/BF00994018) 🇬🇧 (en inglés)
- **Shalev-Shwartz, S., Singer, Y., Srebro, N. y Cotter, A. (2011). Pegasos: primal estimated sub-gradient solver for SVM.** *Mathematical Programming*, 127, 3–30. Entrenar una SVM con descenso del (sub)gradiente, como en el notebook. [https://doi.org/10.1007/s10107-010-0420-4](https://doi.org/10.1007/s10107-010-0420-4) 🇬🇧 (en inglés)
- **Guía de scikit-learn – SVM, formulación matemática**: Los problemas primal y dual y el papel de `C`. [https://scikit-learn.org/stable/modules/svm.html#mathematical-formulation](https://scikit-learn.org/stable/modules/svm.html#mathematical-formulation) 🇬🇧 (en inglés)
