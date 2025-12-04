// "use client";
// import { useContent } from "@/context/ContentContext";

// export default function Services() {
//   const { content } = useContent();
//   const services = content?.services;
  
//   return (
//     <>
//       <div className="flex flex-col justify-center items-center font-base bg-background font-base gap-y-7 py-14">
//         {services?.top_heading?.map((item, i) => (
//           <div
//             key={i}
//             className="flex flex-col justify-center items-center my-7 space-y-5 text-center "
//           >
//             <h1 className="text-7xl font-bold text-black hover:text-accent">{item.h_1}</h1>
//             <p className="text-sm font-semibold max-w-xl px-4">{item.text}</p>
//           </div>
//         ))}

//         {/* Cards Section */}
//         <div className="w-full space-y-10 max-w-7xl px-4 ">
//           {services?.cards?.map((item, i) => (
//             <div
//               key={i}
//               className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 space-y-6 lg:space-y-0 w-full py-5"
//             >
//               {/* Image Section */}
//               <div className="w-full lg:w-1/3 flex items-center justify-center">
//                 <img
//                   key={i}
//                   src={item.img}
//                   alt="img"
//                   className="rounded-lg shadow-xl hover:shadow-amber-500 duration-700 w-full max-w-xs lg:max-w-sm object-cover hover:rotate-z-6 hover:rotate-x-12"
//                 />
//               </div>

//               {/* Text Section */}
//               <div
//                 className="w-full lg:w-2/3 rounded-3xl shadow-xl border-b-2 border-b-red-200 px-6 py-5 group"
//               >
//                 <div className="space-y-3.5">
//                   <h1 className="text-xl md:text-2xl font-semibold text-black group-hover:text-accent">
//                     {item.h_1}
//                   </h1>
//                   <p>{item.para}</p>
//                     {/* button  */}
//                   <button className="text-lg font-semibold bg-primary text-background px-5 py-2 rounded-lg shadow-xl hover:shadow-amber-100 hover:bg-amber-500 hover:translate-y-1 duration-500">
//                     {item.btn}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }



// 3 

// src/components/Services.jsx
"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import ServicesV1 from "./servicesVariants/ServicesV1";
import ServicesV2 from "./servicesVariants/ServicesV2";
import ServicesV3 from "./servicesVariants/ServicesV3";

export default function Services() {
  const { content, selectionMap } = useContent();
  const services = content?.services;
  if (!services) return null;

  // priority: selectionMap.services (set from localStorage/URL) -> services.defaultVariant -> first variant
  const selectedKey = (selectionMap && selectionMap.services) || services.defaultVariant || (services.variants && services.variants[0]?.key) || "v1";

  const variant = services.variants?.find(v => v.key === selectedKey) || services.variants?.[0];

  if (!variant) return null;

  // variant.layout or key could be used to choose component — map keys explicitly
  switch (variant.key) {
    case "v1":
      return <ServicesV1 data={variant} />;
    case "v2":
      return <ServicesV2 data={variant} />;
    case "v3":
      return <ServicesV3 data={variant} />;
    default:
      // fallback: try to pick by layout name (in case keys are named differently)
      if (variant.layout?.includes("grid") || variant.layout === "horizontal-row") {
        return <ServicesV2 data={variant} />;
      }
      if (variant.layout?.includes("list") || variant.layout === "list-cta") {
        return <ServicesV3 data={variant} />;
      }
      return <ServicesV1 data={variant} />;
  }
}
