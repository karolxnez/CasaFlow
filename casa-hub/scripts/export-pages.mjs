import fs from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(process.cwd(), "..");
const outDir = path.join(process.cwd(), "out");
const docsDir = path.join(rootDir, "docs");
const nextDir = path.join(docsDir, "_next");
const assetsDir = path.join(docsDir, "assets");
const repoBase = "/CasaFlow/_next/";
const publicBase = "/CasaFlow/assets/";

async function rmSafe(target) {
  await fs.rm(target, { recursive: true, force: true });
}

async function copyDir(source, target) {
  await fs.cp(source, target, { recursive: true });
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function shouldRewrite(filePath) {
  return [".html", ".txt", ".js", ".css"].includes(path.extname(filePath));
}

async function rewriteAssets(baseDir) {
  const files = await walk(baseDir);

  await Promise.all(
    files.filter(shouldRewrite).map(async (filePath) => {
      const current = await fs.readFile(filePath, "utf8");
      if (!current.includes(repoBase)) return;
      await fs.writeFile(filePath, current.split(repoBase).join(publicBase));
    }),
  );
}

async function main() {
  await rmSafe(docsDir);
  await copyDir(outDir, docsDir);
  await fs.writeFile(path.join(docsDir, ".nojekyll"), "");
  await fs.rename(nextDir, assetsDir);
  await rewriteAssets(docsDir);
}

await main();
