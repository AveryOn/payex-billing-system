# Task Management

The repository uses `task-list.require.json` as the single source of truth for task registration.

Each task must have a unique name in the following format:

```txt
001_event_loop_profiling
```

Where:

- the first three digits are the permanent task identifier;
- the remainder of the name is a human-readable identifier (slug).

Example:

```json
["001_event_loop_profiling", "002_async_queue", "003_worker_threads"]
```

---

## Task Synchronization

After modifying `task-list.require.json`, run:

```bash
npm run tasks:sync
```

During synchronization, the system performs the following actions:

1. Creates the task implementation directory in `implements/`, if it does not exist.
2. Creates the task research directory in `research/`, if it does not exist.
3. Creates a minimal set of files for the new task.
4. Automatically updates the task table in `TRACKER.md`.
5. Preserves current task statuses (`[ ]` and `[x]`).
6. Renames task directories when a task name changes.
7. Deletes task directories that have been removed from `task-list.require.json`.

---

## New Task Structure

After synchronization, the following directories are created for a new task:

```txt
implements/
└── 001_event_loop_profiling
    ├── README.md
    ├── execute.sh
    ├── tsconfig.json
    └── src
        └── index.ts

research/
└── 001_event_loop_profiling
    └── index.md
```

### implements

Contains the task implementation.

Main entry point:

```txt
src/index.ts
```

Run script:

```txt
execute.sh
```

### research

Contains research, notes, source links, conclusions, and materials related to the task.

Main file:

```txt
index.md
```

---

## Task Registry

The `TRACKER.md` file is maintained automatically.

Example:

```md
| ID  | Status | Task                 | Implementation                        | Research                            |
| --- | ------ | -------------------- | ------------------------------------- | ----------------------------------- |
| 001 | [ ]    | event loop profiling | ./implements/001_event_loop_profiling | ./research/001_event_loop_profiling |
```

Column descriptions:

| Field          | Description            |
| -------------- | ---------------------- |
| ID             | Unique task identifier |
| Status         | Completion status      |
| Task           | Task name              |
| Implementation | Link to implementation |
| Research       | Link to research       |

---

## Task Statuses

Task status is changed manually in `TRACKER.md`.

Available values:

```txt
[ ] - task not completed
[x] - task completed
```

Example:

```md
| 001 | [ ] | event loop profiling | ... |
```

After completion:

```md
| 001 | [x] | event loop profiling | ... |
```

During synchronization, the status is preserved automatically.

---

## Running a Task

A single command is used to run a task:

```bash
npm run execute -- 001
```

Where:

```txt
001
```

is the task identifier.

Run algorithm:

1. Search for a directory in `implements/` beginning with the given identifier.
2. Search for the `execute.sh` file.
3. Run the found script.
4. Output the result to the console.

This way each task can have its own run implementation, while all tasks share common dependencies from the root `node_modules`.

---

## Task Lifecycle

### Creation

1. Add a new entry to `task-list.require.json`.
2. Run:

```bash
npm run tasks:sync
```

3. Fill in the implementation in `implements/<task>`.
4. Conduct research in `research/<task>`.

### Execution

Run the task:

```bash
npm run execute -- <task-id>
```

Example:

```bash
npm run execute -- 001
```

### Completion

After finishing work on the task, change the status in `TRACKER.md`:

```txt
[ ] -> [x]
```

After that, the task is considered complete and remains in the registry for further audit and review.

---

## To mark a task as completed, run:

```bash
npm run tasks:complete -- 001
```

Where `001` is the task ID.

The command does the following:

1. Finds the task in `TRACKER.md` by ID.
2. Changes the task status to `[x]`.
3. Formats `TRACKER.md` with Prettier.

Example:

```md
| 001 | [ ] | event loop profiling | ./implements/001_event_loop_profiling | ./research/001_event_loop_profiling |
```

After running the command:

```md
| 001 | [x] | event loop profiling | ./implements/001_event_loop_profiling | ./research/001_event_loop_profiling |
```
