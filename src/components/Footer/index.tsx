import GitHub from "../../icons/GitHub";
import LinkedIn from "../../icons/LinkedIn";
import Twitter from "../../icons/Twitter";
import classes from "./style.module.scss";

function Footer() {
  return (
    <div className={`slide ${classes.footer}`} id="contact">
      <div className={classes.cell}>
        <div className={`wrapper ${classes.wrapper}`}>
          <div className={classes.col}>
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
          </div>

          <div className={classes.col}>
            <ul className={classes.social}>
              <li>
                Email
                <a href="mailto:brad@christensen.co.nz" title="Email me">
                  brad@christensen.co.nz
                </a>
              </li>

              <li>
                LinkedIn
                <a
                  href="https://www.linkedin.com/in/bradchristensennz"
                  title="Info for important people"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn width={16} height={16} />
                  @bradchristensennz
                </a>
              </li>
              <li>
                Twitter
                <a
                  href="https://twitter.com/BradC"
                  title="Try not to take anything I say too seriously"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter width={16} height={16} />
                  @BradC
                </a>
              </li>
              <li>
                GitHub
                <a
                  href="https://github.com/bradchristensen"
                  title="Some of my open source projects"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub width={16} height={16} />
                  @bradchristensen
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
