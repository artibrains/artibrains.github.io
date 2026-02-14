---
title: "3.1 - Juego de Clasificación SVM"
description: "Aprende Máquinas de Vectores de Soporte de forma interactiva encontrando el mejor hiperplano que separa dos clases."
weight: 1
draft: false
slug: "juego-svm"
---

## Introducción

Las Máquinas de Vectores de Soporte (SVM por sus siglas en inglés) son algoritmos de aprendizaje supervisado muy potentes utilizados para tareas de clasificación. La idea fundamental es encontrar el hiperplano óptimo que separa datos de diferentes clases, maximizando el margen entre ellas. Esta maximización del margen hace que las SVM sean particularmente robustas y efectivas para problemas de clasificación binaria.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro
lang="es"
title="Juego de Clasificación SVM"
scenario="Un equipo de control de calidad necesita clasificar elementos como válidos o defectuosos basándose en dos características medidas. Usando datos históricos de inspección, el sistema debe encontrar la frontera de decisión que mejor separe ambas clases. El gráfico muestra puntos de datos donde los puntos azules representan una clase (válido) y los puntos rojos representan la otra (defectuoso). La posición de cada punto está determinada por dos características medidas. La línea es tu límite de decisión (hiperplano), y el área sombreada representa el margen. Tu objetivo es ajustar el límite para maximizar el margen mientras clasificas correctamente los puntos."
steps="Ajusta los Parámetros del Hiperplano: Mueve los controles deslizantes para cambiar la posición y el ángulo del límite de decisión. Observa cómo cambia el margen y la precisión de clasificación.|Entiende el Margen: El margen es la distancia entre el hiperplano y los puntos más cercanos de cada clase (vectores de soporte). Un margen mayor generalmente significa mejor generalización.|Encuentra la Solución Óptima: Usa el botón 'Encontrar Mejor Hiperplano' para que el algoritmo SVM calcule automáticamente el límite separador óptimo que maximiza el margen."
medical_highlight="Las SVM encuentran el hiperplano separador que maximiza el margen entre clases, lo que suele mejorar la robustez. En la práctica, esto puede reducir falsas alarmas y defectos no detectados en datos nuevos."
>}}

{{< game-results >}}

{{< svm-game lang="es" >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

### El Enfoque SVM

{{% notice style="info" title="Conceptos Clave de SVM" %}}
**Vectores de Soporte**
: Los puntos de datos más cercanos al límite de decisión. Estos puntos son críticos porque definen la posición y orientación del hiperplano.

**Margen**
: La distancia entre el hiperplano y los vectores de soporte más cercanos de cada clase. SVM busca maximizar este margen para una mejor generalización.

**Hiperplano**
: El límite de decisión que separa las dos clases. En 2D, es una línea; en dimensiones superiores, se convierte en un hiperplano.
{{% /notice %}}

{{% notice style="tip" title="Estrategias de Clasificación" %}}
- **Ajuste Manual**: Te ayuda a entender cómo la posición del límite afecta la clasificación
- **Maximización del Margen**: Cuanto más amplio sea el margen, más confiable y generalizable será la clasificación
- **Enfoque en Vectores de Soporte**: Presta atención a los vectores de soporte - son los puntos más importantes para definir el límite
- **Optimización Automática**: El algoritmo SVM encuentra el hiperplano óptimo resolviendo un problema de optimización con restricciones
{{% /notice %}}

## Fundamentos Matemáticos

El problema de optimización de SVM se puede formular como:

$$
\begin{aligned}
\text{Maximizar} \quad & \frac{2}{\|\mathbf{w}\|} \\
\text{Sujeto a} \quad & y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1, \quad \forall i
\end{aligned}
$$

Donde:
- $\mathbf{w}$ es el vector normal al hiperplano
- $b$ es el término de sesgo
- $\mathbf{x}_i$ son los puntos de datos
- $y_i \in \{-1, 1\}$ son las etiquetas de clase
- El ancho del margen es $\frac{2}{\|\mathbf{w}\|}$

{{% notice style="warning" title="Consideraciones Importantes" %}}
- **Datos Linealmente Separables**: Esta demostración muestra el caso básico donde las clases pueden separarse con una línea recta
- **Truco del Kernel**: Para datos no linealmente separables, las SVM pueden usar funciones kernel para mapear los datos a dimensiones superiores
- **Margen Suave**: Los datos del mundo real pueden tener valores atípicos; las SVM de margen suave permiten algunas clasificaciones erróneas para lograr un mejor rendimiento general
{{% /notice %}}

{{< terminal >}}
