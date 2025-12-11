// src/components/Testimonials.jsx
"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function Testimonials() {
  // hook called unconditionally
  const { content, selectionMap } = useContent() || {};

  // root from JSON
  const testimonialsRoot = content?.testimonials ?? null;

  // rawItems computed inside useMemo (hook is unconditional)
  const rawItems = useMemo(() => {
    if (!testimonialsRoot) return [];
    if (Array.isArray(testimonialsRoot.items) && testimonialsRoot.items.length) return testimonialsRoot.items;
    if (Array.isArray(testimonialsRoot.list) && testimonialsRoot.list.length) return testimonialsRoot.list;
    // support variants later if you store items under variants.xxx.items
    if (testimonialsRoot.variants && typeof testimonialsRoot.variants === "object") {
      // try first variant that has items
      for (const key of Object.keys(testimonialsRoot.variants)) {
        const v = testimonialsRoot.variants[key];
        if (v && Array.isArray(v.items) && v.items.length) return v.items;
      }
    }
    return [];
  }, [testimonialsRoot]);

  // normalized items
  const items = useMemo(
    () =>
      rawItems
        .map((it, idx) => {
          if (!it) return null;
          return {
            id: it.id ?? it.key ?? idx,
            name: it.name ?? it.title ?? "",
            role: it.role ?? it.position ?? "",
            content: it.quote ?? it.content ?? it.review ?? "",
            avatar: it.avatar ?? it.image ?? null,
            rating: it.rating !== undefined ? Number(it.rating) : undefined,
            raw: it,
          };
        })
        .filter(Boolean),
    [rawItems]
  );

  // safe early returns AFTER hooks
  if (!testimonialsRoot) return null;
  if (!items.length) return null;

  const heading = testimonialsRoot.heading ?? testimonialsRoot.title ?? testimonialsRoot.label ?? "";
  const lead = testimonialsRoot.lead ?? testimonialsRoot.subtitle ?? "";

  return (
    <section id="testimonials" className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        {(heading || lead) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">{heading}</h2>}
            {lead && <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{lead}</p>}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it) => (
            <article key={it.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  {it.avatar ? (
                    <Image src={it.avatar} alt={it.name || "avatar"} fill style={{ objectFit: "cover" }} />
                  ) : (
                    <div className="w-12 h-12 bg-indigo-100 flex items-center justify-center rounded-full text-indigo-600">
                      {it.name ? it.name[0]?.toUpperCase() : "U"}
                    </div>
                  )}
                </div>

                <div>
                  {it.name && <p className="font-semibold text-gray-800 dark:text-white">{it.name}</p>}
                  {it.role && <p className="text-sm text-gray-500 dark:text-indigo-300">{it.role}</p>}
                </div>
              </div>

              {it.content && <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{it.content}"</p>}

              {it.rating && (
                <div className="flex items-center text-yellow-400 space-x-1">
                  {Array.from({ length: Math.min(5, Math.round(Number(it.rating) || 0)) }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
