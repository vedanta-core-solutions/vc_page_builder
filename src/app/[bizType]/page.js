import ConfigProviderClient from "@/context/ConfigProviderClient";
import { loadConfig } from "../../lib/config";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer.jsx";
import Testimonials from "../../components/Testimonials.jsx";

export default async function BizPage({ params }) {
  const { bizType } = await params;
  const config = await loadConfig(bizType);
  if (!config) {
    // simple 404 / fallback
    return (
      <div className="p-8 text-center">Business type “{bizType}” not found</div>
    );
  }

  const themeForBiz = config.theme.themes[bizType];
  const themeContent = {...config.content, themeForBiz}
   

  // const { theme = {}, content = {} } = config;

  return (
    <ConfigProviderClient config={themeContent}>
      <Header />
      <Hero />
      <Testimonials/>
      <Footer/>
    </ConfigProviderClient>
  );
}
