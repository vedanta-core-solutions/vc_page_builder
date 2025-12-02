'use client';
import React from 'react';
import Link from 'next/link';

export default function HeaderV3({ navbar = {} }) {
  const { logo, navlink = [], button = [] } = navbar;

  // Note: This version provides a simple hamburger button. Replace with a drawer/menu as needed.
  return (
    <header className="bg-background shadow-card font-base">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex items-center h-20 justify-between">
          <div className="mr-3">
            <button aria-label="Open menu" className="p-2">☰</button>
          </div>

          <div className="text-center flex-1">
            <Link href="/"><img className="h-12 w-auto inline-block" src={logo} alt="logo" /></Link>
          </div>

          <div className="flex items-center space-x-3">
            {button.map((btn, i) => (
              <Link key={i} href={btn.href} className="px-5 py-2 bg-primary text-background rounded-base transition text-lg shadow-sm">
                {btn.label}
              </Link>
            ))}
          </div>
        </div>

        {/* OPTIONAL: Basic mobile menu preview (uncontrolled, for dev). Replace with accessible drawer */}
        <div className="lg:hidden">
          {/* you can implement a toggled drawer here when building mobile menu */}
        </div>
      </div>
    </header>
  );
}
