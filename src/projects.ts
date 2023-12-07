import { $ } from "./util";
import * as icons from "./assets/icons";

const projects: {
  id: string;
  description: string;
  links?: {
    url: string;
    name: string;
    icon?: keyof typeof icons;
  }[];
  used?: (keyof typeof icons)[];
}[] = [
  {
    id: "fencryption",
    description:
      "A work-in-progress crypto util cli program to encrypt and decrypt files and directories. I first built it in typescript but decided to switch"
        .concat(
          " to Rust because typescript was (really) not appropriate for this kind of project that requires working with io and crypto. I also wanted to"
        )
        .concat(" try Rust and low-level programming."),
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
    id: "v2.valflrt.dev",
    description:
      "This website, made using Typescript and ViteJs. It has some cool utility functions and a hash router built from scratch. (I'm pretty proud of it btw)",
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
    description: `A simple pixel art game (if we can call it that). I tried to implement the rendering from scratch which wasn't a good idea. I created a struct called ${$(
      "span",
      { class: "code" }
    )("Mat")} similar to the common Rust ${$("span", { class: "code" })(
      "Vec"
    )} but in two dimensions, it holds the pixels that will be displayed on the screen (yes I know, it's just the worst way to do it) and can also be used to store textures/images.`,
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
    description:
      "A neural network with two layers, inspired by several sources. It can for example act as a meh-accurate OR gate (or do greater things I guess). You might find weird things in it".concat(
        " since I don't know what is the derivative of a matrix expression (no but really if someone knows how to do it please tell me)."
      ),
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
