"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactPanelReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const info = ref.current?.querySelector<HTMLElement>(".contact-info-panel");
      const form = ref.current?.querySelector<HTMLElement>(".contact-form-panel");
      if (!info || !form) return;

      gsap.from([info, form], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 86%",
          once: true,
        },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return <div ref={ref} className="contact-panel-reveal">{children}</div>;
}
