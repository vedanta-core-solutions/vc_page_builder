"use client";

import useConfig from "../lib/config"; // adjust path if needed

export default function FeatureSection() {
  const { features } = useConfig(); // farming features come directly from JSON

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Key Features
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feat, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
              {/* Icon */}
              <div className="text-4xl mb-3">{feat.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feat.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
