'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroV5({ hero = {} }) {
  if (!hero) return null;

  const {
    branding,
    tagline,
    title,
    subtitle,
    description,
    bulletPoints = [],
    badges = [],
    stats = [],
    image,
    imageAlt = 'Hero visual',
    primaryCta,
    secondaryCta,
    cta = [],
  } = hero;

  const primaryButton = primaryCta || cta[0] || null;
  const secondaryButton = secondaryCta || cta[1] || null;
  const statItems = Array.isArray(stats) ? stats : [];
  const pointItems = Array.isArray(bulletPoints) ? bulletPoints : [];
  const badgeItems = Array.isArray(badges) ? badges : [];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-purple-600 to-rose-500 text-white py-20 px-6 font-base">
      <div className="absolute inset-x-0 top-0 h-40 bg-white/10 blur-3xl" aria-hidden />
      <div className="max-w-6xl mx-auto relative z-10 grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          {branding && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-xs font-semibold tracking-wide uppercase">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              {branding}
            </span>
          )}

          {tagline && <p className="text-base font-medium tracking-wide text-lime-100">{tagline}</p>}

          {title && (
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-lg text-white/80">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-base text-white/70">
              {description}
            </p>
          )}

          {pointItems.length > 0 && (
            <ul className="space-y-3">
              {pointItems.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-lime-300" aria-hidden />
                  <span className="text-sm md:text-base text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-4">
            {primaryButton && (
              <Link
                href={primaryButton.href || '#'}
                className="px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold shadow-lg shadow-black/20"
              >
                {primaryButton.label}
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href || '#'}
                className="px-6 py-3 rounded-full border border-white/40 text-white/90 font-semibold hover:bg-white/10 transition"
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>

          {badgeItems.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {badgeItems.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/10 text-sm text-white/80"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-white/10 blur-3xl rounded-full" aria-hidden />
          <div className="relative rounded-3xl bg-white/10 border border-white/20 p-6 backdrop-blur">
            {image && (
              <img
                src={image}
                alt={imageAlt}
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            )}

            {statItems.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {statItems.map((stat, idx) => (
                  <div key={idx} className="rounded-2xl bg-white/10 p-4 text-center">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
                    {stat.hint && (
                      <p className="text-[11px] text-white/60 mt-1">{stat.hint}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
