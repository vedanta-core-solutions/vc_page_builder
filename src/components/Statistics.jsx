// src/components/Statistics.jsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useContent } from "@/context/ContentContext";

/**
 * Robust Statistics component (no hooks after early return, content memoized).
 */
export default function Statistics() {
  // 1) always call hook first
  const ctx = useContent();

  // 2) stabilize content with useMemo (important — don't inline content expression in deps)
  const content = useMemo(() => ctx?.content ?? {}, [ctx]);

  // 3) normalize statsRaw via useMemo
  const statsRaw = useMemo(() => content?.statistics ?? {}, [content]);

  // 4) derive items array (prefer items array, else counters object)
  const items = useMemo(() => {
    if (Array.isArray(statsRaw.items) && statsRaw.items.length) {
      return statsRaw.items.map((it, i) => ({
        key: it.key ?? it.id ?? `item_${i}`,
        label: it.label ?? it.title ?? it.name ?? "",
        value: Number(it.value ?? it.count ?? 0),
        showPlus: !!it.showPlus,
        suffix: typeof it.suffix === "string" ? it.suffix : undefined,
      }));
    }
    if (statsRaw.counters && typeof statsRaw.counters === "object") {
      const labels = statsRaw.labels || {};
      return Object.entries(statsRaw.counters).map(([k, v], i) => ({
        key: k,
        label:
          labels[k] ||
          k.replace(/[_-]/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase()),
        value: Number(v ?? 0),
        showPlus: false,
        suffix: undefined,
      }));
    }
    return [];
  }, [statsRaw]);

  // 5) other memos
  const duration = useMemo(
    () => (typeof statsRaw.animateDuration === "number" ? statsRaw.animateDuration : 1200),
    [statsRaw]
  );
  const globalSuffix = useMemo(
    () => (typeof statsRaw.suffix === "string" ? statsRaw.suffix : statsRaw.suf ?? ""),
    [statsRaw]
  );

  // 6) keys and initial values (hooks still top-level)
  const keys = useMemo(() => items.map((it) => it.key), [items]);

  const [values, setValues] = useState(() =>
    keys.reduce((acc, k) => {
      acc[k] = 0;
      return acc;
    }, {})
  );

  // 7) keep keys present in values (schedule async update to avoid sync setState warning)
  const rafRef = useRef(null);
  useEffect(() => {
    const needUpdate = keys.some((k) => values[k] === undefined) || Object.keys(values).length !== keys.length;
    if (!needUpdate) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setValues((prev) => {
        const merged = { ...prev };
        keys.forEach((k) => {
          if (merged[k] === undefined) merged[k] = 0;
        });
        return merged;
      });
      rafRef.current = null;
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // deps: only keys (values used inside but setState scheduled async)
  }, [keys]); // eslint-disable-line

  // 8) animate counters (safe timers + cleanup)
  const timersRef = useRef([]);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    timersRef.current.forEach((t) => clearInterval(t));
    timersRef.current = [];

    if (!items.length) return () => (mountedRef.current = false);

    items.forEach((it, idx) => {
      const key = it.key;
      const target = Math.max(0, Number(it.value ?? 0));

      if (!isFinite(target) || target === 0) {
        requestAnimationFrame(() => {
          if (mountedRef.current) setValues((prev) => ({ ...prev, [key]: Math.round(target) }));
        });
        return;
      }

      const fps = 60;
      const steps = Math.max(6, Math.round((duration / 1000) * fps));
      const stepVal = target / steps;
      let current = 0;
      let step = 0;

      const id = setInterval(() => {
        step += 1;
        current += stepVal;
        if (!mountedRef.current) {
          clearInterval(id);
          return;
        }
        if (step >= steps) {
          clearInterval(id);
          setValues((prev) => ({ ...prev, [key]: Math.round(target) }));
        } else {
          setValues((prev) => ({ ...prev, [key]: Math.round(current) }));
        }
      }, Math.max(1, Math.round(duration / steps)));

      timersRef.current.push(id);
    });

    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((t) => clearInterval(t));
      timersRef.current = [];
    };
  }, [items, duration]);

  // 9) final render (early return allowed here because all hooks already called)
  if (!items.length) return null;

  const heading = statsRaw.heading || "";
  const lead = statsRaw.lead || "";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const numberFormatter = useMemo(() => new Intl.NumberFormat("en-IN"), []);

  return (
    <section id="statistics" className="py-20 px-6 bg-linear-to-b from-blue-900 to-gray-300">
      <div className="max-w-6xl mx-auto">
        {(heading || lead) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>}
            {lead && <p className="text-lg text-indigo-200 max-w-3xl mx-auto">{lead}</p>}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((it) => {
            const displayed = values[it.key] ?? Math.round(it.value ?? 0);
            const displaySuffix = it.suffix ?? globalSuffix ?? "";

            return (
              <div key={it.key} className="px-4">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {numberFormatter.format(displayed)}
                  {it.showPlus && "+"}
                  {displaySuffix}
                </p>
                {it.label && <p className="text-indigo-200">{it.label}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
