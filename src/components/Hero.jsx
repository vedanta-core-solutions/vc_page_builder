'use client';
import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';

export default function Hero() {
    const { hero } = useContent().content;

    if (!hero) return null;

    return (
        <section className="flex flex-wrap bg-background font-base">

            {/* LEFT SIDE */}
            <div className="w-full lg:w-7/12 xl:w-6/12 p-6 lg:p-12">
                <div className="mx-auto" style={{ maxWidth: "680px" }}>

                    {/* BRANDING */}
                    <nav className="flex justify-between items-center mb-10">
                        <div className="text-4xl font-bold text-primary">
                            {hero.branding}
                            <span className="text-accent">.</span>
                        </div>
                    </nav>

                    <div className="space-y-6">

                        {/* TAGLINE */}
                        {hero.tagline && (
                            <p className="text-lg font-medium tracking-wide text-accent">
                                {hero.tagline}
                            </p>
                        )}

                        {/* TITLE WITH HIGHLIGHT */}
                        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-secondary">
                            {hero.title.split(" ").map((word, i) => (
                                <span
                                    key={i}
                                    className={word === hero.highlight ? "text-primary" : "text-secondary"}
                                >
                                    {word + " "}
                                </span>
                            ))}
                        </h1>

                        {/* BAR */}
                        <div className="w-28 h-2 bg-primary"></div>

                        {/* SUBTITLE */}
                        <p className="text-xl text-secondary leading-relaxed">
                            {hero.subtitle}
                        </p>

                        {/* DESCRIPTION */}
                        <p className="text-lg text-secondary/90 leading-relaxed">
                            {hero.description}
                        </p>

                        {/* BADGES */}
                        {hero.badges?.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {hero.badges.map((badge, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-1 rounded-full text-sm font-medium shadow bg-accent text-background"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* RATING */}
                        {(hero?.rating?.iconPath || hero?.rating?.text || hero?.rating?.value) && (
                            <div className="flex items-center">
                                {hero.rating.iconPath && (
                                    <svg
                                        className="h-6 w-6 text-yellow-500 mr-2"
                                        viewBox="0 0 32 32"
                                        fill="currentColor"
                                    >
                                        <path d={hero.rating.iconPath} />
                                    </svg>
                                )}

                                {(hero.rating.value || hero.rating.text) && (
                                    <p className="text-secondary">
                                        {hero.rating.value && <strong>{hero.rating.value}</strong>}
                                        {hero.rating.value && hero.rating.text && " — "}
                                        {hero.rating.text}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* BUTTONS */}
                        <div className="flex flex-wrap gap-4">
                            {hero.button?.map((btn, i) => (
                                <Link
                                    key={i}
                                    href={btn.href}
                                    className="px-6 py-3 text-lg font-semibold rounded shadow bg-primary text-background"
                                >
                                    {btn.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA NOTE */}
                        {hero.ctaNote && (
                            <p className="text-sm italic opacity-80 text-secondary">
                                {hero.ctaNote}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="w-full lg:w-5/12 xl:w-6/12">
                <img
                    src={hero.image}
                    alt="Hero Visual"
                    className="w-full h-64 sm:h-96 lg:h-screen object-cover"
                />
            </div>
        </section>
    );
}
