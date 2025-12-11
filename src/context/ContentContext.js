

// src/context/ContentContext.js
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getInitialSelectionMap } from "../lib/getInitialSelectionMap";

export const ContentContext = createContext(null);

export function ContentProvider({ children, content, initialSelectionMap }) {
  // stable "raw" reference — prevents recreating {} on each render and helps hooks deps
  const raw = useMemo(() => content || {}, [content]);

  // internal content state (initialized from raw)
  const [internalContent, setInternalContent] = useState(raw);

  // compute initialMap once and memoize
  const computedInitialMap = useMemo(() => {
    if (initialSelectionMap && Object.keys(initialSelectionMap).length > 0) {
      return initialSelectionMap;
    }
    return getInitialSelectionMap(raw, null);
  }, [initialSelectionMap, raw]);

  // use lazy initializer with memoized value
  const [selectionMap, setSelectionMap] = useState(() => computedInitialMap);

  // sync internalContent when raw changes
  useEffect(() => {
    setInternalContent(raw);
  }, [raw]);

  // compute defaults from internalContent when it changes
  useEffect(() => {
    if (!internalContent) return;
    setSelectionMap((prev) => {
      const defaults = getInitialSelectionMap(internalContent, null);
      return { ...defaults, ...prev };
    });
  }, [internalContent]);

  // read selectionMap override from localStorage / url once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = JSON.parse(localStorage.getItem("variantSelectionMap") || "null");
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
      console.warn("ContentProvider: error reading variantSelectionMap or URL params", e);
    }
  }, []);

  // persist selectionMap to localStorage
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

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
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


// Kyon yeh change karna zaroori hai 

// useMemo se raw aur computedInitialMap stable ho jaate hain — hooks aur effects ke dependency lists consistent rehte hain aur ESLint warning chala jaata hai.

// selectionMap initial state still lazy-initialized but based on memoized value — correct and efficient.

// No behavior change for consumers — only internal stability/efficiency improvement.
// “ContentContext centralizes content + variant selection with server defaults, client overrides, and safe persistence, ensuring all page components stay in sync without hydration issues.”

