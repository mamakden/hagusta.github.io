---
layout: post
title: The Loss Explosion  
description: 'A common problem during deep network training is diminished or exploded loss. During cs224d assigment 3 training I encoutered exploding loss problem. I employ few tricks that I found in the web to counter this problem: weight initialization, Layer normalization and optimization. I am not sure which trick is more important. More research is needed'
categories: notes, ML 
tags: RNN, exploding loss, cs224d, Assigment 3
---

## loss exploded when traning 1600 trees

### Notes Nov 15
The loss function exploded while training 1600 trees. Occured rather random after few epoch. This seems to be a common problem in deep neural network as rnn. 

### Notes Nov 20
Weight initialization

### Notes Nov 27
Layer normalization