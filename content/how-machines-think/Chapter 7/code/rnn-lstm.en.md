---
title: "⚡ Recurrent Networks: RNN and LSTM from Scratch"
weight: 84
description: "Interactive demonstration: an RNN with backpropagation through time in NumPy, the vanishing gradient measured, and the LSTM with its gates."
date:
draft: false
slug: "rnn-lstm-from-scratch"
---

Before the Transformer, sequences were read one token at a time by recurrent networks, and the book explains the wall they hit: in long sequences the information of the first tokens fades. This notebook writes an RNN and backpropagation through time with NumPy, measures how the gradient fades, and compares the RNN with the LSTM on a task where the network must remember a penicillin allergy across a growing number of words.

The interactive notebook includes:

- The book's RNN equations applied step by step to the book's sentence.
- A task that needs memory: the allergy at the start, the prescription at the end.
- Backpropagation through time in NumPy, checked against PyTorch.
- Training the RNN, with gradient clipping.
- The gradient that fades on its way back through 40 words.
- The LSTM and its forget, input and output gates.
- How far each network remembers: RNN, LSTM and LSTM with the forget gate open from the start.

{{< isolate name="7RecurrentNetworksRNNAndLSTM" params=`lang="en"` width="100%" height="720" title="Recurrent Networks: RNN and LSTM from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1se10zL9F-iE8Zm7Yv04BuV5kmzeemGS4)

### Bibliography

- **Elman, J. L. (1990). Finding structure in time.** *Cognitive Science*, 14(2), 179–211. [https://doi.org/10.1207/s15516709cog1402_1](https://doi.org/10.1207/s15516709cog1402_1)
- **Werbos, P. J. (1990). Backpropagation through time: what it does and how to do it.** *Proceedings of the IEEE*, 78(10), 1550–1560. [https://doi.org/10.1109/5.58337](https://doi.org/10.1109/5.58337)
- **Bengio, Y., Simard, P. and Frasconi, P. (1994). Learning long-term dependencies with gradient descent is difficult.** *IEEE Transactions on Neural Networks*, 5(2), 157–166. [https://doi.org/10.1109/72.279181](https://doi.org/10.1109/72.279181)
- **Hochreiter, S. and Schmidhuber, J. (1997). Long short-term memory.** *Neural Computation*, 9(8), 1735–1780. [https://doi.org/10.1162/neco.1997.9.8.1735](https://doi.org/10.1162/neco.1997.9.8.1735)
- **Gers, F. A., Schmidhuber, J. and Cummins, F. (2000). Learning to forget: continual prediction with LSTM.** *Neural Computation*, 12(10), 2451–2471. The forget gate. [https://doi.org/10.1162/089976600300015015](https://doi.org/10.1162/089976600300015015)
- **Pascanu, R., Mikolov, T. and Bengio, Y. (2013). On the difficulty of training recurrent neural networks.** *ICML 2013*. Gradient clipping. [https://arxiv.org/abs/1211.5063](https://arxiv.org/abs/1211.5063)
