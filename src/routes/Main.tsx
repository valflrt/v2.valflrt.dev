import { List, User } from "react-feather";

import PageSwitchLink from "../particles/PageSwitchLink";

import "./Main.scss";
import logo from "../assets/logo.png";

export default function Main() {
  document.title = "Home – valflrt.dev";

  let elapsedDays = (Date.now() / 1000 - 1108087200) / 60 / 60 / 24;

  return (
    <main className={"home"}>
      <img
        className={"logo"}
        src={logo}
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
          1108087200
        </code>
        . French and proud to be (oui oui baguette). I also really like sailing
        and swimming.
      </p>
      <div className={"container row wrap centerStretch"}>
        <PageSwitchLink to={"/projects"} className={"button clickable"}>
          <List className={"icon"} /> Projects
        </PageSwitchLink>
        <PageSwitchLink to={"/contact"} className={"button clickable"}>
          <User className={"icon"} /> Contact
        </PageSwitchLink>
      </div>
    </main>
  );
}
