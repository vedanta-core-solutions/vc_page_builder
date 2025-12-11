"use client";
import React from "react";
import { useContext } from "react";
import { ContentContext } from "@/context/ContentContext";

export default function Pricing() {
  const { content } = useContext(ContentContext) || {};
  const pricing = content?.pricing;
  if (!pricing) return null; // safe-guard

  const heading = pricing.heading || "Pricing";
  const lead = pricing.lead || "";
  const plans = Array.isArray(pricing.plans) ? pricing.plans : [];

  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
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
          {plans.map((plan, idx) => {
            const id = plan.id ?? idx;
            const name = plan.name ?? plan.title ?? "Plan";
            const price = plan.price ?? plan.amount ?? "";
            const period = plan.period ? `/${plan.period}` : "";
            const desc = plan.description ?? "";
            const features = plan.features || {};
            const badge = plan.badge || null;
            const isHighlighted = badge || plan.popular || false;

            // Choose card styles — highlighted plan stands out
            const cardClass = isHighlighted
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-xl p-8 transform scale-105"
              : "bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8";

            return (
              <div key={id} className={cardClass}>
                {badge && (
                  <div className={isHighlighted ? "bg-white/20 inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4" : "bg-indigo-100 inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4 text-indigo-600"}>
                    {badge}
                  </div>
                )}

                <h3 className={isHighlighted ? "text-2xl font-bold text-white mb-2" : "text-2xl font-bold text-gray-800 dark:text-white mb-2"}>
                  {name}
                </h3>
                {desc && <p className={isHighlighted ? "text-indigo-200 mb-6" : "text-gray-600 dark:text-gray-300 mb-6"}>{desc}</p>}

                <div className="mb-6">
                  <span className={isHighlighted ? "text-4xl font-bold text-white" : "text-4xl font-bold text-gray-800 dark:text-white"}>
                    {price}
                  </span>
                  <span className={isHighlighted ? "text-indigo-200 ml-2" : "text-gray-600 dark:text-gray-300 ml-2"}>
                    {period}
                  </span>
                </div>

                {/* Features list: if features is object, show keys that are true; if array, show all */}
                <ul className="space-y-3 mb-8">
                  {Array.isArray(plan.features) ? (
                    plan.features.map((f, i) => (
                      <li key={i} className={isHighlighted ? "text-white" : "text-gray-700 dark:text-gray-300 flex items-center"}>
                        <span className="mr-2">{isHighlighted ? "✓" : "✓"}</span>
                        <span>{f}</span>
                      </li>
                    ))
                  ) : (
                    Object.keys(features).map((featKey) => {
                      const ok = !!features[featKey];
                      return (
                        <li key={featKey} className={isHighlighted ? "text-white flex items-center" : ok ? "text-gray-700 dark:text-gray-300 flex items-center" : "text-gray-400 flex items-center"}>
                          <span className="mr-2">{ok ? "✓" : "✗"}</span>
                          <span>{featKey}</span>
                        </li>
                      );
                    })
                  )}
                </ul>

                {/* CTA */}
                <div>
                  {plan.button ? (
                    <a
                      href={plan.button.href || "#"}
                      className={isHighlighted ? "w-full inline-block py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 font-semibold text-center" : "w-full inline-block py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-colors text-center"}
                    >
                      {plan.button.label || "Choose Plan"}
                    </a>
                  ) : (
                    <button className={isHighlighted ? "w-full py-3 bg-white text-indigo-600 rounded-full font-semibold" : "w-full py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-full"}>
                      Choose Plan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
