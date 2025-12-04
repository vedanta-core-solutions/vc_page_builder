// src/components/servicesVariants/ServicesV2.jsx
"use client";
import React from "react";
import Link from "next/link";

export default function ServicesV2({ data = {} }) {
  const items = data.items || data.cards || [];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {data.title && <h2 className="text-2xl font-semibold mb-6 text-center">{data.title}</h2>}

        {/* responsive horizontal row: stacks on mobile, row on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Link
              key={i}
              href={it.href || "#"}
              className="group block bg-white/5 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row items-stretch h-full">
                {it.image && (
                  <div className="w-full md:w-40 h-44 md:h-auto flex-shrink-0">
                    <img
                      src={it.image}
                      alt={it.title || it.h_1 || `service-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-medium group-hover:text-primary">{it.title || it.h_1}</h3>
                    {it.description || it.para ? (
                      <p className="mt-2 text-sm text-muted">{it.description || it.para}</p>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      Learn more →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* optional CTA row */}
        {data.cta && (
          <div className="mt-8 text-center">
            <Link href={data.cta.href || "#"} className="inline-block px-6 py-2 bg-primary text-background rounded-md">
              {data.cta.label || "Explore services"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
