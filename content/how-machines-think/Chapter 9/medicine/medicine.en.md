---
title: "AI in Medicine"
description: "From decision support to safer workflows: where AI helps most (and where it can harm)."
weight: 1
slug: "ai-medicine"
draft: false
---

## Concrete AI deployments (with real products and regulators)

Medicine is where “AI that sounds right” can be dangerous. So let’s focus on systems that are actually deployed and discussed in clinical and regulatory terms.

## Deployment 1: Autonomous diabetic eye disease screening (Digital Diagnostics)

Digital Diagnostics markets **LumineticsCore®**, positioned as an autonomous AI diagnostic for diabetic eye disease workflows.

Concrete details from their product site:

- Diagnosis within **~30 seconds** of image submission.
- Reimbursement notes (CPT code 92229).
- Real-world case studies about improved screening adherence.

- Product/company site: https://www.digitaldiagnostics.com/

## Deployment 2: Imaging triage + care coordination (Viz.ai)

Viz.ai’s platform advertises **FDA-cleared AI algorithms** that analyze modalities such as CT and EKG to deliver real-time alerts and workflow coordination.

- Overview: https://www.viz.ai/
- Publications page (clinical evidence hub): https://www.viz.ai/publications

## The regulatory lens (what makes this “real”)

The FDA maintains an **AI-Enabled Medical Devices List** (with public database links). This is a practical starting point for “what’s actually cleared/authorized”.

- FDA list: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices
- FDA overview of AI in SaMD: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-software-medical-device

{{< notice style="warning" title="High‑risk failure modes" >}}
Bias, dataset shift, and over-reliance remain the hard problems. “FDA-cleared” doesn’t mean “deploy without monitoring”.
{{< /notice >}}

## Practical checklist (still the best tool)

- Define the clinical decision the model supports.
- Validate across sites, devices, and time windows.
- Require human sign-off and escalation paths.
- Monitor drift and equity after deployment.
