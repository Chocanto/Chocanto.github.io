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

We later saw folders and files starting with `_`. Well, every other resources not starting by this character will be simply copied by Jekyll inside your final site. It might be stylesheet, fonts, images, xml, etc. But what if we put a parsed resources inside a simple folder ? The resource (a markdown flavored file for example) will be rendered inside your recently created folder. You can then access to a post or a page by looking at it's url (eg. `/my-cool-folder/2016/03/02/my-post.html` is a post inside *my-cool-folder*).

It is a very interesting feature for internationalization...

## Build a generic international website

Translating your site to a different language than your maternal one might be something you should think about very early in your developpement. If you site is well prepared for it, translating your pages will be as simple as creating one file by language containing your translated resources. Your layout stay the same, only included strings will depend of the choosen language.

In a server-side rendered website, it is the work of your hidden logic to build views. I can take the example of [Symfony](https://symfony.com/) who use [twig](twig.sensiolabs.org/) to render views. All you have to do is write your layouts, indiquate where your translated assets will be put, populate configurations files with your different assets then watch the magic appening !

But how does the server know that your visitor speak one specific language ?

First, they can read the ACCEPT_LANGUAGE http header. When defined, it should indiquate what is the primary language of the visitor. But what if your visitor want to read your website with an another language than it's primary one ? You have to let him select the language in which your content will be displayed by using a `<select>` block for example. But wait, then your visitor will have to select his language for every page of your website ? That is not something you might want to make him do (or you don't really want to keep your readers, but that's another subject...). You will then have to make use of those (not really delicious) cookies.

You can also decide to make use of your URL, like this blog. Yup, french version of every post is available via the `/fr/` prefix. Other websites create a new (virtual most of the time) subdomain per language so you can just go to : `lang.my-site.com`.

Aaaand, that's all. But it only work when you have something running behind your client. And it is not the case with Jekyll, everything is static. How can we acheive this feat ?

## Multilingual website, the Jekyll way

More or less, the Chocanto way. You can find a lot of great methods all over the Internet, but here I am going to show you how to combine everything we talked about earlier : **folders** and **URL**.
Those two combined make a very efficient way to show to your visitor a page in his selected language without you having a headache (in fact... you can also have headache with this method, but I will not be responsible !).

### The structure

Our project will look like this :

```
project/
	_drafts/
	_includes/
	_layouts/
	_posts/
		my-translated-post.md
	_site/
	fr/
		_posts/
			mon-billet-traduit.md
		index.md
	index.md
```

I will here take the example of a french traslated website (what a surprise !).

Like you can see, this structure is the exact same structure as the one you already know ([a basic jejyll structure](https://jekyllrb.com/docs/structure/)) but with a new folder : `fr`. Our new folder, named with your [language identifier](http://www.i18nguy.com/unicode/language-identifiers.html) contain all your translatables files (all your posts, pages, drafts and other index.md). You can even translate, as you can see above, your post name (it might be something very important for SEO stuff). So, every time you write a new post or page, juste create a new file in your `fr/` (or whatever you named it) with the same path, and create the folders containing this file if they does not already exists (duh).

### Front matter, matters

It is what makes Jekyll really cool, and also what makes this method functionnal ! For every post or page we make we will create a unique identifier. This identifier will be used later to link our pages together so we will be able to find a translated version of the current page. I named it `i18n-link` because... why not ?

So your post should look like this : `_posts/my-translated-post.md`

```
---
title: My translated post !
i18n-link: translated-post
---

Hey ! This is a pretty cool translated post !
```

And your translated post : `fr/_posts/mon-billet-traduit.md`

```
---
title: Mon billet traduit !
i18n-link: translated-post
---

Hey ! Ça c'est du post traduit ou je m'y connais pas !
```

Easy right ? For you next post what you just have to do is replacing your i18n-link by a unique new one.

Your translation is now fully functionnal. Yup, really ! If you want to access your translated post what you just have to do is add a `/fr/` prefix to your URL ! But you will not want to ask your visitors to do it right ? Wouldn't it be cool to generate language buttons to access translated versions of your posts ?

### Add language selection

Here we go, translating post is cool. Accessing translated post via URL is also cool. But automatically display available translations for a page and create links is cooler !

So let's just prepare our code for the moment : 

```HTML
<div class="lang">
  <ul>
    {% for post in posts %}
      <li><a class="{{ post.lang }}" href="{{ site.base-url }}{{ post.url }}">{{ post.lang }}</a></li>
    {% endfor %}
  </ul>
</div>
```