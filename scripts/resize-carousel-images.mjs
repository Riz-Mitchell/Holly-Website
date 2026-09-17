// One-off image optimization for the homepage carousel. The source photos are
// raw phone-camera originals (multi-megapixel) but only ever get displayed at
// a few hundred px tall — decoding all of them at full size on every repeat
// was the main cause of mobile scroll jank. This resizes each to a sane
// display resolution and re-encodes as WebP, writing a sibling file with the
// same base name so the originals are left untouched.
//
// Run with: bun run scripts/resize-carousel-images.mjs

import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const ASSETS_DIR = path.join(import.meta.dirname, "..", "src", "assets");

// Carousel images are displayed at up to 26rem (416px) tall on desktop.
// Target 2x that for retina screens, capped so ultra-wide originals don't
// balloon back up.
const TARGET_HEIGHT = 832;
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

const SOURCES = [
  "holly-hero-v2.jpeg",
  "HollyWorking.jpeg",
  "HollyWorkingWithBeeFrames.jpeg",
  "HollyWithWithTheBeeHive.jpeg",
  "HollyWithAChicken.jpeg",
  "HollyWorkingOnMoisturizer.jpeg",
  "HollyBuildingAHiveWithBrother.jpeg",
  "HollyWithMentor.jpeg",
  "SwimmingPicture.png",
  "holly-work.jpeg",
  "holly-work-2.jpeg",
];

const filesOnDisk = new Set(await readdir(ASSETS_DIR));

for (const file of SOURCES) {
  if (!filesOnDisk.has(file)) {
    console.warn(`skip (not found): ${file}`);
    continue;
  }
  const srcPath = path.join(ASSETS_DIR, file);
  const destPath = path.join(
    ASSETS_DIR,
    `${path.basename(file, path.extname(file))}.webp`,
  );

  const srcStat = await sharp(srcPath).metadata();
  await sharp(srcPath)
    // Auto-orient from EXIF before resizing/encoding: several of these phone
    // photos store their rotation as EXIF metadata rather than in the pixel
    // data. WebP output doesn't get auto-rotated by browsers the way JPEGs
    // with EXIF do, so without this the converted files come out sideways.
    .rotate()
    .resize({
      height: TARGET_HEIGHT,
      width: MAX_WIDTH,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toFile(destPath);

  const destStat = await sharp(destPath).metadata();
  const srcBytes = Bun.file(srcPath).size;
  const destBytes = Bun.file(destPath).size;

  console.log(
    `${file} (${srcStat.width}x${srcStat.height}, ${(srcBytes / 1024).toFixed(0)}KB) -> ` +
      `${path.basename(destPath)} (${destStat.width}x${destStat.height}, ${(destBytes / 1024).toFixed(0)}KB)`,
  );
}
