"use client";

import {
  type ReactNode,
  useRef,
} from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
};

export function ScrollReveal({
  children,
  className = "",
  y = 60,
  delay = 0,
  stagger = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets =
        ref.current?.querySelectorAll(
          "[data-reveal]"
        );

      if (!targets?.length) return;

      gsap.fromTo(
        targets,
        {
          y,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 1,
          delay,
          stagger,

          ease: "power3.out",

          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    {
      scope: ref,
    }
  );

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}