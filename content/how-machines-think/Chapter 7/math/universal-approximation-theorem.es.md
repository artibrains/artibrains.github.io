---
title: "📐 Teorema de aproximación universal"
description: "Enuncia el resultado clásico de aproximación con una sola capa oculta, da un bosquejo de prueba (Hahn–Banach/Riesz) e incluye referencias canónicas."
weight: 92
draft: false
slug: "teorema-aproximacion-universal"
math: true
---

## Contexto

El Capítulo 7 presenta redes neuronales como aproximadores de funciones. El **Teorema de Aproximación Universal (UAT)** formaliza una idea central:

> Una red *feed-forward* con **una sola capa oculta** puede aproximar **cualquier función continua en un compacto**, siempre que la activación no sea “demasiado simple”.

UAT es un teorema de *existencia*: afirma “existe un ancho $m$ suficientemente grande”, pero **no** garantiza redes pequeñas, entrenamiento fácil ni buena generalización.

## Modelo: redes de una capa oculta

Fijamos una activación $\sigma: \mathbb{R} \to \mathbb{R}$ y consideramos funciones de la forma

$$
F_m(x) = \sum_{j=1}^m a_j\,\sigma(w_j\cdot x + b_j),
\qquad x\in \mathbb{R}^n,
$$

con $a_j\in\mathbb{R}$, $w_j\in\mathbb{R}^n$, $b_j\in\mathbb{R}$.

Sea $K\subset\mathbb{R}^n$ compacto (por ejemplo, $[0,1]^n$) y $C(K)$ el espacio de funciones continuas reales sobre $K$ con la norma supremo $\|\cdot\|_\infty$.

## El enunciado “más importante” (versión moderna)

Una formulación muy usada (Leshno–Lin–Pinkus–Schocken, 1993) es:

**Teorema (UAT para activaciones continuas no polinómicas).**
Sea $K\subset\mathbb{R}^n$ compacto y $\sigma\in C(\mathbb{R})$. Definimos

$$
\mathcal{S} = \operatorname{span}\{x\mapsto \sigma(w\cdot x + b) : w\in\mathbb{R}^n,\ b\in\mathbb{R}\} \subset C(K).
$$

Entonces $\overline{\mathcal{S}} = C(K)$ (densidad en norma uniforme) **si y sólo si** $\sigma$ **no es un polinomio** (casi en todas partes).

En particular, activaciones comunes como **sigmoid**, **tanh** y **ReLU** son aproximadores universales.

## Versión clásica para sigmoides (Cybenko)

El resultado original se suele enunciar para sigmoides en el cubo unidad:

**Teorema (Cybenko, 1989).**
Sea $\sigma$ una función *sigmoidal*, es decir

$$
\lim_{t\to -\infty}\sigma(t)=0, \qquad \lim_{t\to +\infty}\sigma(t)=1.
$$

Entonces las sumas finitas $\sum_{j=1}^m a_j\,\sigma(w_j\cdot x + b_j)$ son densas en $C([0,1]^n)$.

## Bosquejo de prueba (Hahn–Banach + Riesz)

Este es el camino estándar y conceptualmente más claro de las pruebas clásicas.

### Paso 1: reducir la densidad a “no hay anuladores no triviales”

Supongamos que $\overline{\mathcal{S}}\neq C(K)$. Entonces existe $f\in C(K)$ que no está en el cierre.
Por el teorema de separación de Hahn–Banach, existe un funcional lineal continuo **no nulo**

$$
L: C(K)\to\mathbb{R}
$$

tal que $L(g)=0$ para todo $g\in\overline{\mathcal{S}}$ pero $L(f)\neq 0$.

### Paso 2: representar el funcional con una medida con signo

Por el teorema de representación de Riesz, existe una medida de Borel regular finita con signo $\mu$ sobre $K$ tal que

$$
L(h) = \int_K h(x)\, d\mu(x) \quad \text{para todo } h\in C(K).
$$

Así, que “$L$ anula $\mathcal{S}$” equivale a

$$
\int_K \sigma(w\cdot x + b)\, d\mu(x) = 0
\quad \text{para todo } w\in\mathbb{R}^n,\ b\in\mathbb{R}.
$$

### Paso 3: concluir que $\mu=0$ (el lema clave)

Para activaciones adecuadas $\sigma$ (las sigmoides son el caso clásico), la familia de funciones tipo “cresta”
$\sigma(w\cdot x + b)$ es lo bastante rica como para determinar medidas:

> (**Propiedad discriminante**) Si una medida finita con signo $\mu$ satisface
> $\int_K \sigma(w\cdot x + b)\, d\mu(x)=0$ para todo $(w,b)$, entonces $\mu=0$.

Intuición: al aumentar la pendiente, las sigmoides pueden aproximar **indicadores de semiespacios**

$$
\mathbf{1}_{\{w\cdot x + b \ge 0\}},
$$

y los semiespacios generan suficientes conjuntos (vía argumentos estándar de unicidad de medidas) como para forzar que una medida con signo que integra a cero contra todos esos indicadores sea necesariamente la medida nula.

Con $\mu=0$, se obtiene $L(h)=\int h\,d\mu = 0$ para todo $h$, contradiciendo que $L$ era no nulo. Por tanto $\overline{\mathcal{S}} = C(K)$.

{{% notice style="info" title="Lo que sí (y lo que no) implica" %}}
UAT prueba **existencia** de un ancho $m$ para una precisión $\varepsilon$.
No da, en general, una cota útil de $m$, ni garantiza que el entrenamiento encuentre esos parámetros.
{{% /notice %}}

## Corolario (formulación de aproximación)

Para cualquier $f\in C(K)$ y cualquier $\varepsilon>0$, existen $m$ y parámetros $(a_j,w_j,b_j)_{j=1}^m$ tales que

$$
\sup_{x\in K}\left|f(x) - \sum_{j=1}^m a_j\,\sigma(w_j\cdot x + b_j)\right| < \varepsilon.
$$

## Referencias (fuentes fiables)

1. G. Cybenko. *[Approximation by superpositions of a sigmoidal function](https://doi.org/10.1007/BF02551274)*. **Mathematics of Control, Signals and Systems**, 2:303–314, 1989.
2. K. Hornik. *[Approximation capabilities of multilayer feedforward networks](https://doi.org/10.1016/0893-6080(91)90009-T)*. **Neural Networks**, 4(2):251–257, 1991.
3. M. Leshno, V. Y. Lin, A. Pinkus, S. Schocken. *[Multilayer feedforward networks with a nonpolynomial activation function can approximate any function](https://doi.org/10.1016/S0893-6080(05)80131-5)*. **Neural Networks**, 6(6):861–867, 1993.
4. A. Pinkus. *[Approximation theory of the MLP model in neural networks](https://doi.org/10.1017/S0962492900002919)*. **Acta Numerica**, 8:143–195, 1999.

