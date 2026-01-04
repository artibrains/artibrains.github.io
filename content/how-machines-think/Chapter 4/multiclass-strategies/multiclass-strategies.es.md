---
title: "4.3 Estrategias Multiclase: Uno contra Resto (OvR) y Uno contra Uno (OvO)"
description: "Visualización interactiva de las estrategias OvR y OvO para clasificación multiclase, aplicada al diagnóstico de tipos de enfermedades."
weight: 4
draft: false
slug: "estrategias-multiclase"
---

## Introducción

Cuando un problema tiene **más de dos clases** (multiclase), muchos algoritmos de clasificación binaria necesitan adaptarse. Las dos estrategias más comunes son **Uno contra Resto (OvR)** y **Uno contra Uno (OvO)**. Cada una descompone el problema multiclase en múltiples problemas binarios más simples.

{{< demo-intro 
    title="Visualizador de Estrategias Multiclase: ¿Qué Tipo de Infección Es?"
    algorithm_type="Estrategias de clasificación multiclase"
    difficulty="intermediate"
    medical_scenario="Un médico necesita clasificar infecciones en tres tipos: viral, bacteriana o fúngica. Los análisis de sangre proporcionan múltiples biomarcadores, pero los algoritmos de clasificación binaria solo distinguen entre dos clases. ¿Cómo extenderlos a tres o más categorías?"
    medical_highlight="Las estrategias OvR y OvO permiten reutilizar clasificadores binarios para problemas multiclase. **OvR** entrena un clasificador por clase (esa clase vs. todas las demás), mientras que **OvO** entrena un clasificador para cada par de clases. Cada estrategia tiene ventajas según el contexto médico."
    intro_text="Explorarás cómo funcionan las estrategias **Uno contra Resto (OvR)** y **Uno contra Uno (OvO)** para clasificación multiclase. Verás cómo cada estrategia descompone el problema y combina las decisiones de múltiples clasificadores binarios."
    steps="Genera Datos de Pacientes: Crea un conjunto de pacientes con tres tipos de infección (viral, bacteriana, fúngica) basados en dos biomarcadores.|Compara las Estrategias: Observa cómo OvR entrena 3 clasificadores (uno por clase) y cómo OvO entrena 3 clasificadores (uno por cada par de clases).|Visualiza las Decisiones: Explora las regiones de decisión y ve cómo cada estrategia combina los votos de sus clasificadores binarios para la clasificación final."
>}}
    
## Demostración Interactiva

{{< demo-wrapper title="Comparador de Estrategias Multiclase" >}}

{{< multiclass-strategies >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

### Uno contra Resto (OvR)

{{% notice style="info" title="One-vs-Rest" %}}
En **OvR** (también llamado One-vs-All), para $K$ clases:

- Se entrenan $K$ clasificadores binarios
- Cada clasificador aprende a distinguir una clase de todas las demás
- Para clasificar un nuevo caso, todos los clasificadores votan y se elige la clase con mayor confianza

**Ventajas:**
- Eficiente computacionalmente (solo $K$ modelos)
- Fácil de interpretar
- Funciona bien cuando las clases están bien separadas

**Limitaciones:**
- Puede tener problemas con clases desbalanceadas (una clase vs. muchas)
- Los clasificadores no son siempre directamente comparables
{{% /notice %}}

### Uno contra Uno (OvO)

{{% notice style="info" title="One-vs-One" %}}
En **OvO** (también llamado All-vs-All), para $K$ clases:

- Se entrenan $\frac{K(K-1)}{2}$ clasificadores binarios (uno por cada par)
- Cada clasificador aprende a distinguir entre dos clases específicas
- Para clasificar, todos votan y se elige la clase con más votos

**Ventajas:**
- Cada clasificador se entrena con menos datos (solo dos clases)
- Más robusto a clases desbalanceadas
- Útil cuando las fronteras entre pares de clases son muy diferentes

**Limitaciones:**
- Más costoso computacionalmente (muchos más modelos)
- Puede ser difícil de interpretar con muchas clases
{{% /notice %}}

### Comparación Matemática

Para un problema con $K = 3$ clases:

- **OvR**: Entrena 3 modelos
  - Modelo 1: Clase A vs. (B, C)
  - Modelo 2: Clase B vs. (A, C)
  - Modelo 3: Clase C vs. (A, B)

- **OvO**: Entrena $\frac{3 \times 2}{2} = 3$ modelos
  - Modelo 1: Clase A vs. B
  - Modelo 2: Clase A vs. C
  - Modelo 3: Clase B vs. C

Para $K = 5$ clases:
- **OvR**: 5 modelos
- **OvO**: 10 modelos

{{% notice style="tip" title="¿Cuándo usar cada estrategia?" %}}
- **OvR** es preferible cuando:
  - Tienes muchas clases (OvO crece cuadráticamente)
  - Las clases están relativamente balanceadas
  - Necesitas eficiencia computacional

- **OvO** es mejor cuando:
  - Tienes pocas clases (3-5)
  - Las clases están muy desbalanceadas
  - Cada par de clases tiene patrones de separación muy distintos
{{% /notice %}}

## Aplicación en Medicina

En el contexto del triaje hospitalario:

- **OvR** podría usarse para clasificar niveles de urgencia (crítico, urgente, no urgente, consulta) con un modelo por nivel
- **OvO** sería útil para distinguir entre tipos específicos de patologías con biomarcadores muy diferentes

Ambas estrategias permiten extender algoritmos como Regresión Logística, SVM o Árboles de Decisión a problemas multiclase manteniendo su interpretabilidad y eficacia.

## Experimenta

Usa la demostración interactiva para:
1. Observar cómo cambian las fronteras de decisión según la estrategia
2. Ver cómo cada clasificador individual contribuye a la decisión final
3. Comparar la confianza de las predicciones en diferentes regiones del espacio
4. Entender por qué algunas regiones son más ambiguas que otras

{{% notice style="warning" title="Importante" %}}
Aunque las estrategias OvR y OvO son ampliamente utilizadas, algunos algoritmos modernos (como las redes neuronales) pueden manejar clasificación multiclase directamente usando una capa de salida con activación softmax. Sin embargo, estas estrategias siguen siendo fundamentales para entender y aplicar algoritmos clásicos de aprendizaje automático.
{{% /notice %}}
