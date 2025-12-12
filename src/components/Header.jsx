"use client";
import React from "react";
import { useContent } from "@/context/ContentContext";
import HeaderV1 from "./headerVariants/HeaderV1";
import HeaderV2 from "./headerVariants/HeaderV2";
import HeaderV3 from "./headerVariants/HeaderV3";
import HeaderV4 from "./headerVariants/HeaderV4";
import HeaderV5 from "./headerVariants/HeaderV5";
import HeaderV6 from "./headerVariants/HeaderV6";

const VARIANT_MAP = {
  v1: HeaderV1,
  v2: HeaderV2,
  v3: HeaderV3,
  v4: HeaderV4,
  v5: HeaderV5,
  v6: HeaderV6,
};

export default function Header() {
  const ctx = useContent();

  if (!ctx) return null;

  const { content = {}, selectionMap = {} } = ctx;
  const navbarRoot = content?.navbar || {};
  const selectedKey = selectionMap?.navbar || navbarRoot?.defaultVariant;

  const {
    variants: variantList = [],
    defaultVariant,
    ...baseNavbar
  } = navbarRoot;

  const variantData = variantList.find((v) => v.key === selectedKey);

  const data = variantData ? { ...baseNavbar, ...variantData } : baseNavbar;

  const VariantComp =
    VARIANT_MAP[selectedKey] ||
    VARIANT_MAP[variantData?.key] ||
    VARIANT_MAP[defaultVariant] ||
    HeaderV1;
  return <VariantComp navbar={data} />;
}
