/// <reference path="../../index.d.ts" />

import { createRouter, getCurrentRoute, navigate } from "./router.js";
import routes from "./routes.js";
import toast from "./toast.js";
import {
  addWindowEventListeners,
  toggleClasses,
  replaceOrAddClass,
  wait,
} from "./util.js";

const layoutEl = document.getElementById("layout");
const mainEl = document.getElementById("main");

const animationDuration = 365;

let prevRoute = getCurrentRoute(routes);
let firstLoad = true;

let router = createRouter(routes, async (route, params) => {
  console.log("route:", route?.path, route?.id, route?.name, route?.pos);
  console.log("params:", params);

  if (!route) navigate("/404", true);
  else {
    // Animate page transition
    if (prevRoute.id != route.id) {
      if (!!prevRoute?.pos) {
        mainEl.classList.remove("move_in");

        let dx = prevRoute.pos.x - route.pos.x;
        let dy = prevRoute.pos.y - route.pos.y;

        let angle = Math.atan2(dy, dx);

        mainEl.style.setProperty("--angle", `${angle}rad`);
        mainEl.classList.add("move_out");
      }

      await wait(animationDuration);
    }

    // Update content on first load or on page change
    if (firstLoad || prevRoute.id != route.id) {
      // Set page title
      if (!!route.name) document.title = `${route.name} – valflrt.dev`;

      // Update content (inside #main)
      mainEl.replaceChildren(route.content(route, params));

      // Add page specific class to #main for custom styling
      replaceOrAddClass(mainEl, prevRoute?.id, route.id);

      // Menu tab coloring
      document
        .querySelectorAll("#menu > a")
        .forEach((e) =>
          toggleClasses(
            e,
            new URL(e.href).hash.slice(1) === route.path,
            "active",
          ),
        );

      if (prevRoute.id != route.id) firstLoad = false;
      prevRoute = route;
    }
  }

  mainEl.classList.remove("move_out");
  if (!firstLoad) {
    mainEl.classList.add("move_in");
  }
});

addWindowEventListeners(["load", "hashchange"], router);
addWindowEventListeners(["load", "resize"], () => {
  toggleClasses(
    layoutEl,
    "ontouchstart" in window || !!navigator.maxTouchPoints,
    "touch",
    "non_touch",
  );
  toggleClasses(layoutEl, window.innerWidth < 750, "mobile", "desktop");
});

document.addEventListener("click", (e) => {
  let target = e.target.closest(".copy[data-copy]");
  if (target)
    navigator.clipboard
      .writeText(e.target.dataset.copy ?? "")
      .then(() => {
        toast("Copied !", "highlight");
      })
      .catch(() => {
        toast("Failed to copy", "error");
      });
});
