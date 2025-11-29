"use client";

import Link from "next/link";
import { useContent } from "@/context/ContentContext";

export default function Footer() {
  const { content } = useContent();
  const footer = content?.footer;
  if (!footer) return null;

  const columns = footer.columns || {};
  const social = columns.social || [];
  const navColumns = Object.entries(columns).filter(([key]) => key !== "social");

  const copyRight = footer.copyRight;
  const year = new Date().getFullYear();

  return (
    <footer className="w-full pt-12 pb-6 border-t border-gray-800 bg-background font-base">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {navColumns.map(([key, items]) => (
            <div key={key}>
              <h3 className="text-black text-lg mb-4">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>

              <ul className="space-y-2 text-sm">
                {items.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="hover:text-secondary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {social.length > 0 && (
            <div>
              <h3 className="text-black text-lg mb-4">Follow Us</h3>
              <div className="flex items-start gap-4">
                {social.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary inline-flex"
                    aria-label={item.label}
                  >
                    <svg
                      viewBox={item.icon?.viewBox}
                      className="w-6 h-6 fill-current"
                      aria-hidden="true"
                    >
                      <path d={item.icon?.path} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© {year} {copyRight?.text}</p>
          <p className="mt-3 md:mt-0">{copyRight?.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
