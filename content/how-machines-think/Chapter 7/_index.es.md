---
title: "7 - La Revolución del Lenguaje - Entendiendo los LLMs "
type: "chapter"
weight: 7
draft: false
slug: "revolucion-lenguaje-llms"
---

Con una sólida base en modelos predictivos, el equipo del Hospital Minermont se enfrenta a su frontera más compleja hasta la fecha: el vasto universo de datos no estructurados. Cada día, se generan miles de informes de alta, notas clínicas y evoluciones de pacientes, un tesoro de información encerrado en texto libre. ¿Podría la IA ayudarles a extraer conocimiento de estas narrativas clínicas?

Esta pregunta les abre la puerta al mundo de los **Modelos de Lenguaje Grandes (LLMs)**. Alma García, de AIA, les explica que antes de que un modelo pueda analizar, resumir o generar texto, debe aprender a "leer". Y el primer paso para leer no es entender palabras, sino descomponerlas en piezas manejables.

En este capítulo, te unirás al equipo en la exploración de los pilares fundamentales sobre los que se construyen todos los LLMs: la **tokenización** y las **representaciones semánticas**.

1.  **[El Artesano de Palabras: El Tokenizador BPE]({{% relref "how-machines-think/Chapter 7/tokenizer_bpe/tokenizer_bpe.es.md" %}})**: Descubrirás el algoritmo **Byte-Pair Encoding (BPE)**. En esta simulación interactiva, no solo verás cómo funciona, sino que entrenarás tu propio tokenizador. Comprenderás por qué este proceso de "aprender un vocabulario" es crucial para que un modelo de IA pueda procesar eficientemente la jerga médica, las abreviaturas y la riqueza del lenguaje humano.

2.  **[Embedding Projector: Visualizando Vectores de Palabras]({{% relref "how-machines-think/Chapter 7/embedding-projector/embedding-projector.es.md" %}})**: Explorarás cómo las palabras se transforman en vectores matemáticos en espacios de alta dimensión, donde el significado emerge de la geometría. Usando el **TensorFlow Embedding Projector**, visualizarás cómo los modelos de lenguaje organizan el conocimiento médico, agrupando términos relacionados y capturando relaciones semánticas complejas.

3.  **[Visualización de LLMs: Ver la IA por Dentro]({{% relref "how-machines-think/Chapter 7/llm-visualization/llm-visualization.es.md" %}})**: Descubrirás el funcionamiento interno de un modelo de lenguaje grande mediante una **visualización 3D interactiva**. Podrás observar cómo fluye la información a través de las capas, cómo funciona el mecanismo de atención, y cómo el modelo finalmente predice la siguiente palabra. Esta herramienta conecta todo lo aprendido en el capítulo en una experiencia visual única.

4.  **[LLMs tradicionales vs LLMs de razonamiento]({{% relref "how-machines-think/Chapter 7/reasoning-llms/reasoning-llms.es.md" %}})**: Una guía clara para entender qué añade el razonamiento explícito (Chain‑of‑Thought, verificación y más cómputo en inferencia) frente a los LLMs clásicos, con un vídeo introductorio y bibliografía.

5.  **[Juego Interactivo: Entrenando un Modelo de Lenguaje]({{% relref "how-machines-think/Chapter 7/llm-training-game/llm-training-game.es.md" %}})**: Experimenta cómo un modelo de lenguaje mejora progresivamente sus predicciones a medida que ajusta sus parámetros internos. En este juego educativo, entrenarás una pequeña red neuronal sobre un corpus temático, observando visualmente cómo los valores cambian con cada ejemplo procesado.

Prepárate para dar los primeros pasos en el viaje hacia la comprensión del lenguaje artificial, una habilidad que está transformando la medicina y el mundo.

### Pseudocódigo de Algoritmos

- **[📝 Pseudocódigo de Word2Vec]({{% relref "/how-machines-think/Chapter 7/code/pseudocode-word2vec.es.md" %}})**: Arquitecturas Skip-Gram y CBOW, muestreo negativo, softmax jerárquico y técnicas de submuestreo.

### Fundamentos Matemáticos

- **[Tokenización y geometría de embeddings]({{% relref "how-machines-think/Chapter 7/math/tokenisation-embeddings.es.md" %}})**: Matemáticas de BPE y la geometría del espacio de embeddings que sustentan el simulador de tokenizador y el proyector.
- **[REINFORCE y RLHF]({{% relref "how-machines-think/Chapter 7/math/reinforce.es.md" %}})**: Gradientes de política y flujo RLHF que alinean los modelos de lenguaje con los estándares clínicos de Minermont.

### Bibliografía y Recursos Complementarios

- **[LLMs y Tokenización]({{% relref "how-machines-think/Chapter 7/bibliography/bibliography-llms-tokenization.es.md" %}})**: Recursos y referencias verificadas sobre Large Language Models, transformers, tokenización y el algoritmo BPE.
- **[Transformers y Mecanismos de Atención]({{% relref "how-machines-think/Chapter 7/bibliography/bibliography-transformers.es.md" %}})**: Papers fundamentales, recursos educativos, blogs oficiales, entrevistas y herramientas sobre arquitecturas Transformer y sus aplicaciones.