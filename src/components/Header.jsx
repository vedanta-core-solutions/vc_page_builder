'use client';    // ensure this is a client component
import React from 'react';
import { useConfig } from '@/context/ConfigProviderClient';
import Link from 'next/link';

export default function Header() {
  const config = useConfig();
  if (!config) {
    return null; // or a fallback
  }
  const { themeForBiz, content } = config;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <img className="w-16" src={content.navbar.logo} alt="Company Logo" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8" style={{ fontFamily: themeForBiz.font }}>
            {content.navbar.navlink.map((link) => (
              <Link key={link.label} href={link.href} className="text-gray-700 hover:text-indigo-600">
                {link.label}
              </Link>
            ))}
            {content.navbar.button.map((button) => (
              <Link key={button.label} href={button.href}
                className="px-4 py-2 text-white rounded transition" style={{ background: themeForBiz.colors.secondary }}>
                {button.label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
}
