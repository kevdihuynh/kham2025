import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/',  // adjust if repo name differs
  plugins: [react()],
});

