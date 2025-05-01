/// <reference path="../../index.d.ts" />

/**
 * Navigate to given path.
 * @param {string} path
 * @param {bool} replace Replace the previous location in history.
 */
export function navigate(path, replace) {
  if (!replace) window.location.hash = "#".concat(path);
  else {
    let newUrl = new URL(window.location.href);
    newUrl.hash = "#".concat(path);
    window.history.replaceState(null, "", newUrl);
    window.dispatchEvent(new Event("hashchange"));
  }
}

/**
 * Returns the current path.
 * @returns {string} string
 */
export function getPath() {
  return window.location.hash.startsWith("#/")
    ? window.location.hash.slice(1)
    : "/";
}

/**
 * Returns the route id associated with the current
 * path.
 * @param {string} path
 * @param {Route[]} routes
 * @returns {string}
 */
export function getRouteIndex(path, routes) {
  return routes.findIndex(({ path: v }) => {
    let p = v.split("/").slice(1);
    return (
      path.length === p.length &&
      p.every((word, i) => word === path[i] || word.startsWith(":"))
    );
  });
}

/**
 * Gets the route params from the path.
 * Example: if `templatePath` is "/project/:id" and
 * `path` is "/project/helloworld", then this function
 * will return `{ id: "helloworld" }`.
 * @param {string[]} templatePath
 * @param {string[]} path
 * @returns {{ key: string]: string; }}
 */
export function getPathParams(templatePath, path) {
  let params = {};
  templatePath.forEach(
    (v, i) => v.startsWith(":") && (params[v.slice(1)] = path[i]),
  );
  return params;
}

/**
 * Returns the Route object associated with the
 * current route.
 * @param {Route[]} routes
 * @returns {Route}
 */
export function getCurrentRoute(routes) {
  let currentPath = getPath().split("/").slice(1) ?? [];
  let index = getRouteIndex(currentPath, routes);
  return routes[index];
}

/**
 * Creates a router.
 * @param {Route[]} routes
 * @param {(route?: Route, params?: { [key: string]: string; }) => Promise<unknown>} callback executed on path change
 * @returns {() => Promise<unknown>} a function that must be called on hashchange
 */
export function createRouter(routes, callback) {
  return async () => {
    let currentPath = getPath().split("/").slice(1) ?? [];

    let route = getCurrentRoute(routes);

    if (!!route) {
      let params = getPathParams(route.path.split("/").slice(1), currentPath);
      await callback(route, params);
    } else {
      await callback();
    }
  };
}
