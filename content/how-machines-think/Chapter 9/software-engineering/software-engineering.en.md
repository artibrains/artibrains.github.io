---
title: "AI in Software Engineering"
description: "Coding assistants, code review, and the shift to human‑verified automation."
weight: 5
slug: "ai-software-engineering"
draft: false
---

## Real deployments that changed day-to-day development

This is one of the clearest “AI is already here” domains because changes ship directly into production codebases.

## Concrete implementation: GitHub Copilot (IDE-native assistant)

GitHub Copilot is a widely deployed coding assistant integrated into popular IDEs.

- Product overview: https://github.com/features/copilot
- GitHub Copilot X announcement (chat in editor, PR assistance, docs Q&A): https://github.blog/2023-03-22-github-copilot-x-the-ai-powered-developer-experience/

Why it matters: it puts AI *inside* a workflow that already has checkers (tests, compilers, code review).

## Concrete implementation: AlphaDev in LLVM libc++ (algorithms in the standard library)

Not all “AI for software” is about generating code. Sometimes it discovers better low-level algorithms.

DeepMind’s **AlphaDev** discovered faster sorting routines that were integrated into the **LLVM libc++** sorting library, and also discovered a faster hashing routine released into **Abseil**.

- DeepMind write-up: https://deepmind.google/discover/blog/alphadev-discovers-faster-sorting-algorithms/

## The safe, reusable workflow

- Use AI to propose code or changes.
- Validate with tooling (builds/tests/linters).
- Review like a teammate’s PR.

{{< notice style="info" title="Why this domain works" >}}
Software has strong, automated “checkers”. That’s why AI adoption here is so fast.
{{< /notice >}}
