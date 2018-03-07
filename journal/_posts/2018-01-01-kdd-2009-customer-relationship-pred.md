---
layout: post
title: 'KDD Cup 2009 : Customer relationship prediction'
description: Exploritory exercise to predict customer propensity from KDD Cup 2009 dataset
categories: journal, ML
tags: CRM, wide features
---

## Overview

<a href='http://www.kdd.org/kdd-cup/view/kdd-cup-2009'>KDD Cup 2009's</a> introduction page describe the data sets as a real CRM data from a French telecommunication company Orange. The objective is to predict customer propensity churn, appetency or up-selling from the datasets.

The puropose of this literature is to journal a machine learning exploritory exercise based on the data mentioned. First a baseline predictions is establish by excesicing common machine learning algorithm (such as logistic regression, random forest etc). Later we explore other tricks/method such as features engineering, or even explore other machine learing algorithm. 

The secondary purposes of this literature is to visualize everything one migth learn from such exercises.    

## Data Initial Observation

The attributes/features are named as sequence ie. Var1, Var2, VarN etc. The data is wide (has many features), but sparse (a lot empty/Nan). Purple regions shows empty data or Nan, blue-ish region shows non empty.
    
<!--img class="caption__media" src="{{ site.url }}/assets/img/customer-relationship-pred-1.png" alt="sparse data" title="spase data" -->
![complex sentence]({{ "/assets/img/customer-relationship-pred-1.png" | absolute_url }})

