function toggleBurger() {
	var el = document.getElementById('main-menu');
	var elBurger = document.getElementById('burger-green');
	var elOverlay = document.getElementById('overlay');

	var cls = el.classList;

	if (!cls.contains('toggled')) {
		cls.add('toggled');
		elOverlay.classList.add('active');
		elBurger.classList.remove('green');
	}
	else {
		cls.remove('toggled');
		elOverlay.classList.remove('active');
		elBurger.classList.add('green');
	}

	return false;
}

function generateAnchors() {
	var post = document.getElementById('post');

	if (post) {
		var headers = post.querySelectorAll('h1, h2, h3, h4, h5, h6');
		for (header of headers) {
			var anchor = document.createElement('a');
			anchor.href = "#" + header.id;
			anchor.innerHTML = '<i class="fa fa-anchor post-anchor"></i>';

			header.appendChild(anchor);
		}
	}
}

// Sharing
function shareFB(link) {
	FB.ui({
	  method: 'share',
	  href: encodeURI(link),
	}, function(response){});
}

function shareTwitter(link, title) {
	var url = 'https://twitter.com/intent/tweet?';
	url += 'url=' + encodeURI(link);
	url += '&via=chocanto';
	url += '&text=' + title;
	window.open(url, '', "height=420,width=550");
}

function shareGp(link) {
	var url = 'https://plus.google.com/share?url=' + encodeURI(link);
	window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
}

// Sharing count
function displayShareCount() {
	getFbCounts();
}

function getFbCounts() {
	FB.api(
    "/",
    {
        "id": encodeURI(document.location),
        "fields" : "share"
    },
    function (response) {
    	if (response && !response.error) {
        	var count = response.share.share_count;
        	if (count > 0) {
        		document.getElementById('share-count-fb').innerHTML = count;
        	}
      	}
    }
);
}

window.onload = function() {
	generateAnchors();
	displayShareCount();
}