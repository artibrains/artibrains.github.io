---
title: "Capítulo 3: Sistemas de Clasificación Binaria"
description: "El Siguiente Paso: Regresión Logística y SVM"
type: "chapter"
weight: 3
draft: false
slug: "clasificacion-evaluacion-modelos"
---

{{< chapter-subtitle >}}El Siguiente Paso: Regresión Logística y SVM{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="3" >}}

Con la predicción de insumos funcionando, Víctor y el equipo atacan las inasistencias; Alma los guía con regresión logística y SVM para convertir el sí/no en mejores agendas.

Este capítulo introduce la **clasificación binaria**: convertir señales en una decisión sí/no, evaluar bien el rendimiento y controlar el sobreajuste mediante regularización.

A lo largo de las siguientes secciones interactivas, explorarás:

- **[3.1 - Juego de Clasificación SVM]({{% relref "how-machines-think/Chapter 3/svm-game/svm_game.es.md" %}})**: Aprende sobre las *Máquinas de Vectores de Soporte*, uno de los algoritmos de clasificación más potentes. Encuentra el límite de decisión óptimo que separa dos clases maximizando el margen.

- **[3.1 - El Traductor de Probabilidades]({{% relref "how-machines-think/Chapter 3/probabilities_translator/probabilities_translator.es.md" %}})**: Descubrirás la *regresión logística*, el motor del nuevo modelo del equipo. Verás cómo transforma señales de entrada en una probabilidad.

- **[3.3 - El clasificador]({{% relref "how-machines-think/Chapter 3/juego-sigmoide/juego-sigmoide.es.md" %}})**: Aprenderás a encontrar la frontera de clasificación óptima ajustando los diferentes parámetros del modelo. Experimentarás con el *umbral de decisión* y cómo afecta a las predicciones.

- **[3.3 - El Gestor de Riesgos]({{% relref "how-machines-think/Chapter 3/risk_gestor/risk_gestor.es.md" %}})**: Te pondrás en la piel de un gestor y ajustarás el *umbral de decisión* del modelo. Experimentarás el equilibrio crítico entre el coste de los falsos positivos y los falsos negativos.

- **[3.3 - El Domador de Complejidad]({{% relref "how-machines-think/Chapter 3/complexity/complexity.es.md" %}})**: Lucharás contra el *sobreajuste (overfitting)*. Ajustarás la complejidad y la *regularización* para crear un modelo que aprenda patrones reales sin memorizar el ruido, asegurando que funcione bien en casos futuros.


- **[3.3 - Comparación de Regularización]({{% relref "how-machines-think/Chapter 3/regularization-comparison/regularization-comparison.es.md" %}})**: Descubrirás las diferencias entre *L1 (Lasso)*, *L2 (Ridge)* y *Elastic Net*. Verás en tiempo real cómo cada tipo de regularización afecta los pesos del modelo y la selección de características, ayudándote a elegir la mejor estrategia según el problema.

- **[3.5 - El Validador Honesto]({{% relref "how-machines-think/Chapter 3/k_fold_validator/k_fold_validator.es.md" %}})**: Entenderás por qué una simple prueba no es suficiente. Compararás la validación simple con la *validación cruzada (K-Fold)*, el método que el equipo elige para obtener una medida de error estable y fiable.

- **[3.5 - Curvas ROC y AUC]({{% relref "how-machines-think/Chapter 3/roc-auc/roc-auc.es.md" %}})**: Explorarás los trade-offs entre las tasas de verdaderos positivos y falsos positivos. Aprenderás a interpretar las curvas ROC y calcular el AUC para evaluar el rendimiento del modelo en diferentes umbrales.

Prepárate para profundizar en el arte de la clasificación y la evaluación, dos pilares fundamentales para cualquier aplicación de inteligencia artificial en el mundo real.

### Pseudocódigo de Algoritmos

- **[📝 Pseudocódigo de Regresión Logística]({{% relref "/how-machines-think/Chapter 3/code/pseudocode-logistic-regression.es.md" %}})**: Pseudocódigo completo para regresión logística binaria y multiclase con entrenamiento por descenso del gradiente.

### Bibliografía y recursos complementarios

- **[📚 Regresión logística y traductores de probabilidad]({{% relref "/how-machines-think/Chapter 3/bibliography/bibliography-logistic-regression.es.md" %}})**: Fundamentos, guías prácticas e interpretabilidad para El Traductor de Probabilidades.
- **[📚 Umbrales de clasificación, validación y regularización]({{% relref "/how-machines-think/Chapter 3/bibliography/bibliography-classification-evaluation.es.md" %}})**: Métricas, estrategias de validación y control de complejidad que respaldan las demos del Gestor de Riesgos, Validador Honesto y Domador de la Complejidad.