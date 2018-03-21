---
layout: post
title: NLP Sentiment (Stanford cs224d Assignment 3) 
description: Sentiment analysis is one of the subject area of NLP that benefited by the recent advancement by deep learning. Stanford cs224 Assignment 3 exposes student to Recursive Neural Network (RNN) as one of the latest deep learning model for sentiment analysis. This is author journal/notes for the assignment
tags: NLP, cs224d, Stanford, assignment 3
categories: journal, NLP, ML
updated: 2018-03-01
---

## Overview

Sentiment analysis is one of the subject area of NLP that benefited by the recent advancement in deep learning. Stanford cs224 Assignment 3 let student to work with one of the latest deep learning model for sentiment analysis, Recursive Neural Network (RNN). The assigment is to predict sentence  positive/nagative sentiment. The dataset is Stanford Sentiment Treebank.

This is a journal/notes from having done the assignment.

## Concepts

The premesis of the model is one can write algorithm that better predict sentiment by breaking sentence into it's sythactical structure.

A sentence can be tricky.  "Good God the movie is slow" has different sentiment than "Even it is slow in the beginning the ending is good". Eventhough both sentences contain "slow" and "good" but the sentiment are completely different. It seems other than the word itself, there a structure and phrase in a sentence that make it positive/negative. 

A sentence can be broken down into tree/root of words. A word can form a subject, verb and noun. Combining words turn them into noun phrase or verb phrase etc. One can keep combining these phrases until to look like a tree/root structure. Each words and phrase have their own sentimens.  

Consider "Deliciously slow.",  It can be broken down into tree/root of words with each own sentiment label. The labels are 0,1,2,3,4. One being very negative, two neutral and 4 very positive (the assignment simplify the labels into positive/negative). The root (sentence) is labeled 3 which is positive. "Deliciously" is also labeled as 3 (positive)

            root(3)
         _____|_______
        |             | 
        |           node(1)
        |             ___|___
        |            |       |
    Deliciously(3) slow(1)  .(2)

For more complex sentence can be broken down as below:

![complex sentence]({{ "/assets/img/sentence-tree-model.PNG" | absolute_url }})

## A Word about The Datasets

The dataset is Stanford Sentiment Treebank. 

The data is represented as flattened tree structure. The data contains :
1. sentence sentiment score or root score (0/-- to 4/++).  
2. each word (a leaf) score 
3. node score which can be combined score two words, or a word and a node, or node with other node.

Here is example:

    (3 (3 Deliciously) (1 (1 slow) (2 .)))
     ^                  ^  ^   ^    ^ ^
     |                  |  |   |    | |
     |                  |  |   |    | a leaf/word '.' count as word
     |                  |  |   |    score for '.' (2) which is neutral
     |                  |  |   leaf/word 'slow' 
     |                  |  score for 'slow' (1) which is -    
     |                  a node and score for word 'slow' and '.'
     a root score (3) which is +

For further information about Stanford Sentiment Treebank [here]({{ "https://nlp.stanford.edu/sentiment/index.html" | absolute_url }})

## Implementation
both implementations are in tensorflow
### Dynamic model
### Static model

## Problems 
### Exploding loss 
#### initialization
#### layer normalization
#### optimization