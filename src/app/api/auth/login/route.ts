import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, createAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const input = await request.json() as { username?: string; password?: string };
    const username = String(input.username ?? "").trim();
    const password = String(input.password ?? "");

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { username } });
    if (!admin || !await bcrypt.compare(password, admin.passwordHash)) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const token = await createAdminToken({ sub: String(admin.id), username: admin.username });
    const store = await cookies();
    store.set(ADMIN_COOKIE, token, adminCookieOptions);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 503 });
  }
}
