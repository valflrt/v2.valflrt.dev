import { Route, navigate } from "./router";
import { elapsedTime, shuffle as shuffle } from "./util";
import { div, a, h1, p, span, img, code, button, unit, br } from "./html";

import logo256 from "./assets/logo/logo-256.jpg";

import projects from "./projects";
import { artists, songs } from "./music";
import { icons, parseSvg } from "./assets/icons";

const routes: Route[] = [
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
              div(
                { class: "icons" },
                ...project.used.map((v) => parseSvg(icons[v])),
              ),
          ),
          div(
            { class: "description" },
            div({ class: "text" }, project.description()),
          ),
        ),
        project.links &&
          div(
            { class: "container row wrap center-stretch" },
            ...project.links.map((l) =>
              a(
                { href: l.url, class: "button clickable", target: "_blank" },
                l.name,
                parseSvg(l.icon ? icons[l.icon] : icons.externalLink),
              ),
            ),
            a(
              { href: "#/projects", class: "button clickable" },
              "Back to projects",
              parseSvg(icons.list),
            ),
          ),
      );
    },
  },
  {
    id: "projects",
    name: "Projects",
    path: "/projects",
    pos: { x: -1, y: -0.2 },
    content: () =>
      unit(
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
                p.used &&
                  div(
                    { class: "icons" },
                    ...p.used.map((v) => parseSvg(icons[v])),
                  ),
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
          parseSvg(icons.github),
        ),
      ),
  },
  {
    id: "home",
    name: "Home",
    path: "/",
    pos: { x: 0, y: 0 },
    content: () =>
      unit(
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
              },
              "music",
            ),
            " as well as hiking, sailing and swimming.",
          ),
          p({}, "French and proud to be (oui oui baguette)."),
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
            "Projects",
            parseSvg(icons.list),
          ),
          a(
            {
              href: "#/social",
              class: "button clickable",
            },
            "Social",
            parseSvg(icons.user),
          ),
        ),
      ),
  },
  {
    id: "music",
    name: "Music",
    path: "/music",
    pos: { x: 0, y: 2.5 },
    content: () =>
      unit(
        h1({ class: "main-title" }, "Music"),

        p({}, "Oh... So you found my secret music display..."),

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
    id: "social",
    name: "Social",
    path: "/social",
    pos: { x: 1, y: -0.2 },
    content: () =>
      unit(
        h1({ class: "main-title" }, "Social"),
        p({ class: "description" }, "Here are some of my online connections !"),
        div(
          { class: "container row wrap center-stretch" },
          a(
            {
              href: "https://github.com/valflrt",
              target: "_blank",
              class: "button clickable",
            },
            "Github",
            parseSvg(icons.github),
          ),
          a(
            {
              href: "https://instagram.com/valflrt",
              target: "_blank",
              class: "button clickable",
            },
            "Instagram",
            parseSvg(icons.instagram),
          ),
          button(
            {
              "data-copy": "valflrt",
              class: "button clickable copy",
            },
            "Discord",
            parseSvg(icons.discord),
          ),
          // a(
          //   {
          //     href: "https://www.deviantart.com/valflrt",
          //     target: "_blank",
          //     class: "button clickable",
          //   },
          //   "Deviant Art",
          //   parseSvg(icons.deviantart),
          // ),
          a(
            {
              href: "https://bsky.app/profile/valflrt.dev",
              target: "_blank",
              class: "button clickable",
            },
            "Bluesky",
            parseSvg(icons.bluesky),
          ),
          button(
            {
              "data-copy": "valflrt@pm.me",
              class: "button clickable copy",
            },
            "Email",
            parseSvg(icons.atSign),
          ),
        ),
      ),
  },
  {
    id: "not_found",
    name: "404 Not Found",
    path: "/404",
    pos: { x: 0, y: -2 },
    content: () =>
      unit(
        h1({ class: "main-title forty-hundred-and-four" }, "404"),
        p({ class: "description" }, "There's nothing here !"),
        a({ href: "#/", class: "clickable button" }, "Back Home"),
      ),
  },
];

export default routes;
