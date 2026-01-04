---
title: "📚 Umbrales de clasificación, validación y regularización"
description: "Referencias clave para las demostraciones El Gestor de Riesgos, El Validador Honesto y El Domador de la Complejidad."
weight: 102
draft: false
slug: "bibliografia-evaluacion-clasificacion"
---

Estas referencias profundizan los pilares del capítulo: cómo ajustar umbrales de decisión, evaluar modelos con validación honesta y controlar la complejidad para mantener interpretabilidad en entornos clínicos.

---

## Índice

1. [Métricas de evaluación y umbrales](#1-métricas-de-evaluación-y-umbrales)  
2. [Validación cruzada y remuestreo](#2-validación-cruzada-y-remuestreo)  
3. [Regularización y control de complejidad](#3-regularización-y-control-de-complejidad)  
4. [Casos de estudio en salud](#4-casos-de-estudio-en-salud)

---

## 1. Métricas de evaluación y umbrales

| Recurso | Enfoque | Acceso |
|---------|---------|--------|
| [Umbrales y matriz de confusión](https://developers.google.com/machine-learning/crash-course/classification/thresholding?hl=es) | Simulador interactivo que muestra cómo cambian VP/VN/FP/FN al mover el umbral. | [https://developers.google.com/machine-learning/crash-course/classification/thresholding?hl=es](https://developers.google.com/machine-learning/crash-course/classification/thresholding?hl=es)
| [Exactitud, recuperación y precisión](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall?hl=es) | Revisión de métricas básicas y su interpretación en el Gestor de Riesgos. | [https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall?hl=es](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall?hl=es)
| [ROC y AUC](https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc?hl=es) | Explica curvas ROC/AUC y su rol en escenarios desbalanceados. | [https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc?hl=es](https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc?hl=es)
| [Guía de evaluación de modelos — scikit-learn](https://scikit-learn.org/stable/modules/model_evaluation.html) | Referencia completa sobre matrices de confusión, curvas ROC y calibración. | [https://scikit-learn.org/stable/modules/model_evaluation.html](https://scikit-learn.org/stable/modules/model_evaluation.html)

---

## 2. Validación cruzada y remuestreo

| Recurso | Aporte | Acceso |
|---------|--------|--------|
| [Validación cruzada — Wikipedia](https://es.wikipedia.org/wiki/Validaci%C3%B3n_cruzada_(estad%C3%ADstica)) | Panorama general de K-Fold, leave-one-out y antecedentes históricos. | [https://es.wikipedia.org/wiki/Validaci%C3%B3n_cruzada_(estad%C3%ADstica)](https://es.wikipedia.org/wiki/Validaci%C3%B3n_cruzada_(estad%C3%ADstica))
| [Validación cruzada en scikit-learn](https://scikit-learn.org/stable/modules/cross_validation.html) | Describe `KFold`, `StratifiedKFold`, `LeaveOneOut` y validación anidada con ejemplos en Python. | [https://scikit-learn.org/stable/modules/cross_validation.html](https://scikit-learn.org/stable/modules/cross_validation.html)
| Stone, M. (1974). *Cross-Validatory Choice and Assessment of Statistical Predictions.* | Artículo seminal que formaliza la validación cruzada moderna. | [https://projecteuclid.org/journals/journal-of-the-royal-statistical-society-series-b/volume-36/issue-2/Cross-Validatory-Choice-and-Assessment-of-Statistical-Predictions/10.1111/j.2517-6161.1974.tb00994.x.full](https://projecteuclid.org/journals/journal-of-the-royal-statistical-society-series-b/volume-36/issue-2/Cross-Validatory-Choice-and-Assessment-of-Statistical-Predictions/10.1111/j.2517-6161.1974.tb00994.x.full)
| Arlot, S. y Celisse, A. (2010). *A Survey of Cross-Validation Procedures for Model Selection.* | Revisión exhaustiva con recomendaciones según el tamaño y el sesgo del conjunto de datos. | [https://arxiv.org/abs/0907.3838](https://arxiv.org/abs/0907.3838)

---

## 3. Regularización y control de complejidad

| Recurso | Clave | Acceso |
|---------|-------|--------|
| [Regularización — Wikipedia](https://es.wikipedia.org/wiki/Regularizaci%C3%B3n_(estad%C3%ADstica)) | Introducción en castellano a L1, L2 y penalizaciones para modelos lineales. | [https://es.wikipedia.org/wiki/Regularizaci%C3%B3n_(estad%C3%ADstica)](https://es.wikipedia.org/wiki/Regularizaci%C3%B3n_(estad%C3%ADstica))
| [Regresión logística en scikit-learn](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) | Explica el hiperparámetro `C`, los solvers soportados y penalizaciones mixtas. | [https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression)
| Hastie, T., Tibshirani, R. y Wainwright, M. (2015). *Statistical Learning with Sparsity.* | Manual avanzado sobre lasso, ridge y elastic net en alta dimensión. | [https://web.stanford.edu/~hastie/StatLearnSparsity/](https://web.stanford.edu/~hastie/StatLearnSparsity/)
| Ng, A. (2004). *Feature Selection, L1 vs. L2 Regularization and Rotational Invariance.* | Comparativa teórica y práctica entre penalizaciones L1 y L2. | [https://cs229.stanford.edu/notes2020spring/cs229-notes3.pdf](https://cs229.stanford.edu/notes2020spring/cs229-notes3.pdf)

---

## 4. Casos de estudio en salud

| Recurso | Relación con el capítulo | Acceso |
|---------|--------------------------|--------|
| Rajkomar, A. et al. (2018). *Scalable and Accurate Deep Learning with Electronic Health Records.* | Incluye regresión logística como línea base y evaluación con métricas clínicas. | [https://www.nature.com/articles/s41746-018-0029-1](https://www.nature.com/articles/s41746-018-0029-1)
| Powers, D. (2011). *Evaluation: From Precision, Recall and F-Measure to ROC, Informedness & Markedness.* | Explica métricas avanzadas (MCC, Informedness) útiles en cribados médicos. | [https://arxiv.org/abs/2010.16061](https://arxiv.org/abs/2010.16061)
| Chicco, D. y Jurman, G. (2020). *The Advantages of the Matthews Correlation Coefficient.* | Muestra por qué MCC es robusta frente a clases desbalanceadas. | [https://www.nature.com/articles/s41598-020-76158-9](https://www.nature.com/articles/s41598-020-76158-9)
| Saito, T. y Rehmsmeier, M. (2015). *The Precision-Recall Plot Is More Informative than the ROC Plot.* | Justifica el uso de curvas precisión-recall en escenarios con pocas incidencias. | [https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0118432](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0118432)

---

**Nota**: Todos los enlaces se verificaron en octubre de 2025. Para materiales de acceso restringido, utiliza bibliotecas institucionales o repositorios abiertos.
