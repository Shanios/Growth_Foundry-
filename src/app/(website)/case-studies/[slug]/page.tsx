import type { Metadata } from "next";
import Image from "next/image";
import { ImageReveal } from "@/frontend/components/interactive/image-reveal";
import { DetailWordHeading } from "@/frontend/components/sections/detail-word-heading";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PublicPage } from "@/frontend/components/layout/public-page";
import { caseStudies as fallbackCaseStudies } from "@/frontend/data/site-content";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  let caseStudy = null;
  try {
    caseStudy = await prisma.caseStudy.findFirst({
      where: {
        slug,
        published: true,
      },
      select: {
        title: true,
        body: true,
      },
    });
  } catch {
    // database offline fallback
  }

  const fallback = fallbackCaseStudies.find((item) => item.slug === slug);

  const title = caseStudy?.title ?? fallback?.title;
  const description = caseStudy?.body ?? fallback?.summary;

  if (!title) {
    return {
      title: "Case Study | Growth Foundry",
    };
  }

  return {
    title: `${title} | Growth Foundry`,
    description:
      description && description.length > 155
        ? `${description.slice(0, 155)}…`
        : description,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  let caseStudy: {
    id: number | string;
    title: string;
    body: string;
    sector: string;
    outcome?: string | null;
    featuredImage?: string | null;
  } | null = null;

  try {
    caseStudy = await prisma.caseStudy.findFirst({
      where: {
        slug,
        published: true,
      },
      select: {
        id: true,
        title: true,
        body: true,
        sector: true,
        outcome: true,
        featuredImage: true,
      },
    });
  } catch (error) {
    console.error("Case study unavailable from database, using fallback", error);
  }

  const fallback = fallbackCaseStudies.find((item) => item.slug === slug);

  if (!caseStudy && !fallback) {
    notFound();
  }

  const activeStudy = caseStudy ?? {
    id: fallback!.slug,
    title: fallback!.title,
    body: fallback!.summary,
    sector: fallback!.sector,
    outcome: fallback!.result,
    featuredImage: fallback!.image ?? null,
  };

  let publishedCaseStudies: { id: number | string; slug: string; title: string }[] = [];
  try {
    publishedCaseStudies = await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { id: true, slug: true, title: true },
    });
  } catch {
    publishedCaseStudies = fallbackCaseStudies.map((item) => ({
      id: item.slug,
      slug: item.slug,
      title: item.title,
    }));
  }

  const currentIndex = publishedCaseStudies.findIndex(
    (item) => String(item.id) === String(activeStudy.id) || item.slug === slug
  );
  const nextCaseStudy =
    publishedCaseStudies.length > 1 && currentIndex >= 0
      ? publishedCaseStudies[(currentIndex + 1) % publishedCaseStudies.length]
      : null;

  const paragraphs = (activeStudy.body || "")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <PublicPage>
      <main className="page-shell case-detail">
        <div className="case-detail-top">
          <Link
            href="/case-studies"
            className="text-link"
          >
            ← Back to case studies
          </Link>

          <p className="eyebrow">
            {activeStudy.sector || "Selected work"}
          </p>

          <DetailWordHeading title={activeStudy.title} />
        </div>

        {activeStudy.featuredImage && (
          <ImageReveal className="case-detail-image" parallax hoverZoom intensity="feature" rise={130}>
            <Image
              src={activeStudy.featuredImage}
              alt={activeStudy.title}
              fill
              priority
              sizes="100vw"
            />
          </ImageReveal>
        )}

        <div className="case-detail-content">
          <aside>
            <span>Outcome</span>

            <strong>
              {activeStudy.outcome ||
                "Measurable business momentum"}
            </strong>
          </aside>

          <article className="case-detail-body">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </article>
        </div>

        {nextCaseStudy && (
          <nav className="case-detail-next" aria-label="Next case study">
            <Link href={`/case-studies/${nextCaseStudy.slug}`}>
              <span className="case-detail-next-copy">
                <span className="case-detail-next-label">Read next · Case study</span>
                <strong>{nextCaseStudy.title}</strong>
              </span>
              <span className="case-detail-next-arrow" aria-hidden="true">→</span>
            </Link>
          </nav>
        )}
      </main>
    </PublicPage>
  );
}
