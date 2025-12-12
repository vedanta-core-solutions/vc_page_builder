'use client';
import { useContent } from '@/context/ContentContext';

import HeroV1 from './heroVariants/HeroV1';
import HeroV2 from './heroVariants/HeroV2';
import HeroV3 from './heroVariants/HeroV3';
import HeroV4 from './heroVariants/HeroV4';
import HeroV5 from './heroVariants/HeroV5';
import HeroV6 from './heroVariants/HeroV6';

const VARIANT_MAP = {
  v1: HeroV1,
  v2: HeroV2,
  v3: HeroV3,
  v4: HeroV4,
  v5: HeroV5,
  v6: HeroV6,
};

export default function Hero() {
  const ctx = useContent();
  if (!ctx) return null;

  const { content = {}, selectionMap = {} } = ctx;
  const heroRoot = content.hero || {};
  const selectedKey = selectionMap?.hero || heroRoot?.defaultVariant;

  const {
    variants: variantList = [],
    defaultVariant,
    ...baseHero
  } = heroRoot;

  const variantData = variantList.find(v => v.key === selectedKey);
  const data = variantData ? { ...baseHero, ...variantData } : baseHero;

  const VariantComp =
    VARIANT_MAP[selectedKey] ||
    VARIANT_MAP[variantData?.key] ||
    VARIANT_MAP[defaultVariant] ||
    HeroV1;
  return <VariantComp hero={data} />;
}
