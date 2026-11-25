import * as fs from "node:fs";
import * as path from "node:path";

// The single office joke this entry submits. It stays exactly as written:
// one line, one laugh, nothing added after this point.
const LINE =
  "My coworker borrowed my phone charger in 2023, and now it has a better career than I do — it travels, meets new people, and never comes home.";

// Smallest and largest lengths the bounty allows for a one-line entry.
const SHORTEST_OK = 1;
const LONGEST_OK = 200;

// Count how many characters in a string are not plain blanks, so a line
// made only of spaces can never pass as a real joke.
function countVisibleChars(text: string): number {
  let visible = 0;
  for (const ch of text) {
    if (ch !== " " && ch !== "\t" && ch !== "\n" && ch !== "\r") {
      visible += 1;
    }
  }
  return visible;
}

// Decide whether a candidate line is a usable entry: it must fit inside
// the length cap and it must contain at least one visible character.
function lineIsUsable(text: string): boolean {
  if (text.length < SHORTEST_OK) {
    return false;
  }
  if (text.length > LONGEST_OK) {
    return false;
  }
  return countVisibleChars(text) > 0;
}

// Work out where the entry file goes. The harness may point somewhere
// else through the environment; otherwise fall back to an `out` folder
// sitting next to where the command was run.
function entryFilePath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? path.join(process.cwd(), "out");
  return path.join(dir, "entry.txt");
}

function main(): void {
  if (!lineIsUsable(LINE)) {
    throw new Error("entry line failed its length check");
  }
  const target = entryFilePath();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, LINE, "utf8");
}

main();
