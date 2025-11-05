---
title: "📐 Tokenización y geometría de embeddings"
description: "Explica Byte-Pair Encoding, la estructura del espacio de embeddings y cómo las fusiones moldean los modelos clínicos."
weight: 90
draft: false
slug: "tokenizacion-geometria-embeddings"
math: true
---

## Contexto

El Capítulo 7 muestra cómo las narrativas de Minermont se vuelven legibles para los modelos de lenguaje. Las matemáticas detrás de Byte-Pair Encoding (BPE) y los espacios de embeddings sustentan el simulador de tokenizador y el proyector interactivo del capítulo.

## Recordatorio de BPE

Se parte de un vocabulario de caracteres más el símbolo final `</w>`, dividiendo cada palabra en símbolos (por ejemplo, `corazón → c o r a z ó n </w>`). En cada iteración se fusiona el par adyacente más frecuente

$$
ab = \operatorname*{arg\,max}_{(a,b)} \mathrm{freq}(a,b),
$$

se reemplazan todas las apariciones de `a b` por `ab` y el nuevo símbolo se incorpora al vocabulario. Las implementaciones eficientes actualizan únicamente los conteos alrededor del par fusionado, logrando complejidad casi lineal.

## Ejemplo trabajado

En el corpus `{ "corazón", "corazonada", "corazón", "cora" }`, primero se fusiona `("c","o")` para formar `"co"`, luego `("co","r")` para obtener `"cor"`, y así hasta crear tokens como `"corazón"` o `"cor"`, replicando cómo el demo captura prefijos y abreviaturas médicas.

## Geometría del embedding

Una vez definidos los tokens, cada uno recibe un vector $v_t \in \mathbb{R}^d$ aprendido durante el entrenamiento.

- *Similitud coseno* mide la alineación semántica:

  $$
  \cos(\theta_{ij}) = \frac{v_i \cdot v_j}{\lVert v_i \rVert \lVert v_j \rVert},
  
$$

  de modo que ángulos cercanos a cero indican conceptos relacionados (por ejemplo, `cardiología` y `cardiólogo`).
- *Estructura lineal* captura analogías, como

  $$
  v_{"doctor"} - v_{"hombre"} + v_{"mujer"} \approx v_{"doctora"},
  
$$

  porque el entrenamiento incentiva diferencias vectoriales consistentes.
- *Centrado y PCA.* Con la matriz de embeddings $E \in \mathbb{R}^{|\mathcal{V}| \times d}$, céntrala mediante

  $$
  \tilde{E} = \left(I - \tfrac{1}{|\mathcal{V}|} \mathbf{1}\mathbf{1}^\top\right)E
  
$$

  y proyecta sobre componentes principales de $\tilde{E}^\top \tilde{E}$ para revelar clústeres (por ejemplo, términos cardiovasculares frente a respiratorios).

## Relación tokenizador ↔ embedding

Fusiones que respetan fronteras morfológicas (`cardio-`, `neuro-`) generan subpalabras coherentes y mejor desempeño en abreviaturas médicas como `ECG`. Fusiones excesivas mezclan morfemas inconexos, degradando la alineación coseno en subdominios clínicos.

{{% notice style="info" title="Implicación práctica" %}}
El ajuste fino en textos clínicos suele adaptar el tokenizador para que símbolos multicaracter frecuentes (por ejemplo, `HbA1c`) se conviertan en tokens únicos, estabilizando sus embeddings.{{% /notice %}}

## Referencias

1. R. Sennrich, B. Haddow, A. Birch. *Neural Machine Translation of Rare Words with Subword Units*. ACL, 2016.
2. T. Mikolov et al. *Efficient Estimation of Word Representations in Vector Space*. ICLR, 2013.
3. Y. Goldberg. *Neural Network Methods for Natural Language Processing*. Morgan & Claypool, 2017. Capítulos 4–5.
4. J. Devlin et al. *BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding*. NAACL, 2019.
