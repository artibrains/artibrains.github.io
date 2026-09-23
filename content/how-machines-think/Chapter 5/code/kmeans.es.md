---
title: "⚡ Agrupación de pacientes con K-Means"
weight: 81
description: "Demostración interactiva: K-means a mano, K-means++, escalado de características, el método del codo y la lectura clínica de los grupos de pacientes."
date:
draft: false
slug: "kmeans-grupos-pacientes"
---

En el capítulo 5, Elena le pregunta al equipo de Minermont si pueden identificar grupos de pacientes en riesgo *antes* de que enfermen. Esta vez no hay etiquetas, así que Marta propone el aprendizaje no supervisado: dejar que el algoritmo descubra los grupos que existen en los datos. Este notebook implementa K-means a mano y con scikit-learn, con una población sintética de 2000 pacientes.

El notebook interactivo incluye:

- K-means a mano, paso a paso, con el ejemplo pequeño de las notas de Marta (sección 5.4): asignación, actualización y la suma de errores al cuadrado.
- Los óptimos locales: cómo un mal comienzo se queda atascado y cómo K-means++ elige mejores centroides iniciales.
- Una población sintética de pacientes de Minermont con perfiles ocultos, y por qué hay que escalar antes las características.
- La elección de $K$ con el método del codo y la comparación de varios valores de $K$.
- La interpretación clínica de cada grupo, incluido un grupo de riesgo silencioso.
- Cómo las variables que incluimos deciden los grupos, y cómo asignar un paciente nuevo a un grupo.

{{< isolate name="5Clustering" params=`lang="es"` width="100%" height="720" title="Agrupación de pacientes con K-Means (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1Vu2bEQ5tSVGRpJeWQ1iBrGKgv6iH85Us)

### Bibliografía

- **Lloyd, S. (1982). Least squares quantization in PCM.** *IEEE Transactions on Information Theory*, 28(2), 129–137. El algoritmo que hoy conocemos como K-means. [https://doi.org/10.1109/TIT.1982.1056489](https://doi.org/10.1109/TIT.1982.1056489) 🇬🇧 (en inglés)
- **Arthur, D. y Vassilvitskii, S. (2007). k-means++: The advantages of careful seeding.** *Proceedings of the 18th Annual ACM-SIAM Symposium on Discrete Algorithms*, 1027–1035. La inicialización que usa scikit-learn. [https://dl.acm.org/doi/10.5555/1283383.1283494](https://dl.acm.org/doi/10.5555/1283383.1283494) 🇬🇧 (en inglés)
- **Hubert, L. y Arabie, P. (1985). Comparing partitions.** *Journal of Classification*, 2, 193–218. El índice de Rand ajustado. [https://doi.org/10.1007/BF01908075](https://doi.org/10.1007/BF01908075) 🇬🇧 (en inglés)
- **Guía de scikit-learn – K-means**: `KMeans`, la inercia y la inicialización. [https://scikit-learn.org/stable/modules/clustering.html#k-means](https://scikit-learn.org/stable/modules/clustering.html#k-means) 🇬🇧 (en inglés)
