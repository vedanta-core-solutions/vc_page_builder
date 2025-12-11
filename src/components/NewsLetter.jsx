// src/components/NewsLetter.jsx
"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { ContentContext } from "@/context/ContentContext";

export default function NewsLetter() {
  const { content } = useContext(ContentContext) || {};
  const newsletter = content?.newsletter;
  if (!newsletter) return null;

  const heading = newsletter.heading || "Stay Updated";
  const lead = newsletter.lead || newsletter.subtitle || "";
  const placeholder = newsletter.placeholder || "Enter your email";
  const buttonLabel = newsletter.buttonLabel || (newsletter.button?.label ?? "Subscribe");

  // simple client-side state for demo
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "ok" | "error"
  const [msg, setMsg] = useState("");

  function validateEmail(e) {
    // simple regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    setStatus(null);
    setMsg("");
    const trimmed = (email || "").trim();
    if (!trimmed) {
      setStatus("error");
      setMsg("Please enter your email.");
      return;
    }
    if (!validateEmail(trimmed)) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }

    // Demo behaviour: show success and clear field.
    // Replace this with fetch(...) to your API endpoint when ready.
    setStatus("ok");
    setMsg("Thanks — you're subscribed (demo).");
    setEmail("");

    // Optional: if newsletter.successRedirect exists, navigate there.
    if (newsletter.successRedirect) {
      try {
        window.location.href = newsletter.successRedirect;
      } catch (e) {}
    }
  }

  return (
    <section id="newsletter" className="py-20 px-6 bg-linear-to-r from-indigo-400 to-red-500">
      <div className="max-w-4xl mx-auto text-center">
        {heading && <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>}
        {lead && <p className="text-xl text-indigo-200 mb-8">{lead}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white border border-blue-800"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition-colors font-semibold"
          >
            {buttonLabel}
          </button>
        </form>

        {/* status message */}
        <div className="mt-4 min-h-[1.25rem]">
          {status === "error" && <p className="text-sm text-yellow-100">{msg}</p>}
          {status === "ok" && <p className="text-sm text-green-100">{msg}</p>}
        </div>

        {/* optional small note */}
        {newsletter.note && <p className="text-xs text-indigo-200 mt-4">{newsletter.note}</p>}
      </div>
    </section>
  );
}
