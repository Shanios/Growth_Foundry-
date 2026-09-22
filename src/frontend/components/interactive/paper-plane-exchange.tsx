"use client";

import { useEffect, useRef, useState } from "react";

function SketchPerson({ facing }: { facing: "left" | "right" }) {
  return (
    <svg className={`footer-plane-person footer-plane-person--${facing}`} viewBox="0 0 72 112" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 20c-4-4-3-12 2-15 7-4 15 0 16 7 1 5-2 9-5 11-5 3-10 1-13-3Z" />
        <path d="M30 10c4-8 14-8 19-2M27 34c6-5 16-5 22 0l3 35-29 1 4-36Z" />
        <path d="M27 38 15 55l-10 3M31 70l-4 36-13 2M44 70l7 36 13 2" />
        <path d="M5 58 2 55m3 3-2 4" />
        <g className="footer-plane-arm">
          <path d="M49 38 60 51l8-2" />
          <path d="m68 49 3-4m-3 4 3 2" />
        </g>
        <path d="M25 36c4 2 9 3 14 3M33 25c2 2 5 2 7 0" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

export function PaperPlaneExchange() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`footer-plane-scene${visible ? " footer-plane-scene--playing" : ""}`} style={{ color: "#fff", borderBottomColor: "rgba(255,255,255,.35)" }} aria-hidden="true">
      <SketchPerson facing="right" />
      <div className="footer-plane-flight">
        <svg className="footer-plane" viewBox="0 0 72 38" fill="none">
          <path d="M2 18 68 2 44 35 32 23 2 18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="m32 23 36-21-24 33" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M13 26H2m18 5H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <SketchPerson facing="left" />
    </div>
  );
}
