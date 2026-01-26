---
title: "2. Modelos de aprendizaje automático"
description: "De la teoría a la práctica: construyendo los primeros modelos predictivos."
weight: 2
slug: "modelos-aprendizaje-automatico"
---

Tras un primer intento fallido con un sistema demasiado complejo, Víctor, Marta, Luis y Carlos aprenden una lección fundamental: a veces, la solución más simple es la más poderosa. Guiados por el consejo de Alma García de AIA, el equipo se embarca en la implementación de un modelo de regresión lineal para predecir la necesidad de suministros médicos.

Este nuevo enfoque no solo es más manejable, sino también transparente e interpretable, ganándose la confianza incluso de los más escépticos, como el doctor Javier.

## ¿Qué aprenderás?

En este capítulo nos adentramos en el núcleo del aprendizaje automático a través de la experiencia del equipo del hospital. Seguirás sus pasos desde los ajustes manuales hasta el aprendizaje automatizado.

1. **[Ajustar un Modelo de Regresión Lineal]({{% relref "/how-machines-think/Chapter 2/linear-regression/linear_regresion_game.es.md" %}})**  
   Ponte en la piel de Marta y Luis, ajustando manualmente los parámetros de un modelo para predecir el consumo de mascarillas. Comprende la relación entre pendiente, intercepto y predicción.

2. **[Visualizar el Descenso del Gradiente]({{% relref "/how-machines-think/Chapter 2/metodo-descenso-gradiente/Metodo-del-descenco-del-gradiente.es.md" %}})**  
   Captarás la intuición detrás del algoritmo que el equipo utilizó para entrenar su modelo automáticamente. Verás cómo el sistema "desciende" la montaña del error hasta encontrar los parámetros óptimos.

3. **[Comparar Funciones de Coste]({{% relref "how-machines-think/Chapter 2/error-comparison/error_comparation.es.md" %}})**  
   Explora por qué la elección de la función de coste (MSE vs. MAE) fue un punto clave en la discusión del equipo y cómo afecta al comportamiento del modelo, especialmente ante valores atípicos.

### Implementación práctica

- **[Regresión lineal desde cero]({{% relref "/how-machines-think/Chapter 2/code/linear-regresion.es.md" %}})**: Construye un modelo de regresión lineal desde cero, aplicando los conceptos aprendidos a un problema real.
- **[Regresión lineal con Scikit-Learn]({{% relref "/how-machines-think/Chapter 2/code/linear-regresion-sklearn.es.md" %}})**: Usa la biblioteca estándar de la industria para implementar un modelo de regresión lineal de forma eficiente.

### Pseudocódigo de Algoritmos

- **[📝 Pseudocódigo de Regresión Lineal]({{% relref "/how-machines-think/Chapter 2/code/pseudocode-linear-regression.es.md" %}})**: Pseudocódigo detallado para regresión lineal con ecuación normal y descenso del gradiente.
- **[📝 Pseudocódigo de Descenso del Gradiente]({{% relref "/how-machines-think/Chapter 2/code/pseudocode-gradient-descent.es.md" %}})**: Pseudocódigo paso a paso para descenso del gradiente por lotes, estocástico y mini-lotes.

### Fundamentos matemáticos

- **[Derivadas]({{% relref "how-machines-think/Chapter 2/math/derivatives.es.md" %}})**: Referencia concisa de reglas de derivación y un widget interactivo para calcular $f'(x)$ y explorar explicaciones paso a paso mediante WolframAlpha.
- **[Derivadas parciales y gradiente]({{% relref "how-machines-think/Chapter 2/math/gradients.es.md" %}})**: Desde derivadas parciales hasta el vector gradiente, intuición geométrica y un widget para calcular $\nabla f$ de forma simbólica.

### Bibliografía y recursos adicionales

- **[Regresión lineal]({{% relref "/how-machines-think/Chapter 2/bibliography/bibliography-linear-regresion.es.md" %}})**: Materiales para profundizar en la regresión lineal, desde la teoría hasta la práctica.
- **[Descenso del gradiente]({{% relref "/how-machines-think/Chapter 2/bibliography/bibliography-gradient-descent.es.md" %}})**: Recursos para entender y aplicar el descenso del gradiente, desde fundamentos hasta técnicas avanzadas de optimización.
