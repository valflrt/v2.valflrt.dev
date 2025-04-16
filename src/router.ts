export interface Route {
  id: string;
  name?: string;
  path: string;
  content: (route: Route, params?: RouteParams) => DocumentFragment;

  pos: { x: number; y: number };
}

type RouteParams = { [key: string]: string };

export function navigate(path: string, replace?: boolean) {
  if (!replace) window.location.hash = "#".concat(path);
  else {
    let newUrl = new URL(window.location.href);
    newUrl.hash = "#".concat(path);
    window.history.replaceState(null, "", newUrl);
    window.dispatchEvent(new Event("hashchange"));
  }
}

export function getPath() {
  return window.location.hash.startsWith("#/")
    ? window.location.hash.slice(1)
    : "/";
}

export function getRouteIndex(path: string[], routes: Route[]) {
  return routes.findIndex(({ path: v }) => {
    let p = v.split("/").slice(1);
    return (
      path.length === p.length &&
      p.every((word, i) => word === path[i] || word.startsWith(":"))
    );
  });
}

export function getPathParams(templatePath: string[], path: string[]) {
  let params: { [key: string]: string } = {};
  templatePath.forEach(
    (v, i) => v.startsWith(":") && (params[v.slice(1)] = path[i]),
  );
  return params;
}

export function getCurrentRoute(routes: Route[]): Route {
  let currentPath = getPath().split("/").slice(1) ?? [];
  let index = getRouteIndex(currentPath, routes);
  return routes[index];
}

/**
 * Creates a router
 * @param routes routes...
 * @param callback a custom function that will be executed
 * every time the route changes
 * @returns a function that must be called on hashchange
 */
export function createRouter(
  routes: Route[],
  callback: (
    route?: Route,
    params?: { [key: string]: string },
  ) => Promise<unknown>,
) {
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
