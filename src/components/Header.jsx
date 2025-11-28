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
    <header style={{ fontFamily: themeForBiz.font }}>
      <nav
        className="flex justify-between p-4 items-center"
        style={{ backgroundColor: themeForBiz.colors.secondary }}
      >
        <Link href="#">
          <img src={themeForBiz?.logo || '/default-logo.png'} alt="Logo" className="h-12"/>
        </Link>
        <ul className="flex space-x-14">
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#services">Services</Link></li>
        </ul>
        <form>
          <input type="search" placeholder="Search..." />
          <button type="submit">Go</button>
        </form>
      </nav>
    </header>
  );
}
