import { createRouter, getCurrentRoute, navigate } from "./router";
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

let prevRoutePos = getCurrentRoute(routes)?.pos ?? null;
let prevRouteId: string | null = null;

let firstLoad = true;

let router = createRouter(routes, async (route, params) => {
  console.log("route:", route?.path, route?.id, route?.name, route?.pos);
  console.log("params:", params);

  if (!route) navigate("/404", true);
  else {
    if (prevRouteId != route.id) {
      // If the page changed do ...

      mainEl.classList.remove("move-in");

      if (!!prevRoutePos) {
        let dx = prevRoutePos.x - route.pos.x;
        let dy = prevRoutePos.y - route.pos.y;

        let angle = Math.atan2(dy, dx);

        mainEl.style.setProperty("--angle", `${angle}rad`);
        mainEl.classList.add("move-out");

        prevRoutePos = route.pos;
      }

      await wait(animationDuration);
    }

    if (!!route.name) document.title = `${route.name} – valflrt.dev`;

    if (!!route.update) route.update(route, params);

    mainEl.innerHTML =
      typeof route.render === "string"
        ? route.render
        : route.render(route, params);

    replaceOrAddClass(mainEl, prevRouteId, route.id);

    // Menu tab coloring
    document
      .querySelectorAll<HTMLAnchorElement>("#menu > a")
      .forEach((e) =>
        toggleClass(e, new URL(e.href).hash.slice(1) === route.path, "active"),
      );

    prevRouteId = route.id;
  }

  mainEl.classList.remove("move-out");
  if (firstLoad) {
    mainEl.classList.add("spawn");
    firstLoad = false;
  } else {
    mainEl.classList.remove("spawn");
    mainEl.classList.add("move-in");
  }
});

addWindowEventListeners(["load", "hashchange"], async () => {
  await router();

  // apparently this needs to be here because it needs to be
  // applied each time the hash changes (idk why...)
  document
    .querySelectorAll<HTMLElement>(".copy[data-copy]:not(.activated)")
    .forEach((e) => {
      e.classList.add("activated");
      e.addEventListener("click", () => {
        navigator.clipboard
          .writeText(e.dataset.copy ?? "")
          .then(() => {
            toast("Copied !", "highlight");
          })
          .catch(() => {
            toast("Failed to copy", "error");
          });
      });
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
