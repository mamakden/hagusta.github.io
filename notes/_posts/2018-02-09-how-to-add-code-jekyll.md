---
layout: post
title: How to add code Jekyll   
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