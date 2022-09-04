import React from "react";
import { Toaster } from "react-hot-toast";

import useIsMobile from "../hooks/useIsMobile";
import useIsTactile from "../hooks/useIsTactile";

import Spinner from "./Spinner";

import Menu from "./Menu";

import { css } from "../utils";

import "./Layout.scss";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <div
    className={css.j(
      "layout",
      useIsMobile() ? "mobile" : "desktop",
      useIsTactile() ? "tactile" : "notTactile"
    )}
  >
    <Toaster position={"top-right"} toastOptions={{ className: "toast" }} />
    <Menu />
    <Spinner />
    {children}
  </div>
);

export default Layout;
