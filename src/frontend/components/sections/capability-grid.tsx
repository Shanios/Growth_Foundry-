"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { services } from "@/frontend/data/site-content";

function nextPositions(current: number[]) {
  let next: number[];
  do {
    next = current.slice();
    for (let index = next.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
    }
  } while (next.some((position, index) => position === current[index]));
  return next;
}

export function CapabilityGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef(services.map((_, index) => index));
  const hasShuffledOnEntry = useRef(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [positions, setPositions] = useState(positionsRef.current);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.15), { threshold: 0.15 });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || activeCard !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const shuffle = () => {
      const cards = Array.from(gridRef.current?.querySelectorAll<HTMLElement>(".capability-card") ?? []);
      const before = cards.map((card) => card.getBoundingClientRect());
      const next = nextPositions(positionsRef.current);
      positionsRef.current = next;
      flushSync(() => setPositions(next));
      cards.forEach((card, index) => {
        const after = card.getBoundingClientRect();
        card.animate(
          [
            { transform: `translate(${before[index].left - after.left}px, ${before[index].top - after.top}px)` },
            { transform: "translate(0, 0)" },
          ],
          { duration: 850, easing: "cubic-bezier(.16, 1, .3, 1)" },
        );
      });
    };
    const firstSwap = !hasShuffledOnEntry.current
      ? window.setTimeout(() => {
          hasShuffledOnEntry.current = true;
          shuffle();
        }, 400)
      : null;
    const timer = window.setInterval(shuffle, 2600);
    return () => {
      if (firstSwap !== null) window.clearTimeout(firstSwap);
      window.clearInterval(timer);
    };
  }, [activeCard, visible]);

  return (
    <div ref={gridRef} className="capability-grid">
      {services.map((service, index) => (
        <article
          className={`capability-card${activeCard === index ? " capability-card--active" : ""}`}
          key={service.number}
          style={{ order: positions[index] }}
        >
          <button
            type="button"
            className="capability-card-hitbox"
            aria-label={`${service.title}: ${activeCard === index ? "collapse" : "highlight"} tile`}
            aria-pressed={activeCard === index}
            onClick={() => setActiveCard(activeCard === index ? null : index)}
          />
          <span className="number">{service.number}</span>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <ul>
            {service.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
