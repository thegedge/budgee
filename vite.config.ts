import { execSync } from "node:child_process";
import { defineConfig, type Plugin } from "vitest/config";

const commitSha = execSync("git rev-parse --short HEAD").toString().trim();
const commitDate = execSync("git log -1 --format=%cI").toString().trim();

function baseUrlPlugin(): Plugin {
  return {
    name: "base-url",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const envUrl = process.env.VITE_BASE_URL;
        if (envUrl) {
          return html.replaceAll("%VITE_BASE_URL%", envUrl);
        }
        const serverUrl =
          ctx.server?.resolvedUrls?.network[0] ?? ctx.server?.resolvedUrls?.local[0] ?? "";
        return html.replaceAll("%VITE_BASE_URL%", serverUrl.replace(/\/$/, ""));
      },
    },
  };
}

export default defineConfig({
  plugins: [baseUrlPlugin()],
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha),
    __COMMIT_DATE__: JSON.stringify(commitDate),
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./scripts/test-setup.ts"],
    pool: "threads",
    isolate: false,
  },
});
