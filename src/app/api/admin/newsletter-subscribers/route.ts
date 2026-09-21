import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type UpdateInput = {
  id?: number;
  active?: boolean;
};

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
      await prisma.newsletterSubscriber.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      items,
    });
  } catch (error) {
    console.error(
      "Newsletter subscribers list failed",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load newsletter subscribers.",
      },
      {
        status: 503,
      }
    );
  }
}

export async function PATCH(
  request: Request
) {
  try {
    if (!(await authorized())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const input =
      (await request.json()) as UpdateInput;

    const id = Number(input.id);

    if (
      !id ||
      typeof input.active !== "boolean"
    ) {
      return NextResponse.json(
        {
          error: "Invalid update.",
        },
        {
          status: 400,
        }
      );
    }

    const item =
      await prisma.newsletterSubscriber.update({
        where: {
          id,
        },
        data: {
          active: input.active,
        },
      });

    return NextResponse.json({
      ok: true,
      item,
    });
  } catch (error) {
    console.error(
      "Newsletter subscriber update failed",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update subscriber.",
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

    await prisma.newsletterSubscriber.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "Newsletter subscriber delete failed",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete subscriber.",
      },
      {
        status: 503,
      }
    );
  }
}