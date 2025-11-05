---
title: "3.2 La decisión crucial: Gestor de riesgos"
weight: 2
draft: false
slug: "gestor-riesgos"
---

## Introducción

Ajustar los umbrales de decisión es esencial para que los modelos predictivos funcionen realmente en el mundo clínico. Aunque la IA pueda señalar pacientes de alto riesgo, el impacto final depende de elegir el punto exacto en el que los recordatorios, las intervenciones y los costes operativos se mantienen en equilibrio. La simulación **Gestor de Riesgos** te permite experimentar con ese compromiso y observar cómo responde la curva de coste en tiempo real.

{{< demo-intro
	title="Gestor de Riesgos: Calibrando Umbrales de Decisión"
	algorithm_type="Optimización de umbrales"
	difficulty="intermediate"
	medical_scenario="Gestionas una clínica que quiere reducir las ausencias a las citas. Un modelo estima la probabilidad de que cada paciente falte, pero tú decides a partir de qué umbral se envía un recordatorio."
	medical_highlight="Si el umbral es demasiado bajo, el personal se satura con recordatorios innecesarios; si es demasiado alto, se pierden citas y se desaprovechan recursos. El objetivo es minimizar el coste operativo total."
	intro_text="Explora cómo el punto de corte convierte las probabilidades en acciones concretas. Observa cómo se mueven los verdaderos positivos, los falsos negativos y los costes mientras ajustas el deslizador."
	steps="Explora las probabilidades: Revisa cómo se distribuyen los pacientes simulados según su riesgo.|Ajusta el umbral de decisión: Mueve el deslizador y observa qué pacientes reciben recordatorios y cuáles no.|Compara el coste total: Sigue el gasto en recordatorios y la penalización por ausencias hasta encontrar el mínimo."
>}}

## Demostración Interactiva

{{< demo-wrapper title="Simulador Gestor de Riesgos" >}}

{{< risk_gestor_info lang="es" >}}

{{< risk_gestor lang="es" >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

{{% notice style="info" title="Ajuste de Umbral" %}}
El umbral correcto transforma probabilidades en acciones binarias. Umbrales bajos priorizan la sensibilidad (se avisa a más pacientes de riesgo), mientras que umbrales altos privilegian la especificidad (menos recordatorios innecesarios).
{{% /notice %}}

{{% notice style="tip" title="Evaluación Basada en Costes" %}}
La simulación equilibra dos costes concretos: 5 € por cada recordatorio enviado y 25 € por cada ausencia no avisada. El punto óptimo minimiza el gasto total, no solo maximiza la exactitud del modelo.
{{% /notice %}}

{{% notice style="warning" title="Trampas Frecuentes" %}}
- Ignorar la tasa base puede hacer que el umbral sea demasiado agresivo o demasiado laxo.
- Optimizar únicamente la exactitud puede ser engañoso cuando los costes de falsos positivos y falsos negativos son diferentes.
- Los umbrales deben recalibrarse periódicamente a medida que cambian el comportamiento de los pacientes o las restricciones operativas.
{{% /notice %}}

{{< terminal >}}

