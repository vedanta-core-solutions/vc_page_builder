import themeData from "../ui/theme.json";
import retail from "../data/retail.json";
import farming from "../data/farming.json";
import restaurant from "../data/restaurant.json";
import profiletypo from "../data/profiletypo.json"

const contentMap = {
  retail,
  farming,
  restaurant,
  profiletypo,
};

// 3
function normalizeContent(input) {
  if (!input) return {};

  const content = input.content ?? null;
  if (!content || typeof content !== "object") {
    return input;
  }

  const indicatorKeys = [
    "navbar",
    "hero",
    "services",
    "contentSection",
    "footer",
  ];

  const hasIndicator = indicatorKeys.some((k) => k in content);

  if (hasIndicator) {
    return content;
  }

  if (Object.keys(content).length >= 2) {
    return content;
  }

  return input;
}
// 3

export async function loadConfig(bizType) {
  const theme = themeData.themes[bizType] || themeData.themes.default;
  const rawContent = contentMap[bizType] || contentMap["retail"];
  const content = normalizeContent(rawContent);
  return { theme, content };
}

// normalizeContent ka work:
// Agar input hi nahi mila → {} return karo`
// Agar content wrapper mila → sirf uska content return karo
// Agar wrapper nahi mila → input ko jaisa hai waisa return karo
// "indicatorKeys"--> keys that indicate a "wrapped" content object for our app
// "(Object.keys(content))"-->fallback: if content has many keys (likely actual content), unwrap it
// Agar input hi nahi aaya → {} return
// Agar input.content nahi hai → input ko as-is return
// Agar content ke andar major sections (navbar/hero/etc.) milte hain → content return
// Agar content object me 2+ keys hain → content return (fallback unwrap)
// Otherwise input return
