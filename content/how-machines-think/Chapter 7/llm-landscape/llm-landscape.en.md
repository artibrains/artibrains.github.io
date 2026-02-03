---
title: "LLM Landscape: The Most Relevant Models (and How to Compare Them)"
description: "A practical map of major LLM families, what they’re good for, and where to compare them via credible benchmarks."
weight: 4
draft: false
slug: "llm-landscape"
---

## Why this page exists

The LLM world changes fast. Instead of trying to crown a single “best model”, this page helps you answer a more useful question:

> **Which model family is most relevant for my use case, constraints, and evaluation method?**

In Minermont-like settings (healthcare, sensitive data, regulated workflows) the answer often depends as much on **deployment and governance** as on raw capability.

{{% notice style="tip" title="How to use this page" %}}
Use the **families** below to shortlist candidates, then validate them with the **benchmark hubs** and **leaderboards** linked in the “Where to compare models” section.
{{% /notice %}}

## What “most relevant” means in practice

When people say “best LLM”, they often mix different dimensions. It’s clearer to compare models along these axes:

- **Quality**: reasoning, writing, coding, multilingual ability
- **Reliability**: instruction following, structured output, consistency across prompts
- **Context window**: how much text you can provide at once (and how well it actually uses it)
- **Multimodality**: text-only vs. text+vision (and sometimes audio)
- **Latency & throughput**: user-facing speed vs. batch processing
- **Cost**: tokens, rate limits, and operational costs if self-hosting
- **Privacy & compliance**: data retention policies, on-prem options, auditability
- **License & deployability**: API-only vs. open-weight models you can run yourself

## The main LLM families (with representative examples)

### 1) Frontier proprietary API models

These tend to lead on general capability and multimodality, and they usually have the smoothest tool ecosystems.

- **OpenAI (GPT family)** – strong general capability, broad tooling.
  - Docs: https://platform.openai.com/docs/
- **Anthropic (Claude family)** – strong writing and instruction-following; commonly used for summarization and analysis.
  - Docs: https://docs.anthropic.com/
- **Google (Gemini family)** – strong long-context and multimodal workflows in Google’s ecosystem.
  - Docs: https://ai.google.dev/

**When they’re most relevant**
- You need the fastest path to high quality for product features.
- You benefit from polished multimodal or tool-calling features.

**What to watch out for**
- Data governance, retention, and regional compliance requirements.
- Vendor lock-in and changing model/version behavior.

### 2) Open-weight general-purpose models (self-hostable)

These are the backbone of private deployments and research workflows. They can be run locally, in your own cloud, or on-prem.

Representative families you’ll see often:
- **Meta Llama**: https://www.llama.com/ and https://github.com/meta-llama/
- **Mistral / Mixtral**: https://docs.mistral.ai/
- **Qwen (Alibaba)**: https://huggingface.co/Qwen

**When they’re most relevant**
- You require **full control** over data and logs.
- You want to fine-tune or adapt a model to a specific domain.

**What to watch out for**
- “Open-weight” ≠ “open-source”: always check the license and allowed use.
- Ops burden: serving, scaling, observability, and security become your responsibility.

### 3) Small/on-device models

Smaller models can be great when latency and privacy dominate, or when you want a cheap first-pass system.

Representative examples:
- **Microsoft Phi** family (model hub): https://huggingface.co/microsoft
- **Google Gemma** family (model hub): https://huggingface.co/google

**When they’re most relevant**
- On-device or edge scenarios.
- High-volume tasks where a “good-enough” model saves cost.

### 4) Code- and developer-focused models

These models often do better on code completion, refactoring, and repo-level tasks.

Common places to track them:
- Hugging Face “coder” model hubs (various): https://huggingface.co/models?pipeline_tag=text-generation&search=coder
- SWE-bench leaderboard (real-world bug-fixing): https://www.swebench.com/

**When they’re most relevant**
- IDE copilots, test generation, migration scripts, and codebase Q&A.

### 5) “Reasoning” and tool-using systems

Many modern deployments combine:
- an LLM,
- **retrieval** (RAG),
- **tools** (search, calculators, database queries), and
- **verifiers/guardrails**.

This matters because some “reasoning gains” come from the *system design*, not only the base model.

Useful tooling references:
- vLLM (serving open-weight models): https://docs.vllm.ai/
- Ollama (local model runner): https://ollama.com/

## Where to compare models (benchmarks & leaderboards)

These are the places where you can consult “most of the benchmarks” in one way or another (either via aggregated leaderboards or reproducible eval frameworks):

- **LMSYS Chatbot Arena** (human preference comparisons): https://lmarena.ai/
- **Hugging Face Open LLM Leaderboard** (open-weight models, standardized evals): https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- **Stanford CRFM HELM** (broad, principled evaluation harness & reports): https://crfm.stanford.edu/helm/
- **Papers with Code** (task-by-task benchmark pages + leaderboards): https://paperswithcode.com/
- **EleutherAI LM Evaluation Harness** (reproducible evaluation toolkit): https://github.com/EleutherAI/lm-evaluation-harness
- **SWE-bench** (real-world software engineering benchmark + leaderboard): https://www.swebench.com/
- **MLPerf** (standardized performance benchmarking; includes some LLM tracks): https://mlcommons.org/en/mlperf/

{{% notice style="info" title="A quick mental model" %}}
Prefer **multiple evidence sources**:
- a standardized benchmark suite (e.g., HELM / Open LLM Leaderboard)
- a human-preference signal (e.g., Arena)
- a task-specific benchmark closest to your use case (e.g., SWE-bench for coding)
{{% /notice %}}

## A lightweight model-selection checklist (Minermont-style)

1. **Start with constraints**: where will data live, and who audits it?
2. **Pick 2–4 candidate families**: one frontier API model + one open-weight + one small model (optional).
3. **Use benchmarks to narrow**: don’t obsess over a single score.
4. **Run a domain eval**: a small, well-curated set of clinical-like tasks beats generic leaderboards.
5. **Add guardrails**: citations, retrieval, structured output, and human review for high-stakes outputs.

## References and deeper reading

- OpenAI Docs: https://platform.openai.com/docs/
- Anthropic Docs: https://docs.anthropic.com/
- Google Gemini Docs: https://ai.google.dev/
- Meta Llama: https://www.llama.com/
- Mistral Docs: https://docs.mistral.ai/
- Hugging Face Model Hub: https://huggingface.co/models
- HELM: https://crfm.stanford.edu/helm/
- Open LLM Leaderboard: https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- Chatbot Arena: https://lmarena.ai/
- Papers with Code: https://paperswithcode.com/
