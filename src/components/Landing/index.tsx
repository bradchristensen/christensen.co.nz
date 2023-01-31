import classes from "./style.module.scss";

function Landing() {
  return (
    <div className={`slide ${classes.landing}`} id="landing">
      <div className={classes.cell}>
        <div className="wrapper">
          <h2>Kia ora, I&rsquo;m</h2>
          <h1>Brad Christensen</h1>
          <h2>Software engineer &amp; technical leader</h2>

          <h3>A little about me</h3>

          <p>
            I craft pixel-perfect websites and mobile experiences, and I create
            the rock-solid Cloud infrastructure that powers them. I love being
            involved in every aspect of bringing products and solutions to life,
            and empowering teams to do their best work.
          </p>

          <p>
            I am leading development of our mobile and web platforms as{" "}
            <strong className={classes.nobr}>Head of Product</strong> at{" "}
            <a href="https://www.airsuite.com" className={classes.nobr}>
              <strong>AirSuite</strong>
            </a>
            , where we monitor indoor environment quality to create healthy and
            comfortable spaces for learning, working and living.
          </p>

          <p>
            A few years ago, my <a href="https://virscient.com">Virscient</a>{" "}
            colleague and ex-flatmate, Richard, and I challenged each other to
            learn{" "}
            <a href="https://www.youtube.com/watch?v=5Q-qzjM3PWc">Russian</a>.{" "}
            We lasted{" "}
            <a href="https://www.duolingo.com/profile/bradchristensen">
              400 days on Duolingo
            </a>
            . <span className={classes.nobr}>I made it</span> my New
            Year&rsquo;s resolution to pick it back up again in 2022.
          </p>

          <h3>My background</h3>

          <p>
            Previously I was a <strong>Software Engineering Manager</strong> at{" "}
            <a href="https://www.lic.co.nz">
              <strong>LIC</strong>
            </a>
            , where my team worked on{" "}
            <a href="https://www.lic.co.nz/products-and-services/minda/minda-live/">
              MINDA Live
            </a>{" "}
            &mdash; the app that dairy farmers use nationwide to record and
            access information about their herd and animals. Earlier in my
            career, I worked for Virscient and Enlighten Designs.
          </p>

          <p>
            I wrote my honours thesis on{" "}
            <a href="https://web.archive.org/web/20160130060823/https://secure.wand.net.nz/sites/default/files/Thesis%202014-10-21%2022-02.pdf">
              IPv6 networking for the Internet of Things
            </a>{" "}
            when I studied at the University of Waikato. During my student
            years, <span className={classes.nobr}>I was</span> an occasional{" "}
            <strong className={classes.nobr}>Graphic Designer</strong> for{" "}
            <a href="http://haprint.com" className={classes.nobr}>
              <strong>H&amp;A Print</strong>
            </a>{" "}
            in Whanganui, whose website I still maintain today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
