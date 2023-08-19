import Link from "../particles/Link";
import CopyButton from "../particles/CopyButton";

import { Copy, ExternalLink } from "react-feather";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";

import "./Contact.scss";

export default function Contact() {
  document.title = "Contact – valflrt.dev";

  return (
    <main className={"contact"}>
      <h1 className={"mainTitle"}>Contact</h1>
      <p className="description">
        Feel free to send me a message, I would appreciate it !
      </p>
      <div className={"container row wrap centerStretch"}>
        <Link to={"https://github.com/valflrt"} className={"button clickable"}>
          Github <SiGithub className={"icon"} size={16} />
        </Link>
        <Link to={"https://instagram.com/valflrt"} className={"button clickable"}>
          Instagram <SiInstagram className={"icon"} size={16} />
        </Link>
        <CopyButton
          textToCopy={"valflrt"}
          title={"discord"}
          className={"button clickable"}
        >
          Discord <Copy className={"icon"} size={16} />
        </CopyButton>
        <CopyButton
          textToCopy={"valflrt@pm.me"}
          title={"email"}
          className={"button clickable"}
        >
          Email <Copy className={"icon"} size={16} />
        </CopyButton>
      </div>
    </main>
  );
}
