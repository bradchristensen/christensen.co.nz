import "./index.scss";

import smoothScroll from "smooth-scroll";

import "./polyfills";
import "./analytics";

smoothScroll.init();

const mapListItems = document.getElementById("map").children;
const slides = document.getElementsByClassName("slide");
window.addEventListener("scroll", () => {
  let currentSlide = -1;
  Array.prototype.forEach.call(slides, (slide, i) => {
    const { bottom } = slide.getBoundingClientRect();

    if (currentSlide < 0 && bottom > window.innerHeight / 2) {
      currentSlide = i;
    }
  });

  if (currentSlide >= 0) {
    Array.prototype.forEach.call(mapListItems, (li) => {
      li.classList.remove("current");
    });
    mapListItems[currentSlide].classList.add("current");
  }
});

// Connect to the reverse-proxied Duolingo API, without running into CORS issues.
fetch("/.netlify/functions/duolingo")
  .then((response) => response.json())
  .then(({ streak }) => {
    // parseInt to eliminate any potential for Duolingo to inadvertently XSS me
    const streakNumDays = parseInt(streak, 10) || 0;
    const duolingoParaStatic = document.getElementById("duolingo-para-static");

    const howBonkersIsThat =
      streakNumDays > 50 ? "That's bonkers!" : "It's not getting any easier.";

    const daysText = streakNumDays + (streakNumDays === 1 ? " day" : " days");

    const duoLink =
      '<a href="https://www.duolingo.com/bradchristensen">Duolingo streak</a>';
    const html =
      streakNumDays === 0
        ? // Hopefully this is never the case...
          `<p>I've lost my ${duoLink}. I am a disappointment to my family.</p>`
        : `
            <p>
                My current Duolingo streak is
                <strong><a href="https://www.duolingo.com/bradchristensen">${daysText}</a></strong>.
                <nobr>${howBonkersIsThat}</nobr>
            </p>
        `;

    duolingoParaStatic.insertAdjacentHTML("afterend", html);
    document.getElementById("duolingo-uphill-battle").innerHTML = "";
  });
