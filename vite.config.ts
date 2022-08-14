import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/guitar-trainer/",
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [svelte()],
});
