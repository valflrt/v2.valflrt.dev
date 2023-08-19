import { useLocation } from "react-router-dom";
import routes from "../assets/routes";
import delayedRouterLinkFactory from "../factories/delayedRouterLinkFactory";

import { css } from "../utils";

let PageSwitchLink = delayedRouterLinkFactory({
  timeout: 450,
  onTimeoutStart: (d) => {
    document
      .querySelector("#root > .layout > main")
      ?.classList.add(
        "disappearing",
        d > 0 ? "movingLeft" : d < 0 ? "movingRight" : ""
      );
  },
  onTimeoutEnd: () =>
    document
      .querySelector("#root > .layout > main")
      ?.classList.remove("disappearing", "movingLeft", "movingRight"),
  className: (isFocused: boolean) =>
    css.join("link", isFocused ? "focused" : ""),
});

export default PageSwitchLink;
