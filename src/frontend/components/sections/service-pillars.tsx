"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharacterText } from "@/frontend/components/interactive/character-text";
import { servicePillars } from "@/frontend/data/site-content";

gsap.registerPlugin(ScrollTrigger);

export function ServicePillars() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".service-pillar", ref.current).forEach((row) => {
        const characters = row.querySelectorAll(".service-pillar-name .character-reveal__character");
        gsap.from(characters, {
          y: 18,
          opacity: 0,
          duration: 0.42,
          stagger: 0.024,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className="service-pillar-list">
      {servicePillars.map((pillar, index) => (
        <article className={`service-pillar${activeRow === index ? " service-pillar--active" : ""}`} key={pillar.number}>
          <button
            type="button"
            className="service-pillar-hitbox"
            aria-label={`${pillar.label}: ${activeRow === index ? "deselect" : "select"} row`}
            aria-pressed={activeRow === index}
            onClick={() => setActiveRow(activeRow === index ? null : index)}
          />
          <span className="service-pillar-number">{pillar.number}</span>
          <div className="service-pillar-name">
            <span className="service-pillar-label">{pillar.label}</span>
            <h2 aria-label={pillar.title}><CharacterText>{pillar.title}</CharacterText></h2>
          </div>
          <div className="service-pillar-content">
            <p>{pillar.description}</p>
            <div className="service-pillar-capabilities">
              {pillar.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
