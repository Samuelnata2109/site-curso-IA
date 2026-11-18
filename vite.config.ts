import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
export default defineConfig({
  base: "/site-curso-IA/",
  plugins: [react(), tailwind()],
});
