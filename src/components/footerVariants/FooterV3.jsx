// src/components/footerVariants/FooterV3.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function FooterV3({ data = {} }) {
  const cols = data.columns || {};
  const left = cols.left || [];
  const middle = cols.middle || [];
  const right = cols.right || [];
  const social = cols.social || [];

  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full pt-10 pb-6 border-t font-base"
      style={{
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Columns: stack on small, 3-col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* LEFT */}
          <div>
            {/* visible heading for a11y / design - change text or remove if not needed */}
            <h4 className="text-base font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              {left.map((it, i) => (
                <li key={i}>
                  <Link href={it.href} className="block py-1 hover:text-primary transition">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MIDDLE */}
          <div>
            <h4 className="text-base font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              {middle.map((it, i) => (
                <li key={i}>
                  <Link href={it.href} className="block py-1 hover:text-primary transition">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            {/* On md+: show social icons at top of right column alongside title.
                On small screens icons appear after the links (centered). */}
            <div className="flex items-start md:items-center justify-between md:justify-start mb-3">
              <h4 className="text-base font-semibold">Join</h4>

             
            </div>

            <ul className="space-y-2 text-sm">
              {right.map((it, i) => (
                <li key={i}>
                  <Link href={it.href} className="block py-1 hover:text-primary transition">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* social icons for mobile: centered and separated to avoid pushing links */}
            {social.length > 0 && (
              <div className="mt-4 md:hidden  flex justify-center gap-4">
                {social.map((it, i) => (
                  <a
                    key={i}
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex p-2 rounded hover:bg-white/10 transition"
                    aria-label={it.label}
                    title={it.label}
                  >
                    <svg viewBox={it.icon?.viewBox} className="w-5 h-5 fill-current" aria-hidden="true">
                      <path d={it.icon?.path} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* copyright (center on small, inline on md) */}
        <div className="text-center md:text-left text-sm">
          <p className="mb-1">© {year} {data.copyRight?.text}</p>
          <p className="text-xs opacity-80">{data.copyRight?.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
