---
layout: post
title: 'KDD Cup 2009 : Customer relationship prediction'
description: Exploratory exercise to predict customer propensity from KDD Cup 2009 dataset
categories: journal, ML
tags: CRM, wide features
updated: 2018-03-20
---

## Overview

<a href='http://www.kdd.org/kdd-cup/view/kdd-cup-2009'>KDD Cup 2009's</a> introduction page describe the data sets as a real CRM data from a French telecommunication company Orange. The objective is to predict customer propensity churn, appetency or up-selling from the datasets.

The purpose of this literature is to journal a machine learning exploratory exercise based on the data mentioned. First a baseline predictions is establish by accessing common machine learning algorithm (such as logistic regression, random forest etc). Later we explore other tricks/method such as features engineering, or even explore other machine learing algorithm. 

The secondary purposes of this literature is to visualize everything one might learn from such exercises.    

## To try/ideas:

1> Find way to reduce features
2> One and all training
3>

## Update 2018-03-20: Prediction with numerical and one-hot categorical features

Run into memory error yet again while running GBD with full expanded feature. I may have to reduce the feature  

### Update Note: One hot Catagorical features

Scikit-learn (particulary linear and GDB models) could not process categorical features without pre-process it into numerical representation. The easiest pre-processing categorical features is to encode the category into numbers. For example for color encode to red as 0, blue as 1, yellow as 2 etc. But this would encoded cardinality to the feature which may not be desired for obvious reason that red (0) cannot be lesser than blue (1). More common method is to encode them into one-hot features. To one-hot encode, in the color example, is to expand color feature saperate into color_red, color_blue, color_yellow features each contain zero or one value. Other method I have seen people is embedding. For this exercise I used one-hot encoding. I migth also try embedding in the future.

I need a function that turn categorical features into binary/one-hot encoder that during training one-hot all the categorical features and assign new-found feature to <unk> feature during test. The ability to take-in new data category is important for production system which this exercise will never going to be. I have no particular target for this exploration so why not go to the rabbit hole.

After searching the internet for sometime, I cannot not find scikit-learn/other module/function that would satisfy the ohe-hot encoder expressed above. The closest thing is Pandas get_dummy function but it would not handle new data during test. 

{% highlight python %}
import pandas as pd
import numpy as np
from scipy.sparse import coo_matrix

def load_data():
    #### load data file
    dt=pd.read_csv('orange_small_test.data',header=0,delimiter='\t')
    #### Load label files
    appetency_lbl=pd.read_csv('orange_small_train_appetency.labels',header=None,delimiter='\t')
    churn_lbl=pd.read_csv('orange_small_train_churn.labels',header=None,delimiter='\t')
    upsell_lbl=pd.read_csv('orange_small_train_upselling.labels',header=None,delimiter='\t')
    labels=np.array([[appetency_lbl[0]],[churn_lbl[0]],[upsell_lbl[0]]])
    lables=labels.squeeze()
    
    #### concate labels from each lebels file and add to dataframe
    z=np.zeros([1,lables.shape[1]])
    y=np.concatenate([z,lables],0)
    lbl=np.argmax(y.T,axis=1) # 0 = not classified, 1 = appetency, 2 = churn, 3 = up-sell
    dt['labels']=lbl
    
    # change all object to category
    for col in dt.columns:
        if dt[col].dtypes == np.object:
            dt[col]=dt[col].astype('category')
    
    des=dt.describe(include='all')   
    desT=des.transpose()
    desT['dtype']=dt.dtypes
    
    # drop all null column
    drop_columns=[]
    _=[drop_columns.append(col) for col in desT[desT['count']==0].index]
    dt=dt.drop(drop_columns,axis=1)
    return dt

def split_data(data,split=[.8,.1]):
    if len(split) != 2:
        print("must incl 2(train,validation) spilts test split will be counted as the remain")
        return 
    train_data=None
    val_data=None
    test_data=None
    col_names=data.columns
    data=(data.sample(frac=1)).reset_index(drop=True)
    class_0 = data[data['labels']==0]
    class_1 = data[data['labels']==1]
    class_2 = data[data['labels']==2]
    class_3 = data[data['labels']==3]
    
    data_count=data['labels'].count()
    c0_count=class_0['labels'].count()
    c1_count=class_1['labels'].count()
    c2_count=class_2['labels'].count()
    c3_count=class_3['labels'].count()
    
    print('data:',data_count,'label 0:',c0_count,'label 1:',c1_count,\
          'label 2:',c2_count, 'label 3:',c3_count)
    
    train_data=(((class_0[0:int(c0_count*split[0])]).append(class_1[0:int(c1_count*split[0])],ignore_index=True)).append( \
            class_2[0:int(c2_count*split[0])],ignore_index=True)).append(class_3[0:int(c3_count*split[0])], \
                                                                           ignore_index=True)
    
    val_data=(((class_0[int(c0_count*split[0]):int(c0_count*(split[0]+split[1]))]).append(  \
            class_1[int(c1_count*split[0]):int(c1_count*(split[0]+split[1]))], ignore_index=True)).append( \
            class_2[int(c2_count*split[0]):int(c2_count*(split[0]+split[1]))], ignore_index=True)).append( \
            class_3[int(c3_count*split[0]):int(c3_count*(split[0]+split[1]))], ignore_index=True)
    
    test_data=(((class_0[int(c0_count*(split[0]+split[1])):]).append(  \
            class_1[int(c1_count*(split[0]+split[1])):], ignore_index=True)).append( \
            class_2[int(c2_count*(split[0]+split[1])):], ignore_index=True)).append( \
                class_3[int(c3_count*(split[0]+split[1])):], ignore_index=True)
        
    print('train_data:',train_data['labels'].count(),'val_data:',val_data['labels'].count(),\
          'test_data:',test_data['labels'].count())
    train_data=train_data.sample(frac=1).reset_index(drop=True)
    val_data=val_data.sample(frac=1).reset_index(drop=True)
    test_data=test_data.sample(frac=1).reset_index(drop=True)
    
    return train_data,val_data,test_data

def tokenize_column(col,col_name,isTrain=True):
    new_col_name=[]
    _row_pos=[]
    _col_pos=[]
    _val=[]
    irow=0
    if isTrain:
        _one_hot_col_names=[]
        for d in col.tolist():
            if d not in _one_hot_col_names:
                #print(col_name,d)
                new_col_name.append(col_name+'_' + str(d))
                _one_hot_col_names.append(d)
            _val.append(1)
            _row_pos.append(irow)
            _col_pos.append(_one_hot_col_names.index(d))
            irow=irow+1
        
        new_data=coo_matrix((_val, (_row_pos, [ i+1 for i in _col_pos])), shape=(len(_row_pos), len(_one_hot_col_names)+1)).toarray() 
        col=_one_hot_col_names
    else:
        _one_hot_col_names=col_name
        for d in col.tolist():
            if d not in _one_hot_col_names:
                _col_pos.append(0)
            else:
                col_idx=_one_hot_col_names.index(d)
                _col_pos.append(col_idx)
            _row_pos.append(irow)
            _val.append(1)
            irow=irow+1
        new_data=coo_matrix((_val, (_row_pos, _col_pos)), shape=(len(_row_pos), len(_one_hot_col_names))).toarray()
        new_col_name=None
        col=None
    return new_data, new_col_name, col

class OneHotEncoder:
    
    cols = None
    verbose = 0
    new_cols = []
    new_cols_flat=None
    new_data_added=None
    new_data = None
    new_features = None
    data_old = None
    iat = None
    
    def __init__(self, cols=None, verbose=0):
        self.cols=cols
        self.verbose=verbose
        print("init")
        
    #def _train(self, data, isTrain=True):
    def fit(self, data):
        
        if type(data)!=pd.DataFrame:
            print("exit data type must be: ",pd.DataFrame)
            return None
        
        if self.cols == None:
            self.cols = data.columns.tolist()
            cols = self.cols
        
        cols=self.cols
        new_col_name=dict()
        new_col_name_flat=[]
        new_features=[]
        i=0
        for col in cols:
            _new_dat,_new_col_name,_new_features=tokenize_column(data[col],col)
            if self.verbose:
                print(col,_new_dat.shape)
            if i == 0:
                new_dat=np.array(_new_dat)
                i=1
            else:
                new_dat=np.concatenate([new_dat,_new_dat],axis=1)
            new_col_name[col]=['unk']+_new_features
            new_col_name_flat=new_col_name_flat+[col + '_unk']+_new_col_name
            new_features = new_features + _new_features
        
        if self.verbose:
            print('new columns len',len(new_col_name_flat),'new data shape:',new_dat.shape)
        
        self.data_old=data
        self.new_col=new_col_name
        self.new_cols_flat=new_col_name_flat
        self.new_feature=new_features
        new_data=pd.DataFrame(new_dat,columns=new_col_name_flat,dtype=np.int8)
        self.new_data_added=new_data
        self.iat=data.iat
        return None
    
    def transform(self,data):
        #print(data.iat,self.iat)
        if data.iat == self.iat:
            new_data=self.new_data_added
        else:
            cols=self.cols
            _new_binarized_features=None
            icol=0
            for col in cols:
                #print(self.new_col[col])
                _new_data,_,_=tokenize_column(data[col],self.new_col[col],isTrain=False)
                #print(_new_data)
                if icol == 0:
                    new_data=np.array(_new_data,dtype=np.int8)
                    icol = 1
                else:
                    new_data=np.concatenate([new_data,_new_data],axis=1)
            #print(new_data)
            new_data=pd.DataFrame(new_data,columns=self.new_cols_flat,dtype=np.int8)
        return new_data
{% endhighlight %}

## Update 2018-03-01: Numerical data only Prediction

### Prediction 

The model predicts 0.834866053579 accuracy. But further investigation reveal that the model only predict 0 (normal) during test time. This is consistence with previous hypothesis that the data skewed to normal that it is hard for the model to learn especially logistic regression. 

### Update notes: Numerical pre-processing(Normalization and missing values)

I used normalization to help the training. I haven't been able to verify (from experience or my own test) whether normalization help training. But as mention in many cases (one of Andrew Ng vidoes on machine learning in particular) normalization supposed to help.

I used scikit-learn's Imputer function to replace numerical missing values with median and Normalizer to normalize data. I don't see the advatages of using each available imputer strategy (median, mean and most-frequent), but may be I will become clearer later on.

## Dataset Initial Observation

The attributes/features are named as sequence ie. Var1, Var2, VarN etc. The data is wide (has many features), but sparse (a lot empty/Nan). Purple regions shows empty data or Nan, blue-ish region shows non empty.
    
<!--img class="caption__media" src="{{ site.url }}/assets/img/customer-relationship-pred-1.png" alt="sparse data" title="spase data" -->
![complex sentence]({{ "/assets/img/customer-relationship-pred-1.png" | absolute_url }})

## Dataset observation 2

PCA does not show any clear separation of classes so does TSNE

### PCA

{% highlight python linenos %}
pca = PCA(n_components=2)
pca.fit(X_sample1)
X_sample_pca=pca.transform(X_sample1)
plt.figure(figsize=(10,10))
plt.scatter(X_sample_pca[:,0],X_sample_pca[:,1],c=y_sample.squeeze())
plt.show()
{% endhighlight %}

![PCA]({{ "/assets/img/PCA.png" | absolute_url }})

### TSNE

{% highlight python linenos %}
from sklearn.manifold import TSNE

tsne = TSNE(n_components=2)
#tsne.fit(X_sample1)
#print("fit")
X_tsne=tsne.fit_transform(X_sample1) #transform(X_sample1)
print("trans")
plt.figure(figsize=(10,10))
plt.scatter(X_tsne[:,0],X_tsne[:,1],c=y_sample.squeeze())
plt.show()
{% endhighlight %}

![TSNE]({{ "/assets/img/TSNE.png" | absolute_url }})

