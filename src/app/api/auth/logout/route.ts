import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
