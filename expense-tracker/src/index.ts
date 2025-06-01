import { Command } from "commander";
import { promises as fs } from "fs";

const program = new Command();
const EXPENSES_FILE = "expenses.txt";

interface Expense {
  description: string;
  amount: number;
  date: string;
  id: number;
}

let expenses: Expense[] = [];

function getNextAvailableId(expenses: Expense[]): number {
  const ids = expenses.map((e) => e.id).sort((a, b) => a - b);

  let expectedId = 1;
  for (const id of ids) {
    if (id === expectedId) {
      expectedId++;
    } else if (id > expectedId) {
      break; // found a gap
    }
  }
  return expectedId;
}

async function saveExpenses(): Promise<void> {
  const jsonString = JSON.stringify({ expenses }, null, 2);
  await fs.writeFile(EXPENSES_FILE, jsonString, "utf-8");
}

async function loadExpenses(path: string): Promise<Expense[]> {
  try {
    const fileContent = await fs.readFile(path, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (parsed && Array.isArray(parsed.expenses)) {
      return parsed.expenses;
    } else {
      return [];
    }
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      throw error;
    }
  }
}

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthName(monthNumber: number): string | null {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // monthNumber expected 1-12
  if (monthNumber < 1 || monthNumber > 12) return null;

  return months[monthNumber - 1];
}

async function main() {
  expenses = await loadExpenses(EXPENSES_FILE);

  program
    .name("expense-tracker")
    .description("CLI to track expenses - roadmap.sh project")
    .version("1.0.0");

  program
    .command("add")
    .description("Add a new expense")
    .requiredOption("--description <description>", "Description of the expense")
    .requiredOption("--amount <amount>", "Amount spent")
    .action(async (options) => {
      const newId = getNextAvailableId(expenses);
      const newExpense: Expense = {
        id: newId,
        description: options.description,
        amount: Number(options.amount),
        date: formatDateToYYYYMMDD(new Date()),
      };

      expenses.push(newExpense);

      await saveExpenses();

      console.log(`Expense added successfully (ID: ${newExpense.id})`);
    });

  program
    .command("list")
    .description("List all expenses")
    .action(() => {
      if (expenses.length === 0) {
        console.log("No expenses found.");
        return;
      } else {
        console.log("ID\tDate\t\tDescription\tAmount");
        expenses.forEach((expense) => {
          console.log(
            `${expense.id}\t${expense.date}\t\t${
              expense.description
            }\t$${expense.amount.toFixed(2)}`
          );
        });
      }
    });

  program
    .command("summary")
    .description("Expenses summary")
    .option("--month <month>", "Filter by month (format: YYYY-MM)")
    .action(async (options) => {
      const month = options.month;

      const expensesSummary = (
        month
          ? expenses.filter((expense) => {
              const expenseMonth = Number(expense.date.slice(5, 7));
              return expenseMonth === month;
            })
          : expenses
      ).reduce((acc, expense) => {
        acc += expense.amount;
        return acc;
      }, 0);
      console.log(
        `Total expenses${
          month ? ` for ${getMonthName(month)}` : ""
        }: $${expensesSummary.toFixed(2)}`
      );
    });

  program
    .command("delete")
    .description("Delete a specific expense")
    .requiredOption("--id <id>", "ID of the expense to delete")
    .action(async (options) => {
      const id = Number(options.id);
      const index = expenses.findIndex((expense) => expense.id === id);

      if (index === -1) {
        console.log(`Expense with ID ${id} not found.`);
        return;
      }

      expenses.splice(index, 1);
      saveExpenses().then(() => {
        console.log(`Expense deleted successfully.`);
      });
    });

  program
    .command("export")
    .description("Export expenses to a CSV file")
    .option("--file <file>", "Output CSV file name")
    .action(async (options) => {
      const headers = ["id", "description", "amount", "date"];
      const csvRows = expenses.map((expense) =>
        [
          expense.id,
          `"${expense.description.replace(/"/g, '""')}"`,
          expense.amount,
          expense.date,
        ].join(",")
      );
      const csvData = [headers.join(","), ...csvRows].join("\n");
      const outputFile = options.file || "expenses.csv";
      await fs.writeFile(outputFile, csvData, "utf-8");
    });

  program.parse(process.argv);
}

main();
