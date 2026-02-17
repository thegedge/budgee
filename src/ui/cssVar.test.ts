import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

function collectFiles(dir: string, ext: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectFiles(full, ext));
    } else if (full.endsWith(ext) && !full.endsWith(".test.ts")) {
      results.push(full);
    }
  }
  return results;
}

describe("CSS variable declarations", () => {
  it("all var(--budgee-*) references should be declared in global.css", () => {
    const root = resolve(__dirname, "../..");
    const globalCss = readFileSync(join(root, "public/global.css"), "utf-8");
    const declaredVars = new Set<string>();
    for (const match of globalCss.matchAll(/--budgee-[\w-]+/g)) {
      declaredVars.add(match[0]);
    }

    const tsFiles = collectFiles(resolve(root, "src/ui"), ".ts");
    const undeclared = new Map<string, string[]>();

    for (const file of tsFiles) {
      const content = readFileSync(file, "utf-8");
      for (const match of content.matchAll(/var\((--budgee-[\w-]+)\)/g)) {
        const varName = match[1];
        if (!declaredVars.has(varName)) {
          const relPath = file.replace(root + "/", "");
          if (!undeclared.has(varName)) undeclared.set(varName, []);
          if (!undeclared.get(varName)!.includes(relPath)) {
            undeclared.get(varName)!.push(relPath);
          }
        }
      }
    }

    if (undeclared.size > 0) {
      const lines = [...undeclared.entries()].map(
        ([v, files]) => `  ${v} (used in ${files.join(", ")})`,
      );
      expect.fail(`Undeclared CSS variables:\n${lines.join("\n")}`);
    }
  });
});
