import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [target, outDirArg] = process.argv.slice(2);

if (!target) {
  throw new Error("Usage: node scripts/prepare-dist.mjs <chrome|firefox> [outDir]");
}

const outDir = outDirArg ?? path.join("dist", target);
const publicDir = "public";

const commonManifest = await readJson(path.join(publicDir, "manifest.common.json"));
const targetManifest = await readJson(path.join(publicDir, `manifest.${target}.json`));
const manifest = mergeManifest(commonManifest, targetManifest);

await mkdir(outDir, { recursive: true });
await copyPublicAssets(publicDir, outDir);
await writeFile(
  path.join(outDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function mergeManifest(base, override) {
  const result = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = mergeManifest(result[key], value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

async function copyPublicAssets(fromDir, toDir) {
  const entries = await readdir(fromDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.startsWith("manifest.")) {
      continue;
    }

    await cp(path.join(fromDir, entry.name), path.join(toDir, entry.name), {
      recursive: true,
    });
  }
}
