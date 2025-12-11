// src/components/Features.jsx
"use client";
import React from "react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function Features() {
  const { content } = useContent() || {};
  const features = content?.features || content?.featuresList;
  if (!features) return null;

  const heading = features.heading || features.title || "Amazing Features";
  const lead = features.lead || features.subtitle || "";
  const items = Array.isArray(features.items) ? features.items : Array.isArray(features.list) ? features.list : [];
  const imageSrc = features.image || null;

  // layout control from JSON: "image-left" or "image-right" (default image-right)
  const layout = (features.layout || features.meta?.layout || "image-right").toLowerCase();
  const isImageLeft = layout === "image-left";

  if (!items.length) return null;

  return (
    <section id="features" className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        {(heading || lead) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">{heading}</h2>}
            {lead && <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{lead}</p>}
          </div>
        )}

        {/* two-column: list + image. Use order classes to switch on md+ */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LIST column */}
          <div className={`${isImageLeft ? "md:order-2" : "md:order-1"} order-1`}>
            <div className="space-y-6">
              {items.map((it, idx) => {
                const title = typeof it === "string" ? it : it.title || it.name || "";
                const desc = typeof it === "string" ? "" : it.description || it.subtitle || "";
                const id = (it && (it.id || it.key)) ?? idx;

                return (
                  <div key={id} className="flex gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <span className="text-xl">{idx + 1}</span>
                    </div>
                    <div>
                      {title && <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>}
                      {desc && <p className="text-gray-600 dark:text-gray-300">{desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IMAGE column */}
          <div className={`${isImageLeft ? "md:order-1" : "md:order-2"} order-2 relative`}>
            {imageSrc ? (
              <div className="relative">
                {/* skewed card */}
                <div className="relative rounded-2xl p-8 shadow-xl transform-gpu transition-transform duration-300 -skew-y-4 hover:skew-y-0 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                  <div className="overflow-hidden rounded-xl">
                    <Image src={imageSrc} alt={features.heading || "Features"} width={800} height={520} className="w-full h-auto object-cover rounded-xl" />
                  </div>
                </div>
              </div>
            ) : (
              // fallback placeholder block when no image provided
              <div className="rounded-2xl p-8 shadow-xl bg-linear-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                <div className="h-56 md:h-80 w-full rounded-xl bg-gray-200 dark:bg-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
