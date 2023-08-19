import routes from "../assets/routes";
import PageSwitchLink from "../particles/PageSwitchLink";
import { css } from "../utils";

import "./Menu.scss";

export default function Menu() {
  return (
    <div className={"menuWrapper"}>
      <nav className={"menu"}>
        {routes.map((link, i) => (
          <PageSwitchLink
            to={link.path}
            className={(f) => css.join("clickable button", f && "active")}
            key={i}
          >
            {link.name}
          </PageSwitchLink>
        ))}
      </nav>
    </div>
  );
}
