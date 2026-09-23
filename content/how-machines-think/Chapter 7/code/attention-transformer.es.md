---
title: "⚡ La atención y el Transformer desde cero"
weight: 82
description: "Demostración interactiva: los límites de las redes recurrentes, la atención de producto escalar, las máscaras, la atención multicabeza, la codificación posicional y un bloque Transformer."
date:
draft: false
slug: "atencion-transformer-desde-cero"
---

El libro cuenta cómo las redes recurrentes chocaron con un muro en los textos largos, y cómo el artículo *Attention Is All You Need* las sustituyó por el Transformer, cuya pieza central es la atención: cada token puede mirar directamente a todos los demás y decidir cuánto importa cada uno. Este notebook lo construye pieza a pieza con NumPy, siguiendo las notas de Marta (secciones 7.7 y 7.8).

El notebook interactivo incluye:

- El muro de las redes recurrentes: cómo se desvanece la memoria de las primeras palabras.
- La atención de producto escalar, paso a paso: consultas, claves, valores y la softmax.
- Por qué las puntuaciones se dividen por $\sqrt{d_k}$.
- La autoatención sobre una frase, y la máscara causal que se usa para generar texto.
- La atención multicabeza.
- La codificación posicional con senos y cosenos.
- Un bloque Transformer completo: atención, conexiones residuales, normalización y la capa feed-forward.

{{< isolate name="7LaAtencionYElTransformer" params=`lang="es"` width="100%" height="720" title="La atención y el Transformer desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1kIHLfK3fll-54VY9yYTNUrdCfHl1E1fW)

### Bibliografía

- **Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. y Polosukhin, I. (2017). Attention is all you need.** *Advances in Neural Information Processing Systems 30*. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762) 🇬🇧 (en inglés)
- **Bahdanau, D., Cho, K. y Bengio, Y. (2015). Neural machine translation by jointly learning to align and translate.** *ICLR 2015*. El primer mecanismo de atención. [https://arxiv.org/abs/1409.0473](https://arxiv.org/abs/1409.0473) 🇬🇧 (en inglés)
- **Bengio, Y., Simard, P. y Frasconi, P. (1994). Learning long-term dependencies with gradient descent is difficult.** *IEEE Transactions on Neural Networks*, 5(2), 157–166. [https://doi.org/10.1109/72.279181](https://doi.org/10.1109/72.279181) 🇬🇧 (en inglés)
