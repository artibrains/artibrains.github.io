---
title: "⚡ Redes neuronales con TensorFlow y Keras"
weight: 83
description: "Demostración interactiva: diferenciación automática, XOR con Keras, la red convolucional del libro para imágenes de dermatología y una red de scikit-learn para comparar."
date:
draft: false
slug: "redes-neuronales-tensorflow-keras"
---

En el notebook anterior escribimos una red neuronal a mano, derivadas incluidas: lo que Ana llama nivel 0 en sus notas (sección 6.8). Este notebook sube los otros pisos de su "edificio": la diferenciación automática con TensorFlow, las capas estándar con Keras y los modelos ya hechos con scikit-learn. Con Keras construye la red convolucional que diseña Ana para el proyecto de dermatología de Minermont (sección 6.4), capa a capa y parámetro a parámetro, con imágenes sintéticas de lesiones de la piel.

El notebook interactivo incluye:

- Nivel 1, diferenciación automática: TensorFlow calcula los gradientes del ejemplo de Marta, y coinciden con los calculados a mano.
- Nivel 2, la API de Keras: una red pequeña que resuelve XOR.
- Imágenes sintéticas de 28 × 28 de lesiones benignas, sospechosas y malignas.
- La red convolucional del libro, con sus parámetros contados capa a capa, entrenada con parada temprana.
- La evaluación con las imágenes de prueba: exactitud, matriz de confusión y precisión y exhaustividad por clase.
- Qué ve la red: los filtros de la primera convolución y sus mapas de características.
- Nivel 3: una red de scikit-learn con las mismas imágenes, y por qué funciona mucho peor que la red convolucional.

{{< isolate name="6RedesNeuronalesConTensorFlowYKeras" params=`lang="es"` width="100%" height="720" title="Redes neuronales con TensorFlow y Keras (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1MofdHfnz6JZzGbjlifC2lgX4XK9dAdMp)

### Bibliografía

- **LeCun, Y., Bottou, L., Bengio, Y. y Haffner, P. (1998). Gradient-based learning applied to document recognition.** *Proceedings of the IEEE*, 86(11), 2278–2324. La red convolucional clásica. [https://doi.org/10.1109/5.726791](https://doi.org/10.1109/5.726791) 🇬🇧 (en inglés)
- **Documentación de Keras – The Sequential model** y las capas de convolución. [https://keras.io/guides/sequential_model/](https://keras.io/guides/sequential_model/) 🇬🇧 (en inglés)
- **Guía de TensorFlow – Introducción a los gradientes y la diferenciación automática**: `tf.GradientTape`. [https://www.tensorflow.org/guide/autodiff](https://www.tensorflow.org/guide/autodiff) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Modelos de redes neuronales (supervisados)**: `MLPClassifier`. [https://scikit-learn.org/stable/modules/neural_networks_supervised.html](https://scikit-learn.org/stable/modules/neural_networks_supervised.html) 🇬🇧 (en inglés)
