import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

let root = __dirname;

export default defineConfig({
  mode: process.env.MODE,
  root: root,
  plugins: [react()],
  base: "",
  build: {
    outDir: "build",
    sourcemap: true,
    emptyOutDir: true,
  },
});
