---
title: "📚 Bibliografía: Implementación y Ética de IA"
description: "Referencias prácticas para desplegar IA en sanidad: gobernanza, regulación, seguridad, evaluación y monitorización"
weight: 99
draft: false
slug: "bibliography-ai-implementation"
---

## Implementación: del prototipo al flujo clínico

| Tema | Por qué importa | Referencia |
|---|---|---|
| Ciclo de vida y SaMD | La IA clínica se parece más a un dispositivo médico que a software típico | FDA (SaMD): https://www.fda.gov/medical-devices/software-medical-device-samd |
| Buenas prácticas de ML (GMLP) | Expectativas compartidas para desarrollo seguro | FDA GMLP: https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles |
| Monitorización post-despliegue | Los modelos derivan (drift); hay que vigilar continuamente | FDA AI/ML SaMD: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device |

## Gobernanza, riesgo y estándares

| Marco | Qué aporta | Link |
|---|---|---|
| NIST AI Risk Management Framework (AI RMF) | Lenguaje y proceso para gestionar riesgos de IA | https://www.nist.gov/itl/ai-risk-management-framework |
| ISO/IEC 23894 | Guía de gestión de riesgos para sistemas de IA | Resumen ISO: https://www.iso.org/standard/77304.html |
| Model Cards / Datasheets | Documentación para transparencia y auditoría | Model Cards: https://arxiv.org/abs/1810.03993 ; Datasheets: https://arxiv.org/abs/1803.09010 |

## Ética y política

- Guía de la OMS sobre ética y gobernanza de IA para la salud: https://www.who.int/publications/i/item/9789240029200
- EU AI Act (portal oficial): https://eur-lex.europa.eu/

{{% notice style="info" title="Cómo usar estas referencias" %}}
Si estás construyendo un sistema real, empieza por **NIST AI RMF** (lenguaje de riesgo), y mapea después a tu **contexto regulatorio** (FDA/UE) y a la gobernanza clínica de tu organización.
{{% /notice %}}
