---
title: "⚡ Redes recurrentes: RNN y LSTM desde cero"
weight: 84
description: "Demostración interactiva: una RNN con retropropagación a través del tiempo en NumPy, la medida del gradiente que se desvanece y la LSTM con sus puertas."
date:
draft: false
slug: "rnn-lstm-desde-cero"
---

Antes del Transformer, las secuencias las leían token a token las redes recurrentes, y el libro explica el muro con el que chocaron: en las secuencias largas, la información de los primeros tokens se desvanece. Este notebook escribe una RNN y la retropropagación a través del tiempo con NumPy, mide cómo se desvanece el gradiente y compara la RNN con la LSTM en una tarea en la que la red debe recordar una alergia a la penicilina a través de un número creciente de palabras.

El notebook interactivo incluye:

- Las ecuaciones de la RNN del libro aplicadas paso a paso a la frase del libro.
- Una tarea que necesita memoria: la alergia al principio, la prescripción al final.
- La retropropagación a través del tiempo en NumPy, comprobada con PyTorch.
- El entrenamiento de la RNN, con recorte del gradiente.
- El gradiente que se desvanece en su camino de vuelta a través de 40 palabras.
- La LSTM y sus puertas de olvido, de entrada y de salida.
- Hasta dónde recuerda cada red: la RNN, la LSTM y la LSTM con la puerta de olvido abierta desde el principio.

{{< isolate name="7RedesRecurrentesRNNYLSTM" params=`lang="es"` width="100%" height="720" title="Redes recurrentes: RNN y LSTM desde cero (aislado)" >}}

¿Quieres modificar el código y experimentar por tu cuenta?  
[Abre el notebook en Google Colab](https://colab.research.google.com/drive/1sd-O4lvPDD96LSEoR9-tfOwkFroxsrmE)

### Bibliografía

- **Elman, J. L. (1990). Finding structure in time.** *Cognitive Science*, 14(2), 179–211. [https://doi.org/10.1207/s15516709cog1402_1](https://doi.org/10.1207/s15516709cog1402_1) 🇬🇧 (en inglés)
- **Werbos, P. J. (1990). Backpropagation through time: what it does and how to do it.** *Proceedings of the IEEE*, 78(10), 1550–1560. [https://doi.org/10.1109/5.58337](https://doi.org/10.1109/5.58337) 🇬🇧 (en inglés)
- **Bengio, Y., Simard, P. y Frasconi, P. (1994). Learning long-term dependencies with gradient descent is difficult.** *IEEE Transactions on Neural Networks*, 5(2), 157–166. [https://doi.org/10.1109/72.279181](https://doi.org/10.1109/72.279181) 🇬🇧 (en inglés)
- **Hochreiter, S. y Schmidhuber, J. (1997). Long short-term memory.** *Neural Computation*, 9(8), 1735–1780. [https://doi.org/10.1162/neco.1997.9.8.1735](https://doi.org/10.1162/neco.1997.9.8.1735) 🇬🇧 (en inglés)
- **Gers, F. A., Schmidhuber, J. y Cummins, F. (2000). Learning to forget: continual prediction with LSTM.** *Neural Computation*, 12(10), 2451–2471. La puerta de olvido. [https://doi.org/10.1162/089976600300015015](https://doi.org/10.1162/089976600300015015) 🇬🇧 (en inglés)
- **Pascanu, R., Mikolov, T. y Bengio, Y. (2013). On the difficulty of training recurrent neural networks.** *ICML 2013*. El recorte del gradiente. [https://arxiv.org/abs/1211.5063](https://arxiv.org/abs/1211.5063) 🇬🇧 (en inglés)
