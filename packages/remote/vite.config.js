import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe",
      exposes: {
        "./awesomeText": "./src/awesomeText",
      },
      filename: "mfe-[hash].js",
      manifest: true,
      shared: {
        react: { singleton: true },
        "react/": { singleton: true },
        "react-dom": { singleton: true },
        "react-dom/": { singleton: true },
      },
    }),
  ],
  build: {
    target: "chrome89",
  },
});
