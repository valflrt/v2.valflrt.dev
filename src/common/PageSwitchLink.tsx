import TimedRouterLinkFactory from "../factories/TimedRouterLinkFactory";

import { css } from "../utils";

let PageSwitchLink = TimedRouterLinkFactory({
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
