import type { ArticlePreview, CaseStudyPreview, Service } from "../types/content";

export const services: Service[] = [
  
  { number: "01", title: "Growth Strategy", description: "Choose the markets, customers, and moves that create durable growth — backed by commercial evidence, not instinct alone.", capabilities: ["Market entry", "Portfolio choices", "Growth roadmaps"] },
  { number: "02", title: "Operating Model", description: "Turn strategy into a clear operating system with the roles, rhythms, governance, and measures needed to execute.", capabilities: ["Organisation design", "Decision systems", "Performance cadence"] },
  { number: "03", title: "Commercial Acceleration", description: "Strengthen the commercial engine across proposition, pricing, routes to market, and sales effectiveness.", capabilities: ["Proposition design", "Pricing", "Go-to-market"] },
  { number: "04", title: "Transformation Delivery", description: "Create momentum around the few initiatives that matter, with hands-on leadership from design through delivery.", capabilities: ["Transformation office", "Value tracking", "Change leadership"] },
];
export const servicePillars = [
  {
    number: "01",
    label: "Advisory",
    title: "Strategy & Operating Model",
    description:
      "Helping leadership teams make sharper choices about where to play, how to grow, and how the organisation needs to operate.",
    capabilities: [
      "Growth Strategy",
      "Operating Model",
    ],
  },
  {
    number: "02",
    label: "Execution",
    title: "Commercial Acceleration & Transformation",
    description:
      "Turning strategic choices into commercial momentum, stronger execution systems, and measurable delivery.",
    capabilities: [
      "Commercial Acceleration",
      "Transformation Delivery",
    ],
  },
];
export const caseStudies: CaseStudyPreview[] = [
  { slug: "industrial-growth-platform", sector: "Industrial services", title: "Building a repeatable growth platform across three markets", summary: "A sharper portfolio, redesigned commercial model, and 24-month execution roadmap for a regional services group.", result: "2.1× qualified pipeline", index: "01" },
  { slug: "consumer-margin-reset", sector: "Consumer", title: "Resetting margin without slowing customer growth", summary: "A pricing and proposition programme that protected demand while simplifying an overextended offer architecture.", result: "+480 bps margin", index: "02" },
  { slug: "saas-operating-model", sector: "Technology", title: "Designing the operating model for the next stage of scale", summary: "New decision rights, planning rhythms, and leadership routines for a founder-led software company.", result: "31% faster delivery", index: "03" },
];

export const articles: ArticlePreview[] = [
  {
    slug: "the-operating-choices-behind-repeatable-growth",
    category: "Growth systems",
    title: "The operating choices behind repeatable growth",
    excerpt:
      "Growth becomes more predictable when leadership choices, commercial routines, and resource allocation reinforce one another.",
    date: "18 Sep 2026",
    read: "6 min read",
  },
  {
    slug: "pricing-is-a-management-system-not-an-annual-event",
    category: "Commercial strategy",
    title: "Pricing is a management system, not an annual event",
    excerpt:
      "The strongest pricing organisations connect customer value, frontline judgement, and governance in one continuous loop.",
    date: "03 Sep 2026",
    read: "5 min read",
  },
  {
    slug: "why-transformation-offices-lose-momentum",
    category: "Transformation",
    title: "Why transformation offices lose momentum",
    excerpt:
      "More reporting rarely creates more control. A smaller set of outcomes, owners, and decisions usually does.",
    date: "21 Aug 2026",
    read: "7 min read",
  },
];
