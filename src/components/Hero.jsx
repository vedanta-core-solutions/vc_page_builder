'use client';
import React from 'react';
import { useConfig } from '../context/ConfigProviderClient';
import Link from 'next/link';

export default function Hero() {
  const config = useConfig();
  if (!config) return null;

  const { themeForBiz, content } = config;
  const hero = content.hero;

  return (
    <section
      className="flex flex-wrap"
      style={{
        background: themeForBiz.colors.background,
        fontFamily: themeForBiz.font
      }}
    >
      {/* --------------------------------------------- */}
      {/* LEFT COLUMN - Text Content */}
      {/* --------------------------------------------- */}
      <div className="w-full lg:w-7/12 xl:w-6/12 p-6 lg:p-12">
        <div className="mx-auto" style={{ maxWidth: "680px" }}>

          {/* BRANDING */}
          <nav className="flex justify-between items-center mb-10">
            <div
              className="text-4xl font-bold"
              style={{ color: themeForBiz.colors.primary }}
            >
              {hero.branding}
              <span style={{ color: themeForBiz.colors.accent }}>.</span>
            </div>

            <img
              src={themeForBiz?.logo || "/default-logo.png"}
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </nav>

          {/* TEXT CONTENT */}
          <div className="space-y-6">

            {/* TAGLINE */}
            {hero.tagline && (
              <p
                className="text-lg font-medium tracking-wide"
                style={{ color: themeForBiz.colors.accent }}
              >
                {hero.tagline}
              </p>
            )}

            {/* TITLE WITH HIGHLIGHT */}
            <h1
              className="text-4xl lg:text-6xl font-extrabold leading-tight"
              style={{ color: themeForBiz.colors.secondary }}
            >
              {hero.title.split(" ").map((word, i) => {
                const highlight = hero.highlight;
                return (
                  <span
                    key={i}
                    className="mr-2"
                    style={{
                      color:
                        word === highlight
                          ? themeForBiz.colors.primary
                          : themeForBiz.colors.secondary
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>

            {/* DECORATION BAR */}
            <div
              className="w-28 h-2"
              style={{ background: themeForBiz.colors.primary }}
            ></div>

            {/* SUBTITLE */}
            <p
              className="text-xl"
              style={{
                color: themeForBiz.colors.secondary,
                lineHeight: "1.7"
              }}
            >
              {hero.subtitle}
            </p>

            {/* DESCRIPTION */}
            <p
              className="text-lg opacity-90"
              style={{
                color: themeForBiz.colors.secondary,
                lineHeight: "1.75"
              }}
            >
              {hero.description}
            </p>

            {/* BADGES */}
            {hero.badges && (
              <div className="flex flex-wrap gap-3">
                {hero.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 rounded-full text-sm font-medium shadow"
                    style={{
                      background: themeForBiz.colors.accent,
                      color: themeForBiz.colors.background
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* RATING */}
            {hero.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl mr-2">⭐</span>
                <p style={{ color: themeForBiz.colors.secondary }}>
                  <strong>{hero.rating.value}</strong> — {hero.rating.text}
                </p>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              {hero.button.map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className="px-6 py-3 text-lg font-semibold rounded shadow"
                  style={{
                    background: themeForBiz.colors.primary,
                    color: themeForBiz.colors.background
                  }}
                >
                  {btn.label}
                </Link>
              ))}
            </div>

            {/* CTA NOTE */}
            {hero.ctaNote && (
              <p
                className="text-sm italic opacity-80"
                style={{ color: themeForBiz.colors.secondary }}
              >
                {hero.ctaNote}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* --------------------------------------------- */}
      {/* RIGHT COLUMN - Hero Image */}
      {/* --------------------------------------------- */}
      <div className="w-full lg:w-5/12 xl:w-6/12">
        <img
          src={hero.image}
          alt="Hero Visual"
          className="w-full h-64 sm:h-96 lg:h-screen object-cover"
        />
      </div>
    </section>
  );
}
