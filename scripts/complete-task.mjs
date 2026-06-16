import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const taskId = process.argv[2];

if (!taskId) {
  throw new Error("Task id is required. Example: npm run tasks:complete -- 001");
}

if (!/^\d{3}$/.test(taskId)) {
  throw new Error(`Invalid task id: ${taskId}. Expected format: 001`);
}

const trackerPath = path.join(root, "TRACKER.md");

if (!fs.existsSync(trackerPath)) {
  throw new Error("TRACKER.md not found.");
}

const content = fs.readFileSync(trackerPath, "utf-8");
const lines = content.split("\n");

let found = false;

const updatedLines = lines.map((line) => {
  const match = line.match(/^\|\s*(\d{3})\s*\|\s*(\[[x\s]\])\s*\|/i);

  if (!match) {
    return line;
  }

  const currentTaskId = match[1];

  if (currentTaskId !== taskId) {
    return line;
  }

  found = true;

  return line.replace(/\|\s*\[[x\s]\]\s*\|/i, "| [x] |");
});

if (!found) {
  throw new Error(`Task ${taskId} not found in TRACKER.md`);
}

fs.writeFileSync(trackerPath, updatedLines.join("\n"));

execFileSync("npx", ["--no-install", "prettier", "--write", "TRACKER.md"], {
  cwd: root,
  stdio: "inherit",
});

console.log(`Task ${taskId} completed.`);
