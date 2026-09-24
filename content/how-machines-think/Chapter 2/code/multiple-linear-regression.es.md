---
title: "⚡ Regresión lineal múltiple desde cero"
weight: 69
description: "Demostración interactiva: un modelo con cinco variables para las mascarillas de Minermont, el descenso del gradiente con y sin escalado, la solución exacta, la prueba y la diferencia entre ECM y EAM."
date:
draft: false
slug: "regresion-lineal-multiple-desde-cero"
---

En el libro, el modelo de las mascarillas pasa de una variable a cinco: pacientes, temperatura, urgencias, alertas sanitarias y fines de semana. Este notebook construye ese modelo desde cero con año y medio de días sintéticos que siguen la ecuación del libro, y muestra por qué hay que escalar las variables antes del descenso del gradiente y por qué importa la función de coste cuando los registros contienen errores.

El notebook interactivo incluye:

- El ejemplo resuelto de Marta: una predicción con cinco variables como producto de vectores.
- 547 días sintéticos, con los inviernos y las alertas sanitarias del libro.
- El descenso del gradiente con las variables sin escalar, y por qué se arrastra.
- El mismo algoritmo con las variables estandarizadas, y la solución exacta de mínimos cuadrados.
- La evaluación con tres meses que el modelo no ha visto.
- Unos pocos registros erróneos: cómo estropean el ajuste con ECM y por qué el EAM los resiste.
- La previsión para la semana del libro, comparada con los rangos históricos de Carlos.

{{< isolate name="26RegresionLinealMultiple" params=`lang="es"` width="100%" height="720" title="Regresión lineal múltiple desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1fH9qE3Y8SPMm1n2zZKzearajAI0tory4)

### Bibliografía

- **James, G., Witten, D., Hastie, T. y Tibshirani, R. (2021). *An Introduction to Statistical Learning* (2nd ed.).** Springer. Capítulo 3, regresión lineal. [https://www.statlearning.com/](https://www.statlearning.com/) 🇬🇧 (en inglés)
- **Hastie, T., Tibshirani, R. y Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.).** Springer. Capítulo 3. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧 (en inglés)
- **Koenker, R. y Bassett, G. (1978). Regression quantiles.** *Econometrica*, 46(1), 33–50. La regresión con error absoluto (mediana). [https://doi.org/10.2307/1913643](https://doi.org/10.2307/1913643) 🇬🇧 (en inglés)
