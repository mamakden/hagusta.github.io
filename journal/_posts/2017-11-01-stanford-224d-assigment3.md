---
layout: post
title: NLP Sentiment (Stanford cs224d Assigment 3) 
description: Sentiment analysis is one of the subject area of NLP that benefited by the recent advancement by deep learning. Stanford cs224 Assigment 3 exposes student to Recursive Neural Network (RNN) as one of the latest deep learning model for sentiment analysis. This is author journal/notes for the assigment
tags: NLP, cs224d, Stanford, assigment 3
categories: journal, NLP, ML
---

## Overview

Sentiment analysis is one of the subject area of NLP that benefited by the recent advancement by deep learning. Stanford cs224 Assigment 3 exposes student to Recursive Neural Network (RNN) as one of the latest deep learning model for sentiment analysis. This is author journal/notes for the assigment.

(Concepts, model and implementation.)

## Concepts

data note:
each data represent a sentence and more. The data contains :
1. sentence sentiment score or root score (0/-- to 4/++).  
2. each word (a leaf) score 
3. node score which can be combinded score two words, or a word and a node, or node with other node.

for example:

    (3 (3 Deliciously) (1 (1 slow) (2 .)))
     |                  ^  ^   ^    ^  ^
     |                  |  |   |    |  a leaf/word '.' count as word
     |                  |  |   |    score for '.' (2) which is nuetral
     |                  |  |   leaf/word 'slow' 
     |                  |  score for 'slow' (1) which is -    
     |                  a node and score for word 'slow' and '.'
     a root score (3) which is +
 
 another view:
 
            root(3)
         _____|______
        |            | 
        |           node(1)
        |              ___|__
        |             |      |
    Deliciously(3) slow(1) .(2)
  
tree.num_words() is giving wrong word count as it count all labels the sentance which also include node's label. it return 5 for example above

## Implementation
both implentations are in tensorflow
### Dynamic model
### Static model

## Problems 
### Exploding loss 
#### initialization
#### layer normalization
#### optimatization