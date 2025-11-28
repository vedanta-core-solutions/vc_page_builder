'use client';
import React from 'react';
import { useContent } from '@/context/ContentContext'; 
import Link from 'next/link';

export default function Header() {
  const content = useContent().navbar;
  console.log("Header content:", content);

  return (
    <header className="bg-background shadow-card font-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <img className="h-10 w-auto" src="/logo.png" alt="Company Logo" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="md:flex items-center space-x-8">
            <Link href="/"       className="text-secondary hover:text-primary">Home</Link>
            <Link href="/about"  className="text-secondary hover:text-primary">About</Link>
            <Link href="/services" className="text-secondary hover:text-primary">Services</Link>
            <Link href="/contact"  className="text-secondary hover:text-primary">Contact</Link>

            <Link 
              href="/signup"
              className="px-4 py-2 bg-primary text-background rounded-base transition"
            >
              Sign Up
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
