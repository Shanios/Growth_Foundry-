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
    const cards =
      gsap.utils.toArray<HTMLElement>(".result-card");

    gsap.fromTo(
      cards,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
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

    const counters =
      gsap.utils.toArray<HTMLElement>(".result-number");

    counters.forEach((element) => {
      const target = Number(
        element.dataset.value ?? 0
      );

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
        onUpdate: () => {
          element.textContent =
            Math.round(
              counter.value
            ).toString();
        },
      });
    });
  },
  {
    scope: sectionRef,
  }
);

  return (
    <section
      ref={sectionRef}
      className="results-section"
    >
      <div className="page-shell">
        <div className="results-heading">
          <p className="eyebrow">
            Results
          </p>

          <h2>
            Growth becomes visible
            <br />
            <em>when execution works.</em>
          </h2>
        </div>

        <div className="results-grid">
          {results.map((result, index) => (
            <article
              className="result-card"
              key={result.label}
            >
              <span className="result-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="result-value">
                {result.prefix && (
                  <span className="result-prefix">
                    {result.prefix}
                  </span>
                )}

                <span
                  className="result-number"
                  data-value={result.number}
                >
                  0
                </span>

                <span className="result-suffix">
                  {result.suffix}
                </span>
              </div>

              <p>{result.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}