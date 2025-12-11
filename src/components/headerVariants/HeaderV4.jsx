"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function HeaderV4() {
  const ctx = useContent();
  const content = ctx?.content || {};
  const navbar = content?.navbar || {};

  const selectionMap = ctx?.selectionMap || {};

  const firstVariantKey =
    Array.isArray(navbar.variants) && navbar.variants.length > 0
      ? navbar.variants[0].key
      : null;
  const variantKey =
    selectionMap?.navbar || navbar.defaultVariant || firstVariantKey;

  const variantObj = Array.isArray(navbar.variants)
    ? navbar.variants.find((v) => v.key === variantKey)
    : null;

  const { variants, defaultVariant, ...baseNavbar } = navbar;
  const activeNavbar = { ...baseNavbar, ...(variantObj || {}) };

  const behavior = activeNavbar.behavior || {};
  const sticky = Boolean(behavior.sticky);
  const shadowOnScroll = Boolean(behavior.shadowOnScroll);
  const hideOnScroll = Boolean(behavior.hideOnScroll);
  const blur = Boolean(behavior.blur);

  const navLinks = Array.isArray(activeNavbar.navlink)
    ? activeNavbar.navlink
    : [];
  const cta = Array.isArray(activeNavbar.button)
    ? activeNavbar.button[0]
    : null;
  const logo =
    activeNavbar.logo ||
    content?.defaults?.logo ||
    "/logo_rest.jpg";
  const logoHref = activeNavbar.logoHref || content?.defaults?.logoHref || "/";

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!shadowOnScroll && !hideOnScroll) return;

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (shadowOnScroll) setScrolled(y > 40);

      if (hideOnScroll) {
        if (y > lastY && y > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastY(y);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastY, shadowOnScroll, hideOnScroll]);

  // wrapper: positioning + hide/show transform
  const outerBase = sticky ? "fixed w-full top-0 z-30" : "relative";
  const shadowClass = scrolled ? "shadow-lg" : "shadow-none";
  const blurClass = blur ? "backdrop-blur-sm" : "";
  const hiddenClass =
    hideOnScroll && !visible ? "-translate-y-[110%]" : "translate-y-0";

  return (
    <>
      {/* wrapper controls sticky + hide transform */}
      <div className={`${outerBase} ${hiddenClass} header-v4 transition-transform duration-300`}>
        {/* header: visual styling */}
        <header
          className={`transition-all duration-300 ${shadowClass} ${blurClass} border-b border-default bg-surface`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-12 w-full">
              {/* LEFT: Hamburger (mobile) + Desktop logo */}
              <div className="flex items-center gap-3 w-1/3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-surface-elev"
                  aria-label="Open menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-default"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* DESKTOP LOGO */}
                <div className="hidden md:flex items-center">
                  <Link href={logoHref} className="flex items-center gap-2">
                    <div className="relative">
                      <Image
                        src={logo}
                        alt="logo"
                        width={50}
                        height={50}
                        className="object-fill rounded-xl"
                      />
                    </div>
                    <span className="brand-text-theme text-lg">
                      {navbar.logoText || ""}
                    </span>
                  </Link>
                </div>

                <div className="hidden md:block flex-1" />
              </div>

              {/* CENTER: nav (centered when NO CTA) */}
              <div className="hidden md:flex items-center justify-center w-1/3">
                {!cta && (
                  <nav
                    className="flex items-center gap-8 mr-6"
                    aria-label="Primary navigation"
                  >
                    {navLinks.map((n, i) => (
                      <a
                        key={i}
                        href={n.href || "#"}
                        className="nav-item hover:font-semibold transition"
                      >
                        {n.label}
                      </a>
                    ))}
                  </nav>
                )}
              </div>

              {/* RIGHT: Mobile logo + md+ nav + CTA */}
              <div className="flex items-center justify-end w-1/3 gap-3">
                <div className="md:hidden flex items-center">
                  <Link href={logoHref} className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={logo}
                        alt="logo"
                        width={36}
                        height={36}
                        className="object-cover"
                      />
                    </div>
                  </Link>
                </div>

                {cta ? (
                  <>
                    <nav
                      className="hidden md:flex items-center gap-6 mr-4"
                      aria-label="Primary navigation"
                    >
                      {navLinks.map((n, i) => (
                        <a
                          key={i}
                          href={n.href || "#"}
                          className="nav-item hover:font-semibold transition"
                        >
                          {n.label}
                        </a>
                      ))}
                    </nav>

                    <Link
                      href={cta.href || "#"}
                      className="hidden md:inline-block btn-cta"
                      role="button"
                    >
                      {cta.label}
                    </Link>
                  </>
                ) : (
                  <div className="hidden md:block w-full" />
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Sidebar (drawer) */}
      <aside
        className={`fixed rounded-br-3xl inset-y-0 left-0 z-40 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } max-h-screen transition-transform duration-300 mobile-drawer shadow-xl lg:hidden`}
        aria-hidden={!sidebarOpen}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                src={logo}
                alt="logo"
                width={36}
                height={36}
                style={{ objectFit: "cover", width: "36px", height: "36px" }}
              />
              <span className="font-semibold text-lg">
                {content?.meta?.site || "Site"}
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-default"
            >
              ✕
            </button>
          </div>

          <nav>
            <ul className="space-y-2">
              {navLinks.map((n, i) => (
                <li key={i}>
                  <a
                    href={n.href || "#"}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2 rounded hover:font-semibold hover:bg-surface-elev"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>

            {cta && (
              <div className="mt-6">
                <Link
                  href={cta.href || "#"}
                  className="block text-center px-4 py-2 rounded-full btn-cta w-full"
                >
                  {cta.label}
                </Link>
              </div>
            )}
          </nav>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
