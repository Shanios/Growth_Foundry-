"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { caseStudies } from "@/frontend/data/site-content";
import { CharacterText } from "@/frontend/components/interactive/character-text";

gsap.registerPlugin(ScrollTrigger);

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

export function CaseStudiesOverview() {
  const ref = useRef<HTMLElement>(null);
  const positionsRef = useRef(caseStudies.map((_, index) => index));
  const hasShuffledOnEntry = useRef(false);
  const [positions, setPositions] = useState(positionsRef.current);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const grid = ref.current?.querySelector(".case-grid");
    if (!grid) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.2), { threshold: 0.2 });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const shuffle = () => {
      const cards = Array.from(ref.current?.querySelectorAll<HTMLElement>(".case-card") ?? []);
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
    let timer: number | null = null;
    const firstSwap = !hasShuffledOnEntry.current
      ? window.setTimeout(() => {
          hasShuffledOnEntry.current = true;
          shuffle();
          timer = window.setInterval(shuffle, 2900);
        }, 1500)
      : null;
    if (hasShuffledOnEntry.current) timer = window.setInterval(shuffle, 2900);
    return () => {
      if (firstSwap !== null) window.clearTimeout(firstSwap);
      if (timer !== null) window.clearInterval(timer);
    };
  }, [visible]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".section-heading", { y: 40, opacity: 0, duration: 0.95, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
      gsap.from(".section-heading h2 .character-reveal__word", {
        x: -95, opacity: 0, duration: 0.75, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
        gsap.from(card, { y: 100, opacity: 0, duration: 1.15, delay: index * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
      gsap.fromTo(".case-grid", { "--line-progress": "0%" }, {
        "--line-progress": "100%", duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".case-grid", start: "top 86%", once: true },
      });
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <section ref={ref} className="page-shell section-space">
      <div className="section-heading light-bg">
        <div><p className="eyebrow">Selected outcomes</p><h2 aria-label="Work that moved the number."><CharacterText>Work that moved</CharacterText><br /><CharacterText>the number.</CharacterText></h2></div>
        <p>Representative engagements. Client details are withheld where confidentiality matters.</p>
      </div>
      <div className="case-grid">
        {caseStudies.map((item, index) => (
          <article className="case-card" key={item.slug} style={{ order: positions[index] }}>
            <div className="case-meta"><span>{item.index}</span><span>{item.sector}</span></div>
            <h3>{item.title}</h3><p>{item.summary}</p>
            <div className="case-result"><strong>{item.result}</strong><span>Engagement outcome</span></div>
          </article>
        ))}
      </div>
      <Link className="text-link spacious" href="/case-studies">View case studies <span>↗</span></Link>
    </section>
  );
}
