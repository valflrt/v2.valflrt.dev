export interface Route {
  id: string;
  name?: string;
  path: string;
  update?: (routeDetails: RouteDetails) => unknown;
  render: string | ((routeDetails: RouteDetails) => string);
}
export type Routes = Route[];

export interface RouteDetails {
  index: number;
  params: { [key: string]: string };
}

export function setLocation(path: string, replace?: boolean) {
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

export function getRouteIndex(path: string[], routes: Routes) {
  return routes.findIndex(({ path: v }) => {
    let p = v.split("/").slice(1);
    return (
      path.length === p.length &&
      p.every((word, i) => {
        return word === path[i] || word.startsWith(":");
      })
    );
  });
}

export function getPathParams(templatePath: string[], path: string[]) {
  let params: { [key: string]: string } = {};
  templatePath.forEach(
    (v, i) => v.startsWith(":") && (params[v.slice(1)] = path[i])
  );
  return params;
}

export function createRouter(
  routes: Routes,
  callback: (route?: Route, routeDetails?: RouteDetails) => unknown
) {
  return () => {
    let currentPath = getPath().split("/").slice(1) ?? [];

    let index = getRouteIndex(currentPath, routes);

    if (index != -1) {
      let route = routes[index];
      let details = {
        index,
        params: getPathParams(route.path.split("/").slice(1), currentPath),
      };
      callback(route, details);
    } else {
      callback();
    }
  };
}
