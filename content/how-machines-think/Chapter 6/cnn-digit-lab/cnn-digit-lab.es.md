---
title: "6.4 Laboratorio CNN: Dibuja, Entrena y Predice"
description: "Laboratorio interactivo de CNN para reconocer dígitos escritos a mano: entrena desde cero o carga un modelo preentrenado."
weight: 4
draft: false
slug: "laboratorio-cnn-digitos"
---

## Introducción

Hasta ahora vimos neuronas individuales y aprendizaje multicapa. El siguiente paso es entender por qué las **Redes Neuronales Convolucionales (CNN)** se convirtieron en el estándar para tareas de visión por computadora.

Una CNN no mira una imagen como una lista plana de píxeles. Aprende patrones locales (trazos, esquinas, bordes) y después los combina para formar conceptos visuales más complejos.

{{< medical-context 
    type="radiology" 
    scenario="Un sistema de triaje recibe miles de radiografías de tórax cada semana. Un modelo que aplana píxeles pierde estructura espacial y falla en señales locales sutiles."
    highlight="Una CNN recorre pequeñas regiones, detecta señales locales y construye características de mayor nivel. Esa jerarquía espacial es clave en imágenes médicas."
>}}

## Laboratorio interactivo: CNN para reconocimiento de dígitos

En esta demo puedes seguir el flujo clásico de introducción a visión por computadora:

1. Dibujar un dígito en una caja.
2. Ejecutar predicción y revisar probabilidades.
3. Elegir una de dos rutas:
   - **Entrenar desde cero** con muestras sintéticas.
   - **Cargar un snapshot preentrenado** y empezar a experimentar directamente.

{{< demo-wrapper title="Laboratorio de Reconocimiento de Dígitos con CNN" >}}

{{< cnn-digit-demo lang="es" >}}

{{< /demo-wrapper >}}

## ¿Qué ocurre dentro del modelo?

{{% notice style="info" title="Arquitectura CNN de este laboratorio" %}}
La demo usa una CNN compacta:

- **Entrada (20×20)**: Tu dibujo se normaliza y centra.
- **Convolución (filtros 3×3)**: Detecta patrones locales de trazo.
- **ReLU**: Conserva activaciones positivas informativas.
- **Pooling**: Comprime respuestas locales manteniendo estructura útil.
- **Densa + Softmax**: Produce probabilidades para los dígitos 0–9.
{{% /notice %}}

{{% notice style="tip" title="Cómo explorarlo mejor" %}}
- Dibuja el mismo número con estilos distintos.
- Compara predicciones antes y después del entrenamiento.
- Observa la visualización de filtros para ver cómo se especializan.
- Prueba entrenamientos cortos vs. largos y compara precisión de validación.
{{% /notice %}}

{{% notice style="warning" title="Limitación importante" %}}
Este entorno es educativo, no un OCR de producción. Es intencionalmente liviano para mantener visible y manipulable el proceso de aprendizaje.
{{% /notice %}}

## ¿Por qué importa más allá de los dígitos?

El reconocimiento de dígitos es la puerta de entrada clásica para entender CNN. Una vez dominada esta intuición, la misma lógica escala a:

- Triaje de lesiones cutáneas
- Análisis de retina
- Cribado en radiografías de tórax
- Herramientas de apoyo en histopatología

Cambia el dominio, no el principio: patrones locales se combinan en evidencia de alto nivel.

## Referencias e inspiración

- [Neural Networks (3Blue1Brown)](https://www.3blue1brown.com/lessons/neural-network-analysis)
- [CS231n: Convolutional Neural Networks](http://cs231n.stanford.edu/)
- [Deep Learning Book](https://www.deeplearningbook.org/)

{{< terminal >}}
