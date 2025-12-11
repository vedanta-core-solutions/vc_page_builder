// src/components/footerVariants/FooterV4.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * FooterV4
 * - Expects `data` prop produced by src/components/Footer.jsx -> normalizeFooter
 * - shape:
 *   {
 *     logo: "/path.jpg",
 *     layout: "...",
 *     theme: { colorScheme: "dark"|"light" },
 *     columns: [ { key, title, type, items: [ { label, href } ] } ],
 *     copyRight: { text, builtWith }
 *   }
 *
 * No hardcoded text — everything read from `data`.
 */

export default function FooterV4({ data = {} }) {
  const {
    logo,
    columns = [],
    copyRight = {},
    theme = {},
    layout,
  } = data;

  const isDark = (theme?.colorScheme || "").toLowerCase() !== "light";

  return (
    <footer
      className={`w-full pt-12 pb-6 ${
        isDark ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-700"
      }`}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Columns */}
        {columns && columns.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-8">
            {columns.map((col) => (
              <div key={col.key} className="min-w-0">
                {col.title && (
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {col.title}
                  </h3>
                )}

                {col.type === "social" ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {(col.items || []).map((it, i) => {
                      const href = it.href || "#";
                      const isExternal = typeof href === "string" && href.startsWith("http");
                      return (
                        <a
                          key={i}
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:text-accent"
                          aria-label={it.label || "social-link"}
                          title={it.label}
                        >
                          {/* if an icon svg path provided, render it; else label fallback */}
                          {it.icon && it.icon.path ? (
                            <svg viewBox={it.icon.viewBox || "0 0 24 24"} className="w-5 h-5 fill-current" aria-hidden="true">
                              <path d={it.icon.path} />
                            </svg>
                          ) : (
                            <span className="sr-only">{it.label}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {(col.items || []).map((it, idx) => {
                      const href = it.href;
                      return (
                        <li key={idx} className="truncate">
                          {href ? (
                            // use next/link when internal (starts with / or #)
                            (typeof href === "string" && (href.startsWith("/") || href.startsWith("#"))) ? (
                              <Link href={href} className="hover:text-accent">
                                {it.label}
                              </Link>
                            ) : (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                                {it.label}
                              </a>
                            )
                          ) : (
                            <span>{it.label}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-800 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-2">
          <div className="flex items-center gap-4">
            {logo && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                {/* use fixed width/height to satisfy next/image requirements */}
                <Image
                  src={logo}
                  alt="footer-logo"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority={false}
                />
              </div>
            )}

            {copyRight?.text && (
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                {copyRight.text}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-3 md:mt-0">
            {copyRight?.builtWith && <p className={isDark ? "text-gray-300" : "text-gray-700"}>{copyRight.builtWith}</p>}

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isDark ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
