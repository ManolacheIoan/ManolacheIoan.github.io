// Turns the screenshots in assets/projects/ into small WebP files in public/projects/.
// Run after adding or replacing a screenshot:  npm run images
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/projects";
const OUT = "public/projects";
const WIDTHS = [640, 960, 1200];

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  for (const w of WIDTHS) {
    await sharp(path.join(SRC, file))
      .resize({ width: w, height: Math.round((w * 750) / 1200), fit: "cover", position: "top" })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  console.log("✓", name);
}
