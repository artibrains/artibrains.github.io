---
title: "3.3 The Critical Decision: Risk Manager"
weight: 4
draft: false
slug: "risk-manager"
---

## Introduction

Fine-tuning decision thresholds is essential for the real-world performance of predictive models. Even if a model can flag high-risk cases automatically, the impact ultimately depends on choosing the point where actions and operational costs stay in balance. The **Risk Manager** simulation lets you experiment with that trade-off and see how the cost curve responds in real time.

{{< demo-wrapper class="unified-activity" >}}
{{< demo-intro
lang="en"
title="Risk Manager: Cost-Aware Threshold Tuning"
scenario="You manage a product that wants to reduce churn. A model estimates the probability that each user will drop off, but you must decide the threshold that triggers a reminder or retention message. Setting the threshold too low floods the team with unnecessary actions, whereas setting it too high allows avoidable churn. The goal is to minimise the total operational cost by finding the optimal balance between reminders and losses."
steps="Inspect the probabilities: Review how the simulated cases distribute across risk levels.|Tune the decision threshold: Move the slider and watch which cases receive reminders versus which are left alone. Observe how true positives and false negatives change.|Compare total cost: Track reminder spending (€5 each) versus loss penalties (€25 each) to locate the minimum operational cost."
medical_highlight="Choosing the right threshold converts predicted probabilities into binary actions. Lower thresholds favour sensitivity (fewer missed high-risk cases) while higher thresholds favour specificity (fewer unnecessary reminders). The optimal operating point minimises the combined expense rather than maximising accuracy alone."
>}}

{{< risk_gestor_info lang="en" >}}

{{< risk_gestor lang="en" >}}

{{< /demo-wrapper >}}

## Core Concepts

{{% notice style="info" title="Threshold Tuning" %}}
Choosing the right threshold converts predicted probabilities into binary actions. Lower thresholds favour sensitivity (fewer missed high-risk cases) while higher thresholds favour specificity (fewer unnecessary reminders).
{{% /notice %}}

{{% notice style="tip" title="Cost-Aware Evaluation" %}}
This simulator balances two concrete costs: €5 per reminder that is sent and €25 for each loss that was not prevented in time. The optimal operating point minimises the combined expense rather than maximising accuracy alone.
{{% /notice %}}

{{% notice style="warning" title="Common Pitfalls" %}}
- Ignoring base rates makes the threshold overly aggressive or too lax.
- Optimising accuracy only can be misleading when the costs of false positives and false negatives differ.
- Thresholds need periodic recalibration as behaviour or business constraints evolve.
{{% /notice %}}

{{< terminal >}}
