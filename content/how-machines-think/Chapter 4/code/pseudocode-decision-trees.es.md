---
title: "📝 Pseudocódigo de Árboles de Decisión"
weight: 82
description: "El algoritmo que aprende reglas interpretables mediante particionamiento recursivo."
date: 
draft: false
slug: "pseudocodigo-arboles-decision"
---

Los Árboles de Decisión son modelos de aprendizaje automático interpretables que aprenden reglas de decisión de los datos particionando recursivamente el espacio de características. Forman la base de métodos de ensamble poderosos como Random Forests y Gradient Boosting.

## El Algoritmo

### Entrenamiento del Árbol de Decisión (ID3/CART)

```
ALGORITMO: Construcción del Árbol de Decisión (Recursivo)
─────────────────────────────────────────────────────────────────

ENTRADA:
    D: Conjunto de datos con características X y etiquetas y
    características: Conjunto de características disponibles para dividir
    max_profundidad: Profundidad máxima del árbol (criterio de parada)
    min_muestras_división: Muestras mínimas requeridas para dividir un nodo
    criterio: Criterio de división ('gini', 'entropia', o 'mse')

SALIDA:
    árbol: Árbol de decisión entrenado

FUNCIÓN construir_árbol(D, características, profundidad):
    
    1. // Verificar condiciones de parada
       SI profundidad ≥ max_profundidad O
          |D| < min_muestras_división O
          todas las etiquetas en D son iguales O
          características está vacío:
           
           // Crear nodo hoja
           SI clasificación:
               DEVOLVER NodoHoja(predicción = clase_mayoritaria(D))
           SINO:  // regresión
               DEVOLVER NodoHoja(predicción = media(D.y))
    
    2. // Encontrar la mejor división
       mejor_ganancia ← -∞
       mejor_característica ← Ninguna
       mejor_umbral ← Ninguno
       
       PARA cada característica f en características:
           umbrales ← valores únicos o divisiones candidatas para f
           
           PARA cada umbral t en umbrales:
               // Dividir datos
               D_izq ← muestras donde X[f] ≤ t
               D_der ← muestras donde X[f] > t
               
               // Saltar divisiones inválidas
               SI |D_izq| = 0 O |D_der| = 0:
                   CONTINUAR
               
               // Calcular ganancia de información
               ganancia ← calcular_ganancia(D, D_izq, D_der, criterio)
               
               SI ganancia > mejor_ganancia:
                   mejor_ganancia ← ganancia
                   mejor_característica ← f
                   mejor_umbral ← t
    
    3. // Si no se encuentra división válida, crear hoja
       SI mejor_característica es Ninguna:
           DEVOLVER NodoHoja(predicción = clase_mayoritaria(D) o media(D.y))
    
    4. // Crear nodo interno y recurrir
       D_izq ← muestras donde X[mejor_característica] ≤ mejor_umbral
       D_der ← muestras donde X[mejor_característica] > mejor_umbral
       
       hijo_izq ← construir_árbol(D_izq, características, profundidad + 1)
       hijo_der ← construir_árbol(D_der, características, profundidad + 1)
       
       DEVOLVER NodoDecisión(
           característica = mejor_característica,
           umbral = mejor_umbral,
           izquierdo = hijo_izq,
           derecho = hijo_der
       )

PRINCIPAL:
    DEVOLVER construir_árbol(D, todas_características, profundidad = 0)
```

### Criterios de División

```
FUNCIÓN: Medidas de Impureza y Ganancia de Información
─────────────────────────────────────────────────────────────────

IMPUREZA GINI (Clasificación):
    Gini(D) = 1 - Σₖ pₖ²
    
    donde pₖ = proporción de la clase k en D

ENTROPÍA (Clasificación):
    Entropía(D) = -Σₖ pₖ log₂(pₖ)
    
    donde pₖ = proporción de la clase k en D

ERROR CUADRÁTICO MEDIO (Regresión):
    MSE(D) = (1/|D|) Σᵢ (yᵢ - ȳ)²
    
    donde ȳ = media de los valores y en D

GANANCIA DE INFORMACIÓN:
    Ganancia(D, división) = Impureza(D) - prom_ponderado(Impureza(D_izq), Impureza(D_der))
    
    prom_ponderado = (|D_izq|/|D|) × Impureza(D_izq) + 
                     (|D_der|/|D|) × Impureza(D_der)
```

### Predicción

```
ALGORITMO: Predicción del Árbol de Decisión
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Vector de características de la muestra
    árbol: Árbol de decisión entrenado

SALIDA:
    predicción: Clase o valor predicho

FUNCIÓN predecir(x, nodo):
    
    // Caso base: llegamos a una hoja
    SI nodo es NodoHoja:
        DEVOLVER nodo.predicción
    
    // Caso recursivo: atravesar según la división
    SI x[nodo.característica] ≤ nodo.umbral:
        DEVOLVER predecir(x, nodo.izquierdo)
    SINO:
        DEVOLVER predecir(x, nodo.derecho)

PRINCIPAL:
    DEVOLVER predecir(x, árbol.raíz)
```

### Poda (Post-Entrenamiento)

```
ALGORITMO: Poda por Complejidad de Coste (Poda de Complejidad Mínima)
─────────────────────────────────────────────────────────────────

ENTRADA:
    árbol: Árbol de decisión completamente crecido
    X_val, y_val: Conjunto de validación
    α: Parámetro de complejidad (fuerza de regularización)

PROCEDIMIENTO:
    1. // Calcular complejidad de coste para cada subárbol
       PARA cada nodo interno en árbol (de abajo hacia arriba):
           
           // Coste de mantener subárbol
           R(subárbol) ← tasa_clasificación_errónea(subárbol, X_val, y_val)
           |hojas| ← número de hojas en subárbol
           
           // Coste de podar a una sola hoja
           R(hoja) ← tasa_clasificación_errónea(predicción_mayoritaria, X_val, y_val)
           
           // Alpha efectivo para este nodo
           α_eff ← (R(hoja) - R(subárbol)) / (|hojas| - 1)
           
           // Podar si el coste de complejidad excede el beneficio
           SI α_eff ≤ α:
               Reemplazar subárbol con nodo hoja
    
    2. DEVOLVER árbol podado
```

## Fundamento Matemático

### Impureza Gini

Para un nodo con $K$ clases y proporción $p_k$ de la clase $k$:

$$\text{Gini}(D) = 1 - \sum_{k=1}^{K} p_k^2$$

- Gini = 0 significa pureza perfecta (todas las muestras pertenecen a una clase)
- Gini máximo = $1 - 1/K$ (distribución uniforme entre clases)

### Ganancia de Información (basada en Entropía)

$$\text{Ganancia}(D, A) = H(D) - \sum_{v \in \text{valores}(A)} \frac{|D_v|}{|D|} H(D_v)$$

Donde la entropía:
$$H(D) = -\sum_{k=1}^{K} p_k \log_2(p_k)$$

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Entrenamiento | $O(n \cdot m \cdot \log n \cdot d)$ | $O(d)$ nodos |
| Predicción | $O(d)$ | $O(1)$ |

Donde $n$ = muestras, $m$ = características, $d$ = profundidad del árbol.

## Manejo de Diferentes Tipos de Características

```
CARACTERÍSTICAS CATEGÓRICAS:
    Opción 1: Una división por valor de categoría
    Opción 2: División binaria (subconjunto vs. complemento)
    
VALORES FALTANTES:
    Opción 1: Divisiones sustitutas (usar características correlacionadas)
    Opción 2: Instancias fraccionarias (enviar fracción por cada rama)
    Opción 3: Categoría separada para valores faltantes
```

## Puntos Clave

1. **Interpretabilidad**: Los árboles pueden visualizarse y explicarse a no expertos.

2. **Sin Escalado de Características**: Los árboles son invariantes a transformaciones monótonas.

3. **Sobreajuste**: Árboles profundos sobreajustan; usar poda, max_profundidad o ensambles.

4. **Inestabilidad**: Pequeños cambios en datos pueden producir árboles muy diferentes.

5. **Divisiones Alineadas a Ejes**: Los árboles estándar crean fronteras de decisión rectangulares.

6. **Sesgo-Varianza**: Árboles poco profundos → alto sesgo; árboles profundos → alta varianza.

## Referencias

- **Breiman, L., Friedman, J., Olshen, R., & Stone, C.** (1984). *Classification and Regression Trees*. Wadsworth. 🇬🇧
- **Quinlan, J. R.** (1986). *Induction of Decision Trees*. Machine Learning, 1(1), 81-106. 🇬🇧
- **Quinlan, J. R.** (1993). *C4.5: Programs for Machine Learning*. Morgan Kaufmann. 🇬🇧
- **Documentación de scikit-learn**: Árboles de Decisión. [https://scikit-learn.org/stable/modules/tree.html](https://scikit-learn.org/stable/modules/tree.html) 🇬🇧
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 9. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
