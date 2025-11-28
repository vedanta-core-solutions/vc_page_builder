
'use client';
import React from 'react';
import Link from 'next/link';
import { useConfig } from '../context/ConfigProviderClient';

const VARIANT_LAYOUTS = {
  1: ['company', 'support', 'legal', 'social'],
  2: ['company', 'legal', 'support', 'social'],
  3: ['social', 'company', 'support', 'legal']
};


const USE_DEFAULT_COLUMNS = false;
const DEFAULT_COLUMNS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ],
  support: [{ label: 'Help Center', href: '/help' }],
  legal: [{ label: 'Terms', href: '/terms' }],
  social: [{ label: 'Instagram', href: 'https://instagram.com' }]
};

export default function Footer() {
  
  const config = useConfig(); // read from context
  console.log("CLIENT config:", config);

  if(!config){
        console.log("theme is not accessing");
        return null;
    }
    const {themeForBiz,content}= config;
  const footerConfig = config?.content?.footer || {};
  const variant = footerConfig.variant || 1; // fallback to 1
  const columns = footerConfig.columns || {};
  const layout = VARIANT_LAYOUTS[variant] || VARIANT_LAYOUTS[1];

  // Prepare final columns: use config if present, else default (only if enabled)
  const finalColumns = {};
  layout.forEach((key) => {
    if (Array.isArray(columns[key]) && columns[key].length > 0) {
      finalColumns[key] = columns[key];
    } else if (USE_DEFAULT_COLUMNS && DEFAULT_COLUMNS[key]) {
      finalColumns[key] = DEFAULT_COLUMNS[key];
    } else {
      finalColumns[key] = null; // skip rendering
    }
  });

  return (
    <footer style={{}} className="w-full bg-gray-100 text-gray-500 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {layout.map((key) => {
            const items = finalColumns[key];
            if (!items) return null;

            const title =
              key === 'social'
                ? 'Follow Us'
                : key.charAt(0).toUpperCase() + key.slice(1);

            return (
              <div key={key}>
                <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>

                {key === 'social' ? (
                  <div className="text-xl">
                    <div className="grid sm:grid-cols-6 duration-700 justify-items-center">
                      {items.map((it, i) => (
                        <Link
                          key={i}
                          href={it.href}
                          className="hover:text-white border-2 rounded-full p-1"
                        >
                          {it.icon || it.label || '🔗'}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {items.map((it, i) => (
                      <li key={i}>
                        <Link href={it.href} className="hover:text-white">
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-800 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-400">© {new Date().getFullYear()} VedantaCore. All rights reserved.</p>
          <p className="mt-3 md:mt-0">Built with VCBuilder.</p>
        </div>
      </div>
    </footer>
  );
}

















// 'use client';
// import React from "react";
// import { useConfig } from "../context/ConfigProviderClient";
// import Link from "next/link";

// export default function Footer({ footer, contact }) {
//     const config=useConfig();
//     if(!config){
//         console.log("theme is not accessing");
//         return null;
//     }
//     const {theme,content}= config;
//   return (
//     <footer style={{backgroundColor:theme.bgColor}} className="w-full bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 md:px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
//             <div>
//               <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <Link href="/about" className="hover:text-white">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/careers" className="hover:text-white">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/blog" className="hover:text-white">
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="hover:text-white">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <Link href="/help" className="hover:text-white">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/returns" className="hover:text-white">
//                     Returns
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/shipping" className="hover:text-white">
//                     Shipping Info
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/faq" className="hover:text-white">
//                     FAQ
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <Link href="/terms" className="hover:text-white">
//                     Terms of Service
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/privacy" className="hover:text-white">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/cookies" className="hover:text-white">
//                     Cookie Policy
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="curs"> 
//               <h3 className="text-white font-semibold text-lg mb-4">
//                 Follow Us
//               </h3>
//               <div className="text-xl ">
//                 <div className="grid sm:grid-cols-6 duration-700 justify-items-center ">
//                   <Link href="https://instagram.com" className="hover:text-white border-2 rounded-full p-1 ">
//                   📸
//                 </Link>
//                 <Link href="https://twitter.com" className="hover:text-white border-2 rounded-full p-1">
//                   🐦
//                 </Link>
//                 <Link href="https://facebook.com" className="hover:text-white border-2 rounded-full p-1">
//                   📘
//                 </Link>
//                 <Link href="https://youtube.com" className="hover:text-white border-2 rounded-full p-1">
//                   ▶️
//                 </Link>
//                 </div>
                
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 my-6"></div>

//           <div className="flex flex-col md:flex-row items-center justify-between text-sm">
//             <p className="text-gray-400">
//               © {2025} VedantaCore. All rights reserved.
//             </p>

//             <p className="mt-3 md:mt-0">Built with VCBuilder.</p>
//           </div>
//         </div>
//       </footer>
//   );
// }
