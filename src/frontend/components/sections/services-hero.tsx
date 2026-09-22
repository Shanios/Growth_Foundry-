"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CharacterText } from "@/frontend/components/interactive/character-text";
import { HeroGridBackground } from "@/frontend/components/interactive/hero-grid-background";

export function ServicesHero() {
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
          .from(".services-hero-black .character-reveal__character", {
            x: -18,
            opacity: 0,
            duration: 0.34,
            stagger: 0.024,
          })
          .from(
            ".services-hero-red .character-reveal__character",
            {
              x: -18,
              opacity: 0,
              duration: 0.34,
              stagger: 0.024,
            },
            "-=0.45"
          )
          .from(
            ".services-hero-copy",
            {
              y: 24,
              opacity: 0,
              duration: 0.9,
            },
            "-=0.55"
          );
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
      className="inner-hero page-shell services-hero hero-intro"
      style={{ minHeight: "100svh", color: "#fff" }}
    >
      <HeroGridBackground />

      <p className="eyebrow">
        Services
      </p>

      <h1>
        <span className="services-hero-black" aria-label="Strategy is only useful">
          <CharacterText>Strategy is only useful</CharacterText>
        </span>

        <br />

        <em className="services-hero-red" aria-label="when it changes what happens next." style={{ color: "#fff" }}>
          <CharacterText>when it changes what happens next.</CharacterText>
        </em>
      </h1>

      <p className="inner-intro services-hero-copy">
        We work across advisory and execution — helping leadership teams make better choices, then building the systems and momentum required to turn those choices into measurable results.
      </p>
    </section>
  );
}
