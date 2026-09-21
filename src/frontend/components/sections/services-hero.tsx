"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".services-hero-black", {
          x: -140,
          opacity: 0,
          duration: 1.2,
        })
        .from(
          ".services-hero-red",
          {
            x: -140,
            opacity: 0,
            duration: 1.2,
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
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      className="inner-hero page-shell"
    >
      <p className="eyebrow">
        Services
      </p>

      <h1>
        <span className="services-hero-black">
          Strategy is only useful
        </span>

        <br />

        <em className="services-hero-red">
          when it changes what happens next.
        </em>
      </h1>

      <p className="inner-intro services-hero-copy">
        We work across advisory and execution —
        helping leadership teams make better
        choices, then building the systems and
        momentum required to turn those choices
        into measurable results.
      </p>
    </section>
  );
}