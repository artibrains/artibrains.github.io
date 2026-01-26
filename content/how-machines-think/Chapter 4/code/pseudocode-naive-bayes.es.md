---
title: "📝 Pseudocódigo del Clasificador Naive Bayes"
weight: 81
description: "El clasificador probabilístico basado en el teorema de Bayes con suposiciones de independencia ingenuas."
date: 
draft: false
slug: "pseudocodigo-naive-bayes"
---

El clasificador Naive Bayes es una familia de clasificadores probabilísticos simples pero sorprendentemente efectivos, basados en aplicar el teorema de Bayes con fuertes suposiciones de independencia (ingenuas) entre características.

## El Algoritmo

### Principio Central: Teorema de Bayes

$$P(C_k | x) = \frac{P(x | C_k) \cdot P(C_k)}{P(x)}$$

Donde:
- $P(C_k | x)$ es la probabilidad **posterior** de la clase $C_k$ dadas las características $x$
- $P(x | C_k)$ es la **verosimilitud** de las características dada la clase
- $P(C_k)$ es la probabilidad **prior** de la clase
- $P(x)$ es la **evidencia** (constante de normalización)

### Clasificación Naive Bayes

```
ALGORITMO: Clasificación Naive Bayes
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Vector de características de forma (n_características,)
    priors_clase: Probabilidades prior P(C_k) para cada clase
    verosimilitudes: P(x_j | C_k) para cada característica j y clase k

SALIDA:
    clase_predicha: La clase con mayor probabilidad posterior
    posteriors: Probabilidades posteriores para todas las clases

PROCEDIMIENTO:
    1. // Para cada clase, calcular posterior no normalizado
       posteriors ← diccionario vacío
       
       PARA cada clase k:
           // Comenzar con log prior (usar log para evitar underflow)
           log_posterior ← log(priors_clase[k])
           
           // Multiplicar por verosimilitud de cada característica (sumar en espacio log)
           PARA j = 1 HASTA n_características:
               log_posterior ← log_posterior + log(P(x[j] | C_k))
           
           posteriors[k] ← log_posterior
    
    2. // Normalizar para obtener probabilidades correctas
       max_log ← max(posteriors.valores())
       total ← Σ exp(posteriors[k] - max_log) para todo k
       
       PARA cada clase k:
           posteriors[k] ← exp(posteriors[k] - max_log) / total
    
    3. // Seleccionar clase con mayor posterior
       clase_predicha ← argmax_k(posteriors)
    
    4. DEVOLVER clase_predicha, posteriors
```

### Entrenamiento: Naive Bayes Gaussiano

Para características continuas, asumimos que cada característica sigue una distribución Gaussiana:

```
ALGORITMO: Entrenamiento Naive Bayes Gaussiano
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características de entrenamiento (n_muestras, n_características)
    y: Etiquetas de entrenamiento (n_muestras,)
    clases: Lista de etiquetas de clase únicas

SALIDA:
    priors_clase: Probabilidad prior para cada clase
    medias: Media de cada característica para cada clase
    varianzas: Varianza de cada característica para cada clase

PROCEDIMIENTO:
    1. n ← número total de muestras
    
    2. // Calcular priors de clase
       PARA cada clase k:
           n_k ← contar muestras donde y = k
           priors_clase[k] ← n_k / n
    
    3. // Calcular media y varianza para cada característica por clase
       PARA cada clase k:
           X_k ← subconjunto de X donde y = k
           
           PARA j = 1 HASTA n_características:
               medias[k][j] ← media(X_k[:, j])
               varianzas[k][j] ← varianza(X_k[:, j]) + ε
               // Añadir pequeño ε para prevenir división por cero
    
    4. DEVOLVER priors_clase, medias, varianzas

VEROSIMILITUD GAUSSIANA:
    P(x_j | C_k) = (1 / √(2π σ²_kj)) × exp(-(x_j - μ_kj)² / (2σ²_kj))
```

### Entrenamiento: Naive Bayes Multinomial

Para características de conteo discreto (ej., conteos de palabras en texto):

```
ALGORITMO: Entrenamiento Naive Bayes Multinomial
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características de entrenamiento (conteos) (n_muestras, n_características)
    y: Etiquetas de entrenamiento
    α: Parámetro de suavizado (suavizado de Laplace, por defecto = 1)

SALIDA:
    priors_clase: Probabilidad prior para cada clase
    log_probs_características: Log probabilidad de cada característica dada la clase

PROCEDIMIENTO:
    1. // Calcular priors de clase
       PARA cada clase k:
           n_k ← contar muestras donde y = k
           priors_clase[k] ← n_k / n
    
    2. // Calcular probabilidades de características con suavizado de Laplace
       PARA cada clase k:
           X_k ← subconjunto de X donde y = k
           
           // Conteo total de todas las características en clase k
           conteo_total_k ← Σ X_k
           
           PARA j = 1 HASTA n_características:
               conteo_j_k ← Σ X_k[:, j]  // Suma de característica j en clase k
               
               // Probabilidad suavizada
               log_probs_características[k][j] ← log((conteo_j_k + α) / 
                                              (conteo_total_k + α × n_características))
    
    3. DEVOLVER priors_clase, log_probs_características
```

### Entrenamiento: Naive Bayes Bernoulli

Para características binarias:

```
ALGORITMO: Entrenamiento Naive Bayes Bernoulli
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características binarias (n_muestras, n_características)
    y: Etiquetas de entrenamiento
    α: Parámetro de suavizado (por defecto = 1)

SALIDA:
    priors_clase: Probabilidad prior para cada clase
    probs_características: P(x_j = 1 | C_k) para cada característica y clase

PROCEDIMIENTO:
    PARA cada clase k:
        X_k ← subconjunto de X donde y = k
        n_k ← contar muestras en X_k
        
        PARA j = 1 HASTA n_características:
            // Contar ocurrencias de característica j = 1 en clase k
            conteo_j_k ← suma(X_k[:, j])
            
            // Probabilidad suavizada
            probs_características[k][j] ← (conteo_j_k + α) / (n_k + 2α)
    
    DEVOLVER priors_clase, probs_características

VEROSIMILITUD BERNOULLI (incluye ausencia de características):
    P(x | C_k) = Π_j [P(j|k)^x_j × (1 - P(j|k))^(1-x_j)]
```

## Fundamento Matemático

### La Suposición de Independencia Ingenua

La suposición "ingenua" es que las características son condicionalmente independientes dada la clase:

$$P(x_1, x_2, \ldots, x_n | C_k) = \prod_{j=1}^{n} P(x_j | C_k)$$

Esta simplificación hace el algoritmo computacionalmente tratable:

$$P(C_k | x) \propto P(C_k) \prod_{j=1}^{n} P(x_j | C_k)$$

### Log-Probabilidad para Estabilidad Numérica

Para evitar underflow con muchas características:

$$\log P(C_k | x) \propto \log P(C_k) + \sum_{j=1}^{n} \log P(x_j | C_k)$$

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Entrenamiento | $O(n \cdot m \cdot k)$ | $O(m \cdot k)$ |
| Predicción | $O(m \cdot k)$ | $O(k)$ |

Donde $n$ = muestras, $m$ = características, $k$ = clases.

## Puntos Clave

1. **Velocidad**: Entrenamiento y predicción extremadamente rápidos—escala linealmente.

2. **Suposición de Independencia**: ¡A menudo violada en la práctica, pero el algoritmo sigue funcionando bien!

3. **Problema de Frecuencia Cero**: El suavizado de Laplace previene probabilidades cero.

4. **Clasificación de Texto**: Naive Bayes Multinomial es particularmente efectivo para clasificación de documentos.

5. **Calibración**: Las probabilidades a menudo están mal calibradas; usa regresión isotónica si la calibración importa.

## Referencias

- **Mitchell, T.** (1997). *Machine Learning*, Capítulo 6. McGraw-Hill. 🇬🇧
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 6. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
- **Documentación de scikit-learn**: Naive Bayes. [https://scikit-learn.org/stable/modules/naive_bayes.html](https://scikit-learn.org/stable/modules/naive_bayes.html) 🇬🇧
- **Rish, I.** (2001). *An empirical study of the naive Bayes classifier*. IJCAI Workshop on Empirical Methods in AI. 🇬🇧
