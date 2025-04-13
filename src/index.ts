import { createRouter, getCurrentRoute, navigate, Route } from "./router";
import {
  addWindowEventListeners,
  replaceOrAddClass,
  toggleClass,
  wait,
} from "./util";

import routes from "./routes";
import { toast } from "./toaster";

const layoutEl = document.getElementById("layout")!;
const mainEl = document.getElementById("main")!;

const animationDuration = 340;

let prevRoute: Route = getCurrentRoute(routes);
let firstLoad = true;

let router = createRouter(routes, async (route, params) => {
  console.log("route:", route?.path, route?.id, route?.name, route?.pos);
  console.log("params:", params);

  if (!route) navigate("/404", true);
  else {
    // Animate page transition
    if (prevRoute.id != route.id) {
      if (!!prevRoute?.pos) {
        mainEl.classList.remove("move-in");

        let dx = prevRoute.pos.x - route.pos.x;
        let dy = prevRoute.pos.y - route.pos.y;

        let angle = Math.atan2(dy, dx);

        mainEl.style.setProperty("--angle", `${angle}rad`);
        mainEl.classList.add("move-out");
      }

      await wait(animationDuration);
    }

    // Update content on first load or on page change
    if (firstLoad || prevRoute.id != route.id) {
      // Set page title
      if (!!route.name) document.title = `${route.name} – valflrt.dev`;

      // Update content (inside #main)
      mainEl.innerHTML =
        typeof route.content === "string"
          ? route.content
          : route.content(route, params);

      // Add page specific class to #main for custom styling
      replaceOrAddClass(mainEl, prevRoute?.id, route.id);

      // Menu tab coloring
      document
        .querySelectorAll<HTMLAnchorElement>("#menu > a")
        .forEach((e) =>
          toggleClass(
            e,
            new URL(e.href).hash.slice(1) === route.path,
            "active",
          ),
        );

      // Add listeners for copy buttons

      prevRoute = route;
      if (prevRoute.id != route.id) firstLoad = false;
    }
  }

  mainEl.classList.remove("move-out");
  if (!firstLoad) {
    mainEl.classList.remove("spawn");
    mainEl.classList.add("move-in");
  }
});

addWindowEventListeners(["load", "hashchange"], router);

addWindowEventListeners(["load"], () => {
  document.addEventListener("click", (e) => {
    if (!!e.target) {
      let target = e.target as HTMLElement;
      if (target.matches(".copy[data-copy]:not(.activated)")) {
        navigator.clipboard
          .writeText(target.dataset.copy ?? "")
          .then(() => {
            toast("Copied !", "highlight");
          })
          .catch(() => {
            toast("Failed to copy", "error");
          });
      }
    }
  });
});

addWindowEventListeners(["load", "resize"], () => {
  toggleClass(
    layoutEl,
    "ontouchstart" in window || !!navigator.maxTouchPoints,
    "touch",
    "non-touch",
  );
  toggleClass(layoutEl, window.innerWidth < 750, "mobile", "desktop");
});
