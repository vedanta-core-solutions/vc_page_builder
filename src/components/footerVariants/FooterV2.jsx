
"use client";

import React from "react";
import Link from "next/link";

export default function FooterV2({ data = {} }) {
  const columns = data.columns || {};
  const support = columns.support || [];
  const company = columns.company || [];
  const legal = columns.legal || [];
  const social = columns.social || [];

  const year = new Date().getFullYear();

  return (
    <footer className="w-full pt-10 pb-8 border-t font-base bg-accent">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-6">

          <div className="w-full md:w-auto flex justify-center ">
            {data.logo && (
              <Link href="/" className="inline-flex items-center">
                <img src={data.logo} alt="logo" className="h-12 w-auto" />
              </Link>
            )}
          </div>

 
          <div className="w-full md:flex-1 flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left">
                {/* SUPPORT */}
                <nav aria-label="Support">
                  <h4 className="text-base font-semibold mb-3">Support</h4>
                  <ul className="space-y-2 text-sm">
                    {support.map((it, i) => (
                      <li key={i}>
                        <Link href={it.href} className="block py-1 hover:text-primary transition">
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* COMPANY */}
                <nav aria-label="Company">
                  <h4 className="text-base font-semibold mb-3">Company</h4>
                  <ul className="space-y-2 text-sm">
                    {company.map((it, i) => (
                      <li key={i}>
                        <Link href={it.href} className="block py-1 hover:text-primary transition">
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* LEGAL */}
                <nav aria-label="Legal">
                  <h4 className="text-base font-semibold mb-3">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    {legal.map((it, i) => (
                      <li key={i}>
                        <Link href={it.href} className="block py-1 hover:text-primary transition">
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>


          <div className="w-full md:w-auto flex flex-col items-center">

            <div className="flex items-center gap-3 mb-3 md:mb-4">
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
                  <svg viewBox={it.icon?.viewBox} className="w-5 h-5 fill-current hidden md:block" aria-hidden="true">
                    <path d={it.icon?.path} />
                  </svg>
                </a>
              ))}
            </div>


            <div className="text-sm flex flex-col items-center">
              <p className="leading-tight">© {year} {data.copyRight?.text}</p>
              <p className="text-xs opacity-90 mt-1">{data.copyRight?.builtWith}</p>
            </div>
          </div>
        </div>


        <div className="border-t border-primary my-6" />


        <div className="md:hidden flex justify-center gap-4 mt-4">
          {social.map((it, i) => (
            <a
              key={i}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex p-2 rounded hover:bg-white/10 transition"
              aria-label={it.label}
            >
              <svg viewBox={it.icon?.viewBox} className="w-5 h-5 fill-current" aria-hidden="true">
                <path d={it.icon?.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
