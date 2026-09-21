"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function BlogHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".blog-hero-black", {
        x: -140,
        opacity: 0,
        duration: 1.15,
      })
        .from(
          ".blog-hero-red",
          {
            x: -140,
            opacity: 0,
            duration: 1.15,
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
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      className="inner-hero page-shell blog-hero"
    >
      <p className="eyebrow">
        Insights
      </p>

      <h1>
        <span className="blog-hero-black">
          Useful thinking for
        </span>

        <br />

        <em className="blog-hero-red">
          leaders in motion.
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