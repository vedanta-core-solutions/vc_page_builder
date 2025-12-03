// "use client";

// import { createContext, useContext } from "react";

// const ContentContext = createContext(null);

// export function ContentProvider({ content, children }) {
//   return (
//     <ContentContext.Provider value={content}>
//       {children}
//     </ContentContext.Provider>
//   );
// }

// export function useContent() {
//   return useContext(ContentContext);
// }






// 3

'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ContentContext = createContext(null);


function normalizeContent(input) {
  if (!input) return {};
  if (input.content && (input.content.navbar || input.content.hero || input.content.footer)) {
    return input.content;
  }
  return input;
}

function computeDefaultsFromContent(content) {
  if (!content) return {};
  const defaults = {};
  ['navbar', 'hero', 'footer'].forEach((key) => {
    const comp = content[key];
    if (!comp) return;
    defaults[key] = comp.defaultVariant || (comp.variants && comp.variants[0]?.key) || null;
  });
  return defaults;
}

export function ContentProvider({ children, content, initialSelectionMap  }) {

  const raw = content || {};

  const initial = normalizeContent(raw);

  const [internalContent, setInternalContent] = useState(initial);

  const initialMap = (initialSelectionMap && Object.keys(initialSelectionMap).length > 0)
    ? initialSelectionMap
    : computeDefaultsFromContent(initial);

  const [selectionMap, setSelectionMap] = useState(() => initialMap);


  // useEffect(() => {
  //   setInternalContent(normalizeContent(raw));
  // }, [raw]);

 
  useEffect(() => {
    if (!internalContent) return;
    setSelectionMap((prev) => {
      const defaults = computeDefaultsFromContent(internalContent);

      const merged = { ...defaults, ...prev };
      return merged;
    });
  }, [internalContent]);

   
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      
      const saved = JSON.parse(localStorage.getItem('variantSelectionMap') || 'null');
      let next = {};
      if (saved && typeof saved === 'object') next = { ...saved };

     
      const params = new URLSearchParams(window.location.search);
     
      for (const [key, value] of params.entries()) {
        if (key.startsWith('variant_') && value) {
          const compKey = key.replace(/^variant_/, ''); 
          next[compKey] = value;
        }
      }

      
      if (Object.keys(next).length > 0) {
        setSelectionMap(prev => ({ ...prev, ...next }));
      }
    } catch (e) {
      console.warn('ContentProvider: error reading variantSelectionMap or URL params', e);
    }
    
  }, []);


 
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('variantSelectionMap', JSON.stringify(selectionMap));
    } catch {}
  }, [selectionMap]);

  const value = {
    content: internalContent,
    setContent: setInternalContent,
    selectionMap,
    setSelectionMap,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) return null;

 
  if (typeof ctx === 'object' && ctx.content !== undefined) {
    return ctx;
  }

  
  return {
    content: ctx,
    selectionMap: {},
    setSelectionMap: () => {},
    setContent: () => {},
  };
}
