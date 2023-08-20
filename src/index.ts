import { createRouter } from "./router";
import { addWindowEventListeners } from "./util";

const routes = [
  {
    name: "Project",
    path: "/project/:id",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Main",
    path: "/",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

let router = createRouter(routes, (route, params) => {
  console.log(route, params);
});

addWindowEventListeners(["hashchange", "load"], router);
