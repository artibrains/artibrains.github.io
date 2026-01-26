---
title: "📝 Word2Vec Algorithm Pseudocode"
weight: 80
description: "Learning word meanings from context: the algorithm that revolutionized NLP."
date: 
draft: false
slug: "word2vec-pseudocode"
---

Word2Vec, introduced by Mikolov et al. at Google in 2013, learns dense vector representations (embeddings) of words from large text corpora. It captures semantic relationships so that similar words have similar vectors, enabling arithmetic like: *king - man + woman ≈ queen*.

## The Algorithm

### Word2Vec Architectures Overview

```
WORD2VEC: Two Architectures
─────────────────────────────────────────────────────────────────

1. SKIP-GRAM:
   Given a target word, predict surrounding context words.
   
   "The quick brown fox jumps"
        ↓
   Target: "brown"
   Predict: ["quick", "fox"] (window size 1)
   
   Best for: Infrequent words, smaller datasets

2. CBOW (Continuous Bag of Words):
   Given surrounding context words, predict the target word.
   
   "The quick ___ fox jumps"
        ↓
   Context: ["quick", "fox"]
   Predict: "brown"
   
   Best for: Frequent words, larger datasets
```

### Skip-Gram Model

```
ALGORITHM: Skip-Gram Training (Basic Version)
─────────────────────────────────────────────────────────────────

INPUT:
    corpus: List of sentences (lists of word tokens)
    V: Vocabulary size
    d: Embedding dimension (typically 100-300)
    window: Context window size
    learning_rate: η

OUTPUT:
    W_in: Input embedding matrix (V × d) - these are the word vectors
    W_out: Output embedding matrix (d × V)

PROCEDURE:
    1. // Initialize embeddings randomly
       W_in ← random_uniform(-0.5/d, 0.5/d, shape=(V, d))
       W_out ← zeros(d, V)
    
    2. // Build vocabulary and word-to-index mapping
       word_to_idx ← {word: i for i, word in enumerate(vocabulary)}
    
    3. // Training loop
       FOR each sentence in corpus:
           FOR t = 0 TO length(sentence) - 1:
               
               target_word ← sentence[t]
               target_idx ← word_to_idx[target_word]
               
               // Get context words within window
               FOR j = max(0, t - window) TO min(len(sentence), t + window):
                   IF j ≠ t:
                       context_word ← sentence[j]
                       context_idx ← word_to_idx[context_word]
                       
                       // Forward pass: predict context from target
                       // Get target word vector
                       v_target ← W_in[target_idx]  // (d,)
                       
                       // Compute scores for all words
                       scores ← W_out.T · v_target  // (V,)
                       
                       // Softmax to get probabilities
                       probs ← softmax(scores)  // (V,)
                       
                       // Backward pass: gradient descent
                       // Gradient of cross-entropy loss
                       error ← probs.copy()
                       error[context_idx] -= 1  // y - ŷ
                       
                       // Update output weights
                       W_out ← W_out - η × outer(v_target, error)
                       
                       // Update input embedding
                       grad_input ← W_out · error
                       W_in[target_idx] ← W_in[target_idx] - η × grad_input
    
    4. RETURN W_in, W_out  // Usually only W_in is used
```

### CBOW Model

```
ALGORITHM: CBOW Training (Basic Version)
─────────────────────────────────────────────────────────────────

INPUT:
    corpus: List of sentences
    V: Vocabulary size
    d: Embedding dimension
    window: Context window size
    learning_rate: η

OUTPUT:
    W_in: Input embedding matrix (V × d)
    W_out: Output embedding matrix (d × V)

PROCEDURE:
    1. // Initialize embeddings
       W_in ← random_uniform(-0.5/d, 0.5/d, shape=(V, d))
       W_out ← zeros(d, V)
    
    2. // Training loop
       FOR each sentence in corpus:
           FOR t = 0 TO length(sentence) - 1:
               
               target_word ← sentence[t]
               target_idx ← word_to_idx[target_word]
               
               // Collect context word indices
               context_indices ← []
               FOR j = max(0, t - window) TO min(len(sentence), t + window):
                   IF j ≠ t:
                       context_indices.append(word_to_idx[sentence[j]])
               
               IF context_indices is empty:
                   CONTINUE
               
               // Forward pass: predict target from context
               // Average context word vectors (CBOW)
               context_vectors ← [W_in[idx] for idx in context_indices]
               v_context ← mean(context_vectors, axis=0)  // (d,)
               
               // Compute scores and probabilities
               scores ← W_out.T · v_context  // (V,)
               probs ← softmax(scores)
               
               // Backward pass
               error ← probs.copy()
               error[target_idx] -= 1
               
               // Update output weights
               W_out ← W_out - η × outer(v_context, error)
               
               // Update input embeddings (distribute gradient to all context words)
               grad_input ← W_out · error
               FOR idx in context_indices:
                   W_in[idx] ← W_in[idx] - η × (grad_input / len(context_indices))
    
    3. RETURN W_in, W_out
```

### Negative Sampling (Efficient Training)

```
ALGORITHM: Skip-Gram with Negative Sampling (SGNS)
─────────────────────────────────────────────────────────────────

// Full softmax over V words is expensive (O(V) per training example)
// Negative sampling approximates it with O(k+1) operations

INPUT:
    corpus: Text corpus
    V, d, window: As before
    k: Number of negative samples (typically 5-20)
    learning_rate: η

PROCEDURE:
    1. // Build noise distribution for negative sampling
       // P(w) ∝ count(w)^0.75 (subsampling frequent words)
       word_counts ← count occurrences of each word
       noise_dist ← (word_counts ** 0.75) / sum(word_counts ** 0.75)
    
    2. // Initialize embeddings
       W_target ← random_uniform(-0.5/d, 0.5/d, shape=(V, d))
       W_context ← zeros(V, d)
    
    3. // Training loop
       FOR each sentence in corpus:
           FOR each (target, context) word pair from sentence:
               
               target_idx ← word_to_idx[target]
               context_idx ← word_to_idx[context]
               
               // Sample k negative words
               neg_samples ← []
               WHILE len(neg_samples) < k:
                   neg_idx ← sample from noise_dist
                   IF neg_idx ≠ context_idx:
                       neg_samples.append(neg_idx)
               
               // Get vectors
               v_target ← W_target[target_idx]
               v_context ← W_context[context_idx]
               
               // ===== POSITIVE EXAMPLE =====
               // Maximize log σ(v_target · v_context)
               
               score_pos ← dot(v_target, v_context)
               sigmoid_pos ← σ(score_pos)
               
               // Gradients for positive pair
               grad_target ← (sigmoid_pos - 1) × v_context
               grad_context ← (sigmoid_pos - 1) × v_target
               
               // ===== NEGATIVE EXAMPLES =====
               // Maximize log σ(-v_target · v_negative)
               
               FOR neg_idx in neg_samples:
                   v_neg ← W_context[neg_idx]
                   score_neg ← dot(v_target, v_neg)
                   sigmoid_neg ← σ(score_neg)
                   
                   // Gradients for negative pair
                   grad_target += sigmoid_neg × v_neg
                   W_context[neg_idx] -= η × sigmoid_neg × v_target
               
               // Update embeddings
               W_target[target_idx] -= η × grad_target
               W_context[context_idx] -= η × grad_context
    
    4. // Final embeddings: often average or concatenate W_target and W_context
       RETURN W_target  // or (W_target + W_context) / 2
```

### Subsampling of Frequent Words

```
ALGORITHM: Subsampling
─────────────────────────────────────────────────────────────────

// Very frequent words like "the", "a", "is" provide less information
// and appear in too many contexts. Subsample them.

INPUT:
    sentence: List of words
    word_freqs: Frequency of each word in corpus
    threshold: t (typically 10⁻⁵)

OUTPUT:
    subsampled_sentence: Sentence with some frequent words removed

PROCEDURE:
    subsampled_sentence ← []
    
    FOR word in sentence:
        freq ← word_freqs[word]
        
        // Probability of keeping the word
        // Higher frequency → lower probability of keeping
        p_keep ← (√(freq / t) + 1) × (t / freq)
        p_keep ← min(p_keep, 1.0)
        
        IF random() < p_keep:
            subsampled_sentence.append(word)
    
    RETURN subsampled_sentence
```

### Hierarchical Softmax (Alternative to Negative Sampling)

```
ALGORITHM: Hierarchical Softmax
─────────────────────────────────────────────────────────────────

// Uses a binary tree (Huffman coding) to reduce softmax from O(V) to O(log V)

STRUCTURE:
    - Build Huffman tree from word frequencies
    - Each word is a leaf
    - Path from root to word = sequence of binary decisions
    - Each internal node has a parameter vector

PREDICTION:
    P(word | context) = ∏ σ(±n_i · v_context)
    
    where the path from root to word passes through nodes n₁, n₂, ..., nₗ
    and ± depends on whether we go left (-) or right (+) at each node

COMPLEXITY:
    O(log V) per training example (vs O(V) for full softmax)
    
TRADE-OFF:
    - More complex to implement
    - Works well for frequent words
    - Negative sampling often preferred in practice
```

## Mathematical Foundation

### Skip-Gram Objective

For a corpus of words $w_1, w_2, \ldots, w_T$:

$$J(\theta) = \frac{1}{T} \sum_{t=1}^{T} \sum_{-c \leq j \leq c, j \neq 0} \log P(w_{t+j} | w_t)$$

where $c$ is the context window size.

### Softmax Probability

$$P(w_O | w_I) = \frac{\exp(v'_{w_O} \cdot v_{w_I})}{\sum_{w=1}^{V} \exp(v'_w \cdot v_{w_I})}$$

### Negative Sampling Objective

Instead of full softmax, maximize:

$$\log \sigma(v'_{w_O} \cdot v_{w_I}) + \sum_{i=1}^{k} \mathbb{E}_{w_i \sim P_n(w)} [\log \sigma(-v'_{w_i} \cdot v_{w_I})]$$

where $P_n(w) \propto \text{count}(w)^{0.75}$ is the noise distribution.

## Complexity Analysis

| Variant | Time per Example | Space |
|---------|------------------|-------|
| Full Softmax | $O(V \cdot d)$ | $O(V \cdot d)$ |
| Negative Sampling | $O((k+1) \cdot d)$ | $O(V \cdot d)$ |
| Hierarchical Softmax | $O(\log V \cdot d)$ | $O(V \cdot d)$ |

Where $V$ = vocabulary size, $d$ = embedding dimension, $k$ = negative samples.

## Word Analogies

```
WORD ANALOGIES: The Famous Result
─────────────────────────────────────────────────────────────────

The learned embeddings capture semantic relationships:

vec("king") - vec("man") + vec("woman") ≈ vec("queen")
vec("Paris") - vec("France") + vec("Germany") ≈ vec("Berlin")
vec("walking") - vec("walk") + vec("swim") ≈ vec("swimming")

ANALOGY SOLVING:
    Given: a is to b as c is to ?
    
    Find: argmax_d cos_similarity(vec(b) - vec(a) + vec(c), vec(d))
          where d ∉ {a, b, c}
```

## Key Insights

1. **Distributional Hypothesis**: Words appearing in similar contexts have similar meanings—Word2Vec operationalizes this.

2. **Dense vs Sparse**: Word2Vec produces dense 100-300 dimensional vectors vs sparse one-hot (V dimensions).

3. **Transfer Learning**: Pre-trained embeddings can boost performance on downstream NLP tasks.

4. **Negative Sampling**: A brilliant computational trick that makes training tractable on large vocabularies.

5. **Subsampling**: Reducing frequent word occurrences improves embedding quality for rare words.

6. **Linear Structure**: Semantic relationships are captured as linear translations in vector space.

## References

- **Mikolov, T., Chen, K., Corrado, G., & Dean, J.** (2013). *Efficient Estimation of Word Representations in Vector Space*. ICLR Workshop. [arXiv:1301.3781](https://arxiv.org/abs/1301.3781)
- **Mikolov, T., Sutskever, I., Chen, K., Corrado, G., & Dean, J.** (2013). *Distributed Representations of Words and Phrases and their Compositionality*. NeurIPS.
- **Goldberg, Y., & Levy, O.** (2014). *word2vec Explained: Deriving Mikolov et al.'s Negative-Sampling Word-Embedding Method*. [arXiv:1402.3722](https://arxiv.org/abs/1402.3722)
- **Rong, X.** (2014). *word2vec Parameter Learning Explained*. [arXiv:1411.2738](https://arxiv.org/abs/1411.2738)
- **Jurafsky, D., & Martin, J. H.** (2023). *Speech and Language Processing*, Chapter 6. [https://web.stanford.edu/~jurafsky/slp3/](https://web.stanford.edu/~jurafsky/slp3/)
