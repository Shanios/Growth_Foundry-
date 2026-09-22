"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CharacterText } from "@/frontend/components/interactive/character-text";
import { HeroGridBackground } from "@/frontend/components/interactive/hero-grid-background";

export function CaseStudiesHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".case-hero-black .character-reveal__word", {
        x: -110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      })
        .from(
          ".case-hero-red .character-reveal__word",
          {
            x: -110,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.22"
        )
        .from(
          ".case-hero-copy",
          {
            x: -40,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.18"
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
      className="inner-hero page-shell case-studies-hero hero-intro"
      style={{ minHeight: "100svh", color: "#fff" }}
    >
      <HeroGridBackground />
      <p className="eyebrow">
        Selected work
      </p>

      <h1>
        <span className="case-hero-black" aria-label="Evidence over">
          <CharacterText>Evidence over</CharacterText>
        </span>

        <br />

        <em className="case-hero-red" aria-label="empty claims." style={{ color: "#fff" }}>
          <CharacterText>empty claims.</CharacterText>
        </em>
      </h1>

      <p className="inner-intro case-hero-copy">
        A selection of engagements across growth,
        commercial performance, and operating
        transformation.
      </p>
    </section>
  );
}
