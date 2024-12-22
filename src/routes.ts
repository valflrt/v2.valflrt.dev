import { Routes, navigate } from "./router";
import { elapsedTime } from "./util";
import { div, a, h1, p, span, img, code, button } from "./rendering";

import * as icons from "./assets/icons";

import logo256 from "./assets/logo/logo-3-256.png";

import projects from "./projects";

/**
 * This is the route object, order is important since it is
 * used to animate correctly transitions between routes.
 *
 * Example: /projects is on the "left" of /home therefore
 * the transition from /projects to /home must be animated
 * from left to right (see index.ts at line 25).
 */
const routes: Routes = [
  {
    id: "project",
    path: "/project/:id",
    render: ({ params }) => {
      let id = params.id;
      let project = projects.find((p) => p.id === id);

      if (!id || !project) {
        navigate("/404", true);
        return "";
      }

      document.title = `${project.id} – valflrt.dev`;

      return [
        div(
          { class: "card" },
          div(
            { class: "header" },
            div({ class: "title code" }, `valflrt/${project.id}`),
            project.used &&
              div({ class: "icons" }, ...project.used.map((v) => icons[v]))
          ),
          div(
            { class: "description" },
            div(
              { class: "text" },
              typeof project.description == "string"
                ? project.description
                : project.description()
            )
          )
        ),
        project.links &&
          div(
            { class: "container row wrap center-stretch" },
            ...project.links.map((l) =>
              a(
                { href: l.url, class: "button clickable" },
                l.name,
                l.icon ? icons[l.icon] : icons.externalLink
              )
            ),
            a(
              { href: "#/projects", class: "button clickable" },
              `Back to projects ${icons.list}`
            )
          ),
      ].join("");
    },
  },
  {
    id: "projects",
    name: "Projects",
    path: "/projects",
    render: [
      h1({ class: "main-title" }, "Projects"),
      p({ class: "description" }, "Here are some of my favorite projects !"),
      div(
        { class: "list" },
        ...projects.map((p) =>
          a(
            { href: `#/project/${p.id}`, class: "item card" },
            div(
              { class: "header" },
              div({ class: "title code" }, `valflrt/${p.id}`),
              p.used && div({ class: "icons" }, ...p.used.map((v) => icons[v]))
            ),
            div(
              { class: "description" },
              div(
                { class: "text" },
                typeof p.description == "string"
                  ? p.description
                  : p.description()
              ),
              span({ class: "underlined" }, "Read More")
            )
          )
        )
      ),
      a(
        {
          href: "https://github.com/valflrt?tab=repositories",
          class: "button clickable",
        },
        `See more on github ${icons.github}`
      ),
    ].join(""),
  },
  {
    id: "home",
    name: "Home",
    path: "/",
    render: [
      img({
        class: "logo",
        src: logo256,
        alt: "valflrt's profile picture",
        width: "128",
        height: "128",
      }),
      h1({ class: "main-title" }, "Heya !"),
      div(
        { class: "description" },
        p(
          {},
          "I am Valentin Fleurit aka valflrt, <br /> a programming enthusiast born at " +
            code(
              {
                class: "birthDate code",
                title: `Alive for approximately ${elapsedTime(
                  1108132680 * 1000
                )}`,
              },
              "1108132680"
            ) +
            "."
        ),
        p(
          {},
          "Math+Physics wizard in progress... I like harsh-melodic music as well as hiking, sailing and swimming."
        ),
        p({}, "French and proud to be (oui oui baguette).")
      ),
      div(
        {
          class: "container row wrap center-stretch",
        },
        a(
          {
            href: "#/projects",
            class: "button clickable",
          },
          `Projects ${icons.list}`
        ),
        a(
          {
            href: "#/contact",
            class: "button clickable",
          },
          `Contact ${icons.user}`
        )
      ),
    ].join(""),
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    render: [
      h1({ class: "main-title" }, "Contact"),
      p(
        { class: "description" },
        "Feel free to send me a message, I would appreciate it !"
      ),
      div(
        { class: "container row wrap center-stretch" },
        a(
          {
            href: "https://github.com/valflrt",
            class: "button clickable",
          },
          `Github ${icons.github}`
        ),
        a(
          {
            href: "https://instagram.com/valflrt",
            class: "button clickable",
          },
          `Instagram ${icons.instagram}`
        ),
        button(
          {
            "data-copy": "valflrt",
            class: "button clickable copy",
          },
          `Discord ${icons.discord}`
        ),
        a(
          {
            href: "https://bsky.app/profile/valflrt.dev",
            class: "button clickable",
          },
          `Bluesky ${icons.bluesky}`
        ),
        button(
          {
            "data-copy": "valflrt@pm.me",
            class: "button clickable copy",
          },
          `Email ${icons.atSign}`
        )
      ),
    ].join(""),
  },
  {
    id: "not_found",
    name: "404 Not Found",
    path: "/404",
    render: [
      h1({ class: "main-title forty-hundred-and-four" }, "404"),
      p({ class: "description" }, "There's nothing here !"),
      a({ href: "#/", class: "clickable button" }, "Back Home"),
    ].join(""),
  },
];

export default routes;
