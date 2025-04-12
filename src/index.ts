import { createRouter, getCurrentRoute, navigate } from "./router";
import {
  addWindowEventListeners,
  removeClasses,
  replaceOrAddClass,
  toggleClass,
  wait,
} from "./util";

import routes from "./routes";
import { toast } from "./toaster";

const layoutEl = document.getElementById("layout")!;
const mainEl = document.getElementById("main")!;

let prevRouteIndex: number | null = null;
let prevRouteId: string | null = null;
let prevRouteAltPos: string | null =
  getCurrentRoute(routes)?.altPosition ?? null;

let router = createRouter(routes, async (route, details) => {
  console.log(route, details);

  if (route && details) {
    if (prevRouteIndex != null && prevRouteId != route.id) {
      let d = details.index - prevRouteIndex;
      mainEl.classList.add("disappearing");

      removeClasses(mainEl, "move-left", "move-right", "move-up", "move-down");

      if (route.altPosition == "down" || prevRouteAltPos == "up") {
        mainEl.classList.add("move-down");
        if (!route.altPosition) prevRouteAltPos = null;
        else prevRouteAltPos = "down";
      } else if (route.altPosition == "up" || prevRouteAltPos == "down") {
        mainEl.classList.add("move-up");

        if (!route.altPosition) prevRouteAltPos = null;
        else prevRouteAltPos = "up";
      } else {
        if (d >= 0) {
          mainEl.classList.add("move-left");
        } else {
          mainEl.classList.add("move-right");
        }
      }

      // toggleClass(mainEl, d >= 0, "move-left", "move-right");
      await wait(480);
    }

    if (route.name) document.title = `${route.name} – valflrt.dev`;

    if (route.update) route.update(details);
    mainEl.innerHTML =
      typeof route.render === "string" ? route.render : route.render(details);

    replaceOrAddClass(mainEl, prevRouteId, route.id);
    document
      .querySelectorAll<HTMLAnchorElement>("#menu > a")
      .forEach((e) =>
        toggleClass(e, new URL(e.href).hash.slice(1) === route.path, "active"),
      );

    prevRouteId = route.id;
    prevRouteIndex = details.index;
  } else {
    navigate("/404", true);
  }

  mainEl.classList.remove("disappearing", "move-left", "move-right");
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
