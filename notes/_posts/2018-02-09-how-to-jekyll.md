---
layout: post
title: Jekyll How To
description: Notes on how to add code to Jekyll
categories: notes, jekyll
updated: 2017-11-28
---

## 2018-03-07: Github page does not support jekyll-paginate

Github pages does not support jekyll-pagenate. I don't want to revert back to pagination v1. This note shows how one can work around it. This also work for any jekyll plugin that github pages does not support. 

In the nut shell one has to create static pages in their work area (generate _site) and push it to Github as master

1. got to your work directory and delete _site
> rm -rf _site
2. clone you master to _site
> git clone https://github.com/${username}/${username}.github.io.git --branch master _site
3. build jekyll statis pages
> jekyll build
4. go to _site
> cd _site
> touch .nojekyll
> git add -A
> git commit -m "add some comment"
> git push origin master


### 2018-02-09: adding code to Jekyll

{% highlight js %}
{% raw %} 
{% highlight js %} {% endraw %}
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
{% raw %} 
{% endhighlight %}  {% endraw %}
{% endhighlight %}


### 2018-02-09: adding image to Jekyll

{% highlight js %}
<img class="caption__media" src="{{ site.url }}/assets/img/customer-relationship-pred-1.png" alt="sparse data" title="spase data">
{% endhighlight %}


