import { Toaster } from "react-hot-toast";

import useIsMobile from "./hooks/useIsMobile";
import useIsTactile from "./hooks/useIsTactile";

import Routes from "./Routes";

import Menu from "./components/Menu";
import Spinner from "./components/Spinner";

import { css } from "./utils";

import "./Root.scss";

export default function Root() {
  return (
    <div
      className={css.join(
        "layout",
        useIsMobile() ? "mobile" : "desktop",
        useIsTactile() ? "tactile" : "notTactile"
      )}
    >
      <Menu />
      <Routes />

      <Toaster
        position={"bottom-right"}
        toastOptions={{
          className: "toast",
          success: {
            iconTheme: {
              primary: "var(--primary)",
              secondary: "var(--text-color)",
            },
          },
        }}
        gutter={4}
      />
      <Spinner />

      <div className={"copyright"}>
        <p>© 2021-present valflrt - Valentin Fleurit</p>
      </div>
    </div>
  );
}
