"use client";
import React from "react";
import { useContext } from "react";
import Image from "next/image";
import { ContentContext } from "@/context/ContentContext";

export default function Team() {
  const { content } = useContext(ContentContext) || {};
  const team = content?.team;
  if (!team) return null;

  const heading = team.heading || "Meet Our Team";
  const lead = team.lead || team.subtitle || "";
  const members = Array.isArray(team.members) ? team.members : Array.isArray(team.items) ? team.items : [];

  if (!members.length) return null;

  return (
    <section id="team" className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {heading}
            </h2>
          )}
          {lead && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {lead}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, idx) => {
            const id = m.id ?? idx;
            const name = m.name || m.title || "";
            const role = m.role || m.position || "";
            const bio = m.bio || m.description || "";
            const src = m.image || m.img || "/man1.jpg";
            const socials = Array.isArray(m.socials) ? m.socials : m.social ? [m.social] : [];

            return (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    sizes="128px"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {name && <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>}
                {role && <p className="text-indigo-600 dark:text-indigo-400 mb-3">{role}</p>}
                {bio && <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{bio}</p>}

                {socials.length > 0 && (
                  <div className="flex items-center justify-center gap-3">
                    {socials.map((s, i) => {
                      const href = s.href || s.url || "#";
                      const label = s.label || s.type || "social";
                      const isExternal = typeof href === "string" && href.startsWith("http");
                      // optional svg icon if provided as path
                      const icon = s.icon || s.iconPath || null;

                      return (
                        <a
                          key={i}
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="w-9 h-9 rounded-full inline-flex items-center justify-center bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors"
                          aria-label={label}
                          title={label}
                        >
                          {icon ? (
                            <svg viewBox={icon.viewBox || "0 0 24 24"} className="w-4 h-4" aria-hidden="true">
                              <path d={icon.path} />
                            </svg>
                          ) : (
                            // fallback: first letter of label
                            <span className="text-sm font-semibold">{label[0]?.toUpperCase()}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
