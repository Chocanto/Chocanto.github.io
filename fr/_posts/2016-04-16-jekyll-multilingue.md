---
title: Créer un site multilingue avec Jekyll
img: 2
i18n-link: multilingual
---

Certains pourraient penser que, parce que Jekyll est un générateur de site statique, il n'est pas possible de gérer l'internationalisation. Rien n'est plus faux !


En effet, il se peut que cela ne soit pas aussi simple que d'utiliser un framework PHP comme Wordpress par exemple. Mais après avoir utilisé quelques astuces "magiques", vous serez capable de desservir vos posts et/ou vos pages traduitent dans autant de langues que nécessaires ! Parce que ce problème est bien connu, il est possible de trouver bien d'autres méthodes sur [stackoverflow](https://stackoverflow.com) ou d'autres sites orientés dev. La méthode que je souhaite expliquer aujourd'hui est basée sur les *dossiers*.

## Une histoire de dossiers

Avant de commencer à parler traduction, il serait bien d'expliquer rapidement comment Jekyll gère les dossiers à l'intérieur de votre projet. Comme détaillé dans la [documentation de Jekyll](http://jekyllrb.com/docs/structure/), il existe deux types de dossiers/fichiers : 

### Les dossiers/fichiers parsés

Tout d'abord, ceux qui seront parsés par Jekyll puis, pour certains, rendu à l'utilisateur. Ils commencent toujours par un `_` (ex. `_posts`, `_layouts`, `_includes`, `_config.yml`). Ils ne seront pas visibles dans l'URL puisque Jekyll ne les révélera pas directement. On peut les imaginer comme des ingrédients utilisés pour préparer un gâteau. La plupart du temps, ils ne seront pas visibles, au contraire du gâteau (pour les premières minutes à la sortie du four en tout cas...) 

### Les dossiers/fichiers exposés

Nous avons parlé des dossiers et des fichiers commençant par `_`. Bien, toutes les autres ressources, dont le nom ne commence pas par ce caractère, seront tout simplement copiées par Jekyll à l'intérieur de votre site final. Cela peut être les feuilles de style, les polices d'écritures, les images, les fichiers xml, etc. Et que se passe-t-il si on place un fichier parsé (vu au-dessus) à l'intérieur d'un dossier tout simplement exposé ? La ressource (un fichier markdown par exemple) sera rendue à l'intérieur du dossier créé précédemment. Il sera possible d'y accéder via son url (ex. `/wow-such-dossier/2016/03/02/mon-billet.html` est un billet placé à l'intérieur du dossier *wow-such-dossier*).

C'est une fonctionnalité très intéressante pour l'internationalisation d'un site...

## Réaliser un site international générique

Traduire un site vers une langue différente de la langue maternelle du concepteur doit être un élément important à penser tôt dans le développement. Si le site est bien préparé pour cela, traduire des pages deviendra aussi simple que de créer un nouveau fichier par langue, contenant les ressources traduites. Le layout reste le même, seules les chaînes incluses changent d'une langue à l'autre.

Dans un site rendu côté serveur, c'est le travail de la logique de créer les vues. [Symfony](https://symfony.com/) par exemple  utilise le moteur [twig](http://twig.sensiolabs.org/) afin de rendre les vues. Tout ce que vous avez à faire est, d'écrire les layouts, indiquer où placer les ressources traduites puis remplir des fichiers de configuration avec les chaînes afin de voir la magie opérer !

Mais comment le serveur sait qu'un visiteur parle une langue en particulier ?

Tout d'abord, le serveur lit l'entête http ACCEPT_LANGUAGE. Quand cette dernière est définie, elle est sensée indiquer la langue principale du visiteur. Mais que se passe-t'il si le visiteur en question souhaite lire le site dans une autre langue que sa principale ? Il devient nécessaire de le laisser sélectionner la langue voulue en utilisant un bloc `<selct>` par exemple. 

Il est également possible de décider d'utiliser l'URL, comme ce blogue. Yep, la version française de chaque billet est disponible via le prefix `/fr/`. D'autres sites créés un nouveau sous-domaine (virtuel la plupart du temps) par langue. Il suffit alors simplement d'aller sur : `langue.mon-site.com`.

Et, voilà tout. Mais tout ceci ne fonctionne que si une machine tourne derrière le client. Et comme on le sait déjà, ce n'est pas le cas avec Jekyll où tout (ou presque) est statique. Alors... comment réaliser cet exploit ?

## Un site web multilingue "à la Jekyll"

Ou plus ou moins, "à la Chocanto". Comme indiqué en introduction, il est possible de trouver de nombreuses méthodes sur Internet, mais je vous montrerais ici comment combiner tout ce que nous avons vu plus haut : l'usage des **dossiers** et les "URLs".
Ces deux fonctionnalités combinées forment une manière très simple et puissante de montrer à votre visiteur une page dans sa langue sans pour autant vous offrir un mal de crâne digne des plus beaux lendemains de soirée (bon... il est toujours possible d'avoir un mal de crâne après avoir lu cet article... mais je ne peux pas en être tenu responsable !)

### La structure

Notre projet va plus ou moins ressembler à quelque chose comme ça :

~~~
project/
	_drafts/
	_includes/
	_layouts/
	_posts/
    mon-billet-traduit.md
	_site/
	en/
		_posts/
			my-translated-post.md
		index.md
	index.md
~~~

Je prendrai ici l'exemple d'un site traduit en anglais (dingue non ?).

Comme vous pouvez le voir, cette structure est très fortement inspirée de celle que vous connaissez déjà ([une structure Jekyll basique](https://jekyllrb.com/docs/structure/)) mais avec l'ajout d'un dossier : `en`. Notre nouveau dossier, nommé à partir de [l'identifiant de langue](http://www.i18nguy.com/unicode/language-identifiers.html) contient tous les fichiers traduisibles (tous les billets, pages, brouillons et autres index.md). Il est même possible de traduire, comme vu au-dessus, le nom du billet (ce qui peut être très important pour qui s'inquiète de son SEO). Donc, chaque fois qu'un nouveau billet est redigé, il suffit juste de créer un nouveau fichier dans le dossier `en/` (ou autre selon la/les langue(s) choisie(s)) avec le même chemin puis créer le dossier contenant ce fichier s'il n'existe pas déjà (logique implacable).

### Front matter, matters

C'est ce qui rend Jekyll vraiment sympa, et optionnellement ce qui rend cette méthode fonctionnelle... Pour chaque billet ou page rédigé, nous allons créer un identifiant unique. Cet identifiant sera plus tard utilisé pour lier nos pages entre elles afin de pouvoir retrouver les traductions de la page courante. J'ai nommé cette variable `i18n-link` parce-que... bah pourquoi pas tient ?

Donc, au final le fichier devrait ressembler à quelque chose comme ça : `_posts/mon-billet-traduit.md`

~~~ yaml
---
title: Mon billet traduit !
i18n-link: translated-post
---

Hey ! Ça c'est du post traduit ou je m'y connais pas !
~~~

Et la version traduite en question : `fr/_posts/my-translated-post.md`

~~~ yaml
---
title: My translated post !
i18n-link: translated-post
---

Hey ! This is a pretty cool translated post !
~~~

Facile non ? Pour chaque nouveau billet créé, il suffit juste de remplacer la valeur de *i18n-link* par une nouvelle unique.

La traduction fonctionne maintenant parfaitement! Oui oui, vraiment! Si l'on veut avoir accès au billet traduit, il suffit simplement d'ajouter le préfix `/fr/` à notre URL! Mais on ne voudrait pas demander à nos chers visiteurs de le faire à la main n'est-ce pas ? Ce serait vraiment super d'avoir un système qui nous génère automatiquement des boutons avec les liens vers les versions traduites de chaque post !

### Sélectionner sa langue

Du coup, traduire des billets, c'est bien. Pouvoir y accéder à partir d'une URL est tout aussi bien. Mais automatiquement afficher les traductions disponibles pour une page and créer ses liens est encore mieux !

Commençons tout simplement par préparer notre code pour le moment :

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

Ok, c'est à peu près ce que l'on souhaite pouvoir générer : une liste des langues disponibles. Chaque langue pointera sur le bon billet traduit. Quelque chose comme `/{langue}/mon-super-billet`.

Notre URL sera automatiquement générée et mise à disposition par Jekyll à l'aide de l'attribut `url` d'un post. Comme ci-dessous:

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

`site.base-url` correspond à l'url de base de notre site. Par exemple si la racine de notre site se situe dans un dossier, il faudra placer le chemin vers ce dossier dans cette variable de [liquid](https://shopify.github.io/liquid/).

Nous avons maintenant notre URL pour chaque traduction de notre billet. Il serait bien (sinon requis) de laisser Jekyll trouver lui-même les traductions disponibles pour notre billet.
Disons que nous n'avons pas traduit notre billet en chinois (parce que le chinois ce n'est facile). Est-ce que l'on aimerait laisser un lien cassé dans notre menu? J'espère que vous avez répondu non. (sinon vous serez brûlé... vif).

Ce que nous allons faire est de trouver toutes les traductions qui proviennent de la même page. Pour ce faire, nous allons enfin utiliser notre variable joliment nommée `i18n-link`, que nous avons définie plus tôt. Il devient alors facile de lier nos traductions ensemble.

{% raw %}
~~~ liquid
{% assign posts=site.posts | where:"i18n-link", page.i18n-link | sort: 'lang' %}
~~~
{% endraw %}

`site.posts` contient tous les billets de Jekyll. Nous avons donc juste à chercher les posts dont la valeur de `i18n-link` correspond à celle de notre page courante. Il nous faut également être certain que la liste des langues est affichée dans le même ordre pour tous les billets. Pour ce faire, on les trie !

Il est également possible de le faire pour les pages comme ceci :

{% raw %}
~~~ liquid
{% if posts.size == 0 %}
  {% assign posts=site.pages | where:"i18n-link", page.i18n-link | sort: 'lang' %}
{% endif %}
~~~
{% endraw %}

On peut maintenant librement utiliser notre variable `posts`:

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

Et voilà tout. Un lien s'affiche alors par traduction de la page courante.

Et parce que je suis de bonne humeur aujourd'hui voici le code complet :

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

### Configurer Jekyll

Nous avons une bonne structure de fichiers et une super liste de traductions pour notre post. Maintenant finalisons notre site traduisible en configurant Jekyll.

On souhaite définir nos variables de configuration selon la traduction actuelle. Grâce à notre technique d'utiliser les dossiers, nous allons pouvoir utiliser ces derniers pour détecter la langue.

~~~ yaml
defaults:
    -
     scope:
         path: ""
     values:
         author: "moi"
         layout: monLayout
         lang: fr
         base-url: "/"
    -
     scope:
         path: en
     values:
         lang: en
         base-url: "/en/"
    -
     scope:
         path: ch
     values:
         lang: ch
         base-url: "/ch/"
~~~

Les variables yaml par défaut sont définies par portée. Une portée par langue. C'est dans la portée par défaut, ici `en`, que nous définissions toutes nos variables par défaut de notre application. Puis il est juste nécessaire de sucharger ces dernières à l'aide des autres portées. Nos billets obtiendront maintenant leurs variables `lang` et `base-url` correctement définies selon la traduction en cours.

### Traduire les layouts

On a vu comment traduire un billet entièrement. Mais comment faire si nous voulons traduire nos layouts ?

Vous voudriez sûrement indiquer dans quelle partie de votre layout se trouveront les chaînes traduites. Pour ce faire, nous allons à nouveau utiliser les variables Liquid. Par exemple :

{% raw %}
~~~ liquid
<h1>{{ site.t['title'][page.lang] }}</h1>
~~~
{% endraw %}

Encore une fois, nous utilisons notre variable `page.lang` afin d'obtenir la langue sélectionnée par l'utilisateur puis l'utilisons comment index pour notre traduction.

Enfin, il nous suffit d'ajouter un tableau `site.t` à notre fichier de configuration qui contiendra toutes les chaînes traduites à afficher dans les layouts.

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

Vous pouvez maintenant très facilement traduire l'intégralité de votre site Jekyll. Sentez-vous libre de personnaliser les bouts de code de cet article à vos propres besoins.

C'était un article relativement long, et quelques erreurs ont pu passer à travers la moulinette. Vous pouvez, si vous le souhaitez, proposer des corrections à l'aide du bouton GitHub ci-dessous !

Have fun! :D