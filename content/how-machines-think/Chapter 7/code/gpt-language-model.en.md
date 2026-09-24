---
title: "⚡ A GPT-style Language Model from Scratch"
weight: 85
description: "Interactive demonstration: a tiny decoder-only Transformer written in PyTorch and trained on next-token prediction, compared with a trigram model."
date:
draft: false
slug: "gpt-language-model-from-scratch"
---

Emma describes the structure of a GPT-style LLM, embeddings, Transformer blocks with causal attention and an LM head, and its training objective, predicting the next token. This notebook builds a tiny one with PyTorch and trains it on synthetic discharge sheets in which the diagnosis at the top decides the drug and the warning sign several sentences later.

The interactive notebook includes:

- A corpus where the context matters.
- From text to training examples: input and target shifted by one token.
- Causal self-attention, Pre-LayerNorm Transformer blocks and an LM head with weight tying.
- Training by next-token prediction with the cross-entropy.
- The model against a trigram model on 500 new sheets.
- The attention weights: the head that finds the diagnosis.
- Generating discharge sheets by sampling, and the incoherent ones.

{{< isolate name="7GPTStyleLanguageModel" params=`lang="en"` width="100%" height="720" title="A GPT-style Language Model from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1xZVnKI98WmOkg3Ob6rwJTTNOalH2sqNx)

### Bibliography

- **Radford, A., Narasimhan, K., Salimans, T. and Sutskever, I. (2018). Improving language understanding by generative pre-training.** OpenAI. [https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
- **Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. and Polosukhin, I. (2017). Attention is all you need.** *Advances in Neural Information Processing Systems 30*. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
- **Xiong, R. et al. (2020). On layer normalization in the Transformer architecture.** *ICML 2020*. Pre-LayerNorm. [https://arxiv.org/abs/2002.04745](https://arxiv.org/abs/2002.04745)
- **Press, O. and Wolf, L. (2017). Using the output embedding to improve language models.** *EACL 2017*. Weight tying. [https://arxiv.org/abs/1608.05859](https://arxiv.org/abs/1608.05859)
