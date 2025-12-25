---
title: "3.4 The Critical Decision: Risk Manager"
weight: 4
draft: false
slug: "risk-manager"
---

## Introduction

Fine-tuning decision thresholds is essential for the real-world performance of predictive models. While AI can flag risky patients automatically, the clinical impact ultimately depends on choosing the point where reminders, interventions, and operational costs stay in balance. The **Risk Manager** simulation lets you experiment with that trade-off and see how the cost curve responds in real time.

{{< medical-context
    type="clinic"
    difficulty="intermediate"
    scenario="You manage a clinic that wants to minimise missed appointments. A model estimates the probability that each patient will skip their visit, but you must decide the threshold that triggers reminder calls."
    highlight="Setting the threshold too low floods the staff with unnecessary reminders, whereas setting it too high allows no-shows that waste clinical capacity. The goal is to minimise the total operational cost by finding the optimal balance between reminders and missed appointments."
    steps="Inspect the patient probabilities: Review how the simulated patients distribute across risk levels of no-show.|Tune the decision threshold: Move the slider and watch which patients receive reminders versus which are allowed to skip. Observe how true positives and false negatives change.|Compare total cost: Track reminder spending (€5 each) versus missed-appointment penalties (€25 each) to locate the minimum operational cost."
>}}

## Interactive Demonstration

{{< demo-wrapper title="Risk Manager Simulator" >}}

{{< risk_gestor_info lang="en" >}}

{{< risk_gestor lang="en" >}}

{{< /demo-wrapper >}}

## Core Concepts

{{% notice style="info" title="Threshold Tuning" %}}
Choosing the right threshold converts predicted probabilities into binary actions. Lower thresholds favour sensitivity (fewer missed high-risk patients) while higher thresholds favour specificity (fewer unnecessary reminders).
{{% /notice %}}

{{% notice style="tip" title="Cost-Aware Evaluation" %}}
This simulator balances two concrete costs: €5 per reminder that is sent and €25 for each no-show that was not warned in time. The optimal operating point minimises the combined expense rather than maximising accuracy alone.
{{% /notice %}}

{{% notice style="warning" title="Common Pitfalls" %}}
- Ignoring base rates makes the threshold overly aggressive or too lax.
- Optimising accuracy only can be misleading when the costs of false positives and false negatives differ.
- Thresholds need periodic recalibration as patient behaviour or business constraints evolve.
{{% /notice %}}

{{< terminal >}}
