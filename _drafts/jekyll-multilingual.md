---
title: Build a multilingual website with jekyll
img: 1
i18n-link: multilingual
---

Some would think that, because Jekyll is a static website generator, it is impossible to handle internationalization. Nothing is more than wrong!


In fact, it might not be as easy as using a PHP-based framework like Wordpress. But after using some magic, you will be able to serve your posts and pages in as many languages you need to! Because this problem is well known, you can find other methods in [stackoverflow](https://stackoverflow.com) or other webdev-oriented blogs. The method I will explain you in this post is based on *folders*.

## A story of folders

Before starting to speak about translation I think it would be great to explain how Jekyll manage folders inside your project. As detailed in the [Jekyll's documentation](http://jekyllrb.com/docs/structure/), there is two kind of folders/files.

### Parsed folders/files

First, those which will be parsed by Jekyll and then rendered. These ones always start with a `_` (eg. `_posts`, `_layouts`, `_includes`, `_config.yml`). 