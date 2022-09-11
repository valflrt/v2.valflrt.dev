import PageSwitchLink from "../common/PageSwitchLink";

import "./Main.scss";

function Main() {
  document.title = "Home – valflrt.dev";

  let elapsedDays = (Date.now() / 1000 - 1108087200) / 60 / 60 / 24;

  return (
    <div className={"main home"}>
      <img
        className={"logo"}
        src={"/assets/logo-128.png"}
        alt={"valflrt's logo"}
      />
      <h1>Heya !</h1>
      <p className={"paragraph"}>
        I am Valentin Fleurit (aka valflrt), a programming enthusiast born at{" "}
        <code
          title={`Alive for approximately ${Math.floor(
            elapsedDays / 365
          ).toFixed()} years and ${(elapsedDays % 365).toFixed()} days`}
        >
          1108087200
        </code>
        . French and proud to be (oui oui baguette) and I also really like
        sailing.
      </p>
      <div className={"links"}>
        <PageSwitchLink to={"/projects"} className={"link"}>
          My Projects
        </PageSwitchLink>
        <PageSwitchLink to={"/contact"} className={"link"}>
          Contact
        </PageSwitchLink>
      </div>
    </div>
  );
}

export default Main;
