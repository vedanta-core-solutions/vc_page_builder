// src/components/footerVariants/FooterV3.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function FooterV3({ data = {} }) {
  // data is expected normalized by Footer.jsx (normalizeFooter)
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const iconsMap = data.icons || {};
  const bgRaw = data.backgroundImage;
  const bg = typeof bgRaw === "string" && bgRaw.trim() ? (bgRaw.startsWith("/") ? bgRaw : `/${bgRaw}`) : null;

  const overlay = typeof data.overlayOpacity === "number" ? data.overlayOpacity : 0.6;
  const bgPosition = data.backgroundPosition || "center";
  const bgAlt = data.backgroundAlt || "";

  const year = new Date().getFullYear();

  // grid columns: if 1 -> single; else responsive 1/3
  const gridColsClass = columns.length <= 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3";

  return (
    <footer className="w-full pt-10 pb-6 border-t font-base relative overflow-hidden">
      {/* Background */}
      {bg && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bg}
            alt={bgAlt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: bgPosition }}
            priority={false}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-background/90"
            // style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className={`grid gap-8 mb-8 ${gridColsClass} justify-items-center`}>
          {columns.map((col) => (
            <div key={col.key} className="min-w-0 w-full">
              <h4 className="text-base font-semibold mb-3 text-center md:text-left">{col.title}</h4>

              {col.type === "social" ? (
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {col.items.map((it, i) => {
                    const icon = it.icon || (it.iconRef ? iconsMap[it.iconRef] : null);
                    const isExternal = typeof it.href === "string" && it.href.startsWith("http");
                    return (
                      <a
                        key={i}
                        href={it.href || "#"}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex p-2 rounded hover:bg-white/10 transition"
                        aria-label={it.label}
                        title={it.label}
                      >
                        {icon ? (
                          <svg viewBox={icon.viewBox} className="w-5 h-5 fill-current" aria-hidden="true">
                            <path d={icon.path} />
                          </svg>
                        ) : (
                          <span className="sr-only">{it.label}</span>
                        )}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <ul className="space-y-2 text-sm text-center md:text-left">
                  {col.items.map((it, i) => (
                    <li key={i}>
                      <Link href={it.href || "#"} className="block py-1 hover:text-primary transition">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-surface border-dotted my-6" />

        <div className="text-center text-sm">
          <p className="mb-1">© {year} {data.copyRight?.text}</p>
          <p className="text-xs opacity-80">{data.copyRight?.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
