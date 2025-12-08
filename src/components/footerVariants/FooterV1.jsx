// src/components/footerVariants/FooterV1.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterV1({ data = {} }) {
  // data is expected normalized by src/components/Footer.jsx via normalizeFooter
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const iconsMap = data.icons || {};
  const bg = typeof data.backgroundImage === "string" && data.backgroundImage.trim()
    ? (data.backgroundImage.startsWith("/") ? data.backgroundImage : `/${data.backgroundImage}`)
    : null;
  const overlay = typeof data.overlayOpacity === "number" ? data.overlayOpacity : 0.2;
  const bgPosition = data.backgroundPosition || "center";
  const bgAlt = data.backgroundAlt || "";

  const logo = data.logo || "";
  const logoHref = data.logoHref || "/";
  const logoAlt = data.logoAlt || "";

  const year = new Date().getFullYear();

  // grid: use auto-fit so removing columns reflows with no gaps
  const gridStyle = {
    display: "grid",
    gap: "1.25rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    alignItems: "start"
  };

  return (
    <footer className="relative w-full pt-12 pb-6 border-t font-base overflow-hidden bg-background">
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
            style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Logo (optional) */}
        {logo && (
          <div className="mb-6 flex justify-center md:justify-start">
            <Link href={logoHref} aria-label={logoAlt || "logo"} className="inline-flex items-center">
              <img src={logo} alt={logoAlt} className="h-12 w-auto" />
            </Link>
          </div>
        )}

        {/* Columns */}
        <div style={gridStyle} className="mb-8">
          {columns.map((col) => (
            <div key={col.key} className="min-w-0">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">{col.title}</h3>

              {col.type === "social" ? (
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  {col.items.map((it, i) => {
                    const icon = it.icon || (it.iconRef ? iconsMap[it.iconRef] : null);
                    const isExternal = typeof it.href === "string" && it.href.startsWith("http");
                    return (
                      <a
                        key={i}
                        href={it.href || "#"}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:text-accent"
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
                  {col.items.map((it, idx) => (
                    <li key={idx} className="truncate">
                      {it.href ? (
                        <Link href={it.href} className="hover:text-accent">
                          {it.label}
                        </Link>
                      ) : (
                        <span>{it.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-accent my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-2">
          <p className="text-sm">© {year} {data.copyRight?.text}</p>
          <p className="text-sm">{data.copyRight?.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
