#!/usr/bin/env node
/**
 * Saves a snapshot of the Pinterest board to public/data/images.json.
 *
 *   npm run snapshot:pinterest
 *
 * The site reads the board live through /api/pinterest, so this is optional.
 * The snapshot is only used when Pinterest cannot be reached, and as a place to
 * keep hand-set cover flags ({ "url": "...", "cover": true }) for sections
 * with no pin titled "cover". Those flags are preserved when re-snapshotting.
 *
 * Needs Node 22.18+ (runs the shared TypeScript module directly).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { credentialsFromEnv, fetchBoard } from "../server/pinterestBoard.ts";

const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/data/images.json");

const urlOf = (entry) => (typeof entry === "string" ? entry : entry.url);
const isCover = (entry) => typeof entry === "object" && entry?.cover;

function readHandCovers() {
  if (!existsSync(OUTPUT)) return new Set();
  const current = JSON.parse(readFileSync(OUTPUT, "utf8"));
  return new Set(
    Object.values(current)
      .flatMap((group) => (Array.isArray(group) ? group : Object.values(group)))
      .filter(isCover)
      .map(urlOf),
  );
}

try {
  const handCovers = readHandCovers();
  const { library, source } = await fetchBoard(credentialsFromEnv(process.env));
  console.log(`Source: ${source}`);

  for (const [slug, group] of Object.entries(library)) {
    const entries = Object.entries(group);
    if (!entries.some(([, entry]) => isCover(entry))) {
      const kept = entries.find(([, entry]) => handCovers.has(urlOf(entry)));
      if (kept) group[kept[0]] = { url: urlOf(kept[1]), cover: true };
    }
    console.log(`  ${slug.padEnd(22)} ${String(entries.length).padStart(3)} images`);
  }

  writeFileSync(OUTPUT, `${JSON.stringify(library, null, 2)}\n`, "utf8");
  console.log(`Saved ${Object.keys(library).length} sections to public/data/images.json`);
} catch (error) {
  console.error(`Pinterest snapshot failed: ${error.message}`);
  process.exitCode = 1;
}
