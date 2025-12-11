"use client";

import React from "react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function HeroV4() {
  const ctx = useContent();
  const content = ctx?.content || {};
  const heroConfig = content?.hero || {};

  // Variant support (future-proof)
  const selectionMap = ctx?.selectionMap || {};
  const variantKey =
    selectionMap.hero ||
    heroConfig.defaultVariant ||
    heroConfig?.variants?.[0]?.key ||
    null;

  const variantObj = Array.isArray(heroConfig.variants)
    ? heroConfig.variants.find((v) => v.key === variantKey)
    : null;

  const { variants, defaultVariant, ...baseHero } = heroConfig;
  const hero = { ...baseHero, ...(variantObj || {}) }; // FINAL hero props

  // Extract
  const branding = hero.branding || "";
  const tagline = hero.tagline || "";
  const title = hero.title || "";
  const subtitle = hero.subtitle || "";
  const description = hero.description || "";
  const badges = Array.isArray(hero.badges) ? hero.badges : [];
  const ctaButtons = Array.isArray(hero.cta) ? hero.cta : [];
  const image = hero.image || "/placeholder.png";
  const imageAlt = hero.imageAlt || "Hero Image";

  return (
    <section
      id="home"
      className="relative overflow-hidden py-20 px-6 bg-background font-base"
    >
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left z-10">

          {branding && (
            <p className="text-sm font-semibold text-accent mb-2">{branding}</p>
          )}

          {tagline && (
            <h3 className="text-lg font-medium text-primary mb-4">{tagline}</h3>
          )}

          {title && (
            <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-6">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-lg text-secondary/90 mb-4">{subtitle}</p>
          )}

          {description && (
            <p className="text-base text-secondary/80 mb-6">{description}</p>
          )}

          {/* BADGES */}
          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className="px-4 py-1 bg-accent text-background text-xs rounded-full font-medium shadow"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {ctaButtons.map((btn, i) => (
              <a
                key={i}
                href={btn.href || "#"}
                className="px-6 py-3 rounded-full bg-primary text-background font-semibold hover:bg-primary/80 transition"
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center z-10">
          <div className="relative w-80 h-80 md:w-96 md:h-[420px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={image}
              alt={imageAlt}
              width={900}   // No hardcode, just safe default
              height={900}
              className="w-full h-full object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
