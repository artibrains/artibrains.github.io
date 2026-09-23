---
title: "⚡ Regresión lineal con sklearn"
weight: 68
description: "Demostración interactiva: cómo crear un modelo de regresión lineal utilizando la biblioteca scikit-learn."
date:
draft: false 
slug: "regresion-lineal-sklearn"
---

Estas son las notas de Luis sobre cómo implementar un modelo de regresión lineal utilizando la biblioteca scikit-learn. Esta demostración te permitirá entender cómo scikit-learn simplifica el proceso de entrenamiento, evaluación y uso de modelos de regresión lineal.

El notebook interactivo incluye:

- Datos sintéticos generados a partir de una recta que plantamos nosotros ($y = 4 + 3x$), para poder comprobar el resultado.
- División de los datos en conjuntos de entrenamiento y prueba con `train_test_split`.
- Entrenamiento de un modelo `LinearRegression` con una sola llamada a `fit()`, y comparación de lo aprendido con la recta plantada.
- Evaluación con datos no vistos mediante el ECM y el R², y comparación con el error de entrenamiento.
- Visualización de los datos de entrenamiento, los de prueba y la recta de regresión.
- Predicciones para datos nuevos, y la diferencia entre interpolar y extrapolar.


{{< isolate name="26RegresionLinealSklearn" params=`lang="es"` width="100%" height="720" title="Regresión lineal (aislado)" >}}




¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1-qzaTrUynhvjiUbfQM7N3bBo60rSOUh3)

### Bibliografía

- **Referencia de scikit-learn – `LinearRegression`**: Parámetros, atributos y notas de uso del estimador. [https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html) 🇬🇧 (en inglés)
- **scikit-learn – Validación y `train_test_split`**: Buenas prácticas para dividir conjuntos y validar modelos. [https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation) 🇬🇧 (en inglés)
- **scikit-learn – Métricas de regresión**: Definiciones del ECM (MSE) y del R² empleados en el notebook. [https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics) 🇬🇧 (en inglés)
- **NumPy – Generación de números aleatorios**: `np.random.rand`, `np.random.randn` y `np.random.seed`, con las que se generan los datos sintéticos. [https://numpy.org/doc/stable/reference/random/index.html](https://numpy.org/doc/stable/reference/random/index.html) 🇬🇧 (en inglés)
