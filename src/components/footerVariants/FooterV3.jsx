// src/components/footerVariants/FooterV3.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function FooterV3({ data = {} }) {
  const cols = data.columns || {};
  const left = cols.left || [];
  const middle = cols.middle || [];
  const right = cols.right || [];
  const social = cols.social || [];
  const bgimg =
    typeof data.backgroundImage === "string" && data.backgroundImage.trim()
      ? data.backgroundImage.startsWith("/")
        ? data.backgroundImage
        : `/${data.backgroundImage}`
      : null;

  const year = new Date().getFullYear();
  console.log("DATA", data);
  return (
    <footer className="w-full pt-10 pb-6 border-t font-base absolute">
     
        {bgimg && (
          <Image
            src={bgimg}
            alt={
              data.copyRight?.text
                ? `Background for ${data.copyRight.text}`
                : ""
            }
            fill
            className="object-cover -z-10 bg-cover"
            sizes="100vw"
            priority={false}
          />
        )}
         <div className="absolute inset-0 bg-accent/60 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 justify-items-center">
            <div>
              <h4 className="text-base font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-sm">
                {left.map((it, i) => (
                  <li key={i}>
                    <Link
                      href={it.href}
                      className="block py-1 hover:text-primary transition"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-3">About</h4>
              <ul className="space-y-2 text-sm">
                {middle.map((it, i) => (
                  <li key={i}>
                    <Link
                      href={it.href}
                      className="block py-1 hover:text-primary transition"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center items-center  md:items-start">
              <div className="flex items-center justify-between md:justify-start mb-3">
                <h4 className="text-base font-semibold">Join</h4>
              </div>

              <ul className="space-y-2 text-sm flex flex-col justify-center items-center md:items-start">
                {right.map((it, i) => (
                  <li key={i}>
                    <Link
                      href={it.href}
                      className="block py-1 hover:text-primary transition"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {social.length > 0 && (
                <div className="mt-4 md:hidden  flex justify-center gap-4">
                  {social.map((it, i) => (
                    <a
                      key={i}
                      href={it.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex p-2 rounded hover:bg-white/10 transition"
                      aria-label={it.label}
                      title={it.label}
                    >
                      <svg
                        viewBox={it.icon?.viewBox}
                        className="w-5 h-5 fill-current"
                        aria-hidden="true"
                      >
                        <path d={it.icon?.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-surface border-dotted my-6" />

          <div className="text-center text-sm">
            <p className="mb-1">
              © {year} {data.copyRight?.text}
            </p>
            <p className="text-xs opacity-80">{data.copyRight?.builtWith}</p>
          </div>
        </div>

    </footer>
  );
}
