# 📝 [Expense Tracker CLI](https://roadmap.sh/projects/expense-tracker)

A simple command-line expense tracker built with Node.js and TypeScript. It stores tasks in a `expenses.txt` file and allows you to add, delete, list and view expenses summary. This was done as part of the [expense-tracker project](https://roadmap.sh/projects/expense-tracker) from [roadmap.sh](https://roadmap.sh).

---

## 🚀 Getting Started

> ✅ Assumes you already have **Node.js** and **npm** installed on your system.

### 1. Install dependencies (if any)

```bash
npm install
```

---

## 📂 File

A `expenses.txt` file will be created automatically in the root directory to store your tasks. If it's missing or invalid, it will be reset.

---

## 🛠️ Commands

### `add --description <description> --amount <amount>`

Adds a new expense with a description and amount.

```bash
npm start --  add --description "Lunch" --amount 20"
```

---

### `list`

List all expenses.

```bash
npm start  list"
```

---

### `summary`

Returns expenses summary.

```bash
npm start summary"
```

---

### `delete --id <id>`

Delete an expense by id.

```bash
npm start --  delete --id 2"
```

---

### `summary --month <month>`

Returns expenses summary by month.

```bash
npm start -- summary --month 8"
```

---
