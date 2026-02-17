---
title: "3.5 - Visualización ROC y AUC"
description: "Explora interactivamente cómo se construyen las curvas ROC y qué significa el AUC en Regresión Logística y SVM."
weight: 10
draft: false
---

## Introducción

Esta herramienta interactiva te permite visualizar cómo se comportan dos de los algoritmos de clasificación más populares: **Regresión Logística** y **SVM (Máquinas de Vectores de Soporte)**, y cómo evaluar su rendimiento mediante la curva ROC y el AUC.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro
    lang="es"
    title="Visualización ROC y AUC"
    context_type="research"
    scenario="Estás validando dos clasificadores que detectan casos de alto riesgo a partir de señales diagnósticas. Antes de desplegarlos, necesitas comparar cómo equilibran sensibilidad y falsas alarmas en distintos umbrales."
    medical_highlight="El análisis ROC permite comparar clasificadores más allá de un único umbral. El AUC resume la capacidad de discriminación: cuanto mayor el AUC, mejor separa el modelo ambas clases en distintos puntos de operación."
    steps="Elige el modelo: Selecciona Regresión Logística, SVM o Ambos para comparar su comportamiento lado a lado.|Ajusta la dificultad: Modifica separación de clases y ruido para hacer el problema más fácil o más difícil y observar cómo cambia la ROC.|Genera y compara: Pulsa Nuevos Datos e inspecciona cómo se mueven la curva ROC y el AUC para cada modelo en distintas condiciones."
>}}

{{< roc-auc-visualization >}}
{{< /demo-wrapper >}}

## Cómo interpretar las gráficas

1.  **Espacio de Clasificación (Izquierda)**:
    *   Muestra los puntos de datos generados.
    *   La **línea sólida** representa la frontera de decisión del modelo. El modelo clasifica todo lo que está a un lado como una clase y lo del otro lado como la otra.
    *   En el modo SVM, verás líneas punteadas adicionales que representan el **margen** de separación.

2.  **Curva ROC (Derecha)**:
    *   La curva ROC (Receiver Operating Characteristic) muestra la capacidad de diagnóstico del clasificador.
    *   El eje Y es la **Tasa de Verdaderos Positivos (Sensibilidad)**: ¿Qué porcentaje de los casos positivos reales detectó el modelo?
    *   El eje X es la **Tasa de Falsos Positivos (1 - Especificidad)**: ¿Qué porcentaje de los casos negativos reales fueron incorrectamente clasificados como positivos?
    *   La **línea diagonal punteada** representa un clasificador aleatorio (como lanzar una moneda).
    *   Una curva que se acerca a la esquina superior izquierda indica un mejor rendimiento.

3.  **AUC (Área Bajo la Curva)**:
    *   Es un número único que resume la curva ROC.
    *   **1.0**: Clasificación perfecta.
    *   **0.5**: Clasificación aleatoria (no mejor que el azar).
    *   **< 0.5**: El modelo está clasificando al revés (peor que el azar).

