---
title: "6.X Aprendiendo por Retropropagación de Errores"
description: "El artículo de 1986 de Rumelhart, Hinton y Williams que popularizó el algoritmo de retropropagación para entrenar redes neuronales."
weight: 15
date: 2025-01-23
slug: "backpropagation-paper"
---

# Aprendiendo por Retropropagación de Errores: Rumelhart, Hinton y Williams (1986)

En 1986, **David Rumelhart**, **Geoffrey Hinton** y **Ronald Williams** publicaron un artículo seminal que revolucionaría el campo de las redes neuronales. Su trabajo, titulado **"Learning representations by back-propagating errors"** (Aprendiendo representaciones mediante la retropropagación de errores), reintrodujo y popularizó el algoritmo de retropropagación, proporcionando un método práctico para entrenar redes neuronales multicapa.

## Contexto Histórico

A mediados de la década de 1980, las redes neuronales enfrentaban un desafío significativo conocido como el "invierno de la IA". Las limitaciones de los perceptrones de una sola capa, famosamente destacadas por Minsky y Papert en 1969, habían enfriado el entusiasmo por la investigación en redes neuronales. Aunque las ideas centrales de la retropropagación habían sido descubiertas independientemente antes por varios investigadores (incluyendo a Paul Werbos en 1974), fue este artículo de 1986 en Nature el que llevó el algoritmo a la atención generalizada y demostró su poder práctico.

## El Algoritmo de Retropropagación

El algoritmo introdujo una forma sistemática de entrenar redes neuronales multicapa:
- **Pase hacia adelante**: Los datos de entrada fluyen a través de la red, generando predicciones
- **Cálculo del error**: Se calcula la diferencia entre las predicciones y los valores reales
- **Pase hacia atrás**: Los errores se propagan hacia atrás a través de la red utilizando la regla de la cadena del cálculo
- **Actualización de pesos**: El peso de cada conexión se ajusta proporcionalmente a su contribución al error

Esta elegante solución al problema de asignación de crédito—determinar cuánto contribuyó cada neurona al error final—permitió que las redes aprendieran representaciones complejas y jerárquicas de los datos.

## Impacto y Legado

La publicación de este artículo marcó un punto de inflexión en la inteligencia artificial. Demostró que las redes neuronales podían aprender representaciones internas y resolver problemas que antes parecían intratables. Este trabajo permitió directamente:
- El desarrollo del aprendizaje profundo en la década de 2000
- Las redes neuronales convolucionales modernas (CNNs)
- Las redes recurrentes y los transformers
- Prácticamente todas las arquitecturas de redes neuronales contemporáneas

Geoffrey Hinton posteriormente recibiría el Premio Nobel de Física 2024 (junto con John Hopfield) por descubrimientos fundamentales que permitieron el aprendizaje automático con redes neuronales artificiales, siendo la retropropagación central en esa contribución.

## Artículo Original

El artículo fue publicado en Nature, una de las revistas científicas más prestigiosas del mundo, haciéndolo accesible a una amplia audiencia científica y amplificando su impacto.

## Referencias

- Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). "Learning representations by back-propagating errors". *Nature*, 323(6088), 533-536.
- [Artículo Original - Enlace DOI](https://doi.org/10.1038/323533a0)
- [Versión PDF - MIT](http://www.cs.toronto.edu/~hinton/absps/naturebp.pdf)

## Trabajo Relacionado

Para trabajos anteriores sobre retropropagación, ver:
- Werbos, P. J. (1974). "Beyond Regression: New Tools for Prediction and Analysis in the Behavioral Sciences". Tesis Doctoral, Universidad de Harvard.
