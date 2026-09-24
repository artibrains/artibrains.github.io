---
title: "⚡ Generación de texto y RLHF desde cero"
weight: 85
description: "Demostración interactiva: la distribución del siguiente token, el contexto, la decodificación voraz, la temperatura, top-k y top-p, un modelo de recompensa y el reward hacking."
date:
draft: false
slug: "generacion-texto-rlhf-desde-cero"
---

En el capítulo 8, el equipo de Minermont pasa de cómo se construyen los modelos de lenguaje a cómo se comportan. Como explica Ana, la generación es un bucle con tres elementos: el contexto, la distribución del siguiente token y la regla de decisión que elige uno. Y con RLHF los modelos aprenden de las preferencias humanas a través de un modelo de recompensa, que también se puede "engañar". Este notebook construye las dos ideas a pequeña escala con NumPy, con instrucciones de alta y la pregunta de un paciente.

El notebook interactivo incluye:

- Un modelo de lenguaje de n-gramas diminuto entrenado con instrucciones de alta: la distribución de la siguiente palabra.
- El contexto: cuántas palabras anteriores ve el modelo, y cómo eso limita lo que acierta.
- Las reglas de decisión comparadas: la decodificación voraz, la temperatura, top-k y top-p, y cómo se combinan.
- La búsqueda en haz: buscar la frase más probable en lugar de la mejor palabra siguiente, y la normalización por la longitud.
- RLHF en miniatura: unos clínicos simulados comparan respuestas y un modelo de recompensa de Bradley–Terry aprende de sus preferencias.
- La optimización del modelo contra el modelo de recompensa, con la penalización que lo mantiene cerca del original.
- El *reward hacking*: cómo un modelo de recompensa imperfecto convierte una respuesta peligrosa en la más probable, y cómo lo corrige una nueva ronda de evaluación.

{{< isolate name="8GeneracionDeTextoYAprendizajeDePreferencias" params=`lang="es"` width="100%" height="720" title="Generación de texto y RLHF desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1sVSMlLTHwm0MFSo_CUUnVulxqUcQy06S)

### Bibliografía

- **Holtzman, A., Buys, J., Du, L., Forbes, M. y Choi, Y. (2020). The curious case of neural text degeneration.** *ICLR 2020*. El muestreo de núcleo (top-p). [https://arxiv.org/abs/1904.09751](https://arxiv.org/abs/1904.09751) 🇬🇧 (en inglés)
- **Wu, Y. et al. (2016). Google's neural machine translation system: bridging the gap between human and machine translation.** arXiv:1609.08144. La búsqueda en haz con normalización por la longitud. [https://arxiv.org/abs/1609.08144](https://arxiv.org/abs/1609.08144) 🇬🇧 (en inglés)
- **Christiano, P., Leike, J., Brown, T. B., Martic, M., Legg, S. y Amodei, D. (2017). Deep reinforcement learning from human preferences.** *Advances in Neural Information Processing Systems 30*. [https://arxiv.org/abs/1706.03741](https://arxiv.org/abs/1706.03741) 🇬🇧 (en inglés)
- **Ouyang, L. et al. (2022). Training language models to follow instructions with human feedback.** *Advances in Neural Information Processing Systems 35*. RLHF aplicado a los modelos de lenguaje. [https://arxiv.org/abs/2203.02155](https://arxiv.org/abs/2203.02155) 🇬🇧 (en inglés)
- **Gao, L., Schulman, J. y Hilton, J. (2023). Scaling laws for reward model overoptimization.** *Proceedings of ICML 2023*. [https://arxiv.org/abs/2210.10760](https://arxiv.org/abs/2210.10760) 🇬🇧 (en inglés)
- **Bradley, R. A. y Terry, M. E. (1952). Rank analysis of incomplete block designs: I. The method of paired comparisons.** *Biometrika*, 39(3/4), 324–345. [https://doi.org/10.2307/2334029](https://doi.org/10.2307/2334029) 🇬🇧 (en inglés)
