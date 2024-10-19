import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      allow: ["../../"],
    },
    host: "0.0.0.0",
    port: 3206,
    //https: { key: "/Users/a1/p/dec/ssl/fullchain.pem", cert: "/Users/a1/p/dec/ssl/privkey.pem", },
  },
});
