import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/kham2025/',  // adjust if repo name differs
  plugins: [react()],
});

