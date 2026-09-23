---
title: "⚡ Naive Bayes para el triaje de urgencias"
weight: 86
description: "Demostración interactiva: el clasificador Naive Bayes a mano y con scikit-learn, siguiendo las notas de Marta."
date:
draft: false
slug: "naive-bayes-triaje-urgencias"
---

En el capítulo 4, el equipo de Minermont quiere un sistema que sugiera el nivel de urgencia de cada paciente de urgencias, del 1 (rojo) al 5 (azul), siempre como apoyo a la enfermera de triaje. Este notebook sigue las notas de Marta (sección 4.5) sobre el clasificador Naive Bayes: lo implementa a mano, lo compara con scikit-learn y muestra dónde ayuda y dónde perjudica su suposición ingenua.

El notebook interactivo incluye:

- El teorema de Bayes, la probabilidad a priori, la verosimilitud y la suposición ingenua de independencia.
- Una predicción calculada a mano a partir de dos síntomas.
- Naive Bayes gaussiano a mano, con logaritmos, y por qué una campana falla con los síntomas de sí o no.
- Naive Bayes contando frecuencias, con los signos vitales cortados en intervalos y suavizado de Laplace, comprobado frente a `CategoricalNB`.
- Qué pasa cuando la misma prueba se cuenta varias veces: un modelo demasiado seguro.
- Evaluación final con la matriz de confusión y las métricas por clase.

{{< isolate name="42ClasificadorNaiveBayes" params=`lang="es"` width="100%" height="720" title="Naive Bayes para el triaje de urgencias (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/19bONV9kxQUT2efz4cmHhXzBdgYhF_EVu)

### Bibliografía

- **Domingos, P. y Pazzani, M. (1997). On the optimality of the simple Bayesian classifier under zero-one loss.** *Machine Learning*, 29, 103–130. Por qué Naive Bayes puede clasificar bien aunque su suposición de independencia sea falsa. [https://doi.org/10.1023/A:1007413511361](https://doi.org/10.1023/A:1007413511361) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Naive Bayes**: las variantes gaussiana, multinomial, de Bernoulli y categórica. [https://scikit-learn.org/stable/modules/naive_bayes.html](https://scikit-learn.org/stable/modules/naive_bayes.html) 🇬🇧 (en inglés)
- **Manning, C. D., Raghavan, P. y Schütze, H. – Introduction to Information Retrieval, capítulo 13**: clasificación de textos con Naive Bayes, logaritmos y suavizado de Laplace. [https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html](https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html) 🇬🇧 (en inglés)
