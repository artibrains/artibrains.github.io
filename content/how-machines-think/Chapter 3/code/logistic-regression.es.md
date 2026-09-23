---
title: "⚡ Regresión logística desde cero"
weight: 81
description: "Demostración interactiva: cómo crear un modelo de regresión logística desde cero para predecir las ausencias a las citas."
date:
draft: false
slug: "regresion-logistica-desde-cero"
---

Estas son las notas de Luis sobre cómo implementar un modelo de regresión logística desde cero, con NumPy y descenso del gradiente. El notebook lo aplica al problema del capítulo: predecir qué pacientes de Fisioterapia de Minermont faltarán a su cita.

El notebook interactivo incluye:

- Datos sintéticos de citas (edad, días desde la última cita, distancia, hora, primera visita y ausencias previas) y una primera exploración.
- División estratificada en conjuntos de entrenamiento y prueba, y escalado de las características solo con las estadísticas de entrenamiento.
- La función sigmoide y la pérdida logarítmica, con ejemplos de cómo castiga los errores cometidos con mucha seguridad.
- Entrenamiento con descenso del gradiente y evolución del coste.
- Evaluación con la matriz de confusión, la sensibilidad, la especificidad, el VPP y el VPN, y el efecto del umbral de decisión.
- Interpretación de los pesos como razones de probabilidades (odds ratios) y predicciones para pacientes nuevos.

{{< isolate name="35RegresionLogistica" params=`lang="es"` width="100%" height="720" title="Regresión logística (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1xbgpQWiL9V6XtwibuJUCSh0GaqBg5LAe)

### Bibliografía

- **Guía de scikit-learn – Regresión logística**: El modelo, su función de coste y sus variantes regularizadas. [https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) 🇬🇧 (en inglés)
- **Google ML Crash Course – Regresión logística**: La sigmoide, la pérdida logarítmica y el cálculo de probabilidades. [https://developers.google.com/machine-learning/crash-course/logistic-regression](https://developers.google.com/machine-learning/crash-course/logistic-regression) 🇬🇧 (en inglés)
- **Google ML Crash Course – Clasificación**: Umbrales, matriz de confusión y las métricas que se derivan de ella. [https://developers.google.com/machine-learning/crash-course/classification](https://developers.google.com/machine-learning/crash-course/classification) 🇬🇧 (en inglés)
- **NumPy – Generador aleatorio**: `default_rng`, `binomial`, `poisson` y `gamma`, con los que se generan las citas sintéticas. [https://numpy.org/doc/stable/reference/random/generator.html](https://numpy.org/doc/stable/reference/random/generator.html) 🇬🇧 (en inglés)
