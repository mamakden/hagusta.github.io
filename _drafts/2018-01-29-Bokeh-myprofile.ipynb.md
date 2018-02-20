---
layout: post
title: Test 

---

```python
import pandas as pd

% cd "C:\Users\h_agu\Desktop\resume"
```

    C:\Users\h_agu\Desktop\resume
    


```python
data=pd.read_csv('HJ_Agusta_Project.pd.csv',index_col="no",parse_dates=['start','end'])
```


```python
edu=pd.read_csv('HJ_Agusta_Education.csv',delimiter=';',index_col="no",parse_dates=['start','end'])
```


```python
#from datetime import datetime
#from datetime import timedelta
import numpy as np
from numpy import random

date=[]
project=[]
y=[]
empl=[]
clie=[]
desc=[]
role=[]
tech=[]
team=[]

win=10
zr=1e-9

for irow in range(len(data)):
    i=0
    dates=pd.date_range(data['start'][irow+1],data['end'][irow+1],freq='M')
    #print(len(dates))
    _empl_=data['employee'][irow+1]
    _clie_=data['client'][irow+1]
    _desc_=data['desc'][irow+1]
    _role_=data['role'][irow+1]
    _tech_=data['technology'][irow+1]
    _team_=data['personel'][irow+1]
    for dt in dates:
        #rnd=data['y'][irow+1] - random.random() * 0.01 * data['y'][irow+1]
        date+=[str(dt.year) + '/' + str(dt.month)]
        empl+=[_empl_]
        clie+=[_clie_]
        desc+=[_desc_]
        role+=[_role_]
        tech+=[_tech_]
        team+=[_team_]
        #y+=[1]
        #_sin_=np.sin(np.pi*(i/(len(dates)-1)))
        _sin_=np.sin(np.pi*(i/(len(dates)-1)))
        if (len(dates)) < 3:
            _sin_=5
        y1=data['value'][irow+1]/np.min([data['value']])*_sin_
        #y1=data['value'][irow+1]
        if y1 < zr:
            y1=zr
        y+=[y1]
        #y+=[data['value'][irow+1]]
        project+=[data['project'][irow+1]]
        #print(data['project'][irow+1],y1,_sin_)
        #color+=[irow]
        i=i+1
#print(np.min([data['value']]))
#y1=y/np.min([data['value']])
data3=pd.DataFrame(dict({'date':pd.to_datetime(date), 'project':project
                        , 'y':y, 'employee':empl, 'client':clie
                        , 'desc':desc, 'role':role
                        , 'tech':tech, 'team size': team}),index=pd.to_datetime(date))

data3.to_csv("data3.csv")
```


```python
y_prime=[]
date=[]
project=[]
win=10
i=0

for dt in pd.date_range('2002-01-01','2016-12-31', freq="M"):
    a=pd.to_datetime(str(dt.year) + '-' + str(dt.month))
    rows=data3[str(a)]
    if len(rows)>0:
        for irow in range(len(rows)):
            if rows['y'][irow] > 0:
                #y_prime+=[np.log(rows['y'][irow])]
                y_prime+=[rows['y'][irow]]
            else:
                y_prime+=[zr]
            project+=[rows['project'][irow]]
            date+=[a]
    else:
        y_prime+=[zr]
        project+=[""]
        date+=[a]

windows_size=8
windows=np.ones(windows_size)/float(windows_size)
y=np.convolve(y_prime,windows,'same')

#print(len(y_prime),len(y),len(date))
#y
        
proj=pd.DataFrame(dict({'date':pd.to_datetime(date), 'project':project,  'y':y}),index=pd.to_datetime(date))
proj.y[proj.project=="Genesys IPCC"]=1
proj.to_csv("proj.csv")
proj.y[proj.project==""]=zr
proj=proj.groupby(proj.index).first()

```

    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:32: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:34: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
    


```python
date=[]
prj=[]
y=[]
for pr in data3.project.unique():
    if pr != "":
        _data_=data3[data3.project==pr]
        #print(len(_data_))
        date+=[np.argmax(_data_.y)]
        prj+=[pr]
        y+=[np.max(_data_.y)]

proj_max=pd.DataFrame(dict({
            'date':pd.to_datetime(date)
            , 'proj': prj
            , 'y': y
        }),index=pd.to_datetime(date))
```


```python
# Training and Education edu_dat
date=[]
ins=[]
desc=[]
typ=[]
y=[]
for irow in range(len(edu)):
    dates=pd.date_range(edu.start[irow+1],edu.end[irow+1],freq='M')
    if len(dates) < 1:
        dates=[edu.start[irow+1]]
        #print("blah:",dates)
    for dt in dates:
        #print(dt)
        date+=[pd.to_datetime(str(dt.year) + '/' + str(dt.month))]
        y+=[20]
        ins+=[edu.Institution[irow+1]]
        desc+=[edu.Desc[irow+1]]
        typ+=[edu.type[irow+1]]
        
edu_dat=pd.DataFrame(dict({
            'date':pd.to_datetime(date),
            'institution':ins,
            'desc':desc,
            'type':typ,
            'y':y,
        }),index=pd.to_datetime(date))
```


```python
from bokeh.io import output_notebook, show
from bokeh.plotting import figure
from bokeh.charts import Area,color,output_file
from bokeh.models import HoverTool, LabelSet, Label,ColumnDataSource
import seaborn as sns
#import bokeh.palet
```


```python
output_notebook()
```



    <div class="bk-root">
        <a href="http://bokeh.pydata.org" target="_blank" class="bk-logo bk-logo-small bk-logo-notebook"></a>
        <span id="1057ade9-4726-4a27-ae33-2a357a8e2c2a">Loading BokehJS ...</span>
    </div>





```python
edu_dat
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>date</th>
      <th>desc</th>
      <th>institution</th>
      <th>type</th>
      <th>y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1993-09-01</th>
      <td>1993-09-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1993-10-01</th>
      <td>1993-10-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1993-11-01</th>
      <td>1993-11-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1993-12-01</th>
      <td>1993-12-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-01-01</th>
      <td>1994-01-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-02-01</th>
      <td>1994-02-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-03-01</th>
      <td>1994-03-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-04-01</th>
      <td>1994-04-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-05-01</th>
      <td>1994-05-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-06-01</th>
      <td>1994-06-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-07-01</th>
      <td>1994-07-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-08-01</th>
      <td>1994-08-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-09-01</th>
      <td>1994-09-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-10-01</th>
      <td>1994-10-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-11-01</th>
      <td>1994-11-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1994-12-01</th>
      <td>1994-12-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-01-01</th>
      <td>1995-01-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-02-01</th>
      <td>1995-02-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-03-01</th>
      <td>1995-03-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-04-01</th>
      <td>1995-04-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-05-01</th>
      <td>1995-05-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-06-01</th>
      <td>1995-06-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-07-01</th>
      <td>1995-07-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-08-01</th>
      <td>1995-08-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-09-01</th>
      <td>1995-09-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-10-01</th>
      <td>1995-10-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-11-01</th>
      <td>1995-11-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1995-12-01</th>
      <td>1995-12-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1996-01-01</th>
      <td>1996-01-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1996-02-01</th>
      <td>1996-02-01</td>
      <td>Bsc Aerospace Engineering</td>
      <td>University of Southern California</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2001-02-01</th>
      <td>2001-02-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-03-01</th>
      <td>2001-03-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-04-01</th>
      <td>2001-04-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-05-01</th>
      <td>2001-05-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-06-01</th>
      <td>2001-06-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-07-01</th>
      <td>2001-07-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-08-01</th>
      <td>2001-08-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-09-01</th>
      <td>2001-09-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-10-01</th>
      <td>2001-10-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-11-01</th>
      <td>2001-11-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2001-12-01</th>
      <td>2001-12-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-01-01</th>
      <td>2002-01-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-02-01</th>
      <td>2002-02-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-03-01</th>
      <td>2002-03-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-04-01</th>
      <td>2002-04-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-05-01</th>
      <td>2002-05-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-06-01</th>
      <td>2002-06-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-07-01</th>
      <td>2002-07-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-08-01</th>
      <td>2002-08-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-09-01</th>
      <td>2002-09-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-10-01</th>
      <td>2002-10-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-11-01</th>
      <td>2002-11-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-12-01</th>
      <td>2002-12-01</td>
      <td>Magister Teknologi Informasi</td>
      <td>Universitas Indonesia</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2007-01-01</th>
      <td>2007-01-01</td>
      <td>Neoview Essential</td>
      <td>Hewlett-Packard</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2008-01-01</th>
      <td>2008-01-01</td>
      <td>Oracle BI Suite (Hyperion) And Essbase</td>
      <td>Oracle Indonesia</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2009-01-01</th>
      <td>2009-01-01</td>
      <td>Business Object</td>
      <td>Hewlett-Packard</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2010-01-01</th>
      <td>2010-01-01</td>
      <td>Ab-Initio Introduction</td>
      <td>Ab-Initio</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2010-06-01</th>
      <td>2010-06-01</td>
      <td>Ab-Initio Advance</td>
      <td>Ab-Initio</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2013-01-01</th>
      <td>2013-01-01</td>
      <td>Ab-Initio Environment Suite (AIES) administration</td>
      <td>Ab-Initio</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2016-01-01</th>
      <td>2016-01-01</td>
      <td>Stanford's Machine Learning</td>
      <td>Online</td>
      <td>Training</td>
      <td>20</td>
    </tr>
  </tbody>
</table>
<p>106 rows × 5 columns</p>
</div>




```python
edu_dat2=edu_dat[edu_dat.index.isin(['1993-09-01','1998-11-01',"2000-01-01","2002-12-01"])]
```


```python
edu_dat2.ix['1993-09-01','desc'] = 'University of Southern California, BS (start)'
edu_dat2.ix['1998-11-01','desc'] = 'University of Southern California, BS (Graduate)'
edu_dat2.ix['2000-01-01','desc'] = 'Universitas Indonesia, MTI (start)'
edu_dat2.ix['2002-12-01','desc'] = 'Universitas Indonesia, MTI (Graduate)'
```

    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\pandas\core\indexing.py:477: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame.
    Try using .loc[row_indexer,col_indexer] = value instead
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
      self.obj[item] = s
    


```python
edu_dat3=edu_dat2.append(edu_dat[edu_dat.index > "2002-12-01"])
```


```python
edu_dat3
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>date</th>
      <th>desc</th>
      <th>institution</th>
      <th>type</th>
      <th>y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1993-09-01</th>
      <td>1993-09-01</td>
      <td>University of Southern California, BS (start)</td>
      <td>University of Southern California (start)</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1998-11-01</th>
      <td>1998-11-01</td>
      <td>University of Southern California, BS (Graduate)</td>
      <td>University of Southern California (Graduate)</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2000-01-01</th>
      <td>2000-01-01</td>
      <td>Universitas Indonesia, MTI (start)</td>
      <td>Universitas Indonesia (start)</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2002-12-01</th>
      <td>2002-12-01</td>
      <td>Universitas Indonesia, MTI (Graduate)</td>
      <td>Universitas Indonesia (Graduate)</td>
      <td>Formal</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2007-01-01</th>
      <td>2007-01-01</td>
      <td>Neoview Essential</td>
      <td>Hewlett-Packard</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2008-01-01</th>
      <td>2008-01-01</td>
      <td>Oracle BI Suite (Hyperion) And Essbase</td>
      <td>Oracle Indonesia</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2009-01-01</th>
      <td>2009-01-01</td>
      <td>Business Object</td>
      <td>Hewlett-Packard</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2010-01-01</th>
      <td>2010-01-01</td>
      <td>Ab-Initio Introduction</td>
      <td>Ab-Initio</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2010-06-01</th>
      <td>2010-06-01</td>
      <td>Ab-Initio Advance</td>
      <td>Ab-Initio</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2013-01-01</th>
      <td>2013-01-01</td>
      <td>Ab-Initio Environment Suite (AIES) administration</td>
      <td>Ab-Initio</td>
      <td>Training</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2016-01-01</th>
      <td>2016-01-01</td>
      <td>Stanford's Machine Learning</td>
      <td>Online</td>
      <td>Training</td>
      <td>20</td>
    </tr>
  </tbody>
</table>
</div>




```python
y_p=[]
x_p=[]
pr_p=[]
for prj in proj.project.unique():
    dat=proj[proj.project==prj]
    a=[]
    a+=[np.datetime64(dat['date'][0])]
    a+=[i for i in dat['date'].values]
    a+=[np.datetime64(dat['date'][len(dat)-1])]
    b=[]
    b+=[zr]
    b+=[i for i in dat['y'].values]
    b+=[zr]
    x_p+=[a]
    y_p+=[b]
    pr_p+=[prj]
    
x0=[]
x1=[]
y0=[]
y1=[]
desc=[]
for dsc in edu_dat3.desc.unique():
    a=edu_dat3.date[edu_dat3.desc == str(dsc)].values
    b=edu_dat3.type[edu_dat3.desc == str(dsc)].values
    print(dsc,len(a))
    if len(a) > 1:
        x0+=[a[0]]
        x1+=[a[-1]]
    elif len(a) == 1:
        x0+=[a[0]]
        x1+=[a[0]]
    else:
        x0+="dsc"
        x1+="dsc"
    y0+=[zr]
    y1+=[-20.0]
    #desc+=[str(b[0])+":"+str(dsc)]
    desc+=[str(dsc)]
```

    University of Southern California, BS (start) 1
    University of Southern California, BS (Graduate) 1
    Universitas Indonesia, MTI (start) 1
    Universitas Indonesia, MTI (Graduate) 1
    Neoview Essential 1
    Oracle BI Suite (Hyperion) And Essbase 1
    Business Object 1
    Ab-Initio Introduction  1
    Ab-Initio Advance  1
    Ab-Initio Environment Suite (AIES) administration 1
    Stanford's Machine Learning 1
    


```python
palette = sns.color_palette("PuBu", len(proj.project.unique())).as_hex()

f=figure(plot_width=1000, plot_height=400
         #, x_range=(pd.to_datetime('01-01-1992'),pd.to_datetime('01-01-2018'))
         , x_axis_type='datetime'
         , x_axis_location="below"
         , x_axis_label="year"
         , y_range=(-75,100)
         )

# prepare data for patches xs and ys


sr=pd.DataFrame(data=dict({'x': x_p,
                           'project': pr_p,
                            'y': y_p}))
f.patches(xs='x',ys='y',color=palette,source=sr)     

# prepare data for quad x0,x1,y0,y1
new_palette = sns.color_palette("Blues", len(edu_dat.desc.unique())).as_hex()

    
source2=ColumnDataSource(data=dict({
            'x0':x0,
            'x1':x1,
            'y0':y0,
            'y1':y1,
            'desc':desc}))
    
f.quad(left='x0',right='x1',top='y1',bottom='y0', color=new_palette,source=source2)

ymax=np.max(proj.y)
proj_max.y[proj_max.y>ymax]=ymax*.5     
#source=ColumnDataSource(data=proj_max[proj_max.index=='2005-01-01'])
source=ColumnDataSource(data=proj_max)


# labels for project 
labels = LabelSet(x='date', y='y', text='proj', level='glyph',
                  x_offset=0, y_offset=1
                  , render_mode='canvas'
                  , source=source
                  , angle=45
                  , angle_units="deg"
                  , text_font_size="9pt"
                 )

f.add_layout(labels)

# labels for edu and training
labels2=LabelSet(x='x0',y='y1',text='desc', level='glyph',
                    x_offset=-25, y_offset=0
                  , render_mode='canvas'
                  , angle=-25
                  , angle_units="deg"
                  , text_font_size="9pt"
                  , source=source2
                )
f.add_layout(labels2)

f.toolbar.logo = None
f.toolbar_location = None
f.yaxis.visible = False
f.grid.visible = False
#f.background_fill_color = "#deebf7"
f.background_fill_color = None
f.background_fill_alpha = 0
#f.responsive = True
f.sizing_mode = "scale_width"
#f.border_line_color = "#FFFFFF"
#f.border_fill_alpha = 0
f.outline_line_color = None
f.border_fill = None

#output_file("carriers_timeline.2.html")


#show(f)
```

    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: 
    Supplying a user-defined data source AND iterable values to glyph methods is deprecated.
    
    See https://github.com/bokeh/bokeh/issues/2056 for more information.
    
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: 
    Supplying a user-defined data source AND iterable values to glyph methods is deprecated.
    
    See https://github.com/bokeh/bokeh/issues/2056 for more information.
    
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: 
    Supplying a user-defined data source AND iterable values to glyph methods is deprecated.
    
    See https://github.com/bokeh/bokeh/issues/2056 for more information.
    
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\models\sources.py:81: BokehUserWarning: ColumnDataSource's columns must be of the same length
      lambda: warnings.warn("ColumnDataSource's columns must be of the same length", BokehUserWarning))
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: 
    Supplying a user-defined data source AND iterable values to glyph methods is deprecated.
    
    See https://github.com/bokeh/bokeh/issues/2056 for more information.
    
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\models\sources.py:81: BokehUserWarning: ColumnDataSource's columns must be of the same length
      lambda: warnings.warn("ColumnDataSource's columns must be of the same length", BokehUserWarning))
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:33: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Plot.border_fill was deprecated in Bokeh 0.11.0 and will be removed, use Plot.border_fill_color instead.
      warn(message)
    


```python
show(f)
```




    <div class="bk-root">
        <div class="bk-plotdiv" id="d0a6532a-d8e3-4df9-8f08-8435eee574bb"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("d0a6532a-d8e3-4df9-8f08-8435eee574bb").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("d0a6532a-d8e3-4df9-8f08-8435eee574bb");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid 'd0a6532a-d8e3-4df9-8f08-8435eee574bb' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"ad943a21-c94c-4eef-b5b3-708dde53a7af":{"roots":{"references":[{"attributes":{"data_source":{"id":"db60da2f-b193-472c-8d3e-c6da748a2fa1","type":"ColumnDataSource"},"glyph":{"id":"517add8f-b318-4a68-82d1-c7871324994e","type":"Patches"},"hover_glyph":null,"nonselection_glyph":{"id":"dba69477-735b-472f-af8e-e7bfa677c09d","type":"Patches"},"selection_glyph":null},"id":"d43b1fdd-1f50-4c4a-8035-89115cf7f479","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"}},"id":"81df9ebc-9cdc-4d10-98f1-79d11486a9ce","type":"PanTool"},{"attributes":{"plot":null,"text":""},"id":"0281e616-8401-4fba-8189-51bd00803b66","type":"Title"},{"attributes":{"months":[0,4,8]},"id":"b3da10ca-ea7d-424a-a401-949e897f1518","type":"MonthsTicker"},{"attributes":{"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"},"ticker":{"id":"118f6879-22be-4914-9765-530bac688f42","type":"DatetimeTicker"},"visible":false},"id":"a21e7aef-31ab-48c9-85bb-3dd5c3b0ce1d","type":"Grid"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","logo":null,"tools":[{"id":"81df9ebc-9cdc-4d10-98f1-79d11486a9ce","type":"PanTool"},{"id":"5535dfb0-4fe6-45d9-987e-23c1335b5034","type":"WheelZoomTool"},{"id":"7f19dc9a-e8e6-441d-a0f2-58f87b4aff23","type":"BoxZoomTool"},{"id":"e37d0848-3da4-4d0d-9fc5-cb60dcbba472","type":"SaveTool"},{"id":"35eef515-fce3-40ee-8b3e-cdfa3f77d771","type":"ResetTool"},{"id":"82c8ecf3-f24a-44d1-8c32-3caa268726a0","type":"HelpTool"}]},"id":"721687f6-8983-48c6-ae5a-1836ea79db31","type":"Toolbar"},{"attributes":{"base":60,"mantissas":[1,2,5,10,15,20,30],"max_interval":1800000.0,"min_interval":1000.0,"num_minor_ticks":0},"id":"1bc124d1-9f75-439c-bad0-b89528108edb","type":"AdaptiveTicker"},{"attributes":{"fill_color":{"field":"fill_color"},"line_color":{"field":"line_color"},"xs":{"field":"x"},"ys":{"field":"y"}},"id":"517add8f-b318-4a68-82d1-c7871324994e","type":"Patches"},{"attributes":{"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"}},"id":"35eef515-fce3-40ee-8b3e-cdfa3f77d771","type":"ResetTool"},{"attributes":{"callback":null,"end":100,"start":-75},"id":"dfc458df-94b5-49ab-ac68-04e1c3177c3f","type":"Range1d"},{"attributes":{"days":[1,8,15,22]},"id":"cb14c17a-82ab-4dfd-8c64-bea4975b5751","type":"DaysTicker"},{"attributes":{"days":[1,4,7,10,13,16,19,22,25,28]},"id":"cbdf64f3-fd67-4cf0-8d9d-97648af6d8e2","type":"DaysTicker"},{"attributes":{"background_fill_alpha":{"value":0},"background_fill_color":{"value":null},"below":[{"id":"c423d185-8614-400a-9d06-5ef567bd0b8e","type":"DatetimeAxis"}],"border_fill_color":{"value":null},"left":[{"id":"a2ca2b0a-9d11-42c8-9c28-d94eb587181e","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":400,"plot_width":1000,"renderers":[{"id":"c423d185-8614-400a-9d06-5ef567bd0b8e","type":"DatetimeAxis"},{"id":"a21e7aef-31ab-48c9-85bb-3dd5c3b0ce1d","type":"Grid"},{"id":"a2ca2b0a-9d11-42c8-9c28-d94eb587181e","type":"LinearAxis"},{"id":"1568ad35-be08-4548-8a52-b992b5dbb6f3","type":"Grid"},{"id":"45a2b176-daa8-4291-8935-f6e6a8ecabb9","type":"BoxAnnotation"},{"id":"d43b1fdd-1f50-4c4a-8035-89115cf7f479","type":"GlyphRenderer"},{"id":"0ebd37df-8813-4121-b842-fc1553c25474","type":"GlyphRenderer"},{"id":"fcb8e896-d0b5-4ca7-ac9a-a7c5290fb0c6","type":"LabelSet"},{"id":"8221e82e-76e7-4a8d-b252-19a417f3f9ff","type":"LabelSet"}],"sizing_mode":"scale_width","title":{"id":"0281e616-8401-4fba-8189-51bd00803b66","type":"Title"},"tool_events":{"id":"246f9088-bdad-4556-a5a0-8f0cf79b2520","type":"ToolEvents"},"toolbar":{"id":"721687f6-8983-48c6-ae5a-1836ea79db31","type":"Toolbar"},"toolbar_location":null,"x_range":{"id":"7c3027a5-d18e-491f-ad0a-35857ae9bacc","type":"DataRange1d"},"y_range":{"id":"dfc458df-94b5-49ab-ac68-04e1c3177c3f","type":"Range1d"}},"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"},{"attributes":{},"id":"eb5fd4b0-d7ee-427d-bb56-cfe527e70652","type":"DatetimeTickFormatter"},{"attributes":{"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"}},"id":"82c8ecf3-f24a-44d1-8c32-3caa268726a0","type":"HelpTool"},{"attributes":{"angle":{"units":"deg","value":45},"level":"glyph","plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"},"source":{"id":"99da8c98-1023-4d1d-a31a-d3c408e3bb18","type":"ColumnDataSource"},"text":{"field":"proj"},"text_font_size":{"value":"9pt"},"x":{"field":"date"},"y":{"field":"y"},"y_offset":{"value":1}},"id":"fcb8e896-d0b5-4ca7-ac9a-a7c5290fb0c6","type":"LabelSet"},{"attributes":{"months":[0,6]},"id":"934ce5d0-64d2-4a42-aecd-b3d143b38f3c","type":"MonthsTicker"},{"attributes":{"days":[1,15]},"id":"8a78a884-8c58-48bb-9c29-4c506f9188b3","type":"DaysTicker"},{"attributes":{"callback":null,"column_names":["y","date","proj","index"],"data":{"date":[1070236800000.0,1104537600000.0,1125532800000.0,1196467200000.0,1204329600000.0,1262304000000.0,1293840000000.0,1325376000000.0,1349049600000.0,1372636800000.0,1409529600000.0,1422748800000.0,1435708800000.0,1467331200000.0],"index":[1070236800000.0,1104537600000.0,1125532800000.0,1196467200000.0,1204329600000.0,1262304000000.0,1293840000000.0,1325376000000.0,1349049600000.0,1372636800000.0,1409529600000.0,1422748800000.0,1435708800000.0,1467331200000.0],"proj":["Hospital Billing System","Document Management System","Data Center Migration","CDR Datamart Support and Maintainance ","CDR Datamart Expansion","ETL Migration","XBOX (USSD personalization)","Zero charge event","CDR ASN.1 coversion migration","Event Management Platform","Cisco IPCC-Phase 1","Cisco IPCC-Phase 2","Cisco IPCC-Phase 3","Genesys IPCC "],"y":[1.0,5.0,1.0,2.0,2.0,11.877857302571194,3.959285767523731,6.92875009316653,3.959285767523731,35.9532430767597,10.0,10.0,10.0,5.0]}},"id":"99da8c98-1023-4d1d-a31a-d3c408e3bb18","type":"ColumnDataSource"},{"attributes":{"formatter":{"id":"6c0f3895-2a86-455c-a55f-d9e746cd3c3e","type":"BasicTickFormatter"},"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"},"ticker":{"id":"52f80123-f665-4f59-8423-bf3c86fa8dc7","type":"BasicTicker"},"visible":false},"id":"a2ca2b0a-9d11-42c8-9c28-d94eb587181e","type":"LinearAxis"},{"attributes":{"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"}},"id":"5535dfb0-4fe6-45d9-987e-23c1335b5034","type":"WheelZoomTool"},{"attributes":{"callback":null,"column_names":["x0","y0","x1","y1","desc","fill_color","line_color"],"data":{"desc":["University of Southern California, BS (start)","University of Southern California, BS (Graduate)","Universitas Indonesia, MTI (start)","Universitas Indonesia, MTI (Graduate)","Neoview Essential","Oracle BI Suite (Hyperion) And Essbase","Business Object","Ab-Initio Introduction ","Ab-Initio Advance ","Ab-Initio Environment Suite (AIES) administration","Stanford's Machine Learning"],"fill_color":["#e3eef9","#d0e1f2","#b7d4ea","#94c4df","#6aaed6","#4a98c9","#2e7ebc","#1764ab","#084a91"],"line_color":["#e3eef9","#d0e1f2","#b7d4ea","#94c4df","#6aaed6","#4a98c9","#2e7ebc","#1764ab","#084a91"],"x0":[746841600000.0,909878400000.0,946684800000.0,1038700800000.0,1167609600000.0,1199145600000.0,1230768000000.0,1262304000000.0,1275350400000.0,1356998400000.0,1451606400000.0],"x1":[746841600000.0,909878400000.0,946684800000.0,1038700800000.0,1167609600000.0,1199145600000.0,1230768000000.0,1262304000000.0,1275350400000.0,1356998400000.0,1451606400000.0],"y0":[1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09],"y1":[-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0]}},"id":"50692385-9afa-42c9-a166-b03932646f7f","type":"ColumnDataSource"},{"attributes":{"months":[0,1,2,3,4,5,6,7,8,9,10,11]},"id":"575a584a-179b-47c6-945e-e3e6084b1fae","type":"MonthsTicker"},{"attributes":{},"id":"6c0f3895-2a86-455c-a55f-d9e746cd3c3e","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"}},"id":"e37d0848-3da4-4d0d-9fc5-cb60dcbba472","type":"SaveTool"},{"attributes":{"data_source":{"id":"50692385-9afa-42c9-a166-b03932646f7f","type":"ColumnDataSource"},"glyph":{"id":"2551d586-3549-4019-b6f5-623e3cfad8a3","type":"Quad"},"hover_glyph":null,"nonselection_glyph":{"id":"37ae68d6-2c63-4c92-88df-b8c9ccfa9305","type":"Quad"},"selection_glyph":null},"id":"0ebd37df-8813-4121-b842-fc1553c25474","type":"GlyphRenderer"},{"attributes":{"axis_label":"year","formatter":{"id":"eb5fd4b0-d7ee-427d-bb56-cfe527e70652","type":"DatetimeTickFormatter"},"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"},"ticker":{"id":"118f6879-22be-4914-9765-530bac688f42","type":"DatetimeTicker"}},"id":"c423d185-8614-400a-9d06-5ef567bd0b8e","type":"DatetimeAxis"},{"attributes":{"angle":{"units":"deg","value":-25},"level":"glyph","plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"},"source":{"id":"50692385-9afa-42c9-a166-b03932646f7f","type":"ColumnDataSource"},"text":{"field":"desc"},"text_font_size":{"value":"9pt"},"x":{"field":"x0"},"x_offset":{"value":-25},"y":{"field":"y1"}},"id":"8221e82e-76e7-4a8d-b252-19a417f3f9ff","type":"LabelSet"},{"attributes":{"bottom":{"field":"y0"},"fill_color":{"field":"fill_color"},"left":{"field":"x0"},"line_color":{"field":"line_color"},"right":{"field":"x1"},"top":{"field":"y1"}},"id":"2551d586-3549-4019-b6f5-623e3cfad8a3","type":"Quad"},{"attributes":{"overlay":{"id":"45a2b176-daa8-4291-8935-f6e6a8ecabb9","type":"BoxAnnotation"},"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"}},"id":"7f19dc9a-e8e6-441d-a0f2-58f87b4aff23","type":"BoxZoomTool"},{"attributes":{},"id":"5317cb25-7733-42d3-a2c8-8f05929e8c6e","type":"YearsTicker"},{"attributes":{},"id":"246f9088-bdad-4556-a5a0-8f0cf79b2520","type":"ToolEvents"},{"attributes":{"max_interval":500.0,"num_minor_ticks":0},"id":"9ca8ffc8-eaaa-4668-875f-b33cad4f2cd2","type":"AdaptiveTicker"},{"attributes":{"dimension":1,"plot":{"id":"db317154-f444-41cb-b7f3-5a7cabd7926e","subtype":"Figure","type":"Plot"},"ticker":{"id":"52f80123-f665-4f59-8423-bf3c86fa8dc7","type":"BasicTicker"},"visible":false},"id":"1568ad35-be08-4548-8a52-b992b5dbb6f3","type":"Grid"},{"attributes":{"callback":null},"id":"7c3027a5-d18e-491f-ad0a-35857ae9bacc","type":"DataRange1d"},{"attributes":{"base":24,"mantissas":[1,2,4,6,8,12],"max_interval":43200000.0,"min_interval":3600000.0,"num_minor_ticks":0},"id":"617eef39-1bb5-44da-aa83-593b3689cefc","type":"AdaptiveTicker"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"45a2b176-daa8-4291-8935-f6e6a8ecabb9","type":"BoxAnnotation"},{"attributes":{},"id":"52f80123-f665-4f59-8423-bf3c86fa8dc7","type":"BasicTicker"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"xs":{"field":"x"},"ys":{"field":"y"}},"id":"dba69477-735b-472f-af8e-e7bfa677c09d","type":"Patches"},{"attributes":{"days":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},"id":"6a714d83-1281-4501-905e-c1adb4b73cfd","type":"DaysTicker"},{"attributes":{"callback":null,"column_names":["y","x","project","index","fill_color","line_color"],"data":{"fill_color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df","#9cb9d9","#81aed2","#63a2cb","#4295c3","#2685bb","#0c74b2","#0567a2","#045b8f","#034a74"],"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"line_color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df","#9cb9d9","#81aed2","#63a2cb","#4295c3","#2685bb","#0c74b2","#0567a2","#045b8f","#034a74"],"project":["","Hospital Billing System","Document Management System","Data Center Migration","CDR Datamart Support and Maintainance ","ETL Migration","XBOX (USSD personalization)","Zero charge event","CDR ASN.1 coversion migration","Event Management Platform","Cisco IPCC-Phase 1","Cisco IPCC-Phase 2","Cisco IPCC-Phase 3","Genesys IPCC "],"x":[[1009843200000.0,1009843200000.0,1012521600000.0,1014940800000.0,1017619200000.0,1020211200000.0,1022889600000.0,1025481600000.0,1028160000000.0,1030838400000.0,1033430400000.0,1036108800000.0,1038700800000.0,1101859200000.0,1109635200000.0,1112313600000.0,1114905600000.0,1117584000000.0,1133395200000.0,1388534400000.0,1391212800000.0,1393632000000.0,1396310400000.0,1398902400000.0,1401580800000.0,1446336000000.0,1448928000000.0,1451606400000.0,1454284800000.0,1456790400000.0,1459468800000.0,1462060800000.0,1464739200000.0,1472688000000.0,1475280000000.0,1477958400000.0,1480550400000.0,1480550400000.0],[1041379200000.0,1041379200000.0,1044057600000.0,1046476800000.0,1049155200000.0,1051747200000.0,1054425600000.0,1057017600000.0,1059696000000.0,1062374400000.0,1064966400000.0,1067644800000.0,1070236800000.0,1072915200000.0,1075593600000.0,1078099200000.0,1080777600000.0,1083369600000.0,1086048000000.0,1088640000000.0,1091318400000.0,1093996800000.0,1096588800000.0,1099267200000.0,1099267200000.0],[1104537600000.0,1104537600000.0,1107216000000.0,1107216000000.0],[1120176000000.0,1120176000000.0,1122854400000.0,1125532800000.0,1128124800000.0,1130803200000.0,1130803200000.0],[1136073600000.0,1136073600000.0,1138752000000.0,1141171200000.0,1143849600000.0,1146441600000.0,1149120000000.0,1151712000000.0,1154390400000.0,1157068800000.0,1159660800000.0,1162339200000.0,1164931200000.0,1167609600000.0,1170288000000.0,1172707200000.0,1175385600000.0,1177977600000.0,1180656000000.0,1183248000000.0,1185926400000.0,1188604800000.0,1191196800000.0,1193875200000.0,1196467200000.0,1199145600000.0,1201824000000.0,1204329600000.0,1207008000000.0,1209600000000.0,1212278400000.0,1214870400000.0,1217548800000.0,1220227200000.0,1222819200000.0,1225497600000.0,1228089600000.0,1230768000000.0,1233446400000.0,1235865600000.0,1238544000000.0,1241136000000.0,1243814400000.0,1246406400000.0,1249084800000.0,1251763200000.0,1254355200000.0,1257033600000.0,1257033600000.0],[1259625600000.0,1259625600000.0,1262304000000.0,1264982400000.0,1267401600000.0,1270080000000.0,1272672000000.0,1275350400000.0,1275350400000.0],[1277942400000.0,1277942400000.0,1280620800000.0,1283299200000.0,1285891200000.0,1288569600000.0,1291161600000.0,1293840000000.0,1296518400000.0,1298937600000.0,1301616000000.0,1304208000000.0,1306886400000.0,1306886400000.0],[1309478400000.0,1309478400000.0,1312156800000.0,1314835200000.0,1317427200000.0,1320105600000.0,1322697600000.0,1325376000000.0,1328054400000.0,1330560000000.0,1333238400000.0,1335830400000.0,1338508800000.0,1338508800000.0],[1341100800000.0,1341100800000.0,1343779200000.0,1346457600000.0,1349049600000.0,1351728000000.0,1354320000000.0,1356998400000.0,1359676800000.0,1362096000000.0,1362096000000.0],[1364774400000.0,1364774400000.0,1367366400000.0,1370044800000.0,1372636800000.0,1375315200000.0,1377993600000.0,1380585600000.0,1383264000000.0,1385856000000.0,1385856000000.0],[1404172800000.0,1404172800000.0,1406851200000.0,1409529600000.0,1412121600000.0,1414800000000.0,1414800000000.0],[1417392000000.0,1417392000000.0,1420070400000.0,1422748800000.0,1425168000000.0,1427846400000.0,1427846400000.0],[1430438400000.0,1430438400000.0,1433116800000.0,1435708800000.0,1438387200000.0,1441065600000.0,1443657600000.0,1443657600000.0],[1467331200000.0,1467331200000.0,1470009600000.0,1470009600000.0]],"y":[[1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09],[1e-09,0.10493280163957515,0.17251290369652483,0.2543704953146855,0.34883919198396773,0.45399588346286535,0.5676998827571801,0.6698471496748317,0.7583582603047696,0.8314313836795337,0.8875789617327007,0.9256579916913522,0.9448932943163848,0.9448932943163848,0.9256579916913523,0.8875789617327009,0.8314313836795338,0.7583582603047696,0.6698471496748317,0.5676998827571802,0.4539958834628655,0.34883919198396784,0.8793704951896856,1.422512903446525,1e-09],[1e-09,1.3030059248893395,1.2677893554091608,1e-09],[1e-09,0.30177669592163686,0.3017766959216369,0.3017766959216369,0.3017766959216369,0.3188372991378047,1e-09],[1e-09,0.3153546169017063,0.2578038096909623,0.2531353650853904,0.3527356374219508,0.4677518967297388,0.5976478841135973,0.7247573613011463,0.848487685108598,0.968261967650103,1.0835217659303777,1.1937296855637363,1.2983718863547864,1.3969604780586204,1.489035795150356,1.574168539998002,1.6519617844461942,1.7220528204784804,1.7841148513295304,1.8378585151625082,1.8830332342075324,1.9194283830709102,1.9468742707679512,1.7175714455165878,1.7296777014959657,1.6657250749556527,1.66805358844657,1.586142413282522,1.5722904515145921,1.5991163996858295,1.5221927021544817,1.4753912029936367,1.481323498766531,1.4163965540414893,1.5741685399980025,1.489035795150356,1.3969604780586204,1.2983718863547866,1.1937296855637363,1.083521765930378,0.9682619676501031,0.7976236819704395,0.6907156991520849,0.9691444538855125,1.569235095401324,2.536599884769572,3.8335986850120936,6.329600172129589,1e-09],[1e-09,7.982669638235296,8.776570261077524,8.065544734808283,8.065544734808283,6.701096741901504,5.35723085750082,4.14281910340722,1e-09],[1e-09,3.156245897552571,2.4774375336984433,2.1613870284555134,2.233698914133835,2.6885149116860942,3.066389698738223,3.1958438290453066,3.066389698738223,2.688514911686094,2.233698914133835,1.9853041804296196,1.9634541747628012,1e-09],[1e-09,2.169919054645518,2.587972263403592,3.1837456163216094,3.908973099546711,4.704901095356914,5.366181972791891,5.592726700829287,5.119665985680639,4.704901095356915,4.049839377842426,2.5879722634035924,1.9634541747628012,1e-09],[1e-09,2.480214901245086,2.6885149116860942,2.9255234204425085,3.1958438290453066,2.925523420442508,2.688514911686094,5.403190178474919,10.495577933094458,28.398429807463806,1e-09],[1e-09,50.39909184093199,60.49158551024961,65.82427695726894,71.9064861535194,68.99376822161003,60.49158551024961,50.258225562636284,39.12273434160079,27.987243120565296,1e-09],[1e-09,3.017766953591369,3.017766953591369,3.017766953591369,3.9016504299495534,5.151650429824553,1e-09],[1e-09,6.035533906182738,5.151650429824553,3.9016504299495534,3.642766953466369,4.725298708071917,1e-09],[1e-09,6.173946986194282,5.548946986194281,4.665063509836096,4.665063509836096,4.665063509836095,4.040063509961095,1e-09],[1e-09,1.25000000075,1.25000000075,1e-09]]}},"id":"db60da2f-b193-472c-8d3e-c6da748a2fa1","type":"ColumnDataSource"},{"attributes":{"bottom":{"field":"y0"},"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"left":{"field":"x0"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"x1"},"top":{"field":"y1"}},"id":"37ae68d6-2c63-4c92-88df-b8c9ccfa9305","type":"Quad"},{"attributes":{"num_minor_ticks":5},"id":"118f6879-22be-4914-9765-530bac688f42","type":"DatetimeTicker"},{"attributes":{"months":[0,2,4,6,8,10]},"id":"410c92ae-a106-492f-8f8c-b1c1e2383839","type":"MonthsTicker"}],"root_ids":["db317154-f444-41cb-b7f3-5a7cabd7926e"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"ad943a21-c94c-4eef-b5b3-708dde53a7af","elementid":"d0a6532a-d8e3-4df9-8f08-8435eee574bb","modelid":"db317154-f444-41cb-b7f3-5a7cabd7926e"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("d0a6532a-d8e3-4df9-8f08-8435eee574bb")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
tec_dat=pd.read_csv('HJ_Proj_Data3.csv',index_col='date',delimiter=";")
```


```python
y=[]
_tec_=[]
tec_dat=tec_dat.sort(columns=['tech'])
last=pd.to_datetime(pd.datetime.now())
#tot_mo=len(pd.date_range(np.min(pd.to_datetime(tec_dat.index)),last,freq="M"))
for tec in tec_dat.tech.unique():
    dat=tec_dat.index[tec_dat.tech==tec]
    _y_=0
    _tec_+=[tec]
    for datum in dat:
        #print(datum)
        tot_mo=len(pd.date_range(pd.to_datetime(datum),last,freq="M"))
        _y_+=1/tot_mo
    y+=[_y_]

y_role=[]
_role_=[]
role_dat=tec_dat.sort(columns=['role'])
for rol in tec_dat.role.unique():
    dat=tec_dat.index[tec_dat.role==rol]
    _y_=0
    _role_+=[rol]
    for dt in dat:
        tot_mo=len(pd.date_range(pd.to_datetime(dt),last,freq="M"))
        _y_+=1/tot_mo
    y_role+=[_y_]
```

    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:3: FutureWarning: sort(columns=....) is deprecated, use sort_values(by=.....)
      app.launch_new_instance()
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:18: FutureWarning: sort(columns=....) is deprecated, use sort_values(by=.....)
    


```python
acti=['requirment','troubleshoot','planning','managing','development','design','consulting']
act_y=[0.05,0.2,0.3,0.2,0.2,0.2,0.15]
```


```python
tec_data=pd.DataFrame(data=({
            'tech':_tec_,
            'y':y
        }))

rol_data=pd.DataFrame(data=({
            'role':_role_,
            'y':y_role
        }))

act_data=pd.DataFrame(data=({
            'activity': acti,
            'y': act_y
        }))
```


```python
from bokeh.charts import Bar

opt=dict(
outline_line_color = None
, toolbar_location = None
, border_fill_color = None
, background_fill_alpha = 0
#, sizing_mode = "scale_width"
, responsive = True
)
clr = sns.color_palette("Blues", 5).as_hex()

rol_data=rol_data.sort(columns=['y'],ascending=False).head(5)

bar = Bar(rol_data, 'role', values='y', color = color(palette=clr,columns=['role']), **opt)
bar.xaxis.visible = False
bar.yaxis.visible = False
show(bar)
```

    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:13: FutureWarning: sort(columns=....) is deprecated, use sort_values(by=.....)
    




    <div class="bk-root">
        <div class="bk-plotdiv" id="95a4b4cd-a5d9-4c4c-b26e-06c6501c610a"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("95a4b4cd-a5d9-4c4c-b26e-06c6501c610a").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("95a4b4cd-a5d9-4c4c-b26e-06c6501c610a");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid '95a4b4cd-a5d9-4c4c-b26e-06c6501c610a' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"9bf67a87-7765-4b3f-9771-7261dc6c0fba":{"roots":{"references":[{"attributes":{"data_source":{"id":"96e18f58-86fa-4517-aa1f-3e77e6b0c3c7","type":"ColumnDataSource"},"glyph":{"id":"1d4030d9-9223-4506-8053-c26f80d3ad14","type":"Rect"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"0e40696b-99a2-4371-a7ce-1b46f1f5d8a2","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"}},"id":"172f3f2e-d02e-4c04-ad44-7a5eb0d14c7d","type":"HelpTool"},{"attributes":{"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"}},"id":"2fd9b59c-bd37-4783-9235-78e45d94b835","type":"SaveTool"},{"attributes":{},"id":"cf456483-ce84-4ae8-acb9-aa4cc243bb96","type":"ToolEvents"},{"attributes":{"label":{"value":"Development Lead"},"renderers":[{"id":"1950285e-768d-4411-ba6f-35b2ee48e761","type":"GlyphRenderer"}]},"id":"91d7bedf-bbb8-4a5e-82a1-b5f5dffa4f43","type":"LegendItem"},{"attributes":{"fill_alpha":{"field":"fill_alpha"},"fill_color":{"field":"color"},"height":{"field":"height","units":"data"},"line_color":{"field":"line_color"},"width":{"field":"width","units":"data"},"x":{"field":"x"},"y":{"field":"y"}},"id":"1d4030d9-9223-4506-8053-c26f80d3ad14","type":"Rect"},{"attributes":{"callback":null,"column_names":["label","line_color","height","x","y","fill_alpha","width","line_alpha","color"],"data":{"chart_index":[{"role":"Development Lead"}],"color":["#d6e6f4"],"fill_alpha":[0.8],"height":[0.18440287357864318],"label":[{"role":"Development Lead"}],"line_alpha":[1.0],"line_color":["white"],"role":["Development Lead"],"width":[0.8],"x":["Development Lead"],"y":[0.09220143678932159]}},"id":"399352b1-76b7-4609-811f-7990ed345c76","type":"ColumnDataSource"},{"attributes":{"fill_alpha":{"field":"fill_alpha"},"fill_color":{"field":"color"},"height":{"field":"height","units":"data"},"line_color":{"field":"line_color"},"width":{"field":"width","units":"data"},"x":{"field":"x"},"y":{"field":"y"}},"id":"7e869b96-c6bf-4abb-80bf-be98d2a55cee","type":"Rect"},{"attributes":{"data_source":{"id":"f51e9820-ee9f-466a-b558-95bc5f9600a8","type":"ColumnDataSource"},"glyph":{"id":"9bfe6afc-e389-47e4-9d9f-9a9c44134e1f","type":"Rect"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"7232ce64-8bca-4fc9-ab48-1f54dfd318a2","type":"GlyphRenderer"},{"attributes":{"data_source":{"id":"9288a769-53ee-44a4-8a55-0a88838f7ce8","type":"ColumnDataSource"},"glyph":{"id":"e81845fc-f1ec-4a7d-b2f4-f0ba2e45983f","type":"Rect"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"31e1879f-994d-4ffb-ab60-fc6893564f38","type":"GlyphRenderer"},{"attributes":{"callback":null,"column_names":["label","line_color","height","x","y","fill_alpha","width","line_alpha","color"],"data":{"chart_index":[{"role":"Test Manager"}],"color":["#105ba4"],"fill_alpha":[0.8],"height":[0.6945868945868947],"label":[{"role":"Test Manager"}],"line_alpha":[1.0],"line_color":["white"],"role":["Test Manager"],"width":[0.8],"x":["Test Manager"],"y":[0.34729344729344735]}},"id":"96e18f58-86fa-4517-aa1f-3e77e6b0c3c7","type":"ColumnDataSource"},{"attributes":{"label":{"value":"Support"},"renderers":[{"id":"867a6e25-da76-41b8-8f5a-5e4b500c06b9","type":"GlyphRenderer"}]},"id":"cffaba7f-1c85-47d3-8f8a-d016f0a167e6","type":"LegendItem"},{"attributes":{"data_source":{"id":"95e53ce5-9990-469e-a017-38cbf3cce44f","type":"ColumnDataSource"},"glyph":{"id":"7e869b96-c6bf-4abb-80bf-be98d2a55cee","type":"Rect"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"867a6e25-da76-41b8-8f5a-5e4b500c06b9","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"}},"id":"88f16c14-d973-4779-bab2-2e649d8ffdc0","type":"WheelZoomTool"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"2b19c09b-2691-47fd-86c9-87e3a22faa37","type":"PanTool"},{"id":"88f16c14-d973-4779-bab2-2e649d8ffdc0","type":"WheelZoomTool"},{"id":"1cbb8be6-c483-4d7f-aa71-168eee8149b9","type":"BoxZoomTool"},{"id":"2fd9b59c-bd37-4783-9235-78e45d94b835","type":"SaveTool"},{"id":"31b31cb0-14f3-4033-bf26-d28ca3744b6e","type":"ResetTool"},{"id":"172f3f2e-d02e-4c04-ad44-7a5eb0d14c7d","type":"HelpTool"}]},"id":"f5ac4e86-8ff0-400a-af78-a7ac4cdb1203","type":"Toolbar"},{"attributes":{"plot":null,"text":null},"id":"9aa5a004-cc8e-45f4-b5f9-af111db99e2b","type":"Title"},{"attributes":{},"id":"446b8c64-b2df-41ec-9a5e-748e6f5a57e2","type":"BasicTicker"},{"attributes":{"overlay":{"id":"c554814a-1bc6-42fa-becf-f145f26afcae","type":"BoxAnnotation"},"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"}},"id":"1cbb8be6-c483-4d7f-aa71-168eee8149b9","type":"BoxZoomTool"},{"attributes":{"callback":null,"column_names":["label","line_color","height","x","y","fill_alpha","width","line_alpha","color"],"data":{"chart_index":[{"role":"Project Lead"}],"color":["#abd0e6"],"fill_alpha":[0.8],"height":[0.8907499802428812],"label":[{"role":"Project Lead"}],"line_alpha":[1.0],"line_color":["white"],"role":["Project Lead"],"width":[0.8],"x":["Project Lead"],"y":[0.4453749901214406]}},"id":"f51e9820-ee9f-466a-b558-95bc5f9600a8","type":"ColumnDataSource"},{"attributes":{"fill_alpha":{"field":"fill_alpha"},"fill_color":{"field":"color"},"height":{"field":"height","units":"data"},"line_color":{"field":"line_color"},"width":{"field":"width","units":"data"},"x":{"field":"x"},"y":{"field":"y"}},"id":"a1ff2e1d-d34d-48f6-bf7f-59b5754a02b6","type":"Rect"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"81ca01e6-bcfb-4726-9a5c-f9e00a5dd4de","type":"CategoricalAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"eea337a1-2267-4979-97bd-3c8b4ccb1ac8","type":"LinearAxis"}],"outline_line_color":{"value":null},"renderers":[{"id":"c554814a-1bc6-42fa-becf-f145f26afcae","type":"BoxAnnotation"},{"id":"7232ce64-8bca-4fc9-ab48-1f54dfd318a2","type":"GlyphRenderer"},{"id":"0e40696b-99a2-4371-a7ce-1b46f1f5d8a2","type":"GlyphRenderer"},{"id":"867a6e25-da76-41b8-8f5a-5e4b500c06b9","type":"GlyphRenderer"},{"id":"1950285e-768d-4411-ba6f-35b2ee48e761","type":"GlyphRenderer"},{"id":"31e1879f-994d-4ffb-ab60-fc6893564f38","type":"GlyphRenderer"},{"id":"a11e9281-9db3-4a9f-96ba-5ec63ca5fc7d","type":"Legend"},{"id":"81ca01e6-bcfb-4726-9a5c-f9e00a5dd4de","type":"CategoricalAxis"},{"id":"eea337a1-2267-4979-97bd-3c8b4ccb1ac8","type":"LinearAxis"},{"id":"09009d09-808b-4f87-b4dc-d7e6d1c70621","type":"Grid"}],"sizing_mode":"scale_width","title":{"id":"9aa5a004-cc8e-45f4-b5f9-af111db99e2b","type":"Title"},"tool_events":{"id":"cf456483-ce84-4ae8-acb9-aa4cc243bb96","type":"ToolEvents"},"toolbar":{"id":"f5ac4e86-8ff0-400a-af78-a7ac4cdb1203","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"09691e17-16fa-4fce-aa5b-af2fbac86e6a","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"5241efbb-5475-4c7e-ae1d-f433eed7d366","type":"Range1d"}},"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"},{"attributes":{"dimension":1,"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"},"ticker":{"id":"446b8c64-b2df-41ec-9a5e-748e6f5a57e2","type":"BasicTicker"}},"id":"09009d09-808b-4f87-b4dc-d7e6d1c70621","type":"Grid"},{"attributes":{"callback":null,"end":0.9352874792550253},"id":"5241efbb-5475-4c7e-ae1d-f433eed7d366","type":"Range1d"},{"attributes":{"label":{"value":"Project Lead"},"renderers":[{"id":"7232ce64-8bca-4fc9-ab48-1f54dfd318a2","type":"GlyphRenderer"}]},"id":"d030c4aa-e32b-46b4-92ab-9661259cfbba","type":"LegendItem"},{"attributes":{"items":[{"id":"d030c4aa-e32b-46b4-92ab-9661259cfbba","type":"LegendItem"},{"id":"a8878f19-96a4-47ad-aab3-eadb8a48c27d","type":"LegendItem"},{"id":"cffaba7f-1c85-47d3-8f8a-d016f0a167e6","type":"LegendItem"},{"id":"91d7bedf-bbb8-4a5e-82a1-b5f5dffa4f43","type":"LegendItem"},{"id":"a13dfb92-e778-4b7c-a42c-0fd5539ef355","type":"LegendItem"}],"location":"top_left","plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"}},"id":"a11e9281-9db3-4a9f-96ba-5ec63ca5fc7d","type":"Legend"},{"attributes":{"callback":null,"column_names":["label","line_color","height","x","y","fill_alpha","width","line_alpha","color"],"data":{"chart_index":[{"role":"Support"}],"color":["#6aaed6"],"fill_alpha":[0.8],"height":[0.4192745258947353],"label":[{"role":"Support"}],"line_alpha":[1.0],"line_color":["white"],"role":["Support"],"width":[0.8],"x":["Support"],"y":[0.20963726294736765]}},"id":"95e53ce5-9990-469e-a017-38cbf3cce44f","type":"ColumnDataSource"},{"attributes":{"callback":null,"column_names":["label","line_color","height","x","y","fill_alpha","width","line_alpha","color"],"data":{"chart_index":[{"role":"Test Lead"}],"color":["#3787c0"],"fill_alpha":[0.8],"height":[0.03401360544217687],"label":[{"role":"Test Lead"}],"line_alpha":[1.0],"line_color":["white"],"role":["Test Lead"],"width":[0.8],"x":["Test Lead"],"y":[0.017006802721088433]}},"id":"9288a769-53ee-44a4-8a55-0a88838f7ce8","type":"ColumnDataSource"},{"attributes":{"fill_alpha":{"field":"fill_alpha"},"fill_color":{"field":"color"},"height":{"field":"height","units":"data"},"line_color":{"field":"line_color"},"width":{"field":"width","units":"data"},"x":{"field":"x"},"y":{"field":"y"}},"id":"9bfe6afc-e389-47e4-9d9f-9a9c44134e1f","type":"Rect"},{"attributes":{"data_source":{"id":"399352b1-76b7-4609-811f-7990ed345c76","type":"ColumnDataSource"},"glyph":{"id":"a1ff2e1d-d34d-48f6-bf7f-59b5754a02b6","type":"Rect"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"1950285e-768d-4411-ba6f-35b2ee48e761","type":"GlyphRenderer"},{"attributes":{"fill_alpha":{"field":"fill_alpha"},"fill_color":{"field":"color"},"height":{"field":"height","units":"data"},"line_color":{"field":"line_color"},"width":{"field":"width","units":"data"},"x":{"field":"x"},"y":{"field":"y"}},"id":"e81845fc-f1ec-4a7d-b2f4-f0ba2e45983f","type":"Rect"},{"attributes":{"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"}},"id":"31b31cb0-14f3-4033-bf26-d28ca3744b6e","type":"ResetTool"},{"attributes":{},"id":"9ef6bdeb-cceb-451e-a7bf-5d99bdf94606","type":"BasicTickFormatter"},{"attributes":{"axis_label":"Sum( Y )","formatter":{"id":"9ef6bdeb-cceb-451e-a7bf-5d99bdf94606","type":"BasicTickFormatter"},"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"},"ticker":{"id":"446b8c64-b2df-41ec-9a5e-748e6f5a57e2","type":"BasicTicker"},"visible":false},"id":"eea337a1-2267-4979-97bd-3c8b4ccb1ac8","type":"LinearAxis"},{"attributes":{"label":{"value":"Test Lead"},"renderers":[{"id":"31e1879f-994d-4ffb-ab60-fc6893564f38","type":"GlyphRenderer"}]},"id":"a13dfb92-e778-4b7c-a42c-0fd5539ef355","type":"LegendItem"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"c554814a-1bc6-42fa-becf-f145f26afcae","type":"BoxAnnotation"},{"attributes":{},"id":"7e0b7516-a4ba-47ea-9922-a247d89b8c82","type":"CategoricalTicker"},{"attributes":{},"id":"ac54821e-17ff-4ac6-aff4-b58c8f1f69b6","type":"CategoricalTickFormatter"},{"attributes":{"label":{"value":"Test Manager"},"renderers":[{"id":"0e40696b-99a2-4371-a7ce-1b46f1f5d8a2","type":"GlyphRenderer"}]},"id":"a8878f19-96a4-47ad-aab3-eadb8a48c27d","type":"LegendItem"},{"attributes":{"callback":null,"factors":["Development Lead","Project Lead","Support","Test Lead","Test Manager"]},"id":"09691e17-16fa-4fce-aa5b-af2fbac86e6a","type":"FactorRange"},{"attributes":{"axis_label":"Role","formatter":{"id":"ac54821e-17ff-4ac6-aff4-b58c8f1f69b6","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"},"ticker":{"id":"7e0b7516-a4ba-47ea-9922-a247d89b8c82","type":"CategoricalTicker"},"visible":false},"id":"81ca01e6-bcfb-4726-9a5c-f9e00a5dd4de","type":"CategoricalAxis"},{"attributes":{"plot":{"id":"088b07cd-c176-436a-9e8c-ebfac88af126","subtype":"Chart","type":"Plot"}},"id":"2b19c09b-2691-47fd-86c9-87e3a22faa37","type":"PanTool"}],"root_ids":["088b07cd-c176-436a-9e8c-ebfac88af126"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"9bf67a87-7765-4b3f-9771-7261dc6c0fba","elementid":"95a4b4cd-a5d9-4c4c-b26e-06c6501c610a","modelid":"088b07cd-c176-436a-9e8c-ebfac88af126"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("95a4b4cd-a5d9-4c4c-b26e-06c6501c610a")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
palette
```




    ['#f5eef6',
     '#eae6f1',
     '#dbdaeb',
     '#cacee5',
     '#b4c4df',
     '#9cb9d9',
     '#81aed2',
     '#63a2cb',
     '#4295c3',
     '#2685bb',
     '#0c74b2',
     '#0567a2',
     '#045b8f',
     '#034a74']




```python
from bokeh.charts import Donut
from bokeh.layouts import row, gridplot
tec_data=tec_data.sort(columns=["y"],ascending=False).head(5)
plot_options=dict(
        text_font_size="8pt",
        plot_width=250,
        plot_height=250,
        color=palette,
        background_fill_alpha = 0,
        #responsive=True,
        sizing_mode = "scale_width",
        outline_line_color = None,
        toolbar_location = None,
        border_fill = None
    )
donut=Donut(tec_data
            ,label=['tech']
            ,values='y'
            , **plot_options
           )

rol_data=rol_data.sort(columns=['y'],ascending=False).head(5)
donut2=Donut(rol_data
             ,label=['role']
             ,values='y'
            , **plot_options
             )
act_data=act_data.sort(columns=['y'],ascending=False).head(5)
donut3=Donut(act_data
             ,label=['activity']
             ,values='y'
            , **plot_options
             )

#grid=gridplot([[f],[donut,donut2,donut3]],toolbar_location=None)
#rows=row(donut,donut2,donut3)
#output_file("top5stat.html")
#show(rows)
#output_file("dashboard.html")
#show(grid)

```

    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:3: FutureWarning: sort(columns=....) is deprecated, use sort_values(by=.....)
      app.launch_new_instance()
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Plot.border_fill was deprecated in Bokeh 0.11.0 and will be removed, use Plot.border_fill_color instead.
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Plot.border_fill was deprecated in Bokeh 0.11.0 and will be removed, use Plot.border_fill_color instead.
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:22: FutureWarning: sort(columns=....) is deprecated, use sort_values(by=.....)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Plot.border_fill was deprecated in Bokeh 0.11.0 and will be removed, use Plot.border_fill_color instead.
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Plot.border_fill was deprecated in Bokeh 0.11.0 and will be removed, use Plot.border_fill_color instead.
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\ipykernel\__main__.py:28: FutureWarning: sort(columns=....) is deprecated, use sort_values(by=.....)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Plot.border_fill was deprecated in Bokeh 0.11.0 and will be removed, use Plot.border_fill_color instead.
      warn(message)
    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Plot.border_fill was deprecated in Bokeh 0.11.0 and will be removed, use Plot.border_fill_color instead.
      warn(message)
    


```python
grid=gridplot([[f],[donut,donut2,donut3]],toolbar_location=None)
#output_file("my-dashboard.html")
#show(grid)
```


```python
#output_file("tech.html")
donut.title.text = "Top 5 Technology"
donut.title.align = "center"
donut.title.text_font_size = "15px"
show(donut)
```




    <div class="bk-root">
        <div class="bk-plotdiv" id="68fa2df2-1884-4725-be29-03d48b65b7f6"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("68fa2df2-1884-4725-be29-03d48b65b7f6").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("68fa2df2-1884-4725-be29-03d48b65b7f6");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid '68fa2df2-1884-4725-be29-03d48b65b7f6' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"97ea6b01-d735-49c5-ad2f-b7a8f623a7ec":{"roots":{"references":[{"attributes":{"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"}},"id":"78dbb84d-01db-488d-bb7e-e4c814628234","type":"HelpTool"},{"attributes":{"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"}},"id":"119289bb-057d-432c-af44-d27096a21f9d","type":"PanTool"},{"attributes":{"overlay":{"id":"c4049e92-19eb-4c0b-97f3-6cdf43dff5a1","type":"BoxAnnotation"},"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"}},"id":"95e8f0d1-47ca-468a-b245-997a20d07753","type":"BoxZoomTool"},{"attributes":{"align":"center","plot":null,"text":"Top 5 Technology","text_font_size":{"value":"15px"}},"id":"5f286780-df7a-492d-a5e0-b72fd86e3a51","type":"Title"},{"attributes":{"location":"top_left","plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"}},"id":"83c0668a-81be-4be3-8ad7-e19f5299dc7c","type":"Legend"},{"attributes":{},"id":"1e4263dd-d348-4c5d-9b57-331855da2119","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"}},"id":"a6eedb54-cd55-4970-8875-44c26a50bc8b","type":"SaveTool"},{"attributes":{},"id":"98438129-c961-4781-b147-4d41879b2bf2","type":"ToolEvents"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"c4109a22-af0d-4ee7-9fd8-4df848d87086","type":"Range1d"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"8pt"},"x":{"field":"x"},"y":{"field":"y"}},"id":"5d0ce569-5346-41e5-aa3a-f0d421259717","type":"Text"},{"attributes":{"data_source":{"id":"1a2e3513-ed51-4415-8323-e12464156cd7","type":"ColumnDataSource"},"glyph":{"id":"17e28e9f-35da-4290-bfc5-67e08179f450","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"7201a301-5d89-4a45-9bad-c1b00cc73752","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"}},"id":"13cbfb31-2154-42b1-bc0a-8224d4a14fd8","type":"ResetTool"},{"attributes":{},"id":"fb3aa772-8f31-438d-9faf-6f68ac98eec3","type":"BasicTickFormatter"},{"attributes":{"axis_label":null,"formatter":{"id":"1e4263dd-d348-4c5d-9b57-331855da2119","type":"BasicTickFormatter"},"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"},"ticker":{"id":"71d6b48f-d5b4-4a25-b8a5-b3cbc34e2757","type":"BasicTicker"},"visible":false},"id":"91b5ca3d-2ab2-4a3e-ac7b-ecd9d0dbdd35","type":"LinearAxis"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"119289bb-057d-432c-af44-d27096a21f9d","type":"PanTool"},{"id":"0efbfe99-6e8c-4267-b80a-3c210a62073d","type":"WheelZoomTool"},{"id":"95e8f0d1-47ca-468a-b245-997a20d07753","type":"BoxZoomTool"},{"id":"a6eedb54-cd55-4970-8875-44c26a50bc8b","type":"SaveTool"},{"id":"13cbfb31-2154-42b1-bc0a-8224d4a14fd8","type":"ResetTool"},{"id":"78dbb84d-01db-488d-bb7e-e4c814628234","type":"HelpTool"}]},"id":"5bcaf684-8ad4-4f91-a69e-3a9cf4480098","type":"Toolbar"},{"attributes":{"data_source":{"id":"e25322d6-2b87-405e-b31f-f51c8d2a17ca","type":"ColumnDataSource"},"glyph":{"id":"5d0ce569-5346-41e5-aa3a-f0d421259717","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"400e2be8-b229-4cd9-85ea-6f0df30b56d5","type":"GlyphRenderer"},{"attributes":{"axis_label":null,"formatter":{"id":"fb3aa772-8f31-438d-9faf-6f68ac98eec3","type":"BasicTickFormatter"},"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"},"ticker":{"id":"47387249-dc0e-4d19-be88-8122da561f97","type":"BasicTicker"},"visible":false},"id":"477407bd-6036-4557-8f63-473ef1706add","type":"LinearAxis"},{"attributes":{"callback":null,"column_names":["centers","color","tech","end","start","inners","outers","values","level"],"data":{"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[2.6271321462427553,4.282464512975348,4.6757109838539535,5.872170500228512,6.283185307179586],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"start":[0.0,2.6271321462427553,4.282464512975348,4.6757109838539535,5.872170500228512],"tech":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"values":[0.8907499802428812,0.5612535612535614,0.13333333333333333,0.40566908371786453,0.13935782853359813]}},"id":"1a2e3513-ed51-4415-8323-e12464156cd7","type":"ColumnDataSource"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"91b5ca3d-2ab2-4a3e-ac7b-ecd9d0dbdd35","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"477407bd-6036-4557-8f63-473ef1706add","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"c4049e92-19eb-4c0b-97f3-6cdf43dff5a1","type":"BoxAnnotation"},{"id":"7201a301-5d89-4a45-9bad-c1b00cc73752","type":"GlyphRenderer"},{"id":"400e2be8-b229-4cd9-85ea-6f0df30b56d5","type":"GlyphRenderer"},{"id":"83c0668a-81be-4be3-8ad7-e19f5299dc7c","type":"Legend"},{"id":"91b5ca3d-2ab2-4a3e-ac7b-ecd9d0dbdd35","type":"LinearAxis"},{"id":"477407bd-6036-4557-8f63-473ef1706add","type":"LinearAxis"}],"sizing_mode":"fixed","title":{"id":"5f286780-df7a-492d-a5e0-b72fd86e3a51","type":"Title"},"tool_events":{"id":"98438129-c961-4781-b147-4d41879b2bf2","type":"ToolEvents"},"toolbar":{"id":"5bcaf684-8ad4-4f91-a69e-3a9cf4480098","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"c4109a22-af0d-4ee7-9fd8-4df848d87086","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"a996da9f-415f-4f52-95f2-550561470841","type":"Range1d"}},"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"17e28e9f-35da-4290-bfc5-67e08179f450","type":"AnnularWedge"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"c4049e92-19eb-4c0b-97f3-6cdf43dff5a1","type":"BoxAnnotation"},{"attributes":{"callback":null,"column_names":["x","text","text_angle","y"],"data":{"text":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[0.28620327839307186,-1.0702696040423936,-0.2600893958228142,0.5990628328304259,1.101327263781544],"y":[1.0879856081019905,-0.34662367873954913,-1.094522044629766,-0.9522335440012525,-0.2295719017028372]}},"id":"e25322d6-2b87-405e-b31f-f51c8d2a17ca","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5","subtype":"Chart","type":"Plot"}},"id":"0efbfe99-6e8c-4267-b80a-3c210a62073d","type":"WheelZoomTool"},{"attributes":{},"id":"71d6b48f-d5b4-4a25-b8a5-b3cbc34e2757","type":"BasicTicker"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"a996da9f-415f-4f52-95f2-550561470841","type":"Range1d"},{"attributes":{},"id":"47387249-dc0e-4d19-be88-8122da561f97","type":"BasicTicker"}],"root_ids":["a2bac82b-e9cf-4c02-b545-48b8c7df4cb5"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"97ea6b01-d735-49c5-ad2f-b7a8f623a7ec","elementid":"68fa2df2-1884-4725-be29-03d48b65b7f6","modelid":"a2bac82b-e9cf-4c02-b545-48b8c7df4cb5"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("68fa2df2-1884-4725-be29-03d48b65b7f6")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
#output_file("role.html")
donut2.title = "Top 5 role"
show(donut2)
```

    C:\Users\h_agu\Desktop\machine_learning\Anaconda3\lib\site-packages\bokeh\util\deprecation.py:34: BokehDeprecationWarning: Setting Plot property 'title' using a string was deprecated in 0.12.0,
                and will be removed. The title is now an object on Plot (which holds all of it's
                styling properties). Please use Plot.title.text instead.
    
                SERVER USERS: If you were using plot.title to have the server update the plot title
                in a callback, you MUST update to plot.title.text as the title object cannot currently
                be replaced after initialization.
                
      warn(message)
    




    <div class="bk-root">
        <div class="bk-plotdiv" id="9712bbd7-b245-44e2-82f0-a8b0ad8d0c3c"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("9712bbd7-b245-44e2-82f0-a8b0ad8d0c3c").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("9712bbd7-b245-44e2-82f0-a8b0ad8d0c3c");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid '9712bbd7-b245-44e2-82f0-a8b0ad8d0c3c' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"b665463e-2a99-43b7-b262-e6f2dfc0cc80":{"roots":{"references":[{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"7616152d-9f3c-4f07-95c6-d24a98b352fc","type":"Range1d"},{"attributes":{"data_source":{"id":"3e85b35f-c4a2-4a6e-a5b6-5c16fb26cc91","type":"ColumnDataSource"},"glyph":{"id":"44d3b3f0-545b-4830-954d-f4c04324159f","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"72dd6a99-1986-4c05-adce-8e08430a53a2","type":"GlyphRenderer"},{"attributes":{},"id":"53f633cb-2cb2-42b7-8c81-cfcf5641c2b3","type":"BasicTickFormatter"},{"attributes":{"plot":null,"text":"Top 5 role"},"id":"7ce97739-0a01-4623-bbe0-29b6c50b2856","type":"Title"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"67638cb3-2ce8-443e-8c7c-a9e72fa28dd8","type":"AnnularWedge"},{"attributes":{"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"}},"id":"4e02b096-1b56-47f8-b062-dad3c6167dec","type":"SaveTool"},{"attributes":{"axis_label":null,"formatter":{"id":"53f633cb-2cb2-42b7-8c81-cfcf5641c2b3","type":"BasicTickFormatter"},"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"},"ticker":{"id":"a577a564-bb8e-4671-8a2d-5cc0581ac560","type":"BasicTicker"},"visible":false},"id":"603faeab-7566-4b0e-80dd-1fd757e8f3aa","type":"LinearAxis"},{"attributes":{"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"}},"id":"dcca5739-cfc7-46e3-815f-de9bc37a317e","type":"ResetTool"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"780a771e-be0a-4982-91d0-47074ce60494","type":"PanTool"},{"id":"d95d21a2-c8a4-4e9b-9806-c315896181cb","type":"WheelZoomTool"},{"id":"c4ded00f-6088-4b52-9149-6a414dcfeda0","type":"BoxZoomTool"},{"id":"4e02b096-1b56-47f8-b062-dad3c6167dec","type":"SaveTool"},{"id":"dcca5739-cfc7-46e3-815f-de9bc37a317e","type":"ResetTool"},{"id":"ce04c64a-6ca1-4fcb-9793-cf3ba2e4a535","type":"HelpTool"}]},"id":"08893f1a-7f60-4d40-aac2-c74d80ddf561","type":"Toolbar"},{"attributes":{"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"}},"id":"ce04c64a-6ca1-4fcb-9793-cf3ba2e4a535","type":"HelpTool"},{"attributes":{"data_source":{"id":"b73ffd07-9f15-479f-9ba8-462ffb05db5f","type":"ColumnDataSource"},"glyph":{"id":"67638cb3-2ce8-443e-8c7c-a9e72fa28dd8","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"9bcd69a6-3f9d-4ba9-b642-759dde7d141e","type":"GlyphRenderer"},{"attributes":{},"id":"863ce45a-2ceb-4ccd-b06a-49867d020508","type":"ToolEvents"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"76761621-1e2f-4b4f-b56c-d3a193ec9d7d","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"603faeab-7566-4b0e-80dd-1fd757e8f3aa","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"2f59fc4c-67b3-49cd-b92b-d4554a0766db","type":"BoxAnnotation"},{"id":"9bcd69a6-3f9d-4ba9-b642-759dde7d141e","type":"GlyphRenderer"},{"id":"72dd6a99-1986-4c05-adce-8e08430a53a2","type":"GlyphRenderer"},{"id":"ef2d5b30-7c41-41cc-8887-a66cc7a9b649","type":"Legend"},{"id":"76761621-1e2f-4b4f-b56c-d3a193ec9d7d","type":"LinearAxis"},{"id":"603faeab-7566-4b0e-80dd-1fd757e8f3aa","type":"LinearAxis"}],"sizing_mode":"fixed","title":{"id":"7ce97739-0a01-4623-bbe0-29b6c50b2856","type":"Title"},"tool_events":{"id":"863ce45a-2ceb-4ccd-b06a-49867d020508","type":"ToolEvents"},"toolbar":{"id":"08893f1a-7f60-4d40-aac2-c74d80ddf561","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"7616152d-9f3c-4f07-95c6-d24a98b352fc","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"6349b609-96d5-462f-b5df-566f136a3afd","type":"Range1d"}},"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"},{"attributes":{},"id":"49985eff-8395-4a71-a9af-0977b62956f1","type":"BasicTicker"},{"attributes":{"callback":null,"column_names":["centers","color","role","end","start","inners","outers","values","level"],"data":{"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[0.5211978834938221,3.0388213641645807,4.223862525716851,4.319998875560098,6.283185307179586],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"role":["Development Lead","Project Lead","Support","Test Lead","Test Manager"],"start":[0.0,0.5211978834938221,3.0388213641645807,4.223862525716851,4.319998875560098],"values":[0.18440287357864318,0.8907499802428812,0.4192745258947353,0.03401360544217687,0.6945868945868947]}},"id":"b73ffd07-9f15-479f-9ba8-462ffb05db5f","type":"ColumnDataSource"},{"attributes":{"overlay":{"id":"2f59fc4c-67b3-49cd-b92b-d4554a0766db","type":"BoxAnnotation"},"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"}},"id":"c4ded00f-6088-4b52-9149-6a414dcfeda0","type":"BoxZoomTool"},{"attributes":{},"id":"a577a564-bb8e-4671-8a2d-5cc0581ac560","type":"BasicTicker"},{"attributes":{"axis_label":null,"formatter":{"id":"1f5ff834-a0b8-40d9-b5c8-a6ae8a1e6515","type":"BasicTickFormatter"},"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"},"ticker":{"id":"49985eff-8395-4a71-a9af-0977b62956f1","type":"BasicTicker"},"visible":false},"id":"76761621-1e2f-4b4f-b56c-d3a193ec9d7d","type":"LinearAxis"},{"attributes":{"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"}},"id":"d95d21a2-c8a4-4e9b-9806-c315896181cb","type":"WheelZoomTool"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"8pt"},"x":{"field":"x"},"y":{"field":"y"}},"id":"44d3b3f0-545b-4830-954d-f4c04324159f","type":"Text"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"2f59fc4c-67b3-49cd-b92b-d4554a0766db","type":"BoxAnnotation"},{"attributes":{},"id":"1f5ff834-a0b8-40d9-b5c8-a6ae8a1e6515","type":"BasicTickFormatter"},{"attributes":{"location":"top_left","plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"}},"id":"ef2d5b30-7c41-41cc-8887-a66cc7a9b649","type":"Legend"},{"attributes":{"plot":{"id":"ff8b9689-0460-4277-9838-a44f462e5a76","subtype":"Chart","type":"Plot"}},"id":"780a771e-be0a-4982-91d0-47074ce60494","type":"PanTool"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"6349b609-96d5-462f-b5df-566f136a3afd","type":"Range1d"},{"attributes":{"callback":null,"column_names":["x","text","text_angle","y"],"data":{"text":["Development Lead","Project Lead","Support","Test Lead","Test Manager"],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[1.08701530709822,-0.23365171754576483,-0.9927571734676017,-0.479648305896888,0.6251610136839261],"y":[0.28986673167882215,1.1004689340857896,-0.5292052480168902,-1.0176259148873152,-0.9353067448541607]}},"id":"3e85b35f-c4a2-4a6e-a5b6-5c16fb26cc91","type":"ColumnDataSource"}],"root_ids":["ff8b9689-0460-4277-9838-a44f462e5a76"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"b665463e-2a99-43b7-b262-e6f2dfc0cc80","elementid":"9712bbd7-b245-44e2-82f0-a8b0ad8d0c3c","modelid":"ff8b9689-0460-4277-9838-a44f462e5a76"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("9712bbd7-b245-44e2-82f0-a8b0ad8d0c3c")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
output_file("actv.html")
donut3.toolbar_location = None
donut3.sizing_mode="scale_width"
show(donut3)
```




    <div class="bk-root">
        <div class="bk-plotdiv" id="8de6eb81-018a-4419-a617-8ee568693f2f"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("8de6eb81-018a-4419-a617-8ee568693f2f").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("8de6eb81-018a-4419-a617-8ee568693f2f");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid '8de6eb81-018a-4419-a617-8ee568693f2f' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"f7b4a783-080c-49c0-b39d-33e6f3edd03c":{"roots":{"references":[{"attributes":{"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"}},"id":"5816814b-84e6-43cd-8101-6a8c2ce4f149","type":"ResetTool"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"ed2a59d4-430e-4e4f-a2f6-a2f9dbcbf622","type":"Range1d"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"5d82576c-409a-4c90-8ffd-48fcd64cc760","type":"PanTool"},{"id":"4872f18e-9647-4381-892e-8dbda9688f73","type":"WheelZoomTool"},{"id":"81bc4c6d-c736-498e-9cec-b1f561a3ebb3","type":"BoxZoomTool"},{"id":"4bf1839b-a820-43f9-b9f4-a81d089b48cb","type":"SaveTool"},{"id":"5816814b-84e6-43cd-8101-6a8c2ce4f149","type":"ResetTool"},{"id":"fb3fda4f-8e75-49b3-a2bb-34635ecbefc6","type":"HelpTool"}]},"id":"919c7154-e810-4d87-8133-6fb26fc92bf1","type":"Toolbar"},{"attributes":{"axis_label":null,"formatter":{"id":"32374d18-65f9-4129-9a52-d4646f68f18a","type":"BasicTickFormatter"},"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"},"ticker":{"id":"12d50970-af66-4872-a9c4-82b432aabeb6","type":"BasicTicker"},"visible":false},"id":"3a379491-991d-4230-8239-d211f11ba020","type":"LinearAxis"},{"attributes":{},"id":"f213c440-2f45-4f85-8365-d7c3fbf5f43a","type":"ToolEvents"},{"attributes":{},"id":"970c7178-9df9-4784-8e85-4cac0c621e2b","type":"BasicTicker"},{"attributes":{"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"}},"id":"fb3fda4f-8e75-49b3-a2bb-34635ecbefc6","type":"HelpTool"},{"attributes":{"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"}},"id":"4872f18e-9647-4381-892e-8dbda9688f73","type":"WheelZoomTool"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"3ab9fa6a-6b4e-456f-8f12-5a80e2a52989","type":"Range1d"},{"attributes":{},"id":"12d50970-af66-4872-a9c4-82b432aabeb6","type":"BasicTicker"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"0927e578-36d3-4f43-9e59-5f612a02bd95","type":"AnnularWedge"},{"attributes":{"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"}},"id":"4bf1839b-a820-43f9-b9f4-a81d089b48cb","type":"SaveTool"},{"attributes":{},"id":"21dfb141-7231-436f-855a-0fa257224d5a","type":"BasicTickFormatter"},{"attributes":{"callback":null,"column_names":["centers","color","activity","end","start","inners","outers","values","level"],"data":{"activity":["design","development","managing","planning","troubleshoot"],"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[1.1423973285781066,2.284794657156213,3.4271919857343196,5.140787978601479,6.283185307179586],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"start":[0.0,1.1423973285781066,2.284794657156213,3.4271919857343196,5.140787978601479],"values":[0.2,0.2,0.2,0.3,0.2]}},"id":"9b81d04b-1ff1-4023-a796-fe217778f0d2","type":"ColumnDataSource"},{"attributes":{"callback":null,"column_names":["x","text","text_angle","y"],"data":{"text":["design","development","managing","planning","troubleshoot"],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[0.9464102244350788,-0.16010419305744564,-1.0794295953163096,-0.46734188962712303,0.9464102244350788],"y":[0.6082209196375472,1.1135491221160494,0.3169491264466084,-1.0233359947738327,-0.6082209196375471]}},"id":"1755a14d-13cb-4260-9359-af39c7f7178d","type":"ColumnDataSource"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"8pt"},"x":{"field":"x"},"y":{"field":"y"}},"id":"f0cd8918-759c-412f-ac68-eef6d37c35df","type":"Text"},{"attributes":{"plot":null,"text":null},"id":"a85e5110-0894-4141-9919-334301a408f7","type":"Title"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"fc75eb6f-8553-47db-bb9d-0ee5b1384cab","type":"BoxAnnotation"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"23cce887-d4ad-432e-b8b6-bde5939b57fd","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"3a379491-991d-4230-8239-d211f11ba020","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"fc75eb6f-8553-47db-bb9d-0ee5b1384cab","type":"BoxAnnotation"},{"id":"da66657d-8b09-4cb8-89d8-0a4156134ea1","type":"GlyphRenderer"},{"id":"30167b85-c4ce-4448-bce6-f679d64feca5","type":"GlyphRenderer"},{"id":"b4445da6-8cb9-4c27-b2ee-74c0723de1b1","type":"Legend"},{"id":"23cce887-d4ad-432e-b8b6-bde5939b57fd","type":"LinearAxis"},{"id":"3a379491-991d-4230-8239-d211f11ba020","type":"LinearAxis"}],"sizing_mode":"scale_width","title":{"id":"a85e5110-0894-4141-9919-334301a408f7","type":"Title"},"tool_events":{"id":"f213c440-2f45-4f85-8365-d7c3fbf5f43a","type":"ToolEvents"},"toolbar":{"id":"919c7154-e810-4d87-8133-6fb26fc92bf1","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"3ab9fa6a-6b4e-456f-8f12-5a80e2a52989","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"ed2a59d4-430e-4e4f-a2f6-a2f9dbcbf622","type":"Range1d"}},"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"},{"attributes":{"axis_label":null,"formatter":{"id":"21dfb141-7231-436f-855a-0fa257224d5a","type":"BasicTickFormatter"},"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"},"ticker":{"id":"970c7178-9df9-4784-8e85-4cac0c621e2b","type":"BasicTicker"},"visible":false},"id":"23cce887-d4ad-432e-b8b6-bde5939b57fd","type":"LinearAxis"},{"attributes":{"data_source":{"id":"9b81d04b-1ff1-4023-a796-fe217778f0d2","type":"ColumnDataSource"},"glyph":{"id":"0927e578-36d3-4f43-9e59-5f612a02bd95","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"da66657d-8b09-4cb8-89d8-0a4156134ea1","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"}},"id":"5d82576c-409a-4c90-8ffd-48fcd64cc760","type":"PanTool"},{"attributes":{"location":"top_left","plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"}},"id":"b4445da6-8cb9-4c27-b2ee-74c0723de1b1","type":"Legend"},{"attributes":{"data_source":{"id":"1755a14d-13cb-4260-9359-af39c7f7178d","type":"ColumnDataSource"},"glyph":{"id":"f0cd8918-759c-412f-ac68-eef6d37c35df","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"30167b85-c4ce-4448-bce6-f679d64feca5","type":"GlyphRenderer"},{"attributes":{},"id":"32374d18-65f9-4129-9a52-d4646f68f18a","type":"BasicTickFormatter"},{"attributes":{"overlay":{"id":"fc75eb6f-8553-47db-bb9d-0ee5b1384cab","type":"BoxAnnotation"},"plot":{"id":"cedde5dc-5c9b-4092-942d-170dd43a2c3e","subtype":"Chart","type":"Plot"}},"id":"81bc4c6d-c736-498e-9cec-b1f561a3ebb3","type":"BoxZoomTool"}],"root_ids":["cedde5dc-5c9b-4092-942d-170dd43a2c3e"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"f7b4a783-080c-49c0-b39d-33e6f3edd03c","elementid":"8de6eb81-018a-4419-a617-8ee568693f2f","modelid":"cedde5dc-5c9b-4092-942d-170dd43a2c3e"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("8de6eb81-018a-4419-a617-8ee568693f2f")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
import io
from bokeh.resources import CDN
from bokeh.embed import autoload_static

def write_plot_js(plot,fname):
    fname="js/"+fname+".js"
    js, tag = autoload_static(plot, CDN, fname)
    with io.open("pages/"+fname, mode='w', encoding='utf-8') as file:
        file.write(js)
    with io.open("pages/"+fname+".tag", mode='w', encoding='utf-8') as file:
        file.write(tag)
```


```python
write_plot_js(f,"history")
```


```python
write_plot_js(f,"history")
write_plot_js(donut,"tech")
write_plot_js(donut2,"role")
write_plot_js(donut3,"actv")
write_plot_js(grid,"grid")
```


```python
write_plot_js(donut,"tech2")
```


```python
show(grid)
```




    <div class="bk-root">
        <div class="bk-plotdiv" id="a668181c-405a-4965-b877-a13d156cea02"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("a668181c-405a-4965-b877-a13d156cea02").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("a668181c-405a-4965-b877-a13d156cea02");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid 'a668181c-405a-4965-b877-a13d156cea02' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"ecb4062a-7caa-4c1a-aa9b-f61822e57006":{"roots":{"references":[{"attributes":{"overlay":{"id":"53a358e8-1991-48d2-bbab-e401b8f21ffe","type":"BoxAnnotation"},"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"ca268888-0fb6-4875-bc0f-4744c2bac13c","type":"BoxZoomTool"},{"attributes":{},"id":"8787f5d6-3560-40f1-968b-f5317cb7fd97","type":"DatetimeTickFormatter"},{"attributes":{"dimension":1,"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"},"ticker":{"id":"3bad6265-20db-4d7e-9943-aaeb64c43c3b","type":"BasicTicker"},"visible":false},"id":"dca95b48-e860-4df9-a9f1-f32aa689ce16","type":"Grid"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"10pt"},"x":{"field":"x"},"y":{"field":"y"}},"id":"79966e00-e401-4dce-bd4f-c96e12fe3fdf","type":"Text"},{"attributes":{"data_source":{"id":"82298c64-d617-4e0d-b877-d3d18362ac38","type":"ColumnDataSource"},"glyph":{"id":"71bd370b-fd6c-4562-9cc8-d956aac685ba","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"9d8bb1df-44b0-4b97-97b1-05cfeec79372","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"43edb9ce-4711-4465-97f1-0f84b45dff28","type":"WheelZoomTool"},{"attributes":{"callback":null,"column_names":["text_angle","x","y","text"],"data":{"text":["Development Lead","Project Lead","Support","Test Lead","Test Manager"],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[1.088115509920111,-0.21709597051710308,-1.0081698315427634,-0.518213020159038,0.6068260186041189],"y":[0.28570900768316193,1.103854310851408,-0.4992179792105206,-0.998539065704316,-0.9473052217448574]}},"id":"1fa85fd9-3da5-4420-b9ec-35abecb21a60","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"34b0abb7-74fe-40c9-b398-924b952b0eb3","type":"ResetTool"},{"attributes":{"angle":{"units":"deg","value":-25},"level":"glyph","plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"},"source":{"id":"e12bed75-68b7-4a6c-a648-0da5e7de8070","type":"ColumnDataSource"},"text":{"field":"desc"},"text_font_size":{"value":"9pt"},"x":{"field":"x0"},"x_offset":{"value":-25},"y":{"field":"y1"}},"id":"8817b251-d68a-4f03-9589-713c8b340498","type":"LabelSet"},{"attributes":{"days":[1,15]},"id":"8cbd138c-12f9-487e-bdf5-f433c0166c53","type":"DaysTicker"},{"attributes":{"axis_label":null,"formatter":{"id":"dca0567c-80d9-4bff-b422-7537dbbc4b3c","type":"BasicTickFormatter"},"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"},"ticker":{"id":"b3d185e3-e597-4e29-9b40-391db72f43d4","type":"BasicTicker"},"visible":false},"id":"e7b40128-9ed2-4d6a-ad50-8080a162e236","type":"LinearAxis"},{"attributes":{"data_source":{"id":"e12bed75-68b7-4a6c-a648-0da5e7de8070","type":"ColumnDataSource"},"glyph":{"id":"ea363204-bda5-42cd-80f9-8aab36d71670","type":"Quad"},"hover_glyph":null,"nonselection_glyph":{"id":"b2231f83-16d5-4cc7-b968-ba6cb268078c","type":"Quad"},"selection_glyph":null},"id":"63750f41-1de5-4861-bcff-041e02ff313f","type":"GlyphRenderer"},{"attributes":{"children":[{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"},{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"},{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}]},"id":"707851b4-8130-474a-9ab9-2ec1e0599c4c","type":"Row"},{"attributes":{"callback":null,"column_names":["color","start","values","outers","end","centers","activity","level","inners"],"data":{"activity":["design","development","managing","planning","troubleshoot"],"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[1.1423973285781066,2.284794657156213,3.4271919857343196,5.140787978601479,6.283185307179586],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"start":[0.0,1.1423973285781066,2.284794657156213,3.4271919857343196,5.140787978601479],"values":[0.2,0.2,0.2,0.3,0.2]}},"id":"b1c0caef-2e0a-4c6e-8483-5e41d2653b79","type":"ColumnDataSource"},{"attributes":{"overlay":{"id":"3de27e9d-d46d-4c26-b23b-1ffc14b180f1","type":"BoxAnnotation"},"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"88bcbe9a-545c-4587-92c7-b672e2ee5e4b","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"9247e73a-2dda-4ce2-9697-01c5ff96fdac","type":"ResetTool"},{"attributes":{"location":"top_left","plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"43e481f0-3e00-4d79-bd3f-0df5a118f31f","type":"Legend"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"674cd3a8-1369-41b3-8a40-e451fc9f74eb","type":"SaveTool"},{"attributes":{"angle":{"units":"deg","value":45},"level":"glyph","plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"},"source":{"id":"95bdbb31-8fa6-4964-b96c-f6f3a626de4a","type":"ColumnDataSource"},"text":{"field":"proj"},"text_font_size":{"value":"9pt"},"x":{"field":"date"},"y":{"field":"y"},"y_offset":{"value":1}},"id":"c1557929-d27b-4353-bde7-746c502934c5","type":"LabelSet"},{"attributes":{"days":[1,8,15,22]},"id":"eb0bd6da-ad48-4846-923b-3c34b867c01a","type":"DaysTicker"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"c427bb6f-1567-4fbb-b66c-f37ddaba5989","type":"Range1d"},{"attributes":{"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"}},"id":"bb5b5569-c949-4a15-ba6f-de7bf94d77f7","type":"SaveTool"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"b8ce77f6-e510-455f-be64-0ab68d4adbe9","type":"Range1d"},{"attributes":{"callback":null,"column_names":["y1","y0","x0","x1","desc","line_color","fill_color"],"data":{"desc":["Bsc Aerospace Engineering","Magister Teknologi Informasi","Neoview Essential","Oracle BI Suite (Hyperion) And Essbase","Business Object","Ab-Initio Introduction ","Ab-Initio Advance ","Ab-Initio Environment Suite (AIES) administration","Stanford's Machine Learning"],"fill_color":["#e3eef9","#d0e1f2","#b7d4ea","#94c4df","#6aaed6","#4a98c9","#2e7ebc","#1764ab","#084a91"],"line_color":["#e3eef9","#d0e1f2","#b7d4ea","#94c4df","#6aaed6","#4a98c9","#2e7ebc","#1764ab","#084a91"],"x0":[746841600000.0,946684800000.0,1167609600000.0,1199145600000.0,1230768000000.0,1262304000000.0,1275350400000.0,1356998400000.0,1451606400000.0],"x1":[909878400000.0,1038700800000.0,1167609600000.0,1199145600000.0,1230768000000.0,1262304000000.0,1275350400000.0,1356998400000.0,1451606400000.0],"y0":[1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09],"y1":[-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0,-20.0]}},"id":"e12bed75-68b7-4a6c-a648-0da5e7de8070","type":"ColumnDataSource"},{"attributes":{"plot":null,"text":null},"id":"c712440e-ba41-4fca-ae73-d8bfeab89e33","type":"Title"},{"attributes":{"base":24,"mantissas":[1,2,4,6,8,12],"max_interval":43200000.0,"min_interval":3600000.0,"num_minor_ticks":0},"id":"86789b39-0d3b-4793-afe5-71020002fe77","type":"AdaptiveTicker"},{"attributes":{"axis_label":null,"formatter":{"id":"4a985bf7-5653-4ea5-98fe-f67cdf1b698f","type":"BasicTickFormatter"},"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"},"ticker":{"id":"33d77ccf-644e-4d25-92e1-ef419f49e4f4","type":"BasicTicker"},"visible":false},"id":"3f811f0e-adcf-41b9-b1f4-8e6be89ab61e","type":"LinearAxis"},{"attributes":{"data_source":{"id":"a5e7beb8-80cd-4051-8d96-f9ab96c768d8","type":"ColumnDataSource"},"glyph":{"id":"67430ddd-751e-40cc-a714-3965ea0e2ceb","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"4e5a2722-2c35-46cf-9a72-ad82dc733574","type":"GlyphRenderer"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"3de27e9d-d46d-4c26-b23b-1ffc14b180f1","type":"BoxAnnotation"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"67430ddd-751e-40cc-a714-3965ea0e2ceb","type":"AnnularWedge"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"ce95291a-125d-4eab-83ec-bce273a16905","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"e7b40128-9ed2-4d6a-ad50-8080a162e236","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"38b1b10e-19b7-4e0b-a26b-132ef5a084ed","type":"BoxAnnotation"},{"id":"4e5a2722-2c35-46cf-9a72-ad82dc733574","type":"GlyphRenderer"},{"id":"e0a0b715-f7f1-4cac-8c51-9fbf2574a97a","type":"GlyphRenderer"},{"id":"e3f5d00e-d8c4-46b1-847e-46660903643e","type":"Legend"},{"id":"ce95291a-125d-4eab-83ec-bce273a16905","type":"LinearAxis"},{"id":"e7b40128-9ed2-4d6a-ad50-8080a162e236","type":"LinearAxis"}],"sizing_mode":"fixed","title":{"id":"ef60d756-a819-4836-90dc-aa96804bd769","type":"Title"},"tool_events":{"id":"d81e4629-a46d-4c79-87ec-8bd69835481b","type":"ToolEvents"},"toolbar":{"id":"a4121139-1232-4531-b186-4f843dad3d9d","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"b8ce77f6-e510-455f-be64-0ab68d4adbe9","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"c427bb6f-1567-4fbb-b66c-f37ddaba5989","type":"Range1d"}},"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"},{"attributes":{},"id":"3c704110-8d45-4439-833f-2bdc70a4aecb","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"c1e5fbca-020d-41e4-878b-5844d4c5d6d8","type":"HelpTool"},{"attributes":{},"id":"620df5e0-6d13-4d59-a8c5-868c3a4b1a32","type":"ToolEvents"},{"attributes":{"data_source":{"id":"7bed596d-797f-40c8-8264-81b90122ef19","type":"ColumnDataSource"},"glyph":{"id":"c00a091f-f856-4d2a-b441-a30abcab8af8","type":"Patches"},"hover_glyph":null,"nonselection_glyph":{"id":"a7724dd5-3921-48e3-b3da-698097f1f087","type":"Patches"},"selection_glyph":null},"id":"70eb0eba-3e03-4f8d-9c09-e52fe06878fa","type":"GlyphRenderer"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"xs":{"field":"x"},"ys":{"field":"y"}},"id":"a7724dd5-3921-48e3-b3da-698097f1f087","type":"Patches"},{"attributes":{},"id":"aac6891b-23d1-42f3-976c-cd0323f7c3fa","type":"BasicTicker"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"892ef5bd-1a2a-4006-be7c-74249bfb854b","type":"Range1d"},{"attributes":{"bottom":{"field":"y0"},"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"left":{"field":"x0"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"x1"},"top":{"field":"y1"}},"id":"b2231f83-16d5-4cc7-b968-ba6cb268078c","type":"Quad"},{"attributes":{},"id":"4a985bf7-5653-4ea5-98fe-f67cdf1b698f","type":"BasicTickFormatter"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"d3527c70-0f86-4441-9a18-1afe6dcbc6c5","type":"Range1d"},{"attributes":{"background_fill_alpha":{"value":0},"background_fill_color":{"value":null},"below":[{"id":"6cbd761b-a0f2-4625-9d4e-dbdcf0251d9c","type":"DatetimeAxis"}],"border_fill_color":{"value":null},"left":[{"id":"9acb7c0e-7631-40b2-8de3-6cf7d1f43e83","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":400,"plot_width":1000,"renderers":[{"id":"6cbd761b-a0f2-4625-9d4e-dbdcf0251d9c","type":"DatetimeAxis"},{"id":"daf4f19f-f458-42e4-8f17-4a0fe499cee6","type":"Grid"},{"id":"9acb7c0e-7631-40b2-8de3-6cf7d1f43e83","type":"LinearAxis"},{"id":"dca95b48-e860-4df9-a9f1-f32aa689ce16","type":"Grid"},{"id":"193cab7b-cdc8-4017-bfeb-c29dd89f33ac","type":"BoxAnnotation"},{"id":"70eb0eba-3e03-4f8d-9c09-e52fe06878fa","type":"GlyphRenderer"},{"id":"63750f41-1de5-4861-bcff-041e02ff313f","type":"GlyphRenderer"},{"id":"c1557929-d27b-4353-bde7-746c502934c5","type":"LabelSet"},{"id":"8817b251-d68a-4f03-9589-713c8b340498","type":"LabelSet"}],"sizing_mode":"fixed","title":{"id":"82ba67e0-f95e-4048-878e-632b63528dac","type":"Title"},"tool_events":{"id":"2df89efc-7954-4658-8706-69b6fb598041","type":"ToolEvents"},"toolbar":{"id":"159e4c9a-e764-47d9-bf12-d93af12f13a1","type":"Toolbar"},"toolbar_location":null,"x_range":{"id":"3fc2024e-bfca-47ed-a7f4-3a79c23aa159","type":"DataRange1d"},"y_range":{"id":"022239ac-dddf-485c-8395-a0ad02b06c16","type":"Range1d"}},"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"7d461a60-6e57-4711-bc18-17861d6136cb","type":"Range1d"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"3544c9fd-5615-4212-bb1b-9b0e814fbf50","type":"AnnularWedge"},{"attributes":{"location":"top_left","plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"1b4d711b-a2aa-41d7-a336-a89928d5fbd9","type":"Legend"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"32e9a3e9-7954-4aa5-8203-5928fff8d6b7","type":"PanTool"},{"attributes":{"months":[0,1,2,3,4,5,6,7,8,9,10,11]},"id":"43e8802e-18c5-488a-8761-bc6bf895a664","type":"MonthsTicker"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"a2367f18-1ebb-4b79-83a0-fb06748e0f30","type":"HelpTool"},{"attributes":{},"id":"5e8041d7-e8ca-43c9-9065-3333a4ca6151","type":"BasicTicker"},{"attributes":{},"id":"6bace439-46d0-4078-91b2-67faca135cd6","type":"BasicTicker"},{"attributes":{"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"}},"id":"45c8ac78-037c-46e1-9b13-a403ed25295d","type":"PanTool"},{"attributes":{"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"}},"id":"fde1b4a2-1ee2-4557-b9bd-69c0ed34e8aa","type":"HelpTool"},{"attributes":{"formatter":{"id":"3c704110-8d45-4439-833f-2bdc70a4aecb","type":"BasicTickFormatter"},"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"},"ticker":{"id":"3bad6265-20db-4d7e-9943-aaeb64c43c3b","type":"BasicTicker"},"visible":false},"id":"9acb7c0e-7631-40b2-8de3-6cf7d1f43e83","type":"LinearAxis"},{"attributes":{},"id":"a0d87dd2-cac8-4caa-af02-285f2153781b","type":"ToolEvents"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"16fc1307-8865-4376-a894-deb12bd9a692","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"3f811f0e-adcf-41b9-b1f4-8e6be89ab61e","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"3de27e9d-d46d-4c26-b23b-1ffc14b180f1","type":"BoxAnnotation"},{"id":"584e5a23-b1fe-4007-bf79-e7c61af8385f","type":"GlyphRenderer"},{"id":"9d8bb1df-44b0-4b97-97b1-05cfeec79372","type":"GlyphRenderer"},{"id":"1b4d711b-a2aa-41d7-a336-a89928d5fbd9","type":"Legend"},{"id":"16fc1307-8865-4376-a894-deb12bd9a692","type":"LinearAxis"},{"id":"3f811f0e-adcf-41b9-b1f4-8e6be89ab61e","type":"LinearAxis"}],"sizing_mode":"fixed","title":{"id":"898b8681-7c1d-4175-be6d-9f02e64af019","type":"Title"},"tool_events":{"id":"a0d87dd2-cac8-4caa-af02-285f2153781b","type":"ToolEvents"},"toolbar":{"id":"76cf5c50-a5fe-4d6f-9ca2-cc20ffd7a94c","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"d3527c70-0f86-4441-9a18-1afe6dcbc6c5","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"7d461a60-6e57-4711-bc18-17861d6136cb","type":"Range1d"}},"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"},{"attributes":{"data_source":{"id":"b0064a16-74ed-4945-9d42-d60b31caf355","type":"ColumnDataSource"},"glyph":{"id":"8c0f6f4c-668d-439a-bcec-b45e4b792f6e","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"e0a0b715-f7f1-4cac-8c51-9fbf2574a97a","type":"GlyphRenderer"},{"attributes":{"months":[0,4,8]},"id":"763ea05d-aeac-4440-b49f-d613d791c335","type":"MonthsTicker"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"32e9a3e9-7954-4aa5-8203-5928fff8d6b7","type":"PanTool"},{"id":"43edb9ce-4711-4465-97f1-0f84b45dff28","type":"WheelZoomTool"},{"id":"88bcbe9a-545c-4587-92c7-b672e2ee5e4b","type":"BoxZoomTool"},{"id":"674cd3a8-1369-41b3-8a40-e451fc9f74eb","type":"SaveTool"},{"id":"9247e73a-2dda-4ce2-9697-01c5ff96fdac","type":"ResetTool"},{"id":"422ef763-c860-4530-9e39-8521a8f89afe","type":"HelpTool"}]},"id":"76cf5c50-a5fe-4d6f-9ca2-cc20ffd7a94c","type":"Toolbar"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","logo":null,"tools":[{"id":"45c8ac78-037c-46e1-9b13-a403ed25295d","type":"PanTool"},{"id":"31f045fc-6c7b-43da-ac0d-b511d4f1d005","type":"WheelZoomTool"},{"id":"bc1b44de-afec-4d5e-a4e3-1c22e3086587","type":"BoxZoomTool"},{"id":"bb5b5569-c949-4a15-ba6f-de7bf94d77f7","type":"SaveTool"},{"id":"5d650d8d-572f-4a91-bb19-181258fcfd62","type":"ResetTool"},{"id":"fde1b4a2-1ee2-4557-b9bd-69c0ed34e8aa","type":"HelpTool"}]},"id":"159e4c9a-e764-47d9-bf12-d93af12f13a1","type":"Toolbar"},{"attributes":{"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"}},"id":"31f045fc-6c7b-43da-ac0d-b511d4f1d005","type":"WheelZoomTool"},{"attributes":{"data_source":{"id":"b1c0caef-2e0a-4c6e-8483-5e41d2653b79","type":"ColumnDataSource"},"glyph":{"id":"a4e59d77-7040-4d77-8407-ae90f756f283","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"584e5a23-b1fe-4007-bf79-e7c61af8385f","type":"GlyphRenderer"},{"attributes":{},"id":"dca0567c-80d9-4bff-b422-7537dbbc4b3c","type":"BasicTickFormatter"},{"attributes":{"plot":null,"text":""},"id":"82ba67e0-f95e-4048-878e-632b63528dac","type":"Title"},{"attributes":{},"id":"3d792639-e825-4312-825b-17ab0e965d2f","type":"BasicTickFormatter"},{"attributes":{"axis_label":null,"formatter":{"id":"0c1e18d5-3b6f-4fc2-a24c-ded83cd36b9a","type":"BasicTickFormatter"},"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"},"ticker":{"id":"5e8041d7-e8ca-43c9-9065-3333a4ca6151","type":"BasicTicker"},"visible":false},"id":"ce95291a-125d-4eab-83ec-bce273a16905","type":"LinearAxis"},{"attributes":{},"id":"edbe1723-e2c3-4ffc-b62a-b425812d6870","type":"BasicTicker"},{"attributes":{"children":[{"id":"e3b6d86b-d5d6-4f71-b7c0-a7c95141291b","type":"Row"},{"id":"707851b4-8130-474a-9ab9-2ec1e0599c4c","type":"Row"}]},"id":"bbd866d9-f140-4d10-b3d0-53aa703621c3","type":"Column"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"a4e59d77-7040-4d77-8407-ae90f756f283","type":"AnnularWedge"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"10pt"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8c0f6f4c-668d-439a-bcec-b45e4b792f6e","type":"Text"},{"attributes":{"months":[0,6]},"id":"01a5d200-f35f-47ca-90c6-b698973460e8","type":"MonthsTicker"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"53acb474-ca0e-4c81-92b5-b6d99cb4b4f3","type":"WheelZoomTool"},{"attributes":{"axis_label":null,"formatter":{"id":"3d792639-e825-4312-825b-17ab0e965d2f","type":"BasicTickFormatter"},"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"},"ticker":{"id":"6bace439-46d0-4078-91b2-67faca135cd6","type":"BasicTicker"},"visible":false},"id":"6b33b229-d114-4135-be23-29bad847d37a","type":"LinearAxis"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"95c740e2-386e-4063-b9db-b945b0827def","type":"WheelZoomTool"},{"attributes":{"data_source":{"id":"ac3e7f8d-261c-4284-aefc-4d9b5664d57f","type":"ColumnDataSource"},"glyph":{"id":"3544c9fd-5615-4212-bb1b-9b0e814fbf50","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"45f9d002-9aeb-4fbd-9503-8de1bbeb4c77","type":"GlyphRenderer"},{"attributes":{"data_source":{"id":"1fa85fd9-3da5-4420-b9ec-35abecb21a60","type":"ColumnDataSource"},"glyph":{"id":"79966e00-e401-4dce-bd4f-c96e12fe3fdf","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"0b0dbfc1-81de-4e51-b7c6-c3aeaf75659e","type":"GlyphRenderer"},{"attributes":{"callback":null,"column_names":["x","y","index","project","line_color","fill_color"],"data":{"fill_color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df","#9cb9d9","#81aed2","#63a2cb","#4295c3","#2685bb","#0c74b2","#0567a2","#045b8f","#034a74"],"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"line_color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df","#9cb9d9","#81aed2","#63a2cb","#4295c3","#2685bb","#0c74b2","#0567a2","#045b8f","#034a74"],"project":["","Hospital Billing System","Document Management System","Data Center Migration","CDR Datamart Support and Maintainance ","ETL Migration","XBOX (USSD personalization)","Zero charge event","CDR ASN.1 coversion migration","Event Management Platform","Cisco IPCC-Phase 1","Cisco IPCC-Phase 2","Cisco IPCC-Phase 3","Genesys IPCC "],"x":[[1009843200000.0,1009843200000.0,1012521600000.0,1014940800000.0,1017619200000.0,1020211200000.0,1022889600000.0,1025481600000.0,1028160000000.0,1030838400000.0,1033430400000.0,1036108800000.0,1038700800000.0,1101859200000.0,1109635200000.0,1112313600000.0,1114905600000.0,1117584000000.0,1133395200000.0,1388534400000.0,1391212800000.0,1393632000000.0,1396310400000.0,1398902400000.0,1401580800000.0,1446336000000.0,1448928000000.0,1451606400000.0,1454284800000.0,1456790400000.0,1459468800000.0,1462060800000.0,1464739200000.0,1472688000000.0,1475280000000.0,1477958400000.0,1480550400000.0,1480550400000.0],[1041379200000.0,1041379200000.0,1044057600000.0,1046476800000.0,1049155200000.0,1051747200000.0,1054425600000.0,1057017600000.0,1059696000000.0,1062374400000.0,1064966400000.0,1067644800000.0,1070236800000.0,1072915200000.0,1075593600000.0,1078099200000.0,1080777600000.0,1083369600000.0,1086048000000.0,1088640000000.0,1091318400000.0,1093996800000.0,1096588800000.0,1099267200000.0,1099267200000.0],[1104537600000.0,1104537600000.0,1107216000000.0,1107216000000.0],[1120176000000.0,1120176000000.0,1122854400000.0,1125532800000.0,1128124800000.0,1130803200000.0,1130803200000.0],[1136073600000.0,1136073600000.0,1138752000000.0,1141171200000.0,1143849600000.0,1146441600000.0,1149120000000.0,1151712000000.0,1154390400000.0,1157068800000.0,1159660800000.0,1162339200000.0,1164931200000.0,1167609600000.0,1170288000000.0,1172707200000.0,1175385600000.0,1177977600000.0,1180656000000.0,1183248000000.0,1185926400000.0,1188604800000.0,1191196800000.0,1193875200000.0,1196467200000.0,1199145600000.0,1201824000000.0,1204329600000.0,1207008000000.0,1209600000000.0,1212278400000.0,1214870400000.0,1217548800000.0,1220227200000.0,1222819200000.0,1225497600000.0,1228089600000.0,1230768000000.0,1233446400000.0,1235865600000.0,1238544000000.0,1241136000000.0,1243814400000.0,1246406400000.0,1249084800000.0,1251763200000.0,1254355200000.0,1257033600000.0,1257033600000.0],[1259625600000.0,1259625600000.0,1262304000000.0,1264982400000.0,1267401600000.0,1270080000000.0,1272672000000.0,1275350400000.0,1275350400000.0],[1277942400000.0,1277942400000.0,1280620800000.0,1283299200000.0,1285891200000.0,1288569600000.0,1291161600000.0,1293840000000.0,1296518400000.0,1298937600000.0,1301616000000.0,1304208000000.0,1306886400000.0,1306886400000.0],[1309478400000.0,1309478400000.0,1312156800000.0,1314835200000.0,1317427200000.0,1320105600000.0,1322697600000.0,1325376000000.0,1328054400000.0,1330560000000.0,1333238400000.0,1335830400000.0,1338508800000.0,1338508800000.0],[1341100800000.0,1341100800000.0,1343779200000.0,1346457600000.0,1349049600000.0,1351728000000.0,1354320000000.0,1356998400000.0,1359676800000.0,1362096000000.0,1362096000000.0],[1364774400000.0,1364774400000.0,1367366400000.0,1370044800000.0,1372636800000.0,1375315200000.0,1377993600000.0,1380585600000.0,1383264000000.0,1385856000000.0,1385856000000.0],[1404172800000.0,1404172800000.0,1406851200000.0,1409529600000.0,1412121600000.0,1414800000000.0,1414800000000.0],[1417392000000.0,1417392000000.0,1420070400000.0,1422748800000.0,1425168000000.0,1427846400000.0,1427846400000.0],[1430438400000.0,1430438400000.0,1433116800000.0,1435708800000.0,1438387200000.0,1441065600000.0,1443657600000.0,1443657600000.0],[1467331200000.0,1467331200000.0,1470009600000.0,1470009600000.0]],"y":[[1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09,1e-09],[1e-09,0.10493280163957515,0.17251290369652483,0.2543704953146855,0.34883919198396773,0.45399588346286535,0.5676998827571801,0.6698471496748317,0.7583582603047696,0.8314313836795337,0.8875789617327007,0.9256579916913522,0.9448932943163848,0.9448932943163848,0.9256579916913523,0.8875789617327009,0.8314313836795338,0.7583582603047696,0.6698471496748317,0.5676998827571802,0.4539958834628655,0.34883919198396784,0.8793704951896856,1.422512903446525,1e-09],[1e-09,1.3030059248893395,1.2677893554091608,1e-09],[1e-09,0.30177669592163686,0.3017766959216369,0.3017766959216369,0.3017766959216369,0.3188372991378047,1e-09],[1e-09,0.3153546169017063,0.2578038096909623,0.2531353650853904,0.3527356374219508,0.4677518967297388,0.5976478841135973,0.7247573613011463,0.848487685108598,0.968261967650103,1.0835217659303777,1.1937296855637363,1.2983718863547864,1.3969604780586204,1.489035795150356,1.574168539998002,1.6519617844461942,1.7220528204784804,1.7841148513295304,1.8378585151625082,1.8830332342075324,1.9194283830709102,1.9468742707679512,1.7175714455165878,1.7296777014959657,1.6657250749556527,1.66805358844657,1.586142413282522,1.5722904515145921,1.5991163996858295,1.5221927021544817,1.4753912029936367,1.481323498766531,1.4163965540414893,1.5741685399980025,1.489035795150356,1.3969604780586204,1.2983718863547866,1.1937296855637363,1.083521765930378,0.9682619676501031,0.7976236819704395,0.6907156991520849,0.9691444538855125,1.569235095401324,2.536599884769572,3.8335986850120936,6.329600172129589,1e-09],[1e-09,7.982669638235296,8.776570261077524,8.065544734808283,8.065544734808283,6.701096741901504,5.35723085750082,4.14281910340722,1e-09],[1e-09,3.156245897552571,2.4774375336984433,2.1613870284555134,2.233698914133835,2.6885149116860942,3.066389698738223,3.1958438290453066,3.066389698738223,2.688514911686094,2.233698914133835,1.9853041804296196,1.9634541747628012,1e-09],[1e-09,2.169919054645518,2.587972263403592,3.1837456163216094,3.908973099546711,4.704901095356914,5.366181972791891,5.592726700829287,5.119665985680639,4.704901095356915,4.049839377842426,2.5879722634035924,1.9634541747628012,1e-09],[1e-09,2.480214901245086,2.6885149116860942,2.9255234204425085,3.1958438290453066,2.925523420442508,2.688514911686094,5.403190178474919,10.495577933094458,28.398429807463806,1e-09],[1e-09,50.39909184093199,60.49158551024961,65.82427695726894,71.9064861535194,68.99376822161003,60.49158551024961,50.258225562636284,39.12273434160079,27.987243120565296,1e-09],[1e-09,3.017766953591369,3.017766953591369,3.017766953591369,3.9016504299495534,5.151650429824553,1e-09],[1e-09,6.035533906182738,5.151650429824553,3.9016504299495534,3.642766953466369,4.725298708071917,1e-09],[1e-09,6.173946986194282,5.548946986194281,4.665063509836096,4.665063509836096,4.665063509836095,4.040063509961095,1e-09],[1e-09,1.25000000075,1.25000000075,1e-09]]}},"id":"7bed596d-797f-40c8-8264-81b90122ef19","type":"ColumnDataSource"},{"attributes":{},"id":"8a2887f0-d8a4-4dc7-9c9d-e79fd7c0bd6a","type":"YearsTicker"},{"attributes":{"callback":null,"column_names":["text_angle","x","y","text"],"data":{"text":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[0.29540501384245865,-1.072550901133706,-0.24577535639757545,0.6128272451980095,1.1020745672689691],"y":[1.0855233197848568,-0.33949899039213,-1.0978248832066273,-0.9434340292479485,-0.22595718218041738]}},"id":"b0064a16-74ed-4945-9d42-d60b31caf355","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"65c8917b-fa8d-4a03-ab8f-54850d558a5f","type":"ResetTool"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"9584f0a1-8b9b-4828-8edf-a18eec66f2b9","type":"PanTool"},{"attributes":{},"id":"33d77ccf-644e-4d25-92e1-ef419f49e4f4","type":"BasicTicker"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"38b1b10e-19b7-4e0b-a26b-132ef5a084ed","type":"BoxAnnotation"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"69f21e64-7956-4f1c-9f30-bcec584005ae","type":"SaveTool"},{"attributes":{"bottom":{"field":"y0"},"fill_color":{"field":"fill_color"},"left":{"field":"x0"},"line_color":{"field":"line_color"},"right":{"field":"x1"},"top":{"field":"y1"}},"id":"ea363204-bda5-42cd-80f9-8aab36d71670","type":"Quad"},{"attributes":{"callback":null,"column_names":["color","start","values","outers","end","centers","level","inners","role"],"data":{"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[0.5135519637185889,3.0164255270776805,4.186316098085958,4.281043603325263,6.283185307179586],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"role":["Development Lead","Project Lead","Support","Test Lead","Test Manager"],"start":[0.0,0.5135519637185889,3.0164255270776805,4.186316098085958,4.281043603325263],"values":[0.1856630339132202,0.9048570195499789,0.4229473317307542,0.03424657534246575,0.7238288027761709]}},"id":"ac3e7f8d-261c-4284-aefc-4d9b5664d57f","type":"ColumnDataSource"},{"attributes":{"callback":null,"column_names":["color","start","values","outers","end","centers","level","inners","tech"],"data":{"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[2.6101979062091716,4.286099156377629,4.6981923458167625,5.878732564811962,6.283185307179588],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"start":[0.0,2.6101979062091716,4.286099156377629,4.6981923458167625,5.878732564811962],"tech":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"values":[0.9048570195499789,0.5809716599190281,0.14285714285714285,0.4092487015937679,0.14020848845867467]}},"id":"a5e7beb8-80cd-4051-8d96-f9ab96c768d8","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"422ef763-c860-4530-9e39-8521a8f89afe","type":"HelpTool"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"9584f0a1-8b9b-4828-8edf-a18eec66f2b9","type":"PanTool"},{"id":"53acb474-ca0e-4c81-92b5-b6d99cb4b4f3","type":"WheelZoomTool"},{"id":"52bf81e9-418d-4687-891d-f43d743d2384","type":"BoxZoomTool"},{"id":"8c4b8d32-9ad2-4227-a830-12a08b48e9ba","type":"SaveTool"},{"id":"65c8917b-fa8d-4a03-ab8f-54850d558a5f","type":"ResetTool"},{"id":"c1e5fbca-020d-41e4-878b-5844d4c5d6d8","type":"HelpTool"}]},"id":"a4121139-1232-4531-b186-4f843dad3d9d","type":"Toolbar"},{"attributes":{"plot":null,"text":null},"id":"ef60d756-a819-4836-90dc-aa96804bd769","type":"Title"},{"attributes":{"days":[1,4,7,10,13,16,19,22,25,28]},"id":"cb3296f3-ccb8-4f98-857d-89fce332eab7","type":"DaysTicker"},{"attributes":{},"id":"d81e4629-a46d-4c79-87ec-8bd69835481b","type":"ToolEvents"},{"attributes":{"children":[{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"}]},"id":"e3b6d86b-d5d6-4f71-b7c0-a7c95141291b","type":"Row"},{"attributes":{},"id":"b3d185e3-e597-4e29-9b40-391db72f43d4","type":"BasicTicker"},{"attributes":{"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"},"ticker":{"id":"bbf72f8d-078d-4650-b3da-66775b306234","type":"DatetimeTicker"},"visible":false},"id":"daf4f19f-f458-42e4-8f17-4a0fe499cee6","type":"Grid"},{"attributes":{"overlay":{"id":"193cab7b-cdc8-4017-bfeb-c29dd89f33ac","type":"BoxAnnotation"},"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"}},"id":"bc1b44de-afec-4d5e-a4e3-1c22e3086587","type":"BoxZoomTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"193cab7b-cdc8-4017-bfeb-c29dd89f33ac","type":"BoxAnnotation"},{"attributes":{"num_minor_ticks":5},"id":"bbf72f8d-078d-4650-b3da-66775b306234","type":"DatetimeTicker"},{"attributes":{"max_interval":500.0,"num_minor_ticks":0},"id":"bbfca350-be87-4db6-88e6-1b3bdf1fb4f4","type":"AdaptiveTicker"},{"attributes":{"location":"top_left","plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"e3f5d00e-d8c4-46b1-847e-46660903643e","type":"Legend"},{"attributes":{"axis_label":null,"formatter":{"id":"f03f5afa-a388-43ef-9c80-933b11241074","type":"BasicTickFormatter"},"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"},"ticker":{"id":"aac6891b-23d1-42f3-976c-cd0323f7c3fa","type":"BasicTicker"},"visible":false},"id":"16fc1307-8865-4376-a894-deb12bd9a692","type":"LinearAxis"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"6b33b229-d114-4135-be23-29bad847d37a","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"4352280b-e6f6-446a-bfe0-6517b9fea7d3","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"53a358e8-1991-48d2-bbab-e401b8f21ffe","type":"BoxAnnotation"},{"id":"45f9d002-9aeb-4fbd-9503-8de1bbeb4c77","type":"GlyphRenderer"},{"id":"0b0dbfc1-81de-4e51-b7c6-c3aeaf75659e","type":"GlyphRenderer"},{"id":"43e481f0-3e00-4d79-bd3f-0df5a118f31f","type":"Legend"},{"id":"6b33b229-d114-4135-be23-29bad847d37a","type":"LinearAxis"},{"id":"4352280b-e6f6-446a-bfe0-6517b9fea7d3","type":"LinearAxis"}],"sizing_mode":"fixed","title":{"id":"c712440e-ba41-4fca-ae73-d8bfeab89e33","type":"Title"},"tool_events":{"id":"620df5e0-6d13-4d59-a8c5-868c3a4b1a32","type":"ToolEvents"},"toolbar":{"id":"b9755785-e874-418a-9819-6c73f0d07f03","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"892ef5bd-1a2a-4006-be7c-74249bfb854b","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"535780b9-94b7-4828-8a9c-9940561e0f3b","type":"Range1d"}},"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"},{"attributes":{"callback":null,"column_names":["text_angle","x","y","text"],"data":{"text":["design","development","managing","planning","troubleshoot"],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[0.9464102244350788,-0.16010419305744564,-1.0794295953163096,-0.46734188962712303,0.9464102244350788],"y":[0.6082209196375472,1.1135491221160494,0.3169491264466084,-1.0233359947738327,-0.6082209196375471]}},"id":"82298c64-d617-4e0d-b877-d3d18362ac38","type":"ColumnDataSource"},{"attributes":{"callback":null,"end":100,"start":-75},"id":"022239ac-dddf-485c-8395-a0ad02b06c16","type":"Range1d"},{"attributes":{},"id":"3bad6265-20db-4d7e-9943-aaeb64c43c3b","type":"BasicTicker"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"535780b9-94b7-4828-8a9c-9940561e0f3b","type":"Range1d"},{"attributes":{},"id":"2df89efc-7954-4658-8706-69b6fb598041","type":"ToolEvents"},{"attributes":{"callback":null},"id":"3fc2024e-bfca-47ed-a7f4-3a79c23aa159","type":"DataRange1d"},{"attributes":{"base":60,"mantissas":[1,2,5,10,15,20,30],"max_interval":1800000.0,"min_interval":1000.0,"num_minor_ticks":0},"id":"de7b82ba-5933-4a08-8652-541ef866b929","type":"AdaptiveTicker"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"10pt"},"x":{"field":"x"},"y":{"field":"y"}},"id":"71bd370b-fd6c-4562-9cc8-d956aac685ba","type":"Text"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"fa440b4e-1d37-4d8e-ab25-20b5cb9b159c","type":"PanTool"},{"id":"95c740e2-386e-4063-b9db-b945b0827def","type":"WheelZoomTool"},{"id":"ca268888-0fb6-4875-bc0f-4744c2bac13c","type":"BoxZoomTool"},{"id":"69f21e64-7956-4f1c-9f30-bcec584005ae","type":"SaveTool"},{"id":"34b0abb7-74fe-40c9-b398-924b952b0eb3","type":"ResetTool"},{"id":"a2367f18-1ebb-4b79-83a0-fb06748e0f30","type":"HelpTool"}]},"id":"b9755785-e874-418a-9819-6c73f0d07f03","type":"Toolbar"},{"attributes":{},"id":"f03f5afa-a388-43ef-9c80-933b11241074","type":"BasicTickFormatter"},{"attributes":{"overlay":{"id":"38b1b10e-19b7-4e0b-a26b-132ef5a084ed","type":"BoxAnnotation"},"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"52bf81e9-418d-4687-891d-f43d743d2384","type":"BoxZoomTool"},{"attributes":{"callback":null,"column_names":["date","y","index","proj"],"data":{"date":[1070236800000.0,1104537600000.0,1125532800000.0,1196467200000.0,1204329600000.0,1262304000000.0,1293840000000.0,1325376000000.0,1349049600000.0,1372636800000.0,1409529600000.0,1422748800000.0,1435708800000.0,1467331200000.0],"index":[1070236800000.0,1104537600000.0,1125532800000.0,1196467200000.0,1204329600000.0,1262304000000.0,1293840000000.0,1325376000000.0,1349049600000.0,1372636800000.0,1409529600000.0,1422748800000.0,1435708800000.0,1467331200000.0],"proj":["Hospital Billing System","Document Management System","Data Center Migration","CDR Datamart Support and Maintainance ","CDR Datamart Expansion","ETL Migration","XBOX (USSD personalization)","Zero charge event","CDR ASN.1 coversion migration","Event Management Platform","Cisco IPCC-Phase 1","Cisco IPCC-Phase 2","Cisco IPCC-Phase 3","Genesys IPCC "],"y":[1.0,5.0,1.0,2.0,2.0,11.877857302571194,3.959285767523731,6.92875009316653,3.959285767523731,35.9532430767597,10.0,10.0,10.0,5.0]}},"id":"95bdbb31-8fa6-4964-b96c-f6f3a626de4a","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"fa440b4e-1d37-4d8e-ab25-20b5cb9b159c","type":"PanTool"},{"attributes":{"fill_color":{"field":"fill_color"},"line_color":{"field":"line_color"},"xs":{"field":"x"},"ys":{"field":"y"}},"id":"c00a091f-f856-4d2a-b441-a30abcab8af8","type":"Patches"},{"attributes":{"axis_label":null,"formatter":{"id":"7c9a872d-077e-4405-b293-b614242919d8","type":"BasicTickFormatter"},"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"},"ticker":{"id":"edbe1723-e2c3-4ffc-b62a-b425812d6870","type":"BasicTicker"},"visible":false},"id":"4352280b-e6f6-446a-bfe0-6517b9fea7d3","type":"LinearAxis"},{"attributes":{"axis_label":"year","formatter":{"id":"8787f5d6-3560-40f1-968b-f5317cb7fd97","type":"DatetimeTickFormatter"},"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"},"ticker":{"id":"bbf72f8d-078d-4650-b3da-66775b306234","type":"DatetimeTicker"}},"id":"6cbd761b-a0f2-4625-9d4e-dbdcf0251d9c","type":"DatetimeAxis"},{"attributes":{"plot":{"id":"008cd952-eaee-4486-82bc-7bff488b7850","subtype":"Figure","type":"Plot"}},"id":"5d650d8d-572f-4a91-bb19-181258fcfd62","type":"ResetTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"53a358e8-1991-48d2-bbab-e401b8f21ffe","type":"BoxAnnotation"},{"attributes":{"months":[0,2,4,6,8,10]},"id":"7a33695f-ecf6-4c0a-89eb-ea3b3f625cfc","type":"MonthsTicker"},{"attributes":{},"id":"0c1e18d5-3b6f-4fc2-a24c-ded83cd36b9a","type":"BasicTickFormatter"},{"attributes":{},"id":"7c9a872d-077e-4405-b293-b614242919d8","type":"BasicTickFormatter"},{"attributes":{"days":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},"id":"22dd23e7-df2b-49a0-86d3-b630a1ec5a07","type":"DaysTicker"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"8c4b8d32-9ad2-4227-a830-12a08b48e9ba","type":"SaveTool"},{"attributes":{"plot":null,"text":null},"id":"898b8681-7c1d-4175-be6d-9f02e64af019","type":"Title"}],"root_ids":["bbd866d9-f140-4d10-b3d0-53aa703621c3"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"ecb4062a-7caa-4c1a-aa9b-f61822e57006","elementid":"a668181c-405a-4965-b877-a13d156cea02","modelid":"bbd866d9-f140-4d10-b3d0-53aa703621c3"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("a668181c-405a-4965-b877-a13d156cea02")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
tech = [['High-Availablity',3]
        , ['Disaster Recovery',3]
        , ['Masive Parallel Processing', 3]
        , ['RDMS',4]
        , ['ETL',4]
        , ['Linux',4]
        , ['Windows',2]
        , ['Enterprise Storage',3]
        , ['Virtualization',1]
        , ['Contact Center', 3]]

prod = [['Ab-Initio',4]
        , ['Oracle RDMS',4]
        , ['Redhat',4]
        , ['Datastage',3]
        , ['Visual Basic',4]
        , ['Python',2]
        , ['TensorFlow',2]
        , ['Bash',4]
        , ['Veritas Cluster',3]]

sbjt = [['Telco',4]
       , ['Data Science',2]
       , ['Visualization',2]
       , ['Business Intelligence',4]
       , ['Testing',4]
       , ['Project Management',4]
       , ['Development Methodology',4]]
        
clr3=['#deebf7','#9ecae1','#3182bd']
clr5=['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c']
```


```python
tech_comp=dict({
        'tech' : [tech[r][0] for r in range(len(tech))] 
        , 'comp' : [tech[r][1] for r in range(len(tech))]
        , 'y' : [j + .2 for j in range(len(tech))]
        , 'x' : [ 0 for j in range(len(tech))]
 })

delt=0
delt=len(tech_comp['tech'])
prod_comp=dict({
        'prod' : [prod[r][0] for r in range(len(prod))] 
        , 'comp' : [prod[r][1] for r in range(len(prod))]
        , 'y' : [j + .2 + delt for j in range(len(prod))]
        , 'x' : [ 0 for j in range(len(prod))]
    })

delt=delt+len(prod_comp['prod'])
sbjt_comp=dict({
        'sbjt' : [sbjt[r][0] for r in range(len(sbjt))]
        , 'comp' : [sbjt[r][1] for r in range(len(sbjt))]
        , 'y' : [j + .2 + delt for j in range(len(sbjt))]
        , 'x' : [ 0 for j in range(len(sbjt))]
    })
```


```python
def to_bar_grad(label,level,max=5,length=.9, height=.9, y_off=0, clr=clr5):
    if len(label) != len(level):
        print ("label and level have to have an equal lenght. your label:" + str(len(label)) + "your level: " + str(len(level)))
        return None
    top=[]
    botom=[]
    left=[]
    right=[]
    color=[]
    lbl=[]
    lv=[]
    for lb in range(len(label)):
        #print(lb)
        for lev in range(max-1):
            top+=[lb+1+y_off]
            botom+=[lb+(1-height)+y_off]
            left+=[lev]
            right+=[lev+length]
            lbl+=[label[lb]]
            lv+=[lev+1]
            if lev+1 > level[lb]:
                color+=['#ffffff']
            else:
                color+=[clr[lev]]
    #print(top,botom,left,right,color)
    return [top,botom,left,right,color,lbl,lv]
```


```python
a=to_bar_grad(tech_comp['tech'], tech_comp['comp'])
#print(len(a[0]),len(a[1]),len(a[2]),len(a[3]),len(a[4]),len(a[5]),len(a[6]))
tech_dat=dict({
        "top":a[0],
        "bottom":a[1],
        "left":a[2],
        "right":a[3],
        "color":a[4],
        "label":a[5],
        "level":a[6]
    })


off=0
off=len(tech_comp['tech'])
prod_clr = sns.light_palette("Navy", 5).as_hex()
b=to_bar_grad(prod_comp['prod'], prod_comp['comp'], clr=prod_clr, y_off=off)
prod_dat=dict({
        "top":b[0],
        "bottom":b[1],
        "left":b[2],
        "right":b[3],
        "color":b[4],
        "label":b[5],
        "level":b[6]
    })

off=off+len(prod_comp['prod'])
sbjt_clr = sns.color_palette("BuGn", 5).as_hex()
c=to_bar_grad(sbjt_comp['sbjt'], sbjt_comp['comp'], clr=sbjt_clr, y_off=off)
sbjt_dat=dict({
        "top":c[0],
        "bottom":c[1],
        "left":c[2],
        "right":c[3],
        "color":c[4],
        "label":c[5],
        "level":c[6]
    })
```


```python
quad_dat=dict({
        'top' : tech_dat['top'] + prod_dat['top'] + sbjt_dat['top'] 
        , 'bottom' : tech_dat['bottom'] + prod_dat['bottom'] + sbjt_dat['bottom']
        , 'left' : tech_dat['left'] + prod_dat['left'] + sbjt_dat['left']
        , 'right' : tech_dat['right'] + prod_dat['right'] + sbjt_dat['right']
        , 'color' : tech_dat['color'] + prod_dat['color'] + sbjt_dat['color']
} )

label_dat=dict({
        'label' : [tech_comp['tech'] + prod_comp['prod'] + sbjt_comp['sbjt']][0]
        , 'x' : [tech_comp['x'] + prod_comp['x'] + sbjt_comp['x']][0]
        , 'y' : [tech_comp['y'] + prod_comp['y'] + sbjt_comp['y']][0]
    })
```


```python
print(len(quad_dat['top']), len(quad_dat['bottom']), len(quad_dat['left']), len(quad_dat['right']), len(quad_dat['color']))
```

    104 104 104 104 104
    


```python
print(len(tech_dat['top']),  
len(prod_dat['top']), len(sbjt_dat['top']))
```

    40 36 28
    


```python
opt=dict(
outline_line_color = None
, toolbar_location = None
, border_fill_color = None
, background_fill_alpha = 0
#, sizing_mode = "scale_width"
, responsive = True
)

fig = figure(plot_width=300
             , plot_height=400
             , x_range=[-4,5]
             , y_range=[-1,len(label_dat['y'])+1]
             , **opt
             )
#fig.quad(top=quad_dat['top'],bottom=quad_dat['bottom'],left=quad_dat['left'],right=quad_dat['right'], color=quad_dat['color'])background_fill_alpha = 0,
fig.quad(top=sbjt_dat['top']
         , bottom=sbjt_dat['bottom']
         , left=sbjt_dat['left']
         , right=sbjt_dat['right']
         , color=sbjt_dat['color']
         , legend="Subject Area"
        )

fig.quad(top=prod_dat['top']
         , bottom=prod_dat['bottom']
         , left=prod_dat['left']
         , right=prod_dat['right']
         , color=prod_dat['color']
         , legend="Product/Programmin Language"
        )

fig.quad(top=tech_dat['top']
         , bottom=tech_dat['bottom']
         , left=tech_dat['left']
         , right=tech_dat['right']
         , color=tech_dat['color']
         , legend="Infrastructure/Technology"
        )

x_label_skill = LabelSet (x='x',y='y',text='label', level='glyph',
                    x_offset=-10, y_offset=0
                  , render_mode='canvas'
                  , angle=0
                  , angle_units="deg"
                  , text_font_size="10px"
                  , text_align = "right"
                  , text_font_style = "bold"
                  , source=ColumnDataSource(data=label_dat)
)

fig.add_layout(x_label_skill)
fig.xaxis.visible = False
fig.yaxis.visible = False
fig.grid.visible = False
fig.legend.label_text_font_size="10px"
#fig.legend.location = None

show(fig)
```




    <div class="bk-root">
        <div class="bk-plotdiv" id="99012865-2ca4-4079-b41e-c7da81856a92"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("99012865-2ca4-4079-b41e-c7da81856a92").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("99012865-2ca4-4079-b41e-c7da81856a92");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid '99012865-2ca4-4079-b41e-c7da81856a92' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"f7cb3abe-d252-4fe4-9083-d6fd78f9bbb3":{"roots":{"references":[{"attributes":{"plot":null,"text":""},"id":"dfa177a0-5ab9-4d67-bc17-9df39a6e4736","type":"Title"},{"attributes":{"data_source":{"id":"44f065a1-3e42-43fd-a3e3-d6d767102f8f","type":"ColumnDataSource"},"glyph":{"id":"39a9f29e-65a6-4710-93a8-e40dcf9b124b","type":"Quad"},"hover_glyph":null,"nonselection_glyph":{"id":"6e8711e7-bbbb-4386-88ab-5bea66b5d8ac","type":"Quad"},"selection_glyph":null},"id":"c2285094-9fbd-464a-9e9b-5e8d9cac9452","type":"GlyphRenderer"},{"attributes":{},"id":"7e56c244-a75c-4c75-8484-04b236f938bc","type":"BasicTickFormatter"},{"attributes":{"callback":null,"column_names":["label","x","y"],"data":{"label":["High-Availablity","Disaster Recovery","Masive Parallel Processing","RDMS","ETL","Linux","Windows","Enterprise Storage","Virtualization","Contact Center","Ab-Initio","Oracle RDMS","Redhat","Datastage","Visual Basic","Python","TensorFlow","Bash","Veritas Cluster","Telco","Data Science","Visualization","Business Intelligence","Testing","Project Management","Development Methodology"],"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0.2,1.2,2.2,3.2,4.2,5.2,6.2,7.2,8.2,9.2,10.2,11.2,12.2,13.2,14.2,15.2,16.2,17.2,18.2,19.2,20.2,21.2,22.2,23.2,24.2,25.2]}},"id":"fcf60b74-f845-4a4a-a0ef-35f440bef39f","type":"ColumnDataSource"},{"attributes":{"bottom":{"field":"bottom"},"fill_color":{"field":"fill_color"},"left":{"field":"left"},"line_color":{"field":"line_color"},"right":{"field":"right"},"top":{"field":"top"}},"id":"a224df1f-678b-4d28-85fa-1d93ab188037","type":"Quad"},{"attributes":{},"id":"4caf50d1-ec96-4d34-b3ea-cac839aa7672","type":"BasicTicker"},{"attributes":{"bottom":{"field":"bottom"},"fill_color":{"field":"fill_color"},"left":{"field":"left"},"line_color":{"field":"line_color"},"right":{"field":"right"},"top":{"field":"top"}},"id":"456ae8ee-e1d8-410e-a040-84761a2202a9","type":"Quad"},{"attributes":{"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"}},"id":"0da5fc01-cfec-4649-b902-be2bc380f9d9","type":"ResetTool"},{"attributes":{"items":[{"id":"c749555a-f000-4b45-a6a5-a2ff5d10dd68","type":"LegendItem"},{"id":"f5812c55-6cdf-4597-8a38-603b5df0c463","type":"LegendItem"},{"id":"aa6d3815-6d74-4558-91ca-30d723506f1b","type":"LegendItem"}],"label_text_font_size":{"value":"10px"},"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"}},"id":"d98f1476-9962-44ff-b42e-20e8bb373d1f","type":"Legend"},{"attributes":{"callback":null,"column_names":["right","bottom","top","left","line_color","fill_color"],"data":{"bottom":[0.09999999999999998,0.09999999999999998,0.09999999999999998,0.09999999999999998,1.1,1.1,1.1,1.1,2.1,2.1,2.1,2.1,3.1,3.1,3.1,3.1,4.1,4.1,4.1,4.1,5.1,5.1,5.1,5.1,6.1,6.1,6.1,6.1,7.1,7.1,7.1,7.1,8.1,8.1,8.1,8.1,9.1,9.1,9.1,9.1],"fill_color":["#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#bdd7e7","#6baed6","#3182bd","#eff3ff","#bdd7e7","#6baed6","#3182bd","#eff3ff","#bdd7e7","#6baed6","#3182bd","#eff3ff","#bdd7e7","#ffffff","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#ffffff","#ffffff","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff"],"left":[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],"line_color":["#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#bdd7e7","#6baed6","#3182bd","#eff3ff","#bdd7e7","#6baed6","#3182bd","#eff3ff","#bdd7e7","#6baed6","#3182bd","#eff3ff","#bdd7e7","#ffffff","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff","#eff3ff","#ffffff","#ffffff","#ffffff","#eff3ff","#bdd7e7","#6baed6","#ffffff"],"right":[0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9],"top":[1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10]}},"id":"c807bd02-16eb-4875-9981-b99bdee25315","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"}},"id":"3eed9bb4-b948-4f80-bd04-d72c0e1ab47b","type":"HelpTool"},{"attributes":{"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"},"ticker":{"id":"736b902c-ed15-4829-be86-dc9e5b2834b3","type":"BasicTicker"},"visible":false},"id":"c736a8c5-6b70-4422-936e-53ba8ac4ca2f","type":"Grid"},{"attributes":{"bottom":{"field":"bottom"},"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"left":{"field":"left"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"right"},"top":{"field":"top"}},"id":"b9915731-67d2-4d34-ab8d-3532367e8317","type":"Quad"},{"attributes":{"callback":null,"end":5,"start":-4},"id":"5bc889ba-25d4-4f14-a3bb-297725b019f6","type":"Range1d"},{"attributes":{"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"}},"id":"7a714a95-997d-4332-94e4-a077da33b514","type":"PanTool"},{"attributes":{"bottom":{"field":"bottom"},"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"left":{"field":"left"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"right"},"top":{"field":"top"}},"id":"6e8711e7-bbbb-4386-88ab-5bea66b5d8ac","type":"Quad"},{"attributes":{"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"}},"id":"bd8e7713-a1b8-446f-97fd-e77ec9dd5229","type":"SaveTool"},{"attributes":{"formatter":{"id":"c2f5e531-faea-41bf-981e-88fc93c6885e","type":"BasicTickFormatter"},"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"},"ticker":{"id":"4caf50d1-ec96-4d34-b3ea-cac839aa7672","type":"BasicTicker"},"visible":false},"id":"a92ef4db-8d2d-4a4f-8d46-145517f289f1","type":"LinearAxis"},{"attributes":{"label":{"value":"Infrastructure/Technology"},"renderers":[{"id":"0e8b64ac-2b0c-48ab-97d8-d77d96e404df","type":"GlyphRenderer"}]},"id":"aa6d3815-6d74-4558-91ca-30d723506f1b","type":"LegendItem"},{"attributes":{"bottom":{"field":"bottom"},"fill_color":{"field":"fill_color"},"left":{"field":"left"},"line_color":{"field":"line_color"},"right":{"field":"right"},"top":{"field":"top"}},"id":"39a9f29e-65a6-4710-93a8-e40dcf9b124b","type":"Quad"},{"attributes":{"label":{"value":"Subject Area"},"renderers":[{"id":"326d2c95-9450-4945-9c9e-416ee99903ac","type":"GlyphRenderer"}]},"id":"c749555a-f000-4b45-a6a5-a2ff5d10dd68","type":"LegendItem"},{"attributes":{},"id":"c2f5e531-faea-41bf-981e-88fc93c6885e","type":"BasicTickFormatter"},{"attributes":{"dimension":1,"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"},"ticker":{"id":"4caf50d1-ec96-4d34-b3ea-cac839aa7672","type":"BasicTicker"},"visible":false},"id":"3d80c88e-1023-4752-8b47-300391d16d38","type":"Grid"},{"attributes":{"callback":null,"column_names":["right","bottom","top","left","line_color","fill_color"],"data":{"bottom":[19.1,19.1,19.1,19.1,20.1,20.1,20.1,20.1,21.1,21.1,21.1,21.1,22.1,22.1,22.1,22.1,23.1,23.1,23.1,23.1,24.1,24.1,24.1,24.1,25.1,25.1,25.1,25.1],"fill_color":["#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266"],"left":[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],"line_color":["#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266"],"right":[0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9],"top":[20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,25,26,26,26,26]}},"id":"0bd08e13-ef78-4dbb-ab9e-71ae8a210f8a","type":"ColumnDataSource"},{"attributes":{},"id":"3a61105a-acae-4c8a-9c3d-8905fb872946","type":"ToolEvents"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"bc6a46b3-9d1d-4b98-b005-0532b342da21","type":"BoxAnnotation"},{"attributes":{"overlay":{"id":"bc6a46b3-9d1d-4b98-b005-0532b342da21","type":"BoxAnnotation"},"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"}},"id":"fc1b8ecc-62f6-404f-be2f-4ad982f653a0","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"}},"id":"687f92e8-f7de-4f4c-939a-b784a4fdcb95","type":"WheelZoomTool"},{"attributes":{"level":"glyph","plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"},"source":{"id":"fcf60b74-f845-4a4a-a0ef-35f440bef39f","type":"ColumnDataSource"},"text":{"field":"label"},"text_align":"right","text_font_size":{"value":"10px"},"text_font_style":"bold","x":{"field":"x"},"x_offset":{"value":-10},"y":{"field":"y"}},"id":"af0fdaca-1b21-486b-9867-2ad19b8fd2bb","type":"LabelSet"},{"attributes":{"label":{"value":"Product/Programmin Language"},"renderers":[{"id":"c2285094-9fbd-464a-9e9b-5e8d9cac9452","type":"GlyphRenderer"}]},"id":"f5812c55-6cdf-4597-8a38-603b5df0c463","type":"LegendItem"},{"attributes":{"data_source":{"id":"c807bd02-16eb-4875-9981-b99bdee25315","type":"ColumnDataSource"},"glyph":{"id":"a224df1f-678b-4d28-85fa-1d93ab188037","type":"Quad"},"hover_glyph":null,"nonselection_glyph":{"id":"b9915731-67d2-4d34-ab8d-3532367e8317","type":"Quad"},"selection_glyph":null},"id":"0e8b64ac-2b0c-48ab-97d8-d77d96e404df","type":"GlyphRenderer"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"333dec19-4630-4320-b772-05edfc8960c9","type":"LinearAxis"}],"border_fill_color":{"value":null},"left":[{"id":"a92ef4db-8d2d-4a4f-8d46-145517f289f1","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":400,"plot_width":300,"renderers":[{"id":"333dec19-4630-4320-b772-05edfc8960c9","type":"LinearAxis"},{"id":"c736a8c5-6b70-4422-936e-53ba8ac4ca2f","type":"Grid"},{"id":"a92ef4db-8d2d-4a4f-8d46-145517f289f1","type":"LinearAxis"},{"id":"3d80c88e-1023-4752-8b47-300391d16d38","type":"Grid"},{"id":"bc6a46b3-9d1d-4b98-b005-0532b342da21","type":"BoxAnnotation"},{"id":"d98f1476-9962-44ff-b42e-20e8bb373d1f","type":"Legend"},{"id":"326d2c95-9450-4945-9c9e-416ee99903ac","type":"GlyphRenderer"},{"id":"c2285094-9fbd-464a-9e9b-5e8d9cac9452","type":"GlyphRenderer"},{"id":"0e8b64ac-2b0c-48ab-97d8-d77d96e404df","type":"GlyphRenderer"},{"id":"af0fdaca-1b21-486b-9867-2ad19b8fd2bb","type":"LabelSet"}],"sizing_mode":"scale_width","title":{"id":"dfa177a0-5ab9-4d67-bc17-9df39a6e4736","type":"Title"},"tool_events":{"id":"3a61105a-acae-4c8a-9c3d-8905fb872946","type":"ToolEvents"},"toolbar":{"id":"2c31ef6f-3310-42dd-be86-0f1fa5704620","type":"Toolbar"},"toolbar_location":null,"x_range":{"id":"5bc889ba-25d4-4f14-a3bb-297725b019f6","type":"Range1d"},"y_range":{"id":"d2a61799-65b6-4f3b-bebf-ba6cfd43b266","type":"Range1d"}},"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"7a714a95-997d-4332-94e4-a077da33b514","type":"PanTool"},{"id":"687f92e8-f7de-4f4c-939a-b784a4fdcb95","type":"WheelZoomTool"},{"id":"fc1b8ecc-62f6-404f-be2f-4ad982f653a0","type":"BoxZoomTool"},{"id":"bd8e7713-a1b8-446f-97fd-e77ec9dd5229","type":"SaveTool"},{"id":"0da5fc01-cfec-4649-b902-be2bc380f9d9","type":"ResetTool"},{"id":"3eed9bb4-b948-4f80-bd04-d72c0e1ab47b","type":"HelpTool"}]},"id":"2c31ef6f-3310-42dd-be86-0f1fa5704620","type":"Toolbar"},{"attributes":{"bottom":{"field":"bottom"},"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"left":{"field":"left"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"right"},"top":{"field":"top"}},"id":"d32e9122-9c62-4928-9d16-46551224de06","type":"Quad"},{"attributes":{"formatter":{"id":"7e56c244-a75c-4c75-8484-04b236f938bc","type":"BasicTickFormatter"},"plot":{"id":"0d74b85a-0020-4168-a931-61c7f7f4fa13","subtype":"Figure","type":"Plot"},"ticker":{"id":"736b902c-ed15-4829-be86-dc9e5b2834b3","type":"BasicTicker"},"visible":false},"id":"333dec19-4630-4320-b772-05edfc8960c9","type":"LinearAxis"},{"attributes":{"callback":null,"column_names":["right","bottom","top","left","line_color","fill_color"],"data":{"bottom":[10.1,10.1,10.1,10.1,11.1,11.1,11.1,11.1,12.1,12.1,12.1,12.1,13.1,13.1,13.1,13.1,14.1,14.1,14.1,14.1,15.1,15.1,15.1,15.1,16.1,16.1,16.1,16.1,17.1,17.1,17.1,17.1,18.1,18.1,18.1,18.1],"fill_color":["#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#ffffff","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#ffffff","#ffffff","#e5e5ff","#acacdf","#ffffff","#ffffff","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#ffffff"],"left":[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],"line_color":["#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#ffffff","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#ffffff","#ffffff","#e5e5ff","#acacdf","#ffffff","#ffffff","#e5e5ff","#acacdf","#7272bf","#39399f","#e5e5ff","#acacdf","#7272bf","#ffffff"],"right":[0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9],"top":[11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19]}},"id":"44f065a1-3e42-43fd-a3e3-d6d767102f8f","type":"ColumnDataSource"},{"attributes":{"data_source":{"id":"0bd08e13-ef78-4dbb-ab9e-71ae8a210f8a","type":"ColumnDataSource"},"glyph":{"id":"456ae8ee-e1d8-410e-a040-84761a2202a9","type":"Quad"},"hover_glyph":null,"nonselection_glyph":{"id":"d32e9122-9c62-4928-9d16-46551224de06","type":"Quad"},"selection_glyph":null},"id":"326d2c95-9450-4945-9c9e-416ee99903ac","type":"GlyphRenderer"},{"attributes":{"callback":null,"end":27,"start":-1},"id":"d2a61799-65b6-4f3b-bebf-ba6cfd43b266","type":"Range1d"},{"attributes":{},"id":"736b902c-ed15-4829-be86-dc9e5b2834b3","type":"BasicTicker"}],"root_ids":["0d74b85a-0020-4168-a931-61c7f7f4fa13"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"f7cb3abe-d252-4fe4-9083-d6fd78f9bbb3","elementid":"99012865-2ca4-4079-b41e-c7da81856a92","modelid":"0d74b85a-0020-4168-a931-61c7f7f4fa13"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("99012865-2ca4-4079-b41e-c7da81856a92")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
sbjt_fig = figure(plot_width=200
             , plot_height=400
             , x_range=[-4,5]
             , y_range=[19,len(sbjt_comp['y'])+19]
             , **opt
             )

sbjt_fig.quad(top=sbjt_dat['top']
         , bottom=sbjt_dat['bottom']
         , left=sbjt_dat['left']
         , right=sbjt_dat['right']
         , color=sbjt_dat['color']
         #, legend="Subject Area"
             )

sbjt_label = LabelSet (x='x',y='y',text='sbjt', level='glyph',
                    x_offset=-10, y_offset=0
                  , render_mode='canvas'
                  , angle=0
                  , angle_units="deg"
                  , text_font_size="14px"
                  , text_align = "right"
                  , text_font_style = "bold"
                  , source=ColumnDataSource(data=sbjt_comp)
)

sbjt_fig.add_layout(sbjt_label)
sbjt_fig.xaxis.visible = False
sbjt_fig.yaxis.visible = False
sbjt_fig.grid.visible = False

show(sbjt_fig)
```




    <div class="bk-root">
        <div class="bk-plotdiv" id="c44dfefd-de29-4052-b022-ff8caf193e02"></div>
    </div>
<script type="text/javascript">
  
  (function(global) {
    function now() {
      return new Date();
    }
  
    var force = false;
  
    if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
      window._bokeh_onload_callbacks = [];
      window._bokeh_is_loading = undefined;
    }
  
  
    
    if (typeof (window._bokeh_timeout) === "undefined" || force === true) {
      window._bokeh_timeout = Date.now() + 0;
      window._bokeh_failed_load = false;
    }
  
    var NB_LOAD_WARNING = {'data': {'text/html':
       "<div style='background-color: #fdd'>\n"+
       "<p>\n"+
       "BokehJS does not appear to have successfully loaded. If loading BokehJS from CDN, this \n"+
       "may be due to a slow or bad network connection. Possible fixes:\n"+
       "</p>\n"+
       "<ul>\n"+
       "<li>re-rerun `output_notebook()` to attempt to load from CDN again, or</li>\n"+
       "<li>use INLINE resources instead, as so:</li>\n"+
       "</ul>\n"+
       "<code>\n"+
       "from bokeh.resources import INLINE\n"+
       "output_notebook(resources=INLINE)\n"+
       "</code>\n"+
       "</div>"}};
  
    function display_loaded() {
      if (window.Bokeh !== undefined) {
        document.getElementById("c44dfefd-de29-4052-b022-ff8caf193e02").textContent = "BokehJS successfully loaded.";
      } else if (Date.now() < window._bokeh_timeout) {
        setTimeout(display_loaded, 100)
      }
    }
  
    function run_callbacks() {
      window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
      delete window._bokeh_onload_callbacks
      console.info("Bokeh: all callbacks have finished");
    }
  
    function load_libs(js_urls, callback) {
      window._bokeh_onload_callbacks.push(callback);
      if (window._bokeh_is_loading > 0) {
        console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
        return null;
      }
      if (js_urls == null || js_urls.length === 0) {
        run_callbacks();
        return null;
      }
      console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
      window._bokeh_is_loading = js_urls.length;
      for (var i = 0; i < js_urls.length; i++) {
        var url = js_urls[i];
        var s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          window._bokeh_is_loading--;
          if (window._bokeh_is_loading === 0) {
            console.log("Bokeh: all BokehJS libraries loaded");
            run_callbacks()
          }
        };
        s.onerror = function() {
          console.warn("failed to load library " + url);
        };
        console.log("Bokeh: injecting script tag for BokehJS library: ", url);
        document.getElementsByTagName("head")[0].appendChild(s);
      }
    };var element = document.getElementById("c44dfefd-de29-4052-b022-ff8caf193e02");
    if (element == null) {
      console.log("Bokeh: ERROR: autoload.js configured with elementid 'c44dfefd-de29-4052-b022-ff8caf193e02' but no matching script tag was found. ")
      return false;
    }
  
    var js_urls = [];
  
    var inline_js = [
      function(Bokeh) {
        (function() {
          var fn = function() {
            var docs_json = {"d4feeacf-7794-44f3-8585-78988975e974":{"roots":{"references":[{"attributes":{"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"}},"id":"7b48288c-4aa7-4942-89c0-a3a7593d5c75","type":"WheelZoomTool"},{"attributes":{"callback":null,"column_names":["left","right","bottom","top","line_color","fill_color"],"data":{"bottom":[19.1,19.1,19.1,19.1,20.1,20.1,20.1,20.1,21.1,21.1,21.1,21.1,22.1,22.1,22.1,22.1,23.1,23.1,23.1,23.1,24.1,24.1,24.1,24.1,25.1,25.1,25.1,25.1],"fill_color":["#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266"],"left":[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],"line_color":["#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#ffffff","#ffffff","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266","#ddf2f3","#aadfd3","#65c2a3","#37a266"],"right":[0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9,0.9,1.9,2.9,3.9],"top":[20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,25,26,26,26,26]}},"id":"45b567e5-3078-4055-88eb-6bfde48396a5","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"}},"id":"149453ff-08d0-46ae-b838-34131e0c34c8","type":"PanTool"},{"attributes":{"callback":null,"end":26,"start":19},"id":"91c99d5e-52fc-4c5e-b24f-15aa44960fef","type":"Range1d"},{"attributes":{"data_source":{"id":"45b567e5-3078-4055-88eb-6bfde48396a5","type":"ColumnDataSource"},"glyph":{"id":"19731946-cf1b-441b-9d7c-2bd167ecb3a2","type":"Quad"},"hover_glyph":null,"nonselection_glyph":{"id":"faf9e581-4c37-423f-af5e-9330545dcf79","type":"Quad"},"selection_glyph":null},"id":"b3ea67e9-c75b-4687-be2f-e4708261048f","type":"GlyphRenderer"},{"attributes":{},"id":"2c4c3717-c032-4fcc-bfa8-a0b9b409b8e8","type":"BasicTickFormatter"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"149453ff-08d0-46ae-b838-34131e0c34c8","type":"PanTool"},{"id":"7b48288c-4aa7-4942-89c0-a3a7593d5c75","type":"WheelZoomTool"},{"id":"f46f9ae8-9fd9-4623-936b-74c27855dcff","type":"BoxZoomTool"},{"id":"23a8ac20-44d6-4b5b-92ad-cd0dc9f0911b","type":"SaveTool"},{"id":"65171ca3-9b9f-4f34-834c-8ebdf7c0c459","type":"ResetTool"},{"id":"6f42c64b-8e91-42c9-bb24-5073b8f24a02","type":"HelpTool"}]},"id":"6f75d4eb-dc16-4e2e-80db-10d809dace2e","type":"Toolbar"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"548c0ec7-547e-4bde-9679-744286da06f6","type":"LinearAxis"}],"border_fill_color":{"value":null},"left":[{"id":"09eb7448-e1e8-45d1-8c8e-1791b4e82bff","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":400,"plot_width":200,"renderers":[{"id":"548c0ec7-547e-4bde-9679-744286da06f6","type":"LinearAxis"},{"id":"98b38380-d671-40d7-9c08-2d1bdd765c79","type":"Grid"},{"id":"09eb7448-e1e8-45d1-8c8e-1791b4e82bff","type":"LinearAxis"},{"id":"243fb544-965f-452d-b0d1-b032954cac4e","type":"Grid"},{"id":"6e2d3b5b-db87-42f3-accd-324e7927f1aa","type":"BoxAnnotation"},{"id":"b3ea67e9-c75b-4687-be2f-e4708261048f","type":"GlyphRenderer"},{"id":"c40c95d7-243f-43b7-ab2d-4debda023257","type":"LabelSet"}],"sizing_mode":"scale_width","title":{"id":"9ed30af8-5d53-4498-96e6-4aff245e371a","type":"Title"},"tool_events":{"id":"1cc5cfe2-7010-4ac4-be6e-a67010863477","type":"ToolEvents"},"toolbar":{"id":"6f75d4eb-dc16-4e2e-80db-10d809dace2e","type":"Toolbar"},"toolbar_location":null,"x_range":{"id":"b0440d35-18bd-4f82-8f70-77a7bf4464f9","type":"Range1d"},"y_range":{"id":"91c99d5e-52fc-4c5e-b24f-15aa44960fef","type":"Range1d"}},"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"},{"attributes":{"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"},"ticker":{"id":"7d3b5165-95fd-4c28-b481-53d596ee6a1f","type":"BasicTicker"},"visible":false},"id":"98b38380-d671-40d7-9c08-2d1bdd765c79","type":"Grid"},{"attributes":{},"id":"1cc5cfe2-7010-4ac4-be6e-a67010863477","type":"ToolEvents"},{"attributes":{"dimension":1,"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"},"ticker":{"id":"00c77184-287d-41b4-80d1-c1f4962a9c54","type":"BasicTicker"},"visible":false},"id":"243fb544-965f-452d-b0d1-b032954cac4e","type":"Grid"},{"attributes":{},"id":"7d3b5165-95fd-4c28-b481-53d596ee6a1f","type":"BasicTicker"},{"attributes":{"bottom":{"field":"bottom"},"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"left":{"field":"left"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"right"},"top":{"field":"top"}},"id":"faf9e581-4c37-423f-af5e-9330545dcf79","type":"Quad"},{"attributes":{"callback":null,"column_names":["comp","sbjt","y","x"],"data":{"comp":[4,2,2,4,4,4,4],"sbjt":["Telco","Data Science","Visualization","Business Intelligence","Testing","Project Management","Development Methodology"],"x":[0,0,0,0,0,0,0],"y":[19.2,20.2,21.2,22.2,23.2,24.2,25.2]}},"id":"65a143d7-5b61-4da0-8849-28ae592fcf32","type":"ColumnDataSource"},{"attributes":{"bottom":{"field":"bottom"},"fill_color":{"field":"fill_color"},"left":{"field":"left"},"line_color":{"field":"line_color"},"right":{"field":"right"},"top":{"field":"top"}},"id":"19731946-cf1b-441b-9d7c-2bd167ecb3a2","type":"Quad"},{"attributes":{"level":"glyph","plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"},"source":{"id":"65a143d7-5b61-4da0-8849-28ae592fcf32","type":"ColumnDataSource"},"text":{"field":"sbjt"},"text_align":"right","text_font_size":{"value":"14px"},"text_font_style":"bold","x":{"field":"x"},"x_offset":{"value":-10},"y":{"field":"y"}},"id":"c40c95d7-243f-43b7-ab2d-4debda023257","type":"LabelSet"},{"attributes":{"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"}},"id":"23a8ac20-44d6-4b5b-92ad-cd0dc9f0911b","type":"SaveTool"},{"attributes":{"formatter":{"id":"21978752-0709-433a-a428-784e7b809fe6","type":"BasicTickFormatter"},"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"},"ticker":{"id":"7d3b5165-95fd-4c28-b481-53d596ee6a1f","type":"BasicTicker"},"visible":false},"id":"548c0ec7-547e-4bde-9679-744286da06f6","type":"LinearAxis"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"6e2d3b5b-db87-42f3-accd-324e7927f1aa","type":"BoxAnnotation"},{"attributes":{"formatter":{"id":"2c4c3717-c032-4fcc-bfa8-a0b9b409b8e8","type":"BasicTickFormatter"},"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"},"ticker":{"id":"00c77184-287d-41b4-80d1-c1f4962a9c54","type":"BasicTicker"},"visible":false},"id":"09eb7448-e1e8-45d1-8c8e-1791b4e82bff","type":"LinearAxis"},{"attributes":{"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"}},"id":"6f42c64b-8e91-42c9-bb24-5073b8f24a02","type":"HelpTool"},{"attributes":{},"id":"21978752-0709-433a-a428-784e7b809fe6","type":"BasicTickFormatter"},{"attributes":{"overlay":{"id":"6e2d3b5b-db87-42f3-accd-324e7927f1aa","type":"BoxAnnotation"},"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"}},"id":"f46f9ae8-9fd9-4623-936b-74c27855dcff","type":"BoxZoomTool"},{"attributes":{},"id":"00c77184-287d-41b4-80d1-c1f4962a9c54","type":"BasicTicker"},{"attributes":{"callback":null,"end":5,"start":-4},"id":"b0440d35-18bd-4f82-8f70-77a7bf4464f9","type":"Range1d"},{"attributes":{"plot":{"id":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd","subtype":"Figure","type":"Plot"}},"id":"65171ca3-9b9f-4f34-834c-8ebdf7c0c459","type":"ResetTool"},{"attributes":{"plot":null,"text":""},"id":"9ed30af8-5d53-4498-96e6-4aff245e371a","type":"Title"}],"root_ids":["5c91187e-ab2f-473b-923d-4d56a3ea9dcd"]},"title":"Bokeh Application","version":"0.12.4"}};
            var render_items = [{"docid":"d4feeacf-7794-44f3-8585-78988975e974","elementid":"c44dfefd-de29-4052-b022-ff8caf193e02","modelid":"5c91187e-ab2f-473b-923d-4d56a3ea9dcd"}];
            
            Bokeh.embed.embed_items(docs_json, render_items);
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
      },
      function(Bokeh) {
      }
    ];
  
    function run_inline_js() {
      
      if ((window.Bokeh !== undefined) || (force === true)) {
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }if (force === true) {
          display_loaded();
        }} else if (Date.now() < window._bokeh_timeout) {
        setTimeout(run_inline_js, 100);
      } else if (!window._bokeh_failed_load) {
        console.log("Bokeh: BokehJS failed to load within specified timeout.");
        window._bokeh_failed_load = true;
      } else if (force !== true) {
        var cell = $(document.getElementById("c44dfefd-de29-4052-b022-ff8caf193e02")).parents('.cell').data().cell;
        cell.output_area.append_execute_result(NB_LOAD_WARNING)
      }
  
    }
  
    if (window._bokeh_is_loading === 0) {
      console.log("Bokeh: BokehJS loaded, going straight to plotting");
      run_inline_js();
    } else {
      load_libs(js_urls, function() {
        console.log("Bokeh: BokehJS plotting callback run at", now());
        run_inline_js();
      });
    }
  }(this));
</script>



```python
write_plot_js(fig,"comp_metrics")

```


```python
i
```




    [0.5, 1.5, 2.5, 3.5, 4.5, 5.5]




```python
tech_comp
```




    {'level': (4, 2, 3, 3, 4, 4),
     'tech': ('ab-initio', 'java', 'oracle', 'python', 'linux', 'bash'),
     'x': [0, 0, 0, 0, 0, 0],
     'y': [0.5, 1.5, 2.5, 3.5, 4.5, 5.5]}


