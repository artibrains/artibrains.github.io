---
title: "AI in Mathematics"
description: "From theorem proving to geometry: AI as a discovery partner."
weight: 4
slug: "ai-mathematics"
draft: false
---

## Why mathematics is a perfect “truth test” for AI

Math is where you can’t hide behind plausibility. Either the proof checks, or it doesn’t.

That’s why the most important breakthroughs here look like this:

> **Generator + checker** (a creative proposer paired with a strict verifier).

## Concrete breakthrough: AlphaGeometry (Olympiad-level geometry)

DeepMind’s **AlphaGeometry** is a good example of “AI that can be checked”. It combines:

- A neural model that proposes useful geometric constructions.
- A symbolic deduction engine that produces a proof with machine-verifiable structure.

DeepMind reports that AlphaGeometry solved **25 out of 30** Olympiad geometry problems in a benchmark set, under competition time limits, and provides references + code.

- Overview: https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/
- Paper (Nature): https://www.nature.com/articles/s41586-023-06747-5
- Code: https://github.com/google-deepmind/alphageometry

## What this teaches us (beyond math)

If you want AI you can trust in high-stakes settings, bring the checker into the workflow:

- Math: symbolic engines / proof checkers.
- Code: compilers, tests, linters, static analysis.
- Medicine: validated clinical pathways, regulatory controls, human sign-off.

The Minermont lesson holds: **generation is cheap; verification is everything**.
