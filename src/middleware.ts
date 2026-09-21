import {
  NextRequest,
  NextResponse,
} from "next/server";

import { jwtVerify } from "jose";

const COOKIE_NAME = "gf_admin_session";

async function validSession(
  request: NextRequest
) {
  const token =
    request.cookies.get(COOKIE_NAME)?.value;

  const secret = process.env.JWT_SECRET;

  if (
    !token ||
    !secret ||
    secret.length < 32
  ) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    if (
      !payload.sub ||
      typeof payload.username !== "string"
    ) {
      return false;
    }

    const id = Number(payload.sub);

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const protectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/cms") ||
    pathname.startsWith("/api/admin");

  if (!protectedRoute) {
    return NextResponse.next();
  }

  if (await validSession(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const loginUrl = new URL(
    "/admin/login",
    request.url
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/cms/:path*",
    "/api/admin/:path*",
  ],
};