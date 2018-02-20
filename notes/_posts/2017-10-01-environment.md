---
layout: post
title: Environment  
description: my notebook environment setup
categories: notes, etc
---

Python + tensorflow dev:
1. Install miniconda with "Add anaconda to PATH" 

2. ~/.bash_profile add:
PYTHON_PATH='/cygdrive/c/Users/h_agu/Desktop/machine_learning/Miniconda3:/cygdrive/c/Users/h_agu/Desktop/machine_learning/Miniconda3/Library/mingw-w64/bin:/cygdrive/c/Users/h_agu/Desktop/machine_learning/Miniconda3/Library/usr/bin:/cygdrive/c/Users/h_agu/Desktop/machine_learning/Miniconda3/Library/bin/:/cygdrive/c/Users/h_agu/Desktop/machine_learning/Miniconda3/scripts'

export PATH=$PYTHON_PATH:$PATH
 
3. in cygwin 
	conda create -n tensorflow-gpu python=3.6
	
4. in cygwin
	ln -s 
	activate script add "/C/Users/h_agu/Desktop/machine_learning/Miniconda3/envs" to path which is not a directory in cygwin it should have been "/cygdrive/c".  Soft link /C to /cygwin/c 
	solve this problem by
	> cd /
	> ln -s /cygdrive/c /C
	

4. in cygwin
	. activate tensorflow-gpu

	
5. install :
	> conda install scikit-learn
	> conda install jupyter
	> conda install pandas
	> conda install matplotlib
	> conda install bokeh


6. create jupyter notebook kernel
conda create -n py36-test python=3.6
source activate py36-test
python -m ipykernel install --name py36-test
source deactivate


ruby
1 rvm
cygwin req:
gnupg
requirements_cygwin_libs_install patch autoconf automake bison m4 libtool mingw64-i686-gcc-core mingw64-x86_64-gcc-core zlib-devel 
openssl-devel libcrypt-devel libyaml-devel libyaml0_2 libffi-devel libreadline-devel sqlite3 patch
>gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
>curl -sSL https://get.rvm.io | bash -s stable

Jekyll:
install ruby from cygwin


other:
bokeh
	>conda install bokeh
datashader
	> git clone https://github.com/bokeh/datashader.git
	> cd datashader
	> pip install -e .
rasterio
	install Microsoft Visual C++ 14.0 
	> conda install -c https://conda.anaconda.org/ioos rasterio

node.js
	download node.js
	
ipywidgets
	> conda install -c conda-forge ipywidgets