import { promises as fs } from "fs";
import { randomBytes } from "crypto";

const filePath = "tasks.json";

export function generateSecureId(length: number = 6): string {
  const bytes = randomBytes(Math.ceil(length / 2));
  return bytes.toString("hex").slice(0, length); // Hex characters only
}

async function readOrInitJsonFile(
  filePath: string
): Promise<Record<string, any>> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    try {
      return JSON.parse(data);
    } catch (jsonError) {
      return writeJsonFile(filePath, { tasks: [] });
    }
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return writeJsonFile(filePath, { tasks: [] });
    } else {
      throw new Error(`❌ Unexpected error while reading file: ${err.message}`);
    }
  }
}

export async function writeJsonFile(
  filePath: string,
  data: Record<string, any>
): Promise<Record<string, any>> {
  const jsonString = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonString, "utf-8");
  return data;
}

async function main() {
  const file = await readOrInitJsonFile(filePath);

  const tasks = file.tasks;

  const args = process.argv.slice(2);

  const command = args[0];

  switch (command) {
    case "add": {
      const description = args[1];

      if (!description) {
        console.error("❌ Please provide a description for the task.");
        return;
      }

      const date = new Date().toISOString();
      tasks.push({
        id: generateSecureId(),
        description,
        status: "todo",
        createdAt: date,
        updatedAt: date,
      });
      break;
    }
    case "update": {
      const id = args[1];

      if (!id) {
        console.error("❌ Please provide the ID of the task to update.");
        return;
      }

      const newDescription = args[2];

      if (!newDescription) {
        console.error("❌ Please provide a new description for the task.");
        return;
      }

      if (tasks[id]) {
        tasks[id].description = newDescription;
        tasks[id].updatedAt = new Date().toISOString();
      } else {
        console.error(`❌ Task with ID ${id} not found.`);
      }
      break;
    }
    case "delete": {
      const id = args[1];

      if (!id) {
        console.error("❌ Please provide the ID of the task to delete.");
        return;
      }

      if (tasks[id]) {
        delete tasks[id];
      } else {
        console.error(`❌ Task with ID ${id} not found.`);
      }
      break;
    }
    case "mark-in-progress": {
      const id = args[1];

      if (!id) {
        console.error("❌ Please provide the ID of the task to update.");
        return;
      }

      if (tasks[id]) {
        tasks[id].status = "in-progress";
        tasks[id].updatedAt = new Date().toISOString();
      } else {
        console.error(`❌ Task with ID ${id} not found.`);
      }
      break;
    }
    case "mark-done": {
      const id = args[1];

      if (!id) {
        console.error("❌ Please provide the ID of the task to update.");
        return;
      }

      if (tasks[id]) {
        tasks[id].status = "done";
        tasks[id].updatedAt = new Date().toISOString();
      } else {
        console.error(`❌ Task with ID ${id} not found.`);
      }
      break;
    }
    case "list": {
      const subCommand = args[1];
      if (!subCommand) {
        const list = Object.values(tasks);
        list.forEach((task: any, index) => {
          console.log(task.id);
          console.log(task.description);
          console.log(task.status);
          if (index < Object.keys(list).length - 1) {
            console.log("---");
          }
        });
      } else {
        if (
          subCommand !== "todo" &&
          subCommand !== "in-progress" &&
          subCommand !== "done"
        ) {
          console.error(
            "❌ Invalid status. Use 'todo', 'in-progress', or 'done'."
          );
          return;
        }

        const list = Object.values(tasks).filter(
          (id: any) => tasks[id].status === subCommand
        );
        list.forEach((task: any, index) => {
          console.log(task.id);
          console.log(task.description);
          console.log(task.status);
          if (index < Object.keys(list).length - 1) {
            console.log("---");
          }
        });
      }
      break;
    }
    default:
      console.error(
        "❌ Invalid command. Use 'add', 'update', 'delete', 'mark-in-progress', 'mark-done', or 'list'."
      );
      break;
  }

  await writeJsonFile(filePath, { tasks });
}

main();
