---
title: "AlphaFold and the Protein Structure Breakthrough"
description: "A landmark result: predicting protein 3D structure at scale."
weight: 2
slug: "alphafold-protein-structure"
draft: false
---

## What makes AlphaFold a *real* breakthrough

AlphaFold is not a vague promise about “AI in biology”. It’s a concrete, measurable jump in protein structure prediction that then became **usable infrastructure**.

Two things made it revolutionary:

1) **A step-change in accuracy at CASP14** (a community benchmark).
2) A public, searchable database where researchers can actually use the results.

## Concrete implementation you can explore

### AlphaFold Protein Structure Database (AlphaFold DB)

DeepMind and EMBL‑EBI operate **AlphaFold DB**, which provides open access to protein structure predictions.

- Website: https://alphafold.ebi.ac.uk/
- The database description states it contains **over 200 million entries**, covering broad UniProt coverage.
- It also links to the **methodology paper** and FAQ/limitations.

### Open-source code

If your protein isn’t in the DB (or you want to reproduce runs), you can start here:

- Code: https://github.com/google-deepmind/alphafold

## Why this changed real workflows

AlphaFold is best understood as **scientific infrastructure**:

- It narrows the search space for experiments.
- It accelerates hypothesis generation and protein function analysis.
- It enables broad, programmatic access to predicted structures at a scale labs can’t match experimentally.

{{< notice style="info" title="The key pattern" >}}
High leverage AI in science often means: *reduce search → prioritize experiments → speed up discovery*.
{{< /notice >}}

## Important limitations (don’t skip this)

Even AlphaFold DB emphasizes limitations and proper interpretation. Always check confidence signals (e.g., pLDDT/PAE) and validate when decisions are high-stakes.

- AlphaFold DB FAQ: https://alphafold.ebi.ac.uk/faq

## Further reading

- DeepMind announcement of the database launch: https://deepmind.google/discover/blog/putting-the-power-of-alphafold-into-the-worlds-hands/
- AlphaFold DB “Methodology” link (Nature): https://www.nature.com/articles/s41586-021-03819-2
