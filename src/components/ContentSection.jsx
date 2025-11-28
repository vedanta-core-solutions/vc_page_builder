"use client";

import { useState } from "react";
import { useConfig } from "@/context/ConfigProviderClient";

function normalizePlanName(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export default function ContentSection() {
  const config = useConfig();

  const features = config?.features || [];
  const pricing = config?.pricing || [];
  const access = config?.pricingAccess || {};
  const settings = config?.variantSettings || {};
  const variant = Number(config?.variant ?? 1);

  const defaultPlan = pricing?.[0]
    ? normalizePlanName(pricing[0].name)
    : "free";

  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);

  const isAllowed = (featureKey) =>
    (access[selectedPlan] || []).includes(featureKey);

  const vcoreExtras =
    access["vcore"]?.filter(
      (k) => !access["pro"]?.includes(k) && !access["free"]?.includes(k)
    ) || [];

  /* --------------------------- UI Config --------------------------- */

  const spacingClass =
    settings.spacing === "large"
      ? "py-16 px-8"
      : settings.spacing === "compact"
      ? "py-8 px-4"
      : "py-12 px-6";

  const pricingShapeClass =
    settings.pricingShape === "square" ? "rounded-md" : "rounded-2xl";

  const featureCardStyle =
    settings.featureStyle === "minimal"
      ? "border border-gray-200 hover:border-green-500"
      : settings.featureStyle === "card"
      ? "bg-white shadow-md hover:shadow-xl"
      : "border border-gray-300";

  const patternClass =
    settings.bgPattern === "soft-grid"
      ? "bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-[size:24px_24px]"
      : settings.bgPattern === "dots"
      ? "bg-[radial-gradient(#0002_1px,transparent_1px)] bg-[size:8px_8px]"
      : "";

  const Divider = () =>
    settings.divider === "line" ? (
      <hr className="border-t border-gray-300 my-6" />
    ) : settings.divider === "dashed" ? (
      <hr className="border-t border-dashed border-gray-400 my-6" />
    ) : null;

  /* --------------------------- Pricing Card --------------------------- */

  const PricingCard = ({ tier }) => {
    const key = normalizePlanName(tier.name);
    const active = key === selectedPlan;

    return (
      <div
        onClick={() => setSelectedPlan(key)}
        className={`
          cursor-pointer p-6 transition-all border ${pricingShapeClass}
          ${
            active
              ? "border-green-600 shadow-xl scale-105"
              : "border-gray-300 shadow-sm"
          }
          bg-white hover:shadow-lg
        `}
      >
        <h3 className="text-xl font-semibold">{tier.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{tier.description}</p>
        <div className="text-3xl font-bold text-orange-600 mb-4">
          {tier.price}
        </div>

        <ul className="text-sm text-gray-600 space-y-1">
          {tier.benefits?.map((b, i) => (
            <li key={i}>• {b}</li>
          ))}
        </ul>
      </div>
    );
  };

  /* --------------------------- Feature Card --------------------------- */

  const FeatureItem = ({ f }) => (
    <div
      className={`p-4 rounded-xl transition-all hover:scale-[1.02] ${featureCardStyle}`}
    >
      <div className="flex items-start gap-4">
        {settings.showIcons && (
          <span className="text-2xl min-w-8 text-gray-700">{f.icon}</span>
        )}

        <div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">{f.title}</span>
            <span className="text-lg">{isAllowed(f.key) ? "✔️" : "❌"}</span>
          </div>
          <p classname="text-gray-600 text-sm">{f.description}</p>
        </div>
      </div>
    </div>
  );

  /* --------------------------- Layout Variants --------------------------- */

  const Variant1 = () => (
    <section
      className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-10 ${spacingClass} ${patternClass}`}
    >
      <div>
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <div className="space-y-4">
          {features.map((f) => (
            <FeatureItem key={f.key} f={f} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Pricing</h2>
        <div className="space-y-4">
          {pricing.map((p) => (
            <PricingCard key={p.name} tier={p} />
          ))}
        </div>
      </div>
    </section>
  );

  const Variant2 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2 className="text-3xl font-bold mb-6">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {features.map((f) => (
          <FeatureItem key={f.key} f={f} />
        ))}
      </div>

      <Divider />

      <h2 className="text-3xl font-bold mb-6">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricing.map((p) => (
          <PricingCard key={p.name} tier={p} />
        ))}
      </div>
    </section>
  );

  const Variant3 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2 className="text-3xl font-bold mb-6">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {pricing.map((p) => (
          <PricingCard key={p.name} tier={p} />
        ))}
      </div>

      <Divider />

      <h2 className="text-3xl font-bold mb-6">Features</h2>
      <div className="space-y-4">
        {features.map((f) => (
          <FeatureItem key={f.key} f={f} />
        ))}
      </div>
    </section>
  );

  const Variant4 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {pricing.map((p) => (
          <PricingCard key={p.name} tier={p} />
        ))}
      </div>

      <Divider />

      <h2 className="text-3xl font-bold mb-4">Features Included</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <FeatureItem key={f.key} f={f} />
        ))}
      </div>
    </section>
  );

  const Variant5 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2 className="text-3xl font-bold mb-6">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {features.map((f) => (
          <FeatureItem key={f.key} f={f} />
        ))}
      </div>

      <Divider />

      <h2 className="text-3xl font-bold mb-4">Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricing.map((p) => (
          <PricingCard key={p.name} tier={p} />
        ))}
      </div>
    </section>
  );

  const Variant6 = () => (
    <section
      className={`max-w-7xl mx-auto grid md:grid-cols-4 gap-8 ${spacingClass} ${patternClass}`}
    >
      <aside className="col-span-1 space-y-4">
        <h3 className="text-xl font-bold mb-2">Feature Summary</h3>
        {features.map((f) => (
          <div
            key={f.key}
            className="flex items-center justify-between text-sm"
          >
            <span>{f.title}</span>
            <span>{isAllowed(f.key) ? "✔" : "❌"}</span>
          </div>
        ))}
      </aside>

      <main className="col-span-3">
        <h2 className="text-3xl font-bold mb-6">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <PricingCard key={p.name} tier={p} />
          ))}
        </div>
      </main>
    </section>
  );

  return (
    <>
      {variant === 1 && <Variant1 />}
      {variant === 2 && <Variant2 />}
      {variant === 3 && <Variant3 />}
      {variant === 4 && <Variant4 />}
      {variant === 5 && <Variant5 />}
      {variant === 6 && <Variant6 />}

      {selectedPlan === "vcore" && vcoreExtras.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="p-6 bg-purple-50 border border-purple-300 rounded-xl">
            <h3 className="text-xl font-bold text-purple-700 mb-2">
              Advanced VCore Features
            </h3>
            <ul className="text-purple-800 space-y-1">
              {vcoreExtras.map((k) => (
                <li key={k}>✔ {k.replace(/_/g, " ").toUpperCase()}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
