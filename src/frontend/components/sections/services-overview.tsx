"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { services } from "@/frontend/data/site-content";

gsap.registerPlugin(ScrollTrigger);

export function ServicesOverview() {
  const ref = useRef<HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            once: true,
          },
        });

        // Eyebrow reveal
        tl.from(".services-eyebrow", {
          x: -35,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
          // Heading comes word-by-word from the left
          .from(
            ".services-heading-word",
            {
              x: -60,
              opacity: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.3"
          )
          // Intro description reveal
          .from(
            ".services-intro-copy",
            {
              x: -30,
              opacity: 0,
              duration: 0.75,
              ease: "power3.out",
            },
            "-=0.35"
          );

        // Service rows sequential reveal
        gsap.utils.toArray<HTMLElement>(".service-row").forEach((row, index) => {
          gsap.from(row, {
            y: 50,
            opacity: 0,
            duration: 0.85,
            delay: Math.min(index * 0.08, 0.25),
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              once: true,
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".services-eyebrow", ".services-heading-word", ".services-intro-copy", ".service-row"], {
          x: 0,
          y: 0,
          opacity: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="services-section section-space">
      <div className="page-shell section-heading">
        <div>
          <p className="eyebrow light services-eyebrow">Our work</p>
          <h2 className="services-heading" aria-label="Four levers. One growth system.">
            <span className="services-heading-line">
              <span className="services-heading-word">Four</span>{" "}
              <span className="services-heading-word">levers.</span>
            </span>
            <br />
            <span className="services-heading-line">
              <span className="services-heading-word">One</span>{" "}
              <span className="services-heading-word">growth</span>{" "}
              <span className="services-heading-word">system.</span>
            </span>
          </h2>
        </div>
        <p className="services-intro-copy">
          Focused advisory and hands-on delivery for leadership teams navigating a critical stage of growth.
        </p>
      </div>

      <div className="service-list">
        {services.map((service, index) => (
          <article
            key={service.number}
            className={`service-row page-shell${activeRow === index ? " service-row--active" : ""}`}
          >
            <button
              type="button"
              className="service-row-hitbox"
              aria-label={`${service.title}: ${activeRow === index ? "collapse" : "highlight"} row`}
              aria-pressed={activeRow === index}
              onClick={() => setActiveRow(activeRow === index ? null : index)}
            />
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="row-arrow">↗</span>
          </article>
        ))}
      </div>

      <div className="page-shell section-action">
        <Link className="button-light" href="/services">
          See all capabilities
        </Link>
      </div>
    </section>
  );
}

