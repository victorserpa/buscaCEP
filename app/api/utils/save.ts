import { AddressForm } from "@/@types/addressForm";
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";

const SEARCHES_FILE_PATH = path.join(process.cwd(), "db", "searches.json");
const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json");

async function readFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return defaultValue;
    }
    console.error(`Erro ao ler o arquivo ${filePath}:`, error);
    return defaultValue;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 4));
  } catch (error) {
    console.error(`Erro ao salvar o arquivo ${filePath}:`, error);
  }
}

export async function saveFields(data: AddressForm): Promise<void> {
  const dados = await readFile<AddressForm[]>(SEARCHES_FILE_PATH, []);
  data.id = uuidv4();
  dados.push(data);
  await writeJsonFile(SEARCHES_FILE_PATH, dados);
}

export async function saveData(data: AddressForm): Promise<void> {
  await writeJsonFile(USERS_FILE_PATH, data);
}