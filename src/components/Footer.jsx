"use client";
import React from "react";
import Link from "next/link";
import { useConfig } from "../context/ConfigProviderClient";

const VARIANT_LAYOUTS = {
  1: ["company", "support", "legal", "icons"],
  2: ["company", "legal", "support", "social"],
  3: ["social", "company", "support", "legal"],
};

export default function Footer() {
  const config = useConfig();

  if (!config) {
    console.log("theme is not accessing");
    return null;
  }
  const { themeForBiz, content } = config;

  const footerConfig = config?.content?.footer || {};
  const variant = footerConfig.variant || 1;
  const columns = footerConfig.columns || {};
  const layout = VARIANT_LAYOUTS[variant] || VARIANT_LAYOUTS[1];


  const finalColumns = {};
  layout.forEach((key) => {
    if (Array.isArray(columns[key]) && columns[key].length > 0) {
      finalColumns[key] = columns[key];
    } else {
      finalColumns[key] = null;
    }
  });

  return (
    <footer
      style={{
        fontFamily: themeForBiz.font,
        background: themeForBiz.colors.accent,
      }}
      className="w-full pt-12 pb-6 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {layout.map((key) => {
            const items = finalColumns[key];
            if (!items) return null;

            const title =
              key === "social"
                ? "Follow Us"
                : key.charAt(0).toUpperCase() + key.slice(1);

            return (
              <div key={key}>
                <h3 className="text-black text-lg mb-4">{title}</h3>

                {key === "social" ? (
                  <div className="text-2xl grid items-start justify-start px-7 ">
                    {/* <div className="grid sm:grid-cols-2 gap-x-2 gap-y-6">
                      {items.map((it, i) => (
                        <Link
                          key={i}
                          href={it.href}
                          className="hover:text-white border-2 rounded-full p-1"
                        >
                          {it.icon || it.label || "🔗"}
                        </Link>
                      ))}
                    </div> */}
                    {content?.footer?.columns?.icons.map((icon, i) => (
                      <div key={i} className="hover:text-white">
                        <Link
                          key={i}
                          href={icon.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <svg
                            viewBox={icon.viewBox}
                            className="w-6 h-6 fill-current "
                            
                          >
                            <path d={icon.path} />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {items.map((it, i) => (
                      <li key={i}>
                        <Link href={it.href} className="hover:text-white">
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-800 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="">
            © {new Date().getFullYear()} VedantaCore. All rights reserved.
          </p>
          <p className="mt-3 md:mt-0">Built with VCBuilder.</p>
        </div>
      </div>
    </footer>
  );
}
