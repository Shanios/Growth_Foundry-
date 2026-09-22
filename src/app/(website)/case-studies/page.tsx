import type { Metadata } from "next";

import Image from "next/image";
import { ImageReveal } from "@/frontend/components/interactive/image-reveal";
import Link from "next/link";
import { CaseStudiesHero } from "@/frontend/components/sections/case-studies-hero";
import { CaseStudiesReveal } from "@/frontend/components/sections/case-studies-reveal";
import { PublicPage } from "@/frontend/components/layout/public-page";
import { caseStudies as fallbackCaseStudies } from "@/frontend/data/site-content";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected Growth Foundry engagements and measurable business outcomes.",
};

export const revalidate = 300;

function excerpt(text: string, length = 190) {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trim()}…`;
}

export default async function CaseStudiesPage() {
  let items = fallbackCaseStudies;

  try {
    const rows = await prisma.caseStudy.findMany({
      where: {
        published: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        slug: true,
        title: true,
        body: true,
        sector: true,
        outcome: true,
        featuredImage: true,
      },
    });

    if (rows.length) {
      items = rows.map((row, index) => ({
        slug: row.slug || String(row.id),

        sector: row.sector,

        title: row.title,

        summary: excerpt(row.body),

        result:
          row.outcome ||
          "Completed engagement",

        index: String(index + 1).padStart(
          2,
          "0"
        ),

        image: row.featuredImage,
      }));
    }
  } catch (error) {
    console.error(
      "Published case studies unavailable",
      error
    );
  }

  return (
    <PublicPage>

      {/* Page intro */}
<CaseStudiesHero />

      {/* Case study cards */}
<CaseStudiesReveal>
  <div className="case-study-card-grid">

    {items.map((item) => (
      <article
        className="case-study-feature-card case-study-reveal-item"
        key={item.slug}
      >

        <Link
          href={`/case-studies/${item.slug}`}
          className="case-study-media"
          aria-label={`View ${item.title}`}
        >

          <ImageReveal className="image-reveal--fill" parallax hoverZoom intensity="subtle">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="
                (max-width: 900px) 100vw,
                50vw
              "
              className="case-study-image"
            />
          ) : (
            <div className="case-study-image-placeholder">
              <span>GF</span>
            </div>
          )}
          </ImageReveal>

        </Link>


        <div className="case-study-card-content">

          <div className="case-study-card-meta">
            <span>
              {item.index}
            </span>

            <span>
              {item.sector}
            </span>
          </div>


          <Link
            href={`/case-studies/${item.slug}`}
            className="case-study-title-link"
          >
            <h2>
              {item.title}
            </h2>
          </Link>


          <p className="case-study-summary">
            {item.summary}
          </p>


          <div className="case-study-card-bottom">

            <div className="case-study-outcome">
              <strong>
                {item.result}
              </strong>

              <span>
                Engagement outcome
              </span>
            </div>


            <Link
              href={`/case-studies/${item.slug}`}
              className="case-study-link"
            >
              View case study

              <span aria-hidden="true">
                ↗
              </span>
            </Link>

          </div>

        </div>

      </article>
    ))}

  </div>
</CaseStudiesReveal>
    </PublicPage>
  );
}
