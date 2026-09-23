---
title: "⚡ Neural Networks with TensorFlow and Keras"
weight: 83
description: "Interactive demonstration: automatic differentiation, XOR with Keras, the book's convolutional network for dermatology images, and a scikit-learn network for comparison."
date:
draft: false
slug: "neural-networks-tensorflow-keras"
---

In the previous notebook we wrote a neural network by hand, derivatives included: what Emma calls level 0 in her notes (section 6.8). This notebook climbs the other levels of her "building": automatic differentiation with TensorFlow, standard layers with Keras and ready-made models with scikit-learn. With Keras it builds the convolutional network that Emma designs for the Minermont dermatology project (section 6.4), layer by layer and parameter by parameter, on synthetic images of skin lesions.

The interactive notebook includes:

- Level 1, automatic differentiation: TensorFlow computes the gradients of Martha's example, and they match the ones computed by hand.
- Level 2, the Keras API: a small network that solves XOR.
- Synthetic 28 × 28 images of benign, suspicious and malignant lesions.
- The book's convolutional network, with its parameters counted layer by layer, trained with early stopping.
- Evaluation on the test images: accuracy, the confusion matrix and per-class precision and recall.
- What the network sees: the filters of the first convolution and their feature maps.
- Level 3: a scikit-learn network on the same images, and why it does much worse than the convolutional network.

{{< isolate name="6NeuralNetworksWithTensorFlowAndKeras" params=`lang="en"` width="100%" height="720" title="Neural Networks with TensorFlow and Keras (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1QjM6Jb1d-vU6SPD1flYFkbgTJ5_kivAD)

### Bibliography

- **LeCun, Y., Bottou, L., Bengio, Y. and Haffner, P. (1998). Gradient-based learning applied to document recognition.** *Proceedings of the IEEE*, 86(11), 2278–2324. The classic convolutional network. [https://doi.org/10.1109/5.726791](https://doi.org/10.1109/5.726791)
- **Keras documentation – The Sequential model** and the convolution layers. [https://keras.io/guides/sequential_model/](https://keras.io/guides/sequential_model/)
- **TensorFlow guide – Introduction to gradients and automatic differentiation**: `tf.GradientTape`. [https://www.tensorflow.org/guide/autodiff](https://www.tensorflow.org/guide/autodiff)
- **scikit-learn User Guide – Neural network models (supervised)**: `MLPClassifier`. [https://scikit-learn.org/stable/modules/neural_networks_supervised.html](https://scikit-learn.org/stable/modules/neural_networks_supervised.html)
