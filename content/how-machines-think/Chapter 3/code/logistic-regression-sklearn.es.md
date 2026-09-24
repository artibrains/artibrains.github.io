---
title: "⚡ Regresión logística con sklearn"
weight: 82
description: "Demostración interactiva: regresión logística con scikit-learn, regularización y validación cruzada de k grupos."
date:
draft: false
slug: "regresion-logistica-sklearn"
---

Estas son las notas de Luis sobre cómo resolver el problema de las ausencias con scikit-learn, y sobre las dos herramientas del capítulo sin las que un proyecto real no puede funcionar: la regularización y la validación cruzada de k grupos.

El notebook interactivo incluye:

- Un `Pipeline` que encadena `StandardScaler` y `LogisticRegression`, para que el conjunto de prueba nunca se filtre en el entrenamiento.
- Evaluación con la matriz de confusión, el informe de clasificación y la curva ROC con su AUC.
- Un caso reproducible de sobreajuste: pocos pacientes y muchas variables irrelevantes.
- Regularización L2 y L1, y la relación entre la `C` de scikit-learn y el $\lambda$ del libro.
- Elección de $\lambda$ con validación cruzada estratificada de 5 grupos sobre la rejilla logarítmica del libro, y evaluación final en un conjunto de prueba intacto.
- Elastic Net con variables correlacionadas: las dos penalizaciones juntas, cómo reparte L1 un grupo de columnas correlacionadas y lo estable que es su elección en muestras bootstrap.
- Clases desbalanceadas: mover el umbral frente a `class_weight='balanced'`.

{{< isolate name="35RegresionLogisticaSklearn" params=`lang="es"` width="100%" height="720" title="Regresión logística con sklearn (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1fioiN9F_NhV6niZl4msgwkqQolMG1vAZ)

### Bibliografía

- **Referencia de scikit-learn – `LogisticRegression`**: Parámetros (`C`, `penalty`, `solver`, `class_weight`) y atributos del estimador. [https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html) 🇬🇧 (en inglés)
- **scikit-learn – Validación cruzada**: k grupos, grupos estratificados y por qué hay que reservar el conjunto de prueba. [https://scikit-learn.org/stable/modules/cross_validation.html](https://scikit-learn.org/stable/modules/cross_validation.html) 🇬🇧 (en inglés)
- **scikit-learn – Pipelines**: Encadenar el preprocesado y el modelo para evitar fugas de datos. [https://scikit-learn.org/stable/modules/compose.html#pipeline](https://scikit-learn.org/stable/modules/compose.html#pipeline) 🇬🇧 (en inglés)
- **Zou, H. y Hastie, T. (2005). Regularization and variable selection via the elastic net.** *Journal of the Royal Statistical Society: Series B*, 67(2), 301–320. [https://doi.org/10.1111/j.1467-9868.2005.00503.x](https://doi.org/10.1111/j.1467-9868.2005.00503.x) 🇬🇧 (en inglés)
- **Efron, B. (1979). Bootstrap methods: another look at the jackknife.** *The Annals of Statistics*, 7(1), 1–26. [https://doi.org/10.1214/aos/1176344552](https://doi.org/10.1214/aos/1176344552) 🇬🇧 (en inglés)
- **scikit-learn – Métricas ROC**: La curva ROC y el área bajo ella. [https://scikit-learn.org/stable/modules/model_evaluation.html#roc-metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#roc-metrics) 🇬🇧 (en inglés)
