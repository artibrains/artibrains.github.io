title: "4.2 Enrutamiento automático de tickets: Árboles de decisión"
description: "Visualización interactiva de cómo un árbol de decisión construye reglas para clasificar, inspirado en el juego 'Quién es Quién'."
weight: 12
draft: false
slug: "arbol-decision-triaje"
---

## Introducción

Un **Árbol de Decisión** es un modelo predictivo que aprende una serie de reglas simples, similares a un diagrama de flujo, para llegar a una conclusión. Al igual que en el juego 'Quién es Quién', el algoritmo busca la secuencia de preguntas más eficiente para clasificar un caso con la menor cantidad de pasos posible.

{{< demo-intro 
    title="Visualizador de Árbol de Decisión: ¿Qué Perfil Es?"
    medical_highlight="Un Árbol de Decisión construye un 'protocolo de preguntas' claro. Aprende qué características son más distintivas para categorizar casos, permitiendo tomar decisiones rápidas y fundamentadas siguiendo un camino explicable."
    intro_text="Un **Árbol de Decisión** es un modelo que crea una secuencia de preguntas para llegar a una conclusión, funcionando como un juego de '¿Qué Perfil Es?'. Su gran ventaja es la **interpretabilidad**: cada decisión se puede explicar paso a paso."
    steps="Define el Conjunto de Casos: Elige el conjunto de casos que el modelo debe aprender a diferenciar. Cada uno tiene un perfil único con distintos atributos.|Construye el Protocolo de Preguntas: Pulsa 'Entrenar Árbol'. El algoritmo encontrará la secuencia de preguntas más eficiente, colocando la que mejor distingue en la raíz del árbol.|Sigue la Ruta de Identificación: Explora el árbol generado. Cada nodo es una pregunta de sí/no sobre una característica. Sigue las respuestas para ver cómo el modelo te guía hasta identificar el perfil correcto."
>}}
    
## Demostración Interactiva

{{< demo-wrapper title="Constructor de Árboles de Decisión" >}}

{{< decision-tree >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

### ¿Cómo Construye las Preguntas?

{{% notice style="info" title="División Óptima" %}}
En cada nodo del árbol, el algoritmo busca la pregunta que mejor separe los datos en grupos más "puros" (homogéneos). Esto se mide usando métricas como:

- **Entropía**: Mide el desorden en los datos
- **Índice de Gini**: Probabilidad de clasificar incorrectamente
- **Ganancia de información**: Cuánto reduce la incertidumbre una pregunta
{{% /notice %}}

### Ventajas y Limitaciones

{{% notice style="tip" title="Interpretabilidad" %}}
**Ventajas principales:**
- Fáciles de interpretar y explicar
- No requieren normalización de datos
- Manejan tanto variables numéricas como categóricas
- Pueden modelar relaciones no lineales

**Limitaciones importantes:**
- Propensos al sobreajuste con datos complejos
- Inestables (pequeños cambios pueden generar árboles muy diferentes)
- Pueden crear sesgos hacia variables con más niveles
{{% /notice %}}

{{% notice style="warning" title="Prevención del Sobreajuste" %}}
Para evitar que el árbol memorice los datos de entrenamiento:
- **Poda**: Eliminar ramas que no mejoran la generalización
- **Profundidad máxima**: Limitar cuántos niveles puede tener
- **Mínimo de muestras**: Requerir un número mínimo de casos por hoja
{{% /notice %}}

{{< terminal >}}
