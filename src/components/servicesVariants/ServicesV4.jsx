// src/components/servicesVariants/ServicesV4.jsx
"use client";
import React from "react";
import Image from "next/image";

/**
 * Props expected:
 * - data: raw variant data (from JSON)
 * - items: normalized items array (from Services wrapper)
 * - meta: section meta (title / subtitle)
 * - variantKey: friendly label or key
 */
export default function ServicesV4({ data = {}, items = [], meta = {} }) {
  const heading = meta?.title ?? meta?.heading ?? data?.title ?? "";
  const lead = meta?.subtitle ?? meta?.lead ?? data?.subtitle ?? "";

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="services" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {(heading || lead) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {heading}
              </h2>
            )}
            {lead && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {lead}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <article
              key={item.id ?? idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-labelledby={`svc-${idx}-title`}
            >
              {/* ICON / IMAGE (plain circle style) */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mb-4"
                   style={{ backgroundColor: item.raw?.bgColor || undefined }}>
                {item.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title || "service"}
                      fill
                      style={{ objectFit: "cover", borderRadius: "9999px" }}
                    />
                  </div>
                ) : item.raw?.icon || item.icon ? (
                  <span className="text-2xl">{item.raw?.icon ?? item.icon}</span>
                ) : (
                  <span className="text-lg font-bold">{(item.title || "").charAt(0)}</span>
                )}
              </div>

              <h3 id={`svc-${idx}-title`} className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h3>

              {item.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
              )}

              {item.cta?.label && (
                <a
                  href={item.cta.href || "#"}
                  className="inline-block text-sm font-medium px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition"
                >
                  {item.cta.label}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
