import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PublicPage } from "@/frontend/components/layout/public-page";
import { articles as fallbackArticles } from "@/frontend/data/site-content";
import { prisma } from "@/lib/prisma";
import { BlogHero } from "@/frontend/components/sections/blog-hero";
import { BlogReveal } from "@/frontend/components/sections/blog-reveal";
export const metadata: Metadata = {
  title: "Insights",
  description:
    "Growth Foundry perspectives on strategy, commercial systems, and transformation.",
};

export const revalidate = 300;

type ArticleItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  image?: string | null;
};

export default async function BlogPage() {
  let items: ArticleItem[] = fallbackArticles.map(
    (article) => ({
      ...article,
      image: null,
    })
  );

  try {
    const rows = await prisma.blogPost.findMany({
      where: {
        published: true,
      },

      orderBy: [
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ],

      select: {
        slug: true,
        title: true,
        body: true,
        author: true,
        coverImage: true,
        publishedAt: true,
      },
    });

    if (rows.length) {
      items = rows.map((row) => ({
        slug: row.slug,

        category:
          row.author ||
          "Growth Foundry",

        title: row.title,

        excerpt:
          row.body.length > 220
            ? `${row.body.slice(0, 220)}…`
            : row.body,

        date: row.publishedAt
          ? row.publishedAt.toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )
          : "Recently published",

        read: `${Math.max(
          2,
          Math.ceil(
            row.body.split(/\s+/).length /
              220
          )
        )} min read`,

        image: row.coverImage,
      }));
    }
  } catch (error) {
    console.error(
      "Published insights unavailable",
      error
    );
  }

  return (
    <PublicPage>
<BlogHero />

<BlogReveal>
  <div className="blog-card-grid">
    {items.map((article, index) => (
      <article
        key={article.slug}
        className="blog-card blog-reveal-item"
      >
        <Link
          href={`/blog/${article.slug}`}
          className="blog-card-image"
          aria-label={`Read ${article.title}`}
        >
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="blog-card-image-element"
            />
          ) : (
            <div className="blog-image-placeholder">
              <span>GF</span>
            </div>
          )}
        </Link>

        <div className="blog-card-content">
          <div className="blog-card-meta">
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>
              {article.category}
            </span>
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="blog-title-link"
          >
            <h2>{article.title}</h2>
          </Link>

          <p className="blog-card-excerpt">
            {article.excerpt}
          </p>

          <div className="blog-card-bottom">
            <div className="blog-date">
              <span>{article.date}</span>
              <span>{article.read}</span>
            </div>

            <Link
              href={`/blog/${article.slug}`}
              className="case-study-link"
            >
              Read insight
              <span>↗</span>
            </Link>
          </div>
        </div>
      </article>
    ))}
  </div>
</BlogReveal>
    </PublicPage>
  );
}