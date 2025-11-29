import themeData from "@/ui/theme.json";
import retail from "@/data/retail.json";
import farming from "@/data/farming.json";
import restaurant from "@/data/restaurant.json";

const contentMap = {
  retail,
  farming,
  restaurant
};

export async function loadConfig(bizType) {
  const theme = themeData.themes[bizType] || themeData.themes.default;
  const content = contentMap[bizType] || contentMap["retail"]; // default
  return { theme, content };
}