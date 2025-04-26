/// <reference path="../../index.d.ts" />

import { a, p, unit } from "./html.js";

/**
 * @type {Project[]}
 */
const projects = [
  {
    id: "smarticles-fork",
    description: () =>
      unit(
        p(
          {},
          "A particle simulation program forked from ",
          a(
            {
              href: "https://github.com/ChevyRay/smarticles",
              target: "_blank",
              class: "code link",
            },
            "ChevyRay/smarticles",
          ),
          ", to which I added some optimizations (I think ?) and features.",
        ),
        p(
          {},
          "It was also inspired from ",
          a(
            {
              href: "https://www.youtube.com/watch?v=p4YirERTVF0",
              target: "_blank",
              class: "link",
            },
            "this video",
          ),
          ".",
        ),
        p(
          {},
          "In the simulation there are six classes of particles. Particles from one of the classes apply a class-specific attractive or repulsive force to other particles.",
        ),
        p(
          {},
          "Using spatial partitioning and multithreading, I was able to simulate tens of thousands of particles while rarely exceeding 50ms of update rate !",
        ),
        p(
          {},
          "I had a lot of fun working on this, so much that I made it the focus of my ",
          a(
            {
              href: "https://fr.wikipedia.org/wiki/Travail_d%27initiative_personnelle_encadr%C3%A9",
              target: "_blank",
              class: "link",
            },
            "TIPE",
          ),
          " presentation in prépa.",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/smarticles-fork",
        name: "Github",
        icon: "github",
      },
      {
        url: "https://github.com/valflrt/smarticles-fork/releases/latest",
        name: "Try it !",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "fractal_rndr",
    description: () =>
      unit(
        p(
          {},
          "This is a program for rendering fractals, it has a simple gui and offers various types of fractals to explore.",
        ),
        p(
          {},
          "I am very happy with this project because I managed to generate some really cool fractals (at least I think they are). If you want to check out some examples, feel free to head over to the ",
          a(
            {
              href: "https://github.com/valflrt/fractal_rndr",
              target: "_blank",
              class: "link",
            },
            " project's github page",
          ),
          " !",
        ),
        p(
          {},
          "I also tried to implement anti-aliasing and thanks to ",
          a(
            {
              href: "https://www.deviantart.com/lyc/gallery",
              target: "_blank",
              class: "link",
            },
            "lycium",
          ),
          " and ",
          a(
            {
              href: "https://www.deviantart.com/rychveldir/",
              target: "_blank",
              class: "link",
            },
            "rychveldir",
          ),
          ", it is now working pretty well !",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/fractal_rndr",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "v2.valflrt.dev",
    description: () =>
      unit(
        p(
          {},
          "This is the website you're currently viewing. At first, I used TypeScript and Vite.js, but it is now 100% pure html+js+css !",
        ),
        p(
          {},
          " It has some cool utility functions and a hash router built from scratch. Some parts might not be the prettiest to look at though...",
        ),
        p({}, "(I'm pretty proud of it btw)"),
      ),
    links: [
      {
        url: "https://github.com/valflrt/v2.valflrt.dev",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["html", "javascript"],
  },
  {
    id: "fencryption",
    description: () =>
      unit(
        p(
          {},
          "An unfinished crypto util cli program to encrypt and decrypt files and directories.",
        ),
        p(
          {},
          "I first built it in typescript but decided to switch to Rust because typescript was (really) not appropriate for this kind of project that requires working with io and crypto. I also wanted to try Rust and low-level programming.",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/fencryption",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  // {
  //   id: "pixel_game",
  //   description: () =>
  //     unit(
  //       p(
  //         {},
  //         "A simple pixel art game (if we can call it that). The game draws the pixels to the screen in the most inefficient way possible.",
  //       ),
  //       p(
  //         {},
  //         "Something kind of interesting is that I created a struct called ",
  //         span({ class: "code" }, "Mat"),
  //         " similar to the common Rust ",
  //         span({ class: "code" }, "Vec"),
  //         " but in two dimensions, it holds the pixels that will be displayed on the screen (yes, ",
  //         "I know, it's just the worst way to do it) and can also be used to store textures/images.",
  //       ),
  //       p(
  //         {},
  //         "But still, I've spent way too much time on this for a meh result...",
  //       ),
  //     ),
  //   links: [
  //     {
  //       url: "https://github.com/valflrt/pixel_game",
  //       name: "Github",
  //       icon: "github",
  //     },
  //   ],
  //   used: ["rust"],
  // },
  {
    id: "omega_mandelbrot",
    description: () =>
      unit(
        p(
          {},
          "A native app for Omega on the Numworks calculator that lets you explore the Mandelbrot set with a reasonable maximum depth.",
        ),
        p(
          {},
          "I also included the original python script, which I wrote entirely on my calculator, starting from the basic Mandelbrot script included by default (took ages). This script was very slow, to say the least, and I wanted to speed it up. The solution I found was to implement it as a native ",
          a({ href: "https://getomega.dev/", target: "_blank" }, "Omega"),
          " app.",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/omega_mandelbrot",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["cplusplus"],
  },
];

export default projects;
