"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    number: 80,
    suffix: "%",
    label: "Faster alignment on growth priorities",
  },
  {
    number: 95,
    suffix: "%",
    label: "Clarity across commercial execution",
  },
  {
    number: 90,
    suffix: "%",
    label: "Less time lost to fragmented decision-making",
  },
  {
    number: 70,
    prefix: "Up to ",
    suffix: "%",
    label: "Reduction in execution friction",
  },
];

export function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading words coming sequentially from the left on scroll
        const headingTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".results-heading",
            start: "top 80%",
            once: true,
          },
        });

        headingTl
          .from(".results-eyebrow", {
            x: -35,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          })
          .from(
            ".results-heading-word",
            {
              x: -60,
              opacity: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.3"
          );

        const cards = gsap.utils.toArray<HTMLElement>(".result-card");

        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.98,
            "--separator-progress": 0,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            "--separator-progress": 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".results-grid",
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".results-grid",
          {
            "--divider-progress": "0%",
          },
          {
            "--divider-progress": "100%",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".results-grid",
              start: "top 85%",
              once: true,
            },
          }
        );

        const counters = gsap.utils.toArray<HTMLElement>(".result-number");

        counters.forEach((element) => {
          const target = Number(element.dataset.value ?? 0);

          const counter = {
            value: 0,
          };

          gsap.to(counter, {
            value: target,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
            onStart: () => {
              element.textContent = "0";
            },
            onUpdate: () => {
              element.textContent = Math.round(counter.value).toString();
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".results-eyebrow", ".results-heading-word", ".result-card"], {
          x: 0,
          y: 0,
          opacity: 1,
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section ref={sectionRef} className="results-section">
      <div className="page-shell">
        <div className="results-heading">
          <p className="eyebrow results-eyebrow">Results</p>

          <h2 className="results-heading-title" aria-label="Growth becomes visible when execution works.">
            <span className="results-heading-line">
              <span className="results-heading-word">Growth</span>{" "}
              <span className="results-heading-word">becomes</span>{" "}
              <span className="results-heading-word">visible</span>
            </span>
            <br />
            <span className="results-heading-line">
              <em>
                <span className="results-heading-word">when</span>{" "}
                <span className="results-heading-word">execution</span>{" "}
                <span className="results-heading-word">works.</span>
              </em>
            </span>
          </h2>
        </div>

        <div className="results-grid">
          {results.map((result, index) => (
            <article className="result-card" key={result.label} tabIndex={0}>
              <span className="result-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="result-value">
                {result.prefix && (
                  <span className="result-prefix">{result.prefix}</span>
                )}

                <span className="result-number" data-value={result.number}>
                  {result.number}
                </span>

                <span className="result-suffix">{result.suffix}</span>
              </div>

              <p>{result.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
