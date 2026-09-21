"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PixelWaveImage } from "@/frontend/components/interactive/pixel-wave-image";

gsap.registerPlugin(ScrollTrigger);

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
          ".hero-title",
          {
            x: -120,
            opacity: 0,
            duration: 1.5,
          },
          "-=0.45"
        )
        .from(
          ".hero-copy",
          {
            x: 120,
            opacity: 0,
            duration: 1.5,
          },
          "-=1.1"
        );

      gsap.fromTo(
        ".hero-visual",
        {
          y: 140,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-visual",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
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
        <p className="eyebrow hero-eyebrow">
          Independent strategy and transformation partner
        </p>

        <div className="hero-grid">
          <h1 className="hero-title">
            Growth,
            <br />
            <span>made executable.</span>
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

      <div className="hero-visual">
        <PixelWaveImage />
      </div>
    </section>
  );
}