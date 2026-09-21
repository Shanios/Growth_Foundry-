import Image from "next/image";
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

  return (
    <PublicPage>
      <article className="article-detail page-shell">
        <div className="article-detail-meta">
          <span>{category}</span>

          {date && <span>{date}</span>}
        </div>

        <h1>{title}</h1>

        {coverImage && (
          <div className="article-detail-image">
            <Image
              src={coverImage}
              alt={title}
              fill
              priority
              sizes="100vw"
            />
          </div>
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
      </article>
    </PublicPage>
  );
}