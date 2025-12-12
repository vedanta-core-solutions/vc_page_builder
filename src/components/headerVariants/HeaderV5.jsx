'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function HeaderV5({ navbar = {} }) {
  const {
    logo,
    logoText,
    logoHref = '/',
    navlink = [],
    primaryButton,
    secondaryButton,
    announcement,
    tagline,
    button = [],
  } = navbar;

  const [open, setOpen] = useState(false);
  const navLinks = Array.isArray(navlink) ? navlink : [];
  const buttonList = Array.isArray(button) ? button : [];
  const fallbackPrimary = primaryButton || buttonList[0] || null;
  const fallbackSecondary = secondaryButton || buttonList[1] || null;

  return (
    <header className="font-base">
      {announcement?.text && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-center gap-2 text-sm">
            {announcement.eyebrow && (
              <span className="uppercase tracking-wide text-xs font-semibold bg-white/30 px-2 py-0.5 rounded-full">
                {announcement.eyebrow}
              </span>
            )}
            <a
              href={announcement.href || '#'}
              className="inline-flex items-center gap-2 font-medium hover:underline"
            >
              <span>{announcement.text}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      )}

      <div className="border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 gap-4">
            <Link href={logoHref} className="flex items-center gap-3">
              {logo && (
                <img
                  src={logo}
                  alt={logoText || 'logo'}
                  className="h-11 w-11 rounded-2xl border border-slate-200 object-cover"
                />
              )}
              <div className="space-y-0.5">
                {logoText && (
                  <p className="text-lg font-semibold text-slate-900">{logoText}</p>
                )}
                {tagline && <p className="text-xs text-slate-500">{tagline}</p>}
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 rounded-full bg-slate-100/70 px-2 py-1.5">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {fallbackSecondary && (
                <Link
                  href={fallbackSecondary.href}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-full"
                >
                  {fallbackSecondary.label}
                </Link>
              )}
              {fallbackPrimary && (
                <Link
                  href={fallbackPrimary.href}
                  className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
                >
                  {fallbackPrimary.label}
                </Link>
              )}
            </div>

            <button
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700"
              aria-label="Toggle navigation"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="text-2xl">{open ? '×' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-b border-slate-100 bg-white px-4 sm:px-6 pb-6">
          <nav className="flex flex-col gap-2 py-4">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            {fallbackPrimary && (
              <Link
                href={fallbackPrimary.href}
                className="w-full rounded-xl bg-indigo-600 py-3 text-center text-base font-semibold text-white"
              >
                {fallbackPrimary.label}
              </Link>
            )}
            {fallbackSecondary && (
              <Link
                href={fallbackSecondary.href}
                className="w-full rounded-xl border border-slate-200 py-3 text-center text-base font-medium text-slate-700"
              >
                {fallbackSecondary.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
