---
title: "⚡ Transferencia, aumento de datos y clases desequilibradas"
weight: 85
description: "Demostración interactiva: la CNN del libro con solo 280 imágenes, y el efecto de los pesos de clase, el sobremuestreo, el aumento de datos, el aprendizaje por transferencia y más datos."
date:
draft: false
slug: "transferencia-aumento-datos-clases-desequilibradas"
---

Carmen solo encuentra 280 imágenes utilizables en el archivo: 180 benignas, 70 sospechosas y 30 malignas. Ana propone los remedios habituales para un conjunto de datos médico pequeño y desequilibrado. Este notebook mide cada uno con la red del libro en PyTorch, entrenando cada configuración cinco veces y dando el recall de cada clase, como en los resultados de Luis.

El notebook interactivo incluye:

- 280 imágenes sintéticas con el reparto del libro, tomadas con calidad desigual.
- El punto de partida: la red entrenada desde cero.
- Los pesos de clase y el sobremuestreo.
- El aumento de datos con volteos, giros y cambios de iluminación, y el dropout.
- El aprendizaje por transferencia desde 6.000 imágenes de otro hospital: usada tal cual, con las convoluciones congeladas y ajustada por completo.
- El doble de imágenes, con y sin transferencia.
- Un resumen de la exactitud y del recall de las lesiones malignas para cada receta.

{{< isolate name="6TransferenciaAumentoDeDatosYClasesDesequilibradas" params=`lang="es"` width="100%" height="720" title="Transferencia, aumento de datos y clases desequilibradas (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1fdUdKOE2dl9LHsQL9RDom_v9x-dmDOCK)

### Bibliografía

- **Yosinski, J., Clune, J., Bengio, Y. y Lipson, H. (2014). How transferable are features in deep neural networks?** *Advances in Neural Information Processing Systems 27*. [https://arxiv.org/abs/1411.1792](https://arxiv.org/abs/1411.1792) 🇬🇧 (en inglés)
- **Esteva, A., Kuprel, B., Novoa, R. A., Ko, J., Swetter, S. M., Blau, H. M. y Thrun, S. (2017). Dermatologist-level classification of skin cancer with deep neural networks.** *Nature*, 542, 115–118. Aprendizaje por transferencia con lesiones cutáneas. [https://doi.org/10.1038/nature21056](https://doi.org/10.1038/nature21056) 🇬🇧 (en inglés)
- **Shorten, C. y Khoshgoftaar, T. M. (2019). A survey on image data augmentation for deep learning.** *Journal of Big Data*, 6, 60. [https://doi.org/10.1186/s40537-019-0197-0](https://doi.org/10.1186/s40537-019-0197-0) 🇬🇧 (en inglés)
- **He, H. y Garcia, E. A. (2009). Learning from imbalanced data.** *IEEE Transactions on Knowledge and Data Engineering*, 21(9), 1263–1284. [https://doi.org/10.1109/TKDE.2008.239](https://doi.org/10.1109/TKDE.2008.239) 🇬🇧 (en inglés)
- **Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I. y Salakhutdinov, R. (2014). Dropout: a simple way to prevent neural networks from overfitting.** *Journal of Machine Learning Research*, 15, 1929–1958. [https://jmlr.org/papers/v15/srivastava14a.html](https://jmlr.org/papers/v15/srivastava14a.html) 🇬🇧 (en inglés)
