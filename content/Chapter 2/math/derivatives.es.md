---
title: "📐 Derivadas básicas"
description: "Por qué importan para el descenso del gradiente, reglas clave, ejemplo trabajado y un widget interactivo."
weight: 60
draft: false
slug: "derivadas"
math: true
---

## ¿Qué es una derivada?

La derivada de una función $f(x)$ mide cómo cambia $f$ respecto a $x$—su tasa instantánea de cambio. Formalmente,

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}.
$$

Sustenta las aproximaciones lineales, la optimización por gradiente y la geometría de curvas.

{{% notice style="info" title="Consejo" %}}
En la práctica empleamos reglas algebraicas para derivar rápido, en lugar de límites desde primeros principios.
{{% /notice %}}

## Por qué importan las derivadas

En este capítulo entrenamos modelos con optimización basada en gradientes. Las derivadas convierten el error del modelo en actualizaciones de parámetros. Para regresión lineal con predicción $\hat{y}=\theta_0+\theta_1 x$ y error cuadrático medio

$$
J(\theta_0,\theta_1) = \frac{1}{N} \sum_{n=1}^N (y_n - \hat{y}_n)^2,
$$

las derivadas parciales son

$$
\frac{\partial J}{\partial \theta_0} = -\frac{2}{N} \sum_n (y_n-\hat{y}_n), \qquad
\frac{\partial J}{\partial \theta_1} = -\frac{2}{N} \sum_n x_n\,(y_n-\hat{y}_n).
$$

El descenso del gradiente actualiza $\theta$ avanzando en dirección opuesta al gradiente: $\theta \leftarrow \theta - \eta\,\nabla J$.

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

## Derivada interactiva

Escribe una función de $x$ y calcula $f'(x)$ simbólicamente. Usa el botón de WolframAlpha para ver explicaciones paso a paso.

{{< derivative-widget >}}

## Ejemplo trabajado

Sea $f(x) = \sin^2 x \cdot \ln x$. Derivamos con producto + cadena.

1. Define $u(x)=\sin^2 x$ y $v(x)=\ln x$. Entonces $f=uv$ y $f'=u'v+uv'$.
2. $u'(x)=2\sin x\cos x=\sin(2x)$.
3. $v'(x)=\tfrac{1}{x}$ (para $x>0$).

Combinando:

$$
f'(x) = \sin(2x)\,\ln x + \frac{\sin^2 x}{x},\qquad x>0.
$$

Puedes verificar el resultado en el widget o en WolframAlpha.

## Ejemplos rápidos

- $\dfrac{d}{dx}(x^3 - 4x) = 3x^2 - 4$.
- $\dfrac{d}{dx}(e^{2x}) = 2e^{2x}$.
- $\dfrac{d}{dx}(\ln(x^2+1)) = \dfrac{2x}{x^2+1}$ (regla de la cadena).
- $\dfrac{d}{dx}(\sin^2 x) = 2\sin x\cos x = \sin(2x)$.

## Consideraciones prácticas

- Dominios: expresiones como $\ln x$ requieren $x>0$; evita denominadores nulos.
- Unidades: las derivadas trigonométricas asumen radianes.
- Estructura: identifica composiciones para aplicar la regla de la cadena de forma sistemática.
- Cálculo: el widget usa reglas simbólicas (math.js). Para desarrollos paso a paso, usa el enlace a WolframAlpha.

## Referencias

1. J. Stewart. Cálculo: Trascendentes tempranas. (Cengage) — https://www.cengage.com/c/calculus-early-transcendentals-8e-stewart/
2. M. Spivak. Cálculo. (Publish or Perish) — https://www.mathpop.com/book.htm
3. Wikipedia (ES). Derivada — https://es.wikipedia.org/wiki/Derivada
4. Wolfram MathWorld. Derivative — https://mathworld.wolfram.com/Derivative.html
