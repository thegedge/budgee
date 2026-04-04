import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, type Plugin } from "vitest/config";

const inContainer = existsSync("/.dockerenv");

const commitSha =
  process.env.COMMIT_SHA?.slice(0, 7) ?? execSync("git rev-parse --short HEAD").toString().trim();
const commitDate = process.env.COMMIT_DATE ?? execSync("git log -1 --format=%cI").toString().trim();
let commitMessage = "";
try {
  commitMessage = execSync("git log -1 --format=%s").toString().trim();
} catch {
  // git unavailable in CI — tooltip will be empty
}

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

const basePath = process.env.VITE_BASE_URL ? new URL(process.env.VITE_BASE_URL).pathname : "/";

export default defineConfig({
  base: basePath,
  build: { sourcemap: true },
  plugins: [baseUrlPlugin(), svelte()],
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha),
    __COMMIT_DATE__: JSON.stringify(commitDate),
    __COMMIT_MESSAGE__: JSON.stringify(commitMessage),
  },
  server: {
    watch: inContainer ? { usePolling: true } : undefined,
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./scripts/test-setup.ts"],
    pool: "threads",
    isolate: false,
    exclude: ["**/node_modules/**", "**/.claude/worktrees/**"],
  },
});
