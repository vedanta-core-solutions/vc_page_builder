"use client";
import React from "react";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContentContext } from "@/context/ContentContext";

export default function Blog() {
  const { content } = useContext(ContentContext) || {};
  const blog = content?.blog;

  if (!blog) return null;

  const heading = blog.heading || "Latest From Our Blog";
  const lead = blog.lead || blog.subtitle || "";
  const posts = Array.isArray(blog.posts)
    ? blog.posts
    : Array.isArray(blog.items)
    ? blog.items
    : [];

  if (!posts.length) return null;

  return (
    <section id="blog" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {heading}
          </h2>
          {lead && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {lead}
            </p>
          )}
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, idx) => {
            const id = post.id ?? idx;
            const title = post.title || "Untitled";
            const excerpt = post.excerpt || post.description || "";
            const date = post.date || "";
            const image = post.image || "/placeholder.jpg";
            const href = post.href || "#";

            return (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {date && (
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                      {date}
                    </p>
                  )}

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {title}
                  </h3>

                  {excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {excerpt}
                    </p>
                  )}

                  <Link
                    href={href}
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
