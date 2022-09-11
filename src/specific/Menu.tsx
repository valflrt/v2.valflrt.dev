import PageSwitchLink from "../common/PageSwitchLink";
import { css } from "../utils";

import "./Menu.scss";

function Menu() {
  return (
    <div className={"menuWrapper"}>
      <div className={"menu"}>
        <PageSwitchLink
          to={"/"}
          className={(f) => css.join("link", f && "focused")}
        >
          Home
        </PageSwitchLink>
        <PageSwitchLink
          to={"/projects"}
          className={(f) => css.join("link", f && "focused")}
        >
          Projects
        </PageSwitchLink>
        <PageSwitchLink
          to={"/contact"}
          className={(f) => css.join("link", f && "focused")}
        >
          Contact
        </PageSwitchLink>
      </div>
    </div>
  );
}

export default Menu;
