import config from "../lib/config";

export default async function Page({ params }) {
  const bizType = params.id ?? "default";
  const loadconfig = await config(bizType);

  return (
    <YourProvider data={loadconfig}>
      <YourPageContent />
    </YourProvider>
  );
}
