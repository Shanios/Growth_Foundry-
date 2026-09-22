"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CharacterText } from "@/frontend/components/interactive/character-text";
import { HeroGridBackground } from "@/frontend/components/interactive/hero-grid-background";

export function BlogHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".blog-hero-black .character-reveal__character", {
        x: -18,
        opacity: 0,
        duration: 0.34,
        stagger: 0.024,
      })
        .from(
          ".blog-hero-red .character-reveal__character",
          {
            x: -18,
            opacity: 0,
            duration: 0.34,
            stagger: 0.024,
          },
          "-=0.5"
        )
        .from(
          ".blog-hero-copy",
          {
            y: 24,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.5"
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
      className="inner-hero page-shell blog-hero hero-intro"
      style={{ minHeight: "100svh", color: "#fff" }}
    >
      <HeroGridBackground />
      <p className="eyebrow">
        Blog
      </p>

      <h1>
        <span className="blog-hero-black" aria-label="Useful thinking for">
          <CharacterText>Useful thinking for</CharacterText>
        </span>

        <br />

        <em className="blog-hero-red" aria-label="leaders in motion." style={{ color: "#fff" }}>
          <CharacterText>leaders in motion.</CharacterText>
        </em>
      </h1>

      <p className="inner-intro blog-hero-copy">
        Practical perspectives on the choices,
        systems, and leadership disciplines behind
        sustained growth.
      </p>
    </section>
  );
}
