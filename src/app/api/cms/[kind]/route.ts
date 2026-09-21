import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

type Context = { params: Promise<{ kind: string }> };

type Input = {
  id?: number;
  title?: string;
  body?: string;
  sector?: string;
  outcome?: string;
  author?: string;
  image?: string;
  published?: boolean;
};

async function authorized() {
  return Boolean(await getAdminSession());
}

function normalize(input: Input) {
  return {
    title: String(input.title ?? "").trim(),
    body: String(input.body ?? "").trim(),
    image: String(input.image ?? "").trim() || null,
    sector: String(input.sector ?? "General").trim() || "General",
    outcome: String(input.outcome ?? "").trim() || null,
    author: String(input.author ?? "Growth Foundry").trim() || "Growth Foundry",
    published: Boolean(input.published),
  };
}

export async function GET(_: Request, { params }: Context) {
  try {
    if (!await authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { kind } = await params;

    if (kind === "case-studies") {
      const items = await prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json({ items });
    }
    if (kind === "blog") {
      const items = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json({ items });
    }
    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  } catch (error) {
    console.error("CMS list failed", error);
    return NextResponse.json({ error: "Unable to load content." }, { status: 503 });
  }
}

export async function POST(request: Request, { params }: Context) {
  try {
    if (!await authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { kind } = await params;
    const values = normalize(await request.json() as Input);
    if (!values.title || !values.body) return NextResponse.json({ error: "Title and body are required." }, { status: 400 });

    const slug = `${slugify(values.title)}-${Date.now().toString(36)}`;

    if (kind === "case-studies") {
      const item = await prisma.caseStudy.create({ data: {
        title: values.title,
        slug,
        body: values.body,
        featuredImage: values.image,
        sector: values.sector,
        outcome: values.outcome,
        published: values.published,
      }});
      return NextResponse.json({ ok: true, item }, { status: 201 });
    }

    if (kind === "blog") {
      const item = await prisma.blogPost.create({ data: {
        title: values.title,
        slug,
        body: values.body,
        coverImage: values.image,
        author: values.author,
        published: values.published,
        publishedAt: values.published ? new Date() : null,
      }});
      return NextResponse.json({ ok: true, item }, { status: 201 });
    }

    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  } catch (error) {
    console.error("CMS create failed", error);
    return NextResponse.json({ error: "Unable to create content." }, { status: 503 });
  }
}

export async function PATCH(request: Request, { params }: Context) {
  try {
    if (!await authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { kind } = await params;
    const input = await request.json() as Input;
    const id = Number(input.id);
    const values = normalize(input);
    if (!id || !values.title || !values.body) return NextResponse.json({ error: "Invalid update." }, { status: 400 });

    if (kind === "case-studies") {
      const item = await prisma.caseStudy.update({
        where: { id },
        data: {
          title: values.title,
          body: values.body,
          featuredImage: values.image,
          sector: values.sector,
          outcome: values.outcome,
          published: values.published,
        },
      });
      return NextResponse.json({ ok: true, item });
    }

    if (kind === "blog") {
      const existing = await prisma.blogPost.findUnique({ where: { id }, select: { published: true, publishedAt: true } });
      const item = await prisma.blogPost.update({
        where: { id },
        data: {
          title: values.title,
          body: values.body,
          coverImage: values.image,
          author: values.author,
          published: values.published,
          publishedAt: values.published ? (existing?.publishedAt ?? new Date()) : null,
        },
      });
      return NextResponse.json({ ok: true, item });
    }

    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  } catch (error) {
    console.error("CMS update failed", error);
    return NextResponse.json({ error: "Unable to update content." }, { status: 503 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    if (!await authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { kind } = await params;
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "A valid id is required." }, { status: 400 });

    if (kind === "case-studies") await prisma.caseStudy.delete({ where: { id } });
    else if (kind === "blog") await prisma.blogPost.delete({ where: { id } });
    else return NextResponse.json({ error: "Unknown content type" }, { status: 404 });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("CMS delete failed", error);
    return NextResponse.json({ error: "Unable to delete content." }, { status: 503 });
  }
}
