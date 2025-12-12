'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function HeaderV6({ navbar = {} }) {
  const {
    logo,
    logoText,
    logoHref = '/',
    navlink = [],
    tagline,
    supportLinks = [],
    contactChip,
    accentButton,
    ghostButton,
    button = [],
  } = navbar;

  const [open, setOpen] = useState(false);
  const navLinks = Array.isArray(navlink) ? navlink : [];
  const supportItems = Array.isArray(supportLinks) ? supportLinks : [];
  const buttonList = Array.isArray(button) ? button : [];
  const primaryCta = accentButton || buttonList[0] || null;
  const secondaryCta = ghostButton || buttonList[1] || null;

  return (
    <header className="font-base">
      {supportItems.length > 0 && (
        <div className="bg-slate-950 text-white text-xs sm:text-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4">
              {supportItems.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white/80 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {contactChip?.label && (
              <Link
                href={contactChip.href || '#'}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-white/90 hover:text-white"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                {contactChip.label}
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link href={logoHref} className="flex items-center gap-3">
              {logo && (
                <img
                  src={logo}
                  alt={logoText || 'logo'}
                  className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                />
              )}
              <div>
                {logoText && (
                  <p className="text-lg font-semibold text-slate-900">{logoText}</p>
                )}
                {tagline && <p className="text-xs text-slate-500">{tagline}</p>}
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg"
                >
                  {secondaryCta.label}
                </Link>
              )}
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="px-5 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-800"
                >
                  {primaryCta.label}
                </Link>
              )}
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700"
              aria-label="Toggle navigation"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="text-2xl">{open ? '×' : '☰'}</span>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 sm:px-6 pb-6">
            <nav className="flex flex-col gap-2 py-4">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="w-full rounded-lg bg-slate-900 py-3 text-center text-base font-semibold text-white"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="w-full rounded-lg border border-slate-200 py-3 text-center text-base font-medium text-slate-700"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
