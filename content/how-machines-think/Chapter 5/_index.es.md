---
title: "Capítulo 5: Aprendizaje No Supervisado"
description: "El Poder del Aprendizaje No Supervisado: Descubriendo Patrones sin Etiquetas"
type: "chapter"
weight: 5
draft: false
slug: "aprendizaje-no-supervisado"
---

{{< chapter-subtitle >}}El Poder del Aprendizaje No Supervisado: Descubriendo Patrones sin Etiquetas{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="5" >}}

Elena desafía al equipo a encontrar grupos ocultos, y Marta introduce el aprendizaje no supervisado para revelar clusters, anomalías y riesgos antes de que escalen.

La Directora Elena plantea un nuevo desafío: ¿Puede la IA ayudar a identificar grupos de usuarios con probabilidad de tener incidencias *antes* de que se conviertan en escalados? A diferencia de los proyectos anteriores donde las categorías eran conocidas (urgente/normal, asiste/no-asiste), esto requiere descubrir patrones ocultos en los datos sin etiquetas predefinidas. Marta introduce al equipo el aprendizaje no supervisado, donde los algoritmos exploran datos para encontrar agrupaciones y estructuras naturales por sí solos. A través de algoritmos de agrupamiento como k-means y agrupamiento jerárquico, más técnicas de reducción de dimensionalidad como PCA, el equipo aprende a descubrir patrones en el uso del servicio. Descubren segmentos que comparten comportamientos similares, detectan anomalías que podrían indicar picos repentinos o cambios de flujo, e identifican correlaciones sutiles entre señales. Pero también aprenden una lección crucial sobre interpretación: el algoritmo no "entiende" a las personas, solo agrupa números basándose en reglas de similitud que el equipo elige. Este capítulo explora la fascinante frontera donde las máquinas nos ayudan a descubrir lo que no sabíamos que no sabíamos.

En este capítulo, seguirás al equipo en su primer gran proyecto de aprendizaje no supervisado, donde utilizan el algoritmo **K-Means** para segmentar usuarios. A través de una simulación interactiva, experimentarás su proceso de descubrimiento:

1.  **[El Descubridor de Grupos Ocultos]({{% relref "how-machines-think/Chapter 5/kmeans/kmeans.es.md" %}})**: Te pondrás en el lugar de Marta y Luis. Primero, utilizarás el **Método del Codo** para determinar el número óptimo de clusters (K), el mismo dilema metodológico que ellos enfrentaron. Luego, ejecutarás el algoritmo K-Means para visualizar cómo agrupa a los usuarios, replicando el "momento eureka" que les permitió identificar un segmento de comportamiento que antes era invisible.

Prepárate para una nueva forma de pensar, donde la IA no solo responde a nuestras preguntas, sino que nos ayuda a formular preguntas que no sabíamos que teníamos que hacer.

### Pseudocódigo de Algoritmos

- **[📝 Pseudocódigo de Clustering K-Means]({{% relref "/how-machines-think/Chapter 5/code/pseudocode-kmeans.es.md" %}})**: Algoritmo de Lloyd, inicialización K-means++, método del codo y análisis de coeficiente de silueta.

### Bibliografía y Recursos Complementarios

- **[K-Means y Clustering]({{% relref "how-machines-think/Chapter 5/bibliography/bibliography-kmeans-clustering.es.md" %}})**: Recursos y referencias verificadas sobre algoritmos de clustering, aprendizaje no supervisado y el método del codo.