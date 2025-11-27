import { promises as fs } from 'fs';
import path from 'path';

export async function loadConfig(bizType) {
  const filePath = path.join(process.cwd(), 'src', 'data', `${bizType}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}