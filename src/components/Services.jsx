// src/components/Services.jsx
"use client";

import React, { useMemo } from "react";
import { useContent } from "@/context/ContentContext";
import ServicesV1 from "./servicesVariants/ServicesV1";
import ServicesV2 from "./servicesVariants/ServicesV2";
import ServicesV3 from "./servicesVariants/ServicesV3";
import ServicesV4 from "./servicesVariants/ServicesV4";

/** safe nested getter "a.b.c" */
function getByPath(obj, path, fallback = undefined) {
  if (!path || typeof path !== "string") return fallback;
  return (
    path.split(".").reduce((acc, key) => {
      if (acc === undefined || acc === null) return undefined;
      return acc[key];
    }, obj) ?? fallback
  );
}

/** projectCard unchanged (kept as you had it) */
function projectCard(card = {}, mapRules = {}) {
  const defaultNormalized = {
    id: card.id ?? card.key ?? null,
    title: card.title ?? card.h_1 ?? "",
    description: card.description ?? card.para ?? "",
    image: card.image ?? card.img ?? "",
    imageAlt: card.imageAlt ?? card.alt ?? "",
    cta:
      card.cta ??
      (card.btn ? { label: card.btn, href: card.href ?? "#" } : undefined),
    alignment: card.alignment ?? "left",
    raw: card,
  };

  if (!mapRules || Object.keys(mapRules).length === 0) return defaultNormalized;

  const out = {};
  for (const [target, sourcePath] of Object.entries(mapRules)) {
    if (sourcePath === "cta") {
      out[target] = card.cta ?? undefined;
    } else {
      out[target] = getByPath(card, sourcePath, undefined);
    }
  }

  return {
    id: out.id ?? defaultNormalized.id,
    title: out.title ?? defaultNormalized.title,
    description: out.description ?? defaultNormalized.description,
    image: out.image ?? defaultNormalized.image,
    imageAlt: out.imageAlt ?? defaultNormalized.imageAlt,
    cta:
      out.cta ??
      (out.ctaLabel || out.ctaHref
        ? { label: out.ctaLabel, href: out.ctaHref }
        : defaultNormalized.cta),
    alignment: out.alignment ?? defaultNormalized.alignment,
    raw: card,
  };
}

export default function Services() {
  const { content, selectionMap } = useContent();

  // --- use a safe ref for services (DO NOT early-return here) ---
  const servicesRef = content?.services;

  // --- hooks always run (use stable refs inside them) ---
  const variantsRef = servicesRef?.variants;

  const variantsObj = useMemo(() => {
    if (!variantsRef) return {};
    if (!Array.isArray(variantsRef)) return variantsRef;
    return variantsRef.reduce((acc, v) => {
      if (v?.key) acc[v.key] = v;
      return acc;
    }, {});
  }, [variantsRef]);

  // pick selected variant key
  const selectedKey =
    (selectionMap && selectionMap.services) ??
    (servicesRef?.meta && servicesRef.meta.defaultVariant) ??
    servicesRef?.defaultVariant ??
    Object.keys(variantsObj)[0] ??
    "v1";

  const variant =
    variantsObj[selectedKey] ?? variantsObj[Object.keys(variantsObj)[0]];

  // mapRules memoized using an exact dependency
  const mapRules = useMemo(
    () => variant?.dataBinding?.map ?? {},
    [variant?.dataBinding]
  );

  const sourceArrayName = variant?.dataBinding?.use ?? "cards";
  const sourceArrayRef = servicesRef ? servicesRef[sourceArrayName] : undefined;

  // --- NEW: compute visibility BEFORE normalization ---
  const rawFiltered = useMemo(() => {
    const raw = Array.isArray(sourceArrayRef) ? sourceArrayRef : [];

    // If a card has no showIn -> visible everywhere.
    // If it has showIn (string or array) -> visible only if it includes selectedKey.
    return raw.filter((card) => {
      if (!card) return false;
      if (!card.showIn) return true; // no rule = visible everywhere
      const list = Array.isArray(card.showIn) ? card.showIn : [card.showIn];
      return list.includes(selectedKey);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceArrayRef, selectedKey]);

  const items = useMemo(() => {
    return rawFiltered.map((c) => projectCard(c, mapRules));
  }, [rawFiltered, mapRules]);

  // Now that hooks are used safely, we can guard rendering:
  if (!servicesRef || !variant) return null;

  const variantProps = {
    data: variant,
    items,
    meta: servicesRef.meta ?? {},
    variantKey: variant?.label ?? selectedKey,
    rawVariant: variant,
  };

  const key = variant?.key ?? variant?.layout ?? selectedKey;

  switch (key) {
    case "v1":
    case "cards-classic":
      return <ServicesV1 {...variantProps} />;
    case "v2":
    case "grid-cards":
      return <ServicesV2 {...variantProps} />;
    case "v3":
    case "list-cta":
      return <ServicesV3 {...variantProps} />;
    case "v4":
    case "grid-cards-v4":
      return <ServicesV4 {...variantProps} />;

    default:
      if (
        (variant.layout || "").includes("grid") ||
        (key || "").includes("grid")
      ) {
        return <ServicesV2 {...variantProps} />;
      }
      if (
        (variant.layout || "").includes("list") ||
        (key || "").includes("list")
      ) {
        return <ServicesV3 {...variantProps} />;
      }
      return <ServicesV1 {...variantProps} />;
  }
}
