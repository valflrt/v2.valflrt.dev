import Link from "../particles/Link";
import CopyButton from "../particles/CopyButton";

import { Copy, ExternalLink } from "react-feather";

import "./Contact.scss";

export default function Contact() {
  document.title = "Contact – valflrt.dev";

  return (
    <div className={"main contact"}>
      <h1 className={"mainTitle"}>Contact</h1>
      <p className="description">
        Feel free to contact me if you have a question !
      </p>
      <div className={"container row wrap centerStretch"}>
        <Link to={"https://github.com/valflrt"} className={"button clickable"}>
          Github <ExternalLink className={"icon"} />
        </Link>
        <CopyButton
          textToCopy={"valflrt#8436"}
          title={"discord"}
          className={"button clickable"}
        >
          Discord <Copy className={"icon"} />
        </CopyButton>
        <CopyButton
          textToCopy={"val@valflrt.dev"}
          title={"email"}
          className={"button clickable"}
        >
          Email <Copy className={"icon"} />
        </CopyButton>
      </div>
    </div>
  );
}
