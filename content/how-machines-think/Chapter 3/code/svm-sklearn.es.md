---
title: "⚡ SVM con sklearn"
weight: 84
description: "Demostración interactiva: máquinas de vectores de soporte con scikit-learn, el truco del kernel y la búsqueda de hiperparámetros."
date:
draft: false
slug: "svm-sklearn"
---

Estas son las notas de Luis sobre cómo usar las máquinas de vectores de soporte con scikit-learn: el ejemplo del libro con `SVC`, el truco del kernel para trazar fronteras curvas y la elección entre un kernel lineal y uno RBF para el problema de las ausencias.

El notebook interactivo incluye:

- El ejemplo del libro resuelto con `SVC` y el efecto de `C` (el $\lambda$ del libro) sobre el margen.
- El truco del kernel: datos que ninguna recta puede separar, la transformación explícita a 3D y los kernels lineal, polinómico y RBF.
- El parámetro `gamma` del kernel RBF, del subajuste al sobreajuste.
- `GridSearchCV` con validación cruzada estratificada de 5 grupos para elegir `C` y `gamma` con los datos de ausencias.
- Comparación final con la regresión logística (exactitud, sensibilidad, especificidad y AUC), incluido `class_weight`.
- Probabilidades calibradas con `SVC(probability=True)` para pacientes nuevos.

{{< isolate name="35MVSSklearn" params=`lang="es"` width="100%" height="720" title="SVM con sklearn (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1RKOqO0izrmDGy9VbzY9yJNd3529qISTO)

### Bibliografía

- **Referencia de scikit-learn – `SVC`**: Parámetros (`kernel`, `C`, `gamma`, `class_weight`, `probability`) y atributos como los vectores de soporte. [https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html](https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html) 🇬🇧 (en inglés)
- **Guía de scikit-learn – Funciones kernel**: Kernels lineal, polinómico, RBF y sigmoide. [https://scikit-learn.org/stable/modules/svm.html#kernel-functions](https://scikit-learn.org/stable/modules/svm.html#kernel-functions) 🇬🇧 (en inglés)
- **Ejemplo de scikit-learn – Parámetros de la SVM RBF**: Cómo `C` y `gamma` dan forma a la frontera de decisión. [https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html](https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html) 🇬🇧 (en inglés)
- **scikit-learn – Ajuste de hiperparámetros**: `GridSearchCV` y la búsqueda con validación cruzada. [https://scikit-learn.org/stable/modules/grid_search.html](https://scikit-learn.org/stable/modules/grid_search.html) 🇬🇧 (en inglés)
- **scikit-learn – Calibración de probabilidades**: Cómo se convierten las puntuaciones en probabilidades. [https://scikit-learn.org/stable/modules/calibration.html](https://scikit-learn.org/stable/modules/calibration.html) 🇬🇧 (en inglés)
