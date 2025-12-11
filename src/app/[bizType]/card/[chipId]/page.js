import ConfigProviderClient from "@/context/ConfigProviderClient";
import { loadConfig } from "lib/config";
import NfcVisitingCard from "@/components/Nfc/NfcVisitingCard";
import CardNotFound from "@/components/Nfc/CardNotFound";
import { redirect } from "next/navigation";


export default async function Page({ params, searchParams  }) {
  const resolvedParams = await params;
  const resolvedSearchParams= await searchParams
  const { bizType, chipId } = resolvedParams;

//   const { bizType, chipId } = await params;

  // 1) Load Tenant Theme
  const { theme } = await loadConfig(bizType);

  // 2) Fetch Card From DB
  const res = await fetch(`http://localhost:9000/nfcCards?chipId=${chipId}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const card = data[0];

  // 3
  // check if query param ?g=true
const goGoogle = resolvedSearchParams?.g === "true";

// if google review link is present and ?g=true → redirect
if (goGoogle && card?.googleReviewUrl) {
  redirect(card.googleReviewUrl);
}
// 3

  return (
    <ConfigProviderClient theme={theme}>
      {card ? <NfcVisitingCard data={card} /> : <CardNotFound />}
    </ConfigProviderClient>
  );
}
