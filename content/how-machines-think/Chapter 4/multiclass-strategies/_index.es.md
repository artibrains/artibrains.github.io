---
title: "4.1 Estrategias Multiclase: Uno contra Resto (OvR) y Uno contra Uno (OvO)"
description: "Visualización interactiva de las estrategias OvR y OvO para clasificación multiclase, aplicada al enrutamiento en varias categorías."
weight: 1
draft: false
slug: "estrategias-multiclase"
---

## Introducción

Cuando un problema tiene **más de dos clases** (multiclase), muchos algoritmos de clasificación binaria necesitan adaptarse. Las dos estrategias más comunes son **Uno contra Resto (OvR)** y **Uno contra Uno (OvO)**. Cada una descompone el problema multiclase en múltiples problemas binarios más simples.

{{< demo-intro 
  title="Visualizador de Estrategias Multiclase: ¿Qué Categoría Es?"
  medical_highlight="Las estrategias OvR y OvO permiten reutilizar clasificadores binarios para problemas multiclase. **OvR** entrena un clasificador por clase (esa clase vs. todas las demás), mientras que **OvO** entrena un clasificador para cada par de clases. Cada estrategia tiene ventajas según el tamaño de los datos, el balance de clases y la separabilidad entre categorías."
    intro_text="Explorarás cómo funcionan las estrategias **Uno contra Resto (OvR)** y **Uno contra Uno (OvO)** para clasificación multiclase. Verás cómo cada estrategia descompone el problema y combina las decisiones de múltiples clasificadores binarios."
  steps="Genera Datos de Ejemplo: Crea un conjunto de datos con tres categorías (Facturación, Soporte técnico, Cuenta) basadas en dos señales numéricas.|Compara las Estrategias: Observa cómo OvR entrena 3 clasificadores (uno por clase) y cómo OvO entrena 3 clasificadores (uno por cada par de clases).|Visualiza las Decisiones: Explora las regiones de decisión y ve cómo cada estrategia combina los votos de sus clasificadores binarios para la clasificación final."
>}}
    
## Demostración Interactiva

{{< demo-wrapper title="Comparador de Estrategias Multiclase" >}}

{{< multiclass-strategies >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

### Comparación de Estrategias Multiclase

| Característica | Uno contra Resto (OvR) | Uno contra Uno (OvO) |
|---|---|---|
| **Número de Clasificadores** | $K$ clasificadores | $\frac{K(K-1)}{2}$ clasificadores |
| **Cómo Funciona** | Cada clasificador distingue una clase de todas las demás | Cada clasificador distingue entre un par específico de clases |
| **Método de Votación** | Todos los clasificadores votan; se elige la clase con mayor confianza | Todos votan; se elige la clase con más votos |
| **Eficiencia Computacional** | ✅ Muy eficiente (menos modelos) | ❌ Menos eficiente (muchos más modelos) |
| **Interpretabilidad** | ✅ Fácil de interpretar | ❌ Difícil de interpretar con muchas clases |
| **Clases Bien Separadas** | ✅ Funciona bien | ✅ Funciona bien |
| **Clases Desbalanceadas** | ❌ Puede tener problemas | ✅ Más robusto |
| **Comparabilidad de Clasificadores** | ❌ No siempre directamente comparables | ✅ Más comparables |
| **Datos por Clasificador** | Todos los datos disponibles | Solo datos de dos clases (menos datos) |
| **Mejor Para** | Problemas grandes con clases bien separadas | Problemas pequeños/medianos con clases desbalanceadas |
