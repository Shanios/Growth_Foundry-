"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NewsletterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 82%", once: true } });
      timeline.from(".newsletter-premium .eyebrow", { y: 16, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".newsletter-premium h2", { y: 34, opacity: 0, duration: 0.95, ease: "power3.out" }, "-=0.55")
        .from(".newsletter-intro", { y: 24, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.55")
        .from(".newsletter-name-row input, .newsletter-email-control, .newsletter-consent-premium", {
          y: 16, opacity: 0, duration: 0.75, stagger: 0.09, ease: "power3.out",
        }, "-=0.3");
    });
    return () => mm.revert();
  }, { scope: ref });
  return <section ref={ref} className="page-shell section-space newsletter-section">{children}</section>;
}

export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
      timeline.from(".footer-lead .eyebrow", { y: 14, opacity: 0, duration: 0.75, ease: "power3.out" })
        .from(".footer-lead h2", { y: 36, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.35")
        .from(".footer-lead .circle-link", { scale: 0.92, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.6")
        .from(".footer-grid > *", { y: 24, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" }, "-=0.35")
        .from(".footer-meta", { opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.25");
    });
    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const circle = ref.current?.querySelector<HTMLElement>(".circle-link");
      if (!circle) return;
      const moveX = gsap.quickTo(circle, "x", { duration: 0.65, ease: "power3.out" });
      const moveY = gsap.quickTo(circle, "y", { duration: 0.65, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        const bounds = circle.getBoundingClientRect();
        moveX((event.clientX - bounds.left - bounds.width / 2) * 0.14);
        moveY((event.clientY - bounds.top - bounds.height / 2) * 0.14);
      };
      const onLeave = () => { moveX(0); moveY(0); };
      circle.addEventListener("pointermove", onMove);
      circle.addEventListener("pointerleave", onLeave);
      return () => {
        circle.removeEventListener("pointermove", onMove);
        circle.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => mm.revert();
  }, { scope: ref });
  return <footer ref={ref} className="site-footer">{children}</footer>;
}
