---
title: Build a multilingual website with jekyll
img: 2
i18n-link: multilingual
---

Some would think that, because Jekyll is a static website generator, it is impossible to handle internationalization. Nothing is more than wrong!


In fact, it might not be as easy as using a PHP-based framework like Wordpress. But after using some magic, you will be able to serve your posts and pages in as many languages as you need to! Because this problem is well known, you can find other methods in [stackoverflow](https://stackoverflow.com) or other webdev-oriented blogs. The method I will explain you in this post is based on *folders*.

## A story of folders

Before starting to speak about translation, it would be great to explain how Jekyll manage folders inside your project. As detailed in the [Jekyll's documentation](http://jekyllrb.com/docs/structure/), there is two kind of folders/files.

### Parsed folders/files

First, those which will be parsed by Jekyll and then, for some, rendered. They always start with a `_` (eg. `_posts`, `_layouts`, `_includes`, `_config.yml`). You will not see them in the URL as Jekyll do not expose them directly. You can see them as ingredients used to make a cake, most of the time you will not see them but the cake.

### Exposed folders/files

We earlier saw folders and files starting with `_`. Well, every other resources not starting by this character will be simply copied by Jekyll inside your final site. It might be stylesheet, fonts, images, xml, etc. But what if we put a parsed resources inside a simple folder ? The resource (a markdown flavored file for example) will be rendered inside your recently created folder. You can then access to a post or a page by looking at it's url (eg. `/my-cool-folder/2016/03/02/my-post.html` is a post inside *my-cool-folder*).

It is a very interesting feature for internationalization...

## Build a generic international website

Translating your site to a different language than your maternal one might be something you should think about very early in your developpement. If you site is well prepared for it, translating your pages will be as simple as creating one file by language containing your translated resources. Your layout stay the same, only included strings will depend of the choosen language.

In a server-side rendered website, it is the work of your hidden logic to build views. I can take the example of [Symfony](https://symfony.com/) who use [twig engine](http://twig.sensiolabs.org/) to render views. All you have to do is write your layouts, indiquate where your translated assets will be put, populate configurations files with your different assets then watch the magic appening !

But how does the server know that your visitor speak one specific language ?

First, they can read the ACCEPT_LANGUAGE http header. When defined, it should indiquate what is the primary language of the visitor. But what if your visitor want to read your website with an another language than it's primary one ? You have to let him select the language in which your content will be displayed by using a `<select>` block for example. But wait, then your visitor will have to select his language for every page of your website ? That is not something you might want to make him do (or you don't really want to keep your readers, but that's another subject...). You will then have to make use of those (not really delicious) cookies.

You can also decide to make use of your URL, like this blog. Yup, french version of every post is available via the `/fr/` prefix. Other websites create a new (virtual most of the time) subdomain per language so you can just go to : `lang.my-site.com`.

Aaaand, that's all. But it only work when you have something running behind your client. And it is not the case with Jekyll, everything is static. How can we acheive this feat ?

## Multilingual website, the Jekyll way

More or less, the Chocanto way. You can find a lot of great methods all over the Internet, but here I am going to show you how to combine everything we talked about earlier : **folders** and **URL**.
Those two combined make a very efficient way to show to your visitor a page in his selected language without you having a headache (in fact... you can also have headache with this method, but I will not be responsible !).

### The structure

Our project will look like this :

~~~
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
~~~

I will here take the example of a french traslated website (what a surprise !).

Like you can see, this structure is the exact same structure as the one you already know ([a basic jekyll structure](https://jekyllrb.com/docs/structure/)) but with a new folder : `fr`. Our new folder, named with your [language identifier](http://www.i18nguy.com/unicode/language-identifiers.html) contain all your translatables files (all your posts, pages, drafts and other index.md). You can even translate, as you can see above, your post name (it might be something very important for SEO stuff). So, every time you write a new post or page, juste create a new file in your `fr/` (or whatever you named it) with the same path, and create the folders containing this file if they does not already exists (duh).

### Front matter, matters

It is what makes Jekyll really cool, and also what makes this method functionnal ! For every post or page we make we will create a unique identifier. This identifier will be used later to link our pages together so we will be able to find a translated version of the current page. I named it `i18n-link` because... why not ?

So your post should look like this : `_posts/my-translated-post.md`

~~~ yaml
---
title: My translated post !
i18n-link: translated-post
---

Hey ! This is a pretty cool translated post !
~~~

And your translated post : `fr/_posts/mon-billet-traduit.md`

~~~ yaml
---
title: Mon billet traduit !
i18n-link: translated-post
---

Hey ! Ça c'est du post traduit ou je m'y connais pas !
~~~

Easy right ? For your next post what you just have to do is replacing your *i18n-link* by a unique new one.

Your translation is now fully functionnal. Yup, really ! If you want to access your translated post what you just have to do is add a `/fr/` prefix to your URL ! But you will not want to ask your visitors to do it right ? Wouldn't it be cool to generate language buttons to access translated versions of your posts ?

### Add language selection

Here we go, translating post is cool. Accessing translated post via URL is also cool. But automatically display available translations for a page and create links is cooler !

So let's just prepare our code for the moment : 

{% raw %}
~~~ html
<div class="lang">
  <ul>
    <li>FR</li>
    <li>EN</li>
    <li>CH</li>
  </ul>
</div>
~~~
{% endraw %}

Ok, this is roughly what we want to generate : a list of our available languages. Each language will link to one of our translated post. Something like `/{lang}/my-cool-post`.

Our url is automaticaly generated and provided by Jekyll with the `url` attribute of a post. Like this :

{% raw %}
~~~ html
<div class="lang">
  <ul>
    <li><a class="FR" href="{{ site.base-url }}{{ postFR.url }}">FR</a></li>
    <li><a class="EN" href="{{ site.base-url }}{{ postEN.url }}">EN</a></li>
    <li><a class="CH" href="{{ site.base-url }}{{ postCH.url }}">CH</a></li>
  </ul>
</div>
~~~
{% endraw %}

`site.base-url` is the base url of our website. For example if the root of our website is located in a folder, we would place the folder path in this [liquid](https://shopify.github.io/liquid/) variable.

So now we have our URL for each translation of our post. But it would cool (if not mandatory) to let jekyll find himself the translations available for our post.
Let's say you didn't translated your post in chinese, would you like to let a broken link in your menu ? I hope that you answered no.

What we will have to do is find all translations that are from the same post. To do so we will have to use our `i18n-link` variable defined earlier. It will make it easy to link our translations together.

{% raw %}
~~~ liquid
{% assign posts=site.posts | where:"i18n-link", page.i18n-link | sort: 'lang' %}
~~~
{% endraw %}

`site.posts` contains every posts of our jekyll website, so we are just searching for posts where `i18n-link` is equal to the `i18n-link` of our current page. And to be sure that our list language is the same ordered through the pages we sort them.

You can also do it for pages like so :

{% raw %}
~~~ liquid
{% if posts.size == 0 %}
  {% assign posts=site.pages | where:"i18n-link", page.i18n-link | sort: 'lang' %}
{% endif %}
~~~
{% endraw %}

Now let's use our new `posts` variable : 

{% raw %}
~~~ html
<div class="lang">
  <ul>
    {% for post in posts %}
      <li><a class="{{ post.lang }}" href="{{ site.base-url }}{{ post.url }}">{{ post.lang }}</a></li>
    {% endfor %}
  </ul>
</div>
~~~
{% endraw %}

And that's it. It will display a link for every translation found of our current page.

Because I am in a good mood today, here is the complete code :

{% raw %}
~~~ html
{% assign posts=site.posts | where:"i18n-link", page.i18n-link | sort: 'lang' %}

{% if posts.size == 0 %}
  {% assign posts=site.pages | where:"i18n-link", page.i18n-link | sort: 'lang' %}
{% endif %}

<div class="lang">
  <ul>
    {% for post in posts %}
      <li><a class="{{ post.lang }}" href="{{ site.base-url }}{{ post.url }}">{{ post.lang }}</a></li>
    {% endfor %}
  </ul>
</div>
~~~
{% endraw %}

### Jekyll configuration

We have a good folder structure and a nice post translation visualization. Now let's finish our multilingual website by configuring Jekyll.

What we want to do is set our variables depending of the current translation. Because our way to work use folders, we will also use them to detect the language.

~~~ yaml
defaults:
    -
     scope:
         path: ""
     values:
         author: "me"
         layout: myLayout
         lang: en
         base-url: "/"
    -
     scope:
         path: fr
     values:
         lang: fr
         base-url: "/fr/"
    -
     scope:
         path: ch
     values:
         lang: ch
         base-url: "/ch/"
~~~

The `defaults` yaml variable is set by scope. One scope per translation. The default scope here is `en`, where we will define all our default variables for our application. Then we just override them for each scope. Our posts will now get `lang` and `base-url` variables defined depending of our translation.

### Translate layouts

We saw how to translation an entire post. But what if we want to translate our layout ?

You might want to define where part of your layout have to be translated. To do so, we will again use Liquid variables. For example : 

{% raw %}
~~~ liquid
<h1>{{ site.t['title'][page.lang] }}</h1>
~~~
{% endraw %}

We again use our `page.lang` variable to get the current language, and use it as an index for our translation.

Then, we just have to add our `site.t` array to the configuration file and populate it :

~~~ yaml
t:
    title:
        en: "Title"
        fr: "Titre"
    subtitle:
        en: "Subtitle"
        fr: "Sous-titre"
~~~

## Conclusion

You can now easily translate your entire jekyll website. Feel free to personalize the code given in this post for your own needs.

It was a long post, so some errors may have crept. You can propose corrections using the github button at the bottom of this part.

Have fun playing with Jekyll ! :D