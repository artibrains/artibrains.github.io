---
title: "📐 Teorema de convergencia del perceptrón"
description: "Demostración de Rosenblatt–Novikoff que acota los errores del perceptrón en datos separables."
weight: 90
draft: false
slug: "teorema-convergencia-perceptron"
---

## Contexto

El Capítulo 6 presenta el perceptrón como la primera neurona que aprende en Minermont. El análisis clásico de Rosenblatt–Novikoff garantiza que, sobre datos linealmente separables, el algoritmo termina encontrando un hiperplano separador.

{{% notice style="info" title="Mapa de lectura" %}}
Relaciona esta derivación con el ejemplo de triaje radiológico del capítulo. La prueba aplica a cualquier conjunto separable, sin importar la dimensión.{{% /notice %}}

## Recordatorio del algoritmo

Con ejemplos etiquetados $(x_i, y_i)$ donde $y_i \in \{-1, +1\}$ e inputs homogéneos $x_i \in \mathbb{R}^d$, inicializa $w_0 = 0$ y repite:

1. Selecciona un punto mal clasificado $x_i$.
2. Actualiza los pesos según
   $$
   w_{t+1} = w_t + y_i x_i.
   
$$

Las predicciones son correctas cuando $\operatorname{sign}(w_t \cdot x_i) = y_i$; el proceso se detiene al clasificar todos los ejemplos correctamente.

## Cota de errores

Supón un vector $u$ que separa los datos con margen $\gamma > 0$, es decir $y_i (u \cdot x_i) \ge \gamma$ para todo $i$, y define $R = \max_i \lVert x_i \rVert$. Tras cada error la proyección sobre $u$ aumenta:

$$
w_{t+1} \cdot u = (w_t + y_i x_i) \cdot u \ge w_t \cdot u + \gamma.
$$

Después de $M$ errores, $w_M \cdot u \ge M\gamma$. La norma cuadrática evoluciona como

$$
\lVert w_{t+1} \rVert^2 = \lVert w_t \rVert^2 + 2 y_i (w_t \cdot x_i) + \lVert x_i \rVert^2 \le \lVert w_t \rVert^2 + R^2,
$$

porque cometer un error implica $y_i (w_t \cdot x_i) \le 0$. Así, $\lVert w_M \rVert^2 \le M R^2$.

Por Cauchy–Schwarz,

$$
w_M \cdot u \le \lVert w_M \rVert \lVert u \rVert \le \sqrt{M} R.
$$

Al combinar desigualdades obtenemos $M \le (R/\gamma)^2$: el perceptrón comete una cantidad finita de errores y converge cuando existe un margen separador.

## Intuición geométrica

Cada corrección empuja $w$ hacia el ejemplo mal clasificado. Si existe un margen, estos empujes no pueden girar indefinidamente; tarde o temprano $w$ queda dentro de la franja que separa ambas clases. Márgenes más grandes implican menos actualizaciones porque la cota $(R/\gamma)^2$ se reduce.

## Más allá de la separabilidad

Los conjuntos no separables provocan ciclos perpetuos. Variantes prácticas—pocket perceptron, perceptrón promediado o kernels—extienden la idea cuando la separabilidad perfecta no existe.

## Referencias

1. F. Rosenblatt. *The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain*. Psychological Review, 65(6):386–408, 1958.
2. A. B. Novikoff. *On Convergence Proofs on Perceptrons*. Proceedings of the Symposium on the Mathematical Theory of Automata, 1962.
3. S. Shalev-Shwartz, S. Ben-David. *Understanding Machine Learning: From Theory to Algorithms*. Cambridge University Press, 2014. Capítulo 9.
4. Y. Freund, R. E. Schapire. *Large Margin Classification Using the Perceptron Algorithm*. Machine Learning, 37(3):277–296, 1999.
