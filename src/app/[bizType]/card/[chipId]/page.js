import ConfigProviderClient from "@/context/ConfigProviderClient";
import { loadConfig } from "lib/config";
import NfcVisitingCard from "@/components/Nfc/NfcVisitingCard";
import CardNotFound from "@/components/Nfc/CardNotFound";

export default async function Page({ params }) {
  const { bizType, chipId } = await params;
    console.log("jack", await params)
  // 1) Load Tenant Theme
  const { theme } = await loadConfig(bizType);

  // 2) Fetch Card From DB
  const res = await fetch(`http://localhost:9000/nfcCards?chipId=${chipId}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const card = data[0];

  return (
    <ConfigProviderClient theme={theme}>
      {card ? <NfcVisitingCard data={card} /> : <CardNotFound />}
    </ConfigProviderClient>
  );
}
