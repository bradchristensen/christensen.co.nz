import './analytics';
import smoothScroll from 'smooth-scroll';

smoothScroll.init();

const mapListItems = document.getElementById('map').children;
const slides = document.getElementsByClassName('slide');
window.addEventListener('scroll', () => {
    let currentSlide = -1;
    Array.prototype.forEach.call(slides, (slide, i) => {
        const bottom = slide.getBoundingClientRect().bottom;

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
