import { List, User } from "react-feather";

import PageSwitchLink from "../particles/PageSwitchLink";

import "./Main.scss";

export default function Main() {
  document.title = "Home – valflrt.dev";

  let elapsedDays = (Date.now() / 1000 - 1108132073) / 60 / 60 / 24;

  return (
    <main className={"home"}>
      <img
        className={"logo"}
        src={"/assets/logo-256.png"}
        alt={"valflrt's profile picture"}
        width={128}
        height={128}
      />
      <h1 className={"mainTitle"}>Heya !</h1>
      <p className={"description"}>
        I am Valentin Fleurit (aka valflrt), a programming enthusiast born at{" "}
        <code
          className={"birthDate code"}
          title={`Alive for approximately ${Math.trunc(
            elapsedDays / 365
          ).toFixed()} years and ${(elapsedDays % 365).toFixed()} days`}
        >
          1108132073
        </code>
        . French and proud to be (oui oui baguette). I also really like sailing
        and swimming.
      </p>
      <div className={"container row wrap centerStretch"}>
        <PageSwitchLink to={"/projects"} className={"button clickable"}>
          <List className={"icon"} size={16} /> Projects
        </PageSwitchLink>
        <PageSwitchLink to={"/contact"} className={"button clickable"}>
          <User className={"icon"} size={16} /> Contact
        </PageSwitchLink>
      </div>
    </main>
  );
}
