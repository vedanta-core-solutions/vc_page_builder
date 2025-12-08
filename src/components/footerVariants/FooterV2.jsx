// src/components/footerVariants/FooterV2.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterV2({ data = {} }) {
  // normalized data fields (from footerUtils.normalizeFooter)
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const iconsMap = data.icons || {};
  const bg = typeof data.backgroundImage === "string" && data.backgroundImage.trim()
    ? (data.backgroundImage.startsWith("/") ? data.backgroundImage : `/${data.backgroundImage}`)
    : null;
  const overlay = typeof data.overlayOpacity === "number" ? data.overlayOpacity : 0.2;
  const bgPosition = data.backgroundPosition || "center";
  const bgAlt = data.backgroundAlt || "";

  const logo = data.logo || "";
  console.log("suman",logo)
  const logoHref = data.logoHref || "/";
  const logoAlt = data.logoAlt || "";

  const year = new Date().getFullYear();

  // helper to find a column by key
  const findCol = (key) => columns.find((c) => c.key === key);
  const supportCol = findCol("support");
  const companyCol = findCol("company");
  const legalCol = findCol("legal");
  const socialCol = findCol("social");

  return (
    <footer className="relative w-full pt-10 pb-8 border-t font-base overflow-hidden">
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
            // style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
            className="absolute inset-0 pointer-events-none bg-accent/60"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-6">
          {/* Logo area */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            {logo && (
              <Link href={logoHref} aria-label={logoAlt || "logo"} className="inline-flex items-center">
                <img src={logo} alt={logoAlt || "logo"} className="h-12 w-auto" />
              </Link>
            )}
          </div>

          {/* Center columns area */}
          <div className="w-full md:flex-1 flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left">
                {supportCol && (
                  <nav aria-label={supportCol.title}>
                    <h4 className="text-base font-semibold mb-3">{supportCol.title}</h4>
                    <ul className="space-y-2 text-sm">
                      {supportCol.items.map((it, i) => (
                        <li key={i}>
                          <Link href={it.href || "#"} className="block py-1 hover:text-primary transition">
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {companyCol && (
                  <nav aria-label={companyCol.title}>
                    <h4 className="text-base font-semibold mb-3">{companyCol.title}</h4>
                    <ul className="space-y-2 text-sm">
                      {companyCol.items.map((it, i) => (
                        <li key={i}>
                          <Link href={it.href || "#"} className="block py-1 hover:text-primary transition">
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {legalCol && (
                  <nav aria-label={legalCol.title}>
                    <h4 className="text-base font-semibold mb-3">{legalCol.title}</h4>
                    <ul className="space-y-2 text-sm">
                      {legalCol.items.map((it, i) => (
                        <li key={i}>
                          <Link href={it.href || "#"} className="block py-1 hover:text-primary transition">
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>

          {/* Right column: social + copyright */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-end">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              {(socialCol?.items || []).map((it, i) => {
                const icon = it.icon || (it.iconRef ? iconsMap[it.iconRef] : null);
                const isExternal = typeof it.href === "string" && it.href.startsWith("http");
                return (
                  <a
                    key={i}
                    href={it.href || "#"}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex p-2 rounded hover:bg-white/10 transition hidden md:inline-flex"
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

            <div className="text-sm flex flex-col items-center md:items-end">
              <p className="leading-tight">© {year} {data.copyRight?.text}</p>
              <p className="text-xs opacity-90 mt-1">{data.copyRight?.builtWith}</p>
            </div>
          </div>
        </div>

        {/* Mobile social row */}
        <div className="md:hidden flex justify-center gap-4 mt-4">
          {(socialCol?.items || []).map((it, i) => {
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
      </div>
    </footer>
  );
}
