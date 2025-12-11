"use client";
import React from "react";
import { useContext } from "react";
import {ContentContext} from "../context/ContentContext";

export default function About() {
  const { content } = useContext(ContentContext) || {};
  const about = content?.about;
  if (!about) return null; // safe-guard

  const heading = about.heading || "";
  const lead = about.lead || about.subtitle || "";
  const cards = Array.isArray(about.cards) ? about.cards : [];

  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-800">
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

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const icon = card.icon || card.iconEmoji || "🔹";
            const title = card.title || "";
            const desc = card.description || "";

            return (
              <div
                key={card.id ?? idx}
                className="bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                  {/* icon could be emoji or short text */}
                  <span aria-hidden="true">{icon}</span>
                </div>
                {title && (
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {title}
                  </h3>
                )}
                {desc && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
