# 📝 ([Task CLI](https://roadmap.sh/projects/task-tracker))

A simple command-line task manager built with Node.js and TypeScript. It stores tasks in a `tasks.json` file and allows you to add, update, delete, and view tasks.

---

## 🚀 Getting Started

> ✅ Assumes you already have **Node.js** and **npm** installed on your system.

### 1. Install dependencies (if any)

```bash
npm install
```

---

## 📂 File

A `tasks.json` file will be created automatically in the root directory to store your tasks. If it's missing or invalid, it will be reset.

---

## 🛠️ Commands

### ➕ `add <description>`

Adds a new task with a description.

```bash
npm start add "Buy groceries"
```

---

### ✏️ `update <taskId> <new description>`

Updates the description of a task by ID.

```bash
npm start update 1a2b3c "Buy groceries and fruits"
```

---

### ❌ `delete <taskId>`

Deletes a task by ID.

```bash
npm start delete 1a2b3c
```

---

### 🔄 `mark-in-progress <taskId>`

Marks a task as "in-progress".

```bash
npm start mark-in-progress 1a2b3c
```

---

### ✅ `mark-done <taskId>`

Marks a task as "done".

```bash
npm start mark-done 1a2b3c
```

---

### 📋 `list`

Lists all tasks.

```bash
npm start list
```

---

### 📋 `list <status>`

Filters tasks by status: `todo`, `in-progress`, or `done`.

```bash
npm start list todo
```

---

## 🧠 Example Output

```
c1d2e3
Buy groceries
todo
---
f9a8b7
Clean room
done
```

---

## ⚠️ Notes

- Each task has: `id`, `description`, `status`, `createdAt`, and `updatedAt`.
- Valid statuses: `todo`, `in-progress`, `done`.
- All data is stored in `tasks.json` locally.

---