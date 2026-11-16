// Downloads activity cover photos from Wikimedia Commons and records credits.
//
//   node scripts/fetch-activity-images.mjs
//
// Sources live in scripts/activity-image-sources.json as { activityId: "File:..." } for
// Wikimedia Commons, or { activityId: { url, width, height, author, license, licenseUrl, sourceUrl } }
// for anything else (e.g. Flickr photos found via Openverse).
// Output: public/images/activities/<id>.jpg and lib/activity-images.json.
// Already-downloaded images are skipped, so the script is safe to re-run.

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCES = path.join(ROOT, "scripts/activity-image-sources.json");
const OUT_DIR = path.join(ROOT, "public/images/activities");
const MANIFEST = path.join(ROOT, "lib/activity-images.json");
// 1280 is one of Wikimedia's standard thumbnail widths (non-standard widths are throttled harder).
const WIDTH = 1280;
const HEADERS = { "User-Agent": "madison-bucket-list-student-project/0.1" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(30_000) }).catch(
      (err) => ({ ok: false, status: err.name }),
    );
    if (res.ok) return res;
    console.warn(`  ${res.status} on attempt ${i + 1}, backing off`);
    await sleep(5_000 * (i + 1));
  }
  throw new Error(`Failed to fetch ${url}`);
}

// Commons "Artist" is HTML and often includes wiki signatures like "Name (talk) 21:37, 5 February 2008 (UTC)".
const cleanAuthor = (s = "") =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/\(talk\)/g, "")
    .replace(/\d{1,2}:\d{2}, \d{1,2} \w+ \d{4} \(UTC\)/g, "")
    .replace(/\s+/g, " ")
    .trim();

async function main() {
  const sources = JSON.parse(await readFile(SOURCES, "utf8"));
  const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, "utf8")) : {};
  await mkdir(OUT_DIR, { recursive: true });

  // Non-Commons sources (e.g. Flickr via Openverse) carry their own credit metadata.
  for (const [id, src] of Object.entries(sources)) {
    if (typeof src === "string") continue;
    const file = path.join(OUT_DIR, `${id}.jpg`);
    if (!existsSync(file) || manifest[id]?.sourceUrl !== src.sourceUrl) {
      console.log(`↓ ${id}`);
      await writeFile(file, Buffer.from(await (await fetchWithRetry(src.url)).arrayBuffer()));
      await sleep(1_500);
    } else {
      console.log(`· ${id} (cached)`);
    }
    manifest[id] = {
      src: `/images/activities/${id}.jpg`,
      width: src.width,
      height: src.height,
      author: src.author,
      license: src.license,
      licenseUrl: src.licenseUrl ?? null,
      sourceUrl: src.sourceUrl,
    };
  }

  // One API call for all Commons file metadata (the API accepts up to 50 titles).
  const titles = Object.values(sources).filter((s) => typeof s === "string");
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "imageinfo",
    iiprop: "url|size|extmetadata",
    iiurlwidth: String(WIDTH),
    titles: titles.join("|"),
  });
  const data = await (await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${params}`)).json();
  const q = data.query;
  const rename = Object.fromEntries((q.normalized ?? []).map((n) => [n.from, n.to]));
  const byTitle = Object.fromEntries(Object.values(q.pages).map((p) => [p.title, p]));

  for (const [id, rawTitle] of Object.entries(sources)) {
    if (typeof rawTitle !== "string") continue;
    const page = byTitle[rename[rawTitle] ?? rawTitle];
    const info = page?.imageinfo?.[0];
    if (!info) {
      console.error(`✗ ${id}: ${rawTitle} not found on Commons`);
      continue;
    }
    const file = path.join(OUT_DIR, `${id}.jpg`);
    // Small originals have no thumbnail larger than themselves; use the original.
    const url = info.width > WIDTH ? info.thumburl : info.url;
    const width = info.width > WIDTH ? info.thumbwidth : info.width;
    const height = info.width > WIDTH ? info.thumbheight : info.height;

    if (!existsSync(file) || manifest[id]?.sourceUrl !== info.descriptionurl) {
      console.log(`↓ ${id}`);
      const buf = Buffer.from(await (await fetchWithRetry(url)).arrayBuffer());
      await writeFile(file, buf);
      await sleep(1_500);
    } else {
      console.log(`· ${id} (cached)`);
    }

    const meta = info.extmetadata ?? {};
    manifest[id] = {
      src: `/images/activities/${id}.jpg`,
      width,
      height,
      author: cleanAuthor(meta.Artist?.value) || "Unknown",
      license: meta.LicenseShortName?.value ?? "See source",
      licenseUrl: meta.LicenseUrl?.value ?? null,
      sourceUrl: info.descriptionurl,
    };
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`Wrote ${Object.keys(sorted).length} entries to lib/activity-images.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
