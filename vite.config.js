import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // auto-open report after build
      filename: "bundle-report.html", // file it generates
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
