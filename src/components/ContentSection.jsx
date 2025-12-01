"use client";

import { useState, useMemo } from "react";
import { useContent } from "@/context/ContentContext";
import FeatureAccordion from "./extras/FeaturedAccordion";

// Helper to normalize plan names for state and keys
function normalizePlanName(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export default function ContentSection() {
  // Correctly use the ContentProvider to get the content object
  const { content } = useContent();
  const section = content?.contentSection;

  // If the data is not available, render nothing.
  if (!section) {
    return null;
  }

  //  Idhar saare config ,variant ke chizzze hai
  // This useMemo hook transforms your JSON data into the format the rest of the component expects.
  const {
    features,
    pricing,
    pricingAccess,
    settings,
    variant,
    heading,
    subheading,
  } = useMemo(() => {
    const {
      layoutVariant,
      variantSettings,
      features: featureList,
      plans,
    } = section;

    // 1. Transform the 'features' array to handle both string and object formats.
    const transformedFeatures = featureList.map((f) => {
      // If feature is an object, use it directly. If it's a string, convert it to an object.
      if (typeof f === "object" && f !== null) {
        return {
          key: f.key || f.title,
          title: f.title,
          description: f.description || "",
          icon: f.icon || "🌱",
        };
      }
      // If it's just a string, create a basic object.
      return {
        key: f,
        title: f,
        description: "",
        icon: "🌱",
      };
    });

    // 2. Transform the 'plans' array into the 'pricing' format the layout expects.
    const transformedPricing = plans.map((plan) => {
      const benefits = featureList
        .filter((feature) => {
          const featureKey =
            typeof feature === "object" ? feature.key : feature;
          return plan.features[featureKey];
        })
        .map((feature) =>
          typeof feature === "object" ? feature.title : feature
        );

      return { ...plan, benefits };
    });

    // 3. Create the 'pricingAccess' map for quick lookups.
    const transformedAccess = plans.reduce((acc, plan) => {
      const key = normalizePlanName(plan.name);
      acc[key] = featureList
        .filter((feature) => {
          const featureKey =
            typeof feature === "object" ? feature.key : feature;
          return plan.features[featureKey];
        })
        .map((feature) =>
          typeof feature === "object" ? feature.key : feature
        );
      return acc;
    }, {});

    return {
      features: transformedFeatures,
      pricing: transformedPricing,
      pricingAccess: transformedAccess,
      settings: variantSettings || {},
      variant: layoutVariant || 1,
      heading: section.heading,
      subheading: section.subheading,
    };
  }, [section]);

  /* ---------------- State: Selected Plan ---------------- */
  const defaultPlan = pricing?.[0]
    ? normalizePlanName(pricing[0].name)
    : "free";
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);

  const isAllowed = (featureKey) =>
    (pricingAccess?.[selectedPlan] || []).includes(featureKey);

  // Find advanced features only VCore has
  const vcoreExtras =
    pricingAccess?.vcore?.filter(
      (k) =>
        !(pricingAccess?.pro || []).includes(k) &&
        !(pricingAccess?.free || []).includes(k)
    ) || [];

  /* ---------------- STYLE CONFIGURATION ---------------- */
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
      ? "shadow-md hover:shadow-xl"
      : "border border-gray-300";

  const patternClass =
    settings.bgPattern === "soft-grid"
      ? "bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-[size:24px_24px]"
      : settings.bgPattern === "dots"
      ? "bg-[radial-gradient(#0002_1px,transparent_1px)] bg-[size:8px_8px]"
      : settings.bgPattern === "grid"
      ? "bg-[linear-gradient(#0002_1px,transparent_1px)] bg-[size:20px_20px]"
      : "";

  const Divider = () =>
    settings.divider === "line" ? (
      <hr
        className="border-t my-6"
        style={{ borderColor: "var(--color-surface)" }}
      />
    ) : settings.divider === "dashed" ? (
      <hr
        className="border-t border-dashed my-6"
        style={{ borderColor: "var(--color-surface)" }}
      />
    ) : null;

  /* ---------------- Pricing Card ---------------- */
  const PricingCard = ({ tier }) => {
    const key = normalizePlanName(tier.name);
    const active = key === selectedPlan;

    return (
      <div
        onClick={() => setSelectedPlan(key)}
        className={`cursor-pointer p-6 transition-all border ${pricingShapeClass} ${
          active ? "scale-105 shadow-2xl" : "shadow-sm"
        } hover:shadow-lg`}
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
          borderColor: active ? "var(--color-primary)" : "var(--color-surface)",
        }}
      >
        <h3 className="text-xl font-semibold">{tier.name}</h3>
        <p className="opacity-75 text-sm mb-2">{tier.description}</p>
        <div
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          {tier.price}
          <span className="text-base font-normal opacity-75">
            {tier.period}
          </span>
        </div>
        <ul className="text-sm opacity-75 space-y-1">
          {tier.benefits?.map((b, i) => (
            <li key={i}>• {b}</li>
          ))}
        </ul>
      </div>
    );
  };

  /* ---------------- Feature Renderer Component ---------------- */
  const FeatureRenderer = ({ f }) => {
    if (settings.featuresAsAccordion) {
      return (
        <FeatureAccordion f={f} isAllowed={isAllowed} settings={settings} />
      );
    }

    // Default Feature Item (Original)
    return (
      <div
        className={`p-4 rounded-xl transition-all hover:scale-[1.02] ${featureCardStyle}`}
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
        }}
      >
        <div className="flex items-start gap-4">
          {settings.showIcons && (
            <span className="text-2xl min-w-8">{f.icon}</span>
          )}
          <div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg">{f.title}</span>
              <span className="text-lg">{isAllowed(f.key) ? "✔️" : "❌"}</span>
            </div>
            <p className="text-sm opacity-75">{f.description}</p>
          </div>
        </div>
      </div>
    );
  };

  /* ---------------- VARIANTS ---------------- */
  const Variant1 = () => (
    <section
      className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-10 ${spacingClass} ${patternClass}`}
    >
      <div>
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--color-secondary)" }}
        >
          Features
        </h2>
        <div className="space-y-4">
          {features.map((f) => (
            <FeatureRenderer key={f.key} f={f} />
          ))}
        </div>
      </div>
      <div>
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--color-secondary)" }}
        >
          Pricing
        </h2>
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
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--color-secondary)" }}
      >
        {heading}
      </h2>
      <p className="text-center mb-10 max-w-2xl mx-auto opacity-80">
        {subheading}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {pricing.map((p) => (
          <PricingCard key={p.name} tier={p} />
        ))}
      </div>
      <Divider />
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-secondary)" }}
      >
        Features
      </h2>
      <div className="space-y-3 max-w-3xl mx-auto">
        {features.map((f) => (
          <FeatureRenderer key={f.key} f={f} />
        ))}
      </div>
    </section>
  );

  const Variant3 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--color-secondary)" }}
      >
        {heading}
      </h2>
      <p className="text-center mb-10 max-w-2xl mx-auto opacity-80">
        {subheading}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {pricing.map((p) => (
          <PricingCard key={p.name} tier={p} />
        ))}
      </div>
      <Divider />
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-secondary)" }}
      >
        Features
      </h2>
      <div className="space-y-3 max-w-3xl mx-auto">
        {features.map((f) => (
          <FeatureRenderer key={f.key} f={f} />
        ))}
      </div>
    </section>
  );

  const Variant4 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--color-secondary)" }}
      >
        {heading}
      </h2>
      <p className="text-center mb-10 max-w-2xl mx-auto opacity-80">
        {subheading}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {pricing.map((p) => (
          <PricingCard key={p.name} tier={p} />
        ))}
      </div>
      <Divider />
      <h2
        className="text-3xl font-bold mb-4"
        style={{ color: "var(--color-secondary)" }}
      >
        Features Included
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <FeatureRenderer key={f.key} f={f} />
        ))}
      </div>
    </section>
  );

  const Variant5 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-secondary)" }}
      >
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {features.map((f) => (
          <FeatureRenderer key={f.key} f={f} />
        ))}
      </div>
      <Divider />
      <h2
        className="text-3xl font-bold mb-4"
        style={{ color: "var(--color-secondary)" }}
      >
        Plans
      </h2>
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
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: "var(--color-secondary)" }}
        >
          Feature Summary
        </h3>
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
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--color-secondary)" }}
        >
          Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <PricingCard key={p.name} tier={p} />
          ))}
        </div>
      </main>
    </section>
  );

  // --- NEW ADVANCED VARIANTS ---

  // Variant 7: The Feature Comparison Table
  const Variant7 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--color-secondary)" }}
      >
        {heading}
      </h2>
      <p className="text-center mb-10 max-w-2xl mx-auto opacity-80">
        {subheading}
      </p>

      <div
        className="overflow-x-auto rounded-lg border border-gray-200"
        style={{ borderColor: "var(--color-surface)" }}
      >
        <table className="w-full">
          <thead
            style={{
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text)",
            }}
          >
            <tr>
              <th className="p-4 text-left font-semibold">Features</th>
              {pricing.map((plan, i) => (
                <th
                  key={i}
                  className={`p-4 text-center font-semibold ${
                    plan.popular ? "ring-2 ring-inset" : ""
                  }`}
                  style={{
                    ringColor: plan.popular ? "var(--color-primary)" : "",
                  }}
                >
                  <div>{plan.name}</div>
                  <div className="text-2xl font-normal mt-2">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr
                key={f.key}
                className="border-t border-gray-200"
                style={{ borderColor: "var(--color-surface)" }}
              >
                <td className="p-4 font-medium">{f.title}</td>
                {pricing.map((plan, j) => (
                  <td key={j} className="p-4 text-center">
                    {isAllowed(f.key) ? (
                      <span
                        className="text-2xl"
                        style={{ color: "var(--color-accent)" }}
                      >
                        ✓
                      </span>
                    ) : (
                      <span className="text-2xl opacity-30">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "var(--color-surface)" }}>
              <td></td>
              {pricing.map((plan, i) => (
                <td key={i} className="p-4">
                  <a
                    href={plan.button.href}
                    className={`block w-full text-center font-bold py-2 px-4 rounded-lg transition-all ${
                      plan.popular ? "text-white" : ""
                    }`}
                    style={{
                      backgroundColor: plan.popular
                        ? "var(--color-primary)"
                        : "var(--color-secondary)",
                      color: plan.popular ? "white" : "var(--color-background)",
                    }}
                  >
                    {plan.button.label}
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );

  // Variant 8: The Interactive Tab View
  const Variant8 = () => {
    const [activeTab, setActiveTab] = useState(
      normalizePlanName(pricing[0]?.name || "free")
    );

    return (
      <section className={`max-w-4xl mx-auto ${spacingClass} ${patternClass}`}>
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          {heading}
        </h2>
        <p className="text-center mb-10 max-w-2xl mx-auto opacity-80">
          {subheading}
        </p>

        <div
          className="flex justify-center mb-8 border-b border-gray-200"
          style={{ borderColor: "var(--color-surface)" }}
        >
          {pricing.map((plan) => {
            const key = normalizePlanName(plan.name);
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === key ? "border-b-2" : ""
                }`}
                style={{
                  color:
                    activeTab === key
                      ? "var(--color-primary)"
                      : "var(--color-text)",
                  borderColor:
                    activeTab === key ? "var(--color-primary)" : "transparent",
                }}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        {pricing.map((plan) => {
          const key = normalizePlanName(plan.name);
          if (key !== activeTab) return null;
          return (
            <div
              key={key}
              className="text-center p-8 rounded-xl"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div
                className="text-5xl font-extrabold my-4"
                style={{ color: "var(--color-primary)" }}
              >
                {plan.price}
              </div>
              <p className="mb-6 opacity-80">{plan.description}</p>

              <div className="text-left space-y-3 mb-8 max-w-md mx-auto">
                {features.map((f) => (
                  <div
                    key={f.key}
                    className={`flex items-center justify-between p-3 rounded-lg border text-sm ${
                      isAllowed(f.key) ? "" : "opacity-50"
                    }`}
                    style={{ borderColor: "var(--color-surface)" }}
                  >
                    <span>{f.title}</span>
                    <span className="text-lg">
                      {isAllowed(f.key) ? "✓" : "—"}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={plan.button.href}
                className="inline-block font-bold py-3 px-8 rounded-lg text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {plan.button.label}
              </a>
            </div>
          );
        })}
      </section>
    );
  };

  // Variant 9: The Modern Icon Cards
  const Variant9 = () => (
    <section className={`max-w-7xl mx-auto ${spacingClass} ${patternClass}`}>
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--color-secondary)" }}
      >
        {heading}
      </h2>
      <p className="text-center mb-10 max-w-2xl mx-auto opacity-80">
        {subheading}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricing.map((plan) => {
          const key = normalizePlanName(plan.name);
          const active = key === selectedPlan;
          return (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={`relative p-8 rounded-2xl border-2 transition-all transform hover:scale-105 cursor-pointer ${
                active ? "shadow-2xl" : "shadow-lg"
              }`}
              style={{
                borderColor: active
                  ? "var(--color-primary)"
                  : "var(--color-surface)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold px-4 py-1 rounded-full text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
              <div className="text-center my-6">
                <span
                  className="text-5xl font-extrabold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {plan.price}
                </span>
                <span className="text-xl font-normal opacity-75">
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 text-sm">
                {features.map((f) => (
                  <li
                    key={f.key}
                    className={`flex items-center p-2 rounded-md border ${
                      isAllowed(f.key) ? "" : "opacity-40"
                    }`}
                    style={{ borderColor: "var(--color-background)" }}
                  >
                    <span
                      className="text-lg mr-3"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {isAllowed(f.key) ? "✓" : "—"}
                    </span>
                    <span>{f.title}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.button.href}
                className={`mt-8 block w-full text-center font-bold py-3 px-6 rounded-lg transition-all ${
                  plan.popular ? "text-white" : ""
                }`}
                style={{
                  backgroundColor: plan.popular
                    ? "var(--color-primary)"
                    : "var(--color-secondary)",
                  color: plan.popular ? "white" : "var(--color-background)",
                }}
              >
                {plan.button.label}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );

  const renderVariant = () => {
    switch (variant) {
      case 1:
        return <Variant1 />;
      case 2:
        return <Variant2 />;
      case 3:
        return <Variant3 />;
      case 4:
        return <Variant4 />;
      case 5:
        return <Variant5 />;
      case 6:
        return <Variant6 />;
      case 7:
        return <Variant7 />;
      case 8:
        return <Variant8 />;
      case 9:
        return <Variant9 />;
      default:
        return <Variant2 />;
    }
  };

  // --- NEW: Advanced VCore Banner Component ---
  const VCoreBanner = ({ extras }) => {
    if (!extras || extras.length === 0) return null;

    return (
      <div className="max-w-5xl mx-auto px-6 py-12 mt-16 text-center ">
        <div
          className="relative p-8 md:p-12 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl"
          style={{
            background: `linear-gradient(135deg, var(--color-accent), var(--color-primary))`,
            color: "var(--color-background)",
          }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full transform translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
              Unlock The Ultimate Power
            </h3>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              The VCore plan includes exclusive features designed for
              enterprises that demand the best.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              {extras.map((k) => (
                <div
                  key={k}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white bg-opacity-20 text-blue-600"
                >
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 01-.501.84l-2.534 1.844a1 1 0 00-.388 1.24l.961 2.715a1 1 0 01-1.27 1.27l-2.714-.96a1 1 0 00-1.241.387l-1.844 2.535a1 1 0 01-.84.501l-3.292-1.07a1 1 0 010-1.902l3.292-1.07a1 1 0 01.84.501l1.844 2.535a1 1 0 001.241.387l2.714-.96a1 1 0 011.27 1.27l-.96 2.715a1 1 0 00.388 1.24l2.534 1.844a1 1 0 01.501.84l-1.07 3.292zM12 10a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  <span className="font-semibold">
                    {k.replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/#"
              className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Get Your Custom VCore Plan
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {renderVariant()}
      <VCoreBanner extras={vcoreExtras} />
    </div>
  );
}
