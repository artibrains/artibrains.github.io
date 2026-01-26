---
title: "📝 Pseudocódigo del Algoritmo Word2Vec"
weight: 80
description: "Aprendiendo significados de palabras desde el contexto: el algoritmo que revolucionó el PLN."
date: 
draft: false
slug: "pseudocodigo-word2vec"
---

Word2Vec, introducido por Mikolov et al. en Google en 2013, aprende representaciones vectoriales densas (embeddings) de palabras a partir de grandes corpus de texto. Captura relaciones semánticas de modo que palabras similares tienen vectores similares, permitiendo aritmética como: *rey - hombre + mujer ≈ reina*.

## El Algoritmo

### Visión General de las Arquitecturas Word2Vec

```
WORD2VEC: Dos Arquitecturas
─────────────────────────────────────────────────────────────────

1. SKIP-GRAM:
   Dada una palabra objetivo, predecir las palabras de contexto circundantes.
   
   "El rápido zorro marrón salta"
        ↓
   Objetivo: "zorro"
   Predecir: ["rápido", "marrón"] (tamaño de ventana 1)
   
   Mejor para: Palabras infrecuentes, conjuntos de datos más pequeños

2. CBOW (Bolsa Continua de Palabras):
   Dadas las palabras de contexto circundantes, predecir la palabra objetivo.
   
   "El rápido ___ marrón salta"
        ↓
   Contexto: ["rápido", "marrón"]
   Predecir: "zorro"
   
   Mejor para: Palabras frecuentes, conjuntos de datos más grandes
```

### Modelo Skip-Gram

```
ALGORITMO: Entrenamiento Skip-Gram (Versión Básica)
─────────────────────────────────────────────────────────────────

ENTRADA:
    corpus: Lista de oraciones (listas de tokens de palabras)
    V: Tamaño del vocabulario
    d: Dimensión del embedding (típicamente 100-300)
    ventana: Tamaño de la ventana de contexto
    tasa_aprendizaje: η

SALIDA:
    W_in: Matriz de embedding de entrada (V × d) - estos son los vectores de palabras
    W_out: Matriz de embedding de salida (d × V)

PROCEDIMIENTO:
    1. // Inicializar embeddings aleatoriamente
       W_in ← uniforme_aleatorio(-0.5/d, 0.5/d, forma=(V, d))
       W_out ← ceros(d, V)
    
    2. // Construir vocabulario y mapeo palabra-a-índice
       palabra_a_idx ← {palabra: i para i, palabra en enumerar(vocabulario)}
    
    3. // Bucle de entrenamiento
       PARA cada oración en corpus:
           PARA t = 0 HASTA longitud(oración) - 1:
               
               palabra_objetivo ← oración[t]
               idx_objetivo ← palabra_a_idx[palabra_objetivo]
               
               // Obtener palabras de contexto dentro de la ventana
               PARA j = max(0, t - ventana) HASTA min(len(oración), t + ventana):
                   SI j ≠ t:
                       palabra_contexto ← oración[j]
                       idx_contexto ← palabra_a_idx[palabra_contexto]
                       
                       // Paso adelante: predecir contexto desde objetivo
                       // Obtener vector de palabra objetivo
                       v_objetivo ← W_in[idx_objetivo]  // (d,)
                       
                       // Calcular puntuaciones para todas las palabras
                       puntuaciones ← W_out.T · v_objetivo  // (V,)
                       
                       // Softmax para obtener probabilidades
                       probs ← softmax(puntuaciones)  // (V,)
                       
                       // Paso atrás: descenso del gradiente
                       // Gradiente de pérdida de entropía cruzada
                       error ← probs.copiar()
                       error[idx_contexto] -= 1  // y - ŷ
                       
                       // Actualizar pesos de salida
                       W_out ← W_out - η × producto_externo(v_objetivo, error)
                       
                       // Actualizar embedding de entrada
                       grad_entrada ← W_out · error
                       W_in[idx_objetivo] ← W_in[idx_objetivo] - η × grad_entrada
    
    4. DEVOLVER W_in, W_out  // Usualmente solo se usa W_in
```

### Modelo CBOW

```
ALGORITMO: Entrenamiento CBOW (Versión Básica)
─────────────────────────────────────────────────────────────────

ENTRADA:
    corpus: Lista de oraciones
    V: Tamaño del vocabulario
    d: Dimensión del embedding
    ventana: Tamaño de la ventana de contexto
    tasa_aprendizaje: η

SALIDA:
    W_in: Matriz de embedding de entrada (V × d)
    W_out: Matriz de embedding de salida (d × V)

PROCEDIMIENTO:
    1. // Inicializar embeddings
       W_in ← uniforme_aleatorio(-0.5/d, 0.5/d, forma=(V, d))
       W_out ← ceros(d, V)
    
    2. // Bucle de entrenamiento
       PARA cada oración en corpus:
           PARA t = 0 HASTA longitud(oración) - 1:
               
               palabra_objetivo ← oración[t]
               idx_objetivo ← palabra_a_idx[palabra_objetivo]
               
               // Recopilar índices de palabras de contexto
               indices_contexto ← []
               PARA j = max(0, t - ventana) HASTA min(len(oración), t + ventana):
                   SI j ≠ t:
                       indices_contexto.añadir(palabra_a_idx[oración[j]])
               
               SI indices_contexto está vacío:
                   CONTINUAR
               
               // Paso adelante: predecir objetivo desde contexto
               // Promediar vectores de palabras de contexto (CBOW)
               vectores_contexto ← [W_in[idx] para idx en indices_contexto]
               v_contexto ← promedio(vectores_contexto, eje=0)  // (d,)
               
               // Calcular puntuaciones y probabilidades
               puntuaciones ← W_out.T · v_contexto  // (V,)
               probs ← softmax(puntuaciones)
               
               // Paso atrás
               error ← probs.copiar()
               error[idx_objetivo] -= 1
               
               // Actualizar pesos de salida
               W_out ← W_out - η × producto_externo(v_contexto, error)
               
               // Actualizar embeddings de entrada (distribuir gradiente a todas las palabras de contexto)
               grad_entrada ← W_out · error
               PARA idx en indices_contexto:
                   W_in[idx] ← W_in[idx] - η × (grad_entrada / len(indices_contexto))
    
    3. DEVOLVER W_in, W_out
```

### Muestreo Negativo (Entrenamiento Eficiente)

```
ALGORITMO: Skip-Gram con Muestreo Negativo (SGNS)
─────────────────────────────────────────────────────────────────

// El softmax completo sobre V palabras es costoso (O(V) por ejemplo de entrenamiento)
// El muestreo negativo lo aproxima con O(k+1) operaciones

ENTRADA:
    corpus: Corpus de texto
    V, d, ventana: Como antes
    k: Número de muestras negativas (típicamente 5-20)
    tasa_aprendizaje: η

PROCEDIMIENTO:
    1. // Construir distribución de ruido para muestreo negativo
       // P(w) ∝ conteo(w)^0.75 (submuestrear palabras frecuentes)
       conteos_palabras ← contar ocurrencias de cada palabra
       dist_ruido ← (conteos_palabras ** 0.75) / suma(conteos_palabras ** 0.75)
    
    2. // Inicializar embeddings
       W_objetivo ← uniforme_aleatorio(-0.5/d, 0.5/d, forma=(V, d))
       W_contexto ← ceros(V, d)
    
    3. // Bucle de entrenamiento
       PARA cada oración en corpus:
           PARA cada par (objetivo, contexto) de la oración:
               
               idx_objetivo ← palabra_a_idx[objetivo]
               idx_contexto ← palabra_a_idx[contexto]
               
               // Muestrear k palabras negativas
               muestras_neg ← []
               MIENTRAS len(muestras_neg) < k:
                   idx_neg ← muestrear de dist_ruido
                   SI idx_neg ≠ idx_contexto:
                       muestras_neg.añadir(idx_neg)
               
               // Obtener vectores
               v_objetivo ← W_objetivo[idx_objetivo]
               v_contexto ← W_contexto[idx_contexto]
               
               // ===== EJEMPLO POSITIVO =====
               // Maximizar log σ(v_objetivo · v_contexto)
               
               puntuación_pos ← punto(v_objetivo, v_contexto)
               sigmoid_pos ← σ(puntuación_pos)
               
               // Gradientes para par positivo
               grad_objetivo ← (sigmoid_pos - 1) × v_contexto
               grad_contexto ← (sigmoid_pos - 1) × v_objetivo
               
               // ===== EJEMPLOS NEGATIVOS =====
               // Maximizar log σ(-v_objetivo · v_negativo)
               
               PARA idx_neg en muestras_neg:
                   v_neg ← W_contexto[idx_neg]
                   puntuación_neg ← punto(v_objetivo, v_neg)
                   sigmoid_neg ← σ(puntuación_neg)
                   
                   // Gradientes para par negativo
                   grad_objetivo += sigmoid_neg × v_neg
                   W_contexto[idx_neg] -= η × sigmoid_neg × v_objetivo
               
               // Actualizar embeddings
               W_objetivo[idx_objetivo] -= η × grad_objetivo
               W_contexto[idx_contexto] -= η × grad_contexto
    
    4. // Embeddings finales: a menudo promediar o concatenar W_objetivo y W_contexto
       DEVOLVER W_objetivo  // o (W_objetivo + W_contexto) / 2
```

### Submuestreo de Palabras Frecuentes

```
ALGORITMO: Submuestreo
─────────────────────────────────────────────────────────────────

// Palabras muy frecuentes como "el", "un", "es" proveen menos información
// y aparecen en demasiados contextos. Submuestrearlas.

ENTRADA:
    oración: Lista de palabras
    freqs_palabras: Frecuencia de cada palabra en el corpus
    umbral: t (típicamente 10⁻⁵)

SALIDA:
    oración_submuestreada: Oración con algunas palabras frecuentes eliminadas

PROCEDIMIENTO:
    oración_submuestreada ← []
    
    PARA palabra en oración:
        freq ← freqs_palabras[palabra]
        
        // Probabilidad de mantener la palabra
        // Mayor frecuencia → menor probabilidad de mantener
        p_mantener ← (√(freq / t) + 1) × (t / freq)
        p_mantener ← min(p_mantener, 1.0)
        
        SI aleatorio() < p_mantener:
            oración_submuestreada.añadir(palabra)
    
    DEVOLVER oración_submuestreada
```

### Softmax Jerárquico (Alternativa al Muestreo Negativo)

```
ALGORITMO: Softmax Jerárquico
─────────────────────────────────────────────────────────────────

// Usa un árbol binario (codificación Huffman) para reducir softmax de O(V) a O(log V)

ESTRUCTURA:
    - Construir árbol Huffman desde frecuencias de palabras
    - Cada palabra es una hoja
    - Camino desde raíz a palabra = secuencia de decisiones binarias
    - Cada nodo interno tiene un vector de parámetros

PREDICCIÓN:
    P(palabra | contexto) = ∏ σ(±n_i · v_contexto)
    
    donde el camino desde la raíz a la palabra pasa por nodos n₁, n₂, ..., nₗ
    y ± depende de si vamos a la izquierda (-) o derecha (+) en cada nodo

COMPLEJIDAD:
    O(log V) por ejemplo de entrenamiento (vs O(V) para softmax completo)
    
COMPROMISO:
    - Más complejo de implementar
    - Funciona bien para palabras frecuentes
    - El muestreo negativo a menudo se prefiere en la práctica
```

## Fundamento Matemático

### Objetivo Skip-Gram

Para un corpus de palabras $w_1, w_2, \ldots, w_T$:

$$J(\theta) = \frac{1}{T} \sum_{t=1}^{T} \sum_{-c \leq j \leq c, j \neq 0} \log P(w_{t+j} | w_t)$$

donde $c$ es el tamaño de la ventana de contexto.

### Probabilidad Softmax

$$P(w_O | w_I) = \frac{\exp(v'_{w_O} \cdot v_{w_I})}{\sum_{w=1}^{V} \exp(v'_w \cdot v_{w_I})}$$

### Objetivo del Muestreo Negativo

En lugar del softmax completo, maximizar:

$$\log \sigma(v'_{w_O} \cdot v_{w_I}) + \sum_{i=1}^{k} \mathbb{E}_{w_i \sim P_n(w)} [\log \sigma(-v'_{w_i} \cdot v_{w_I})]$$

donde $P_n(w) \propto \text{conteo}(w)^{0.75}$ es la distribución de ruido.

## Análisis de Complejidad

| Variante | Tiempo por Ejemplo | Espacio |
|----------|-------------------|---------|
| Softmax Completo | $O(V \cdot d)$ | $O(V \cdot d)$ |
| Muestreo Negativo | $O((k+1) \cdot d)$ | $O(V \cdot d)$ |
| Softmax Jerárquico | $O(\log V \cdot d)$ | $O(V \cdot d)$ |

Donde $V$ = tamaño del vocabulario, $d$ = dimensión del embedding, $k$ = muestras negativas.

## Analogías de Palabras

```
ANALOGÍAS DE PALABRAS: El Famoso Resultado
─────────────────────────────────────────────────────────────────

Los embeddings aprendidos capturan relaciones semánticas:

vec("rey") - vec("hombre") + vec("mujer") ≈ vec("reina")
vec("París") - vec("Francia") + vec("Alemania") ≈ vec("Berlín")
vec("caminando") - vec("caminar") + vec("nadar") ≈ vec("nadando")

RESOLVER ANALOGÍAS:
    Dado: a es a b como c es a ?
    
    Encontrar: argmax_d similitud_coseno(vec(b) - vec(a) + vec(c), vec(d))
               donde d ∉ {a, b, c}
```

## Puntos Clave

1. **Hipótesis Distribucional**: Palabras que aparecen en contextos similares tienen significados similares—Word2Vec operacionaliza esto.

2. **Denso vs Disperso**: Word2Vec produce vectores densos de 100-300 dimensiones vs dispersos one-hot (V dimensiones).

3. **Aprendizaje por Transferencia**: Los embeddings pre-entrenados pueden mejorar el rendimiento en tareas de PLN posteriores.

4. **Muestreo Negativo**: Un truco computacional brillante que hace el entrenamiento manejable en vocabularios grandes.

5. **Submuestreo**: Reducir las ocurrencias de palabras frecuentes mejora la calidad de los embeddings para palabras raras.

6. **Estructura Lineal**: Las relaciones semánticas se capturan como translaciones lineales en el espacio vectorial.

## Referencias

- **Mikolov, T., Chen, K., Corrado, G., & Dean, J.** (2013). *Efficient Estimation of Word Representations in Vector Space*. ICLR Workshop. [arXiv:1301.3781](https://arxiv.org/abs/1301.3781) 🇬🇧
- **Mikolov, T., Sutskever, I., Chen, K., Corrado, G., & Dean, J.** (2013). *Distributed Representations of Words and Phrases and their Compositionality*. NeurIPS. 🇬🇧
- **Goldberg, Y., & Levy, O.** (2014). *word2vec Explained: Deriving Mikolov et al.'s Negative-Sampling Word-Embedding Method*. [arXiv:1402.3722](https://arxiv.org/abs/1402.3722) 🇬🇧
- **Rong, X.** (2014). *word2vec Parameter Learning Explained*. [arXiv:1411.2738](https://arxiv.org/abs/1411.2738) 🇬🇧
- **Jurafsky, D., & Martin, J. H.** (2023). *Speech and Language Processing*, Capítulo 6. [https://web.stanford.edu/~jurafsky/slp3/](https://web.stanford.edu/~jurafsky/slp3/) 🇬🇧
