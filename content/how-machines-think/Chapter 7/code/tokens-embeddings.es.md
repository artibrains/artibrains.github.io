---
title: "⚡ Tokens y embeddings desde cero"
weight: 81
description: "Demostración interactiva: tokenización, BPE desde cero, embeddings, word2vec y similitud del coseno."
date:
draft: false
slug: "tokens-embeddings-desde-cero"
---

En el capítulo 7, el equipo de Minermont quiere entender los grandes modelos de lenguaje que ya usa a diario. La primera lección trata de la materia prima: una red neuronal solo trabaja con números, así que el texto se corta en tokens, cada token recibe un identificador y cada identificador se convierte en un vector, su embedding. Este notebook construye cada pieza a mano con NumPy.

El notebook interactivo incluye:

- Tres formas de cortar una frase en tokens: caracteres, palabras y subpalabras.
- La tokenización en subpalabras con codificación por pares de bytes (BPE), desde cero, con vocabulario médico.
- De los tokens a los identificadores y a los vectores de embedding.
- Aprender embeddings a partir del contexto con word2vec (skip-gram con muestreo negativo).
- Medir la similitud con el coseno o con la distancia euclídea, y por qué las distancias pierden contraste en muchas dimensiones (notas de Marta, sección 7.9).

{{< isolate name="7TokensYEmbeddings" params=`lang="es"` width="100%" height="720" title="Tokens y embeddings desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1XVHWT9bwlPAqV2cIncCUB_NNUKdNC0gb)

### Bibliografía

- **Sennrich, R., Haddow, B. y Birch, A. (2016). Neural machine translation of rare words with subword units.** *Proceedings of ACL 2016*, 1715–1725. BPE aplicado a los modelos de lenguaje. [https://aclanthology.org/P16-1162/](https://aclanthology.org/P16-1162/) 🇬🇧 (en inglés)
- **Mikolov, T., Chen, K., Corrado, G. y Dean, J. (2013). Efficient estimation of word representations in vector space.** arXiv:1301.3781. [https://arxiv.org/abs/1301.3781](https://arxiv.org/abs/1301.3781) 🇬🇧 (en inglés)
- **Mikolov, T., Sutskever, I., Chen, K., Corrado, G. y Dean, J. (2013). Distributed representations of words and phrases and their compositionality.** *Advances in Neural Information Processing Systems 26*. El muestreo negativo. [https://arxiv.org/abs/1310.4546](https://arxiv.org/abs/1310.4546) 🇬🇧 (en inglés)
- **Beyer, K., Goldstein, J., Ramakrishnan, R. y Shaft, U. (1999). When is "nearest neighbor" meaningful?** *Database Theory – ICDT'99*, 217–235. La concentración de las distancias en muchas dimensiones. [https://doi.org/10.1007/3-540-49257-7_15](https://doi.org/10.1007/3-540-49257-7_15) 🇬🇧 (en inglés)
