import Link from "../particles/Link";
import CopyLink from "../particles/CopyLink";

import { Copy, ExternalLink } from "react-feather";

import "./Contact.scss";

export default function Contact() {
  document.title = "Contact – valflrt.dev";

  return (
    <div className={"main contact"}>
      <h1 className={"mainTitle"}>Contact</h1>
      <div className={"links"}>
        <Link to={"https://github.com/valflrt"} className={"link button"}>
          Github <ExternalLink className={"icon"} />
        </Link>
        <CopyLink
          textToCopy={"valflrt#8436"}
          title={"discord"}
          className={"link button"}
        >
          Discord <Copy className={"icon"} />
        </CopyLink>
        <CopyLink
          textToCopy={"val@valflrt.dev"}
          title={"email"}
          className={"link button"}
        >
          Email <Copy className={"icon"} />
        </CopyLink>
      </div>
    </div>
  );
}
