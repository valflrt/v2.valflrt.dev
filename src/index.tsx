import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import Root from "./Root";

import "./index.scss";
import "./common.scss";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Root />
  </HashRouter>
);
