"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/frontend/data/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-header">

      {/* Logo */}
      <Link
        href="/"
        className="brand"
        aria-label="Growth Foundry home"
      >
        <span
          className="brand-mark"
          aria-hidden="true"
        >
          GF
        </span>

        <span className="brand-name">
          Growth Foundry
        </span>
      </Link>


      {/* Desktop Navigation */}
      <nav
        className="desktop-nav"
        aria-label="Primary navigation"
      >
        {primaryNavigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-active" : ""}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>


      {/* Contact */}
      <Link
        className={`header-cta ${
          isActive("/contact") ? "nav-active" : ""
        }`}
        href="/contact"
      >
        Start a conversation
        <span aria-hidden="true">↗</span>
      </Link>


      {/* Mobile Navigation */}
      <details className="mobile-menu">

        <summary aria-label="Open navigation">
          Menu
        </summary>

        <nav aria-label="Mobile navigation">

          {primaryNavigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active ? "nav-active" : ""
                }
                aria-current={
                  active ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className={
              isActive("/contact")
                ? "nav-active"
                : ""
            }
          >
            Start a conversation
          </Link>

        </nav>

      </details>

    </header>
  );
}