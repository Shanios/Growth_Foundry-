"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CaseStudiesHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".case-hero-black", {
        x: -140,
        opacity: 0,
        duration: 1.15,
      })
        .from(
          ".case-hero-red",
          {
            x: -140,
            opacity: 0,
            duration: 1.15,
          },
          "-=0.5"
        )
        .from(
          ".case-hero-copy",
          {
            y: 24,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.5"
        );
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      className="inner-hero page-shell case-studies-hero"
    >
      <p className="eyebrow">
        Selected work
      </p>

      <h1>
        <span className="case-hero-black">
          Evidence over
        </span>

        <br />

        <em className="case-hero-red">
          empty claims.
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