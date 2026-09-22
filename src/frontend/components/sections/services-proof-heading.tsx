"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ServicesProofHeading() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stage = ref.current;
        if (!stage) return;
        const distance = () => Math.min(window.innerWidth * 0.35, 450);

        gsap.fromTo(
          ".services-proof-heading",
          { x: () => -distance(), opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 90%",
              end: "bottom 65%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".services-proof-heading", { x: 0, opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="services-proof-heading-wrap">
      <div className="services-proof-heading">
        <div>
          <p className="eyebrow">Selected outcomes</p>
          <h2 id="services-proof-title">What the work can move.</h2>
        </div>
        <p>Three examples of strategy turned into measurable progress.</p>
      </div>
    </div>
  );
}

