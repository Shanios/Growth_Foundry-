"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactVisual() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 85%",
              once: true,
            },
          });

          tl.fromTo(
            ".contact-visual-mask",
            {
              scaleY: 1,
              transformOrigin: "top",
            },
            {
              scaleY: 0,
              duration: 1.15,
              ease: "power3.inOut",
            }
          );

          tl.fromTo(
            ".contact-visual-image",
            {
              y: 70,
              scale: 0.96,
              opacity: 0.35,
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.9"
          );
        }
      );

      return () => mm.revert();
    },
    {
      scope: wrapperRef,
    }
  );

  return (
    <div
      ref={wrapperRef}
      className="contact-visual"
    >
      <div className="contact-visual-inner">
        <Image
          src="/contact-illustration.png"
          alt="Contact Growth Foundry"
          fill
          priority={false}
          sizes="(max-width: 900px) 100vw, 45vw"
          className="contact-visual-image"
        />

        <div
          className="contact-visual-mask"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}