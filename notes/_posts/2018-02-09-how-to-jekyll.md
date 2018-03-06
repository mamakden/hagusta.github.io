---
layout: post
title: Jekyll How To
description: Notes on how to add code to Jekyll
categories: notes, jekyll
---

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