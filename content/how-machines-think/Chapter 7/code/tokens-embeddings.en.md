---
title: "⚡ Tokens and Embeddings from Scratch"
weight: 81
description: "Interactive demonstration: tokenization, BPE from scratch, embeddings, word2vec and cosine similarity."
date:
draft: false
slug: "tokens-embeddings-from-scratch"
---

In chapter 7 the Minermont team wants to understand the large language models they already use every day. The first lesson is about the raw material: a neural network only works with numbers, so text is cut into tokens, each token gets an ID and each ID becomes a vector, its embedding. This notebook builds each piece by hand with NumPy.

The interactive notebook includes:

- Three ways to cut a sentence into tokens: characters, words and subwords.
- Subword tokenization with byte-pair encoding (BPE), from scratch, on medical vocabulary.
- From tokens to IDs and to embedding vectors.
- Learning embeddings from context with word2vec (skip-gram with negative sampling).
- Measuring similarity with the cosine or the Euclidean distance, and why distances lose contrast in many dimensions (Martha's notes, section 7.9).

{{< isolate name="7TokensAndEmbeddings" params=`lang="en"` width="100%" height="720" title="Tokens and Embeddings from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/148VnMDMIPYNaFI-R6NX9NXQuK7uLDXBj)

### Bibliography

- **Sennrich, R., Haddow, B. and Birch, A. (2016). Neural machine translation of rare words with subword units.** *Proceedings of ACL 2016*, 1715–1725. BPE applied to language models. [https://aclanthology.org/P16-1162/](https://aclanthology.org/P16-1162/)
- **Mikolov, T., Chen, K., Corrado, G. and Dean, J. (2013). Efficient estimation of word representations in vector space.** arXiv:1301.3781. [https://arxiv.org/abs/1301.3781](https://arxiv.org/abs/1301.3781)
- **Mikolov, T., Sutskever, I., Chen, K., Corrado, G. and Dean, J. (2013). Distributed representations of words and phrases and their compositionality.** *Advances in Neural Information Processing Systems 26*. Negative sampling. [https://arxiv.org/abs/1310.4546](https://arxiv.org/abs/1310.4546)
- **Beyer, K., Goldstein, J., Ramakrishnan, R. and Shaft, U. (1999). When is "nearest neighbor" meaningful?** *Database Theory – ICDT'99*, 217–235. The concentration of distances in high dimensions. [https://doi.org/10.1007/3-540-49257-7_15](https://doi.org/10.1007/3-540-49257-7_15)
