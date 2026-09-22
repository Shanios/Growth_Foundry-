"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CapabilitiesHeading() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stage = ref.current;
        if (!stage) return;
        const distance = () => Math.min(window.innerWidth * 0.35, 450);

        gsap.fromTo(
          ".capabilities-line--first",
          { x: () => -distance() },
          {
            x: 0,
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

        gsap.fromTo(
          ".capabilities-line--second",
          { x: distance },
          {
            x: 0,
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
        gsap.set([".capabilities-line--first", ".capabilities-line--second"], { x: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="capabilities-heading-wrap">
      <div className="capabilities-heading">
        <p className="eyebrow">Capabilities</p>
        <h2>
          <span className="capabilities-line capabilities-line--first">Four levers.</span>
          <em className="capabilities-line capabilities-line--second">One growth system.</em>
        </h2>
      </div>
    </div>
  );
}

