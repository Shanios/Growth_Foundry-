"use client";

import { useEffect, useRef } from "react";

const CELL = 80;
const LIFE = 650;

type LitCell = { x: number; y: number; born: number };

export function HeroGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !section || !context) return;

    const cells = new Map<string, LitCell>();
    let frame = 0;
    let width = 0;
    let height = 0;
    let lastPoint: { x: number; y: number } | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const light = (x: number, y: number, now: number) => {
      const column = Math.floor(x / CELL);
      const row = Math.floor(y / CELL);
      if (column < 0 || row < 0 || column * CELL >= width || row * CELL >= height) return;
      cells.set(`${column}:${row}`, { x: column * CELL, y: row * CELL, born: now });
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      for (const [key, cell] of cells) {
        const age = (now - cell.born) / LIFE;
        if (age >= 1) {
          cells.delete(key);
          continue;
        }
        context.fillStyle = `rgba(255, 255, 255, ${0.88 * (1 - age) ** 2})`;
        context.fillRect(cell.x + 1, cell.y + 1, CELL - 2, CELL - 2);
      }
      frame = cells.size ? requestAnimationFrame(draw) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x >= width || y >= height) {
        lastPoint = null;
        return;
      }
      const now = performance.now();
      const steps = lastPoint
        ? Math.min(80, Math.ceil(Math.hypot(x - lastPoint.x, y - lastPoint.y) / (CELL * 0.35)))
        : 1;
      for (let step = 0; step <= steps; step++) {
        const progress = step / steps;
        light(
          lastPoint ? lastPoint.x + (x - lastPoint.x) * progress : x,
          lastPoint ? lastPoint.y + (y - lastPoint.y) * progress : y,
          now - (steps - step) * 8,
        );
      }
      lastPoint = { x, y };
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height * 0.7, 1)));
      section.style.setProperty("--hero-pattern-opacity", String(1 - progress));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    onScroll();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      section.style.removeProperty("--hero-pattern-opacity");
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-grid-background" aria-hidden="true" />;
}
