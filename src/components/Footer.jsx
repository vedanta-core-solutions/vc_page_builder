'use client';
import React from "react";
import { useConfig } from "../context/ConfigProviderClient";

export default function Footer({ footer, contact }) {
    const config=useConfig();
    if(!config){
        console.log("theme is not accessing");
        return null;
    }
    const {theme,content}= config;
  return (
    <footer className="my-5 text-gray-200 py-10" style={{background:theme?.bgColor}}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white cursor-pointer">🍽️ VC Restaurant</h2>
          <p className="mt-3 text-gray-400">
            Delicious food served with love. Visit us for an unforgettable
            dining experience.
          </p>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 cursor-pointer">
            Opening Hours
          </h3>
          <ul className="text-gray-400 space-y-1">
            <li>Mon – Fri: 10:00 AM – 10:00 PM</li>
            <li>Saturday: 11:00 AM – 11:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 cursor-pointer">Contact Us</h3>
          <ul className="text-gray-400 space-y-1">
            <li>📍 123 Food Street, New Delhi, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ contact@restaurant.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} Your Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
