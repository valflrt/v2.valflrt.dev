import PageSwitchLink from "../particles/PageSwitchLink";
import { css } from "../utils";

import "./Menu.scss";

export default function Menu() {
  let links = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <div className={"menuWrapper"}>
      <div className={"menu"}>
        {links.map((link, i) => (
          <PageSwitchLink
            to={link.url}
            className={(f) => css.join("clickable", f && "active")}
            key={i}
          >
            {link.name}
          </PageSwitchLink>
        ))}
      </div>
    </div>
  );
}
