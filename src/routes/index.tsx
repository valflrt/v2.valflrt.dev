import React from "react";
import { Route, Routes as RouteGroup } from "react-router-dom";

import LazyFactory from "../factories/LazyFactory";

import useSpinner from "../hooks/useSpinner";

import "./Common.scss";

let elements = [
  { path: "/", element: React.lazy(() => import("./Main")) },
  { path: "/projects", element: React.lazy(() => import("./Projects")) },
  { path: "/contact", element: React.lazy(() => import("./Contact")) },
  { path: "/project/:id", element: React.lazy(() => import("./Project")) },
  { path: "*", element: React.lazy(() => import("./NotFound")) },
];

function Routes() {
  let setSpinnerState = useSpinner();

  let Lazy = LazyFactory({
    loadStart: () => setSpinnerState("visible"),
    loadEnd: () => setSpinnerState("hidden"),
  });

  return (
    <RouteGroup>
      {elements.map((r, i) => (
        <Route path={r.path} key={i} element={<r.element />} />
      ))}
    </RouteGroup>
  );
}

export default Routes;
