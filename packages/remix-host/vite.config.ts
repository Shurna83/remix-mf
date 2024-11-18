import { federation } from "@module-federation/vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/home.tsx", { index: true });
          route("mfe", "routes/mfe.tsx");
        });
      },
    }),
    tsconfigPaths(),
    federation({
      name: "remixHost",
      remotes: {
        mfe: "mfe@http://localhost:3000/mf-manifest.json",
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
    rollupOptions: {
      external: "mfe/awesomeText",
    },
  },
});
