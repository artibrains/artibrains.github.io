---
title: "📚 K-NN y Árboles de Decisión"
description: "Fuentes verificadas para ampliar los conceptos de K-Nearest Neighbors y Decision Trees mostrados en las demostraciones interactivas."
weight: 101
draft: false
slug: "bibliografia-knn-arboles-decision"
---

Estas referencias refuerzan la narrativa del capítulo sobre **clasificadores interpretables**: cómo opera K-NN, cómo ajustar y explicar árboles de decisión y cómo se aplican en entornos clínicos con requisitos de transparencia.

---

## Índice

1. [Fundamentos de K-Nearest Neighbors](#1-fundamentos-de-k-nearest-neighbors)  
2. [Árboles de decisión](#2-árboles-de-decisión)  
3. [Métricas de distancia y normalización](#3-métricas-de-distancia-y-normalización)  
4. [Casos médicos y adopción](#4-casos-médicos-y-adopción)  
5. [Recursos adicionales](#5-recursos-adicionales)

---

## 1. Fundamentos de K-Nearest Neighbors

| Recurso | Tipo | Notas | Acceso |
|---------|------|-------|--------|
| [Nearest Neighbors — scikit-learn](https://scikit-learn.org/stable/modules/neighbors.html) | Documentación | Detalla `KNeighborsClassifier`, métricas soportadas y estructuras KD/Ball Tree. | [https://scikit-learn.org/stable/modules/neighbors.html](https://scikit-learn.org/stable/modules/neighbors.html)
| [Algoritmo de los k vecinos más próximos — Wikipedia](https://es.wikipedia.org/wiki/Algoritmo_de_los_k_vecinos_m%C3%A1s_pr%C3%B3ximos) | Artículo de referencia | Historia, formulación matemática y variantes ponderadas. | [https://es.wikipedia.org/wiki/Algoritmo_de_los_k_vecinos_m%C3%A1s_pr%C3%B3ximos](https://es.wikipedia.org/wiki/Algoritmo_de_los_k_vecinos_m%C3%A1s_pr%C3%B3ximos)
| [K-Nearest Neighbors — IBM Think](https://www.ibm.com/mx-es/topics/knn) | Artículo divulgativo | Resumen accesible de ventajas, limitaciones y preparación de datos. | [https://www.ibm.com/mx-es/topics/knn](https://www.ibm.com/mx-es/topics/knn)
| [Machine Learning Basics with K-NN](https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761) | Tutorial | Ejemplo paso a paso con visualizaciones de fronteras de decisión. | [https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761](https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761)
| Bishop, C. M. (2006). *Pattern Recognition and Machine Learning* | Libro | Capítulo 2 conecta K-NN con teoría bayesiana y soft decisions. | [https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)

---

## 2. Árboles de decisión

| Recurso | Tipo | Notas | Acceso |
|---------|------|-------|--------|
| [Decision Trees — scikit-learn](https://scikit-learn.org/stable/modules/tree.html) | Documentación | Explica CART, medidas de impureza, poda por complejidad y extracción de reglas. | [https://scikit-learn.org/stable/modules/tree.html](https://scikit-learn.org/stable/modules/tree.html)
| [Árbol de decisión — Wikipedia](https://es.wikipedia.org/wiki/%C3%81rbol_de_decisi%C3%B3n) | Artículo de referencia | Describe ID3, C4.5, CART y aplicaciones en diferentes dominios. | [https://es.wikipedia.org/wiki/%C3%81rbol_de_decisi%C3%B3n](https://es.wikipedia.org/wiki/%C3%81rbol_de_decisi%C3%B3n)
| [Decision Tree Algorithm Explained](https://www.analyticsvidhya.com/blog/2021/08/decision-tree-algorithm/) | Tutorial | Guía práctica con ejemplos, visualizaciones y consejos de hiperparámetros. | [https://www.analyticsvidhya.com/blog/2021/08/decision-tree-algorithm/](https://www.analyticsvidhya.com/blog/2021/08/decision-tree-algorithm/)
| [Decision Region Visualizer — MLxtend](http://rasbt.github.io/mlxtend/user_guide/plotting/plot_decision_regions/) | Herramienta | Utilidad en Python para graficar fronteras de decisión en 2D y 3D. | [http://rasbt.github.io/mlxtend/user_guide/plotting/plot_decision_regions/](http://rasbt.github.io/mlxtend/user_guide/plotting/plot_decision_regions/)
| Breiman, L., Friedman, J., Olshen, R. y Stone, C. (1984). *Classification and Regression Trees* | Monografía | Texto clásico que introduce el algoritmo CART, poda y validez estadística. | [https://doi.org/10.1201/9781315139470](https://doi.org/10.1201/9781315139470)

---

## 3. Métricas de distancia y normalización

| Recurso | Foco | Acceso |
|---------|------|--------|
| [Métricas de distancia — scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise_distances.html) | Catálogo de métricas (Euclidiana, Manhattan, Mahalanobis, coseno) con ejemplos. | [https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise_distances.html](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise_distances.html)
| [Normalización de características — scikit-learn](https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler) | Resumen de `StandardScaler`, `MinMaxScaler` y pipelines para preprocesado consistente. | [https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler](https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler)
| [The Curse of Dimensionality — StatQuest](https://www.youtube.com/watch?v=mDaxrKL2iWw) | Video que explica por qué la alta dimensionalidad degrada el rendimiento de K-NN. | [https://www.youtube.com/watch?v=mDaxrKL2iWw](https://www.youtube.com/watch?v=mDaxrKL2iWw)
| [Reducción de la dimensión — Wikipedia](https://es.wikipedia.org/wiki/Reducci%C3%B3n_de_la_dimensi%C3%B3n) | Panorama de PCA, ICA y métodos de reducción previos a aplicar K-NN. | [https://es.wikipedia.org/wiki/Reducci%C3%B3n_de_la_dimensi%C3%B3n](https://es.wikipedia.org/wiki/Reducci%C3%B3n_de_la_dimensi%C3%B3n)

---

## 4. Casos médicos y adopción

| Recurso | Destacado | Acceso |
|---------|-----------|--------|
| [K-NN for cancer classification](https://link.springer.com/article/10.1007/s10916-012-9833-7) | Clasificación de tumores benignos/malignos con K-NN sobre el Wisconsin Breast Cancer Dataset. | [https://link.springer.com/article/10.1007/s10916-012-9833-7](https://link.springer.com/article/10.1007/s10916-012-9833-7)
| [Decision trees in medical diagnosis](https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/1472-6947-9-11) | Ventajas de los árboles para explicar decisiones en protocolos clínicos. | [https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/1472-6947-9-11](https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/1472-6947-9-11)
| [Clinical decision support systems — OMS](https://www.who.int/publications/i/item/clinical-decision-support-systems-for-family-planning) | Guía de la OMS sobre sistemas basados en reglas comparables a árboles de decisión. | [https://www.who.int/publications/i/item/clinical-decision-support-systems-for-family-planning](https://www.who.int/publications/i/item/clinical-decision-support-systems-for-family-planning)
| [Machine Learning for Healthcare — MIT OCW](https://ocw.mit.edu/courses/hst-953j-machine-learning-for-healthcare-spring-2019/) | Curso de posgrado con aplicaciones de K-NN y árboles en datos clínicos. | [https://ocw.mit.edu/courses/hst-953j-machine-learning-for-healthcare-spring-2019/](https://ocw.mit.edu/courses/hst-953j-machine-learning-for-healthcare-spring-2019/)

---

## 5. Recursos adicionales

| Recurso | Enfoque | Acceso |
|---------|---------|--------|
| [Ejemplos de clasificación — scikit-learn](https://scikit-learn.org/stable/auto_examples/index.html#classification) | Galería de notebooks que comparan K-NN, árboles y métricas de evaluación. | [https://scikit-learn.org/stable/auto_examples/index.html#classification](https://scikit-learn.org/stable/auto_examples/index.html#classification)
| [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course) | Módulos interactivos sobre clasificación supervisada y buenas prácticas. | [https://developers.google.com/machine-learning/crash-course](https://developers.google.com/machine-learning/crash-course)
| Hastie, T., Tibshirani, R. y Friedman, J. (2009). *The Elements of Statistical Learning* | Capítulos 13–14 profundizan en métodos basados en vecinos y árboles con ejemplos médicos. | [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)

---

**Nota**: Todos los enlaces se verificaron en octubre de 2025. Para materiales de acceso restringido, utiliza bibliotecas institucionales o repositorios abiertos.
