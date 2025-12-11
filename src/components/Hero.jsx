'use client';
import { useContent } from '@/context/ContentContext';

import HeroV1 from './heroVariants/HeroV1';
import HeroV2 from './heroVariants/HeroV2';
import HeroV3 from './heroVariants/HeroV3';
import HeroV4 from './heroVariants/HeroV4';

const VARIANT_MAP = {
  v1: HeroV1,
  v2: HeroV2,
  v3: HeroV3,
  v4: HeroV4,
};

export default function Hero() {
  const ctx = useContent();
  if (!ctx) return null;

  const { content = {}, selectionMap = {} } = ctx;
  const heroRoot = content.hero || {};

  const selectedKey = selectionMap?.hero || heroRoot?.defaultVariant;

  const variantData = heroRoot?.variants?.find(v => v.key === selectedKey);

  const data = variantData || heroRoot;

  const VariantComp = VARIANT_MAP[selectedKey] || HeroV1;
  return <VariantComp hero={data} />;
}
