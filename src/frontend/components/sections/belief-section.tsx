"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const beliefCards = [
  {
    label: "Clarity",
    title: "Sharper choices",
    content: "Growth gets easier when leadership has a shared view of where to play, what to prioritise, and which trade-offs matter most.",
  },
  {
    label: "Execution",
    title: "Operating momentum",
    content: "Strategy becomes useful when ownership, decision rights, commercial rhythms, and performance systems reinforce the same priorities.",
  },
  {
    label: "Transformation",
    title: "Change that sticks",
    content: "Transformation should create visible operating progress, beyond another layer of programmes, meetings, and reporting.",
  },
] as const;

function CardGraphic({ index }: { index: number }) {
  if (index === 0) {
    // Cobalt Blue - Abstract network contours & nodes
    return (
      <svg className="belief-card-graphic" viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M-30 80 Q140 10 240 120 T530 90" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <path d="M-10 180 Q180 190 280 100 T540 220" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M120 -20 Q160 160 220 340" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <circle cx="180" cy="140" r="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="390" cy="60" r="95" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <path d="M380 -10 Q390 180 340 330" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 1) {
    // Vivid Orange - Organic contours & pill shapes
    return (
      <svg className="belief-card-graphic" viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M-40 40 Q200 -30 340 110 T540 170" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
        <path d="M100 340 Q240 170 450 280" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
        <path d="M180 -30 C180 80 110 190 70 350" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M220 70 C330 30 470 60 450 180 C430 270 270 250 220 180 Z" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
        <circle cx="430" cy="240" r="50" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
      </svg>
    );
  }
  // Deep Purple - Concentric arcs & geometry
  return (
    <svg className="belief-card-graphic" viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="250" cy="160" r="75" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
      <circle cx="280" cy="130" r="145" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <circle cx="160" cy="220" r="115" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
      <path d="M-30 120 L530 120" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
      <path d="M110 -20 L390 340" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    </svg>
  );
}

function AnimatedWords({ text }: { text: string }) {
  return text.split(" ").map((word, wordIndex) => (
    <span key={`${word}-${wordIndex}`}>
      {wordIndex > 0 && " "}
      <span className="manifesto-word">
        {Array.from(word).map((character, characterIndex) => (
          <span className="manifesto-character" key={characterIndex}>{character}</span>
        ))}
      </span>
    </span>
  ));
}

export function BeliefSection() {
  const ref = useRef<HTMLElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const manifestoNoteRef = useRef<HTMLDivElement | null>(null);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const activeCardRef = useRef<number | null>(null);
  activeCardRef.current = activeCard;

  const panelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bodiesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const indicatorsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const animationsRef = useRef<gsap.core.Timeline[]>([]);
  const initializedRef = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ========================================
      // DESKTOP: PINNED SEQUENTIAL CARD STORY
      // ========================================
      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
          const manifestoNote = manifestoNoteRef.current;
          if (layers.length < 3) return;

          // Initial positions with slightly increased vertical travel distance (110px)
          gsap.set(layers[0], { y: 110, opacity: 0, scale: 0.97, pointerEvents: "none" });
          gsap.set(layers[1], { y: 110, opacity: 0, scale: 0.97, pointerEvents: "none" });
          gsap.set(layers[2], { y: 110, opacity: 0, scale: 0.97, pointerEvents: "none" });
          if (manifestoNote) {
            gsap.set(manifestoNote, { y: 35, opacity: 0 });
          }

          const updateActiveLayer = (time: number) => {
            // Auto-collapse any open card when it starts to disappear/exit
            if (activeCardRef.current === 0 && time >= 1.75) {
              setActiveCard(null);
            } else if (activeCardRef.current === 1 && (time >= 3.45 || time < 1.75)) {
              setActiveCard(null);
            } else if (activeCardRef.current === 2 && time < 3.45) {
              setActiveCard(null);
            }

            if (time < 1.9) {
              layers[0].style.pointerEvents = "auto";
              layers[0].style.zIndex = "10";
              layers[1].style.pointerEvents = "none";
              layers[1].style.zIndex = "1";
              layers[2].style.pointerEvents = "none";
              layers[2].style.zIndex = "1";
            } else if (time < 3.6) {
              layers[0].style.pointerEvents = "none";
              layers[0].style.zIndex = "1";
              layers[1].style.pointerEvents = "auto";
              layers[1].style.zIndex = "10";
              layers[2].style.pointerEvents = "none";
              layers[2].style.zIndex = "1";
            } else {
              layers[0].style.pointerEvents = "none";
              layers[0].style.zIndex = "1";
              layers[1].style.pointerEvents = "none";
              layers[1].style.zIndex = "1";
              layers[2].style.pointerEvents = "auto";
              layers[2].style.zIndex = "10";
            }
          };

          // Set initial active state for Card 01 so it is clickable immediately
          updateActiveLayer(0);

          const storyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              pin: true,
              scrub: 0.9,
              start: "top top",
              end: "+=2250",
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
            onUpdate: function () {
              updateActiveLayer(this.time());
            },
          });

          // 1. Statement Reveal
          storyTimeline
            .from(
              ".manifesto-line:not(.offset) .manifesto-word",
              {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.025,
                ease: "power2.out",
              },
              0
            )
            .from(
              ".manifesto-line.offset .manifesto-word",
              {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.025,
                ease: "power2.out",
              },
              0.18
            )

            // 2. CARD 01 (Left - Blue) Entrance
            .to(
              layers[0],
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power1.out",
              },
              0.4
            )

            // 3. CARD 01 Exit -> CARD 02 (Right - Orange) Entrance (Smooth continuous handoff)
            .to(
              layers[0],
              {
                y: -110,
                opacity: 0,
                scale: 0.98,
                duration: 1.2,
                ease: "power1.in",
              },
              1.9
            )
            .to(
              layers[1],
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power1.out",
              },
              2.1
            )

            // 4. CARD 02 Exit -> CARD 03 (Center - Purple) Entrance (Smooth continuous handoff)
            .to(
              layers[1],
              {
                y: -110,
                opacity: 0,
                scale: 0.98,
                duration: 1.2,
                ease: "power1.in",
              },
              3.6
            )
            .to(
              layers[2],
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power1.out",
              },
              3.8
            )

            // 5. CARD 03 Holds & Manifesto Note Enters
            .to(
              manifestoNote,
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power1.out",
              },
              4.8
            )
            .to({}, { duration: 0.9 }, 5.5);
        }
      );

      // ========================================
      // MOBILE & TABLET (<= 900px): VERTICAL STACK
      // ========================================
      mm.add(
        "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
          const manifestoNote = manifestoNoteRef.current;

          // Statement reveal
          const intro = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              once: true,
            },
          });

          intro
            .from(
              ".manifesto-line:not(.offset) .manifesto-word",
              {
                y: 35,
                opacity: 0,
                duration: 0.65,
                stagger: 0.03,
                ease: "power3.out",
              }
            )
            .from(
              ".manifesto-line.offset .manifesto-word",
              {
                y: 35,
                opacity: 0,
                duration: 0.65,
                stagger: 0.03,
                ease: "power3.out",
              },
              "-=0.35"
            );

          // Card vertical scroll reveal
          layers.forEach((layer) => {
            gsap.from(layer, {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: layer,
                start: "top 88%",
                once: true,
              },
            });
          });

          if (manifestoNote) {
            gsap.from(manifestoNote, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: manifestoNote,
                start: "top 90%",
                once: true,
              },
            });
          }
        }
      );

      // ========================================
      // REDUCED MOTION FALLBACK
      // ========================================
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
        const manifestoNote = manifestoNoteRef.current;

        layers.forEach((layer) => {
          gsap.set(layer, { y: 0, opacity: 1, scale: 1, pointerEvents: "auto" });
        });
        if (manifestoNote) {
          gsap.set(manifestoNote, { y: 0, opacity: 1 });
        }
      });

      return () => mm.revert();
    },
    {
      scope: ref,
    }
  );

  // Accordion click-to-expand interaction
  useEffect(() => {
    animationsRef.current.forEach((animation) => animation.kill());
    animationsRef.current = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    beliefCards.forEach((_, index) => {
      const panel = panelsRef.current[index];
      const body = bodiesRef.current[index];
      const indicator = indicatorsRef.current[index];
      if (!panel || !body || !indicator) return;
      const open = activeCard === index;

      if (!initializedRef.current || reducedMotion) {
        gsap.set(panel, { height: open ? "auto" : 0, visibility: open ? "visible" : "hidden" });
        gsap.set(body, { opacity: open ? 1 : 0, y: reducedMotion || open ? 0 : 15 });
        gsap.set(indicator, { rotation: open ? 45 : 0 });
        return;
      }

      if (open) {
        gsap.set(panel, { visibility: "visible" });
        const timeline = gsap.timeline();
        timeline
          .to(panel, { height: "auto", duration: 0.5, ease: "power3.inOut" }, 0)
          .to(body, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.1)
          .to(indicator, { rotation: 45, duration: 0.35, ease: "power3.inOut" }, 0);
        animationsRef.current.push(timeline);
      } else if (panel.getBoundingClientRect().height > 0) {
        const timeline = gsap.timeline();
        timeline
          .to(body, { opacity: 0, y: 10, duration: 0.18, ease: "power2.in" }, 0)
          .to(panel, { height: 0, duration: 0.4, ease: "power3.inOut" }, 0.05)
          .to(indicator, { rotation: 0, duration: 0.3, ease: "power3.inOut" }, 0)
          .set(panel, { visibility: "hidden" });
        animationsRef.current.push(timeline);
      }
    });

    initializedRef.current = true;
    return () => animationsRef.current.forEach((animation) => animation.kill());
  }, [activeCard]);

  return (
    <section ref={ref} className="manifesto page-shell section-space" aria-label="What we believe">
      <div className="belief-story-copy">
        <p className="eyebrow">What we believe</p>
        <p className="manifesto-line" aria-label="Strategy matters when it changes">
          <span aria-hidden="true">
            <AnimatedWords text="Strategy matters when it changes" />
          </span>
        </p>
        <p className="manifesto-line offset" aria-label="what an organisation does next.">
          <span aria-hidden="true">
            <AnimatedWords text="what an organisation" /> <em><AnimatedWords text="does next." /></em>
          </span>
        </p>
      </div>

      <div className="belief-card-stage" aria-label="Our approach">
        {beliefCards.map((card, index) => {
          const open = activeCard === index;
          return (
            <div
              className="belief-card-scroll-layer"
              key={card.label}
              ref={(node) => {
                layersRef.current[index] = node;
              }}
            >
              <article className={`belief-card${open ? " is-open" : ""}`}>
                <CardGraphic index={index} />
                <button
                  type="button"
                  className="belief-card-trigger"
                  aria-label={`${card.label}: ${card.title}`}
                  aria-expanded={open}
                  aria-controls={`belief-card-content-${index}`}
                  onClick={() => setActiveCard(open ? null : index)}
                >
                  <span className="belief-card-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{card.label}</span>
                  </span>
                  <span className="belief-card-bottom">
                    <span className="belief-card-title">{card.title}</span>
                    <span
                      className="belief-card-indicator"
                      ref={(node) => {
                        indicatorsRef.current[index] = node;
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </span>
                  <span
                    className="belief-card-content"
                    id={`belief-card-content-${index}`}
                    aria-hidden={!open}
                    ref={(node) => {
                      panelsRef.current[index] = node;
                    }}
                  >
                    <span
                      ref={(node) => {
                        bodiesRef.current[index] = node;
                      }}
                    >
                      {card.content}
                    </span>
                  </span>
                </button>
              </article>
            </div>
          );
        })}
      </div>

      <div className="manifesto-note" ref={manifestoNoteRef}>
        <span>GF / 01</span>
        <p>
          We work at the point where direction, organisation, and delivery meet — so good thinking survives contact with the real world.
        </p>
      </div>
    </section>
  );
}


