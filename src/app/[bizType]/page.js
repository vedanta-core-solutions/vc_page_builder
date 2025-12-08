import ConfigProviderClient from "@/context/ConfigProviderClient";
import { ContentProvider } from "@/context/ContentContext";
import { loadConfig } from "../../lib/config";
import { getInitialSelectionMap } from "../../lib/getInitialSelectionMap";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services.jsx";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer.jsx";


export default async function BizPage({ params, searchParams }) {
  
  const resolvedParams =
    typeof params?.then === "function" ? await params : params;
  const resolvedSearchParams =
    typeof searchParams?.then === "function"
      ? await searchParams
      : searchParams;

  const { bizType } = resolvedParams;
  const sp = resolvedSearchParams;


  const config = await loadConfig(bizType);

  if (!config) {
    return (
      <div className="p-8 text-center">Business type “{bizType}” not found</div>
    );
  }

  const { theme, content } = config;

  const initialSelectionMap = getInitialSelectionMap(content, sp);

  return (
    <ConfigProviderClient theme={theme}>
      <ContentProvider
        content={content}
        initialSelectionMap={initialSelectionMap}
      >
        <Header />

        <Hero />
        <Services />
        <ContentSection />
        <Footer />
      </ContentProvider>
    </ConfigProviderClient>
  );
}
