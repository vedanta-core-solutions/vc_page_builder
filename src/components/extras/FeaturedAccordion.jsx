"use client";

import { useState } from "react";

export default function FeatureAccordion({ f, isAllowed, settings }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-lg transition-all duration-300 ${
        isOpen ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
        borderColor: "var(--color-surface)",
      }}
    >
      <button
        className="w-full p-4 text-left flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">{f.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl">
            {isAllowed(f.key) ? (
              <span style={{ color: "var(--color-accent)" }}>✓</span>
            ) : (
              <span className="opacity-40">—</span>
            )}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 text-sm opacity-80">
          {f.description ||
            "A detailed description of this feature can be added here."}
        </div>
      )}
    </div>
  );
}
