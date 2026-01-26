---
title: "📝 Pseudocódigo de Regresión Logística"
weight: 80
description: "El algoritmo detrás de la clasificación binaria: transformando salidas lineales en probabilidades."
date: 
draft: false
slug: "pseudocodigo-regresion-logistica"
---

La regresión logística es el algoritmo fundamental para la clasificación binaria. A pesar de su nombre, es un algoritmo de clasificación que usa la función logística (sigmoide) para transformar combinaciones lineales de características en probabilidades.

## El Algoritmo

### Entrenamiento con Descenso del Gradiente

```
ALGORITMO: Entrenamiento de Regresión Logística
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características de forma (n_muestras, n_características)
    y: Etiquetas binarias {0, 1} de forma (n_muestras,)
    α: Tasa de aprendizaje (ej., 0.01)
    max_iteraciones: Número máximo de iteraciones
    tolerancia: Umbral de convergencia (ej., 1e-6)

SALIDA:
    w: Vector de pesos de forma (n_características,)
    b: Término de sesgo (escalar)

PROCEDIMIENTO:
    1. Inicializar pesos: w ← ceros(n_características)
    2. Inicializar sesgo: b ← 0
    3. n ← número de muestras
    
    4. PARA iteración = 1 HASTA max_iteraciones:
        
        a. // Paso hacia adelante: calcular combinación lineal
           z ← X · w + b
        
        b. // Aplicar activación sigmoide
           ŷ ← σ(z) = 1 / (1 + exp(-z))
        
        c. // Calcular gradientes (de la pérdida de entropía cruzada)
           dw ← (1/n) · Xᵀ · (ŷ - y)
           db ← (1/n) · Σ(ŷ - y)
        
        d. // Actualizar parámetros
           w ← w - α · dw
           b ← b - α · db
        
        e. // Verificar convergencia
           SI ||dw|| < tolerancia Y |db| < tolerancia:
               ROMPER
    
    5. DEVOLVER w, b
```

### Predicción

```
ALGORITMO: Predicción de Regresión Logística
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Vector de características de la muestra de forma (n_características,)
    w: Vector de pesos entrenado
    b: Término de sesgo entrenado
    umbral: Umbral de decisión (por defecto = 0.5)

SALIDA:
    clase: Clase predicha {0, 1}
    probabilidad: Probabilidad de la clase 1

PROCEDIMIENTO:
    1. Calcular combinación lineal:
       z ← w · x + b
    
    2. Aplicar sigmoide para obtener probabilidad:
       p ← σ(z) = 1 / (1 + exp(-z))
    
    3. Aplicar umbral para obtener clase:
       SI p ≥ umbral:
           clase ← 1
       SINO:
           clase ← 0
    
    4. DEVOLVER clase, p
```

### La Función Sigmoide

```
FUNCIÓN: Sigmoide (Función Logística)
─────────────────────────────────────────────────────────────────

ENTRADA:
    z: Número real o array

SALIDA:
    σ(z): Valor(es) en el rango (0, 1)

DEFINICIÓN:
    σ(z) = 1 / (1 + exp(-z))

PROPIEDADES:
    - σ(0) = 0.5
    - lim(z → +∞) σ(z) = 1
    - lim(z → -∞) σ(z) = 0
    - σ'(z) = σ(z) · (1 - σ(z))  // Derivada
```

## Fundamento Matemático

### El Modelo

La regresión logística modela la probabilidad de que la muestra $x$ pertenezca a la clase 1:

$$P(y=1|x) = \sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}}$$

### La Función de Pérdida (Entropía Cruzada Binaria)

Para una sola muestra:
$$L(y, \hat{y}) = -[y \log(\hat{y}) + (1-y) \log(1-\hat{y})]$$

Para todo el conjunto de datos:
$$J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} [y_i \log(\hat{y}_i) + (1-y_i) \log(1-\hat{y}_i)]$$

### Los Gradientes

$$\frac{\partial J}{\partial w} = \frac{1}{n} X^T (\hat{y} - y)$$

$$\frac{\partial J}{\partial b} = \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)$$

## Regresión Logística Regularizada

Para prevenir el sobreajuste, añadimos un término de regularización:

```
ALGORITMO: Regresión Logística con Regularización L2
─────────────────────────────────────────────────────────────────

ACTUALIZACIÓN MODIFICADA DEL GRADIENTE (paso 4d en entrenamiento):

    // Regularización L2 (Ridge)
    dw ← (1/n) · Xᵀ · (ŷ - y) + (λ/n) · w
    
    // Nota: el sesgo típicamente no se regulariza
    db ← (1/n) · Σ(ŷ - y)

DONDE:
    λ: Fuerza de regularización (hiperparámetro)
```

La función de pérdida regularizada se convierte en:

$$J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} [y_i \log(\hat{y}_i) + (1-y_i) \log(1-\hat{y}_i)] + \frac{\lambda}{2n} \|w\|^2$$

## Extensión Multiclase (Regresión Softmax)

Para $K$ clases, extendemos a regresión softmax:

```
ALGORITMO: Regresión Softmax (Regresión Logística Multinomial)
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características de forma (n_muestras, n_características)
    y: Etiquetas {0, 1, ..., K-1} de forma (n_muestras,)

PREDICCIÓN:
    1. Calcular puntuaciones para cada clase:
       z_k ← X · w_k + b_k    para k = 0, 1, ..., K-1
    
    2. Aplicar softmax para obtener probabilidades:
       P(y = k | x) = exp(z_k) / Σⱼ exp(z_j)
    
    3. Predecir clase con mayor probabilidad:
       ŷ ← argmax_k P(y = k | x)
```

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Entrenamiento (por iteración) | $O(n \cdot m)$ | $O(m)$ |
| Predicción (por muestra) | $O(m)$ | $O(1)$ |

Donde $n$ = muestras, $m$ = características.

## Puntos Clave

1. **Interpretabilidad**: Los pesos representan log-odds ratios; $e^{w_j}$ es el cambio multiplicativo en odds por unidad de incremento en la característica $j$.

2. **Ajuste del Umbral**: El umbral por defecto de 0.5 puede ajustarse según el coste de falsos positivos vs. falsos negativos.

3. **Escalado de Características**: Estandarizar las características acelera la convergencia.

4. **Desbalanceo de Clases**: Usar pesos de clase o remuestreo para conjuntos de datos desbalanceados.

## Referencias

- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 4. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Capítulo 4. Springer. 🇬🇧
- **Documentación de scikit-learn**: LogisticRegression. [https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) 🇬🇧
- **Notas de Andrew Ng CS229**: Regresión Logística. [https://cs229.stanford.edu/](https://cs229.stanford.edu/) 🇬🇧
