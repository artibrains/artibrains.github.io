---
title: "📝 Pseudocódigo de Clustering K-Means"
weight: 80
description: "El algoritmo no supervisado que descubre agrupaciones naturales en los datos."
date: 
draft: false
slug: "pseudocodigo-kmeans"
---

K-Means es uno de los algoritmos de aprendizaje no supervisado más populares para clustering. Particiona los datos en K clusters asignando iterativamente puntos al centroide más cercano y actualizando centroides basándose en los puntos asignados.

## El Algoritmo

### Clustering K-Means (Algoritmo de Lloyd)

```
ALGORITMO: Clustering K-Means
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de datos de forma (n_muestras, n_características)
    K: Número de clusters
    max_iteraciones: Número máximo de iteraciones (ej., 300)
    tolerancia: Umbral de convergencia (ej., 1e-4)
    inicialización: Método de inicialización ('aleatorio', 'k-means++')

SALIDA:
    centroides: Centros finales de los clusters de forma (K, n_características)
    etiquetas: Asignación de cluster para cada muestra de forma (n_muestras,)
    inercia: Suma de distancias cuadradas al centroide más cercano

PROCEDIMIENTO:
    1. // Inicializar centroides
       SI inicialización = 'aleatorio':
           centroides ← muestra_aleatoria(X, K)  // Seleccionar K puntos aleatorios
       SINO SI inicialización = 'k-means++':
           centroides ← inicialización_kmeans_plus_plus(X, K)
    
    2. // Bucle principal
       PARA iteración = 1 HASTA max_iteraciones:
           
           // Paso 1: Asignación - asignar cada punto al centroide más cercano
           etiquetas ← array vacío de tamaño n_muestras
           
           PARA i = 1 HASTA n_muestras:
               distancias ← [||X[i] - centroides[k]||² para k = 1 hasta K]
               etiquetas[i] ← argmin(distancias)
           
           // Paso 2: Actualización - recalcular centroides
           nuevos_centroides ← array vacío de forma (K, n_características)
           
           PARA k = 1 HASTA K:
               puntos_en_cluster ← X[etiquetas == k]
               
               SI |puntos_en_cluster| > 0:
                   nuevos_centroides[k] ← media(puntos_en_cluster, eje=0)
               SINO:
                   // Manejar cluster vacío: mantener centroide anterior o reinicializar
                   nuevos_centroides[k] ← centroides[k]
           
           // Verificar convergencia
           desplazamiento_centroide ← max(||nuevos_centroides - centroides||)
           
           SI desplazamiento_centroide < tolerancia:
               IMPRIMIR "Convergido en iteración", iteración
               ROMPER
           
           centroides ← nuevos_centroides
    
    3. // Calcular inercia final (suma de cuadrados intra-cluster)
       inercia ← 0
       PARA i = 1 HASTA n_muestras:
           inercia ← inercia + ||X[i] - centroides[etiquetas[i]]||²
    
    4. DEVOLVER centroides, etiquetas, inercia
```

### Inicialización K-Means++

Esta inicialización mejorada lleva a una convergencia más rápida y mejores resultados:

```
ALGORITMO: Inicialización K-Means++
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de datos de forma (n_muestras, n_características)
    K: Número de clusters

SALIDA:
    centroides: Posiciones iniciales de centroides de forma (K, n_características)

PROCEDIMIENTO:
    1. // Elegir primer centroide uniformemente al azar
       centroides ← [X[entero_aleatorio(0, n_muestras-1)]]
    
    2. // Elegir centroides restantes con probabilidad proporcional a D²
       PARA k = 2 HASTA K:
           
           // Calcular distancia de cada punto al centroide existente más cercano
           D² ← ceros(n_muestras)
           PARA i = 1 HASTA n_muestras:
               dist_min ← ∞
               PARA c en centroides:
                   dist ← ||X[i] - c||²
                   dist_min ← min(dist_min, dist)
               D²[i] ← dist_min
           
           // Muestrear siguiente centroide con probabilidad ∝ D²
           probabilidades ← D² / suma(D²)
           siguiente_idx ← elección_aleatoria(rango(n_muestras), p=probabilidades)
           
           AÑADIR X[siguiente_idx] a centroides
    
    3. DEVOLVER array(centroides)
```

### El Método del Codo para Elegir K

```
ALGORITMO: Método del Codo
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Matriz de datos
    rango_K: Rango de valores K a probar (ej., 1 a 10)

SALIDA:
    inercias: Lista de valores de inercia para cada K
    K_sugerido: Número sugerido de clusters (punto del codo)

PROCEDIMIENTO:
    inercias ← lista vacía
    
    PARA K en rango_K:
        _, _, inercia ← kmeans(X, K)
        AÑADIR inercia a inercias
    
    // Encontrar punto del codo (máxima curvatura)
    // Heurística simple: mayor disminución en la tasa de inercia
    disminuciones ← [inercias[i-1] - inercias[i] para i = 1 hasta len(inercias)-1]
    segundas_derivadas ← [disminuciones[i-1] - disminuciones[i] para i = 1 hasta len(disminuciones)-1]
    
    K_sugerido ← argmax(segundas_derivadas) + 2  // +2 ajusta por indexación
    
    DEVOLVER inercias, K_sugerido

// Graficar inercias vs K para visualizar el "codo"
```

### Coeficiente de Silueta

```
ALGORITMO: Coeficiente de Silueta
─────────────────────────────────────────────────────────────────

// Mide cuán similar es un punto a su propio cluster vs otros clusters

ENTRADA:
    X: Matriz de datos
    etiquetas: Asignaciones de cluster

SALIDA:
    puntuaciones_silueta: Puntuación para cada muestra
    silueta_media: Puntuación de silueta promedio

PROCEDIMIENTO:
    PARA cada muestra i:
        cluster_i ← etiquetas[i]
        
        // a(i): Distancia media a otros puntos en el mismo cluster
        mismo_cluster ← X[etiquetas == cluster_i Y índice ≠ i]
        a[i] ← media(||X[i] - p|| para p en mismo_cluster)
        
        // b(i): Distancia media a puntos en el cluster vecino más cercano
        b[i] ← ∞
        PARA cada cluster c ≠ cluster_i:
            otro_cluster ← X[etiquetas == c]
            dist_media ← media(||X[i] - p|| para p en otro_cluster)
            b[i] ← min(b[i], dist_media)
        
        // Coeficiente de silueta para punto i
        s[i] ← (b[i] - a[i]) / max(a[i], b[i])
    
    silueta_media ← media(s)
    
    DEVOLVER s, silueta_media

// Interpretación:
//   s ≈ +1: Punto está bien agrupado
//   s ≈ 0: Punto está en la frontera del cluster  
//   s ≈ -1: Punto podría estar en el cluster equivocado
```

## Fundamento Matemático

### Función Objetivo

K-Means minimiza la **Suma de Cuadrados Intra-Cluster (WCSS)**:

$$J = \sum_{k=1}^{K} \sum_{i \in C_k} ||x_i - \mu_k||^2$$

Donde:
- $C_k$ es el conjunto de puntos en el cluster $k$
- $\mu_k$ es el centroide del cluster $k$

### Demostración de Convergencia

Cada iteración disminuye (o mantiene) $J$:

1. **Paso de asignación**: Para centroides fijos, asignar cada punto a su centroide más cercano minimiza $J$.

2. **Paso de actualización**: Para asignaciones fijas, establecer $\mu_k = \frac{1}{|C_k|}\sum_{i \in C_k} x_i$ minimiza $J$.

Como $J$ está acotado inferiormente por 0 y disminuye monótonamente, el algoritmo converge.

### Conexión con el Algoritmo EM

K-Means puede verse como un caso especial del algoritmo Expectation-Maximization para Modelos de Mezcla Gaussiana con:
- Covarianzas iguales, fijas y esféricas
- Asignaciones de cluster duras (0/1) en lugar de probabilidades suaves

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Una iteración | $O(n \cdot K \cdot m)$ | $O(K \cdot m)$ |
| Algoritmo completo | $O(t \cdot n \cdot K \cdot m)$ | $O(K \cdot m + n)$ |
| Inicialización K-Means++ | $O(n \cdot K \cdot m)$ | $O(K \cdot m)$ |

Donde $n$ = muestras, $m$ = características, $K$ = clusters, $t$ = iteraciones.

## Variantes y Extensiones

```
MINI-BATCH K-MEANS:
    // Usa subconjuntos aleatorios para actualizaciones más rápidas en datasets grandes
    
    PARA cada iteración:
        lote ← muestra_aleatoria(X, tamaño_lote)
        
        // Asignar puntos del lote a clusters
        PARA x en lote:
            etiqueta ← centroide_más_cercano(x)
        
        // Actualización incremental del centroide
        PARA cada cluster k:
            conteo[k] ← conteo[k] + conteo_lote[k]
            centroides[k] ← centroides[k] + 
                           (media_lote[k] - centroides[k]) × (conteo_lote[k] / conteo[k])


K-MEDOIDS (PAM):
    // Usa puntos de datos reales como centros de cluster
    // Más robusto ante valores atípicos
    
    Objetivo: minimizar Σ Σ ||x - medoid_k||
    Restricción: medoid_k ∈ X  (debe ser un punto de datos)
```

## Puntos Clave

1. **Óptimos Locales**: K-Means encuentra mínimos locales; ejecutar múltiples veces con diferentes inicializaciones.

2. **K-Means++ Importa**: La inicialización adecuada mejora dramáticamente los resultados.

3. **Escalado de Características**: ¡Esencial! Usar estandarización antes del clustering.

4. **Clusters Esféricos**: Asume que los clusters son aproximadamente esféricos y de tamaño similar.

5. **Elegir K**: Usar método del codo, puntuaciones de silueta, o conocimiento del dominio.

6. **Valores Atípicos**: Sensible a outliers; considerar K-Medoids o alternativas robustas.

7. **Dimensionalidad**: El rendimiento degrada en altas dimensiones (maldición de la dimensionalidad).

## Referencias

- **Lloyd, S.** (1982). *Least squares quantization in PCM*. IEEE Transactions on Information Theory. 🇬🇧
- **Arthur, D., & Vassilvitskii, S.** (2007). *k-means++: The Advantages of Careful Seeding*. SODA 2007. [http://ilpubs.stanford.edu:8090/778/](http://ilpubs.stanford.edu:8090/778/) 🇬🇧
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 14. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
- **Documentación de scikit-learn**: KMeans. [https://scikit-learn.org/stable/modules/clustering.html#k-means](https://scikit-learn.org/stable/modules/clustering.html#k-means) 🇬🇧
- **Sculley, D.** (2010). *Web-Scale K-Means Clustering*. WWW 2010. (Mini-batch K-Means) 🇬🇧
