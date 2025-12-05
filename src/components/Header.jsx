// 'use client';
// import React from 'react';
// import { useContent } from '@/context/ContentContext';
// import Link from 'next/link';

// export default function Header() {
//   const { navbar } = useContent().content;

//   return (
//     <header className="bg-background shadow-card font-base">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
//         <div className="flex justify-between items-center h-20">

//           {/* Logo */}
//           <div className="shrink-0">
//             <Link href="/">
//               <img
//                 className="h-12 w-auto"
//                 src={navbar.logo}
//                 alt="Company Logo"
//               />
//             </Link>
//           </div>

//           {/* Navigation */}
//           <nav className="flex items-center space-x-10">
//             {navbar.navlink?.map((item, idx) => (
//               <Link
//                 key={idx}
//                 href={item.href}
//                 className="text-secondary hover:text-primary text-lg"
//               >
//                 {item.label}
//               </Link>
//             ))}

//             {navbar.button?.map((btn, idx) => (
//               <Link
//                 key={idx}
//                 href={btn.href}
//                 className="px-5 py-2 bg-primary text-background rounded-base transition text-lg shadow-sm"
//               >
//                 {btn.label}
//               </Link>
//             ))}
//           </nav>

//         </div>
//       </div>
//     </header>
//   );
// }



// 3 
'use client';
import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import HeaderV1 from './headerVariants/HeaderV1';
import HeaderV2 from './headerVariants/HeaderV2';
import HeaderV3 from './headerVariants/HeaderV3';

const VARIANT_MAP = {
  v1: HeaderV1,
  v2: HeaderV2,
  v3: HeaderV3,
};

export default function Header() {
  const ctx = useContent();
 
  if (!ctx) return null;

  const { content = {}, selectionMap = {} } = ctx;
  const navbarRoot = content?.navbar || {};
  // determine selected variant key (selectionMap overrides default)
  const selectedKey = selectionMap?.navbar || navbarRoot?.defaultVariant;

  // find variant data (if any)
  const variantData = navbarRoot?.variants?.find(v => v.key === selectedKey);

  // canonical data object to pass into variant components (fallback to legacy)
  const data = variantData || navbarRoot;

  // console.log('Header debug → selectedKey:', selectedKey, 'variantData:', variantData, 'data:', data);

  const VariantComp = VARIANT_MAP[selectedKey] || VARIANT_MAP[navbarRoot?.defaultVariant] || HeaderV1;
  return <VariantComp navbar={data} />;
}

