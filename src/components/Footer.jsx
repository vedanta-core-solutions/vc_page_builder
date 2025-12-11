// src/components/Footer.jsx
"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import FooterV1 from "./footerVariants/FooterV1";
import FooterV2 from "./footerVariants/FooterV2";
import FooterV3 from "./footerVariants/FooterV3";
import FooterV4 from "./footerVariants/FooterV4";


import { normalizeFooter } from "../lib/footerUtils";

/** small isPlainObject check */
function isPlainObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

/** deepMerge: defaults <- overrides */
function deepMerge(defaults = {}, overrides = {}) {
  if (!isPlainObject(defaults)) return overrides !== undefined ? overrides : defaults;
  if (!isPlainObject(overrides)) return overrides !== undefined ? overrides : defaults;

  const out = { ...defaults };

  Object.keys(overrides).forEach((k) => {
    const dv = defaults[k];
    const ov = overrides[k];

    if (Array.isArray(dv) && Array.isArray(ov)) {
      // variant array replaces default array (predictable)
      out[k] = ov;
    } else if (isPlainObject(dv) && isPlainObject(ov)) {
      out[k] = deepMerge(dv, ov);
    } else {
      out[k] = ov !== undefined ? ov : dv;
    }
  });

  return out;
}

export default function Footer() {
  const { content, selectionMap } = useContent();
  const footer = content?.footer;
  if (!footer) return null;

  // pick variant key
  const selectedKey = selectionMap?.footer ?? footer.defaultVariant ?? (footer.variants?.[0]?.key ?? "v1");
  const variant = (footer.variants || []).find((v) => v.key === selectedKey) || {};

  // Merge: defaults <- variant.overrides
  const defaults = footer.defaults || {};
  const overrides = variant.overrides || {};
  const merged = deepMerge(defaults, overrides);

  // include top-level icons map (if defined at footer level)
  if (footer.icons && !merged.icons) merged.icons = footer.icons;

  // Normalize columns etc. once here
  const data = normalizeFooter(merged);

  // decide layout (variant can override)
  const layout = overrides.layout || defaults.layout || variant.layout || variant.key || "columns-standard";

  if (layout === "logo-right-emphasis") return <FooterV2 data={data} />;
  if (layout === "row-minimal" || layout === "three-column") return <FooterV3 data={data} />;
  if (layout === "columns-standard") return <FooterV4 data={data} />;

  return <FooterV1 data={data} />;
}
