'use client';
import React from 'react';
import Link from 'next/link';

export default function HeaderV1({ navbar = {} }) {
  const { logo, navlink = [], button = [] } = navbar;

  return (
    <header className="bg-background shadow-card font-base">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <div className="shrink-0">
            <Link href="/"><img className="h-12 w-auto" src={logo} alt="logo" /></Link>
          </div>

          <nav className="flex items-center space-x-10">
            {navlink.map((item, i) => (
              <Link key={i} href={item.href} className="text-secondary hover:text-primary text-lg">
                {item.label}
              </Link>
            ))}
            {button.map((btn, i) => (
              <Link key={i} href={btn.href} className="px-5 py-2 bg-primary text-background rounded-base transition text-lg shadow-sm">
                {btn.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
