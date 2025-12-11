// src/lib/footerUtils.js

// make title pretty from a key
export function titleFallback(key = "") {
  return (key || "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}


/** Normalize public paths like:
 *  - "public/abc.jpg"  → "/abc.jpg"
 *  - "../public/abc.jpg" → "/abc.jpg"
 *  - "images/abc.jpg" → "/images/abc.jpg"
 *  - "/images/abc.jpg" → (already correct)
 */
// export function normalizePublicPath(p) {
//   if (!p) return null;

//   let s = String(p).trim();
//   if (!s) return null;

//   // remove "../public/" OR "public/"
//   if (s.startsWith("../public/")) {
//     s = s.replace("../public/", "/");
//   } else if (s.startsWith("public/")) {
//     s = s.replace("public/", "/");
//   }

//   // ensure leading slash
//   if (!s.startsWith("/")) {
//     s = "/" + s;
//   }

//   return s;
// }


/**
 * normalizeColumns: accepts either array or legacy object shape and returns
 * an array of columns with { key, title, type, items } and filters empty items.
 */
export function normalizeColumns(columns, titles = {}) {
  if (!columns) return [];

  if (Array.isArray(columns)) {
    return columns
      .map((col) => ({
        key: col.key,
        title: col.title || titles[col.key] || titleFallback(col.key),
        type: col.type || "links",
        items: Array.isArray(col.items) ? col.items : []
      }))
      .filter((c) => Array.isArray(c.items) && c.items.length > 0);
  }

  // legacy object -> convert to array preserving insertion order
  return Object.keys(columns)
    .map((key) => ({
      key,
      title: titles[key] || titleFallback(key),
      type: key === "social" ? "social" : "links",
      items: Array.isArray(columns[key]) ? columns[key] : []
    }))
    .filter((c) => Array.isArray(c.items) && c.items.length > 0);
}

/**
 * normalizeFooter: takes a footer object (defaults merged with variant overrides)
 * and returns a new footer object where `columns` is normalized to array shape.
 * - footer may contain icons, columnTitles, defaults, etc.
 */
export function normalizeFooter(footer = {}) {
  const out = { ...footer };

  // prefer columns at top-level (already merged), else fall back to defaults.columns
  const rawColumns = footer.columns ?? footer.defaults?.columns ?? [];
  const titles = footer.columnTitles ?? footer.defaults?.columnTitles ?? {};

  out.columns = normalizeColumns(rawColumns, titles);

  // keep icons available
  out.icons = footer.icons ?? footer.defaults?.icons ?? {};

  // expose overlay/background helpers for components
  out.backgroundImage = footer.backgroundImage ?? footer.defaults?.backgroundImage;
  out.backgroundAlt = footer.backgroundAlt ?? footer.defaults?.backgroundAlt ?? "";
  out.backgroundPosition = footer.backgroundPosition ?? footer.defaults?.backgroundPosition ?? "center";
  out.overlayOpacity = footer.overlayOpacity ?? footer.defaults?.overlayOpacity ?? 0.2;

  // ensure copyRight fallback
  out.copyRight = footer.copyRight ?? footer.defaults?.copyRight ?? {};

  return out;
}
