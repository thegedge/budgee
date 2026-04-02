import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, type Plugin } from "vitest/config";

const inContainer = existsSync("/.dockerenv");

function tryExec(cmd: string): string {
  try {
    return execSync(cmd).toString().trim();
  } catch {
    return "";
  }
}

const commitSha = (process.env.COMMIT_SHA ?? tryExec("git rev-parse HEAD")).slice(0, 7);
const commitDate = process.env.COMMIT_DATE ?? tryExec("git log -1 --format=%cI");
const commitSubject = process.env.COMMIT_SUBJECT ?? tryExec("git log -1 --format=%s");
const commitBody = process.env.COMMIT_BODY ?? tryExec("git log -1 --format=%b");

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
  plugins: [baseUrlPlugin(), svelte()],
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha),
    __COMMIT_DATE__: JSON.stringify(commitDate),
    __COMMIT_SUBJECT__: JSON.stringify(commitSubject),
    __COMMIT_BODY__: JSON.stringify(commitBody),
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
  },
});
