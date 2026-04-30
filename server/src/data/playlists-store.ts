import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dbPath = path.join(process.cwd(), "src/data/db.json");

export async function readPlaylists() {
  const raw = await readFile(dbPath, "utf-8");
  return JSON.parse(raw);
}

export async function writePlaylists(playlists: unknown) {
  await writeFile(dbPath, JSON.stringify(playlists, null, 2));
}
