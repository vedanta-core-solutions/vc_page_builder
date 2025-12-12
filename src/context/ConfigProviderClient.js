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

  root.style.setProperty("--base-font", theme.font);

  if (theme.fontUrl) {
    const linkId = ''
    let link = document.getElementById(linkId);

    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }


    link.href = theme.fontUrl;
  }
  //   root.style.setProperty("--radius-base", theme.extras.borderRadius || theme.extras.buttonCurve || "6px");
  //   root.style.setProperty("--shadow-card", theme.extras.cardShadow || "none");
}
