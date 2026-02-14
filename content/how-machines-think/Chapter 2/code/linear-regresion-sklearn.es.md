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

Preparación y visualización de datos sintéticos.
Implementación de un modelo de regresión lineal con scikit-learn.
División de los datos en conjuntos de entrenamiento y prueba.
Entrenamiento y evaluación del modelo.
Visualización de los datos y la línea de regresión.
Ejemplo de predicción para nuevos datos.


{{< isolate name="26RegresionLinealSklearn" params=`lang="es"` width="100%" height="720" title="Regresión lineal (aislado)" >}}




¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1-qzaTrUynhvjiUbfQM7N3bBo60rSOUh3)

### Bibliografía

- **Referencia de scikit-learn – `LinearRegression`**: Parámetros, atributos y notas de uso del estimador. [https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html) 🇬🇧 (en inglés)
- **scikit-learn – Validación y `train_test_split`**: Buenas prácticas para dividir conjuntos y validar modelos. [https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation) 🇬🇧 (en inglés)
- **scikit-learn – Métricas de regresión**: Definiciones de R², MAE y MSE empleadas en el notebook. [https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics) 🇬🇧 (en inglés)
- **Documentación de pandas – `DataFrame`**: Operaciones utilizadas para preparar los datos. [https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) 🇬🇧 (en inglés)
