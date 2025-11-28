import { promises as fs } from "fs";
import path from "path";

export async function loadPricingAccess(bizType) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "pricingAccess.json"
    );
    const raw = await fs.readFile(filePath, "utf-8");
    const all = JSON.parse(raw);

    return (
      all[bizType] || {
        free: [],
        pro: [],
        vcore: [],
      }
    );
  } catch (err) {
    console.error("Error loading pricing access:", err);
    return {
      free: [],
      pro: [],
      vcore: [],
    };
  }
}
