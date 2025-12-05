'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroV2({ hero = {} }) {
    if (!hero) return null;

    return (
        <section className="bg-background text-center py-20 px-6 font-base">

            {/* TAGLINE */}
            {hero.tagline && (
                <p className="text-lg text-accent font-medium mb-4">
                    {hero.tagline}
                </p>
            )}

            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-secondary max-w-3xl mx-auto">
                {hero.title?.split(" ").map((word, i) => (
                    <span
                        key={i}
                        className={word === hero.highlight ? "text-primary" : "text-secondary"}
                    >
                        {word + " "}
                    </span>
                ))}
            </h1>

            {/* SUBTITLE */}
            <p className="text-lg sm:text-xl text-secondary/90 mt-6 max-w-2xl mx-auto">
                {hero.subtitle}
            </p>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
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

            {/* IMAGE BELOW */}
            {hero.image && (
                <img
                    src={hero.image}
                    alt="Hero"
                    className="w-full max-w-4xl mx-auto mt-12 rounded-lg"
                />
            )}

        </section>
    );
}
