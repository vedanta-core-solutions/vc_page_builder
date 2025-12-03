// src/components/servicesVariants/ServicesV3.jsx
"use client";
import React from "react";
import Link from "next/link";

function Icon({ name }) {
  // small set of inline svgs, extend as needed
  switch (name) {
    case "calendar":
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
    case "gift":
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
    case "star":
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.8 6.9L22 11l-5 3.9L18.6 22 12 18.3 5.4 22 7 14.9 2 11l7.2-1.1L12 3z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    default:
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/></svg>;
  }
}

export default function ServicesV3({ data = {} }) {
  const items = data.items || data.cards || [];
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {data.title && <h2 className="text-2xl font-semibold mb-6 text-center">{data.title}</h2>}

        <ul className="space-y-3">
          {items.map((it, idx) => (
            <li key={idx} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded bg-white/7">
                  <Icon name={it.icon || it.iconName || "default"} />
                </span>
                <div>
                  <h3 className="text-base font-medium">{it.title || it.h_1}</h3>
                  {it.description || it.para ? (
                    <p className="text-sm text-muted mt-1">{it.description || it.para}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href={it.href || "#"} className="px-3 py-2 text-sm rounded-md border border-white/8 hover:bg-white/5 transition">
                  Learn
                </Link>
                {it.cta && (
                  <Link href={it.cta.href} className="px-3 py-2 bg-primary text-background rounded-md text-sm">
                    {it.cta.label}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        {data.cta && (
          <div className="mt-8 text-center">
            <Link href={data.cta.href || "#"} className="inline-block px-6 py-2 bg-primary text-background rounded-md">
              {data.cta.label || "Get started"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
