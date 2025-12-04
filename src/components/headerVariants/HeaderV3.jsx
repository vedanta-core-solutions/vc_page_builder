'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function HeaderV3({ navbar = {} }) {
  const { logo, navlink = [], button = [] } = navbar;
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background shadow-card font-base">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex items-center h-20 justify-between">
          
          {/* Hamburger */}
          <button
            aria-label="Open menu"
            className="p-2 md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          {/* Center logo */}
          <Link href="/">
            <img className="h-12 w-auto" src={logo} alt="logo" />
          </Link>

          {/* Buttons (desktop only) */}
          <div className="hidden md:flex items-center space-x-3">
            {button.map((btn, i) => (
              <Link key={i} href={btn.href} className="px-5 py-2 bg-primary text-background rounded-base text-lg shadow-sm">
                {btn.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            {navlink.map((item, i) => (
              <Link key={i} href={item.href} className="text-secondary text-lg">
                {item.label}
              </Link>
            ))}
            {button.map((btn, i) => (
              <Link key={i} href={btn.href} className="px-5 py-2 bg-primary text-background rounded-base text-lg shadow-sm inline-block">
                {btn.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
