import { promises as fs } from "fs";
import path from "path";

async function listFilesInDir(dir: string) {
  try {
    const files = await fs.readdir(dir);
    console.log(`Files in ${dir}:`);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = await fs.stat(fullPath);
      console.log(`${stat.isDirectory() ? "[DIR] " : "[FILE]"} ${file}`);
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
}

// Example usage
listFilesInDir(".");
