import Link from "../particles/Link";
import CopyLink from "../particles/CopyLink";

import { AtSign, GitHub } from "react-feather";

import DiscordLogo from "../assets/discord_logo";

import "./Contact.scss";

export default function Contact() {
  document.title = "Contact – valflrt.dev";

  return (
    <div className={"main contact"}>
      <h1 className={"mainTitle"}>Contact</h1>
      <div className={"links"}>
        <Link to={"https://github.com/valflrt"} className={"link button"}>
          <GitHub className={"icon"} /> Github
        </Link>
        <CopyLink
          textToCopy={"valflrt#8436"}
          title={"discord"}
          className={"link button"}
        >
          <DiscordLogo className={"icon"} /> valflrt#8436
        </CopyLink>
        <CopyLink
          textToCopy={"val@valflrt.dev"}
          title={"email"}
          className={"link button"}
        >
          <AtSign className={"icon"} /> val@valflrt.dev
        </CopyLink>
      </div>
    </div>
  );
}
