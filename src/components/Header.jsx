"use client"; // ensure this is a client component
import React from "react";
import { useConfig } from "@/context/ConfigProviderClient";
import Link from "next/link";

export default function Header() {
  const config = useConfig();
  if (!config) {
    console.log("no code");
    return null; // or a fallback
  }
  const { theme, content } = config;

  return (
    <header>
      <nav
        className="flex justify-between p-4 items-center"
        style={{ backgroundColor: theme?.bgColor }}
      >
        <Link href="#">
          <img src={theme?.logo || "./girl.jpeg"} alt="Logo" className="h-12" />
        </Link>
        <ul className="flex space-x-14">
          <li>
            <Link href="#home">Home</Link>
          </li>
          <li>
            <Link href="#services">Services</Link>
          </li>
          <li>
            <details>
              <summary>More</summary>
              <ul>
                <li>
                  <Link href="#about">About</Link>
                </li>
                <li>
                  <Link href="#team">Team</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
        <form>
          <input type="search" placeholder="Search..." />
          <button type="submit">Go</button>
        </form>
      </nav>
    </header>
  );
}
