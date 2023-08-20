interface RouteObject {
  name: string;
  path: string;
}

export function createRouter(
  routes: RouteObject[],
  render: (
    route: RouteObject | null,
    params: { [key: string]: string }
  ) => unknown
) {
  return () => {
    let currentPath = window.location.hash.startsWith("#/")
      ? window.location.hash.slice(1).split("/").slice(1)
      : [];

    let params: { [key: string]: string } = {};
    let route =
      routes.find(
        (route) =>
          route.path.length === currentPath.length &&
          route.path
            .split("/")
            .slice(1)
            .every((p, i) => {
              if (p.startsWith(":")) {
                params[p.slice(1)] = currentPath[i];
                return true;
              }

              return p === currentPath[i];
            })
      ) ?? null;

    render(route, params);
  };
}
