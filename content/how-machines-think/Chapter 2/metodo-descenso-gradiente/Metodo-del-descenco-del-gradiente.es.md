---
title: "2.5 - El Método del Descenso del Gradiente"
description: "Aprende cómo el algoritmo de descenso del gradiente encuentra puntos mínimos de funciones complejas para optimizar modelos de machine learning."
weight: 51
draft: false
slug: "metodo-descenso-gradiente"
---

## Introducción

El **Método del Descenso del Gradiente** es el algoritmo fundamental que permite a los modelos de machine learning "aprender" encontrando los valores óptimos de sus parámetros. Funciona como un explorador que busca el punto más bajo de una montaña siguiendo siempre la dirección de mayor descenso.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro 
    lang="es"
    title="Algoritmo del Descenso del Gradiente"
    scenario="En esta simulación, puedes visualizar ese proceso. El gráfico de la izquierda muestra la superficie de la función de coste (en este caso, el Error Cuadrático Medio o MSE). Cada punto en esta superficie representa el error total para una combinación específica de w y b. El objetivo es encontrar el punto más bajo del valle. Usa los controles para iniciar el algoritmo. Observa cómo los parámetros se actualizan en cada iteración (gráfico de la derecha), siguiendo la dirección opuesta al gradiente, hasta converger en la solución óptima que minimiza el error. Puedes experimentar con diferentes tasas de aprendizaje para ver cómo afecta a la velocidad y estabilidad del proceso."
    steps="Observa la Exploración: Ve cómo el algoritmo se mueve por la superficie de la función, siguiendo siempre la dirección de mayor descenso según el gradiente.|Ajusta los Parámetros: Experimenta con la tasa de aprendizaje para ver cómo afecta la velocidad y estabilidad de convergencia.|Analiza la Convergencia: Observa cómo la norma del gradiente se reduce indicando que se acerca al mínimo, y cuándo el algoritmo decide detenerse."
    medical_highlight="Observa cómo cada paso actualiza la posición actual usando la dirección del gradiente. Una tasa de aprendizaje adecuada genera convergencia estable, mientras que valores extremos pueden provocar aprendizaje lento u oscilaciones."
>}}

{{< descenso-gradiente_intro_es lang="es" >}}

{{< descenso-gradiente lang="es" >}}
{{< /demo-wrapper >}}

## Conceptos Fundamentales

### ¿Qué es el Gradiente?

{{% notice style="info" title="El Gradiente como Brújula Matemática" %}}
El **gradiente** (∇f) es un vector que apunta en la dirección de mayor crecimiento de una función. En optimización:

- **Dirección**: Indica hacia dónde la función crece más rápidamente
- **Magnitud**: Su longitud indica qué tan empinada es la pendiente
- **Descenso**: Para minimizar, vamos en dirección **opuesta** al gradiente
{{% /notice %}}

### Criterio de Parada

{{% notice style="tip" title="¿Cuándo Detenerse?" %}}
#### Norma del Gradiente (|∇f|)

Imagina el gradiente como una flecha indicando la subida más empinada. La **norma** es simplemente la longitud de esa flecha:

- **Flecha larga** → Pendiente fuerte → Seguir optimizando
- **Flecha corta** → Terreno plano → Cerca del mínimo
- **Criterio**: Detenerse cuando |∇f| < tolerancia (ej: 0.001)

Esto nos indica que hemos llegado al "valle" donde el terreno es casi plano.
{{% /notice %}}

### Parámetros Clave

{{% notice style="warning" title="Tasa de Aprendizaje (Learning Rate)" %}}
- **Demasiado alta**: El algoritmo puede "saltar" sobre el mínimo

- **Demasiado baja**: Convergencia muy lenta

- **Óptima**: Balance entre velocidad y precisión
{{% /notice %}}

{{< terminal >}}
