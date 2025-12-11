// src/context/ConfigProviderClient.js
"use client";
import { useEffect } from "react";

/**
 * ConfigProviderClient
 * - Strictly maps only these color tokens from theme.colors:
 *   primary, secondary, background, surface, text, border
 * - Also maps font (theme.font or extras.fontFamilyDisplay),
 *   spacing (extras.spacing.*), and borderRadius (extras.borderRadius.*)
 */
export default function ConfigProviderClient({ theme, children }) {
  console.log("THEME", theme);
  useEffect(() => {
    if (theme) applyTheme(theme);
  }, [theme]);

  return children;
}

function setVar(root, name, value) {
  if (value === undefined || value === null) return;
  root.style.setProperty(name, String(value));
}

function applyTheme(theme) {
  const root = document.documentElement;

  // defensive short-hands
  const colors = (theme && theme.colors) || {};
  const extras = (theme && theme.extras) || {};

  // === COLORS (only the six you defined) ===
  setVar(root, "--color-primary", colors.primary || "#0A84FF");
  setVar(root, "--color-secondary", colors.secondary || "#1C1C1E");
  setVar(root, "--color-background", colors.background || "#FFFFFF");
  setVar(root, "--color-surface", colors.surface || "#F5F5F7");
  setVar(root, "--color-text", colors.text || "#1C1C1E");
  setVar(root, "--color-border", colors.border || "#E5E5EA");

  // === TYPOGRAPHY: prefer top-level theme.font, fallback to extras.fontFamilyDisplay ===
  const fontBase = theme.font || extras.fontFamilyDisplay || "Inter, system-ui, -apple-system, sans-serif";
  setVar(root, "--font-base", fontBase);

  // === SPACING: extras.spacing.* if present (we copy scale as px strings) ===
  if (extras.spacing) {
    // copy a few common tokens; keep values as-is (expect px strings)
    setVar(root, "--space-xs", extras.spacing.xs || "4px");
    setVar(root, "--space-sm", extras.spacing.sm || "8px");
    setVar(root, "--space-md", extras.spacing.md || "16px");
    setVar(root, "--space-lg", extras.spacing.lg || "24px");
    setVar(root, "--space-xl", extras.spacing.xl || "32px");
  }

  // === BORDER RADII: extras.borderRadius.* if present ===
  if (extras.borderRadius) {
    setVar(root, "--radius-sm", extras.borderRadius.sm || "8px");
    setVar(root, "--radius-md", extras.borderRadius.md || "12px");
    setVar(root, "--radius-lg", extras.borderRadius.lg || "16px");
    setVar(root, "--radius-xl", extras.borderRadius.xl || "24px");
  }

  // === SHADOW (optional small helper) ===
  if (extras.shadow && extras.shadow.sm) {
    setVar(root, "--shadow-sm", extras.shadow.sm);
  }
}



//3
//  applyTheme converts JSON → CSS variables
//3


// priyanshu
// import { useEffect } from "react";

// export default function ConfigProviderClient({ theme, children }) {
//   useEffect(() => {
//     applyTheme(theme);
//   }, [theme]);

//   return children;
// }

// function applyTheme(theme) {
//   const root = document.documentElement;

//   root.style.setProperty("--color-primary", theme.colors.primary);
//   root.style.setProperty("--color-secondary", theme.colors.secondary);
//   root.style.setProperty("--color-accent", theme.colors.accent);
//   root.style.setProperty("--color-background", theme.colors.background);
//   root.style.setProperty("--color-surface", theme.colors.colorsurface);
//   root.style.setProperty("--color-text", theme.colors.colortext);

//   root.style.setProperty("--font-base", theme.font);
//   root.style.setProperty("--radius-base", theme.extras.borderRadius || theme.extras.buttonCurve || "6px");
//   root.style.setProperty("--shadow-card", theme.extras.cardShadow || "none");
// }



