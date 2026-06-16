import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const taskId = process.argv[2];

if (!taskId) {
  throw new Error("Task id is required. Example: npm run execute -- 001");
}

const implementsDir = path.join(root, "implements");

const matchedTasks = fs
  .readdirSync(implementsDir, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name)
  .filter((name) => name.startsWith(`${taskId}_`));

if (matchedTasks.length === 0) {
  throw new Error(`Task not found: ${taskId}`);
}

if (matchedTasks.length > 1) {
  throw new Error(`Multiple tasks found for id ${taskId}: ${matchedTasks.join(", ")}`);
}

const taskDir = path.join(implementsDir, matchedTasks[0]);
const executePath = path.join(taskDir, "execute.sh");

if (!fs.existsSync(executePath)) {
  throw new Error(`execute.sh not found in ${taskDir}`);
}

const result = spawnSync("bash", [executePath], {
  cwd: taskDir,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
