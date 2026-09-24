---
title: "⚡ Un modelo de lenguaje tipo GPT desde cero"
weight: 85
description: "Demostración interactiva: un Transformer decoder-only diminuto escrito en PyTorch y entrenado prediciendo el siguiente token, comparado con un modelo de trigramas."
date:
draft: false
slug: "modelo-lenguaje-gpt-desde-cero"
---

Ana describe la estructura de un LLM tipo GPT, embeddings, bloques Transformer con atención causal y una cabeza LM, y su objetivo de entrenamiento, predecir el siguiente token. Este notebook construye uno diminuto con PyTorch y lo entrena con hojas de alta sintéticas en las que el diagnóstico del principio decide el fármaco y el signo de alarma varias frases después.

El notebook interactivo incluye:

- Un corpus en el que el contexto importa.
- Del texto a los ejemplos de entrenamiento: entrada y objetivo desplazados un token.
- La autoatención causal, bloques Transformer con Pre-LayerNorm y una cabeza LM con weight tying.
- El entrenamiento prediciendo el siguiente token con la entropía cruzada.
- El modelo frente a un modelo de trigramas con 500 hojas nuevas.
- Los pesos de atención: la cabeza que encuentra el diagnóstico.
- La generación de hojas de alta muestreando, y las incoherentes.

{{< isolate name="7ModeloDeLenguajeTipoGPT" params=`lang="es"` width="100%" height="720" title="Un modelo de lenguaje tipo GPT desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1rn1o8JkRqBz7VjiO05shsMTbYQN7m4e-)

### Bibliografía

- **Radford, A., Narasimhan, K., Salimans, T. y Sutskever, I. (2018). Improving language understanding by generative pre-training.** OpenAI. [https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf) 🇬🇧 (en inglés)
- **Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. y Polosukhin, I. (2017). Attention is all you need.** *Advances in Neural Information Processing Systems 30*. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762) 🇬🇧 (en inglés)
- **Xiong, R. et al. (2020). On layer normalization in the Transformer architecture.** *ICML 2020*. Pre-LayerNorm. [https://arxiv.org/abs/2002.04745](https://arxiv.org/abs/2002.04745) 🇬🇧 (en inglés)
- **Press, O. y Wolf, L. (2017). Using the output embedding to improve language models.** *EACL 2017*. Weight tying. [https://arxiv.org/abs/1608.05859](https://arxiv.org/abs/1608.05859) 🇬🇧 (en inglés)
