"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
  hoverZoom?: boolean;
  intensity?: "subtle" | "standard" | "feature";
  delay?: number;
  rise?: number;
};

const motion = {
  subtle: { rise: 24, scale: 0.985, travel: 8, duration: 0.8 },
  standard: { rise: 36, scale: 0.975, travel: 12, duration: 0.95 },
  feature: { rise: 48, scale: 0.96, travel: 18, duration: 1.2 },
};

export function ImageReveal({
  children,
  className = "",
  parallax = false,
  hoverZoom = false,
  intensity = "standard",
  delay = 0,
  rise,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const settings = motion[intensity];

  useGSAP(() => {
    const root = ref.current;
    if (!root) return;
    const media = root.querySelector<HTMLElement>(".image-reveal__media");
    if (!media) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root,
        { y: rise ?? settings.rise, opacity: 0, scale: settings.scale },
        { y: 0, opacity: 1, scale: 1, duration: settings.duration, delay,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        });

      if (parallax) {
        gsap.fromTo(media,
          { y: -settings.travel },
          { y: settings.travel, ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
      }
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [parallax, intensity, delay, rise] });

  return (
    <div ref={ref} className={`image-reveal ${hoverZoom ? "image-reveal--hover" : ""} ${parallax ? "image-reveal--parallax" : ""} ${className}`}>
      <div className="image-reveal__media">{children}</div>
    </div>
  );
}
