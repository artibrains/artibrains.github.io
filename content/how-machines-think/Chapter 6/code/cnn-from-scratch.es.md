---
title: "⚡ Una red neuronal convolucional desde cero"
weight: 84
description: "Demostración interactiva: la CNN del libro escrita solo con NumPy, con la convolución, el max-pooling y la retropropagación a mano, entrenada con lesiones cutáneas sintéticas."
date:
draft: false
slug: "red-neuronal-convolucional-desde-cero"
---

La red de Ana para los dermatólogos tiene 105.411 parámetros: dos convoluciones con max-pooling, una capa densa y una salida softmax. El notebook de Keras la construye en pocas líneas. Este notebook escribe cada capa a mano con NumPy, hacia delante y hacia atrás, comprueba los gradientes numéricamente y la entrena con descenso del gradiente por mini-lotes con las mismas lesiones sintéticas.

El notebook interactivo incluye:

- La convolución a mano, con el ejemplo de la figura del libro.
- El relleno (padding) y la convolución como un único producto de matrices (im2col).
- El max-pooling, y dónde estaba cada máximo.
- El paso hacia delante y hacia atrás de cada capa.
- La red del libro y sus 105.411 parámetros.
- Una comprobación numérica de todos los gradientes.
- El entrenamiento con descenso del gradiente por mini-lotes, validación y parada temprana.
- La evaluación con las imágenes de prueba y los filtros que ha aprendido la red.

{{< isolate name="6RedNeuronalConvolucionalDesdeCero" params=`lang="es"` width="100%" height="720" title="Una red neuronal convolucional desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1sv1EY25GwTe0TPjaamNNv78-XftbXozT)

### Bibliografía

- **LeCun, Y., Bottou, L., Bengio, Y. y Haffner, P. (1998). Gradient-based learning applied to document recognition.** *Proceedings of the IEEE*, 86(11), 2278–2324. [https://doi.org/10.1109/5.726791](https://doi.org/10.1109/5.726791) 🇬🇧 (en inglés)
- **Goodfellow, I., Bengio, Y. y Courville, A. (2016). *Deep Learning*.** MIT Press. Capítulo 9, redes convolucionales. [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/) 🇬🇧 (en inglés)
- **He, K., Zhang, X., Ren, S. y Sun, J. (2015). Delving deep into rectifiers: surpassing human-level performance on ImageNet classification.** *ICCV 2015*. La inicialización usada para capas ReLU. [https://arxiv.org/abs/1502.01852](https://arxiv.org/abs/1502.01852) 🇬🇧 (en inglés)
