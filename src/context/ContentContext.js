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

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getInitialSelectionMap } from "@/lib/getInitialSelectionMap";

const ContentContext = createContext(null);

export function ContentProvider({ children, content, initialSelectionMap }) {
  const raw = content || {};

  const [internalContent, setInternalContent] = useState(raw);

  const initialMap =
    initialSelectionMap && Object.keys(initialSelectionMap).length > 0
      ? initialSelectionMap
      : getInitialSelectionMap(raw, null);

  const [selectionMap, setSelectionMap] = useState(() => initialMap);

  useEffect(() => {
    setInternalContent(raw);
  }, [raw]);

  useEffect(() => {
    if (!internalContent) return;
    setSelectionMap((prev) => {
      const defaults = getInitialSelectionMap(internalContent, null);
      const merged = { ...defaults, ...prev };
      return merged;
    });
  }, [internalContent]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = JSON.parse(
        localStorage.getItem("variantSelectionMap") || "null"
      );
      let next = {};
      if (saved && typeof saved === "object") next = { ...saved };

      const params = new URLSearchParams(window.location.search);

      for (const [key, value] of params.entries()) {
        if (key.startsWith("variant_") && value) {
          const compKey = key.replace(/^variant_/, "");
          next[compKey] = value;
        }
      }

      if (Object.keys(next).length > 0) {
        setSelectionMap((prev) => ({ ...prev, ...next }));
      }
    } catch (e) {
      console.warn(
        "ContentProvider: error reading variantSelectionMap or URL params",
        e
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("variantSelectionMap", JSON.stringify(selectionMap));
    } catch {}
  }, [selectionMap]);

  const value = {
    content: internalContent,
    setContent: setInternalContent,
    selectionMap,
    setSelectionMap,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) return null;

  if (typeof ctx === "object" && ctx.content !== undefined) {
    return ctx;
  }

  return {
    content: ctx,
    selectionMap: {},
    setSelectionMap: () => {},
    setContent: () => {},
  };
}

// “ContentContext centralizes content + variant selection with server defaults, client overrides, and safe persistence, ensuring all page components stay in sync without hydration issues.”
