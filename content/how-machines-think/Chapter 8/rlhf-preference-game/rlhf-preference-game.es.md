---
title: "8.1 Cuando las máquinas aprenden de nuestras preferencias (RLHF)"
description: "Experimenta cómo un modelo de lenguaje ya entrenado se ajusta mediante las preferencias de usuarios humanos, aprendiendo qué tipo de respuestas son más adecuadas."
date: 2024-01-22
weight: 10
slug: "ajuste-preferencias-humanas"
aliases:
    - "/how-machines-think/revolucion-lenguaje-llms/ajuste-preferencias-humanas/"
---

## Introducción

Una vez que un modelo de lenguaje ha sido entrenado para predecir texto, todavía necesita un ajuste final. Este ajuste no consiste en corregir errores factuales, sino en reforzar el tipo de respuestas que los usuarios prefieren.

{{< demo-intro 
    lang="es"
    title="Ajuste por Preferencias Humanas"
    medical_highlight="El modelo genera múltiples respuestas posibles. Los evaluadores humanos indican cuál prefieren. Con cada preferencia, el modelo aprende a generar respuestas más alineadas con las expectativas de los usuarios."
    intro_text="El **ajuste por preferencias humanas** permite que un modelo aprenda qué estilo, tono y nivel de detalle son más apropiados, sin necesidad de definir reglas explícitas."
    steps="📋 Se muestra una pregunta realista.|🔄 Se presentan dos respuestas plausibles generadas por el modelo.|👆 Tú eliges la respuesta que prefieres.|🧠 La red ajusta sus valores internos según tu preferencia.|📊 Tras varias elecciones, las respuestas se adaptan a tu estilo preferido."
>}}

## Demostración Interactiva

{{< demo-wrapper title="Entrenador por Preferencias Humanas" >}}

{{< rlhf-preference-game lang="es" >}}

{{< /demo-wrapper >}}

## Conceptos Fundamentales

{{% notice style="info" title="¿Cómo Funciona el Ajuste por Preferencias?" %}}
El modelo aprende de las elecciones humanas:

1. **Generación**: El modelo produce varias respuestas posibles
2. **Comparación**: Se presentan dos opciones al evaluador humano
3. **Preferencia**: El humano indica cuál respuesta es mejor
4. **Refuerzo**: Los valores internos se ajustan para favorecer respuestas similares
5. **Adaptación**: Con muchas preferencias, el modelo converge hacia un estilo deseado
{{% /notice %}}

{{% notice style="tip" title="Criterios que se Refuerzan" %}}
Las preferencias pueden reforzar distintos aspectos:
- **Claridad**: Respuestas fáciles de entender
- **Prudencia**: Respuestas que reconocen limitaciones
- **Concisión**: Respuestas directas y sin rodeos
- **Cercanía**: Tono amable y empático
{{% /notice %}}

{{% notice style="warning" title="Importante" %}}
El modelo **no aprende nuevos hechos** mediante este proceso. Aprende **qué tipo de respuestas son preferidas** por los usuarios. Esto es fundamental para alinear el comportamiento del modelo con las expectativas humanas.
{{% /notice %}}

{{< terminal lang="es" >}}
