import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // IMPORTANT: This fixes the refresh 404 issue on Vercel
  server: {
    port: 5173,
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  // Output directory for Vercel
  build: {
    outDir: "dist",
  },

  // When deploying to Vercel, this ensures
  // React Router works on refresh
  preview: {
    port: 5173,
    strictPort: true,
  }
});