import { ProjectObject } from "../types";

const projects: ProjectObject[] = [
  {
    name: "fencryption",
    id: "fencryption",
    description:
      "A crypto util cli program that encrypts/decrypts files and directories. I first built it in typescript but decided to switch to Rust because typescript was not appropriate for this kind of project that requires working with io and crypto. I also wanted to try Rust and low-level programming.",
    links: [
      {
        url: "https://github.com/valflrt/fencryption",
        name: "Github",
      },
    ],
  },
  {
    name: "valflrt.dev (v2)",
    id: "v2.valflrt.dev",
    description:
      "This website, made using react and vitejs, it has some cool react hooks too.",
    links: [
      {
        url: "https://github.com/valflrt/v2.valflrt.dev",
        name: "Github",
      },
    ],
  },
  {
    name: "pixel_game",
    id: "pixel_game",
    description: "A simple and inefficient helper to build pixel art games.",
    links: [
      {
        url: "https://github.com/valflrt/pixel_game",
        name: "Github",
      },
    ],
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
  //     {
  //       url: "https://lejardinier.valflrt.dev/card",
  //       name: "Discord Invite",
  //     },
  //   ],
  // },
  {
    name: "Neural Network",
    id: "neural-network",
    description: "A 2-layered neural network, inspired by several sources.",
    links: [
      {
        url: "https://github.com/valflrt/neural-network",
        name: "Github",
      },
    ],
  },
];

export default projects;
