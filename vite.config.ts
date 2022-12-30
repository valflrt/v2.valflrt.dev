import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

let root = __dirname;

export default defineConfig({
  mode: process.env.MODE,
  root,
  plugins: [react()],
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
});
