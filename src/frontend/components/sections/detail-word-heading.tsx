"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CharacterText } from "@/frontend/components/interactive/character-text";

export function DetailWordHeading({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".character-reveal__word", {
        x: -100,
        opacity: 0,
        duration: 0.85,
        stagger: 0.17,
        ease: "power3.out",
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return <h1 ref={ref} aria-label={title}><CharacterText>{title}</CharacterText></h1>;
}
