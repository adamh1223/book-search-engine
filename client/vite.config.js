import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../server/static", // Output directory for build files
    rollupOptions: {
      input: {
        main: "./index.html", // Entry point for the build
      },
    },
  },
});
