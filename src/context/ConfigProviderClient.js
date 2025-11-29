"use client";
import { useEffect } from "react";

export default function ConfigProviderClient({ theme, children }) {
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return children;
}

function applyTheme(theme) {
  const root = document.documentElement;

  root.style.setProperty("--color-primary", theme.colors.primary);
  root.style.setProperty("--color-secondary", theme.colors.secondary);
  root.style.setProperty("--color-accent", theme.colors.accent);
  root.style.setProperty("--color-background", theme.colors.background);
  root.style.setProperty("--color-surface", theme.colors.colorsurface);
  root.style.setProperty("--color-text", theme.colors.colortext);

//   root.style.setProperty("--font-base", theme.font);
//   root.style.setProperty("--radius-base", theme.extras.borderRadius || theme.extras.buttonCurve || "6px");
//   root.style.setProperty("--shadow-card", theme.extras.cardShadow || "none");
}
