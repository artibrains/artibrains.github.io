---
title: "📚 Regresión logística y traductores de probabilidad"
description: "Fuentes verificadas para ampliar los conceptos mostrados en la demostración El Traductor de Probabilidades."
weight: 101
draft: false
slug: "bibliografia-regresion-logistica"
---

Estas referencias apuntalan la narrativa de **El Traductor de Probabilidades**: cubren la teoría sigmoidal, guías de implementación, material sobre umbrales de decisión y aplicaciones clínicas que justifican el caso del hospital.

---

## Índice

1. [Fundamentos teóricos](#fundamentos-teóricos)  
2. [Guías prácticas y herramientas](#guías-prácticas-y-herramientas)  
3. [Umbrales de decisión y métricas](#umbrales-de-decisión-y-métricas)  
4. [Interpretabilidad y contexto clínico](#interpretabilidad-y-contexto-clínico)

---

## 1. Fundamentos teóricos

| Recurso | Tipo | Idioma | Acceso |
|---------|------|--------|--------|
| [Regresión logística — Google ML Crash Course](https://developers.google.com/machine-learning/crash-course/logistic-regression?hl=es) | Módulo interactivo | 🇪🇸 Español | Introducción, función sigmoidal, pérdida logística y regularización. |
| [¿Qué es la regresión logística? — IBM Think](https://www.ibm.com/mx-es/topics/logistic-regression) | Artículo divulgativo | 🇪🇸 Español | Interpretación de odds ratio, diferencias con regresión lineal y sobreajuste. |
| [Regresión logística — Wikipedia](https://es.wikipedia.org/wiki/Regresi%C3%B3n_log%C3%ADstica) | Artículo enciclopédico | 🇪🇸 Español | Historia, formulación matemática y variantes multinomial/ordinal. |
| *An Introduction to Statistical Learning* | Libro | 🇬🇧 Inglés (en inglés) | Capítulo 4 desarrolla regresión logística con ejemplos clínicos. [https://www.statlearning.com/](https://www.statlearning.com/) |
| *The Elements of Statistical Learning* | Libro | 🇬🇧 Inglés (en inglés) | Referencia avanzada sobre modelos lineales generalizados y regularización. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) |

---

## 2. Guías prácticas y herramientas

| Recurso | Enfoque | Idioma |
|---------|---------|--------|
| [Documentación de Scikit-learn — LogisticRegression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) | Parámetros clave (`C`, `solver`, `penalty`) y ejemplos de uso. | 🇬🇧 Inglés (en inglés) |
| [Statsmodels — Modelo Logit](https://www.statsmodels.org/stable/glm.html#logit) | Implementación estadística con intervalos de confianza y pruebas de significancia. | 🇬🇧 Inglés (en inglés) |
| [Curso intensivo de Google — Clasificación con Python](https://developers.google.com/machine-learning/crash-course/classification/download-table?hl=es) | Notebook descargable que entrena y evalúa regresión logística. | 🇪🇸 Español |
| [Hands-On Machine Learning con Scikit-Learn, Keras y TensorFlow](https://www.amazon.es/Aprende-Machine-Learning-Scikit-Learn-TensorFlow/dp/8441548048) | Libro práctico que cubre logística, regularización y pipelines. | 🇪🇸 Español |

---

## 3. Umbrales de decisión y métricas

| Recurso | Por qué es relevante | Idioma |
|---------|----------------------|--------|
| [Umbrales y matriz de confusión](https://developers.google.com/machine-learning/crash-course/classification/thresholding?hl=es) | Visualiza cómo cambiar el umbral modifica VP/FP, igual que en El Gestor de Riesgos. | 🇪🇸 Español |
| [Exactitud, recuperación y precisión](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall?hl=es) | Explica métricas posteriores al ajuste del umbral, usadas en el capítulo. | 🇪🇸 Español |
| [ROC y AUC](https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc?hl=es) | Relaciona la curva ROC con la evaluación de riesgo clínico. | 🇪🇸 Español |
| [Guía de evaluación de modelos — scikit-learn](https://scikit-learn.org/stable/modules/model_evaluation.html) | Profundiza en curvas ROC, precisión-recall y calibración. | 🇬🇧 Inglés (en inglés) |

---

## 4. Interpretabilidad y contexto clínico

| Recurso | Aporte | Idioma |
|---------|--------|--------|
| [Organización Mundial de la Salud — Modelos de predicción de riesgo cardiovascular](https://www.who.int/publications/i/item/9789241506077) | Ejemplo real de modelos logísticos empleados en salud pública. | 🇬🇧 Inglés (en inglés) |
| [Nature Digital Medicine — Predicting Hospital Readmissions](https://www.nature.com/articles/s41746-018-0026-4) | Caso de estudio que ilustra la utilidad clínica de la logística con datos hospitalarios. | 🇬🇧 Inglés (en inglés) |
| [Journal of Biomedical Informatics — Logistic regression in EHR-based prediction](https://www.sciencedirect.com/science/article/pii/S1532046416301459) | Análisis de regresión logística en registros médicos electrónicos. | 🇬🇧 Inglés (en inglés) |

---

**Nota**: Todos los enlaces se verificaron en octubre de 2025. Para materiales de acceso restringido, recurre a bibliotecas institucionales o repositorios abiertos.
