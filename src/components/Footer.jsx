
"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import FooterV1 from "./footerVariants/FooterV1";
import FooterV2 from "./footerVariants/FooterV2";
import FooterV3 from "./footerVariants/FooterV3";

function mergeVariant(footer = {}, variant = {}) {
  const merged = { ...footer, ...variant, copyRight: { ...(footer.copyRight || {}), ...(variant.copyRight || {}) } };

  if (variant.columns && Object.keys(variant.columns).length) {
    merged.columns = variant.columns;
  } else {
    merged.columns = footer.columns || {};
  }
  return merged;
}

export default function Footer() {
  const { content, selectionMap } = useContent();
  const footer = content?.footer;
  if (!footer) return null;

  const selectedKey = selectionMap?.footer ?? footer.defaultVariant ?? (footer.variants?.[0]?.key ?? "v1");
  const variant = (footer.variants || []).find(v => v.key === selectedKey) || {};

  const data = mergeVariant(footer, variant);
  const layout = variant.layout || variant.key || "columns-standard";

  if (layout === "logo-right-emphasis") return <FooterV2 data={data} />;
  if (layout === "row-minimal" || layout === "three-column") return <FooterV3 data={data} />;

  return <FooterV1 data={data} />;
}
