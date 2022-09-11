import { Route, Routes as RouteGroup } from "react-router-dom";

import LazyFactory from "../factories/LazyFactory";

import useSpinner from "../hooks/useSpinner";

import "./Common.scss";

let routes = [
  { path: "/", source: () => import("./Main") },
  { path: "/projects", source: () => import("./Projects") },
  { path: "/contact", source: () => import("./Contact") },
  { path: "*", source: () => import("./NotFound") },
];

function Routes() {
  let setSpinnerState = useSpinner();

  let Lazy = LazyFactory({
    loadStart: () => setSpinnerState("visible"),
    loadEnd: () => setSpinnerState("hidden"),
  });

  return (
    <RouteGroup>
      {routes.map((r, i) => (
        <Route
          path={r.path}
          key={i}
          element={<Lazy importPromise={r.source} />}
        />
      ))}
    </RouteGroup>
  );
}

export default Routes;
