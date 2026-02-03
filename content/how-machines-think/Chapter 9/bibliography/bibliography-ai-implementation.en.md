---
title: "📚 Bibliography: AI Implementation and Ethics"
description: "Practical references for deploying AI in healthcare: governance, regulation, safety, evaluation, and monitoring"
weight: 99
draft: false
slug: "bibliography-ai-implementation"
---

## Implementation: from prototype to clinical workflow

| Topic | Why it matters | Reference |
|---|---|---|
| Product development lifecycle (SaMD) | Clinical AI is closer to medical devices than typical software | FDA overview: https://www.fda.gov/medical-devices/software-medical-device-samd |
| Good Machine Learning Practice (GMLP) | Shared expectations for safe development | FDA GMLP: https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles |
| Post-market monitoring | Models can drift; monitoring must be continuous | FDA discussion on AI/ML SaMD: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device |

## Governance, risk, and standards

| Framework | What it gives you | Link |
|---|---|---|
| NIST AI Risk Management Framework (AI RMF) | A structured way to manage AI risks | https://www.nist.gov/itl/ai-risk-management-framework |
| ISO/IEC 23894 | Risk management guidance for AI systems | ISO summary: https://www.iso.org/standard/77304.html |
| Model Cards / Datasheets | Documentation for transparency and auditability | Model Cards paper: https://arxiv.org/abs/1810.03993 ; Datasheets paper: https://arxiv.org/abs/1803.09010 |

## Ethics and policy

- WHO guidance on ethics & governance of AI for health: https://www.who.int/publications/i/item/9789240029200
- EU AI Act (official portal): https://eur-lex.europa.eu/

{{% notice style="info" title="How to read these references" %}}
If you’re building a real system, start with **NIST AI RMF** (risk language), then map it to your **regulatory context** (FDA/EU) and your organization’s clinical governance.
{{% /notice %}}
