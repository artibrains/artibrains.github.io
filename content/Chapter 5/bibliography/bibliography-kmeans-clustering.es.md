---
title: "📚 Bibliografía: K-Means y Clustering"
description: "Recursos y referencias sobre algoritmos de clustering K-Means y aprendizaje no supervisado"
weight: 101
draft: false
slug: "bibliografia-kmeans-clustering"
---

Estas referencias expanden la narrativa de la demostración **K-Means Cluster Explorer** al reunir material teórico, guías de implementación, heurísticas para elegir el número de clústeres y casos reales de analítica en salud.

---

## Índice

1. [Fundamentos del algoritmo](#1-fundamentos-del-algoritmo)  
2. [Guías prácticas y herramientas](#2-guías-prácticas-y-herramientas)  
3. [Cómo elegir el número de clústeres](#3-cómo-elegir-el-número-de-clústeres)  
4. [Aplicaciones en salud](#4-aplicaciones-en-salud)

---

## 1. Fundamentos del algoritmo

| Recurso | Tipo | Notas | Acceso |
|---------|------|-------|--------|
| [scikit-learn: Clustering](https://scikit-learn.org/stable/modules/clustering.html) | Guía técnica | Describe variantes de K-Means, inicialización de centroides y criterios de convergencia. | [https://scikit-learn.org/stable/modules/clustering.html](https://scikit-learn.org/stable/modules/clustering.html)
| [Wikipedia: K-Means](https://es.wikipedia.org/wiki/K-means) | Artículo enciclopédico | Cobertura histórica, formulación clásica y conexiones con Lloyd/Forgy. | [https://es.wikipedia.org/wiki/K-means](https://es.wikipedia.org/wiki/K-means)
| Bishop, C. M. (2006). *Pattern Recognition and Machine Learning* | Libro | El capítulo 9 traza el vínculo con Expectation-Maximization. | [https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)
| Hastie, T., Tibshirani, R. y Friedman, J. (2009). *The Elements of Statistical Learning* | Libro | La sección 14.3 compara K-Means con métodos basados en modelos probabilísticos. | [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/)

---

## 2. Guías prácticas y herramientas

| Recurso | Enfoque | Idioma |
|---------|---------|--------|
| [Google ML Crash Course: Clustering](https://developers.google.com/machine-learning/clustering?hl=es) | Ejercicios interactivos alineados con el flujo del capítulo. | 🇪🇸 Español |
| [Stanford CS229: Unsupervised Learning](http://cs229.stanford.edu/notes2021fall/cs229-notes7a.pdf) | Derivaciones y pseudocódigo para implementar K-Means. | 🇬🇧 Inglés (en inglés) |
| [Comparativa de algoritmos de clustering — scikit-learn](https://scikit-learn.org/stable/auto_examples/cluster/plot_cluster_comparison.html) | Notebook que contrasta K-Means con métodos jerárquicos y espectrales. | 🇬🇧 Inglés (en inglés) |

---

## 3. Cómo elegir el número de clústeres

| Recurso | Por qué importa | Acceso |
|---------|-----------------|--------|
| [scikit-learn: Selección del número de clústeres](https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html) | Presenta el análisis de silueta, la heurística clave del demo. | [https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html](https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html)
| [Determinación del número de clústeres](https://es.wikipedia.org/wiki/Determinaci%C3%B3n_del_n%C3%BAmero_de_grupos_en_un_conjunto_de_datos) | Compendio del método del codo, gap statistic y criterios de información. | [https://es.wikipedia.org/wiki/Determinaci%C3%B3n_del_n%C3%BAmero_de_grupos_en_un_conjunto_de_datos](https://es.wikipedia.org/wiki/Determinaci%C3%B3n_del_n%C3%BAmero_de_grupos_en_un_conjunto_de_datos)
| [Elbow Method for optimal value of k](https://www.geeksforgeeks.org/elbow-method-for-optimal-value-of-k-in-kmeans/) | Tutorial paso a paso para graficar la curva de inercia en Python. | [https://www.geeksforgeeks.org/elbow-method-for-optimal-value-of-k-in-kmeans/](https://www.geeksforgeeks.org/elbow-method-for-optimal-value-of-k-in-kmeans/)

---

## 4. Aplicaciones en salud

| Recurso | Destacado | Idioma |
|---------|-----------|--------|
| [NIH: Machine Learning in Cancer Research](https://www.cancer.gov/research/areas/diagnosis/artificial-intelligence) | Resume cómo el clustering apoya diagnóstico y planificación oncológica. | 🇬🇧 Inglés (en inglés) |
| [Nature: Clustering for patient stratification](https://www.nature.com/articles/s41598-019-55840-z) | Caso de estratificación de pacientes mediante pipelines no supervisados. | 🇬🇧 Inglés (en inglés) |
| [PubMed: K-means clustering in medical diagnosis](https://pubmed.ncbi.nlm.nih.gov/30906153/) | Revisión de literatura sobre soporte clínico basado en K-Means. | 🇬🇧 Inglés (en inglés) |
| [OMS: Herramientas de análisis de datos en salud](https://www.who.int/data/data-collection-tools) | Catálogo multilingüe de plataformas analíticas para salud pública. | 🌐 Multilingüe |

---

**Nota**: Todos los enlaces fueron verificados en abril de 2024. Para materiales con licencia, recurre a bibliotecas institucionales o repositorios de acceso abierto.
