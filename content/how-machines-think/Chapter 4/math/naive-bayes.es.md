---
title: "📐 Fundamentos de Naive Bayes"
description: "Deriva el clasificador Naive Bayes, las estrategias de suavizado y los vínculos de interpretabilidad para flujos de clasificación prácticos."
weight: 91
draft: false
slug: "fundamentos-naive-bayes"
math: true
---

## Contexto

El énfasis de Alma en la transparencia lleva al equipo de Minermont a retomar Naive Bayes. Su simplicidad proviene de suponer independencia condicional y aplicar un suavizado pragmático, lo que mantiene estables las probabilidades aun cuando los datos son escasos.

## De la regla de Bayes a un clasificador

Para clases $y \in \{1, \dots, K\}$ y vector de características $x = (x_1, \dots, x_d)$, el teorema de Bayes da

$$
P(y \mid x) = \frac{P(y) P(x \mid y)}{P(x)}.
$$

Como $P(x)$ es constante entre clases, el clasificador que maximiza el posterior es

$$
\hat{y}(x) = \arg\max_y P(y) P(x \mid y),
$$

lo que reduce la tarea a modelar $P(x \mid y)$.

## Suposición de independencia ingenua

Naive Bayes factoriza la verosimilitud como

$$
P(x \mid y) = \prod_{j=1}^d P(x_j \mid y).
$$

Aunque rara vez es exacta, la aproximación funciona cuando las dependencias afectan de forma similar a cada clase o cuando las características se diseñan para ser débilmente correlacionadas.

## Estimación de parámetros

Para características categóricas, los estimadores de máxima verosimilitud son

$$
\widehat{P}(y = k) = \frac{N_k}{N}, \qquad
\widehat{P}(x_j = v \mid y = k) = \frac{N_{jk}(v)}{N_k},
$$

donde $N_k$ es el número de ejemplos de entrenamiento en la clase $k$ y $N_{jk}(v)$ la cuenta con la característica $x_j = v$. Las variantes continuas usan supuestos gaussianos o densidades con kernels, pero aquí trabajamos con señales discretizadas, por lo que el caso categórico es suficiente.

## Suavizado de Laplace

Los conteos cero anulan el producto, así que el suavizado de Laplace (add-one) añade pseudocuentas:

$$
\widehat{P}_\alpha(x_j = v \mid y = k) = \frac{N_{jk}(v) + \alpha}{N_k + \alpha |\mathcal{V}_j|},
$$

donde $|\mathcal{V}_j|$ es la cantidad de valores posibles de la característica $j$. Con $\alpha = 1$ obtenemos el suavizado clásico de Laplace; valores menores implementan prioridades de Lidstone.

## Implementación en espacio logarítmico

Para evitar underflow numérico, trabaja con log-probabilidades:

$$
\log P(y \mid x) \propto \log P(y) + \sum_{j=1}^d \log P(x_j \mid y).
$$

Durante la predicción, puntúa cada clase en espacio logarítmico y elige la mayor.

## Ejemplo trabajado

Para las categorías de enrutamiento `Facturación`, `Soporte técnico`, `Cuenta`, supón que la característica `TienePalabraFactura` toma valores {`Sí`, `No`} con los conteos:

- `Facturación`: 35 `Sí`, 15 `No`
- `Soporte técnico`: 5 `Sí`, 45 `No`
- `Cuenta`: 2 `Sí`, 48 `No`

Con $\alpha = 1$ y $|\mathcal{V}_{TienePalabraFactura}| = 2$:

$$
\widehat{P}(\text{Dolor=Sí} \mid \text{Cardiología}) = \frac{35 + 1}{50 + 2} = 0.69, \\
\widehat{P}(\text{TienePalabraFactura=Sí} \mid \text{Facturación}) = \frac{35 + 1}{50 + 2} = 0.69, \\
\widehat{P}(\text{TienePalabraFactura=Sí} \mid \text{Soporte\ técnico}) = \frac{5 + 1}{50 + 2} = 0.12.
$$

Así, `TienePalabraFactura=Sí` incrementa con fuerza el posterior de Facturación, mientras que el suavizado evita probabilidades nulas en el resto de las clases.

## Fortalezas y limitaciones

- Pros: entrenamiento en forma cerrada, inferencia rápida, resiliente con pocos datos, interpretabilidad por característica.
- Contras: la suposición de independencia falla con características fuertemente correlacionadas; la calibración puede requerir Platt scaling o regresión isotónica.

## Vínculo narrativo

Los equipos pueden inspeccionar las verosimilitudes por característica para justificar predicciones, en línea con la insistencia de Alma en la transparencia. El término de suavizado recuerda la importancia de no descartar señales raras por falta de datos.

## Referencias

1. H. Zhang. *The Optimality of Naive Bayes*. FLAIRS Conference, 2004.
2. T. Mitchell. *Machine Learning*. McGraw-Hill, 1997. Capítulo 6.
3. D. J. C. MacKay. *Information Theory, Inference, and Learning Algorithms*. Cambridge University Press, 2003. Sección 4.3.
4. C. M. Bishop. *Pattern Recognition and Machine Learning*. Springer, 2006. Sección 1.6.
