import smoothScroll from 'vendor/smooth-scroll';

smoothScroll.init();

var mapListItems = document.getElementById('map').children;
var slides = document.getElementsByClassName('slide');
window.addEventListener('scroll', () => {
	var currentSlide = -1;
	Array.prototype.forEach.call(slides, (slide, i) => {
		var bottom = slide.getBoundingClientRect().bottom;

		if (currentSlide < 0 && bottom > window.innerHeight / 2) {
			currentSlide = i;
		}
	});

	if (currentSlide >= 0) {
		Array.prototype.forEach.call(mapListItems, li => {
			li.classList.remove('current');
		});
		mapListItems[currentSlide].classList.add('current');
	}
});
