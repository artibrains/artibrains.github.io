---
title: "📝 Pseudocódigo de Regresión Lineal"
weight: 66
description: "El algoritmo formal detrás de la regresión lineal: de los datos a los parámetros óptimos."
date: 
draft: false
slug: "pseudocodigo-regresion-lineal"
---

La regresión lineal es uno de los algoritmos fundamentales del aprendizaje automático. Encuentra la línea (o hiperplano) que mejor se ajusta a los datos minimizando la suma de errores cuadráticos entre las predicciones y los valores reales.

## El Algoritmo

### Solución en Forma Cerrada (Ecuación Normal)

Para un conjunto de datos con $n$ muestras y $m$ características, la regresión lineal encuentra los pesos $\mathbf{w}$ que minimizan el Error Cuadrático Medio (MSE).

```
ALGORITMO: Regresión Lineal (Ecuación Normal)
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características de forma (n_muestras, n_características)
    y: Vector objetivo de forma (n_muestras,)

SALIDA:
    w: Vector de pesos de forma (n_características + 1,)

PROCEDIMIENTO:
    1. Añadir término de sesgo: X_b ← [1, X]  // Anteponer columna de unos
    
    2. Calcular pesos óptimos usando la Ecuación Normal:
       w ← (X_bᵀ · X_b)⁻¹ · X_bᵀ · y
    
    3. DEVOLVER w

PREDICCIÓN:
    Dada una nueva muestra x:
    ŷ ← w₀ + w₁·x₁ + w₂·x₂ + ... + wₘ·xₘ
    // O en forma matricial: ŷ ← [1, x] · w
```

### Solución por Descenso del Gradiente

Cuando el conjunto de datos es muy grande o la inversión de matriz es computacionalmente costosa, usamos descenso del gradiente:

```
ALGORITMO: Regresión Lineal (Descenso del Gradiente)
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características de forma (n_muestras, n_características)
    y: Vector objetivo de forma (n_muestras,)
    α: Tasa de aprendizaje (ej., 0.01)
    max_iteraciones: Número máximo de iteraciones
    tolerancia: Umbral de convergencia (ej., 1e-6)

SALIDA:
    w: Vector de pesos de forma (n_características + 1,)

PROCEDIMIENTO:
    1. Añadir término de sesgo: X_b ← [1, X]
    
    2. Inicializar pesos: w ← ceros(n_características + 1)
    
    3. n ← número de muestras
    
    4. PARA iteración = 1 HASTA max_iteraciones:
        
        a. Calcular predicciones:
           ŷ ← X_b · w
        
        b. Calcular error:
           error ← ŷ - y
        
        c. Calcular gradiente:
           gradiente ← (2/n) · X_bᵀ · error
        
        d. Actualizar pesos:
           w ← w - α · gradiente
        
        e. Verificar convergencia:
           SI ||gradiente|| < tolerancia:
               ROMPER
    
    5. DEVOLVER w
```

## Fundamento Matemático

La función de coste (Error Cuadrático Medio) que minimizamos es:

$$J(\mathbf{w}) = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 = \frac{1}{n} \sum_{i=1}^{n} (y_i - \mathbf{w}^T \mathbf{x}_i)^2$$

El gradiente de esta función de coste respecto a los pesos es:

$$\nabla_{\mathbf{w}} J = \frac{2}{n} \mathbf{X}^T (\mathbf{X}\mathbf{w} - \mathbf{y})$$

Igualando el gradiente a cero y resolviendo obtenemos la **Ecuación Normal**:

$$\mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

## Análisis de Complejidad

| Método | Complejidad Temporal | Complejidad Espacial |
|--------|---------------------|---------------------|
| Ecuación Normal | $O(n \cdot m^2 + m^3)$ | $O(m^2)$ |
| Descenso del Gradiente | $O(k \cdot n \cdot m)$ | $O(m)$ |

Donde $n$ = muestras, $m$ = características, $k$ = iteraciones.

## Puntos Clave

1. **Ecuación Normal**: Mejor para conjuntos de datos pequeños a medianos. No requiere hiperparámetros, pero es computacionalmente costosa para muchas características.

2. **Descenso del Gradiente**: Escala mejor a conjuntos de datos grandes. Requiere ajustar la tasa de aprendizaje y los criterios de convergencia.

3. **Escalado de Características**: Siempre normaliza/estandariza las características al usar descenso del gradiente para asegurar una convergencia estable.

## Referencias

- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 3. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Capítulo 3. Springer. 🇬🇧
- **Documentación de scikit-learn**: LinearRegression. [https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares](https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares) 🇬🇧
- **Stanford CS229**: Notas del curso de Machine Learning sobre Regresión Lineal. [https://cs229.stanford.edu/](https://cs229.stanford.edu/) 🇬🇧
