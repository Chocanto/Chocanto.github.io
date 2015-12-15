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

window.onload = function() {
	generateAnchors();
}