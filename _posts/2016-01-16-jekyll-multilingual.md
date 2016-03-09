---
title: Build a multilingual website with jekyll
img: 1
i18n-link: multilingual
---

Some would think that, because Jekyll is a static website generator, it is impossible to handle internationalization. Nothing is more than wrong!


In fact, it might not be as easy as using a PHP-based framework like Wordpress. But after using some magic, you will be able to serve your posts and pages in as many languages as you need to! Because this problem is well known, you can find other methods in [stackoverflow](https://stackoverflow.com) or other webdev-oriented blogs. The method I will explain you in this post is based on *folders*.

## A story of folders

Before starting to speak about translation, it would be great to explain how Jekyll manage folders inside your project. As detailed in the [Jekyll's documentation](http://jekyllrb.com/docs/structure/), there is two kind of folders/files.

### Parsed folders/files

First, those which will be parsed by Jekyll and then, for some, rendered. They always start with a `_` (eg. `_posts`, `_layouts`, `_includes`, `_config.yml`). You will not see them in the URL as Jekyll do not expose them directly. You can see them as ingredients used to make a cake, most of the time you will not see them but the cake.

### Exposed folders/files

We later saw folders and files starting with `_`. Well, every other resources not starting by this character will be simply copied by Jekyll inside your final site. It might be stylesheet, fonts, images, xml, etc. But what if we put a parsed resources inside a simple folder ? The folder become a **category** ! You can see a category of a post or a page by looking at it's url (eg. /my-category/2016/03/02/my-post.html is a post inside my-category).

It is a very interesting feature because we can...