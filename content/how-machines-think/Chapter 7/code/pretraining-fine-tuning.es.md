---
title: "⚡ Preentrenamiento y fine-tuning en miniatura"
weight: 86
description: "Demostración interactiva: un GPT diminuto preentrenado con texto hospitalario y ajustado para responder preguntas, con y sin replay, comparado con entrenar desde cero."
date:
draft: false
slug: "preentrenamiento-fine-tuning"
---

El iceberg de Ana: una enorme fase de preentrenamiento bajo el agua y una pequeña fase de fine-tuning encima. Este notebook reproduce las dos fases con un GPT diminuto: se preentrena con hojas de alta y notas clínicas sobre 16 diagnósticos y después se ajusta para responder preguntas con ejemplos sobre solo 10 de ellos. Las preguntas sobre los otros 6 muestran lo que el modelo ajustado toma del preentrenamiento.

El notebook interactivo incluye:

- Un corpus de preentrenamiento sin preguntas ni respuestas.
- Lo que sabe el modelo preentrenado, y por qué no responde preguntas.
- 50 pares de pregunta y respuesta para el ajuste de instrucciones.
- El fine-tuning solo con preguntas, y el olvido que provoca.
- El fine-tuning mezclado con texto de preentrenamiento (replay).
- Las mismas preguntas entrenando desde cero: lo que aporta el preentrenamiento.

{{< isolate name="7PreentrenamientoYFineTuning" params=`lang="es"` width="100%" height="720" title="Preentrenamiento y fine-tuning en miniatura (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/11drMTYy59b0rhfksSrftRy-d6obtln5I)

### Bibliografía

- **Howard, J. y Ruder, S. (2018). Universal language model fine-tuning for text classification.** *ACL 2018*. [https://arxiv.org/abs/1801.06146](https://arxiv.org/abs/1801.06146) 🇬🇧 (en inglés)
- **Wei, J. et al. (2022). Finetuned language models are zero-shot learners.** *ICLR 2022*. Ajuste de instrucciones. [https://arxiv.org/abs/2109.01652](https://arxiv.org/abs/2109.01652) 🇬🇧 (en inglés)
- **McCloskey, M. y Cohen, N. J. (1989). Catastrophic interference in connectionist networks: the sequential learning problem.** *Psychology of Learning and Motivation*, 24, 109–165. [https://doi.org/10.1016/S0079-7421(08)60536-8](https://doi.org/10.1016/S0079-7421(08)60536-8) 🇬🇧 (en inglés)
- **Robins, A. (1995). Catastrophic forgetting, rehearsal and pseudorehearsal.** *Connection Science*, 7(2), 123–146. Replay. [https://doi.org/10.1080/09540099550039318](https://doi.org/10.1080/09540099550039318) 🇬🇧 (en inglés)
- **Allen-Zhu, Z. y Li, Y. (2023). Physics of language models: Part 3.1, knowledge storage and extraction.** arXiv:2309.14316. [https://arxiv.org/abs/2309.14316](https://arxiv.org/abs/2309.14316) 🇬🇧 (en inglés)
