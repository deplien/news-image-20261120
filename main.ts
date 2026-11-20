// The Daily World — a make.fun news-image-20261120 entry.
// The picture of the day is entry.png beside this file: a one-page tabloid
// front page summing up the world news of Friday, 20 November 2026.
// This program's whole job is to deliver those exact bytes to the grader:
// it copies entry.png into the output directory (MAKEFUN_OUTPUT_DIR when
// run locally, /output in the grader), unchanged, so the program runs
// with no network and two runs always write identical bytes.

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
// Guard the one thing the gate cares about: the bytes really are a PNG.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!readFileSync(src).subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG file');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.png');
copyFileSync(src, dest);
console.log(`wrote ${dest} (${statSync(dest).size} bytes)`);
