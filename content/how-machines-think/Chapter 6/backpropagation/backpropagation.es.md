---
title: "6.2 Backpropagation: La Conversación del Aprendizaje"
description: "Visualización interactiva del algoritmo de backpropagation para entender cómo aprenden las redes neuronales."
weight: 3
draft: false
slug: "backpropagation-aprendizaje"
---

## Introducción

El algoritmo de **Backpropagation** (retropropagación del error) es el corazón del aprendizaje en la mayoría de las redes neuronales. Es el mecanismo que permite a la red determinar cómo cada peso y sesgo individual contribuye al error total y, a continuación, ajustarlos en la dirección correcta para minimizar ese error.

{{< demo-intro
    title="Visualización de Backpropagation"
    intro_text="**Backpropagation** es el motor de aprendizaje de las redes neuronales. Cuando la red comete un error, este algoritmo calcula cuánto contribuyó cada conexión al fallo y ajusta los pesos para reducir el error en la siguiente iteración."
    medical_highlight="Observa cómo fluye el error hacia atrás por la red. Prueba distintas tasas de aprendizaje y activa el Modo Turbo para ver la convergencia completa."
    context_type="hospital"
    difficulty="intermediate"
>}}

## Demostración Interactiva

{{< backpropagation lang="es" >}}

## Conceptos Fundamentales

{{% notice style="info" title="¿Cómo Funciona Backpropagation?" %}}
El algoritmo de backpropagation opera en dos fases principales:

1. **Forward Pass (Propagación hacia adelante)**: Los datos fluyen desde la entrada hasta la salida, cada capa procesa y transforma la información recibida
2. **Backward Pass (Retropropagación)**: El error se calcula en la salida y se propaga hacia atrás, ajustando los pesos según su contribución al error

Este proceso iterativo permite que la red aprenda gradualmente patrones complejos en los datos.
{{% /notice %}}

{{% notice style="tip" title="Conceptos Clave del Aprendizaje" %}}
- **Gradiente**: Vector que indica la dirección y magnitud del cambio necesario en cada peso para minimizar el error
- **Learning Rate (Tasa de Aprendizaje)**: Parámetro que controla qué tan grandes son los ajustes en cada iteración
- **Chain Rule (Regla de la Cadena)**: Principio matemático que permite calcular gradientes en redes con múltiples capas
- **Loss Function**: Función que mide la diferencia entre la predicción y el valor real
{{% /notice %}}

{{% notice style="warning" title="Desafíos del Entrenamiento" %}}
- **Vanishing Gradients**: Los gradientes se vuelven muy pequeños en capas profundas
- **Exploding Gradients**: Los gradientes crecen exponencialmente causando inestabilidad
- **Overfitting**: La red memoriza los datos de entrenamiento pero no generaliza
- **Local Minima**: La red puede quedar atrapada en soluciones subóptimas
{{% /notice %}}

{{< terminal >}}
