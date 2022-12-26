import delayedRouterLinkFactory from "../factories/delayedRouterLinkFactory";

import { css } from "../utils";

let PageSwitchLink = delayedRouterLinkFactory({
  timeout: 450,
  onTimeoutStart: () =>
    document
      .querySelector("#root > .layout > .main")
      ?.classList.add("disappearing"),
  onTimeoutEnd: () =>
    document
      .querySelector("#root > .layout > .main")
      ?.classList.remove("disappearing"),
  className: (isFocused: boolean) =>
    css.join("link", isFocused ? "focused" : ""),
});

export default PageSwitchLink;
