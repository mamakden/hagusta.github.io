---
layout: home
title: Notes
permalink: /notes/
pagination: 
  enabled: true
  category: notes
  permalink: /:num/
  sort_field: 'title'
  sort_reverse: false
---

<div class="posts">
  {% for post in paginator.posts %}

  <div class="post">
    <h1 class="post-title">
      <a href="{{ site.url }}{{ post.url }}">
        {{ post.title }} 
      </a>
    </h1>

    <span class="post-date">{{ post.date | date_to_string }}</span>

    {{ post.content }}
  </div>

  {% endfor %}
</div>