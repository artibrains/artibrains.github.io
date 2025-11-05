---
title: "📐 Backpropagation mediante la regla de la cadena"
description: "Deriva la recursión estándar de backpropagation con notación jacobiana compacta y ejemplos trabajados."
weight: 91
draft: false
slug: "backpropagation-regla-cadena"
---

## Contexto

La "conversación de aprendizaje" de Alma se formaliza cuando los gradientes fluyen hacia atrás mediante productos jacobianos. Esta nota deriva las ecuaciones canónicas de backpropagation con un cálculo matricial claro.

{{% notice style="info" title="Para ver y leer" %}}
El video [3Blue1Brown – "Backpropagation calculus"](https://www.3blue1brown.com/lessons/backpropagation-calculus) complementa el álgebra que sigue.{{% /notice %}}

## Configuración de la red

Para una red feedforward con $L$ capas:

- Pesos $W^{(\ell)} \in \mathbb{R}^{n_\ell \times n_{\ell-1}}$
- Sesgos $b^{(\ell)} \in \mathbb{R}^{n_\ell}$
- Pre-activaciones $z^{(\ell)} = W^{(\ell)} a^{(\ell-1)} + b^{(\ell)}$
- Activaciones $a^{(\ell)} = \phi^{(\ell)}(z^{(\ell)})$

Con entrada $a^{(0)} = x$, salida $a^{(L)}$ y pérdida $\mathcal{L}(a^{(L)}, y)$, la notación jacobiana $J_f(p) = \partial f / \partial p^\top$ mantiene las derivadas organizadas.

## Espina dorsal de la regla de la cadena

El gradiente respecto a $W^{(\ell)}$ se factoriza como

$$
\frac{\partial \mathcal{L}}{\partial W^{(\ell)}} = \delta^{(\ell)} {a^{(\ell-1)}}^\top,
$$

donde la señal de error $\delta^{(\ell)}$ satisface

$$
\delta^{(\ell)} = \big(W^{(\ell+1)\top} \delta^{(\ell+1)}\big) \odot \phi^{(\ell)\,'}(z^{(\ell)}),
$$

con caso base

$$
\delta^{(L)} = \nabla_{z^{(L)}} \mathcal{L} = \big(J_{a^{(L)}}(z^{(L)})\big)^\top \nabla_{a^{(L)}} \mathcal{L}.
$$

Como $J_{z^{(k)}}(a^{(k-1)}) = W^{(k)}$ y $J_{a^{(k)}}(z^{(k)}) = \operatorname{diag}(\phi^{(k)\,'}(z^{(k)}))$, la recursión surge directamente de multiplicar jacobianos. Los gradientes de los sesgos siguen como $\partial \mathcal{L} / \partial b^{(\ell)} = \delta^{(\ell)}$.

## Ejemplo trabajado

Para una red de dos capas con activación oculta $\sigma$ y activación de salida $\phi$:

$$
\begin{aligned}
 z^{(1)} &= W^{(1)} x + b^{(1)}, & a^{(1)} &= \sigma(z^{(1)}), \\
 z^{(2)} &= W^{(2)} a^{(1)} + b^{(2)}, & \hat{y} &= a^{(2)} = \phi(z^{(2)}),
\end{aligned}
$$

la pérdida de error cuadrático medio produce

$$
\delta^{(2)} = (\hat{y} - y) \odot \phi'(z^{(2)}), \qquad
\delta^{(1)} = \big(W^{(2)\top} \delta^{(2)}\big) \odot \sigma'(z^{(1)}),
$$

y gradientes

$$
\frac{\partial \mathcal{L}}{\partial W^{(2)}} = \delta^{(2)} {a^{(1)}}^\top, \qquad
\frac{\partial \mathcal{L}}{\partial W^{(1)}} = \delta^{(1)} x^\top.
$$

Cada paso replica multiplicaciones matriciales y productos elemento a elemento, exactamente lo que visualiza el demo del capítulo.

## Visión desde la diferenciación automática

La autodiferenciación en modo reverso aplica la regla de la cadena sin formar jacobianos explícitos. Si definimos $g^{(\ell)} = \nabla_{a^{(\ell)}} \mathcal{L}$, obtenemos

$$
g^{(\ell-1)} = W^{(\ell)\top} \big( g^{(\ell)} \odot \phi^{(\ell)\,'}(z^{(\ell)}) \big),
$$

que es la misma recurrencia expresada en términos de gradientes sobre las activaciones.

## Consideraciones prácticas

- La vectorización maneja mini-batches al promover los productos externos a multiplicaciones matriciales por lotes.
- Los quiebres no diferenciables (por ejemplo, ReLU en cero) usan subgradientes o fijan $\phi'(0)=0$.
- Softmax con entropía cruzada simplifica el error de salida a $\hat{y} - y$.

{{% notice style="warning" title="Gradientes que se desvanecen" %}}
Multiplicar repetidamente matrices de derivadas puede contraer las señales cuando $\lVert \phi' \rVert < 1$. Conexiones residuales y buenas inicializaciones mitigan este efecto en redes más profundas.{{% /notice %}}

## Referencias

1. D. E. Rumelhart, G. E. Hinton, R. J. Williams. *Learning representations by back-propagating errors*. Nature 323, 533–536 (1986).
2. P. J. Werbos. *Beyond Regression: New Tools for Prediction and Analysis in the Behavioral Sciences*. Tesis doctoral, Harvard University, 1974.
3. I. Goodfellow, Y. Bengio, A. Courville. *Deep Learning*. MIT Press, 2016. Capítulo 6.
4. 3Blue1Brown. *Backpropagation calculus*. https://www.3blue1brown.com/lessons/backpropagation-calculus. Consultado en octubre de 2025.
