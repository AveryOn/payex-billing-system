import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();

const taskListPath = path.join(root, "task-list.require.json");
const implementsDir = path.join(root, "implements");
const researchDir = path.join(root, "research");

const tasks = JSON.parse(fs.readFileSync(taskListPath, "utf-8"));

fs.mkdirSync(implementsDir, { recursive: true });
fs.mkdirSync(researchDir, { recursive: true });

const getTaskId = (name) => {
  const match = name.match(/^(\d{3})_/);
  if (!match) {
    throw new Error(`Invalid task name: ${name}. Expected format: 001_task_name`);
  }

  return match[1];
};

const existingImplDirs = fs
  .readdirSync(implementsDir, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

const requiredIds = new Set(tasks.map(getTaskId));

for (const taskName of tasks) {
  const taskId = getTaskId(taskName);

  const existingDir = existingImplDirs.find((dir) => dir.startsWith(`${taskId}_`));

  const targetImplPath = path.join(implementsDir, taskName);
  const targetResearchPath = path.join(researchDir, taskName);

  // Update existing file
  if (existingDir && existingDir !== taskName) {
    fs.renameSync(path.join(implementsDir, existingDir), targetImplPath);
  }

  if (!fs.existsSync(targetImplPath)) {
    fs.mkdirSync(path.join(targetImplPath, "src"), { recursive: true });

    fs.writeFileSync(
      path.join(targetImplPath, "README.md"),
      `# ${taskName}\n\n## Task\n\nTODO\n`,
    );

    fs.writeFileSync(
      path.join(targetImplPath, "src", "index.ts"),
      `console.log("${taskName}");\n`,
    );

    fs.writeFileSync(
      path.join(targetImplPath, "tsconfig.json"),
      JSON.stringify(
        {
          extends: "../../tsconfig.base.json",
          compilerOptions: {
            rootDir: "./src",
            outDir: "./dist",
          },
          include: ["src/**/*.ts"],
        },
        null,
        2,
      ),
    );

    fs.writeFileSync(
      path.join(targetImplPath, "execute.sh"),
      `#!/usr/bin/env bash
set -e

npx --no-install tsx src/index.ts
`,
    );

    fs.chmodSync(path.join(targetImplPath, "execute.sh"), 0o755);
  }

  if (!fs.existsSync(targetResearchPath)) {
    fs.mkdirSync(targetResearchPath, { recursive: true });

    fs.writeFileSync(
      path.join(targetResearchPath, "index.md"),
      `# ${taskName}\n\n## Research\n\nTODO\n`,
    );
  }
}

// DELETE TASK
for (const dir of existingImplDirs) {
  const taskId = getTaskId(dir);

  if (!requiredIds.has(taskId)) {
    fs.rmSync(path.join(implementsDir, dir), { recursive: true, force: true });
  }
}


//  DELETE RESEARCH DIR FOR DELETED TASK
const existingResearchDirs = fs
  .readdirSync(researchDir, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

for (const dir of existingResearchDirs) {
  const taskId = getTaskId(dir);

  if (!requiredIds.has(taskId)) {
    fs.rmSync(path.join(researchDir, dir), { recursive: true, force: true });
  }
}

const trackerPath = path.join(root, "TRACKER.md");

const normalizeTaskTitle = (taskName) => {
  return taskName.replace(/^\d{3}_/, "").replaceAll("_", " ");
};

const readExistingStatuses = () => {
  if (!fs.existsSync(trackerPath)) {
    return new Map();
  }

  const content = fs.readFileSync(trackerPath, "utf-8");
  const lines = content.split("\n");

  const statuses = new Map();

  for (const line of lines) {
    const match = line.match(/^\|\s*(\d{3})\s*\|\s*(\[[x\s]\])\s*\|/i);

    if (match) {
      statuses.set(match[1], match[2].toLowerCase() === "[x]" ? "[x]" : "[ ]");
    }
  }

  return statuses;
};

const existingStatuses = readExistingStatuses();

const trackerRows = tasks.map((taskName) => {
  const taskId = getTaskId(taskName);
  const status = existingStatuses.get(taskId) ?? "[ ]";
  const title = normalizeTaskTitle(taskName);

  return `| ${taskId} | ${status} | ${title} | [link](./implements/${taskName}) | [link](./research/${taskName}) |`;
});

const trackerContent = `# Tracker

| ID | Status | Task | Implementation | Research |
| --- | --- | --- | --- | --- |
${trackerRows.join("\n")}
`;

fs.writeFileSync(trackerPath, trackerContent);

execFileSync("npx", ["--no-install", "prettier", "--write", "TRACKER.md"], {
  cwd: root,
  stdio: "inherit",
});

console.log("[SUCCESS!] Tasks synchronized!");
