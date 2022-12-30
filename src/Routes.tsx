import { Route, Routes as RouteGroup } from "react-router-dom";

import lazyFactory from "./factories/lazyFactory";

import useSpinner from "./hooks/useSpinner";

import "./routes/common.scss";

let elements = [
  { path: "/", element: () => import("./routes/Main") },
  { path: "/projects", element: () => import("./routes/Projects") },
  { path: "/contact", element: () => import("./routes/Contact") },
  { path: "/project/:id", element: () => import("./routes/Project") },
  { path: "*", element: () => import("./routes/NotFound") },
];

export default function Routes() {
  let setSpinnerState = useSpinner();

  let Lazy = lazyFactory({
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
