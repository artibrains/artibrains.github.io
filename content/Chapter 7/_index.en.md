---
title: "7 - The Language Revolution: Understanding LLMs"
type: "chapter"
weight: 7
draft: true
slug: "language-revolution-llms"
---

With a solid foundation in predictive models, the Hospital Minermont team faces their most complex frontier yet: the vast universe of unstructured data. Every day, thousands of discharge reports, clinical notes, and patient progress records are generated—a treasure trove of information locked in free text. Could AI help them extract knowledge from these clinical narratives?

This question opens the door to the world of **Large Language Models (LLMs)**. Alma García, from AIA, explains that before a model can analyze, summarize, or generate text, it must learn to “read.” And the first step in reading is not understanding words, but breaking them down into manageable pieces.

In this chapter, you will join the team in exploring the fundamental pillars on which all LLMs are built: **tokenization** and **semantic representations**.

1.  **[The Word Craftsman: The BPE Tokenizer]({{% relref "Chapter 7/tokenizer_bpe/tokenizer_bpe.en.md" %}})**: Discover the **Byte-Pair Encoding (BPE)** algorithm. In this interactive simulation, you won't just see how it works—you'll train your own tokenizer. You will understand why this process of "learning a vocabulary" is crucial for an AI model to efficiently handle medical jargon, abbreviations, and the richness of human language.

2.  **[Embedding Projector: Visualizing Word Vectors]({{% relref "Chapter 7/embedding-projector/embedding-projector.en.md" %}})**: You will explore how words transform into mathematical vectors in high-dimensional spaces, where meaning emerges from geometry. Using the **TensorFlow Embedding Projector**, you'll visualize how language models organize medical knowledge, clustering related terms and capturing complex semantic relationships.

3.  **[LLM Visualization: Seeing AI from the Inside]({{% relref "Chapter 7/llm-visualization/llm-visualization.en.md" %}})**: You will discover the inner workings of a large language model through an **interactive 3D visualization**. You can observe how information flows through layers, how the attention mechanism works, and how the model finally predicts the next word. This tool connects everything learned in the chapter in a unique visual experience.

Get ready for the first steps on the journey toward understanding artificial language, a skill that is transforming medicine and the world.

### Mathematical Foundations

- **[Tokenisation & Embedding Geometry]({{% relref "Chapter 7/math/tokenisation-embeddings.en.md" %}})**: Byte-Pair Encoding math and embedding-space intuition that grounds the tokenizer simulator and projector demo.
- **[REINFORCE & RLHF]({{% relref "Chapter 7/math/reinforce.en.md" %}})**: Policy-gradient derivations and the RLHF pipeline aligning language models with Minermont's clinical standards.

### Bibliography and Additional Resources

- **[LLMs and Tokenization]({{% relref "Chapter 7/bibliography/bibliography-llms-tokenization.en.md" %}})**: Verified resources and references on Large Language Models, transformers, tokenization and the BPE algorithm.
- **[Transformers and Attention Mechanisms]({{% relref "Chapter 7/bibliography/bibliography-transformers.en.md" %}})**: Foundational papers, educational resources, official blogs, interviews, and tools on Transformer architectures and their applications.
