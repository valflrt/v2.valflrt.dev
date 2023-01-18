import { Navigate, Route, Routes as RouteGroup } from "react-router-dom";

import lazyFactory from "./factories/lazyFactory";

import useSpinner from "./hooks/useSpinner";

import "./routes/common.scss";

let elements = [
  { path: "/", element: () => import("./routes/Main") },
  { path: "/projects", element: () => import("./routes/Projects") },
  { path: "/contact", element: () => import("./routes/Contact") },
  { path: "/project/:id", element: () => import("./routes/Project") },
  { path: "/project/:id", element: () => import("./routes/NotFound") },
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
      <Route
        path={"/"}
        element={<Lazy importPromise={() => import("./routes/Main")} />}
      />
      <Route
        path={"/projects"}
        element={<Lazy importPromise={() => import("./routes/Projects")} />}
      />
      <Route
        path={"/contact"}
        element={<Lazy importPromise={() => import("./routes/Contact")} />}
      />
      <Route
        path={"/project/:id"}
        element={<Lazy importPromise={() => import("./routes/Project")} />}
      />
      <Route
        path={"/404"}
        element={<Lazy importPromise={() => import("./routes/NotFound")} />}
      />
      <Route path={"*"} element={<Navigate to={"/404"} replace />} />
    </RouteGroup>
  );
}
