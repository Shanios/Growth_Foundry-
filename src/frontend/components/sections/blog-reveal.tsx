"use client";

import {
  type ReactNode,
  useRef,
} from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BlogReveal({
  children,
}: {
  children: ReactNode;
}) {
  const sectionRef =
    useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".blog-reveal-item",
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="page-shell blog-list-section"
    >
      {children}
    </section>
  );
}