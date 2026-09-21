import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PublicPage } from "@/frontend/components/layout/public-page";
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

  const caseStudy = await prisma.caseStudy.findFirst({
    where: {
      slug,
      published: true,
    },
    select: {
      title: true,
      body: true,
    },
  });

  if (!caseStudy) {
    return {
      title: "Case Study | Growth Foundry",
    };
  }

  return {
    title: `${caseStudy.title} | Growth Foundry`,
    description:
      caseStudy.body.length > 155
        ? `${caseStudy.body.slice(0, 155)}…`
        : caseStudy.body,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const caseStudy = await prisma.caseStudy.findFirst({
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

  if (!caseStudy) {
    notFound();
  }

  const paragraphs = caseStudy.body
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
            {caseStudy.sector || "Selected work"}
          </p>

          <h1>{caseStudy.title}</h1>
        </div>

        {caseStudy.featuredImage && (
          <div className="case-detail-image">
            <Image
              src={caseStudy.featuredImage}
              alt={caseStudy.title}
              fill
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="case-detail-content">
          <aside>
            <span>Outcome</span>

            <strong>
              {caseStudy.outcome ||
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
      </main>
    </PublicPage>
  );
}