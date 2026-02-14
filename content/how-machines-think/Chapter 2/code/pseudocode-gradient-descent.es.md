---
title: "📝 Pseudocódigo del Descenso del Gradiente"
weight: 65
description: "El algoritmo de optimización que impulsa el aprendizaje automático: entendiendo el descenso del gradiente paso a paso."
date: 
draft: false
slug: "pseudocodigo-descenso-gradiente"
---

El descenso del gradiente es el algoritmo de optimización fundamental en el aprendizaje automático. Ajusta iterativamente los parámetros para minimizar una función de coste siguiendo la dirección de mayor pendiente.

## El Algoritmo Principal

### Descenso del Gradiente por Lotes (Una Época)

```
ALGORITMO: Descenso del Gradiente por Lotes (Una Época)
─────────────────────────────────────────────────────────────────

ENTRADA:
    θ: Vector de parámetros actual
    X: Conjunto de datos completo (n_muestras, n_características)
    y: Valores objetivo (n_muestras,)
    α: Tasa de aprendizaje
    función_pérdida: Función para calcular la pérdida
    función_gradiente: Función para calcular el gradiente

SALIDA:
    θ: Vector de parámetros actualizado

PROCEDIMIENTO:
    1. Calcular predicciones para todas las muestras:
       ŷ ← predecir(X, θ)
    
    2. Calcular pérdida (opcional, para monitoreo):
       L ← función_pérdida(y, ŷ)
    
    3. Calcular gradiente sobre todo el conjunto de datos:
       ∇L ← función_gradiente(X, y, ŷ, θ)
    
    4. Actualizar parámetros:
       θ ← θ - α · ∇L
    
    5. DEVOLVER θ
```

### Bucle de Entrenamiento Completo

```
ALGORITMO: Entrenamiento con Descenso del Gradiente
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Datos de entrenamiento de forma (n_muestras, n_características)
    y: Valores objetivo de forma (n_muestras,)
    α: Tasa de aprendizaje (ej., 0.01)
    max_épocas: Número máximo de épocas
    tolerancia: Umbral de convergencia (ej., 1e-6)
    función_pérdida: Función para calcular la pérdida
    función_gradiente: Función para calcular el gradiente

SALIDA:
    θ: Vector de parámetros optimizado
    historial: Lista de valores de pérdida por época

PROCEDIMIENTO:
    1. Inicializar parámetros θ aleatoriamente o a ceros
    
    2. historial ← lista vacía
    
    3. PARA época = 1 HASTA max_épocas:
        
        a. // Paso hacia adelante: calcular predicciones
           ŷ ← predecir(X, θ)
        
        b. // Calcular y registrar pérdida
           L ← función_pérdida(y, ŷ)
           AÑADIR L a historial
        
        c. // Calcular gradiente
           ∇L ← función_gradiente(X, y, ŷ, θ)
        
        d. // Actualizar parámetros (paso del gradiente)
           θ ← θ - α · ∇L
        
        e. // Verificar convergencia
           SI ||∇L|| < tolerancia:
               IMPRIMIR "Convergido en época", época
               ROMPER
    
    4. DEVOLVER θ, historial
```

{{< gradient-descent-variants >}}

## Fundamento Matemático

Para una función de pérdida diferenciable $L(\theta)$, el descenso del gradiente actualiza los parámetros como:

$$\theta_{t+1} = \theta_t - \alpha \nabla_\theta L(\theta_t)$$

Donde:
- $\theta_t$ es el vector de parámetros en la iteración $t$
- $\alpha$ es la tasa de aprendizaje (tamaño del paso)
- $\nabla_\theta L$ es el gradiente de la pérdida respecto a los parámetros

### Condiciones de Convergencia

Para funciones convexas con gradientes Lipschitz-continuos, el descenso del gradiente converge cuando:

1. La tasa de aprendizaje satisface: $\alpha < \frac{2}{L}$ donde $L$ es la constante de Lipschitz
2. Para la tasa de convergencia: $L(\theta_t) - L(\theta^*) \leq \frac{\|\theta_0 - \theta^*\|^2}{2\alpha t}$

## Comparación de Variantes

| Variante | Frecuencia de Actualización | Convergencia | Uso de Memoria | Nivel de Ruido |
|----------|----------------------------|--------------|----------------|----------------|
| GD por Lotes | Una vez por época | Suave, estable | Alto | Bajo |
| SGD | Una vez por muestra | Ruidoso, puede escapar mínimos locales | Bajo | Alto |
| Mini-Lotes | Una vez por lote | Buen equilibrio | Medio | Medio |

## Hiperparámetros Clave

1. **Tasa de Aprendizaje (α)**: Muy alta → divergencia; muy baja → convergencia lenta
2. **Tamaño del Lote**: Mayor → más estable; menor → más ruido, mejor generalización
3. **Número de Épocas**: Suficientes para converger pero evitando sobreajuste

## Referencias

- **Ruder, S.** (2016). *An overview of gradient descent optimization algorithms*. arXiv:1609.04747. [https://arxiv.org/abs/1609.04747](https://arxiv.org/abs/1609.04747) 🇬🇧
- **Bottou, L.** (2010). *Large-Scale Machine Learning with Stochastic Gradient Descent*. COMPSTAT 2010. 🇬🇧
- **Goodfellow, I., Bengio, Y., & Courville, A.** (2016). *Deep Learning*, Capítulo 8. MIT Press. [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/) 🇬🇧
- **Stanford CS231n**: Notas sobre optimización. [https://cs231n.github.io/optimization-1/](https://cs231n.github.io/optimization-1/) 🇬🇧
