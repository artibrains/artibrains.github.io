---
title: "📝 Pseudocódigo del Algoritmo de Entrenamiento del Perceptrón"
weight: 80
description: "El algoritmo fundamental de redes neuronales: el bloque de construcción del aprendizaje profundo moderno."
date: 
draft: false
slug: "pseudocodigo-perceptron"
---

El Perceptrón es la forma más simple de una red neuronal—una única neurona artificial que aprende a clasificar datos linealmente separables. Inventado por Frank Rosenblatt en 1958, sentó las bases de todas las redes neuronales modernas.

## El Algoritmo

### Modelo del Perceptrón

```
PERCEPTRÓN: Neurona Artificial Simple
─────────────────────────────────────────────────────────────────

ESTRUCTURA:
    Entradas:    x = [x₁, x₂, ..., xₙ]
    Pesos:       w = [w₁, w₂, ..., wₙ]
    Sesgo:       b (o w₀ con x₀ = 1)
    Activación:  Función escalón

PASO HACIA ADELANTE:
    1. Calcular suma ponderada:
       z = Σᵢ (wᵢ × xᵢ) + b = w · x + b
    
    2. Aplicar función de activación:
       ŷ = escalón(z) = { 1  si z ≥ 0
                        { 0  si z < 0

    // Alternativa: usar etiquetas {-1, +1}
       ŷ = signo(z) = { +1  si z ≥ 0
                      { -1  si z < 0
```

### Algoritmo de Aprendizaje del Perceptrón

```
ALGORITMO: Entrenamiento del Perceptrón
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Datos de entrenamiento de forma (n_muestras, n_características)
    y: Etiquetas binarias {0, 1} o {-1, +1} de forma (n_muestras,)
    η: Tasa de aprendizaje (por defecto: 1.0)
    max_épocas: Número máximo de pasadas sobre los datos

SALIDA:
    w: Vector de pesos aprendido
    b: Término de sesgo aprendido

PROCEDIMIENTO:
    1. Inicializar pesos y sesgo:
       w ← ceros(n_características)  // o valores aleatorios pequeños
       b ← 0
    
    2. PARA época = 1 HASTA max_épocas:
           
           errores ← 0
           
           PARA cada muestra de entrenamiento (xᵢ, yᵢ):
               
               // Calcular predicción
               z ← w · xᵢ + b
               ŷ ← escalón(z)  // o signo(z)
               
               // Actualizar solo si está mal clasificado
               SI ŷ ≠ yᵢ:
                   
                   // Regla de actualización (Regla de Aprendizaje del Perceptrón)
                   // Para etiquetas {0, 1}:
                   w ← w + η × (yᵢ - ŷ) × xᵢ
                   b ← b + η × (yᵢ - ŷ)
                   
                   // Equivalentemente, para etiquetas {-1, +1}:
                   // w ← w + η × yᵢ × xᵢ
                   // b ← b + η × yᵢ
                   
                   errores ← errores + 1
           
           // Verificar convergencia
           SI errores = 0:
               IMPRIMIR "Convergido en época", época
               ROMPER
    
    3. DEVOLVER w, b
```

### Predicción del Perceptrón

```
ALGORITMO: Predicción del Perceptrón
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Nueva muestra de forma (n_características,)
    w: Pesos entrenados
    b: Sesgo entrenado

SALIDA:
    clase_predicha: {0, 1} o {-1, +1}

PROCEDIMIENTO:
    z ← w · x + b
    
    SI z ≥ 0:
        DEVOLVER 1  // o +1
    SINO:
        DEVOLVER 0  // o -1
```

### Algoritmo Pocket (Manejo de Datos No Separables)

```
ALGORITMO: Perceptrón Pocket
─────────────────────────────────────────────────────────────────

// Guarda los mejores pesos encontrados hasta ahora en un "bolsillo"
// Útil cuando los datos no son linealmente separables

ENTRADA:
    X, y: Datos de entrenamiento
    η: Tasa de aprendizaje
    max_iteraciones: Actualizaciones máximas

SALIDA:
    w_pocket: Mejores pesos encontrados
    b_pocket: Mejor sesgo encontrado

PROCEDIMIENTO:
    w ← ceros(n_características)
    b ← 0
    
    w_pocket ← w
    b_pocket ← b
    mejor_precisión ← 0
    
    PARA iteración = 1 HASTA max_iteraciones:
        
        // Seleccionar muestra mal clasificada aleatoria
        mal_clasificados ← [i para i donde predecir(xᵢ) ≠ yᵢ]
        
        SI mal_clasificados está vacío:
            ROMPER  // Clasificación perfecta
        
        // Elegir punto mal clasificado aleatorio
        i ← elección_aleatoria(mal_clasificados)
        
        // Actualización del perceptrón
        w ← w + η × yᵢ × xᵢ
        b ← b + η × yᵢ
        
        // Verificar si este es el mejor hasta ahora
        precisión ← contar_correctos(X, y, w, b) / n_muestras
        
        SI precisión > mejor_precisión:
            w_pocket ← w
            b_pocket ← b
            mejor_precisión ← precisión
    
    DEVOLVER w_pocket, b_pocket
```

### Perceptrón Votado

```
ALGORITMO: Perceptrón Votado
─────────────────────────────────────────────────────────────────

// Almacena todos los vectores de pesos encontrados durante el entrenamiento
// Usa votación ponderada para predicción

ENTRENAMIENTO:
    lista_pesos ← lista vacía
    conteos_supervivencia ← lista vacía
    
    w ← ceros(n_características)
    b ← 0
    conteo ← 0
    
    PARA época = 1 HASTA max_épocas:
        PARA cada (xᵢ, yᵢ):
            SI signo(w · xᵢ + b) ≠ yᵢ:
                // Almacenar pesos actuales y su conteo de supervivencia
                AÑADIR (w, b) a lista_pesos
                AÑADIR conteo a conteos_supervivencia
                
                // Actualizar
                w ← w + yᵢ × xᵢ
                b ← b + yᵢ
                conteo ← 1
            SINO:
                conteo ← conteo + 1
    
    // No olvidar los últimos pesos
    AÑADIR (w, b) a lista_pesos
    AÑADIR conteo a conteos_supervivencia

PREDICCIÓN:
    voto ← 0
    PARA i = 1 HASTA longitud(lista_pesos):
        (wᵢ, bᵢ) ← lista_pesos[i]
        cᵢ ← conteos_supervivencia[i]
        voto ← voto + cᵢ × signo(wᵢ · x + bᵢ)
    
    DEVOLVER signo(voto)
```

## Fundamento Matemático

### Frontera de Decisión

El perceptrón define un hiperplano en el espacio de características:

$$w \cdot x + b = 0$$

Los puntos a un lado se clasifican como positivos, al otro como negativos:
- $w \cdot x + b > 0 \Rightarrow$ clase 1
- $w \cdot x + b < 0 \Rightarrow$ clase 0 (o -1)

### Teorema de Convergencia (Novikoff, 1962)

Para datos **linealmente separables**, el perceptrón converge en como máximo:

$$k \leq \left(\frac{R}{\gamma}\right)^2$$

iteraciones, donde:
- $R = \max_i ||x_i||$ (radio de los datos)
- $\gamma = \min_i y_i(w^* \cdot x_i + b^*)$ (margen del separador óptimo)

### Por Qué Funciona

La regla de actualización mueve la frontera de decisión para clasificar correctamente el punto mal clasificado:

$$w_{nuevo} = w_{anterior} + y \cdot x$$

- Si $y = +1$ y predijimos $-1$: Añadir $x$ aumenta $w \cdot x$
- Si $y = -1$ y predijimos $+1$: Restar $x$ disminuye $w \cdot x$

## La Limitación XOR

```
EL PROBLEMA XOR:
─────────────────────────────────────────────────────────────────

Tabla de Verdad XOR:
    x₁ | x₂ | y
    ───┼────┼───
    0  | 0  | 0
    0  | 1  | 1
    1  | 0  | 1
    1  | 1  | 0

PROBLEMA: ¡Ninguna línea puede separar las clases!

Esta limitación fue famosamente destacada por Minsky & Papert (1969),
llevando al primer "Invierno de la IA."

SOLUCIÓN: Los perceptrones multicapa (redes neuronales) con capas ocultas
pueden resolver XOR y otros problemas no linealmente separables.
```

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Una actualización | $O(m)$ | $O(m)$ |
| Entrenamiento completo | $O(k \cdot m)$ | $O(m)$ |
| Predicción | $O(m)$ | $O(1)$ |

Donde $m$ = características, $k$ = número de errores (≤ $(R/\gamma)^2$ para datos separables).

## Puntos Clave

1. **Convergencia Garantizada**: Para datos linealmente separables, el algoritmo siempre converge.

2. **Aprendizaje en Línea**: Actualiza pesos inmediatamente después de cada error—no necesita almacenar todos los datos.

3. **Dependencia del Margen**: La velocidad de convergencia depende del margen; mayor margen = convergencia más rápida.

4. **Datos No Separables**: El perceptrón básico oscila indefinidamente; usar variantes Pocket, Votado o Promediado.

5. **Bloque de Construcción**: Los perceptrones individuales son limitados, pero apilarlos crea redes neuronales poderosas.

6. **Ingeniería de Características**: El perceptrón puede resolver problemas no lineales si se le dan las características correctas.

## Referencias

- **Rosenblatt, F.** (1958). *The perceptron: A probabilistic model for information storage and organization in the brain*. Psychological Review. 🇬🇧
- **Novikoff, A. B. J.** (1962). *On convergence proofs on perceptrons*. Symposium on the Mathematical Theory of Automata. 🇬🇧
- **Minsky, M., & Papert, S.** (1969). *Perceptrons: An Introduction to Computational Geometry*. MIT Press. 🇬🇧
- **Freund, Y., & Schapire, R. E.** (1999). *Large Margin Classification Using the Perceptron Algorithm*. Machine Learning, 37(3), 277-296. 🇬🇧
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Capítulo 4. Springer. 🇬🇧
