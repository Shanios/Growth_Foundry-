import Image from "next/image";
import { ImageReveal } from "@/frontend/components/interactive/image-reveal";
import { DetailWordHeading } from "@/frontend/components/sections/detail-word-heading";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PublicPage } from "@/frontend/components/layout/public-page";
import { articles as fallbackArticles } from "@/frontend/data/site-content";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  let article = null;

  try {
    article = await prisma.blogPost.findFirst({
      where: {
        slug,
        published: true,
      },
    });
  } catch (error) {
    console.error(
      "Blog article unavailable",
      error
    );
  }

  const fallback =
    fallbackArticles.find(
      (item) => item.slug === slug
    );

  if (!article && !fallback) {
    notFound();
  }

  const title =
    article?.title ??
    fallback?.title ??
    "";

  const category =
    article?.author ??
    fallback?.category ??
    "Growth Foundry";

  const body =
    article?.body ??
    fallback?.excerpt ??
    "";

  const coverImage =
    article?.coverImage ?? null;

  const date = article?.publishedAt
    ? article.publishedAt.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : fallback?.date ?? "";

  const paragraphs = body
    .split(/\n+/)
    .map((paragraph) =>
      paragraph.trim()
    )
    .filter(Boolean);

  let nextArticle: { slug: string; title: string } | null = null;
  try {
    const entries = article
      ? await prisma.blogPost.findMany({
          where: { published: true },
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }, { id: "desc" }],
          select: { slug: true, title: true },
        })
      : fallbackArticles;
    const currentIndex = entries.findIndex((entry) => entry.slug === slug);
    if (entries.length > 1 && currentIndex >= 0) {
      nextArticle = entries[(currentIndex + 1) % entries.length];
    }
  } catch (error) {
    console.error("Next blog article unavailable", error);
  }

  return (
    <PublicPage>
      <article className="article-detail page-shell">
        <div className="article-detail-meta">
          <span>{category}</span>

          {date && <span>{date}</span>}
        </div>

        <DetailWordHeading title={title} />

        {coverImage && (
          <ImageReveal className="article-detail-image" parallax hoverZoom intensity="feature" rise={130}>
            <Image
              src={coverImage}
              alt={title}
              fill
              priority
              sizes="100vw"
            />
          </ImageReveal>
        )}

        <div className="article-detail-body">
          {paragraphs.map(
            (paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            )
          )}
        </div>

        {nextArticle && (
          <nav className="case-detail-next" aria-label="Next blog post">
            <Link href={`/blog/${nextArticle.slug}`}>
              <span className="case-detail-next-copy">
                <span className="case-detail-next-label">Read next · Blog</span>
                <strong>{nextArticle.title}</strong>
              </span>
              <span className="case-detail-next-arrow" aria-hidden="true">→</span>
            </Link>
          </nav>
        )}
      </article>
    </PublicPage>
  );
}
