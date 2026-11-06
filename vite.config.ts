import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    // Nitro is only needed for production builds.
    command === "build" ? nitro() : null,
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
    tsconfigPaths: true,
  },
}));
