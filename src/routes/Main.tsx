import PageSwitchLink from "../particles/PageSwitchLink";

import "./Main.scss";

export default function Main() {
  document.title = "Home – valflrt.dev";

  let elapsedDays = (Date.now() / 1000 - 1108087200) / 60 / 60 / 24;

  return (
    <div className={"main home"}>
      <img
        className={"logo"}
        src={"/assets/logo-128.png"}
        alt={"valflrt's logo"}
      />
      <h1 className={"mainTitle"}>Heya !</h1>
      <p className={"paragraph"}>
        I am Valentin Fleurit (aka valflrt), a programming enthusiast born at{" "}
        <code
          className={"birthDate"}
          title={`Alive for approximately ${Math.trunc(
            elapsedDays / 365
          ).toFixed()} years and ${(elapsedDays % 365).toFixed()} days`}
        >
          1108087200
        </code>
        . French and proud to be (oui oui baguette). I also really like sailing
        and swimming.
      </p>
      <div className={"links"}>
        <PageSwitchLink to={"/projects"} className={"link button"}>
          Projects
        </PageSwitchLink>
        <PageSwitchLink to={"/contact"} className={"link button"}>
          Contact
        </PageSwitchLink>
      </div>
    </div>
  );
}
