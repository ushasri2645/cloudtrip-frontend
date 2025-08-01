import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      exclude: [
        "dist/",
        "**/*.d.ts",
        "vite.config.*",
        "eslint.config.*",
        "src/main.tsx",
        "src/types",
      ],
    },
  },
});