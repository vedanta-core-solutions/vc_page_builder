// import { promises as fs } from 'fs';
// import path from 'path';

// export async function loadConfig(bizType) {
//   const contentFilePath = path.join(process.cwd(), 'src', 'data', `${bizType}.json`);
//   const themeFilePath = path.join(process.cwd(), 'src', 'ui', `theme.json`)
//   try {
//     const rawData = await fs.readFile(contentFilePath, 'utf-8');
//     const rawTheme = await fs.readFile(themeFilePath, 'utf-8');
//     return JSON.parse(raw);
//   } catch {
//     return null;
//   }
// }

import { promises as fs } from 'fs';
import path from 'path';

export async function loadConfig(bizType) {
  const contentFilePath = path.join(process.cwd(), 'src', 'data', `${bizType}.json`);
  const themeFilePath = path.join(process.cwd(), 'src', 'ui', 'theme.json');

  try {
    const rawData = await fs.readFile(contentFilePath, 'utf-8');
    const rawTheme = await fs.readFile(themeFilePath, 'utf-8');

    const content = JSON.parse(rawData);
    const theme = JSON.parse(rawTheme);

    // Merge both files in one object
    return {
      content,
      theme
    };

  } catch (error) {
    console.error("Error loading config:", error);
    return null;
  }
}
