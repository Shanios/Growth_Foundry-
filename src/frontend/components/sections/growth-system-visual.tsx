"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GrowthSystemVisual() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".growth-system-content > *", {
          y: 35,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".growth-system-content > *", {
          y: 0,
          opacity: 1,
        });
      });

      return () => mm.revert();
    },
    {
      scope: ref,
    }
  );

  return (
    <section ref={ref} className="growth-system-visual">
      {/* Full-width diagonal geometric ribbons across the entire viewport */}
      <div className="growth-system-accents" aria-hidden="true">
        <div className="growth-accent-stripe growth-accent-stripe-1" />
        <div className="growth-accent-stripe growth-accent-stripe-2" />
        <div className="growth-accent-stripe growth-accent-stripe-3" />
      </div>

      <div className="growth-system-content">
        {/* The animated GIF enlarged for high visual impact */}
        <div className="growth-system-gif-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/WORKING-Animation-1.gif"
            alt="Growth Foundry strategic flow system"
            className="growth-system-gif"
            loading="lazy"
          />
        </div>

        <h2 className="growth-system-heading">
          <span className="growth-system-heading-muted">Real Growth Strategy.</span>
          <br />
          <span className="growth-system-heading-main">Real Accountability.</span>
        </h2>

        <p className="growth-system-copy">
          Choosing a growth partner should feel clear and trustworthy. Growth Foundry gives you
          validated strategic frameworks, verified commercial outcomes, direct senior communication, and
          hands-on execution before and after scale.
        </p>

        <div className="growth-system-action">
          <Link href="/services" className="growth-system-btn">
            Know more about services
          </Link>
        </div>
      </div>
    </section>
  );
}


