import { Routes, setLocation } from "./router";
import { $ } from "./util";

import { icons } from "feather-icons";
import * as brandIcons from "./assets/icons";

import logo256 from "./assets/icons/logo-256.png";

import projects from "./assets/projects";

const routes: Routes = [
  {
    id: "project",
    path: "/project/:id",
    render: ({ params }) => {
      let id = params.id;
      let project = projects.find((p) => p.id === id);

      if (!id || !project) {
        setLocation("/notfound");
        return "";
      }

      document.title = `${project.name} – valflrt.dev`;

      return [
        $("div", { class: "card" })(
          $("div", { class: "header" })(
            $("div", { class: "title code" })(`valflrt/${project.id}`),
            project.used &&
              $("div", { class: "icons" })(
                ...project.used.map((v) => brandIcons[v])
              )
          ),
          $("div", { class: "description" })(
            $("p", { class: "text" })(project.description)
          )
        ),
        project.links &&
          $("div", { class: "container row wrap center-stretch" })(
            ...project.links.map((l) =>
              $("a", { href: l.url, class: "button clickable" })(
                l.name,
                l.icon
                  ? icons[l.icon].toSvg({
                      class: "icon",
                      width: 16,
                      height: 16,
                    })
                  : icons["external-link"].toSvg({
                      class: "icon",
                      width: 16,
                      height: 16,
                    })
              )
            ),
            $("a", { href: "#/projects", class: "button clickable" })(
              `Back to projects ${icons.list.toSvg({
                class: "icon",
                width: 16,
                height: 16,
              })}`
            )
          ),
      ].join("");
    },
  },
  {
    id: "projects",
    name: "Projects",
    path: "/projects",
    update: () => (document.title = "Projects – valflrt.dev"),
    render: [
      $("h1", { class: "main-title" })("Projects"),
      $("p", { class: "description" })("Here are some of my projects !"),
      $("div", { class: "list" })(
        ...projects.map((p) =>
          $("a", { href: `#/project/${p.id}`, class: "item card" })(
            $("div", { class: "header" })(
              $("div", { class: "title code" })(`valflrt/${p.id}`),
              p.used &&
                $("div", { class: "icons" })(
                  ...p.used.map((v) => brandIcons[v])
                )
            ),
            $("div", { class: "description" })(
              $("div", { class: "text" })(p.description),
              $("span", { class: "underlined" })("Read More")
            )
          )
        ),
        $("a", {
          href: "https://github.com/valflrt?tab=repositories",
          class: "button clickable",
        })(`See more on github ${brandIcons.github}`)
      ),
    ].join(""),
  },
  {
    id: "home",
    name: "Home",
    path: "/",
    update: () => (document.title = "Home – valflrt.dev"),
    render: () => {
      let elapsedDays = (Date.now() / 1000 - 1108132073) / 60 / 60 / 24;

      return [
        $("img", {
          class: "logo",
          src: logo256,
          alt: "valflrt's profile picture",
          width: "128",
          height: "128",
        })(),
        $("h1", { class: "main-title" })("Heya !"),
        $("p", { class: "description" })(
          `I am Valentin Fleurit (aka valflrt), a programming enthusiast born at ${$(
            "code",
            {
              class: "birthDate code",
              title: `Alive for approximately ${Math.trunc(
                elapsedDays / 365
              ).toFixed()} years and ${(elapsedDays % 365).toFixed()} days`,
            }
          )(
            "1108132073"
          )}. French and proud to be (oui oui baguette). I also really like sailing and swimming.`
        ),
        $("div", {
          class: "container row wrap center-stretch",
        })(
          $("a", {
            href: "#/projects",
            class: "button clickable",
          })(
            `${icons.list.toSvg({
              class: "icon",
              width: 16,
              height: 16,
            })} Projects`
          ),
          $("a", {
            href: "#/contact",
            class: "button clickable",
          })(
            `${icons.user.toSvg({
              class: "icon",
              width: 16,
              height: 16,
            })} Contact`
          )
        ),
      ].join("");
    },
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    render: [
      $("h1", { class: "main-title" })("Contact"),
      $("p", { class: "description" })(
        "Feel free to send me a message, I would appreciate it !"
      ),
      $("div", { class: "container row wrap center-stretch" })(
        $("a", {
          href: "https://github.com/valflrt",
          class: "button clickable",
        })(`Github ${brandIcons.github}`),
        $("a", {
          href: "https://instagram.com/valflrt",
          class: "button clickable",
        })(`Instagram ${brandIcons.instagram}`),
        $("button", {
          "data-copy": "valflrt",
          class: "button clickable copy",
        })(`Discord ${brandIcons.discord}`),
        $("button", {
          "data-copy": "valflrt@pm.me",
          class: "button clickable copy",
        })(
          `Email ${icons["at-sign"].toSvg({
            class: "icon",
            width: 20,
            height: 20,
          })}`
        )
      ),
    ].join(""),
  },
  {
    id: "not_found",
    name: "Not Found",
    path: "/404",
    render: [
      $("h1", { class: "main-title forty-hundred-and-four" })("404"),
      $("p", { class: "description" })("There's nothing here !"),
      $("a", { href: "#/", class: "clickable button" })("Back Home"),
    ].join(""),
  },
];

export default routes;
