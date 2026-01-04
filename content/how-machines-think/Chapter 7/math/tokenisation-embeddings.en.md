---
title: "📐 Tokenisation & Embedding Geometry"
description: "Explains Byte-Pair Encoding, embedding space structure, and why token choices shape clinical language models."
weight: 90
draft: false
slug: "tokenisation-embedding-geometry"
math: true
---

## Context

Chapter 7 shows how Minermont's narratives become digestible for language models. The mathematics behind Byte-Pair Encoding (BPE) and embedding spaces explains the behaviour of the tokenizer simulator and embedding projector featured in the chapter.

## Byte-Pair Encoding Recap

Starting from a character-level vocabulary plus the end-of-word symbol `</w>`, each word is split into symbols (e.g., `heart → h e a r t </w>`). At every iteration merge the most frequent adjacent pair

$$
ab = \operatorname*{arg\,max}_{(a,b)} \mathrm{freq}(a,b),
$$

replace all occurrences of `a b` with the new symbol `ab`, and add it to the vocabulary. Efficient implementations update only the counts surrounding the merged pair, keeping the complexity nearly linear in corpus size.

## Worked Example

For the corpus `{ "heart", "hearth", "heart", "hear" }`, the algorithm first merges `("h","e")` to form `"he"`, then `("he","a")` to form `"hea"`, and continues until tokens such as `"heart"` and `"he"` emerge—mirroring how the demo captures medical prefixes and abbreviations.

## Embedding Space Geometry

Once tokens $t$ are defined, each receives a vector $v_t \in \mathbb{R}^d$ learned during training.

- *Cosine similarity* quantifies semantic alignment:

  $$
  \cos(\theta_{ij}) = \frac{v_i \cdot v_j}{\lVert v_i \rVert \lVert v_j \rVert},
  
$$

  so angles near zero indicate related concepts (e.g., `cardiology`, `cardiologist`).
- *Linear structure* captures analogies, such as

  $$
  v_{"doctor"} - v_{"male"} + v_{"female"} \approx v_{"doctor"_{\text{female}}},
  
$$

  because training encourages consistent vector differences.
- *Centering & PCA.* With embedding matrix $E \in \mathbb{R}^{|\mathcal{V}| \times d}$, centre it via

  $$
  \tilde{E} = \left(I - \tfrac{1}{|\mathcal{V}|} \mathbf{1}\mathbf{1}^\top\right)E
  
$$

  and project onto principal components of $\tilde{E}^\top \tilde{E}$ to reveal clusters (for example, cardiovascular versus respiratory terms).

## Tokeniser ↔ Embedding Link

Clean merges that respect morpheme boundaries (e.g., `cardio-`, `neuro-`) yield coherent subword embeddings and better downstream performance on medical abbreviations like `ECG`. Aggressive merges mix unrelated morphemes, degrading cosine alignment within subdomains.

{{% notice style="info" title="Practical takeaway" %}}
Clinical fine-tuning often adapts the tokenizer so high-frequency multi-character symbols (e.g., `HbA1c`) become single tokens, stabilising their embeddings.{{% /notice %}}

## References

1. R. Sennrich, B. Haddow, A. Birch. *Neural Machine Translation of Rare Words with Subword Units*. ACL, 2016.
2. T. Mikolov et al. *Efficient Estimation of Word Representations in Vector Space*. ICLR, 2013.
3. Y. Goldberg. *Neural Network Methods for Natural Language Processing*. Morgan & Claypool, 2017. Chapters 4–5.
4. J. Devlin et al. *BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding*. NAACL, 2019.
