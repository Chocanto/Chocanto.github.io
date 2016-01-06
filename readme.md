# [Chocanto.me](http://chocanto.me) [![Build Status](https://travis-ci.org/Chocanto/Chocanto.github.io.svg?branch=master)](https://travis-ci.org/Chocanto/Chocanto.github.io)

Hey ! Chocanto.me is my personnal website, but any contribution is welcome !

## Installation

Dependencies :
* [RubyGems](https://rubygems.org/pages/download)
* [jekyll](http://jekyllrb.com/docs/installation/)
* bundle (`gem install bundle`)

Then execute the following commands (for Linux): 

```
git clone git@github.com:Chocanto/Chocanto.github.io.git
cd Chocanto.github.io
bundle exec jekyll serve
```

Open http://127.0.0.1:4000/ in your prefereted navigator, and... It should be working !

## Tests

This website use [html-proofer](https://github.com/gjtorikian/html-proofer) to check if the generated HTML files does not contain errors. Every pull requests will be tested with [travis](https://travis-ci.org/) before being manually reviewed. In fact you must see a green badge in the top of this readme. If not, please start to panic.

To manually test the generated HTML files before commit, execute this command after placing yourself in the root of the project :
```
bundle exec htmlproof --href-ignore /^$/ --only-4xx _site/
```

## Contribution

If you find any errors on this website or maybe just want to improve something, feel free to open an issue. You can also fork this repository and do a pull request with your modifications. I will review any issue or pull request. For questions about why a solution I used doesn't work for you, please inbox me here in GitHub or tweet me [@Chocanto](https://twitter.com/Chocanto).

## License

All texts from pages and posts are under CC BY-SA 3.0. If you want to know more about it, read it on my website http://chocanto.me/fr/about/#licence.

The rest of the source code is under GPLv3 (except stated in the file). For more informations about your rights and your duties, please read the file LICENSE placed on the root of this repository.