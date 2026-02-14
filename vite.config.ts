import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./", // relative paths work at any URL (e.g. .../toyboy/ or .../toyboy/index.html)
  plugins: [react(), tailwindcss()],
});
