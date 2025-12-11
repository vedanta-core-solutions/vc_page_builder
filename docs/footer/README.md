# Footer JSON schema — quick guide

This document describes the structure used by the project's footer content JSON.
The UI code expects a normalized, array-driven shape (see `footer.schema.json` for machine validation).

## Location / usage
- Place per-business footer config inside each `src/data/*.json` under the `footer` key.
- `src/components/Footer.jsx` uses a normalization util (`src/lib/footerUtils.js`) so both legacy object-columns and array-columns are supported.
- Variants override keys from `defaults`.

## Top-level keys (allowed)
- `defaultVariant` (string) — key of default variant, e.g. `"v1"`.
- `defaults` (object) — baseline values used by all variants.
- `icons` (object) — named icon definitions (SVG `viewBox` + `path`).
- `variants` (array) — list of variant objects (each with `key`, `label`, and `overrides`).

## `defaults` allowed keys
- `logo` (string) — image path (public/) for logo.
- `logoHref` (string) — link for clicking the logo (optional).
- `logoAlt` (string) — alt text for logo.
- `backgroundImage` (string) — image path for footer background.
- `backgroundAlt` (string) — alt text for background.
- `backgroundPosition` (string) — CSS `object-position` fallback, e.g. `"center"`.
- `overlayOpacity` (number 0..1) — darkness overlay on background.
- `layout` (string) — presentation hint, e.g. `"columns-standard"`, `"row-minimal"`, `"logo-left-emphasis"`. *Presentation-only.*
- `theme` (object) — `{ "colorScheme": "green" }` — *presentation-only; used by theme layer if needed.*
- `columnTitles` (object) — optional map of titles used by normalization (e.g. `{ "company": "Company" }`).
- `columns` (array) — canonical array of column objects (see below).
- `copyRight` (object) — `{ "text": "...", "builtWith": "..." }`.

## Column object (canonical array entry)
Each column in the `columns` array should be:
```json
{
  "key": "company",        // unique string key per column
  "title": "Company",      // visible heading for the column
  "type": "links",         // "links" or "social" (or other future types)
  "items": [ ... ]         // array of items
}
