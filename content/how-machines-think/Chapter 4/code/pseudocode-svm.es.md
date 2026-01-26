---
title: "📝 Pseudocódigo de Máquinas de Vectores de Soporte (SVM)"
weight: 84
description: "El clasificador de margen máximo que encuentra fronteras de decisión óptimas."
date: 
draft: false
slug: "pseudocodigo-svm"
---

Las Máquinas de Vectores de Soporte (SVM) son modelos de aprendizaje supervisado poderosos que encuentran el hiperplano óptimo que separa clases maximizando el margen entre ellas. Las SVM pueden manejar clasificación lineal y no lineal mediante el truco del kernel.

## El Algoritmo

### SVM Lineal: El Problema de Optimización

```
ALGORITMO: Formulación de SVM Lineal
─────────────────────────────────────────────────────────────────

OBJETIVO: Encontrar hiperplano w·x + b = 0 que maximiza el margen

PROBLEMA PRIMAL (Margen Duro):
    
    minimizar:    (1/2) ||w||²
    
    sujeto a:     yᵢ(w · xᵢ + b) ≥ 1    para todo i = 1, ..., n
    
    donde:
        w: Vector de pesos (normal al hiperplano)
        b: Término de sesgo
        yᵢ ∈ {-1, +1}: Etiquetas de clase
        xᵢ: Muestras de entrenamiento

PROBLEMA PRIMAL (Margen Suave - permite errores de clasificación):
    
    minimizar:    (1/2) ||w||² + C Σᵢ ξᵢ
    
    sujeto a:     yᵢ(w · xᵢ + b) ≥ 1 - ξᵢ    para todo i
                  ξᵢ ≥ 0                       para todo i
    
    donde:
        C: Parámetro de regularización (equilibrio entre margen y errores)
        ξᵢ: Variables de holgura (permiten puntos dentro del margen o mal clasificados)
```

### Entrenamiento SVM con SMO (Optimización Mínima Secuencial)

```
ALGORITMO: SMO para Entrenamiento SVM (Simplificado)
─────────────────────────────────────────────────────────────────

ENTRADA:
    X: Datos de entrenamiento de forma (n_muestras, n_características)
    y: Etiquetas {-1, +1} de forma (n_muestras,)
    C: Parámetro de regularización
    kernel: Función kernel (por defecto: lineal)
    tolerancia: Tolerancia numérica (ej., 1e-3)
    max_iteraciones: Pasadas máximas sobre los datos

SALIDA:
    α: Multiplicadores de Lagrange de forma (n_muestras,)
    b: Término de sesgo

PROCEDIMIENTO:
    1. Inicializar: α ← ceros(n_muestras), b ← 0
    
    2. // Precalcular matriz kernel (para eficiencia)
       K[i,j] ← kernel(xᵢ, xⱼ) para todo i, j
    
    3. pasadas ← 0
       MIENTRAS pasadas < max_iteraciones:
           num_cambiados ← 0
           
           PARA i = 1 HASTA n_muestras:
               // Calcular error de predicción para muestra i
               Eᵢ ← (Σⱼ αⱼ yⱼ K[i,j]) + b - yᵢ
               
               // Verificar si αᵢ viola condiciones KKT
               SI (yᵢ Eᵢ < -tol Y αᵢ < C) O (yᵢ Eᵢ > tol Y αᵢ > 0):
                   
                   // Seleccionar segundo α a optimizar (heurística: max |Eᵢ - Eⱼ|)
                   j ← seleccionar_segundo_alpha(i, Eᵢ)
                   Eⱼ ← (Σₖ αₖ yₖ K[j,k]) + b - yⱼ
                   
                   // Guardar alphas anteriores
                   αᵢ_anterior ← αᵢ
                   αⱼ_anterior ← αⱼ
                   
                   // Calcular límites para αⱼ
                   SI yᵢ ≠ yⱼ:
                       L ← max(0, αⱼ - αᵢ)
                       H ← min(C, C + αⱼ - αᵢ)
                   SINO:
                       L ← max(0, αᵢ + αⱼ - C)
                       H ← min(C, αᵢ + αⱼ)
                   
                   SI L = H:
                       CONTINUAR
                   
                   // Calcular eta (segunda derivada del objetivo)
                   η ← 2 K[i,j] - K[i,i] - K[j,j]
                   SI η ≥ 0:
                       CONTINUAR
                   
                   // Actualizar αⱼ
                   αⱼ ← αⱼ - yⱼ(Eᵢ - Eⱼ) / η
                   αⱼ ← recortar(αⱼ, L, H)
                   
                   SI |αⱼ - αⱼ_anterior| < 1e-5:
                       CONTINUAR
                   
                   // Actualizar αᵢ
                   αᵢ ← αᵢ + yᵢ yⱼ (αⱼ_anterior - αⱼ)
                   
                   // Actualizar sesgo b
                   b₁ ← b - Eᵢ - yᵢ(αᵢ-αᵢ_anterior)K[i,i] - yⱼ(αⱼ-αⱼ_anterior)K[i,j]
                   b₂ ← b - Eⱼ - yᵢ(αᵢ-αᵢ_anterior)K[i,j] - yⱼ(αⱼ-αⱼ_anterior)K[j,j]
                   
                   SI 0 < αᵢ < C:
                       b ← b₁
                   SINO SI 0 < αⱼ < C:
                       b ← b₂
                   SINO:
                       b ← (b₁ + b₂) / 2
                   
                   num_cambiados ← num_cambiados + 1
           
           SI num_cambiados = 0:
               pasadas ← pasadas + 1
           SINO:
               pasadas ← 0
    
    4. // Extraer vectores de soporte (muestras con αᵢ > 0)
       vectores_soporte ← índices donde α > 0
    
    5. DEVOLVER α, b, vectores_soporte
```

### Predicción SVM

```
ALGORITMO: Predicción SVM
─────────────────────────────────────────────────────────────────

ENTRADA:
    x: Nueva muestra a clasificar
    α: Multiplicadores de Lagrange entrenados
    b: Término de sesgo entrenado
    X_sv: Vectores de soporte
    y_sv: Etiquetas de vectores de soporte
    kernel: Función kernel

SALIDA:
    clase: Clase predicha {-1, +1}
    puntuación: Valor de la función de decisión (distancia al hiperplano)

PROCEDIMIENTO:
    // Función de decisión: f(x) = Σᵢ αᵢ yᵢ K(xᵢ, x) + b
    puntuación ← 0
    PARA i en índices_vectores_soporte:
        puntuación ← puntuación + α[i] × y[i] × kernel(X[i], x)
    puntuación ← puntuación + b
    
    // Clasificar según el signo
    SI puntuación ≥ 0:
        clase ← +1
    SINO:
        clase ← -1
    
    DEVOLVER clase, puntuación
```

### Funciones Kernel

```
FUNCIÓN: Funciones Kernel Comunes
─────────────────────────────────────────────────────────────────

KERNEL LINEAL:
    K(x, z) = x · z = xᵀz
    
    // Equivalente al producto punto estándar
    // Usar cuando los datos son linealmente separables

KERNEL POLINOMIAL:
    K(x, z) = (γ xᵀz + r)^d
    
    donde:
        d: Grado del polinomio (ej., 2, 3)
        γ: Factor de escala (por defecto: 1/n_características)
        r: Coeficiente (por defecto: 0 o 1)

FUNCIÓN DE BASE RADIAL (RBF/Gaussiana):
    K(x, z) = exp(-γ ||x - z||²)
    
    donde:
        γ: Coeficiente del kernel (por defecto: 1/n_características)
        // Mayor γ → Gaussiana más estrecha → frontera más compleja
    
    // Más popular para problemas no lineales

KERNEL SIGMOIDE:
    K(x, z) = tanh(γ xᵀz + r)
    
    // Similar a red neuronal con una capa oculta
    // No siempre es un kernel Mercer válido
```

## Fundamento Matemático

### El Problema Dual

El problema primal de SVM se convierte a su dual para eficiencia computacional:

$$\max_\alpha \sum_{i=1}^{n} \alpha_i - \frac{1}{2} \sum_{i,j} \alpha_i \alpha_j y_i y_j K(x_i, x_j)$$

Sujeto a:
- $0 \leq \alpha_i \leq C$ para todo $i$
- $\sum_{i=1}^{n} \alpha_i y_i = 0$

### El Truco del Kernel

En lugar de mapear explícitamente a un espacio de alta dimensión $\phi(x)$:
$$K(x, z) = \phi(x) \cdot \phi(z)$$

Calculamos el kernel directamente, evitando la costosa transformación explícita.

### Condiciones KKT

Para la solución óptima, cada $\alpha_i$ satisface:
- $\alpha_i = 0$ → muestra correctamente clasificada, fuera del margen
- $0 < \alpha_i < C$ → muestra en el margen (vector de soporte)
- $\alpha_i = C$ → muestra dentro del margen o mal clasificada

## Análisis de Complejidad

| Operación | Complejidad Temporal | Complejidad Espacial |
|-----------|---------------------|---------------------|
| Entrenamiento (SMO) | $O(n^2 \cdot m)$ a $O(n^3 \cdot m)$ | $O(n^2)$ (matriz kernel) |
| Predicción | $O(n_{sv} \cdot m)$ | $O(n_{sv})$ |

Donde $n$ = muestras, $m$ = características, $n_{sv}$ = vectores de soporte.

## SVM Multiclase

```
ALGORITMO: SVM Multiclase Uno contra Resto (OvR)
─────────────────────────────────────────────────────────────────

ENTRENAMIENTO:
    PARA cada clase k = 1 HASTA K:
        y_binario ← [+1 si yᵢ = k sino -1 para todo i]
        svm[k] ← entrenar_svm(X, y_binario)

PREDICCIÓN:
    puntuaciones ← [svm[k].función_decisión(x) para k = 1 hasta K]
    clase_predicha ← argmax(puntuaciones)


ALGORITMO: SVM Multiclase Uno contra Uno (OvO)
─────────────────────────────────────────────────────────────────

ENTRENAMIENTO:
    PARA cada par de clases (i, j) donde i < j:
        X_subconjunto ← muestras de clase i o j
        y_binario ← [+1 si clase i, -1 si clase j]
        svm[i,j] ← entrenar_svm(X_subconjunto, y_binario)

PREDICCIÓN:
    votos ← ceros(K)
    PARA cada par (i, j):
        pred ← svm[i,j].predecir(x)
        SI pred = +1:
            votos[i] ← votos[i] + 1
        SINO:
            votos[j] ← votos[j] + 1
    clase_predicha ← argmax(votos)
```

## Puntos Clave

1. **Margen Máximo**: Las SVM encuentran la frontera de decisión que maximiza el margen, llevando a mejor generalización.

2. **Solución Dispersa**: Solo importan los vectores de soporte; otros puntos de entrenamiento pueden descartarse.

3. **Truco del Kernel**: Permite clasificación no lineal sin mapeo explícito de características.

4. **Parámetro C**: C bajo → margen más amplio, más errores; C alto → margen estrecho, menos errores.

5. **Parámetro γ (RBF)**: γ bajo → frontera suave; γ alto → frontera compleja.

6. **Escalado de Características**: Esencial para SVM; usar estandarización.

## Referencias

- **Cortes, C., & Vapnik, V.** (1995). *Support-vector networks*. Machine Learning, 20(3), 273-297. 🇬🇧
- **Platt, J.** (1998). *Sequential Minimal Optimization: A Fast Algorithm for Training Support Vector Machines*. Microsoft Research. 🇬🇧
- **Hastie, T., Tibshirani, R., & Friedman, J.** (2009). *The Elements of Statistical Learning*, Capítulo 12. Springer. [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/) 🇬🇧
- **Documentación de scikit-learn**: SVM. [https://scikit-learn.org/stable/modules/svm.html](https://scikit-learn.org/stable/modules/svm.html) 🇬🇧
- **Bishop, C. M.** (2006). *Pattern Recognition and Machine Learning*, Capítulo 7. Springer. 🇬🇧
