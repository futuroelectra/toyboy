import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/toyboy/", // required for GitHub Pages (https://futuroelectra.github.io/toyboy/)
  plugins: [react(), tailwindcss()],
});
