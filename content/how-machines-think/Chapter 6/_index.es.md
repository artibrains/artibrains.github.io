---
title: "Capítulo 6: Redes Neuronales"
description: "El Límite de los Patrones Conocidos: El Cerebro Artificial"
type: "chapter"
weight: 6
draft: false
slug: "redes-neuronales"
---

{{< chapter-subtitle >}}El Límite de los Patrones Conocidos: El Cerebro Artificial{{< /chapter-subtitle >}}

{{< chapter-index-image chapter="6" >}}

En dermatología, Víctor recuerda el “momento ImageNet” que Alma mencionó y el equipo recurre a redes neuronales para priorizar lesiones riesgosas sin sacar a los especialistas del bucle.

Un nuevo desafío surge en la clínica de dermatología. Los médicos luchan por distinguir diferencias sutiles en lesiones cutáneas—algunas lesiones que se ven benignas resultan ser melanomas, mientras que las sospechosas resultan inofensivas. Los métodos tradicionales de aprendizaje automático fallan: definir manualmente características como "simetría" o "irregularidad de bordes" es demasiado subjetivo, y el análisis estadístico de píxeles no puede capturar las relaciones espaciales complejas que los dermatólogos expertos ven. Víctor recuerda que Alma mencionó el "momento ImageNet" de 2012 cuando las redes neuronales revolucionaron la visión por computadora. ¿Podrían las redes neuronales convolucionales (CNN) ayudar a analizar imágenes dermatológicas? A pesar de las preocupaciones sobre modelos de "caja negra", el equipo se sumerge en el aprendizaje profundo, descubriendo cómo las neuronas artificiales procesan información a través de capas, aprendiendo características jerárquicas desde bordes simples hasta patrones complejos. Exploran funciones de activación, retropropagación, capas convolucionales y aprendizaje por transferencia. El sistema resultante ayuda a priorizar lesiones sospechosas, acelerando las consultas mientras mantiene a los especialistas firmemente en el bucle diagnóstico. El capítulo revela tanto el poder como la responsabilidad que conlleva las redes neuronales.

En este capítulo te unirás a ellos para desmitificar el funcionamiento interno de las redes neuronales:

1. **[6.1 El Perceptrón: La Neurona Artificial]({{% relref "how-machines-think/Chapter 6/perceptron/perceptron.es.md" %}})**: Empezarás con el bloque de construcción más básico. Con un sencillo simulador de diagnóstico entrenarás un Perceptrón para clasificar pacientes y descubrirás cómo esta "neurona" aprende a tomar decisiones binarias.

2. **[6.2 Backpropagation: El Motor del Aprendizaje]({{% relref "how-machines-think/Chapter 6/backpropagation/backpropagation.es.md" %}})**: Visualizarás el algoritmo de **backpropagation**, el motor del aprendizaje en las redes neuronales. Entenderás cómo el error se propaga hacia atrás por la red para que cada neurona ajuste sus conexiones y mejore el rendimiento general.

3. **[6.2 Tutorial Interactivo: Backpropagation Paso a Paso]({{% relref "how-machines-think/Chapter 6/backpropagation-tutorial/backpropagation-tutorial.es.md" %}})**: Un entrenador guiado y práctico donde calculas la propagación hacia adelante, calculas el error de salida, propagas gradientes hacia atrás y actualizas pesos — paso a paso.

4. **[6.2 Artículo Clásico: "Aprendiendo por Retropropagación de Errores"]({{% relref "how-machines-think/Chapter 6/backpropagation-paper/backpropagation-paper.es.md" %}})**: Una nota concisa sobre Rumelhart, Hinton y Williams (1986), el artículo que popularizó la retropropagación y demostró su poder práctico.

5. **[6.3 Playground de Redes Neuronales: Experimentando con Deep Learning]({{% relref "how-machines-think/Chapter 6/neural-network-playground/neural-network-playground.es.md" %}})**: Experimenta de forma práctica con TensorFlow Playground. Construye, entrena y visualiza redes neuronales en tu navegador, explorando cómo la arquitectura, los hiperparámetros y los datos afectan el aprendizaje en tiempo real.

6. **[6.4 Laboratorio CNN: Dibuja, Entrena y Predice]({{% relref "how-machines-think/Chapter 6/cnn-digit-lab/cnn-digit-lab.es.md" %}})**: Construye intuición sobre redes convolucionales reconociendo dígitos escritos a mano. Dibuja en el lienzo, compara predicciones, entrena una CNN compacta desde cero o carga un snapshot preentrenado para empezar al instante.

### Pseudocódigo de Algoritmos

- **[📝 Pseudocódigo del Entrenamiento del Perceptrón]({{% relref "/how-machines-think/Chapter 6/code/pseudocode-perceptron.es.md" %}})**: La regla de aprendizaje del perceptrón, teorema de convergencia, algoritmo Pocket y variantes del Perceptrón Votado.
- **[📝 Pseudocódigo de Backpropagation]({{% relref "/how-machines-think/Chapter 6/code/pseudocode-backpropagation.es.md" %}})**: Paso hacia adelante, paso hacia atrás, derivaciones de la regla de la cadena y bucle de entrenamiento completo con mini-lotes.

### Fundamentos Matemáticos

- **[📐 Prueba Matemática: El Problema XOR]({{% relref "how-machines-think/Chapter 6/xor-proof/xor-proof.es.md" %}})**: Demostración formal de por qué los perceptrones de una capa no resuelven XOR, el detonante que impulsó las redes multicapa.
- **[Teorema de convergencia del perceptrón]({{% relref "how-machines-think/Chapter 6/math/perceptron-convergence.es.md" %}})**: Cota de errores de Rosenblatt–Novikoff que garantiza la convergencia en datos linealmente separables.
- **[Backpropagation mediante la regla de la cadena]({{% relref "how-machines-think/Chapter 6/math/backpropagation.es.md" %}})**: Derivación jacobiana de las recurrencias de gradiente.

### Bibliografía y Recursos Complementarios

- **[📚 Redes Neuronales y Perceptrón]({{% relref "how-machines-think/Chapter 6/bibliography/bibliography-neural-networks.es.md" %}})**: Recursos y referencias verificadas sobre redes neuronales, el perceptrón de Rosenblatt y el algoritmo de backpropagation.

Prepárate para abrir la “caja negra” y comprender los principios fundamentales que impulsan las tecnologías de inteligencia artificial más avanzadas de la actualidad.