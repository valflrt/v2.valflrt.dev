import { icons } from "feather-icons";
import { $ } from "../util";
import * as brandIcons from "./icons";

const projects: {
  id: string;
  description: string;
  links?: {
    url: string;
    name: string;
    icon?: keyof typeof icons;
  }[];
  used?: (keyof typeof brandIcons)[];
}[] = [
  {
    id: "fencryption",
    description:
      "A crypto util cli program to encrypt and decrypt files and directories. I first built it in typescript but decided to switch to Rust because typescript was not appropriate for this kind of project that requires working with io and crypto. I also wanted to try Rust and low-level programming.",
    links: [
      {
        url: "https://github.com/valflrt/fencryption",
        name: "Github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "v2.valflrt.dev",
    description:
      "This website, made using pure Typescript and ViteJs. It has some cool utility functions and a hash router built from scratch.",
    links: [
      {
        url: "https://github.com/valflrt/v2.valflrt.dev",
        name: "Github",
      },
    ],
    used: ["typescript", "vite"],
  },
  {
    id: "pixel_game",
    description: `A simple (crappy) pixel art "game", but I worked hard on the logic and implemented a struct called ${$(
      "span",
      { class: "code" }
    )("Mat")} similar to ${$("span", { class: "code" })(
      "Vec"
    )} but in two dimensions.`,
    links: [
      {
        url: "https://github.com/valflrt/pixel_game",
        name: "Github",
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
      "A simple neural network with two layers, inspired by several sources. It can for example act as a meh-accurate OR gate.",
    links: [
      {
        url: "https://github.com/valflrt/neural-network",
        name: "Github",
      },
    ],
    used: ["python"],
  },
];

export default projects;
