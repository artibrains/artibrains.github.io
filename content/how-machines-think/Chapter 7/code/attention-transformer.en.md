---
title: "⚡ Attention and the Transformer from Scratch"
weight: 82
description: "Interactive demonstration: the limits of recurrent networks, scaled dot-product attention, masks, multi-head attention, positional encoding and a Transformer block."
date:
draft: false
slug: "attention-transformer-from-scratch"
---

The book tells how recurrent networks hit a wall with long texts, and how the paper *Attention Is All You Need* replaced them with the Transformer, whose central piece is attention: every token can look directly at every other token and decide how much each one matters. This notebook builds it piece by piece with NumPy, following Martha's notes (sections 7.7 and 7.8).

The interactive notebook includes:

- The wall of recurrent networks: how the memory of the first words fades.
- Scaled dot-product attention, step by step: queries, keys, values and the softmax.
- Why the scores are divided by $\sqrt{d_k}$.
- Self-attention over a sentence, and the causal mask used to generate text.
- Multi-head attention.
- Positional encoding with sines and cosines.
- A complete Transformer block: attention, residual connections, normalization and the feed-forward layer.

{{< isolate name="7AttentionAndTheTransformer" params=`lang="en"` width="100%" height="720" title="Attention and the Transformer from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1-dhdEsLhlgIs5gC2ldqvCFW8rINv7gHa)

### Bibliography

- **Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. and Polosukhin, I. (2017). Attention is all you need.** *Advances in Neural Information Processing Systems 30*. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
- **Bahdanau, D., Cho, K. and Bengio, Y. (2015). Neural machine translation by jointly learning to align and translate.** *ICLR 2015*. The first attention mechanism. [https://arxiv.org/abs/1409.0473](https://arxiv.org/abs/1409.0473)
- **Bengio, Y., Simard, P. and Frasconi, P. (1994). Learning long-term dependencies with gradient descent is difficult.** *IEEE Transactions on Neural Networks*, 5(2), 157–166. [https://doi.org/10.1109/72.279181](https://doi.org/10.1109/72.279181)
