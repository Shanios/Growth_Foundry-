"use client";

import {
  type ReactNode,
  useRef,
} from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudiesReveal({
  children,
}: {
  children: ReactNode;
}) {
  const sectionRef =
    useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".case-study-reveal-item").forEach((card) => {
          gsap.fromTo(card, { y: 32, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.95, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
          const image = card.querySelector<HTMLElement>(".case-study-media");
          if (image) {
            gsap.fromTo(image, { y: 110, opacity: 0 }, {
              y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 78%", once: true },
            });
          }
        });
      });
      return () => mm.revert();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="page-shell case-studies-list-section"
    >
      {children}
    </section>
  );
}
