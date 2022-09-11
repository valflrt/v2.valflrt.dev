import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import Routes from "./routes";
import Root from "./Root";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Root />
  </HashRouter>
);
