import { Toaster } from "react-hot-toast";

import useIsMobile from "./hooks/useIsMobile";
import useIsTactile from "./hooks/useIsTactile";

import Routes from "./Routes";

import Menu from "./components/Menu";
import Spinner from "./components/Spinner";

import { css } from "./utils";

import "./Root.scss";

export default function Root() {
  // let navigate = useDelayedNavigate({
  //   onTimeoutStart: () =>
  //     document
  //       .querySelector("#root > .layout > main")
  //       ?.classList.add("disappearing"),
  //   onTimeoutEnd: () =>
  //     document
  //       .querySelector("#root > .layout > main")
  //       ?.classList.remove("disappearing"),
  //   timeout: 400,
  // });

  // let currentIndex = () =>
  // routes.findIndex((r) => location.pathname === r.path);
  // useWheelStep(
  //   (e) => {
  //     if (e.y === -1 && currentIndex() !== 0)
  //       navigate(routes[currentIndex() - 1].path);
  //     else if (e.y === 1 && currentIndex() !== routes.length - 1)
  //       navigate(routes[currentIndex() + 1].path);
  //   },
  //   { delay: 510 }
  // );

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
              primary: "var(--black-600)",
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
