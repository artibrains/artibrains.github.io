---
title: "📝 Pseudocódigo de Bosques Aleatorios"
weight: 83
description: "El método de ensamble que combina múltiples árboles de decisión para predicciones robustas."
date: 
draft: false
slug: "pseudocodigo-bosques-aleatorios"
---

Bosques Aleatorios (Random Forests) es un poderoso método de aprendizaje por ensamble que construye múltiples árboles de decisión durante el entrenamiento y produce la moda (clasificación) o predicción media (regresión) de los árboles individuales. Reduce el sobreajuste y mejora la generalización comparado con árboles de decisión individuales.

## El Algoritmo

### Entrenamiento de Random Forest

```
ALGORITMO: Entrenamiento de Random Forest
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de características de entrenamiento (n_muestras, n_características)
    y: Etiquetas de entrenamiento (n_muestras,)
    n_árboles: Número de árboles en el bosque (ej., 100)
    max_características: Número de características a considerar en cada división
                  (por defecto: √n_características para clasificación, n_características/3 para regresión)
    max_profundidad: Profundidad máxima de cada árbol (opcional)
    min_muestras_división: Muestras mínimas para dividir un nodo
    bootstrap: Si usar muestreo bootstrap (por defecto: True)

SALIDA:
    bosque: Lista de árboles de decisión entrenados

PROCEDIMIENTO:
    bosque ← lista vacía
    
    PARA i = 1 HASTA n_árboles:
        
        1. // Crear muestra bootstrap (muestreo con reemplazo)
           SI bootstrap:
               índices ← muestrear_con_reemplazo(rango(n_muestras), tamaño=n_muestras)
               X_boot ← X[índices]
               y_boot ← y[índices]
           SINO:
               X_boot ← X
               y_boot ← y
        
        2. // Entrenar árbol de decisión con selección aleatoria de características
           árbol ← ÁrbolDecisión(
               max_profundidad = max_profundidad,
               min_muestras_división = min_muestras_división,
               max_características = max_características,  // CLAVE: Subconjunto aleatorio en cada división
               divisor = "subconjunto_aleatorio"
           )
           
           árbol.ajustar(X_boot, y_boot)
        
        3. AÑADIR árbol a bosque
    
    DEVOLVER bosque
```

### Construcción Modificada del Árbol (Selección Aleatoria de Características)

```
ALGORITMO: División del Árbol en Random Forest
─────────────────────────────────────────────────────────────────

Esto modifica la selección de división estándar del árbol de decisión:

FUNCIÓN encontrar_mejor_división(X, y, max_características):
    
    1. // Seleccionar aleatoriamente un subconjunto de características
       todas_características ← [0, 1, 2, ..., n_características-1]
       características_candidatas ← muestra_aleatoria(todas_características, tamaño=max_características, reemplazo=False)
    
    2. // Encontrar mejor división solo entre características candidatas
       mejor_ganancia ← -∞
       mejor_característica ← Ninguna
       mejor_umbral ← Ninguno
       
       PARA cada característica f en características_candidatas:  // ¡NO todas las características!
           PARA cada umbral t en umbrales_candidatos(f):
               ganancia ← calcular_ganancia_información(X, y, f, t)
               
               SI ganancia > mejor_ganancia:
                   mejor_ganancia ← ganancia
                   mejor_característica ← f
                   mejor_umbral ← t
    
    3. DEVOLVER mejor_característica, mejor_umbral
```

### Predicción de Random Forest

```
ALGORITMO: Predicción de Clasificación Random Forest
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Vector de características de la muestra
    bosque: Lista de árboles de decisión entrenados

SALIDA:
    clase_predicha: Clase final predicha
    probabilidades: Distribución de probabilidad por clase

PROCEDIMIENTO:
    1. // Recolectar predicciones de todos los árboles
       votos ← diccionario vacío
       
       PARA cada árbol en bosque:
           predicción ← árbol.predecir(x)
           votos[predicción] ← votos.obtener(predicción, 0) + 1
    
    2. // Votación por mayoría
       clase_predicha ← argmax(votos)
    
    3. // Calcular probabilidades
       total_votos ← suma(votos.valores())
       PARA cada clase c:
           probabilidades[c] ← votos.obtener(c, 0) / total_votos
    
    4. DEVOLVER clase_predicha, probabilidades


ALGORITMO: Predicción de Regresión Random Forest
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Vector de características de la muestra
    bosque: Lista de árboles de decisión entrenados

SALIDA:
    valor_predicho: Predicción promediada

PROCEDIMIENTO:
    predicciones ← lista vacía
    
    PARA cada árbol en bosque:
        pred ← árbol.predecir(x)
        AÑADIR pred a predicciones
    
    valor_predicho ← media(predicciones)
    
    DEVOLVER valor_predicho
```

### Estimación del Error Out-of-Bag (OOB)

```
ALGORITMO: Estimación del Error Out-of-Bag
─────────────────────────────────────────────────────────────────

// Las muestras OOB son aquellas NO incluidas en la muestra bootstrap de cada árbol
// Proporcionan una estimación de validación "gratuita"

PROCEDIMIENTO:
    predicciones_oob ← diccionario vacío  // índice_muestra → lista de predicciones
    
    PARA i, árbol en enumerar(bosque):
        // Encontrar muestras NO en la muestra bootstrap de este árbol
        índices_oob ← muestras no en muestra_bootstrap[i]
        
        PARA idx en índices_oob:
            pred ← árbol.predecir(X[idx])
            predicciones_oob[idx].añadir(pred)
    
    // Agregar predicciones OOB
    error_oob ← 0
    PARA idx en predicciones_oob:
        SI clasificación:
            pred_final ← voto_mayoría(predicciones_oob[idx])
        SINO:
            pred_final ← media(predicciones_oob[idx])
        
        SI pred_final ≠ y[idx]:
            error_oob ← error_oob + 1
    
    error_oob ← error_oob / n_muestras
    
    DEVOLVER error_oob
```

### Importancia de Características

```
ALGORITMO: Importancia de Características (Disminución Media de Impureza)
─────────────────────────────────────────────────────────────────

PROCEDIMIENTO:
    importancia_características ← ceros(n_características)
    
    PARA cada árbol en bosque:
        PARA cada nodo en árbol:
            SI nodo es interno (no hoja):
                // Disminución de impureza ponderada
                importancia ← (nodo.n_muestras / total_muestras) × 
                             (nodo.impureza - 
                              (izq.n_muestras/nodo.n_muestras) × izq.impureza -
                              (der.n_muestras/nodo.n_muestras) × der.impureza)
                
                importancia_características[nodo.característica] += importancia
    
    // Normalizar
    importancia_características ← importancia_características / suma(importancia_características)
    
    DEVOLVER importancia_características


ALGORITMO: Importancia de Características por Permutación
─────────────────────────────────────────────────────────────────

// Más confiable pero computacionalmente costoso

PROCEDIMIENTO:
    puntuación_base ← evaluar(bosque, X_test, y_test)
    
    PARA j = 1 HASTA n_características:
        X_permutado ← copiar(X_test)
        X_permutado[:, j] ← permutación_aleatoria(X_test[:, j])
        
        puntuación_permutada ← evaluar(bosque, X_permutado, y_test)
        
        importancia_características[j] ← puntuación_base - puntuación_permutada
    
    DEVOLVER importancia_características
```

## Fundamento Matemático

### Por Qué Funcionan los Random Forests

La idea clave es la **reducción de varianza mediante promediado**:

Para $B$ árboles independientes con varianza $\sigma^2$:
$$\text{Var}\left(\frac{1}{B}\sum_{b=1}^{B} T_b(x)\right) = \frac{\sigma^2}{B}$$

Pero los árboles de los mismos datos están correlacionados con correlación $\rho$:
$$\text{Var}\left(\frac{1}{B}\sum_{b=1}^{B} T_b(x)\right) = \rho\sigma^2 + \frac{1-\rho}{B}\sigma^2$$

**¡La selección aleatoria de características reduce $\rho$** → ¡Menor varianza del ensamble!

### Agregación Bootstrap (Bagging)

Cada árbol ve aproximadamente el 63.2% de las muestras originales:
$$P(\text{muestra NO seleccionada}) = \left(1 - \frac{1}{n}\right)^n \approx e^{-1} \approx 0.368$$

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Entrenamiento | $O(B \cdot n \cdot m' \cdot \log n \cdot d)$ | $O(B \cdot d)$ |
| Predicción | $O(B \cdot d)$ | $O(1)$ |

Donde $B$ = árboles, $n$ = muestras, $m'$ = max_características, $d$ = profundidad del árbol.

## Hiperparámetros

| Parámetro | Efecto | Valores Típicos |
|-----------|--------|-----------------|
| n_árboles | Más árboles → mejor, pero rendimientos decrecientes | 100-500 |
| max_características | Menor → menos correlación, más sesgo | √m (clf), m/3 (reg) |
| max_profundidad | Más profundo → árboles más complejos | None o 10-30 |
| min_muestras_división | Mayor → más regularización | 2-10 |
| bootstrap | True habilita estimación OOB | True |

## Puntos Clave

1. **Paralelizable**: Los árboles son independientes; entrenar en múltiples núcleos.

2. **Maneja Altas Dimensiones**: Funciona bien incluso con muchas características.

3. **Validación Incorporada**: El error OOB proporciona estimación sin conjunto de validación separado.

4. **Importancia de Características**: Proporciona rankings interpretables de características.

5. **Robusto**: Menos sensible a valores atípicos y ruido que árboles individuales.

6. **Sin Escalado Necesario**: Invariante a transformaciones monótonas de características.

## Referencias

- **Breiman, L.** (2001). *Random Forests*. Machine Learning, 45(1), 5-32. [https://link.springer.com/article/10.1023/A:1010933404324](https://link.springer.com/article/10.1023/A:1010933404324) 🇬🇧
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 15. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
- **Documentación de scikit-learn**: Random Forests. [https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees](https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees) 🇬🇧
- **Louppe, G.** (2014). *Understanding Random Forests*. Tesis doctoral. [https://arxiv.org/abs/1407.7502](https://arxiv.org/abs/1407.7502) 🇬🇧
