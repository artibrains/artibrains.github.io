---
title: "✏️ Derivadas básicas (movido)"
description: "Resumen rápido de la derivada y las reglas más usadas."
weight: 60
draft: true
slug: "derivadas"
math: true
---

{{% notice style="warning" title="Movido" %}}
Esta página se movió al Capítulo 2: [Derivadas básicas]({{% relref "Chapter 2/math/derivatives.es.md" %}}).
{{% /notice %}}

## ¿Qué es una derivada?

La derivada de una función $f(x)$ mide cómo cambia $f$ respecto a $x$—su tasa instantánea de cambio. Formalmente,

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}.
$$

Sustenta las aproximaciones lineales, la optimización por gradiente y la geometría de curvas.

{{% notice style="info" title="Consejo" %}}
En la práctica empleamos reglas algebraicas para derivar rápido, en lugar de límites desde primeros principios.
{{% /notice %}}

## Reglas y derivadas básicas

- Linealidad: $(af + bg)' = a f' + b g'$.
- Constante: $\dfrac{d}{dx}(c) = 0$.
- Potencias: $\dfrac{d}{dx}(x^n) = n x^{n-1}$ para $n$ real.
- Exponenciales: $\dfrac{d}{dx}(e^x) = e^x$ y, en general, $\dfrac{d}{dx}(a^x) = a^x \ln a$.
- Logaritmos: $\dfrac{d}{dx}(\ln x) = \dfrac{1}{x}$ y $\dfrac{d}{dx}(\log_a x) = \dfrac{1}{x\ln a}$.
- Trigonométricas:
  - $\dfrac{d}{dx}(\sin x) = \cos x$, $\dfrac{d}{dx}(\cos x) = -\sin x$.
  - $\dfrac{d}{dx}(\tan x) = \sec^2 x$, $\dfrac{d}{dx}(\cot x) = -\csc^2 x$.
  - $\dfrac{d}{dx}(\sec x) = \sec x\tan x$, $\dfrac{d}{dx}(\csc x) = -\csc x\cot x$.
- Inversas trigonométricas:
  - $\dfrac{d}{dx}(\arcsin x) = \dfrac{1}{\sqrt{1-x^2}}$, $\dfrac{d}{dx}(\arccos x) = -\dfrac{1}{\sqrt{1-x^2}}$.
  - $\dfrac{d}{dx}(\arctan x) = \dfrac{1}{1+x^2}$.
- Regla del producto: $(fg)' = f'g + fg'$.
- Regla del cociente: $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$ con $g\neq 0$.
- Regla de la cadena: $\dfrac{d}{dx}\, f(g(x)) = f'(g(x))\, g'(x)$.

## Pruébalo: Derivada interactiva

Escribe una función de $x$ y calcula $f'(x)$ simbólicamente. Usa el botón de WolframAlpha para ver explicaciones paso a paso.

{{< derivative-widget >}}

## Ejemplos rápidos

- $\dfrac{d}{dx}(x^3 - 4x) = 3x^2 - 4$.
- $\dfrac{d}{dx}(e^{2x}) = 2e^{2x}$.
- $\dfrac{d}{dx}(\ln(x^2+1)) = \dfrac{2x}{x^2+1}$ (regla de la cadena).
- $\dfrac{d}{dx}(\sin^2 x) = 2\sin x\cos x = \sin(2x)$.

## Notas

- Usa radianes en funciones trigonométricas.
- Muchas funciones compuestas se resuelven encadenando regla de la cadena, del producto y de potencias: practica reconocer la estructura.
