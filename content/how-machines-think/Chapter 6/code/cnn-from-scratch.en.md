---
title: "⚡ A Convolutional Neural Network from Scratch"
weight: 84
description: "Interactive demonstration: the book's CNN written with NumPy only, with convolution, max-pooling and backpropagation by hand, trained on synthetic skin lesions."
date:
draft: false
slug: "convolutional-neural-network-from-scratch"
---

Emma's network for the dermatologists has 105,411 parameters: two convolutions with max-pooling, a dense layer and a softmax output. The Keras notebook builds it in a few lines. This notebook writes every layer by hand with NumPy, forward and backward, checks the gradients numerically and trains it with mini-batch gradient descent on the same synthetic lesions.

The interactive notebook includes:

- The convolution by hand, with the example of the book's figure.
- Padding, and the convolution as a single matrix product (im2col).
- Max-pooling, and where each maximum was.
- The forward and backward pass of every layer.
- The book's network and its 105,411 parameters.
- A numerical check of all the gradients.
- Training with mini-batch gradient descent, validation and early stopping.
- The evaluation on the test images and the filters the network has learned.

{{< isolate name="6ConvolutionalNeuralNetworkFromScratch" params=`lang="en"` width="100%" height="720" title="A Convolutional Neural Network from Scratch (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1xxwnc1sfPJPipd1IQplaxedyof6IAR4E)

### Bibliography

- **LeCun, Y., Bottou, L., Bengio, Y. and Haffner, P. (1998). Gradient-based learning applied to document recognition.** *Proceedings of the IEEE*, 86(11), 2278–2324. [https://doi.org/10.1109/5.726791](https://doi.org/10.1109/5.726791)
- **Goodfellow, I., Bengio, Y. and Courville, A. (2016). *Deep Learning*.** MIT Press. Chapter 9, convolutional networks. [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/)
- **He, K., Zhang, X., Ren, S. and Sun, J. (2015). Delving deep into rectifiers: surpassing human-level performance on ImageNet classification.** *ICCV 2015*. The initialization used for ReLU layers. [https://arxiv.org/abs/1502.01852](https://arxiv.org/abs/1502.01852)
