/// <reference path="../../index.d.ts" />

import { a, br, button, code, div, h1, img, p, span, unit } from "./html.js";
import icon from "./icons.js";
import { artists, songs } from "./music.js";
import projects from "./projects.js";
import { navigate } from "./router.js";
import { elapsedTime, shuffle } from "./util.js";

/**
 * @type {Route[]}
 */
const routes = [
  {
    id: "home",
    name: "Home",
    path: "/",
    pos: { x: 0, y: 0 },
    content: () =>
      unit(
        img({
          class: "logo",
          src: "logo/logo-256.webp",
          alt: "valflrt's profile picture",
          width: "128",
          height: "128",
        }),
        h1({ class: "title" }, "Heya !"),
        div(
          { class: "description" },
          p(
            {},
            "I am Valentin Fleurit aka valflrt,",
            br(),
            "a programming enthusiast born at ",
            code(
              {
                class: "birthDate code",
                title: `Alive for approximately ${elapsedTime(
                  1108132680 * 1000,
                )}`,
              },
              "1108132680",
            ),
            ".",
          ),
          p(
            {},
            "Math+Physics wizard in progress... I like harsh-melodic ",
            a(
              {
                href: "#/music",
                class: "link",
              },
              "music",
            ),
            " as well as hiking, sailing and swimming.",
          ),
          p({}, "French and proud to be (oui oui baguette)."),
        ),
        div(
          {
            class: "links",
          },
          a(
            {
              href: "#/projects",
              class: "button clickable",
            },
            "Projects",
            icon("list"),
          ),
          a(
            {
              href: "#/social",
              class: "button clickable",
            },
            "Social",
            icon("user"),
          ),
        ),
      ),
  },
  {
    id: "social",
    name: "Social",
    path: "/social",
    pos: { x: 1, y: -0.3 },
    content: () =>
      unit(
        h1({ class: "title" }, "Social"),
        p({ class: "description" }, "Here are some of my online connections !"),
        div(
          { class: "links" },
          a(
            {
              href: "https://github.com/valflrt",
              target: "_blank",
              class: "button clickable",
            },
            "Github",
            icon("github"),
          ),
          a(
            {
              href: "https://instagram.com/valflrt",
              target: "_blank",
              class: "button clickable",
            },
            "Instagram",
            icon("instagram"),
          ),
          button(
            {
              "data-copy": "valflrt",
              class: "button clickable copy",
            },
            "Discord",
            icon("discord"),
          ),
          a(
            {
              href: "https://www.deviantart.com/valflrt",
              target: "_blank",
              class: "button clickable",
            },
            "Deviant Art",
            icon("deviantart"),
          ),
          // a(
          //   {
          //     href: "https://bsky.app/profile/valflrt.dev",
          //     target: "_blank",
          //     class: "button clickable",
          //   },
          //   "Bluesky",
          //   icon("bluesky"),
          // ),
          button(
            {
              "data-copy": "valflrt@pm.me",
              class: "button clickable copy",
            },
            "Email",
            icon("atSign"),
          ),
        ),
      ),
  },
  {
    id: "projects",
    name: "Projects",
    path: "/projects",
    pos: { x: -1, y: -0.2 },
    content: () =>
      unit(
        h1({ class: "title" }, "Projects"),
        p({ class: "description" }, "Here are some of my favorite projects !"),
        div(
          { class: "list" },
          ...projects.map((p) =>
            a(
              { href: `#/project/${p.id}`, class: "item card" },
              div(
                { class: "header" },
                div({ class: "title code" }, `valflrt/${p.id}`),
                p.used &&
                  div({ class: "icons" }, ...p.used.map((v) => icon(v))),
              ),
              div(
                { class: "description" },
                div({ class: "text" }, p.description().textContent),
                span({ class: "underlined" }, "Read More"),
              ),
            ),
          ),
        ),
        a(
          {
            href: "https://github.com/valflrt?tab=repositories",
            class: "button clickable",
          },
          "See more on github",
          icon("github"),
        ),
      ),
  },
  {
    id: "project",
    path: "/project/:id",
    pos: { x: -2, y: 0.2 },
    content: (_, params) => {
      let id = params?.id;
      let project = projects.find((p) => p.id === id);

      if (!id || !project) {
        navigate("/404", true);
        return unit();
      }

      document.title = `${project.id} – valflrt.dev`;

      return unit(
        div(
          { class: "card" },
          div(
            { class: "header" },
            div({ class: "title code" }, `valflrt/${project.id}`),
            project.used &&
              div({ class: "icons" }, ...project.used.map((v) => icon(v))),
          ),
          div(
            { class: "description" },
            div({ class: "text" }, project.description()),
          ),
        ),
        project.links &&
          div(
            { class: "links" },
            ...project.links.map((l) =>
              a(
                { href: l.url, class: "button clickable", target: "_blank" },
                l.name,
                icon(l.icon ?? "externalLink"),
              ),
            ),
            a(
              { href: "#/projects", class: "button clickable" },
              "Back to projects",
              icon("list"),
            ),
          ),
      );
    },
  },
  {
    id: "music",
    name: "Music",
    path: "/music",
    pos: { x: 0, y: 2.5 },
    content: () =>
      unit(
        h1({ class: "title" }, "Music"),
        p({}, "Those are some songs I really like:"),
        div(
          { class: "songs" },
          ...shuffle(songs)
            .slice(0, 5)
            .map((song) =>
              a(
                {
                  href: song.link,
                  target: "_blank",
                  class: "clickable button",
                },
                span(
                  { class: "img-mask" },
                  img({
                    src: song.coverUrl,
                  }),
                ),
                span({}, song.name, span({ class: "artist" }, song.artist)),
              ),
            ),
        ),
        p({}, "Here are some of my favorite artists:"),
        div(
          { class: "artists" },
          ...shuffle(artists)
            .slice(0, 6)
            .map((artist) =>
              a(
                {
                  href: artist.link,
                  target: "_blank",
                  class: "clickable button",
                },
                span(
                  { class: "img-mask" },
                  img({
                    src: artist.ppUrl,
                  }),
                ),
                span({}, artist.name),
              ),
            ),
        ),
        p({ class: "faded" }, "randomized on page refresh"),
      ),
  },
  {
    id: "not_found",
    name: "404 Not Found",
    path: "/404",
    pos: { x: 0, y: -2 },
    content: () =>
      unit(
        h1({ class: "title glitch404" }, "404"),
        p({ class: "description" }, "There's nothing here !"),
        a({ href: "#/", class: "clickable button" }, "Back Home"),
      ),
  },
];

export default routes;
