import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ContactInput = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  topic?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ContactInput;

    const name = String(input.name ?? "").trim();
    const email = String(input.email ?? "").trim();
    const company = String(input.company ?? "").trim();
    const topic = String(input.topic ?? "").trim();
    const message = String(input.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Name, email and message are required.",
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

    if (message.length < 10) {
      return NextResponse.json(
        {
          error: "Please provide a little more detail.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        message,
        topic: topic || null,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you. We’ll be in touch.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Contact submission failed", error);

    return NextResponse.json(
      {
        error: "Unable to submit your message right now.",
      },
      {
        status: 500,
      }
    );
  }
}