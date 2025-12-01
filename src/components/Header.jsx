'use client';
import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { navbar } = useContent().content;
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background shadow-card font-base sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="shrink-0">
            <Link href="/">
              <img
                className="h-12 w-auto"
                src={navbar.logo}
                alt="Company Logo"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-10">
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

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 text-secondary"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE NAV */}
        {open && (
          <div className="md:hidden py-4 space-y-4">
            {navbar.navlink?.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="block text-secondary hover:text-primary text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {navbar.button?.length > 0 && (
              <div className="pt-2">
                {navbar.button.map((btn, idx) => (
                  <Link
                    key={idx}
                    href={btn.href}
                    className="block w-full text-center px-5 py-2 bg-primary text-background rounded-base transition text-lg shadow-sm"
                    onClick={() => setOpen(false)}
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
