---
title: "3.3 Comparación de Regularización: L1, L2 y Elastic Net"
description: "Visualización interactiva de cómo diferentes tipos de regularización (L1, L2, Elastic Net) afectan los pesos del modelo y la selección de características."
weight: 7
draft: false
slug: "comparacion-regularizacion"
---

## Introducción

Cuando entrenamos un modelo predictivo, la **regularización** nos ayuda a controlar su complejidad añadiendo una penalización a los pesos (coeficientes) del modelo. Existen tres tipos principales de regularización: **L1 (Lasso)**, **L2 (Ridge)** y **Elastic Net** (combinación de ambas). Cada una tiene efectos diferentes sobre cómo el modelo selecciona y pondera las características.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro
lang="es"
title="Comparación de Regularización: L1, L2, Elastic Net"
scenario="Un equipo está desarrollando un modelo para predecir el riesgo de un resultado no deseado. Tienen muchas variables disponibles: uso, historial, señales del dispositivo, interacciones de soporte, etc. No todas son igualmente relevantes, y algunas pueden estar correlacionadas. Debes comparar cómo diferentes técnicas de regularización controlan la complejidad penalizando pesos, y observar cómo la selección de características difiere entre enfoques L1 (Lasso), L2 (Ridge) y Elastic Net."
steps="Genera Datos de Ejemplo: Crea un conjunto de datos sintético con múltiples señales, algunas relevantes y otras irrelevantes o redundantes.|Compara Regularizaciones: Ajusta el factor de regularización (λ) y observa cómo L1, L2 y Elastic Net afectan los pesos de cada característica de manera diferente.|Visualiza el Impacto: Ve cómo cambia la curva de predicción y la tabla de pesos según el tipo y la fuerza de regularización aplicada."
medical_highlight="La regularización no solo previene el sobreajuste, sino que también puede ayudar en la selección de características. L1 (Lasso) tiende a eliminar características irrelevantes llevando sus pesos a cero. L2 (Ridge) reduce todos los pesos pero mantiene todas las características. Elastic Net combina ambos enfoques, siendo especialmente útil cuando hay muchas características correlacionadas."
>}}

{{< regularization-comparison >}}

{{< /demo-wrapper >}}

## Matemáticas Detrás de la Regularización

### Función de Coste con Regularización

Para un problema de regresión, la función de coste a minimizar es:

$$
J(w) = \underbrace{\frac{1}{2m} \sum_{i=1}^{m} (h_w(x^{(i)}) - y^{(i)})^2}_{\text{Error de predicción}} + \underbrace{\text{Penalización}}_{\text{Regularización}}
$$

Donde la penalización es:
- **L1**: $\lambda \sum_{j=1}^{p} |w_j|$
- **L2**: $\lambda \sum_{j=1}^{p} w_j^2$
- **Elastic Net**: $\lambda \left[ \alpha \sum_{j=1}^{p} |w_j| + (1-\alpha) \sum_{j=1}^{p} w_j^2 \right]$

## Conceptos Fundamentales

### Regularización L1 (Lasso)

{{% notice style="info" title="Lasso - Least Absolute Shrinkage and Selection Operator" %}}
**Fórmula de penalización:** $\lambda \sum_{j=1}^{p} |w_j|$

La regularización L1 añade la **suma de los valores absolutos** de los pesos como penalización. Su característica distintiva es que puede **llevar pesos exactamente a cero**, realizando automáticamente una selección de características.

**Ventajas:**
- Selección automática de características (feature selection)
- Modelos más interpretables con menos variables
- Útil cuando hay muchas características irrelevantes

**Desventajas:**
- Puede ser inestable con características correlacionadas
- Puede eliminar características importantes si están correlacionadas

**Cuándo usarla:** Cuando sospechas que muchas características son irrelevantes o cuando necesitas un modelo muy interpretable con pocas variables.
{{% /notice %}}

### Regularización L2 (Ridge)

{{% notice style="info" title="Ridge Regression" %}}
**Fórmula de penalización:** $\lambda \sum_{j=1}^{p} w_j^2$

La regularización L2 añade la **suma de los cuadrados** de los pesos como penalización. Reduce todos los pesos hacia cero pero **nunca los elimina completamente**.

**Ventajas:**
- Maneja bien características correlacionadas
- Solución más estable y suave
- Reduce todos los pesos de manera proporcional

**Desventajas:**
- No realiza selección de características
- Mantiene todas las variables, incluso las irrelevantes

**Cuándo usarla:** Cuando la mayoría de las características son relevantes o cuando hay multicolinealidad (características correlacionadas) y quieres mantenerlas todas.
{{% /notice %}}

### Regularización Elastic Net

{{% notice style="info" title="Elastic Net - Lo mejor de ambos mundos" %}}
**Fórmula de penalización:** $\lambda \left[ \alpha \sum_{j=1}^{p} |w_j| + (1-\alpha) \sum_{j=1}^{p} w_j^2 \right]$

Elastic Net combina L1 y L2 con un parámetro $\alpha$ que controla el balance entre ambos ($\alpha = 1$ es puro L1, $\alpha = 0$ es puro L2).

**Ventajas:**
- Hereda las ventajas de L1 y L2
- Realiza selección de características como L1
- Maneja correlaciones como L2
- Más flexible y robusto

**Desventajas:**
- Un hiperparámetro adicional ($\alpha$) para ajustar
- Algo más complejo de entender

**Cuándo usarla:** Cuando tienes muchas características, algunas correlacionadas, y quieres realizar selección de características de manera robusta. Es la opción más versátil en la práctica.
{{% /notice %}}

## Comparación Visual

| Aspecto | L1 (Lasso) | L2 (Ridge) | Elastic Net |
|---------|------------|------------|-------------|
| **Forma de la penalización** | Suma de valores absolutos | Suma de cuadrados | Combinación de ambas |
| **Selección de características** | ✅ Sí (pesos → 0) | ❌ No (solo reduce) | ✅ Sí (pero más suave) |
| **Características correlacionadas** | ⚠️ Puede ser inestable | ✅ Maneja bien | ✅ Maneja bien |
| **Interpretabilidad** | ⭐⭐⭐ Alta | ⭐⭐ Media | ⭐⭐⭐ Alta |
| **Estabilidad** | ⭐⭐ Media | ⭐⭐⭐ Alta | ⭐⭐⭐ Alta |
| **Número de parámetros** | 1 (λ) | 1 (λ) | 2 (λ, α) |

### ¿Por qué L1 lleva pesos a cero?

La geometría de la regularización L1 crea esquinas en el espacio de optimización. Cuando el gradiente descendente busca el mínimo, es más probable que "aterrice" en una esquina donde algunos pesos son exactamente cero.

En cambio, L2 tiene una geometría circular/elíptica sin esquinas, por lo que los pesos se reducen pero raramente llegan a cero exacto.

## Experimentos Sugeridos

Usa la demostración interactiva para:

1. **Efecto del λ**: Comienza con λ = 0 (sin regularización) y auméntalo gradualmente. Observa cómo los pesos se reducen.

2. **Comparación L1 vs L2**: Con el mismo λ, compara cómo L1 elimina características mientras que L2 solo las reduce.

3. **Características Irrelevantes**: Observa cómo L1 y Elastic Net identifican y eliminan características con bajo poder predictivo.

4. **Multicolinealidad**: Cuando dos características están correlacionadas, L1 puede eliminar arbitrariamente una, mientras que L2 y Elastic Net mantienen ambas con pesos reducidos.

5. **Balance en Elastic Net**: Ajusta el parámetro α para ver cómo se comporta más como L1 (α → 1) o más como L2 (α → 0).

{{% notice style="warning" title="Importante en la práctica" %}}
La selección automática de características por L1/Elastic Net debe complementarse con conocimiento del dominio. Un modelo podría eliminar una variable que expertos del área saben que es relevante. Siempre valida los resultados con expertos del dominio.
{{% /notice %}}

## Referencias

Para profundizar en regularización, consulta:
- **[Bibliografía de Clasificación y Evaluación]({{% relref "/how-machines-think/Chapter 3/bibliography/bibliography-classification-evaluation.es.md" %}})**: Recursos sobre regularización, validación cruzada y control de complejidad.

{{< terminal >}}
