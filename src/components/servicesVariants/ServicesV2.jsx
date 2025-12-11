// src/components/servicesVariants/ServicesV2.jsx
"use client";
import React from "react";
import Link from "next/link";

/** normalize an item to a predictable shape */
function normalizeItem(it = {}, idx = 0) {
  const id = it.id ?? it.key ?? `service-${idx}`;
  const title = it.title ?? it.h_1 ?? "";
  const description = it.description ?? it.para ?? "";
  const image = it.image ?? it.img ?? "";
  const imageAlt = it.imageAlt ?? it.alt ?? title ?? `service-${idx}`;
  const href = (it.cta && it.cta.href) ?? it.href ?? "#";

  return { id, title, description, image, imageAlt, href, raw: it };
}

export default function ServicesV2(props) {
  // prefer props.items (normalized by Services.jsx), fallback to old data shape
  const data = props.data ?? {};
  const rawItems = Array.isArray(props.items)
    ? props.items
    : Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data?.cards)
    ? data.cards
    : [];

  const items = rawItems.map((it, i) => normalizeItem(it, i));

  const title = props.meta?.title ?? data.title ?? "";

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {title && <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>}

        {/* responsive horizontal row: stacks on mobile, row on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <Link
              key={it.id}
              href={it.href || "#"}
              className="group block bg-white/5 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row items-stretch h-full">
                {it.image ? (
                  <div className="w-full md:w-40 h-44 md:h-auto flex-shrink-0">
                    {/* TODO: migrate to next/image for better optimization */}
                    <img
                      src={it.image}
                      alt={it.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-medium group-hover:text-primary">
                      {it.title}
                    </h3>
                    {it.description ? (
                      <p className="mt-2 text-sm text-muted">{it.description}</p>
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
            <Link
              href={data.cta.href || "#"}
              className="inline-block px-6 py-2 bg-primary text-background rounded-md"
            >
              {data.cta.label || "Explore services"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
