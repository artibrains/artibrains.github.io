---
title: "Chapter 7: The Language Revolution - Understanding LLMs"
type: "chapter"
weight: 7
draft: false
slug: "language-revolution-llms"
---

## The Language Revolution: Understanding LLMs

Large Language Models (LLMs) generate text by learning patterns over sequences. This chapter focuses on the foundations: **tokenization**, **embeddings**, and how text becomes learnable signals.

1.  **[The Word Craftsman: The BPE Tokenizer]({{% relref "how-machines-think/Chapter 7/tokenizer_bpe/tokenizer_bpe.en.md" %}})**: Discover the **Byte-Pair Encoding (BPE)** algorithm. In this interactive simulation, you won't just see how it works—you'll train your own tokenizer. You will understand why this process of "learning a vocabulary" is crucial for an AI model to efficiently handle medical jargon, abbreviations, and the richness of human language.


2.  **[Embedding Projector: Visualizing Word Vectors]({{% relref "how-machines-think/Chapter 7/embedding-projector/embedding-projector.en.md" %}})**: You will explore how words transform into mathematical vectors in high-dimensional spaces, where meaning emerges from geometry. Using the **TensorFlow Embedding Projector**, you'll visualize how language models organize medical knowledge, clustering related terms and capturing complex semantic relationships.


3.  **[LLM Visualization: Seeing AI from the Inside]({{% relref "how-machines-think/Chapter 7/llm-visualization/llm-visualization.en.md" %}})**: You will discover the inner workings of a large language model through an **interactive 3D visualization**. You can observe how information flows through layers, how the attention mechanism works, and how the model finally predicts the next word. This tool connects everything learned in the chapter in a unique visual experience.

4.  **[LLM Landscape: The Most Relevant Models]({{% relref "how-machines-think/Chapter 7/llm-landscape/llm-landscape.en.md" %}})**: A practical map of today’s main model families (frontier APIs, open-weight models, on-device options) and the trade-offs that matter in real deployments.

5.  **[LLM Benchmarks: Current vs. Saturated]({{% relref "how-machines-think/Chapter 7/llm-benchmarks/llm-benchmarks.en.md" %}})**: A curated guide to the most used LLM benchmarks, which ones still discriminate models, and where to verify leaderboard claims.

6.  **[Interactive Game: Training a Language Model]({{% relref "how-machines-think/Chapter 7/llm-training-game/llm-training-game.en.md" %}})**: Experience how a language model progressively improves its predictions as it adjusts its internal parameters. In this educational game, you'll train a small neural network on a thematic corpus, visually observing how values change with each processed example.



### Algorithm Pseudocode

- **[📝 Word2Vec Pseudocode]({{% relref "/how-machines-think/Chapter 7/code/pseudocode-word2vec.en.md" %}})**: Skip-Gram and CBOW architectures, negative sampling, hierarchical softmax, and subsampling techniques.

### Mathematical Foundations

- **[Tokenisation & Embedding Geometry]({{% relref "how-machines-think/Chapter 7/math/tokenisation-embeddings.en.md" %}})**: Byte-Pair Encoding math and embedding-space intuition that grounds the tokenizer simulator and projector demo.
- **[Universal Approximation Theorem]({{% relref "how-machines-think/Chapter 7/math/universal-approximation-theorem.en.md" %}})**: Why a single hidden layer can approximate any continuous function on a compact set (with key references).

### Bibliography and Additional Resources

- **[LLMs and Tokenization]({{% relref "how-machines-think/Chapter 7/bibliography/bibliography-llms-tokenization.en.md" %}})**: Verified resources and references on Large Language Models, transformers, tokenization and the BPE algorithm.
- **[Transformers and Attention Mechanisms]({{% relref "how-machines-think/Chapter 7/bibliography/bibliography-transformers.en.md" %}})**: Foundational papers, educational resources, official blogs, interviews, and tools on Transformer architectures and their applications.
