"use client";
import React from "react";
import { useContext } from "react";
import Image from "next/image";
import { ContentContext } from "@/context/ContentContext";

export default function Portfolio() {
  const { content } = useContext(ContentContext) || {};
  const portfolio = content?.portfolio;
  if (!portfolio) return null;

  const heading = portfolio.heading || "Portfolio";
  const lead = portfolio.lead || portfolio.subtitle || "";
  const items = Array.isArray(portfolio.items) ? portfolio.items : [];

  if (!items.length) return null;

  return (
    <section id="portfolio" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const title = item.title || "";
            const category = item.category || "";
            const src = item.image || item.src || "/portfolio.jpg";

            return (
              <article
                key={item.id ?? idx}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
              >
                <div className="relative w-full h-64">
                  {/* Next/Image needs width/height, here we use fill via parent size */}
                  <Image
                    src={src}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {title && <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>}
                  {category && <p className="text-gray-200 text-sm">{category}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
