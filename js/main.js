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