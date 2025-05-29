# 🕵️‍♂️ [GitHub User Activity Tracker](https://roadmap.sh/projects/github-user-activity)

A simple Node.js CLI tool that fetches and displays the recent public GitHub activity for any user using the GitHub Events API. This was done as part of the [github-user-activity](https://roadmap.sh/projects/github-user-activity) from [roadmap.sh](https://roadmap.sh).

---

## 🚀 Getting Started

> ✅ Assumes you already have **Node.js** and **npm** installed on your system.

### 1. Install dependencies (if any)

```bash
npm install
```

### 2. Run the CLI

```bash
npm start github-activity <username>
```

---

## 📖 Usage

```bash
npm start github-activity octocat
```

You will see output like:

```diff
👋 Welcome to the GitHub User Activity Tracker!
📖 Usage: npm start github-activity <username>

📊 Activity for user octocat:
- PushEvent at 5/29/2025, 1:23:45 PM
- WatchEvent at 5/29/2025, 12:01:17 PM
- ForkEvent at 5/28/2025, 8:47:32 PM
...
```

---

## ⚠️ Notes

- Uses the public GitHub Events API.

- Only shows the last 30 public events for the given user.

- No authentication required, but rate-limiting may apply (60 requests/hour per IP).

---

## 📌 Features

- ✅ Fetches and lists GitHub user activity
- ✅ Friendly CLI output
- ✅ Graceful error handling for missing usernames or invalid users

---