---
title: "⚡ Pretraining and Fine-tuning in Miniature"
weight: 86
description: "Interactive demonstration: a tiny GPT pretrained on hospital text and fine-tuned to answer questions, with and without replay, compared with training from scratch."
date:
draft: false
slug: "pretraining-fine-tuning"
---

Emma's iceberg: a huge pretraining phase under the water and a small fine-tuning phase on top. This notebook reproduces the two phases with a tiny GPT: it is pretrained on discharge sheets and clinical notes about 16 diagnoses, and then fine-tuned to answer questions with examples about only 10 of them. The questions about the other 6 show what the fine-tuned model takes from pretraining.

The interactive notebook includes:

- A pretraining corpus with no questions and no answers.
- What the pretrained model knows, and why it does not answer questions.
- 50 question-answer pairs for instruction tuning.
- Fine-tuning with questions only, and the forgetting it causes.
- Fine-tuning mixed with pretraining text (replay).
- The same questions trained from scratch: what pretraining contributes.

{{< isolate name="7PretrainingAndFineTuning" params=`lang="en"` width="100%" height="720" title="Pretraining and Fine-tuning in Miniature (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1h3Y8hOh3wWkIhVr6VfAxmxve0YFVWb_X)

### Bibliography

- **Howard, J. and Ruder, S. (2018). Universal language model fine-tuning for text classification.** *ACL 2018*. [https://arxiv.org/abs/1801.06146](https://arxiv.org/abs/1801.06146)
- **Wei, J. et al. (2022). Finetuned language models are zero-shot learners.** *ICLR 2022*. Instruction tuning. [https://arxiv.org/abs/2109.01652](https://arxiv.org/abs/2109.01652)
- **McCloskey, M. and Cohen, N. J. (1989). Catastrophic interference in connectionist networks: the sequential learning problem.** *Psychology of Learning and Motivation*, 24, 109–165. [https://doi.org/10.1016/S0079-7421(08)60536-8](https://doi.org/10.1016/S0079-7421(08)60536-8)
- **Robins, A. (1995). Catastrophic forgetting, rehearsal and pseudorehearsal.** *Connection Science*, 7(2), 123–146. Replay. [https://doi.org/10.1080/09540099550039318](https://doi.org/10.1080/09540099550039318)
- **Allen-Zhu, Z. and Li, Y. (2023). Physics of language models: Part 3.1, knowledge storage and extraction.** arXiv:2309.14316. [https://arxiv.org/abs/2309.14316](https://arxiv.org/abs/2309.14316)
