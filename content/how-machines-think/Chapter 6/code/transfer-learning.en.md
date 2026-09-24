---
title: "⚡ Transfer Learning, Data Augmentation and Class Imbalance"
weight: 85
description: "Interactive demonstration: the book's CNN with only 280 images, and the effect of class weights, oversampling, data augmentation, transfer learning and more data."
date:
draft: false
slug: "transfer-learning-augmentation-class-imbalance"
---

Grace finds only 280 usable images in the archive: 180 benign, 70 suspicious and 30 malignant. Emma proposes the usual remedies for a small, imbalanced medical dataset. This notebook measures each one with the book's network in PyTorch, training every configuration five times and reporting the recall of each class, as in Noah's results.

The interactive notebook includes:

- 280 synthetic images with the book's split, taken with uneven quality.
- The starting point: the network trained from scratch.
- Class weights and oversampling.
- Data augmentation with flips, rotations and lighting changes, and dropout.
- Transfer learning from 6,000 images of another hospital: used as it is, with frozen convolutions and fully fine-tuned.
- Twice as many images, with and without transfer.
- A summary of the accuracy and the recall of malignant lesions for every recipe.

{{< isolate name="6TransferLearningAugmentationAndClassImbalance" params=`lang="en"` width="100%" height="720" title="Transfer Learning, Data Augmentation and Class Imbalance (isolated)" >}}

Want to modify the code and experiment on your own?  
[Open the notebook in Google Colab](https://colab.research.google.com/drive/1zeKHU-yeBvHbGMTPJlAGCNOOL-npmDwR)

### Bibliography

- **Yosinski, J., Clune, J., Bengio, Y. and Lipson, H. (2014). How transferable are features in deep neural networks?** *Advances in Neural Information Processing Systems 27*. [https://arxiv.org/abs/1411.1792](https://arxiv.org/abs/1411.1792)
- **Esteva, A., Kuprel, B., Novoa, R. A., Ko, J., Swetter, S. M., Blau, H. M. and Thrun, S. (2017). Dermatologist-level classification of skin cancer with deep neural networks.** *Nature*, 542, 115–118. Transfer learning on skin lesions. [https://doi.org/10.1038/nature21056](https://doi.org/10.1038/nature21056)
- **Shorten, C. and Khoshgoftaar, T. M. (2019). A survey on image data augmentation for deep learning.** *Journal of Big Data*, 6, 60. [https://doi.org/10.1186/s40537-019-0197-0](https://doi.org/10.1186/s40537-019-0197-0)
- **He, H. and Garcia, E. A. (2009). Learning from imbalanced data.** *IEEE Transactions on Knowledge and Data Engineering*, 21(9), 1263–1284. [https://doi.org/10.1109/TKDE.2008.239](https://doi.org/10.1109/TKDE.2008.239)
- **Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I. and Salakhutdinov, R. (2014). Dropout: a simple way to prevent neural networks from overfitting.** *Journal of Machine Learning Research*, 15, 1929–1958. [https://jmlr.org/papers/v15/srivastava14a.html](https://jmlr.org/papers/v15/srivastava14a.html)
