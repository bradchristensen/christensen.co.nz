import { useEffect, useState } from "preact/hooks";

import classes from "./App.module.scss";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slides = document.getElementsByClassName("slide");
    window.addEventListener("scroll", () => {
      let next = -1;
      Array.prototype.forEach.call(slides, (slide, i) => {
        const { bottom } = slide.getBoundingClientRect();

        if (next < 0 && bottom > window.innerHeight / 2) {
          next = i;
        }
      });

      setCurrentSlide(next);
    });
  }, []);

  return (
    <>
      <ul class="map">
        <li className={currentSlide === 0 ? "current" : undefined}>
          <a href="#landing">About me</a>
        </li>
        <li className={currentSlide === 1 ? "current" : undefined}>
          <a href="#contact">Contact me</a>
        </li>
        <li class="line">
          <span />
        </li>
      </ul>

      <div class="slide landing" id="landing">
        <div class="cell">
          <div class="wrapper">
            <h2>Kia ora, I&rsquo;m</h2>
            <h1>Brad Christensen</h1>
            <h2>Software engineer &amp; technical leader</h2>

            <h3>A little about me</h3>

            <p>
              I craft pixel-perfect websites and mobile experiences, and I
              create the rock-solid Cloud infrastructure that powers them. I
              love being involved in every aspect of bringing products and
              solutions to life, and empowering teams to do their best work.
            </p>

            <p>
              I am leading development of our mobile and web platforms as{" "}
              <span className={classes.nobr}>
                <strong>Head of Product</strong>
              </span>{" "}
              at{" "}
              <span className={classes.nobr}>
                <a href="https://smoothsensors.io">
                  <strong>Smooth Sensors</strong>
                </a>
              </span>
              , where we monitor indoor environment quality to create healthy
              and comfortable spaces for learning, working and living.
            </p>

            <p>
              My <a href="https://virscient.com/">Virscient</a> colleague and
              ex-flatmate, Richard, and I once competed for the longest Duolingo
              streak in{" "}
              <a href="https://www.youtube.com/watch?v=5Q-qzjM3PWc">Russian</a>.{" "}
              <span className={classes.nobr}>We agreed</span> to call it quits
              after{" "}
              <a href="https://www.duolingo.com/profile/bradchristensen">
                400 days
              </a>
              .
            </p>

            <h3>My background</h3>

            <p>
              Previously I was a <strong>Software Engineering Manager</strong>{" "}
              at{" "}
              <a href="https://www.lic.co.nz">
                <strong>LIC</strong>
              </a>
              , where my team worked on{" "}
              <a href="https://www.lic.co.nz/products-and-services/minda/minda-live/">
                MINDA Live
              </a>{" "}
              &mdash; the app that dairy farmers use nationwide to record and
              access information about their herd and animals.
            </p>

            <p>
              In my early career, I was a{" "}
              <span className={classes.nobr}>
                <strong>Graphic Designer</strong>
              </span>{" "}
              for{" "}
              <span className={classes.nobr}>
                <a href="http://haprint.com">
                  <strong>H&amp;A Print</strong>
                </a>
              </span>{" "}
              in Whanganui, whose website I still maintain today. I also wrote
              an honours thesis on{" "}
              <a href="https://secure.wand.net.nz/~bec5/honours-thesis.pdf">
                IPv6 networking for the Internet of Things
              </a>{" "}
              when I studied at the University of Waikato.
            </p>
          </div>
        </div>
      </div>

      <div class="slide contact" id="contact">
        <div class="cell">
          <div class="wrapper">
            <h1>Get in touch</h1>

            <p>
              I enjoy bonding over{" "}
              <a href="https://www.youtube.com/watch?v=D_QLQHkj1XU">
                symphonic metal
              </a>{" "}
              and juicy TV shows like Dexter,{" "}
              <span className={classes.nobr}>House of Cards</span> and{" "}
              <span className={classes.nobr}>Game of Thrones</span>, but you're
              also welcome to <span className={classes.nobr}>get in touch</span>{" "}
              <span className={classes.nobr}>with me</span> if you want to talk
              business!
            </p>

            <p>
              <a href="mailto:brad@christensen.co.nz" title="Email me">
                brad@christensen.co.nz
              </a>
            </p>

            {/* TODO: this is totally a list, not a paragraph */}
            <p>
              Find me on:{" "}
              <a
                href="https://www.linkedin.com/in/bradchristensennz"
                title="Info for important people"
              >
                LinkedIn
              </a>{" "}
              /{" "}
              <a
                href="https://twitter.com/BradC"
                title="Try not to take anything I say too seriously"
              >
                Twitter
              </a>{" "}
              /{" "}
              <a
                href="https://github.com/bradchristensen"
                title="Some of my open source projects"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;