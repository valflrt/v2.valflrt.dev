import { ProjectObject } from "../types";

const projects: ProjectObject[] = [
  {
    name: "Fencryption (rust)",
    id: "fencryption-rust",
    description:
      "A remake of the original Fencryption but in Rust because typescript was not appropriate for this kind of project that requires working with io and crypto.",
    links: [
      {
        url: "https://github.com/valflrt/fencryption-rust",
        name: "Github",
      },
    ],
  },
  {
    name: "valflrt.dev (v2)",
    id: "valflrt.dev-v2",
    description:
      "My website, made using react and vitejs, it has some cool react hooks.",
    links: [
      {
        url: "https://github.com/valflrt/v2.valflrt.dev",
        name: "Github",
      },
    ],
  },
  {
    name: "Le Jardinier",
    id: "le-jardinier",
    description:
      "Simple utility/test discord bot made using typescript and discord.js.",
    links: [
      {
        url: "https://github.com/valflrt/lejardinier",
        name: "Github",
      },
      {
        url: "https://lejardinier.valflrt.dev/card",
        name: "Discord Invite",
      },
    ],
  },
  // {
  //   name: "Fencryption",
  //   id: "fencryption-typescript",
  //   description:
  //     'A simple cli program to encrypt/decrypt a file/directory made in typescript and "compiled" with vercel/pkg.',
  //   links: [
  //     {
  //       url: "https://github.com/valflrt/Fencryption",
  //       name: "github",
  //     },
  //   ],
  // },
];

export default projects;
