"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { articles } from "@/frontend/data/site-content";

gsap.registerPlugin(ScrollTrigger);

export function InsightsOverview() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".section-heading", { y: 30, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 84%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".article-row").forEach((row) => {
        const targets = [row.firstElementChild, row.querySelector(".article-category"), row.querySelector("h3"), row.querySelector("div > p:last-child"), row.querySelector(".article-date"), row.querySelector(".row-arrow")].filter(Boolean);
        gsap.from(targets, { y: 22, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
      gsap.fromTo(".article-list", { "--line-progress": "0%" }, {
        "--line-progress": "100%", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".article-list", start: "top 86%", once: true },
      });
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <section ref={ref} className="insights-section section-space">
      <div className="page-shell section-heading light-bg">
        <div><p className="eyebrow">Latest thinking</p><h2>Ideas for leaders<br />in motion.</h2></div>
        <Link className="text-link" href="/blog">All insights <span>↗</span></Link>
      </div>
      <div className="page-shell article-list">
        {articles.map((article, index) => (
          <article key={article.title} className="article-row">
            <span>0{index + 1}</span>
            <div><p className="article-category">{article.category}</p><h3>{article.title}</h3><p>{article.excerpt}</p></div>
            <div className="article-date">{article.date}<br />{article.read}</div><span className="row-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
