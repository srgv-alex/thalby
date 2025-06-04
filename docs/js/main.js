let mobileNavButton = document.querySelector('.mobile-nav-btn');
let mobileNavIcon = document.querySelector('.mobile-nav-btn__icon');
let overlay = document.querySelector('.mobile-nav-overlay');
let mobileNav = document.querySelector('.mobile-nav__panel');

mobileNavButton.addEventListener('click', function () {
	mobileNavIcon.classList.toggle('active');
	overlay.classList.toggle('visible');
	mobileNav.classList.toggle('visible');
	document.body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', function () {
	turnoffMobile();
});

mobileNav.querySelectorAll('a').forEach(function (link) {
	link.addEventListener('click', function () {
		turnoffMobile();
	});
});

function turnoffMobile() {
	if (mobileNavIcon.classList.contains('active')) {
		mobileNavIcon.classList.remove('active');
	}
	if (overlay.classList.contains('visible')) {
		overlay.classList.remove('visible');
	}
	if (mobileNav.classList.contains('visible')) {
		mobileNav.classList.remove('visible');
	}

	if (document.body.classList.contains('no-scroll')) {
		document.body.classList.remove('no-scroll');
	}
}
