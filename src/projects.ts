import { $ } from "./util";
import * as icons from "./assets/icons";

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
    id: "fencryption",
    description: [
      $("p")(
        "A work-in-progress crypto util cli program to encrypt and decrypt files and directories."
      ),
      $("p")(
        "I first built it in typescript but decided to switch to Rust because typescript was (really) not appropriate for this kind of project that requires working with io and crypto. I also wanted to try Rust and low-level programming."
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
    id: "smarticles-fork",
    description: [
      $("p")(
        `A particle simulation program forked from ${$("span", {
          class: "code",
        })(
          "ChevyRay/smarticles"
        )} to which I added some optimizations (I think ?) and features.`
      ),
      $("p")(
        "In the simulation there are 8 classes of particles.",
        "Particles from one of the classes apply a class-specific attractive or repulsive force on other particles."
      ),
      $("p")(
        "Thanks to multithreading the movement of around 5000 particles can be simulated with an update rate of 50ms."
      ),
      $("p")("I had a lot of fun working on this."),
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
      $("p")(
        "This website, made using Typescript and ViteJs. It has some cool utility functions and a hash router built from scratch, some might hurt your eyes tho."
      ),
      $("p")("(I'm pretty proud of it btw)"),
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
    id: "pixel_game",
    description: [
      $("p")(
        "A simple pixel art game (if we can call it that). The game draws the pixels to the screen in the most inefficient way possible."
      ),
      $("p")(
        "I created a struct called ",
        $("span", { class: "code" })("Mat"),
        " similar to the common Rust ",
        $("span", { class: "code" })("Vec"),
        " but in two dimensions, it holds the pixels that will be displayed on the screen (yes I know, it's just the worst way to do it) and can also be used to store textures/images."
      ),
      $("p")("I've spent way too much time on this for a meh result..."),
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
  // {
  //   name: "Le Jardinier",
  //   id: "lejardinier",
  //   description:
  //     "Simple utility/test discord bot made using typescript and discord.js.",
  //   links: [
  //     {
  //       url: "https://github.com/valflrt/lejardinier",
  //       name: "Github",
  //     },
  //     {SiRust
  //       url: "https://lejardinier.valflrt.dev/card",
  //       name: "Discord Invite",
  //     },
  //   ],
  // },
  {
    id: "neural-network",
    description: [
      $("p")(
        "A python program for training a neural network with two layers, inspired by several sources. It can for example act as a meh-accurate XOR gate (or do greater things I guess)."
      ),
      $("p")(
        'You might find weird things in it since at the time I did\'t know how to find "the derivative" of a matrix expression.'
      ),
    ].join(""),
    links: [
      {
        url: "https://github.com/valflrt/neural-network",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["python"],
  },
];

export default projects;
