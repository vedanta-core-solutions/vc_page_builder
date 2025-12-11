"use client";
import React from "react";
import Link from "next/link";

/** deterministic classname helper (no deps) */
function cn(...parts) {
  return parts
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** small inline icon set (kept outside render) */
function Icon({ name, className = "" }) {
  const base = cn("w-5 h-5", className);
  switch (name) {
    case "calendar":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "gift":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "star":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3l2.8 6.9L22 11l-5 3.9L18.6 22 12 18.3 5.4 22 7 14.9 2 11l7.2-1.1L12 3z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

/**
 * ServicesV3 - Minimal Clean UI
 * expects props.items = [{ id, title, description, icon, href, cta, raw }]
 * and props.meta for heading/cta if any.
 */
export default function ServicesV3(props) {
  const data = props.data ?? {};
  const items = Array.isArray(props.items) ? props.items : Array.isArray(data?.items) ? data.items : [];
  const title = props.meta?.title ?? data.title ?? "";
  const sectionCta = data.cta;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">{title}</h2>
            {data.subtitle && <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">{data.subtitle}</p>}
          </div>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <li key={it.id} className="relative">
              <article
                aria-labelledby={`service-${it.id}-title`}
                className="h-full flex flex-col rounded-xl border border-slate-100 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Icon circle */}
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        "w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center",
                        "bg-slate-50 ring-1 ring-slate-100"
                      )}
                    >
                      <Icon name={it.icon} className="text-slate-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      id={`service-${it.id}-title`}
                      className="text-sm md:text-base font-medium text-slate-900 leading-snug"
                    >
                      {it.title}
                    </h3>

                    {it.description ? (
                      <p
                        className="mt-2 text-sm text-slate-500"
                        style={{
                          WebkitLineClamp: 3,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {it.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* footer actions: push to bottom */}
                <div className="mt-auto pt-4 flex items-center gap-3">
                  {/* subtle link to the main href */}
                  <Link
                    href={it.href || "#"}
                    className="text-sm font-medium text-sky-600 hover:underline inline-flex items-center gap-2"
                    aria-label={`Open ${it.title}`}
                  >
                    Learn more
                    <span className="transition-transform transform group-hover:translate-x-0.5">→</span>
                  </Link>

                  {/* primary CTA (if available) */}
                  {it.cta && it.cta.href ? (
                    <Link
                      href={it.cta.href}
                      className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-full text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
                      aria-label={it.cta.label || `Action for ${it.title}`}
                    >
                      {it.cta.label || "Get started"}
                    </Link>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* section CTA */}
        {sectionCta && (
          <div className="mt-8 text-center">
            <Link
              href={sectionCta.href || "#"}
              className="inline-block px-6 py-2 border border-slate-200 rounded-full text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              {sectionCta.label || "Explore services"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
