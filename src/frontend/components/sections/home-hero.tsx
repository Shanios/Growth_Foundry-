"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { HeroGridBackground } from "@/frontend/components/interactive/hero-grid-background";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-eyebrow", {
          y: 15,
          opacity: 0,
          duration: 0.9,
        })
        .from(
          ".hero-title-main",
          {
            x: -64,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.35"
        )
        .from(
          ".hero-title-accent",
          { x: -36, opacity: 0, duration: 1.05 },
          "-=0.72"
        )
        .from(
          ".hero-copy > p",
          {
            x: 28,
            y: 12,
            opacity: 0,
            duration: 0.95,
          },
          "-=0.75"
        )
        .from(".hero-copy .text-link", {
          y: 12, opacity: 0, duration: 0.8,
        }, "-=0.55");
      });
      return () => mm.revert();
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      className="hero page-shell"
    >
      <div className="hero-intro">
        <HeroGridBackground />
        <p className="eyebrow hero-eyebrow">
          Independent strategy and transformation partner
        </p>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="hero-title-main">Growth,</span>
            <br />
            <span className="hero-title-accent">made executable.</span>
          </h1>

          <div className="hero-copy">
            <p>
              We help ambitious businesses make sharper choices,
              build stronger operating systems, and turn strategy
              into measurable momentum.
            </p>

            <Link
              className="text-link"
              href="/services"
            >
              Explore our work <span>↗</span>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
