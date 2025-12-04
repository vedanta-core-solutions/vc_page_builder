"use client";

import React from "react";
import Link from "next/link";

export default function FooterV1({ data = {} }) {
  const columns = data.columns || {};
  const company = columns.company || [];
  const support = columns.support || [];
  const legal = columns.legal || [];
  const social = columns.social || [];
  
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full pt-12 pb-6 border-t font-base"
      style={{
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {company.map((it, i) => (
                <li key={i}><Link href={it.href} className="hover:text-secondary">{it.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {support.map((it, i) => (
                <li key={i}><Link href={it.href} className="hover:text-secondary">{it.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legal.map((it, i) => (
                <li key={i}><Link href={it.href} className="hover:text-secondary">{it.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex items-start gap-4">
              {social.map((it, i) => (
                <a key={i} href={it.href} target="_blank" rel="noreferrer" className="inline-flex" aria-label={it.label}>
                  <svg viewBox={it.icon?.viewBox} className="w-6 h-6 fill-current"><path d={it.icon?.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© {year} {data.copyRight?.text}</p>
          <p className="mt-3 md:mt-0">{data.copyRight?.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
