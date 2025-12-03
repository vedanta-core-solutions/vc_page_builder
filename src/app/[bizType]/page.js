import ConfigProviderClient from "@/context/ConfigProviderClient";
import { ContentProvider } from "@/context/ContentContext";
import { loadConfig } from "../../lib/config";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services.jsx";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer.jsx";

// 3
function normalizeContent(input) {
  if (!input) return {};
  if (input.content && (input.content.navbar || input.content.hero || input.content.footer)) {
    console.log("input", input.content)
    return input.content;
  }
  return input;
}
// 3

export default async function BizPage({ params, searchParams }) {
  const { bizType } = await params;
  const sp = await searchParams;
  const config = await loadConfig(bizType);

  if (!config) {
    return (
      <div className="p-8 text-center">Business type “{bizType}” not found</div>
    );
  }

  const { theme, content } = config;
  console.log("config", config)
  // 3
  console.log("content", content)
  const normalizedContent = normalizeContent(content);
  console.log("normalAfter", normalizedContent)
  const initialSelectionMap = {};
  ["navbar", "hero", "footer"].forEach((key) => {
    const comp = normalizedContent?.[key];
    console.log("nav", comp)
    if (!comp) return;
    initialSelectionMap[key] =
      comp.defaultVariant || (comp.variants && comp.variants[0]?.key) || null;
  });

  const navbarOverride =
    typeof sp?.get === "function"
      ? sp.get("variant_navbar")
      : sp?.variant_navbar;
  const heroOverride =
    typeof sp?.get === "function" ? sp.get("variant_hero") : sp?.variant_hero;

  if (navbarOverride) initialSelectionMap.navbar = navbarOverride;
  if (heroOverride) initialSelectionMap.hero = heroOverride;
  // 3


  return (
    <ConfigProviderClient theme={theme}>
      <ContentProvider
        content={normalizedContent}
        initialSelectionMap={initialSelectionMap}
      >
        <Header />
        <Hero />
        <Services />
        <ContentSection />
        <Services />
        <Footer />
      </ContentProvider>
    </ConfigProviderClient>
  );
}

// initialSelectionMap do :-
// Tells the server which variant to render
// We generate initialSelectionMap so server and client render the same component versions during first load. This prevents hydration mismatch.
// Server → BizPage → initialSelectionMap → ContentProvider → Header Render
