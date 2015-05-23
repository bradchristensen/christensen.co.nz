require(['vendor/smooth-scroll'], function (smoothScroll) {
	smoothScroll.init();

	var mapListItems = document.getElementById('map').children;
	var slides = document.getElementsByClassName('slide');
	window.addEventListener('scroll', function () {
		var currentSlide = -1;
		Array.prototype.forEach.call(slides, function (slide, i) {
			var bottom = slide.getBoundingClientRect().bottom;

			if (currentSlide < 0 && bottom > window.innerHeight / 2) {
				currentSlide = i;
			}
		});

		if (currentSlide >= 0) {
			Array.prototype.forEach.call(mapListItems, function (li) {
				li.classList.remove('current');
			});
			mapListItems[currentSlide].classList.add('current');
		}
	});
});
