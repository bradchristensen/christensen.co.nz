import classes from "./style.module.scss";

const endDate = new Date("2022-10-08");

function VoteBanner() {
  const now = new Date();

  if (now >= endDate) {
    return null;
  }

  return (
    <div className={classes.banner}>
      <a
        href="https://vote.louisehutt.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Live in Hamilton? Don&rsquo;t forget to vote for your favourite Hamilton
        City Council West Ward candidate!{" "}
        <span className={classes.btn}>Find out more</span>
      </a>
    </div>
  );
}

export default VoteBanner;
