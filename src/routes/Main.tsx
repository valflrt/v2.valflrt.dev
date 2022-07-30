import CopyLink from "../common/CopyLink";

import logo from "../../public/assets/logo-128.png";

import "./Main.scss";

const Main = () => {
  document.title = "Home – valflrt.dev";

  let elapsedDays = (Date.now() / 1000 - 1108087200) / 60 / 60 / 24;

  return (
    <div className={"main home"}>
      <img className={"logo"} src={logo} alt="valflrt's logo" />
      <h1>Heya ! I'm valflrt !</h1>
      <p className={"paragraph"}>
        Hello ! I am Valentin Fleurit (aka valflrt), just a programming enthusiast born at{" "}
        <CopyLink
      title={`Alive for approximately ${(
        elapsedDays / 365
      ).toFixed()} years and ${(elapsedDays % 365).toFixed()} days`}
      className={"link"}
      textToCopy={"1108087200"}
      >
          <code>1108087200</code>
        </CopyLink>
        . I'm French and proud to be (oui oui baguette). Sailing is nice too. Also, I think Window's root is ugly.
      </p>
    </div>
  );
};

export default Main;