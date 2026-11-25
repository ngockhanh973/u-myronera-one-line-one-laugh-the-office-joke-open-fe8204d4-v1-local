import * as fs from 'node:fs';
import * as path from 'node:path';

const LINE =
  'My coworker borrowed my phone charger in 2023, and now it has a better career than I do — it travels, meets new people, and never comes home.';

function pickFolder(): string {
  const supplied = process.env.MAKEFUN_OUTPUT_DIR;
  if (supplied !== undefined && supplied !== '') {
    return supplied;
  }
  return path.resolve('out');
}

function main(): void {
  // The gate refuses a line outside 1..200 characters or only whitespace,
  // so check both before writing anything.
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(
      `entry runs ${LINE.length} characters; the gate only accepts 1 to 200`,
    );
  }
  const folder = pickFolder();
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.resolve(folder, 'entry.txt'), LINE, 'utf8');
}

main();
