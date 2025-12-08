// src/components/servicesVariants/ServicesV1.jsx
"use client";
import React from "react";
import Link from "next/link";

/**
 * Normalize input card (old shape or new canonical shape)
 * returns: { id, title, description, image, imageAlt, cta, alignment, raw }
 */
function normalizeCard(card = {}, idx = 0) {
  if (!card) {
    return {
      id: `service-${idx}`,
      title: "",
      description: "",
      image: "",
      imageAlt: "",
      cta: undefined,
      alignment: "left",
      raw: card,
    };
  }

  const id = card.id ?? card.key ?? card.id ?? `service-${idx}`;
  const title = card.title ?? card.h_1 ?? "";
  const description = card.description ?? card.para ?? "";
  const image = card.image ?? card.img ?? "";
  const imageAlt = card.imageAlt ?? card.alt ?? title ?? `service-${idx}`;
  const alignment = card.alignment ?? "left";

  let cta;
  if (card.cta && typeof card.cta === "object") {
    cta = { label: card.cta.label ?? "Learn more", href: card.cta.href ?? "#" };
  } else if (card.btn || card.href) {
    cta = { label: card.btn ?? "Learn more", href: card.href ?? "#" };
  } else {
    cta = undefined;
  }

  return { id, title, description, image, imageAlt, cta, alignment, raw: card };
}

export default function ServicesV1(props) {
  // Accept both legacy `data.cards` and new `items`
  const data = props.data ?? {};
  const itemsProp = props.items ?? null;
  const topHeading = data.top_heading?.[0] ?? {};

  const rawCards = Array.isArray(itemsProp)
    ? itemsProp
    : Array.isArray(data?.cards)
    ? data.cards
    : [];

  const cards = rawCards.map((c, i) => normalizeCard(c, i));

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top heading */}
        {(topHeading.h_1 || props.meta?.title) && (
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {topHeading.h_1 ?? props.meta?.title}
            </h2>
            {(topHeading.text || props.meta?.subtitle) && (
              <p className="mt-3 max-w-3xl mx-auto text-sm sm:text-base text-muted">
                {topHeading.text ?? props.meta?.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Cards area */}
        <div className="space-y-8">
          {cards.map((card, idx) => {
            const alignLeft = card.alignment === "left";

            return (
              <article
                key={card.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                aria-labelledby={`service-${card.id}-title`}
              >
                {/* Image column */}
                <div className={`md:col-span-5 ${alignLeft ? "md:order-1" : "md:order-2"}`}>
                  {card.image ? (
                    <div className="w-full h-56 md:h-48 lg:h-64 rounded-lg overflow-hidden shadow-sm bg-gray-50">
                      {/* TODO: migrate to next/image for optimization */}
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-56 md:h-48 lg:h-64 rounded-lg overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center text-sm text-muted">
                      No image
                    </div>
                  )}
                </div>

                {/* Content column */}
                <div className={`md:col-span-7 ${alignLeft ? "md:order-2" : "md:order-1"}`}>
                  <div className="bg-white/5 p-6 rounded-lg h-full flex flex-col justify-between">
                    <div>
                      <h3 id={`service-${card.id}-title`} className="text-xl font-semibold">
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="mt-3 text-sm leading-relaxed text-muted whitespace-pre-line">
                          {card.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <Link
                        href={card.cta?.href ?? "#"}
                        className="inline-flex items-center px-4 py-2 bg-primary text-background rounded-md text-sm font-medium hover:opacity-95 transition"
                        aria-label={card.cta?.label ?? `Learn more about ${card.title || "service"}`}
                      >
                        {card.cta?.label ?? "Learn more"}
                      </Link>

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
