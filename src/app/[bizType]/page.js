import ConfigProviderClient from "@/context/ConfigProviderClient";
import { ContentProvider } from "@/context/ContentContext";
import { loadConfig } from "../../lib/config";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer.jsx";
import Services from "../../components/Services.jsx";

export default async function BizPage({ params }) {
  const { bizType } = await params;
  const config = await loadConfig(bizType);

  if (!config) {
    return (
      <div className="p-8 text-center">Business type “{bizType}” not found</div>
    );
  }

  const { theme, content } = config;
 
  return (
    <ConfigProviderClient theme={theme}>
      <ContentProvider content={content}>
        <Header />
        <Hero />
        <Services/>
        <Footer />
      </ContentProvider>
    </ConfigProviderClient>
  );
}
