'use client';
import React from 'react';
import { useContent } from '@/context/ContentContext';
import Link from 'next/link';

export default function Header() {
  const { navbar } = useContent().content;

  return (
    <header className="bg-background shadow-card font-base">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">

          <div className="shrink-0">
            <Link href="/">
              <img
                className="h-12 w-auto"
                src={navbar.logo}
                alt="Company Logo"
              />
            </Link>
          </div>

          <nav className="flex items-center space-x-10">
            {navbar.navlink?.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="text-secondary hover:text-primary text-lg"
              >
                {item.label}
              </Link>
            ))}

            {navbar.button?.map((btn, idx) => (
              <Link
                key={idx}
                href={btn.href}
                className="px-5 py-2 bg-primary text-background rounded-base transition text-lg shadow-sm"
              >
                {btn.label}
              </Link>
            ))}
          </nav>

        </div>
      </div>
    </header>
  );
}
