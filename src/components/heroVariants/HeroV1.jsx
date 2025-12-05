'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroV1({ hero = {} }) {
    if (!hero) return null;

    return (
        <section className="flex flex-wrap bg-background font-base">

            {/* LEFT SIDE */}
            <div className="w-full lg:w-7/12 xl:w-6/12 p-6 md:p-8 lg:p-12">
                <div className="mx-auto" style={{ maxWidth: "680px" }}>

                    {/* BRANDING */}
                    <nav className="flex justify-between items-center mb-6 md:mb-10">
                        <div className="text-3xl sm:text-4xl font-bold text-primary">
                            {hero.branding}
                            <span className="text-accent">.</span>
                        </div>
                    </nav>

                    <div className="space-y-4 sm:space-y-6">

                        {/* TAGLINE */}
                        {hero.tagline && (
                            <p className="text-base sm:text-lg font-medium tracking-wide text-accent">
                                {hero.tagline}
                            </p>
                        )}

                        {/* TITLE */}
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-secondary">
                            {hero.title?.split(" ").map((word, i) => (
                                <span
                                    key={i}
                                    className={word === hero.highlight ? "text-primary" : "text-secondary"}
                                >
                                    {word + " "}
                                </span>
                            ))}
                        </h1>

                        {/* BAR */}
                        <div className="w-24 sm:w-28 h-2 bg-primary"></div>

                        {/* SUBTITLE */}
                        <p className="text-lg sm:text-xl text-secondary leading-relaxed">
                            {hero.subtitle}
                        </p>

                        {/* DESCRIPTION */}
                        <p className="text-base sm:text-lg text-secondary/90 leading-relaxed">
                            {hero.description}
                        </p>

                        {/* BADGES */}
                        {hero.badges?.length > 0 && (
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {hero.badges.map((badge, i) => (
                                    <span
                                        key={i}
                                        className="px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow bg-accent text-background"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* RATING */}
                        {(hero.rating?.iconPath || hero.rating?.text || hero.rating?.value) && (
                            <div className="flex items-center">
                                {hero.rating?.iconPath && (
                                    <svg
                                        className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 mr-2"
                                        viewBox="0 0 32 32"
                                        fill="currentColor"
                                    >
                                        <path d={hero.rating.iconPath} />
                                    </svg>
                                )}

                                {(hero.rating?.value || hero.rating?.text) && (
                                    <p className="text-secondary text-sm sm:text-base">
                                        {hero.rating.value && <strong>{hero.rating.value}</strong>}
                                        {hero.rating.value && hero.rating.text && " — "}
                                        {hero.rating.text}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* BUTTONS */}
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            {hero.button?.map((btn, i) => (
                                <Link
                                    key={i}
                                    href={btn.href}
                                    className="px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded shadow bg-primary text-background"
                                >
                                    {btn.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA NOTE */}
                        {hero.ctaNote && (
                            <p className="text-xs sm:text-sm italic opacity-80 text-secondary">
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
                    className="w-full h-56 sm:h-72 md:h-96 lg:h-screen object-cover shadow-accent"
                />
            </div>

        </section>
    );
}
