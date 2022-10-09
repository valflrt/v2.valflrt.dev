import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import useIsMobile from "./hooks/useIsMobile";
import useIsTactile from "./hooks/useIsTactile";
import useTimedNavigate from "./hooks/useTimedNavigate";
import useWheelStep from "./hooks/useWheelStep";

import Routes from "./routes";

import Menu from "./specific/Menu";
import Spinner from "./specific/Spinner";

import routes from "./assets/routes";

import { css } from "./utils";

import "./Root.scss";

function Root() {
  let navigate = useTimedNavigate({
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
      <Toaster position={"top-right"} toastOptions={{ className: "toast" }} />
      <Spinner />

      <Routes />

      <Menu />

      <div className={"copyright"}>
        <p>© 2021-present Valentin Fleurit</p>
      </div>
    </div>
  );
}

export default Root;
