---
title: "📝 Pseudocódigo de K-Vecinos Más Cercanos (KNN)"
weight: 80
description: "El algoritmo de aprendizaje basado en instancias: clasificar por la sabiduría de los vecinos."
date: 
draft: false
slug: "pseudocodigo-knn"
---

K-Vecinos Más Cercanos (KNN) es uno de los algoritmos de aprendizaje automático más simples pero poderosos. Es un método no paramétrico basado en instancias que hace predicciones basándose en la similitud con ejemplos de entrenamiento.

## El Algoritmo

### Clasificación KNN

```
ALGORITMO: Clasificación K-Vecinos Más Cercanos
─────────────────────────────────────────────────────────────────

ENTRADA:
    X_train: Matriz de características de entrenamiento (n_muestras, n_características)
    y_train: Etiquetas de entrenamiento (n_muestras,)
    x_consulta: Nueva muestra a clasificar (n_características,)
    k: Número de vecinos a considerar
    métrica_distancia: Función para calcular distancia (por defecto: Euclidiana)

SALIDA:
    clase_predicha: La etiqueta de clase predicha
    probabilidades: Distribución de probabilidad por clase (opcional)

PROCEDIMIENTO:
    1. // Calcular distancias a todas las muestras de entrenamiento
       distancias ← lista vacía
       PARA i = 1 HASTA n_muestras:
           d ← métrica_distancia(x_consulta, X_train[i])
           AÑADIR (d, y_train[i], i) a distancias
    
    2. // Ordenar por distancia (ascendente)
       ORDENAR distancias por primer elemento
    
    3. // Seleccionar k vecinos más cercanos
       k_vecinos ← primeros k elementos de distancias
    
    4. // Extraer etiquetas de los k vecinos más cercanos
       etiquetas_vecinos ← [etiqueta para (_, etiqueta, _) en k_vecinos]
    
    5. // Votación por mayoría
       conteo_clases ← contar ocurrencias de cada clase en etiquetas_vecinos
       clase_predicha ← clase con conteo máximo
    
    6. // Calcular probabilidades (opcional)
       probabilidades ← conteo_clases / k
    
    7. DEVOLVER clase_predicha, probabilidades
```

### Regresión KNN

```
ALGORITMO: Regresión K-Vecinos Más Cercanos
─────────────────────────────────────────────────────────────────

ENTRADA:
    X_train: Matriz de características de entrenamiento (n_muestras, n_características)
    y_train: Valores objetivo de entrenamiento (n_muestras,)
    x_consulta: Nueva muestra a predecir
    k: Número de vecinos a considerar
    métrica_distancia: Función para calcular distancia
    ponderación: 'uniforme' o 'distancia'

SALIDA:
    valor_predicho: El valor continuo predicho

PROCEDIMIENTO:
    1. // Calcular distancias a todas las muestras de entrenamiento
       distancias ← lista vacía
       PARA i = 1 HASTA n_muestras:
           d ← métrica_distancia(x_consulta, X_train[i])
           AÑADIR (d, y_train[i]) a distancias
    
    2. // Ordenar por distancia (ascendente)
       ORDENAR distancias por primer elemento
    
    3. // Seleccionar k vecinos más cercanos
       k_vecinos ← primeros k elementos de distancias
    
    4. SI ponderación = 'uniforme':
           // Promedio simple
           valor_predicho ← media([y para (_, y) en k_vecinos])
       
       SINO SI ponderación = 'distancia':
           // Promedio ponderado (distancia inversa)
           pesos ← [1/d para (d, _) en k_vecinos]
           // Manejar d=0: establecer peso a número muy grande
           valores ← [y para (_, y) en k_vecinos]
           valor_predicho ← Σ(pesos[i] × valores[i]) / Σ(pesos)
    
    5. DEVOLVER valor_predicho
```

### Métricas de Distancia Comunes

```
FUNCIÓN: Métricas de Distancia
─────────────────────────────────────────────────────────────────

Distancia Euclidiana (L2):
    d(x, y) = √(Σᵢ (xᵢ - yᵢ)²)

Distancia Manhattan (L1):
    d(x, y) = Σᵢ |xᵢ - yᵢ|

Distancia Minkowski (Lp):
    d(x, y) = (Σᵢ |xᵢ - yᵢ|ᵖ)^(1/p)

Distancia Coseno:
    d(x, y) = 1 - (x · y) / (||x|| × ||y||)

Distancia Hamming (para categóricas):
    d(x, y) = Σᵢ 𝟙(xᵢ ≠ yᵢ)
```

## KNN Optimizado con KD-Tree

Para conjuntos de datos grandes, usamos estructuras de datos espaciales para acelerar la búsqueda de vecinos:

```
ALGORITMO: KNN con KD-Tree
─────────────────────────────────────────────────────────────────

CONSTRUIR KD-TREE:
    FUNCIÓN construir_kdtree(puntos, profundidad=0):
        SI puntos está vacío:
            DEVOLVER nulo
        
        eje ← profundidad MOD n_características
        
        ORDENAR puntos por dimensión del eje
        índice_mediana ← longitud(puntos) / 2
        
        DEVOLVER Nodo(
            punto: puntos[índice_mediana],
            izquierdo: construir_kdtree(puntos[:índice_mediana], profundidad + 1),
            derecho: construir_kdtree(puntos[índice_mediana+1:], profundidad + 1)
        )

BUSCAR K-VECINOS:
    FUNCIÓN buscar_knn(nodo, consulta, k, profundidad=0, heap=vacío):
        SI nodo es nulo:
            DEVOLVER heap
        
        // Añadir nodo actual a candidatos
        d ← distancia(consulta, nodo.punto)
        SI tamaño(heap) < k:
            insertar (d, nodo.punto) en heap
        SINO SI d < distancia_máxima en heap:
            reemplazar máximo en heap con (d, nodo.punto)
        
        eje ← profundidad MOD n_características
        diff ← consulta[eje] - nodo.punto[eje]
        
        // Buscar primero el lado que contiene la consulta
        SI diff < 0:
            primero, segundo ← nodo.izquierdo, nodo.derecho
        SINO:
            primero, segundo ← nodo.derecho, nodo.izquierdo
        
        buscar_knn(primero, consulta, k, profundidad + 1, heap)
        
        // Verificar si necesitamos buscar el otro lado
        SI tamaño(heap) < k O |diff| < distancia_máxima en heap:
            buscar_knn(segundo, consulta, k, profundidad + 1, heap)
        
        DEVOLVER heap
```

## Análisis de Complejidad

| Operación | Fuerza Bruta | KD-Tree (balanceado) | Ball Tree |
|-----------|--------------|---------------------|-----------|
| Entrenamiento | $O(1)$ | $O(n \log n)$ | $O(n \log n)$ |
| Consulta | $O(n \cdot m)$ | $O(k \log n)$ promedio | $O(k \log n)$ promedio |
| Espacio | $O(n \cdot m)$ | $O(n)$ | $O(n)$ |

Donde $n$ = muestras, $m$ = características, $k$ = vecinos.

**Nota**: Los KD-Trees degradan a $O(n)$ en altas dimensiones (maldición de la dimensionalidad).

## Elegir K

```
ALGORITMO: Validación Cruzada para Selección de K
─────────────────────────────────────────────────────────────────

ENTRADA:
    X, y: Conjunto de datos
    rango_k: Lista de valores k a probar (ej., [1, 3, 5, 7, 9, ...])
    n_pliegues: Número de pliegues de validación cruzada

PROCEDIMIENTO:
    mejor_k ← 1
    mejor_puntuación ← -∞
    
    PARA k en rango_k:
        puntuaciones ← validación_cruzada(KNN(k), X, y, n_pliegues)
        puntuación_media ← promedio(puntuaciones)
        
        SI puntuación_media > mejor_puntuación:
            mejor_puntuación ← puntuación_media
            mejor_k ← k
    
    DEVOLVER mejor_k
```

## Puntos Clave

1. **Aprendizaje Perezoso**: No hay fase de entrenamiento explícita; todo el cálculo ocurre en tiempo de predicción.

2. **Escalado de Características**: ¡Esencial! Las características con rangos más grandes dominan los cálculos de distancia.

3. **Maldición de la Dimensionalidad**: El rendimiento degrada en altas dimensiones; considera reducción de dimensionalidad.

4. **K Impar para Clasificación Binaria**: Evita empates en la votación.

5. **Votación Ponderada**: Dar más influencia a vecinos más cercanos frecuentemente mejora los resultados.

## Referencias

- **Cover, T., & Hart, P.** (1967). *Nearest neighbor pattern classification*. IEEE Transactions on Information Theory. [https://ieeexplore.ieee.org/document/1053964](https://ieeexplore.ieee.org/document/1053964) 🇬🇧
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 13. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
- **Documentación de scikit-learn**: KNeighborsClassifier. [https://scikit-learn.org/stable/modules/neighbors.html](https://scikit-learn.org/stable/modules/neighbors.html) 🇬🇧
- **Bentley, J. L.** (1975). *Multidimensional binary search trees used for associative searching*. Communications of the ACM. 🇬🇧
