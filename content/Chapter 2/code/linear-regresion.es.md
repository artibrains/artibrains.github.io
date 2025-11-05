---
title: "⚡ Regresión lineal desde cero"
weight: 61
description: "Demostración interactiva: cómo crear un modelo de regresión lineal desde cero y aplicarlo."
date: 
draft: false
slug: "regresion-lineal-desde-cero"
---

Estas son las notas de Luis sobre como implementar un modelo de regresión lineal desde cero, utilizando descenso por gradiente y parada temprana. Esta demostración te permitirá entender los fundamentos de la regresión lineal y cómo se aplica en problemas reales.

El notebook interactivo incluye:

- Preparación y visualización de datos sintéticos.
- Implementación manual del modelo de regresión lineal.
- Entrenamiento usando descenso por gradiente con parada temprana.
- Visualización del proceso de aprendizaje y los resultados.
- Ejemplo de predicción para nuevos datos.


{{< isolate name="26RegresionLineal" params=`lang="es"` width="100%" height="720" title="Regresión lineal (aislado)" >}}




¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1wRMKXUnM-ftZRyaNNUip2ijsEFMFu4_J)

### Bibliografía

- **Documentación de scikit-learn – Modelos lineales**: Formulación de mínimos cuadrados ordinarios, supuestos y API. [https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares](https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares) 🇬🇧 (en inglés)
- **Referencia de NumPy – `numpy.linalg.lstsq`**: Resolución matricial que respalda la implementación desde cero. [https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html](https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html) 🇬🇧 (en inglés)
- **Tutoriales de Matplotlib – Pyplot**: Guía para producir las gráficas de seguimiento del entrenamiento. [https://matplotlib.org/stable/tutorials/introductory/pyplot.html](https://matplotlib.org/stable/tutorials/introductory/pyplot.html) 🇬🇧 (en inglés)
- **Curso intensivo de Google – Regresión lineal**: Repaso conceptual de descenso por gradiente y análisis de error. [https://developers.google.com/machine-learning/crash-course/linear-regression?hl=es](https://developers.google.com/machine-learning/crash-course/linear-regression?hl=es)
