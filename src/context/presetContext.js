"use client";
import { createContext, useContext, useState } from "react";

const PresetContext = createContext(null);

export function PresetProvider({ children }) {
  const [preset, setPresetState] = useState(() => {
    // On initial load, check localStorage for a saved preset
    if (typeof window !== "undefined") {
      const savedPreset = localStorage.getItem("contentSectionPreset");
      return savedPreset || "default";
    }
    return "default";
  });

  const setPreset = (newPreset) => {
    setPresetState(newPreset);
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("contentSectionPreset", newPreset);
      // Update URL
      const url = new URL(window.location);
      if (newPreset === "default") {
        url.searchParams.delete("preset");
      } else {
        url.searchParams.set("preset", newPreset);
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  return (
    <PresetContext.Provider value={{ preset, setPreset }}>
      {children}
    </PresetContext.Provider>
  );
}

export function usePreset() {
  return useContext(PresetContext);
}
