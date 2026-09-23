---
title: "⚡ Text Generation and RLHF from Scratch"
weight: 85
description: "Interactive demonstration: next-token distributions, context, greedy decoding, temperature, top-k and top-p, a reward model and reward hacking."
date:
draft: false
slug: "text-generation-rlhf-from-scratch"
---

In chapter 8 the Minermont team moves from how language models are built to how they behave. As Emma explains, generation is a loop with three elements: the context, the distribution of the next token and the decision rule that picks one. And with RLHF, models learn from human preferences through a reward model, which can also be "hacked". This notebook builds both ideas at a small scale with NumPy, on discharge instructions and a patient's question.

The interactive notebook includes:

- A tiny n-gram language model trained on discharge instructions: the distribution of the next word.
- The context: how many previous words the model sees, and how that limits what it gets right.
- Decision rules compared: greedy decoding, temperature, top-k and top-p, and how they combine.
- RLHF in miniature: simulated clinicians compare answers, and a Bradley–Terry reward model learns from their preferences.
- Optimizing the model against the reward model, with the penalty that keeps it close to the original.
- Reward hacking: how an imperfect reward model makes a dangerous answer the most likely one, and how a new round of evaluation fixes it.

{{< isolate name="8TextGenerationAndLearningFromPreferences" params=`lang="en"` width="100%" height="720" title="Text Generation and RLHF from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1-_djegRW1Z5oUntxixes1LM3oVhm88mK)

### Bibliography

- **Holtzman, A., Buys, J., Du, L., Forbes, M. and Choi, Y. (2020). The curious case of neural text degeneration.** *ICLR 2020*. Nucleus (top-p) sampling. [https://arxiv.org/abs/1904.09751](https://arxiv.org/abs/1904.09751)
- **Christiano, P., Leike, J., Brown, T. B., Martic, M., Legg, S. and Amodei, D. (2017). Deep reinforcement learning from human preferences.** *Advances in Neural Information Processing Systems 30*. [https://arxiv.org/abs/1706.03741](https://arxiv.org/abs/1706.03741)
- **Ouyang, L. et al. (2022). Training language models to follow instructions with human feedback.** *Advances in Neural Information Processing Systems 35*. RLHF applied to language models. [https://arxiv.org/abs/2203.02155](https://arxiv.org/abs/2203.02155)
- **Gao, L., Schulman, J. and Hilton, J. (2023). Scaling laws for reward model overoptimization.** *Proceedings of ICML 2023*. [https://arxiv.org/abs/2210.10760](https://arxiv.org/abs/2210.10760)
- **Bradley, R. A. and Terry, M. E. (1952). Rank analysis of incomplete block designs: I. The method of paired comparisons.** *Biometrika*, 39(3/4), 324–345. [https://doi.org/10.2307/2334029](https://doi.org/10.2307/2334029)
