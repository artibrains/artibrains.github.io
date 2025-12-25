---
title: "📐 Derivadas parciales y gradiente"
description: "De las derivadas parciales al vector gradiente, intuición geométrica y un widget interactivo."
weight: 61
draft: false
slug: "gradientes"
math: true
---

## ¿Qué es una derivada parcial?

Para una función $f(x_1,\dots,x_d)$, la derivada parcial respecto a $x_k$ mide cómo cambia $f$ cuando solo varía $x_k$ manteniendo el resto fijo:

$$
\frac{\partial f}{\partial x_k}(\mathbf{x}) = \lim_{h\to 0} \frac{f(x_1,\dots, x_k+h,\dots, x_d) - f(x_1,\dots,x_k,\dots,x_d)}{h}.
$$

## El vector gradiente

El gradiente reúne todas las derivadas parciales en un vector:

$$
\nabla f(\mathbf{x}) = \begin{bmatrix}
\tfrac{\partial f}{\partial x_1} & \tfrac{\partial f}{\partial x_2} & \cdots & \tfrac{\partial f}{\partial x_d}
\end{bmatrix}^{\!\top}.
$$

Apunta en la dirección de mayor incremento de $f$ y su módulo coincide con la derivada direccional máxima en $\mathbf{x}$.

{{% notice style="info" title="Intuición geométrica" %}}
Las curvas de nivel (contornos) de $f$ son ortogonales al gradiente: avanzar en $-\nabla f$ reduce $f$ más rápidamente.
{{% /notice %}}

## Por qué importa en AA

Los métodos de optimización como el descenso del gradiente actualizan parámetros $\theta$ siguiendo $-\nabla J(\theta)$, donde $J$ es el objetivo. Derivadas parciales correctas aseguran aprendizaje estable y permiten diagnosticar sensibilidad que se desvanece o explota entre dimensiones.

## Reglas frecuentes

- Linealidad por coordenada: $\tfrac{\partial}{\partial x_k}(af + bg) = a\,\tfrac{\partial f}{\partial x_k} + b\,\tfrac{\partial g}{\partial x_k}$.
- Producto (por coordenada): $\tfrac{\partial}{\partial x_k}(fg) = (\tfrac{\partial f}{\partial x_k})g + f(\tfrac{\partial g}{\partial x_k})$.
- Regla de la cadena (forma vectorial): si $g(\mathbf{x})\in\mathbb{R}$ y $h(t)\in\mathbb{R}$, entonces $\nabla(h\circ g) = h'(g(\mathbf{x}))\,\nabla g(\mathbf{x})$.
- Tablas comunes: potencias, exp/log y trigonométricas aplican componente a componente.

## Gradiente interactivo

Introduce una función multivariable y las variables para calcular $\nabla f$ simbólicamente. Usa WolframAlpha para explicaciones paso a paso.

{{< gradient-widget >}}

## Ejemplo trabajado

Sea $f(x,y) = x^2 y + \sin(xy)$. Entonces

$$
\frac{\partial f}{\partial x} = 2xy + y\cos(xy), \qquad
\frac{\partial f}{\partial y} = x^2 + x\cos(xy),
$$

y

$$
\nabla f(x,y) = \begin{bmatrix} 2xy + y\cos(xy) \\ x^2 + x\cos(xy) \end{bmatrix}.
$$

## Consideraciones prácticas

- Notación: $\nabla f$ es un vector columna; mantén la coherencia con las bibliotecas.
- Dominios: respeta restricciones de dominio (p. ej., $\ln x$ requiere $x>0$).
- Escalado: el escalado de variables afecta la magnitud relativa de las parciales y puede estabilizar la optimización.
- Verificación: contrasta resultados simbólicos con diferencias finitas si es necesario.

## Referencias

1. S. Boyd, L. Vandenberghe. Convex Optimization — https://web.stanford.edu/~boyd/cvxbook/
2. J. Nocedal, S. Wright. Numerical Optimization (Wiley) — https://www.wiley.com/en-us/Numerical+Optimization-p-9780387400653
3. Wikipedia (ES). Gradiente — https://es.wikipedia.org/wiki/Gradiente
4. Wolfram MathWorld. Gradient — https://mathworld.wolfram.com/Gradient.html
