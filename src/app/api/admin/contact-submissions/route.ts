import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function authorized() {
  return Boolean(await getAdminSession());
}

export async function GET() {
  try {
    if (!(await authorized())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const items =
      await prisma.contactSubmission.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      items,
    });
  } catch (error) {
    console.error(
      "Contact submissions list failed",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load contact submissions.",
      },
      {
        status: 503,
      }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    if (!(await authorized())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const id = Number(
      new URL(request.url).searchParams.get(
        "id"
      )
    );

    if (!id) {
      return NextResponse.json(
        {
          error: "A valid id is required.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.contactSubmission.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "Contact submission delete failed",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete contact submission.",
      },
      {
        status: 503,
      }
    );
  }
}