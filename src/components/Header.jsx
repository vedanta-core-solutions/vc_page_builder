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
    // <header style={{ fontFamily: themeForBiz.font }}>
    //   <nav
    //     className="flex justify-between p-4 items-center"
    //     style={{ backgroundColor: themeForBiz.colors.secondary }}
    //   >
    //     <Link href="#">
    //       <img src={themeForBiz?.logo} alt="Logo" className="h-12"/>
    //     </Link>
    //     <ul className="flex space-x-14" style={{ color: themeForBiz.colors.primary}}>
    //       <li><Link href="#home">Home</Link></li>
    //       <li><Link href="#services">Services</Link></li>
    //     </ul>
    //     <form>
    //       <input type="search" placeholder="Search..." />
    //       <button type="submit">Go</button>
    //     </form>
    //   </nav>
    // </header>

    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">              
                <img className="h-10 w-auto" src="/logo.png" alt="Company Logo" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link href="/services" className="text-gray-700 hover:text-indigo-600">Services</Link>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
            <Link href="/signup"
               className="px-4 py-2 text-white rounded transition" style={{background: themeForBiz.colors.secondary}}>
                Sign Up
              </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
