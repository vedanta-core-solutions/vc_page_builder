// src/components/servicesVariants/ServicesV1.jsx
"use client";
import React from "react";
import Link from "next/link";

export default function ServicesV1({ data = {} }) {
  // New JSON uses either top_heading + cards OR items; support both just in case
  const topHeading = data.top_heading?.[0] || {};
  const cards = data.cards || data.items || [];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top heading */}
        {topHeading.h_1 && (
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold">{topHeading.h_1}</h2>
            {topHeading.text && (
              <p className="mt-3 max-w-3xl mx-auto text-sm sm:text-base text-muted">
                {topHeading.text}
              </p>
            )}
          </div>
        )}

        {/* Cards area */}
        <div className="space-y-8">
          {cards.map((card, idx) => {
            // alignment can be "left" or "right" — on md+ we use a 2-col layout swapping image/text
            const alignLeft = (card.alignment || "left") === "left";

            return (
              <article
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                aria-labelledby={`service-${idx}-title`}
              >
                {/* Image column */}
                <div
                  className={`md:col-span-5 ${alignLeft ? "md:order-1" : "md:order-2"} `}
                >
                  {card.img && (
                    <div className="w-full h-56 md:h-48 lg:h-64 rounded-lg overflow-hidden shadow-sm bg-gray-50">
                      <img
                        src={card.img}
                        alt={card.h_1 || `service-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Content column */}
                <div
                  className={`md:col-span-7 ${alignLeft ? "md:order-2" : "md:order-1"} `}
                >
                  <div className="bg-white/5 p-6 rounded-lg h-full flex flex-col justify-between">
                    <div>
                      <h3 id={`service-${idx}-title`} className="text-xl font-semibold">
                        {card.h_1}
                      </h3>
                      {card.para && (
                        <p className="mt-3 text-sm leading-relaxed text-muted whitespace-pre-line">
                          {card.para}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      {/* If user used full link routes, use it, otherwise keep button to '#'. */}
                      <Link
                        href={card.href || "#"}
                        className="inline-flex items-center px-4 py-2 bg-primary text-background rounded-md text-sm font-medium hover:opacity-95 transition"
                      >
                        {card.btn ? card.btn : "Learn more"}
                      </Link>

                      {/* small meta / optional alignment badge */}
                      {card.alignment && (
                        <span className="text-xs text-muted ml-2 hidden sm:inline-block">
                          {card.alignment === "left" ? "Image left" : "Image right"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
