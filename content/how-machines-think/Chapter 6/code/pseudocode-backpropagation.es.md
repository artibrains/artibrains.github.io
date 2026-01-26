---
title: "📝 Pseudocódigo del Algoritmo de Backpropagation"
weight: 81
description: "El motor del aprendizaje profundo: cómo las redes neuronales aprenden mediante propagación de gradientes."
date: 
draft: false
slug: "pseudocodigo-backpropagation"
---

Backpropagation (retropropagación de errores) es el algoritmo fundamental que permite a las redes neuronales aprender. Calcula eficientemente los gradientes de la función de pérdida respecto a cada peso en la red usando la regla de la cadena del cálculo.

## El Algoritmo

### Paso Hacia Adelante de la Red Neuronal

```
ALGORITMO: Propagación Hacia Adelante
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Vector de entrada de forma (n_entrada,)
    W: Lista de matrices de pesos [W¹, W², ..., Wᴸ]
    b: Lista de vectores de sesgo [b¹, b², ..., bᴸ]
    activaciones: Lista de funciones de activación [σ¹, σ², ..., σᴸ]

SALIDA:
    a: Lista de activaciones para cada capa [a⁰, a¹, ..., aᴸ]
    z: Lista de pre-activaciones para cada capa [z¹, z², ..., zᴸ]

PROCEDIMIENTO:
    a[0] ← x  // La entrada es la primera "activación"
    L ← número de capas
    
    PARA l = 1 HASTA L:
        // Transformación lineal
        z[l] ← W[l] · a[l-1] + b[l]
        
        // Aplicar función de activación
        a[l] ← σ[l](z[l])
    
    DEVOLVER a, z
```

### Algoritmo de Backpropagation

```
ALGORITMO: Backpropagation
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Muestra de entrada
    y: Salida objetivo
    W, b: Pesos y sesgos de la red
    activaciones: Funciones de activación para cada capa
    función_pérdida: Función de pérdida (ej., MSE, entropía cruzada)

SALIDA:
    ∂L/∂W: Gradientes para todas las matrices de pesos
    ∂L/∂b: Gradientes para todos los vectores de sesgo

PROCEDIMIENTO:
    L ← número de capas
    
    // ========== PASO HACIA ADELANTE ==========
    a, z ← propagación_adelante(x, W, b, activaciones)
    
    // ========== PASO HACIA ATRÁS ==========
    
    // Paso 1: Calcular error de capa de salida (δᴸ)
    // δᴸ = ∂L/∂aᴸ ⊙ σ'(zᴸ)
    
    ∂L/∂a[L] ← derivada_de_pérdida(a[L], y)  // ej., (a[L] - y) para MSE
    δ[L] ← ∂L/∂a[L] ⊙ σ'[L](z[L])            // ⊙ es multiplicación elemento a elemento
    
    // Paso 2: Retropropagar error a través de capas ocultas
    PARA l = L-1 DESCENDIENDO HASTA 1:
        // Propagar error hacia atrás: δˡ = (Wˡ⁺¹)ᵀ δˡ⁺¹ ⊙ σ'(zˡ)
        δ[l] ← (W[l+1]ᵀ · δ[l+1]) ⊙ σ'[l](z[l])
    
    // Paso 3: Calcular gradientes para pesos y sesgos
    PARA l = 1 HASTA L:
        ∂L/∂W[l] ← δ[l] ⊗ a[l-1]ᵀ   // Producto exterior
        ∂L/∂b[l] ← δ[l]
    
    DEVOLVER ∂L/∂W, ∂L/∂b
```

### Bucle de Entrenamiento Completo con Backpropagation

```
ALGORITMO: Entrenamiento de Red Neuronal con Backpropagation
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Datos de entrenamiento de forma (n_muestras, n_entrada)
    Y: Valores objetivo de forma (n_muestras, n_salida)
    arquitectura: Lista de tamaños de capa [n_entrada, n_oculta₁, ..., n_salida]
    tasa_aprendizaje: η
    n_épocas: Número de épocas de entrenamiento
    tamaño_lote: Tamaño del mini-lote

SALIDA:
    W, b: Pesos y sesgos entrenados

PROCEDIMIENTO:
    1. // Inicializar pesos (inicialización Xavier/He)
       PARA l = 1 HASTA L:
           W[l] ← normal_aleatoria(0, √(2/n_entrada)) × forma(n_salida, n_entrada)
           b[l] ← ceros(n_salida)
    
    2. // Bucle de entrenamiento
       PARA época = 1 HASTA n_épocas:
           
           // Barajar datos
           barajar(X, Y)
           
           // Entrenamiento por mini-lotes
           PARA cada lote (X_lote, Y_lote):
               
               // Inicializar acumuladores de gradiente
               ∂L/∂W_total ← [ceros_como(W[l]) para cada capa]
               ∂L/∂b_total ← [ceros_como(b[l]) para cada capa]
               
               // Acumular gradientes sobre el lote
               PARA cada (x, y) en (X_lote, Y_lote):
                   
                   // Backpropagation para muestra individual
                   ∂L/∂W, ∂L/∂b ← backpropagation(x, y, W, b)
                   
                   // Acumular
                   PARA l = 1 HASTA L:
                       ∂L/∂W_total[l] ← ∂L/∂W_total[l] + ∂L/∂W[l]
                       ∂L/∂b_total[l] ← ∂L/∂b_total[l] + ∂L/∂b[l]
               
               // Promediar gradientes
               PARA l = 1 HASTA L:
                   ∂L/∂W_total[l] ← ∂L/∂W_total[l] / tamaño_lote
                   ∂L/∂b_total[l] ← ∂L/∂b_total[l] / tamaño_lote
               
               // Actualizar pesos (descenso del gradiente)
               PARA l = 1 HASTA L:
                   W[l] ← W[l] - η × ∂L/∂W_total[l]
                   b[l] ← b[l] - η × ∂L/∂b_total[l]
    
    3. DEVOLVER W, b
```

### Funciones de Activación Comunes y Sus Derivadas

```
FUNCIÓN: Funciones de Activación y Derivadas
─────────────────────────────────────────────────────────────────

SIGMOIDE:
    σ(z) = 1 / (1 + exp(-z))
    σ'(z) = σ(z) × (1 - σ(z))

TANH:
    σ(z) = (exp(z) - exp(-z)) / (exp(z) + exp(-z))
    σ'(z) = 1 - σ(z)²

ReLU (Unidad Lineal Rectificada):
    σ(z) = max(0, z)
    σ'(z) = { 1  si z > 0
            { 0  si z ≤ 0

LEAKY ReLU:
    σ(z) = { z        si z > 0
           { α × z    si z ≤ 0    (α típicamente 0.01)
    σ'(z) = { 1  si z > 0
            { α  si z ≤ 0

SOFTMAX (para capa de salida con múltiples clases):
    σ(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ)
    // El Jacobiano es más complejo; a menudo se combina con pérdida de entropía cruzada
```

### Funciones de Pérdida

```
FUNCIÓN: Funciones de Pérdida Comunes y Sus Gradientes
─────────────────────────────────────────────────────────────────

ERROR CUADRÁTICO MEDIO (Regresión):
    L(ŷ, y) = (1/2) × ||ŷ - y||²
    ∂L/∂ŷ = ŷ - y

ENTROPÍA CRUZADA BINARIA (Clasificación Binaria):
    L(ŷ, y) = -[y log(ŷ) + (1-y) log(1-ŷ)]
    ∂L/∂ŷ = -y/ŷ + (1-y)/(1-ŷ)
    
    // Con salida sigmoide, se simplifica a:
    ∂L/∂z = ŷ - y

ENTROPÍA CRUZADA CATEGÓRICA (Multiclase):
    L(ŷ, y) = -Σᵢ yᵢ log(ŷᵢ)
    
    // Con salida softmax:
    ∂L/∂z = ŷ - y  (donde y está codificado one-hot)
```

## Fundamento Matemático

### La Regla de la Cadena

Backpropagation es una aplicación eficiente de la regla de la cadena:

$$\frac{\partial L}{\partial w_{ij}^{(l)}} = \frac{\partial L}{\partial a_j^{(l)}} \cdot \frac{\partial a_j^{(l)}}{\partial z_j^{(l)}} \cdot \frac{\partial z_j^{(l)}}{\partial w_{ij}^{(l)}}$$

### La Señal de Error (δ)

Definimos la señal de error en la capa $l$:

$$\delta_j^{(l)} = \frac{\partial L}{\partial z_j^{(l)}}$$

### Ecuaciones de Backpropagation

Para la capa de salida $L$:
$$\delta^{(L)} = \nabla_a L \odot \sigma'(z^{(L)})$$

Para capas ocultas:
$$\delta^{(l)} = ((W^{(l+1)})^T \delta^{(l+1)}) \odot \sigma'(z^{(l)})$$

Gradientes:
$$\frac{\partial L}{\partial W^{(l)}} = \delta^{(l)} (a^{(l-1)})^T$$
$$\frac{\partial L}{\partial b^{(l)}} = \delta^{(l)}$$

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Paso adelante | $O(\sum_l n_l \times n_{l-1})$ | $O(\sum_l n_l)$ |
| Paso atrás | $O(\sum_l n_l \times n_{l-1})$ | $O(\sum_l n_l)$ |
| Época completa | $O(N \times \sum_l n_l \times n_{l-1})$ | $O(\sum_l n_l^2)$ |

Donde $N$ = muestras, $n_l$ = neuronas en capa $l$.

## Problemas Comunes y Soluciones

```
GRADIENTES QUE SE DESVANECEN:
    Problema: Los gradientes se vuelven muy pequeños en redes profundas (especialmente con sigmoid/tanh)
    Soluciones:
    - Usar activación ReLU
    - Usar normalización por lotes (batch normalization)
    - Usar conexiones residuales (skip connections)
    - Inicialización de pesos adecuada

GRADIENTES QUE EXPLOTAN:
    Problema: Los gradientes se vuelven muy grandes, causando entrenamiento inestable
    Soluciones:
    - Recorte de gradientes: ||g|| ← min(||g||, umbral) × (g/||g||)
    - Tasa de aprendizaje más baja
    - Inicialización de pesos adecuada

NEURONAS MUERTAS (ReLU):
    Problema: ReLU produce 0 para todas las entradas → gradiente = 0 → neurona nunca se actualiza
    Soluciones:
    - Usar Leaky ReLU o ELU
    - Inicialización de pesos cuidadosa
    - Tasa de aprendizaje más baja
```

## Puntos Clave

1. **Eficiencia**: Backprop calcula todos los gradientes en tiempo $O(W)$, donde $W$ es el número de pesos—¡igual que un paso hacia adelante!

2. **Programación Dinámica**: Backprop es esencialmente programación dinámica, reutilizando cálculos intermedios.

3. **Diferenciación Automática**: Los frameworks modernos (PyTorch, TensorFlow) implementan backprop automáticamente.

4. **Asignación de Crédito**: Backprop resuelve el problema de asignación de crédito—determinar cuánto contribuyó cada peso al error.

5. **Localidad**: Cada actualización de peso depende solo de información local (activaciones conectadas y señal de error entrante).

## Referencias

- **Rumelhart, D. E., Hinton, G. E., & Williams, R. J.** (1986). *Learning representations by back-propagating errors*. Nature, 323, 533-536. 🇬🇧
- **Goodfellow, I., Bengio, Y., & Courville, A.** (2016). *Deep Learning*, Capítulo 6. MIT Press. [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/) 🇬🇧
- **Nielsen, M.** (2015). *Neural Networks and Deep Learning*, Capítulo 2. [http://neuralnetworksanddeeplearning.com/](http://neuralnetworksanddeeplearning.com/) 🇬🇧
- **LeCun, Y., Bottou, L., Orr, G. B., & Müller, K.-R.** (1998). *Efficient BackProp*. En Neural Networks: Tricks of the Trade. 🇬🇧
- **Glorot, X., & Bengio, Y.** (2010). *Understanding the difficulty of training deep feedforward neural networks*. AISTATS. 🇬🇧
