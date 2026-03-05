import { execSync } from "node:child_process";
import { defineConfig } from "vitest/config";

const commitSha = execSync("git rev-parse --short HEAD").toString().trim();
const commitDate = execSync("git log -1 --format=%cI").toString().trim();

export default defineConfig({
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
