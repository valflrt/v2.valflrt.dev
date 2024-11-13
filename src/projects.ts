import * as icons from "./assets/icons";
import { p, span } from "./rendering";

const projects: {
  id: string;
  description: string | (() => string);
  links?: {
    url: string;
    name: string;
    icon?: keyof typeof icons;
  }[];
  used?: (keyof typeof icons)[];
}[] = [
  {
    id: "smarticles-fork",
    description: [
      p(
        {},
        "A particle simulation program forked from " +
          span(
            {
              class: "code",
            },
            "ChevyRay/smarticles"
          ) +
          ", to which I added some optimizations (I think ?) and features."
      ),
      p(
        {},
        "In the simulation there are six classes of particles. ",
        "Particles from one of the classes apply a class-specific attractive or repulsive force " +
          "to other particles."
      ),
      p(
        {},
        "Using spatial partitioning and a more efficient use of multithreading, I was able to " +
          "simulate tens of thousands of particles while rarely exceeding 50ms of update rate !"
      ),
      p({}, "I had a lot of fun working on this."),
    ].join(""),
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
      {
        url: "https://github.com/ChevyRay/smarticles",
        name: "Original Repository",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "v2.valflrt.dev",
    description: [
      p(
        {},
        "This website, made using Typescript and ViteJs. It has some cool utility functions and " +
          "a hash router built from scratch, some things might scratch your eyes tho."
      ),
      p({}, "(I'm pretty proud of it btw)"),
    ].join(""),
    links: [
      {
        url: "https://github.com/valflrt/v2.valflrt.dev",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["typescript", "vite"],
  },
  {
    id: "fencryption",
    description: [
      p(
        {},
        "A work-in-progress crypto util cli program to encrypt and decrypt files and directories."
      ),
      p(
        {},
        "I first built it in typescript but decided to switch to Rust because typescript was " +
          "(really) not appropriate for this kind of project that requires working with io and " +
          "crypto. I also wanted to try Rust and low-level programming."
      ),
    ].join(""),
    links: [
      {
        url: "https://github.com/valflrt/fencryption",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "pixel_game",
    description: [
      p(
        {},
        "A simple pixel art game (if we can call it that). The game draws the pixels to the " +
          "screen in the most inefficient way possible."
      ),
      p(
        {},
        "I created a struct called ",
        span({ class: "code" }, "Mat"),
        " similar to the common Rust ",
        span({ class: "code" }, "Vec"),
        " but in two dimensions, it holds the pixels that will be displayed on the screen (yes, " +
          "I know, it's just the worst way to do it) and can also be used to store textures/images."
      ),
      p({}, "I've spent way too much time on this for a meh result..."),
    ].join(""),
    links: [
      {
        url: "https://github.com/valflrt/pixel_game",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "omega_mandelbrot",
    description: [
      p(
        {},
        "A native app for Omega on the Numworks calculator that lets you explore the Mandelbrot " +
          "set with a reasonable maximum depth."
      ),
      p(
        {},
        "I also included the original python script, which I wrote entirely on my calculator, " +
          "starting from the basic Mandelbrot script included by default. This script was very " +
          "slow, to say the least, and I wanted to speed it up. The solution I found was to " +
          "implement it as a native Omega app."
      ),
    ].join(""),
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
