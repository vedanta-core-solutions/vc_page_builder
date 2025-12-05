'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroV3({ hero = {} }) {
    if (!hero) return null;

    return (
        <section
            className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center text-background font-base"
            style={{ backgroundImage: `url(${hero.image})` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl text-center px-4">

                {/* TAGLINE */}
                {hero.tagline && (
                    <p className="text-lg text-accent mb-3">{hero.tagline}</p>
                )}

                {/* TITLE */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
                    {hero.title?.split(" ").map((word, i) => (
                        <span
                            key={i}
                            className={word === hero.highlight ? "text-primary" : ""}
                        >
                            {word + " "}
                        </span>
                    ))}
                </h1>

                {/* SUBTITLE */}
                {hero.subtitle && (
                    <p className="text-lg sm:text-xl opacity-90 mb-6">
                        {hero.subtitle}
                    </p>
                )}

                {/* BUTTONS */}
                <div className="flex justify-center gap-4 flex-wrap">
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

            </div>
        </section>
    );
}
