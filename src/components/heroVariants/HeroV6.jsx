'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroV6({ hero = {} }) {
  if (!hero) return null;

  const {
    branding,
    tagline,
    eyebrow,
    title,
    subtitle,
    description,
    featureList = [],
    testimonial,
    socialProof,
    image,
    imageAlt = 'Hero visual',
    cta = [],
    primaryCta,
    secondaryCta,
  } = hero;

  const features = Array.isArray(featureList) ? featureList : [];
  const primaryButton = primaryCta || cta[0] || null;
  const secondaryButton = secondaryCta || cta[1] || null;
  const avatars = Array.isArray(socialProof?.avatars) ? socialProof.avatars : [];

  return (
    <section className="bg-background font-base py-16 px-6">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              <span className="h-px w-6 bg-primary" />
              {eyebrow}
            </span>
          )}

          {branding && <p className="text-sm font-medium text-accent">{branding}</p>}
          {tagline && <p className="text-sm text-secondary/80">{tagline}</p>}

          {title && (
            <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-lg text-secondary/80">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-base text-secondary/70">
              {description}
            </p>
          )}

          {features.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm">
                  <p className="text-sm font-semibold text-secondary mb-1">{feature.title}</p>
                  <p className="text-sm text-secondary/70">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {primaryButton && (
              <Link
                href={primaryButton.href || '#'}
                className="px-6 py-3 rounded-xl bg-secondary text-background font-semibold shadow-lg shadow-secondary/20"
              >
                {primaryButton.label}
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href || '#'}
                className="px-6 py-3 rounded-xl border border-secondary/30 text-secondary font-semibold hover:bg-secondary/5 transition"
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>

          {socialProof?.label && (
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200">
              <div className="flex -space-x-3">
                {avatars.slice(0, 4).map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-secondary/80">{socialProof.label}</p>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-white shadow-xl border border-slate-200 overflow-hidden">
            {image && (
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-72 object-cover"
              />
            )}
            {testimonial?.quote && (
              <div className="p-6 space-y-4">
                <p className="text-secondary/80 text-sm">{testimonial.quote}</p>
                <div>
                  <p className="text-secondary font-semibold">{testimonial.author}</p>
                  <p className="text-secondary/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
