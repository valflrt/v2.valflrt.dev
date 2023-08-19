import delayedRouterLinkFactory from "../factories/delayedRouterLinkFactory";

import { css } from "../utils";

let PageSwitchLink = delayedRouterLinkFactory({
  timeout: 450,
  onTimeoutStart: (d) =>
    document
      .querySelector("#root > .layout > main")
      ?.classList?.add(
        "disappearing",
        d > 0 ? "moveLeft" : d < 0 ? "moveRight" : ""
      ),
  className: (isFocused: boolean) =>
    css.join("link", isFocused ? "focused" : ""),
});

export default PageSwitchLink;
