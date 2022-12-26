import { Route, Routes as RouteGroup } from "react-router-dom";

import LazyFactory from "../factories/LazyFactory";

import useSpinner from "../hooks/useSpinner";

import "./common.scss";

let elements = [
  { path: "/", element: () => import("./Main") },
  { path: "/projects", element: () => import("./Projects") },
  { path: "/contact", element: () => import("./Contact") },
  { path: "/project/:id", element: () => import("./Project") },
  { path: "*", element: () => import("./NotFound") },
];

export default function Routes() {
  let setSpinnerState = useSpinner();

  let Lazy = LazyFactory({
    loadStart: () => setSpinnerState("visible"),
    loadEnd: () => setSpinnerState("hidden"),
  });

  return (
    <RouteGroup>
      {elements.map((r, i) => (
        <Route
          path={r.path}
          key={i}
          element={<Lazy importPromise={r.element} />}
        />
      ))}
    </RouteGroup>
  );
}
