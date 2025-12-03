export function readSP(sp, key) {
  if (!sp) return undefined;
  return typeof sp.get === "function" ? sp.get(key) : sp[key];
}

const DEFAULT_KEYS = [
  "navbar",
  "hero",
  "services",
  "contentSection",
  "footer"
];

export function getInitialSelectionMap(content = {}, searchParams = null, keys = DEFAULT_KEYS) {
  if (!content || typeof content !== "object") return {};

  const result = {};

  keys.forEach((compKey) => {
    const comp = content[compKey];
    if (!comp) return;
    

    const defaultVariant =
      comp.defaultVariant ||
      (Array.isArray(comp.variants) && comp.variants[0]?.key) ||
      null;

    if (defaultVariant) result[compKey] = defaultVariant;
  });

  // apply overrides from searchParams (URLSearchParams or plain object)
  if (searchParams) {
    for (const compKey of keys) {
      const override = readSP(searchParams, `variant_${compKey}`);
      if (override) {
        result[compKey] = override;
      }
    }
  }

  return result;
}



// created one shared helper "getInitialSelectionMap" jo server (page.js) aur client (ContentProvider) dono use karenge
// Yeh function karega:
// Content ke andar defaultVariant choose karega
// Agar searchParams me override aaya ho (variant_navbar, variant_hero, etc.) to use apply karega
// "  const result = {};"-->Final { navbar: 'v2', hero: 'v1', footer: 'v3' } return karega
// Why do we use the same helper on BOTH (server + client)?
// this page is helper "getinitialSelectionMap.js"
// Because dono jagah SAME kaam hota hai
// → default variants choose karna
// → URL overrides apply karna

// getInitialSelectionMap.js kya karta hai?
// “Jab page first time load hota hai, woh decide karta hai ki kaunsa variant default dikhana hai.
// Phir agar user URL me override de (variant_navbar=v2), to default ki jagah woh variant show karega.”

// initialSelectionMap do :-
// Tells the server which variant to render
// We generate initialSelectionMap so server and client render the same component versions during first load. This prevents hydration mismatch.
// Server → BizPage → initialSelectionMap → ContentProvider → Header Render