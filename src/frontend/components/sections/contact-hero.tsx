"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { CharacterText } from "@/frontend/components/interactive/character-text";
import { PaperPlaneExchange } from "@/frontend/components/interactive/paper-plane-exchange";
import { HeroGridBackground } from "@/frontend/components/interactive/hero-grid-background";

export function ContactHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".contact-hero-eyebrow", { y: 14, opacity: 0, duration: 0.75 })
        .from(".contact-hero-main .character-reveal__character", { x: -18, opacity: 0, duration: 0.34, stagger: 0.024 }, "-=0.25")
        .from(".contact-hero-accent .character-reveal__character", { x: -18, opacity: 0, duration: 0.34, stagger: 0.024 }, "-=0.12")
        .from(".contact-page-intro", { y: 20, opacity: 0, duration: 0.85 }, "-=0.4");
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <header ref={ref} className="contact-page-heading hero-intro" style={{ minHeight: "100svh", color: "#fff" }}>
      <HeroGridBackground />
      <p className="eyebrow contact-hero-eyebrow">Contact</p>
      <h1>
        <span className="contact-hero-main" aria-label="Start a"><CharacterText>Start a</CharacterText></span>
        <br />
        <em className="contact-hero-accent" aria-label="conversation." style={{ color: "#fff" }}><CharacterText>conversation.</CharacterText></em>
      </h1>
      <p className="contact-page-intro" style={{ color: "#fff" }}>Serious growth starts with clarity. Tell us where you are headed and what is getting in the way.</p>
      <PaperPlaneExchange />
    </header>
  );
}
