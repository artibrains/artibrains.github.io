---
title: "IA en Medicina"
description: "De apoyo a decisiones a flujos seguros: dónde ayuda la IA (y dónde puede fallar)."
weight: 1
slug: "ia-medicina"
draft: false
---

## Despliegues concretos (con productos reales y reguladores)

En medicina, la IA no se puede juzgar por “lo bien que suena”. Lo importante es: qué hace, dónde se usa, y cómo se valida.

## Despliegue 1: Cribado autónomo de retinopatía diabética (Digital Diagnostics)

Digital Diagnostics ofrece **LumineticsCore®**, un sistema orientado a automatizar el diagnóstico de enfermedad ocular diabética en flujos clínicos.

Detalles concretos descritos en su web:

- Diagnóstico en **~30 segundos** tras enviar la imagen.
- Notas sobre reembolso (CPT 92229).
- Casos de evidencia en mundo real sobre mejora de adherencia a cribado.

- Web: https://www.digitaldiagnostics.com/

## Despliegue 2: Triaje por imagen + coordinación asistencial (Viz.ai)

Viz.ai describe una plataforma con **algoritmos de IA con autorización FDA** que analizan imágenes (p. ej., CT) y ayudan a coordinar equipos y tiempos de respuesta.

- Web: https://www.viz.ai/
- Publicaciones: https://www.viz.ai/publications

## La lente regulatoria (por qué esto es “real”)

La FDA publica una **lista de dispositivos médicos con IA** con enlaces a sus entradas públicas en base de datos.

- Lista FDA: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices
- Visión general FDA (IA en SaMD): https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-software-medical-device

{{< notice style="warning" title="Riesgos típicos en alto riesgo" >}}
Sesgos, cambio de distribución y exceso de confianza siguen siendo los problemas duros. “Autorizado por FDA” no significa “sin monitorización”.
{{< /notice >}}

## Checklist práctico

- Definir la decisión clínica que apoya el sistema.
- Validar entre centros, dispositivos y ventanas temporales.
- Exigir firma humana y vías de escalado.
- Monitorizar drift y equidad tras desplegar.
