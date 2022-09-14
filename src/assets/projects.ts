import { ProjectObject } from "../types";

const projects: ProjectObject[] = [
  {
    name: "Fencryption (rust)",
    id: "fencryption-rust",
    description:
      "A remake of the original Fencryption but in Rust (because typescript was not the right language at all for this kind of project).",
    links: [
      {
        url: "https://github.com/valflrt/fencryption-rust",
        name: "github",
        icon: "GitHub",
      },
    ],
  },
  {
    name: "Fencryption",
    id: "fencryption-typescript",
    description:
      'A simple cli program to encrypt/decrypt a file/directory made in typescript and "compiled" with vercel/pkg.',
    links: [
      {
        url: "https://github.com/valflrt/Fencryption",
        name: "github",
        icon: "GitHub",
      },
    ],
  },
  {
    name: "Le Jardinier",
    id: "lejardinier",
    description:
      "Simple utility/test discord bot made using typescript and discord.js (with command system).",
    links: [
      {
        url: "https://github.com/valflrt/lejardinier",
        name: "github",
        icon: "GitHub",
      },
      {
        url: "https://lejardinier.valflrt.dev/card",
        name: "Discord Invite",
        icon: "Link2",
      },
    ],
  },
  {
    name: "valflrt.dev (v2)",
    id: "valflrt.dev",
    description:
      "My website, made using react and vitejs (some useful and cool react hooks are included).",
    links: [
      {
        url: "https://github.com/valflrt/valflrt.dev",
        name: "github",
        icon: "GitHub",
      },
    ],
  },
];

export default projects;
