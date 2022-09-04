import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import Routes from "./routes";
import Layout from "./specific/Layout";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Layout>
      <Routes />
    </Layout>
  </HashRouter>
);
