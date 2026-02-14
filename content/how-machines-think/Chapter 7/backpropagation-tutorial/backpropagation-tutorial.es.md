---
title: "7.7 Tutorial Interactivo: Backpropagation Paso a Paso"
description: "Aprende cómo las redes neuronales aprenden calculando tú mismo la propagación hacia adelante y hacia atrás, entendiendo exactamente cómo fluyen los gradientes y se actualizan los pesos."
date: 2024-01-23
weight: 70
slug: "backpropagation-paso-a-paso"
aliases: ["/how-machines-think/chapter-6/backpropagation-tutorial/backpropagation-paso-a-paso/", "/how-machines-think/chapter-6/backpropagation-tutorial/"]
---

## Introducción

Backpropagation es el algoritmo fundamental que permite a las redes neuronales aprender. Es la forma en que los errores en la salida se propagan hacia atrás a través de la red, indicando a cada peso exactamente cuánto contribuyó al error y cómo ajustarse.

{{< demo-intro 
    lang="es"
    title="Tutorial de Backpropagation"
    medical_highlight="Cada ejemplo de entrenamiento fluye a través de la red (propagación hacia adelante), produce un error, y ese error fluye hacia atrás (propagación hacia atrás) para actualizar cada peso. Tú realizarás estos cálculos."
    intro_text="**Backpropagation** combina la regla de la cadena del cálculo diferencial con computación eficiente para entrenar redes neuronales. Este tutorial lo descompone en pasos manejables."
    steps="🔢 Verás una red simple con pesos iniciales aleatorios.|📥 Se presenta un ejemplo de entrenamiento (entrada-salida).|➡️ Calculas la propagación hacia adelante paso a paso.|📊 Calculas el error en la salida.|⬅️ Propagas los gradientes hacia atrás usando la regla de la cadena.|🔄 Actualizas los pesos usando descenso de gradiente.|🎯 ¡Observa cómo la red mejora con cada pasada!"
>}}

## Demostración Interactiva

{{< demo-wrapper title="Entrenador de Backpropagation Paso a Paso" >}}

{{< backpropagation-tutorial lang="es" >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

{{% notice style="info" title="Las Dos Fases de Backpropagation" %}}
Entrenar una red neuronal implica dos fases alternantes:

1. **Propagación hacia adelante**: La entrada fluye a través de la red, capa por capa, produciendo una salida
2. **Propagación hacia atrás**: El error en la salida fluye hacia atrás, calculando gradientes para cada peso
3. **Actualización de pesos**: Cada peso se ajusta en la dirección que reduce el error

Este proceso se repite para muchos ejemplos de entrenamiento hasta que la red aprende el comportamiento deseado.
{{% /notice %}}

{{% notice style="tip" title="La Regla de la Cadena es la Clave" %}}
La magia de backpropagation está en la **regla de la cadena** del cálculo:

$$\frac{\partial E}{\partial w} = \frac{\partial E}{\partial o} \cdot \frac{\partial o}{\partial net} \cdot \frac{\partial net}{\partial w}$$

Esto nos dice: "¿Cómo cambia el error cuando cambiamos este peso?" descomponiéndolo en pasos más simples.

- $\frac{\partial E}{\partial o}$: Cómo cambia el error con la salida
- $\frac{\partial o}{\partial net}$: Cómo cambia la salida con la suma ponderada (derivada de activación)
- $\frac{\partial net}{\partial w}$: Cómo cambia la suma ponderada con el peso (¡simplemente la entrada!)
{{% /notice %}}

{{% notice style="note" title="La Función de Activación" %}}
En este tutorial, usamos la función de activación **sigmoide**:

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

Su derivada tiene una propiedad hermosa:

$$\sigma'(x) = \sigma(x) \cdot (1 - \sigma(x))$$

¡Esto significa que si conoces la salida, puedes calcular fácilmente la derivada!
{{% /notice %}}

{{% notice style="warning" title="Tasa de Aprendizaje" %}}
La **tasa de aprendizaje** ($\eta$) controla qué tan grande es cada actualización de peso:

$$w_{nuevo} = w_{anterior} - \eta \cdot \frac{\partial E}{\partial w}$$

- Muy grande: La red puede sobrepasar y nunca converger
- Muy pequeña: El aprendizaje es muy lento
- Justa: Convergencia suave hacia buenas soluciones

En este tutorial, usamos $\eta = 0.5$ para actualizaciones claras y visibles.
{{% /notice %}}

{{< terminal lang="es" >}}
