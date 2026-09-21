import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type NewsletterInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  consent?: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as NewsletterInput;

    const firstName = String(input.firstName ?? "").trim();
    const lastName = String(input.lastName ?? "").trim();
    const email = String(input.email ?? "").trim().toLowerCase();
    const consent = Boolean(input.consent);

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          error: "First name, last name and email are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          error: "Please confirm that you agree to receive updates.",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.newsletterSubscriber.findUnique({
        where: {
          email,
        },
      });

    if (existing) {
      if (!existing.active) {
        await prisma.newsletterSubscriber.update({
          where: {
            email,
          },
          data: {
            firstName,
            lastName,
            consent: true,
            active: true,
          },
        });
      }

      return NextResponse.json({
        ok: true,
        message: "You’re already on the list.",
      });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        firstName,
        lastName,
        email,
        consent,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "You’re on the list.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Newsletter signup failed", error);

    return NextResponse.json(
      {
        error: "Unable to subscribe right now.",
      },
      {
        status: 500,
      }
    );
  }
}