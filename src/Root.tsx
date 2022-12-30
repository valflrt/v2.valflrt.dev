import { ToastBar, Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import useIsMobile from "./hooks/useIsMobile";
import useIsTactile from "./hooks/useIsTactile";
import useDelayedNavigate from "./hooks/useDelayedNavigate";
import useWheelStep from "./hooks/useWheelStep";

import Routes from "./Routes";

import Menu from "./components/Menu";
import Spinner from "./components/Spinner";

import routes from "./assets/routes";

import { css } from "./utils";

import "./Root.scss";

export default function Root() {
  let navigate = useDelayedNavigate({
    onTimeoutStart: () =>
      document
        .querySelector("#root > .layout > .main")
        ?.classList.add("disappearing"),
    onTimeoutEnd: () =>
      document
        .querySelector("#root > .layout > .main")
        ?.classList.remove("disappearing"),
    timeout: 400,
  });

  let location = useLocation();

  let currentIndex = () =>
    routes.findIndex((r) => location.pathname === r.path);

  useWheelStep(
    (e) => {
      if (e.y === -1 && currentIndex() !== 0)
        navigate(routes[currentIndex() - 1].path);
      else if (e.y === 1 && currentIndex() !== routes.length - 1)
        navigate(routes[currentIndex() + 1].path);
    },
    { delay: 510 }
  );

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
              primary: "var(--primary-550)",
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
