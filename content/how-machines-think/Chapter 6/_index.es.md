---
title: "6 - Dentro de la Mente de la Máquina: Redes Neuronales"
type: "chapter"
weight: 6
draft: false
slug: "redes-neuronales"
---

Después de haber implementado con éxito modelos de regresión, clasificación y clustering, el equipo del Hospital Minermont se encuentra en un punto de reflexión. Han visto lo que la IA puede hacer, pero ahora desean comprender *cómo* lo hace. ¿Qué ocurre realmente dentro de esas “cajas negras”? ¿Cómo aprende una red neuronal a partir de los datos?

Guiados por Alma, el equipo se embarca en un viaje hacia los fundamentos del aprendizaje profundo. Dejan a un lado las arquitecturas complejas para centrarse en los dos conceptos que lo hacen posible: la neurona artificial y el algoritmo que le permite aprender.

En este capítulo te unirás a ellos para desmitificar el funcionamiento interno de las redes neuronales:

1. **[El Perceptrón: La Neurona Artificial]({{% relref "how-machines-think/Chapter 6/perceptron/perceptron.es.md" %}})**: Empezarás con el bloque de construcción más básico. Con un sencillo simulador de diagnóstico entrenarás un Perceptrón para clasificar pacientes y descubrirás cómo esta "neurona" aprende a tomar decisiones binarias.

2. **[Backpropagation: El Motor del Aprendizaje]({{% relref "how-machines-think/Chapter 6/backpropagation/backpropagation.es.md" %}})**: Visualizarás el algoritmo de **backpropagation**, el motor del aprendizaje en las redes neuronales. Entenderás cómo el error se propaga hacia atrás por la red para que cada neurona ajuste sus conexiones y mejore el rendimiento general.

2.1 **[Tutorial Interactivo: Backpropagation Paso a Paso]({{% relref "how-machines-think/Chapter 6/backpropagation-tutorial/backpropagation-tutorial.es.md" %}})**: Un entrenador guiado y práctico donde calculas la propagación hacia adelante, calculas el error de salida, propagas gradientes hacia atrás y actualizas pesos — paso a paso.

2.2 **[Artículo Clásico: "Aprendiendo por Retropropagación de Errores"]({{% relref "how-machines-think/Chapter 6/backpropagation-paper/backpropagation-paper.es.md" %}})**: Una nota concisa sobre Rumelhart, Hinton y Williams (1986), el artículo que popularizó la retropropagación y demostró su poder práctico.

3. **[Playground de Redes Neuronales: Experimentando con Deep Learning]({{% relref "how-machines-think/Chapter 6/neural-network-playground/neural-network-playground.es.md" %}})**: Experimenta de forma práctica con TensorFlow Playground. Construye, entrena y visualiza redes neuronales en tu navegador, explorando cómo la arquitectura, los hiperparámetros y los datos afectan el aprendizaje en tiempo real.

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