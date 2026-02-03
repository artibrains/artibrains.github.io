---
title: "AlphaFold y el Avance en Estructura de Proteínas"
description: "Un hito: predecir la estructura 3D de proteínas a gran escala."
weight: 2
slug: "alphafold-estructura-proteinas"
draft: false
---

## Por qué AlphaFold es un avance *real* (y no “marketing”)

AlphaFold no es una promesa genérica sobre “IA en biología”. Es un salto medible en predicción de estructura de proteínas y, además, se convirtió en **infraestructura utilizable**.

Dos cosas lo hacen especialmente relevante:

1) **Un salto de rendimiento en CASP14** (benchmark de la comunidad).
2) Una base de datos pública donde cualquiera puede usar los resultados.

## Implementación concreta que puedes explorar

### AlphaFold Protein Structure Database (AlphaFold DB)

DeepMind y EMBL‑EBI operan **AlphaFold DB**, con acceso abierto a predicciones de estructura.

- Sitio: https://alphafold.ebi.ac.uk/
- La propia web describe **más de 200 millones de entradas**, con amplia cobertura de UniProt.
- Incluye enlaces a metodología y a FAQ/limitaciones.

### Código open-source

- Código: https://github.com/google-deepmind/alphafold

## Por qué cambió flujos reales

AlphaFold se entiende mejor como **infraestructura científica**:

- Reduce el espacio de búsqueda experimental.
- Acelera generación de hipótesis.
- Permite acceso programático a estructuras predichas a una escala masiva.

{{< notice style="info" title="El patrón clave" >}}
IA de alto impacto en ciencia suele significar: *reducir búsqueda → priorizar experimentos → acelerar descubrimiento*.
{{< /notice >}}

## Limitaciones importantes

Incluso AlphaFold DB insiste en interpretación correcta. Cuando el riesgo es alto, revisa señales de confianza (pLDDT/PAE) y valida con experimentos.

- FAQ: https://alphafold.ebi.ac.uk/faq

## Lecturas recomendadas

- Anuncio de DeepMind (lanzamiento de la base de datos): https://deepmind.google/discover/blog/putting-the-power-of-alphafold-into-the-worlds-hands/
- Metodología (Nature): https://www.nature.com/articles/s41586-021-03819-2
