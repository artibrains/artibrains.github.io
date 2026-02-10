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


## Reglas y derivadas básicas

| Regla | Función | Derivada |
|-------|---------|----------|
| Linealidad | af + bg | a f' + b g' |
| Constante | c | 0 |
| Potencias | x^n | n x^{n-1} (n real) |
| Exponenciales | e^x | e^x |
|  | a^x | a^x ln a |
| Logaritmos | ln x | 1/x |
|  | log_a x | 1/(x ln a) |
| Trigonométricas | sin x | cos x |
|  | cos x | -sin x |
|  | tan x | sec^2 x |
|  | cot x | -csc^2 x |
|  | sec x | sec x tan x |
|  | csc x | -csc x cot x |
| Inversas trigonométricas | arcsin x | 1/√(1-x^2) |
|  | arccos x | -1/√(1-x^2) |
|  | arctan x | 1/(1+x^2) |
| Regla del producto | fg | f'g + fg' |
| Regla del cociente | f/g | (f'g - fg')/g^2 (g ≠ 0) |
| Regla de la cadena | f(g(x)) | f'(g(x)) g'(x) |

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
