import { promises as fs } from 'fs';
import path from 'path';

export async function loadConfig(bizType) {
  const file = path.join(process.cwd(), 'src', 'data', `${bizType}.json`);
  console.log("jhkj", file)
  try {
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}
