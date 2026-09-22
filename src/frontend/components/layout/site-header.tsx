"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/frontend/data/navigation";
import { articles, caseStudies, services } from "@/frontend/data/site-content";

const previews = [
  { description: "Explore the capabilities behind measurable growth.", featured: services[0].title, href: "/services" },
  { description: "See selected outcomes from our client work.", featured: caseStudies[0].title, href: `/case-studies/${caseStudies[0].slug}` },
  { description: "Read practical ideas for leaders in motion.", featured: articles[0].title, href: `/blog/${articles[0].slug}` },
];

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
        {primaryNavigation.map((item, index) => {
          const active = isActive(item.href);

          return (
            <div className="nav-preview-item" key={item.href}>
              <Link href={item.href} className={active ? "nav-active" : ""} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
              <div className="nav-preview-panel">
                <span className="nav-preview-kicker">Explore {item.label}</span>
                <p>{previews[index].description}</p>
                <Link className="nav-preview-feature" href={previews[index].href}>
                  <span>{previews[index].featured}</span><span aria-hidden="true">↗</span>
                </Link>
                <Link className="nav-preview-all" href={item.href}>View all {item.label.toLowerCase()} <span aria-hidden="true">→</span></Link>
              </div>
            </div>
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

          {primaryNavigation.map((item, index) => {
            const active = isActive(item.href);

            return (
              <details className="mobile-nav-preview" key={item.href}>
                <summary className={active ? "nav-active" : ""}>{item.label}</summary>
                <p>{previews[index].description}</p>
                <Link href={previews[index].href}>{previews[index].featured}</Link>
                <Link href={item.href} aria-current={active ? "page" : undefined}>View all {item.label.toLowerCase()} →</Link>
              </details>
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
