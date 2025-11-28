import ConfigProviderClient from "../../context/ConfigProviderClient";
import { loadConfig } from "../../lib/config";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import { loadPricingAccess } from "@/lib/loadPricingAccess";

export default async function BizPage({ params }) {
  const { bizType } = await params;

  const config = await loadConfig(bizType);
  const pricingAccess = await loadPricingAccess(bizType);

  if (!config) {
    return (
      <div className="p-8 text-center">Business type “{bizType}” not found</div>
    );
  }

  const finalConfig = {
    ...config,
    pricingAccess,
  };

  return (
    <ConfigProviderClient config={finalConfig}>
      <Header />
      <ContentSection />
    </ConfigProviderClient>
  );
}
